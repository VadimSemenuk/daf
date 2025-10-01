import { useEffect, useState } from "react";
import { SpeechRecognition } from "app/pages/daf/model/SpeechRecognition.ts";

interface Props {
  isAvailableToInit: boolean;
}

export const useSpeechRecognition = (props: Props) => {
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    const speechRecognition = new SpeechRecognition();

    let initTimeout: number | null = null;
    if (props.isAvailableToInit) {
      initTimeout = setTimeout(() => {
        speechRecognition.start();
        setSpeechRecognition(speechRecognition);
      }, 500);
    }

    return () => {
      if (initTimeout) clearTimeout(initTimeout);
      speechRecognition.stop();
    };
  }, [props.isAvailableToInit]);

  return { speechRecognition };
};
