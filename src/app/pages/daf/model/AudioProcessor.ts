import { randomIntFromInterval } from "app/shared/lib/randomIntFromInterval.ts";

const minDelay = 0;
const maxDelay = 0.3;

export interface AudioProcessorSettings {
  delayMs: number;
  gain: number;
}

export class AudioProcessor {
  private audioCtx: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private delayNode: DelayNode | null = null;
  private gainNode: GainNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  private destination: MediaStreamAudioDestinationNode | null = null;

  private delayMs: number = 0;
  private gain: number = 1;
  private microphoneDeviceId: string | null = null;

  private ignoreGainChange: boolean = false;

  private fftSize = 256;
  private dataArray = new Uint8Array(this.fftSize / 2);

  private running = false;
  private startPromise: Promise<void> | null = null;

  private id: number = randomIntFromInterval(0, 100);

  async start() {
    console.log("start AudioProcessor", this.id);

    if (this.running) return;
    this.running = true;

    console.log("start AudioProcessor processing");

    const promise = this._start();
    this.startPromise = promise;

    return promise;
  }

  async _start() {
    try {
      this.audioCtx = new (window.AudioContext || (window as any)["webkitAudioContext"])();
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          advanced: [
            {
              echoCancellation: false,
              noiseSuppression: false,
              autoGainControl: false,
            },
          ],
          echoCancellation: { ideal: false },
          noiseSuppression: { ideal: false },
          autoGainControl: { ideal: false },
          ...(this.microphoneDeviceId ? { deviceId: { exact: this.microphoneDeviceId } } : null),
        },
      });
      this.source = this.audioCtx.createMediaStreamSource(this.mediaStream);

      this.delayNode = this.audioCtx.createDelay(maxDelay);
      this.delayNode.delayTime.value = Math.max(minDelay, Math.min(this.delayMs / 1000, maxDelay));

      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.value = this.gain;

      // this.analyserNode = this.audioCtx.createAnalyser();
      // this.analyserNode.fftSize = this.fftSize;

      this.source.connect(this.delayNode);
      // this.analyserNode.connect(this.delayNode);
      this.delayNode.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      this.destination = this.audioCtx.createMediaStreamDestination();
      this.gainNode.connect(this.destination);
    } catch (e) {
      console.log(e);
      await this.stop();
      throw e;
    }
  }

  async stop() {
    console.log("stop AudioProcessor", this.id);

    if (!this.running) return;
    this.running = false;

    console.log("stop AudioProcessor processing");

    await this.startPromise;

    await this._stop();
  }

  private async _stop() {
    this.source?.disconnect();
    this.source = null;

    this.analyserNode?.disconnect();
    this.analyserNode = null;

    this.delayNode?.disconnect();
    this.delayNode = null;

    this.gainNode?.disconnect();
    this.gainNode = null;

    this.destination?.disconnect();
    this.destination = null;

    await this.audioCtx?.close();
    this.audioCtx = null;

    this.mediaStream?.getTracks().forEach((t) => t.stop());
    this.mediaStream = null;
  }

  pause() {
    this.ignoreGainChange = true;
    if (this.gainNode) {
      this.gainNode.gain.value = 0;
    }
  }

  resume() {
    this.ignoreGainChange = false;
    this.setGain(this.gain);
  }

  getMediaStream() {
    return this.destination?.stream;
  }

  setDelayMs(delayMs: number) {
    this.delayMs = delayMs;
    if (this.delayNode && this.audioCtx) {
      const s = Math.max(minDelay, Math.min(delayMs / 1000, maxDelay));
      this.delayNode.delayTime.setValueAtTime(s, this.audioCtx.currentTime);
    }
  }

  setGain(gain: number) {
    if (this.ignoreGainChange) return;

    this.gain = gain;
    if (this.gainNode) {
      this.gainNode.gain.value = gain;
    }
  }

  async setMicrophone(id: string) {
    await this.stop();
    this.microphoneDeviceId = id;
    await this.start();
  }

  getVolume() {
    this.analyserNode?.getByteFrequencyData(this.dataArray);

    let sum = 0;
    for (const amplitude of this.dataArray) {
      sum += amplitude * amplitude;
    }
    const averageVolume = Math.sqrt(sum / this.dataArray.length);
    const normalizedVolume = Math.min(averageVolume / 128, 1);

    return normalizedVolume;
  }

  // async refreshDeviceList() {
  async getDeviceList() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((d) => d.kind === "audioinput");
  }

  getCurrentDeviceId() {
    if (this.mediaStream) {
      return this.mediaStream.getAudioTracks()[0].getSettings().deviceId;
    }
  }
}
