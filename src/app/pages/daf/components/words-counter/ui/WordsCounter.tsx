import { useEffect, useState } from "react";
import { useSpeechRecognition } from "app/pages/daf/hooks/useSpeechRecognition.ts";

interface Props {
  isAvailableToInit: boolean;
  maxWordsCount?: number;
  onMaxReached: () => void;
}

export default function WordsCounter(props: Props) {
  const { maxWordsCount, onMaxReached } = props;

  const { speechRecognition } = useSpeechRecognition({
    isAvailableToInit: props.isAvailableToInit,
  });

  const [wordsCount, setWordsCount] = useState(0);

  useEffect(() => {
    if (speechRecognition) {
      speechRecognition.onResult = (value) => {
        setWordsCount(value);

        if (maxWordsCount && wordsCount >= maxWordsCount) {
          onMaxReached();
        }
      };
    }

    return () => {
      if (speechRecognition) {
        speechRecognition.onResult = null;
      }
    };
  }, [speechRecognition, wordsCount, maxWordsCount, onMaxReached]);

  return (
    <>
      {!maxWordsCount && <span>{wordsCount}</span>}
      {maxWordsCount && (
        <span>
          {Math.min(wordsCount, maxWordsCount)} / {maxWordsCount}
        </span>
      )}
    </>
  );
}
