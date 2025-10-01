import { AudioProcessor } from "app/pages/daf/model/AudioProcessor.ts";
import { useEffect, useState } from "react";
import Select from "app/shared/ui/select/Select.tsx";
import Mic from "app/shared/ui/icons/Mic.tsx";
import styles from "./MicrophoneSelector.module.css";

interface Props {
  audioProcessor: AudioProcessor | null;
}

export default function MicrophoneSelector(props: Props) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");

  useEffect(() => {
    props.audioProcessor?.getDeviceList().then((value) => {
      setDevices(value);

      const selectedDeviceId =
        props.audioProcessor?.getCurrentDeviceId() ||
        value.find((item) => item.deviceId === "default")?.deviceId ||
        value[0].deviceId;
      if (selectedDeviceId) {
        setSelectedDeviceId(selectedDeviceId);
      }
    });
  }, [props.audioProcessor]);

  useEffect(() => {
    const updateAudioDevices = async () => {
      const devices = await props.audioProcessor?.getDeviceList();
      if (devices) {
        setDevices(devices);
      }
    };

    navigator.mediaDevices.addEventListener("devicechange", updateAudioDevices);
    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", updateAudioDevices);
    };
  }, [props.audioProcessor]);

  const onValueChange = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    props.audioProcessor?.setMicrophone(deviceId);
  };

  return (
    <div className={styles.microphoneSelectorWrapper}>
      <div className={styles.description}>
        При плохом качестве звука попробуйте выбрать другой микрофон
      </div>

      <div className={styles.microphoneSelector}>
        <Mic />
        <Select
          options={devices.map((item) => ({ value: item.deviceId, textValue: item.label }))}
          value={selectedDeviceId}
          onValueChange={onValueChange}
        />
      </div>
    </div>
  );
}
