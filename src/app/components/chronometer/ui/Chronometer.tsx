import { useStopwatch } from "app/components/chronometer/hooks/useStopwatch.ts";
import styles from "./Chronometer.module.css";

interface Props {
  isActive: boolean;
}

export default function Chronometer(props: Props) {
  const seconds = useStopwatch({ isActive: props.isActive });

  return (
    <div className={styles.chronometer}>
      {Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0")}
      :{(seconds % 60).toString().padStart(2, "0")}
    </div>
  );
}
