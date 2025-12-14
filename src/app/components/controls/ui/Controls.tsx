import styles from "./Controls.module.css";
import Slider from "app/shared/ui/slider/Slider.tsx";
import MicrophoneSelector from "app/components/controls/ui/microphone-selector/MicrophoneSelector.tsx";
import { useLocalStorage } from "app/shared/hooks/useLocalStorage.tsx";
import { useEffect, useState } from "react";
import { AudioHelper } from "app/shared/lib/AudioHelper.ts";
import { useTranslation } from "react-i18next";

interface Props {
  showDelayControl: boolean;
  showPitchControl: boolean;
  onGainChanged: (value: number) => void;
  onDelayChanged: (value: number) => void;
  onPitchChanged: (value: number) => void;
  onInputDeviceIdChange: (value: string) => void;
}

export default function Controls({
  showDelayControl,
  showPitchControl,
  onGainChanged,
  onDelayChanged,
  onPitchChanged,
  onInputDeviceIdChange,
}: Props) {
  const { t } = useTranslation();

  const [gain, setGain] = useLocalStorage<number>("GAIN", 1);
  const [delay, setDelay] = useLocalStorage<number>("DELAY", 100);
  const [pitch, setPitch] = useLocalStorage<number>("PITCH", 1);
  const [_inputDevice, _setInputDevice] = useLocalStorage<string>("INPUT_DEVICE", "");

  const [inputDevice, setInputDevice] = useState<string>("");
  useEffect(() => {
    if (_inputDevice) {
      setInputDevice(_inputDevice);
    } else {
      async function setDefaultDevice() {
        const devices = await AudioHelper.getInputDevices();
        const device =
          devices.find((item) => item.deviceId === "default")?.deviceId || devices[0].deviceId;
        if (device) {
          setInputDevice(device);
        }
      }

      setDefaultDevice();
    }
  }, [_inputDevice]);

  useEffect(() => {
    onGainChanged(gain);
  }, [gain, onGainChanged]);

  useEffect(() => {
    onDelayChanged(delay);
  }, [delay, onDelayChanged]);

  useEffect(() => {
    onPitchChanged(pitch);
  }, [pitch, onPitchChanged]);

  useEffect(() => {
    onInputDeviceIdChange(inputDevice);
  }, [inputDevice, onInputDeviceIdChange]);

  return (
    <div className={styles.container}>
      <MicrophoneSelector
        value={inputDevice}
        onChange={(value) => _setInputDevice(value)}
      />

      {showDelayControl && (
        <div className={styles.controlWrapper}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>{t("delay")}</div>
            <div className={styles.value}>
              {delay == 0 ? "≈ " : ""}
              {delay + 50} {t("ms")}
            </div>
          </div>

          <Slider
            min={0}
            max={250}
            step={10}
            value={[delay]}
            onValueChange={(value) => setDelay(Number(value[0]))}
          />
        </div>
      )}

      {showPitchControl && (
        <div className={styles.controlWrapper}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>{t("pitch")}</div>
            <div className={styles.value}>{pitch}</div>
          </div>

          <Slider
            min={0.5}
            max={1.5}
            step={0.1}
            value={[pitch]}
            onValueChange={(value) => setPitch(Number(value[0]))}
          />
        </div>
      )}

      <div className={styles.controlWrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>{t("gain")}</div>
          <div className={styles.value}>{gain}</div>
        </div>

        <Slider
          min={1}
          max={20}
          step={1}
          value={[gain]}
          onValueChange={(value) => setGain(Number(value[0]))}
        />
      </div>
    </div>
  );
}
