export abstract class AudioProcessor {
  protected audioCtx: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  protected source: MediaStreamAudioSourceNode | null = null;
  protected gainNode: GainNode | null = null;
  private destination: MediaStreamAudioDestinationNode | null = null;

  private gain: number = 1;
  private microphoneDeviceId: string | null = null;

  protected isActive = false;

  async start() {
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

    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.value = this.gain;
  }

  async stop() {
    this.source?.disconnect();
    this.source = null;

    this.gainNode?.disconnect();
    this.gainNode = null;

    this.destination?.disconnect();
    this.destination = null;

    await this.audioCtx?.close();
    this.audioCtx = null;

    this.mediaStream?.getTracks().forEach((t) => t.stop());
    this.mediaStream = null;
  }

  getMediaStream() {
    return this.mediaStream;
  }

  setGain(gain: number) {
    if (this.gain === gain) {
      return;
    }

    this.gain = gain;

    if (!this.isActive) {
      return;
    }

    if (this.gainNode) {
      this.gainNode.gain.value = gain;
    }
  }

  async setInputDeviceId(id: string) {
    if (this.microphoneDeviceId === id) {
      return;
    }

    this.microphoneDeviceId = id;

    if (!this.isActive) {
      return;
    }

    await this.stop();
    await this.start();
  }
}
