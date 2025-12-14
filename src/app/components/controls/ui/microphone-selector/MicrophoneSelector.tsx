import { useEffect, useState } from "react";
import Select, { type Option } from "app/shared/ui/select/Select.tsx";
import Mic from "app/shared/ui/icons/Mic.tsx";
import styles from "./MicrophoneSelector.module.css";
import { AudioHelper } from "app/shared/lib/AudioHelper.ts";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function MicrophoneSelector(props: Props) {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const updateAudioDevices = async () => {
      const devices = await AudioHelper.getInputDevices();
      const options = devices
        .filter((it) => it.deviceId !== "")
        .map((it) => ({ value: it.deviceId, textValue: it.label }));
      setOptions(options);
    };

    updateAudioDevices();

    navigator.mediaDevices.addEventListener("devicechange", updateAudioDevices);
    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", updateAudioDevices);
    };
  }, []);

  return (
    <div className={styles.microphoneSelector}>
      <Mic />
      <Select
        options={options}
        value={props.value}
        onValueChange={props.onChange}
      />
    </div>
  );
}
