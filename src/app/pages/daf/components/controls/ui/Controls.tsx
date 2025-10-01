import styles from "./Controls.module.css";
import type { AudioProcessorSettings } from "app/pages/daf/model/AudioProcessor.ts";
import Slider from "app/shared/ui/slider/Slider.tsx";

interface Props {
  value: AudioProcessorSettings;
  onChange: (value: AudioProcessorSettings) => void;
}

export default function Controls(props: Props) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.controlWrapper}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>Задержка</div>
            <div className={styles.value}>{props.value.delayMs} мс.</div>
          </div>
          <Slider
            min={0}
            max={300}
            step={5}
            value={[props.value.delayMs]}
            onValueChange={(value) => props.onChange({ ...props.value, delayMs: Number(value[0]) })}
          />
        </div>

        <div className={styles.controlWrapper}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>Усиление звука</div>
            <div className={styles.value}>x{props.value.gain}</div>
          </div>
          <Slider
            min={0}
            max={20}
            step={0.25}
            value={[props.value.gain]}
            onValueChange={(value) => props.onChange({ ...props.value, gain: Number(value[0]) })}
          />
        </div>
      </div>
    </>
  );
}
