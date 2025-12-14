import { AudioProcessor } from "app/model/AudioProcessor.ts";
import { useEffect, useState } from "react";
import { Recorder } from "app/model/Recorder.ts";
import Capture from "app/shared/ui/icons/Capture.tsx";
import styles from "./RecorderView.module.css";
import Button from "app/shared/ui/button/Button.tsx";
import { Dialog } from "app/shared/ui/dialog/Dialog";
import { useTranslation } from "react-i18next";

interface Props {
  audioProcessor: AudioProcessor | null;
}

const recorder = new Recorder();

export default function RecorderView({ audioProcessor }: Props) {
  const { t } = useTranslation();

  const [isActive, setIsActive] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  const start = () => {
    setAudioSrc(null);

    const stream = audioProcessor?.getMediaStream();
    if (stream) {
      recorder.start(stream);
    }
  };

  const stop = async () => {
    const src = await recorder.stop();
    if (src) {
      setAudioSrc(src);
    }
  };

  useEffect(() => {
    return () => {
      recorder.stop();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div>
        <Button
          style={{ color: isActive ? "green" : "red" }}
          bg={true}
          narrow={true}
          outlined={true}
          onClick={() => {
            if (isActive) {
              stop();
            } else {
              start();
            }
            setIsActive(!isActive);
          }}
        >
          <Capture />
        </Button>
      </div>

      <Dialog
        open={!!audioSrc}
        onOpenChange={() => setAudioSrc(null)}
        title={t("record")}
        content={
          audioSrc ? (
            <audio
              controls
              src={audioSrc}
            />
          ) : (
            ""
          )
        }
      />
    </div>
  );
}
