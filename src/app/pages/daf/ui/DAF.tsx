import type { Job } from "app/entities/Job.ts";
import Controls from "app/pages/daf/components/controls/ui/Controls.tsx";
import { useAudioProcessor } from "app/pages/daf/hooks/useAudioProcessor.ts";
import { useState } from "react";
import styles from "./DAF.module.css";
import type { AudioProcessorSettings } from "app/pages/daf/model/AudioProcessor.ts";
import TimeIcon from "app/shared/ui/icons/Time.tsx";
import Word from "app/shared/ui/icons/Word.tsx";
import Timer from "app/pages/daf/components/time/ui/Timer.tsx";
import Stopwatch from "app/pages/daf/components/time/ui/Stopwatch.tsx";
import WordsCounter from "app/pages/daf/components/words-counter/ui/WordsCounter.tsx";
import Button from "app/shared/ui/button/Button.tsx";
import Check from "app/shared/ui/icons/Check.tsx";
import { playAudio } from "app/shared/lib/playAudio.ts";
import audio from "public/success_notification.wav";
import MicrophoneSelector from "app/pages/daf/components/microphone-selector/ui/MicrophoneSelector.tsx";
import RecorderView from "app/pages/daf/components/recorder/ui/RecorderView.tsx";
import Stop from "app/shared/ui/icons/Stop.tsx";
import classnames from "classnames";

interface Props {
  job: Job;
  onStop: () => void;
}

const defaultAudioProcessorSettings: AudioProcessorSettings = {
  delayMs: 150,
  gain: 3,
};

export default function DAF(props: Props) {
  const [audioProcessorSettings, setAudioProcessorSettings] = useState(
    defaultAudioProcessorSettings,
  );
  const { audioProcessor } = useAudioProcessor(audioProcessorSettings);

  const [isFinishedByEvent, setIsFinishedByEvent] = useState(false);

  const onFinishByEvent = () => {
    setIsFinishedByEvent(true);
    audioProcessor?.stop();
    playAudio(audio);
  };

  const renderDAF = () => (
    <>
      <div className={classnames(styles.infoWrapper, "container")}>
        <div className={styles.timeWrapper}>
          <TimeIcon />

          {props.job.durationSeconds && (
            <Timer
              startSeconds={props.job.durationSeconds}
              onFinish={onFinishByEvent}
            />
          )}

          {!props.job.durationSeconds && <Stopwatch />}
        </div>

        <div className={styles.wordsCountWrapper}>
          <Word />
          <WordsCounter
            isAvailableToInit={audioProcessor != null}
            maxWordsCount={props.job.wordsCount}
            onMaxReached={onFinishByEvent}
          />
        </div>
      </div>

      <div className="container">
        <RecorderView audioProcessor={audioProcessor} />
      </div>

      <div className={classnames(styles.controlsWrapper, "container")}>
        <MicrophoneSelector audioProcessor={audioProcessor} />

        <Controls
          value={audioProcessorSettings}
          onChange={setAudioProcessorSettings}
        />
      </div>

      <Button onClick={props.onStop}>
        <Stop />
      </Button>
    </>
  );

  const renderFinished = () => (
    <>
      <div className={classnames(styles.finishedWrapper, "container")}>
        <div className={styles.title}>Упражнение завершено</div>
        <div className={styles.iconWrapper}>
          <Check />
        </div>
      </div>

      <Button onClick={props.onStop}>Закрыть</Button>
    </>
  );

  return isFinishedByEvent ? renderFinished() : renderDAF();
}
