import { Switch as _Switch } from "radix-ui";
import type { SwitchProps } from "@radix-ui/react-switch";
import styles from "./Switch.module.css";
import { useId } from "react";

export default function Switch(props: SwitchProps & { label: string }) {
  const id = useId();

  return (
    <div className={styles.switchWrapper}>
      {props.label && (
        <label
          className={styles.Label}
          htmlFor={id}
        >
          {props.label}
        </label>
      )}

      <_Switch.Root
        {...props}
        id={id}
        className={styles.SwitchRoot}
      >
        <_Switch.Thumb className={styles.SwitchThumb} />
      </_Switch.Root>
    </div>
  );
}
