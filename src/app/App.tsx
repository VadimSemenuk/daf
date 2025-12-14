import "./App.module.css";
import styles from "./App.module.css";
import Button from "app/shared/ui/button/Button.tsx";
import Play from "app/shared/ui/icons/Play.tsx";
import Stop from "app/shared/ui/icons/Stop.tsx";
import Controls from "app/components/controls/ui/Controls.tsx";
import { useEffect, useState } from "react";
import Chronometer from "app/components/chronometer/ui/Chronometer.tsx";
import { AudioProcessorDAF } from "app/model/AudioProcessorDAF.ts";
import { AudioProcessorFAF } from "app/model/AudioProcessorFAF.ts";
import Warnings from "app/components/warnings/ui/Warnings.tsx";
import classnames from "classnames";
import { Help } from "app/components/help/Help.tsx";
import RecorderView from "app/components/recorder/ui/RecorderView.tsx";
import { AudioProcessor } from "app/model/AudioProcessor.ts";
import logo from "public/images/logo.svg";

const processor = import.meta.env.VITE_PROCESSOR;
if (!processor) throw new Error("Processor is not specified in PROCESSOR environment variable");

let audioProcessor: AudioProcessor;
switch (processor) {
  case "daf": {
    audioProcessor = new AudioProcessorDAF();
    break;
  }
  case "faf": {
    audioProcessor = new AudioProcessorFAF();
    break;
  }
  default: {
    throw new Error("Unknown processor: " + processor);
  }
}

function App() {
  if (audioProcessor instanceof AudioProcessorDAF) {
    return <AppDAF audioProcessor={audioProcessor} />;
  } else if (audioProcessor instanceof AudioProcessorFAF) {
    return <AppFAF audioProcessor={audioProcessor} />;
  }
}

interface AppDAFProps {
  audioProcessor: AudioProcessorDAF;
}

function AppDAF({ audioProcessor }: AppDAFProps) {
  return (
    <AppBase
      title="DAF"
      showDelayControl={true}
      showPitchControl={false}
      audioProcessor={audioProcessor}
      onDelayChange={(value) => audioProcessor.setDelay(value)}
      onPitchChange={() => {}}
    />
  );
}

interface AppFAFProps {
  audioProcessor: AudioProcessorFAF;
}

function AppFAF({ audioProcessor }: AppFAFProps) {
  return (
    <AppBase
      title="FAF"
      showDelayControl={false}
      showPitchControl={true}
      audioProcessor={audioProcessor}
      onDelayChange={() => {}}
      onPitchChange={(value) => audioProcessor.setPitch(value)}
    />
  );
}

interface Props {
  title: string;
  showDelayControl: boolean;
  showPitchControl: boolean;
  audioProcessor: AudioProcessor;
  onDelayChange: (value: number) => void;
  onPitchChange: (value: number) => void;
}

function AppBase({
  title,
  showDelayControl,
  showPitchControl,
  audioProcessor,
  onDelayChange,
  onPitchChange,
}: Props) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return () => {
      audioProcessor.stop();
    };
  }, [audioProcessor]);

  return (
    <div className={styles.app}>
      <div className={styles.headerWrapper}>
        <div className={styles.titleWrapper}>
          <img
            src={logo}
            alt="logo"
          />
          <h1>{title}</h1>
        </div>
        <Help />
      </div>

      <div className={classnames("container", styles.appContainer)}>
        <Chronometer isActive={isActive} />

        <Warnings />

        <div className={"divider"} />

        <Controls
          showDelayControl={showDelayControl}
          showPitchControl={showPitchControl}
          onGainChanged={(value) => audioProcessor.setGain(value)}
          onDelayChanged={onDelayChange}
          onPitchChanged={onPitchChange}
          onInputDeviceIdChange={(value) => audioProcessor.setInputDeviceId(value)}
        />

        <div className={"divider"} />

        <div className={styles.actionsWrapper}>
          <div className={styles.left}></div>

          <div className={styles.center}>
            <Button
              isActive={isActive}
              bg={true}
              wide={true}
              filled={true}
              onClick={async () => {
                if (isActive) {
                  await audioProcessor.stop();
                  setIsActive(false);
                } else {
                  await audioProcessor.start();
                  setIsActive(true);
                }
              }}
            >
              {isActive ? <Stop /> : <Play />}
            </Button>
          </div>

          <div className={styles.right}>
            {isActive && <RecorderView audioProcessor={audioProcessor} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
