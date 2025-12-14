export class Recorder {
  private mediaRecorder?: MediaRecorder;
  private audioChunks: Blob[] = [];
  private isActive: boolean = false;

  start(stream: MediaStream) {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.audioChunks = [];

    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
      this.audioChunks.push(event.data);
    };
    this.mediaRecorder.start();
  }

  async stop(): Promise<string | null> {
    if (!this.isActive) {
      return null;
    }
    this.isActive = false;

    const mediaRecorder = this.mediaRecorder;
    if (!mediaRecorder) {
      return null;
    }

    return new Promise<string>((resolve, reject) => {
      mediaRecorder.onstop = () => {
        const blob = new Blob(this.audioChunks, {
          type: this.audioChunks[0]?.type || "audio/webm",
        });

        this.audioChunks = [];

        resolve(URL.createObjectURL(blob));
      };

      mediaRecorder.onerror = (error: ErrorEvent) => {
        this.audioChunks = [];
        reject(error);
      };

      mediaRecorder.stop();
    });
  }
}
