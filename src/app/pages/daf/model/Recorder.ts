export class Recorder {
  private mediaRecorder: MediaRecorder;
  audioChunks: Blob[] = [];

  constructor(stream: MediaStream) {
    this.mediaRecorder = new MediaRecorder(stream);

    this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
      this.audioChunks.push(event.data);
    };
  }

  start() {
    this.audioChunks = [];
    this.mediaRecorder.start();
  }

  async stop(): Promise<string | null> {
    return new Promise<string>((resolve, reject) => {
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.audioChunks, {
          type: this.audioChunks[0]?.type || "audio/webm",
        });

        this.audioChunks = [];

        resolve(URL.createObjectURL(blob));
      };

      this.mediaRecorder.onerror = (error: ErrorEvent) => {
        this.audioChunks = [];
        reject(error);
      };

      this.mediaRecorder.stop();
    });
  }
}
