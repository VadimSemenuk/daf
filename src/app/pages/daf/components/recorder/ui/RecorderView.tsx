import { AudioProcessor } from "app/pages/daf/model/AudioProcessor.ts";
import { useEffect, useState } from "react";
import { Recorder } from "app/pages/daf/model/Recorder";
import Capture from "app/shared/ui/icons/Capture.tsx";
import styles from "./RecorderView.module.css";
import Button from "app/shared/ui/button/Button.tsx";
import Stop from "app/shared/ui/icons/Stop.tsx";

interface Props {
  audioProcessor: AudioProcessor | null;
}

export default function RecorderView(props: Props) {
  const [recorder, setRecorder] = useState<Recorder | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  const onStartClick = () => {
    const stream = props.audioProcessor?.getMediaStream();
    if (stream) {
      const recorder = new Recorder(stream);
      recorder.start();
      setRecorder(recorder);
      setAudioSrc(null);
    }
  };

  const onStopClick = async () => {
    if (!recorder) return;

    const src = await recorder.stop();
    setAudioSrc(src);
    setRecorder(null);
  };

  useEffect(() => {
    return () => {
      recorder?.stop();
    };
  }, [recorder]);

  return (
    <div className={styles.wrapper}>
      <div>
        {!recorder && (
          <Button
            inline
            sm
            green
            onClick={onStartClick}
          >
            <Capture />
            <div>Начать запись</div>
          </Button>
        )}

        {recorder && (
          <Button
            inline
            sm
            red
            onClick={onStopClick}
          >
            <Stop />
            <div>Остановить запись</div>
          </Button>
        )}
      </div>

      {audioSrc && (
        <audio
          controls
          onPlay={() => {
            props.audioProcessor?.pause();
          }}
          onPause={() => {
            props.audioProcessor?.resume();
          }}
          src={audioSrc}
        />
      )}
    </div>
  );
}
