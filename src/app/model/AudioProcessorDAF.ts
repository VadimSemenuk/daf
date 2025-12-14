import { AudioProcessor } from "app/model/AudioProcessor.ts";

const minDelay = 0;
const maxDelay = 0.3;

export class AudioProcessorDAF extends AudioProcessor {
  private delayNode: DelayNode | null = null;

  private delay: number = 0;

  async start() {
    if (this.isActive) return;
    this.isActive = true;

    try {
      await super.start();

      if (!this.audioCtx || !this.source || !this.gainNode) {
        return;
      }

      this.delayNode = this.audioCtx.createDelay(maxDelay);
      this.delayNode.delayTime.value = Math.max(minDelay, Math.min(this.delay / 1000, maxDelay));

      this.source.connect(this.gainNode);
      this.gainNode.connect(this.delayNode);
      this.delayNode.connect(this.audioCtx.destination);
    } catch (e) {
      console.log(e);
      await this.stop();
      throw e;
    }
  }

  async stop() {
    if (!this.isActive) return;
    this.isActive = false;

    this.delayNode?.disconnect();
    this.delayNode = null;

    await super.stop();
  }

  setDelay(delay: number) {
    if (this.delay === delay) {
      return;
    }

    this.delay = delay;

    if (!this.isActive) {
      return;
    }

    if (this.delayNode && this.audioCtx) {
      const s = Math.max(minDelay, Math.min(delay / 1000, maxDelay));
      this.delayNode.delayTime.setValueAtTime(s, this.audioCtx.currentTime);
    }
  }
}
