export class SpeechRecognition {
  private recognition: any | null = null;
  private recognitionStartTimestamp: number | null = null;

  private isActive = false;

  private wordsCount = 0;
  private previousRecognitionWordsCount = 0;

  onResult: ((wordsCount: number) => void) | null = null;

  start() {
    console.log("start SpeechRecognition");

    if (this.isActive) return false;

    console.log("start SpeechRecognition processing");

    const SpeechRecognition =
      (window as any)["SpeechRecognition"] || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    this.recognition = new SpeechRecognition();
    this.recognition.lang = "ru-RU";
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onresult = (event: {
      results: SpeechRecognitionResult[];
      resultIndex: number;
    }) => {
      this.wordsCount = [...event.results]
        .map((item) => item[0].transcript.trim().split(" "))
        .flat().length;

      this.onResult?.(this.previousRecognitionWordsCount + this.wordsCount);
    };

    this.recognition.addEventListener("start", () => {
      console.log("recognition start");

      this.recognitionStartTimestamp = Date.now();
    });

    this.recognition.addEventListener("end", () => {
      console.log("recognition end");

      this.previousRecognitionWordsCount += this.wordsCount;

      if (this.recognitionStartTimestamp) {
        const timeFromStart = Date.now() - this.recognitionStartTimestamp;
        if (timeFromStart > 5000 && this.isActive) {
          this.recognition.start();
        }
      }
    });

    // this.recognition.onerror = (e: Error) => console.error("Recognition error", e);
    this.recognition?.start();

    this.isActive = true;
    console.log("finish SpeechRecognition processing");
  }

  stop() {
    console.log("stop SpeechRecognition");

    this.recognition?.stop();
    this.recognition = null;

    this.isActive = false;
  }
}
