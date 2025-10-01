import { useEffect, useState } from "react";
import { AudioProcessor } from "../model/AudioProcessor.ts";

interface Props {
  delayMs: number;
  gain: number;
}

export const useAudioProcessor = (props: Props) => {
  const [audioProcessor, setAudioProcessor] = useState<AudioProcessor | null>(null);

  useEffect(() => {
    audioProcessor?.setDelayMs(props.delayMs);
  }, [props.delayMs, audioProcessor]);

  useEffect(() => {
    audioProcessor?.setGain(props.gain);
  }, [props.gain, audioProcessor]);

  useEffect(() => {
    const audioProcessor = new AudioProcessor();

    (async function () {
      await audioProcessor.start();
      setAudioProcessor(audioProcessor);
    })();

    return () => {
      audioProcessor.stop();
    };
  }, []);

  return { audioProcessor };
};
