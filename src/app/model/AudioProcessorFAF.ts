import { AudioProcessor } from "app/model/AudioProcessor.ts";

export class AudioProcessorFAF extends AudioProcessor {
  private soundtouch: AudioWorkletNode | null = null;

  private pitch: number = 1;

  async start() {
    if (this.isActive) return;
    this.isActive = true;

    try {
      await super.start();

      if (!this.audioCtx || !this.source || !this.gainNode) {
        return;
      }

      await this.audioCtx.audioWorklet.addModule(
        new URL("@soundtouchjs/audio-worklet", import.meta.url),
      );
      this.soundtouch = new AudioWorkletNode(this.audioCtx, "soundtouch-processor");

      this.source.connect(this.gainNode);
      this.gainNode.connect(this.soundtouch);
      this.soundtouch.connect(this.audioCtx.destination);
    } catch (e) {
      console.log(e);
      await this.stop();
      throw e;
    }
  }

  async stop() {
    if (!this.isActive) return;
    this.isActive = false;

    this.soundtouch?.disconnect();
    this.soundtouch = null;

    await super.stop();
  }

  setPitch(pitch: number) {
    if (this.pitch === pitch) {
      return;
    }

    this.pitch = pitch;

    if (!this.isActive) {
      return;
    }

    if (this.soundtouch) {
      const param = this.soundtouch.parameters.get("pitch");
      if (param) {
        param.value = pitch;
      }
    }
  }
}
