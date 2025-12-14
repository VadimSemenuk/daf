import { Dialog as _Dialog } from "radix-ui";
import styles from "./Dialog.module.css";
import type { ReactElement } from "react";

interface Props {
  open?: boolean;
  onOpenChange?: () => void;
  trigger?: ReactElement;
  title: string;
  content: ReactElement | ReactElement[] | string;
}

function Dialog(props: Props) {
  return (
    <_Dialog.Root
      open={props.open}
      onOpenChange={() => props.onOpenChange && props.onOpenChange()}
    >
      {props.trigger && <_Dialog.Trigger asChild>{props.trigger}</_Dialog.Trigger>}

      <_Dialog.Portal>
        <_Dialog.Overlay className={styles.Overlay} />

        <_Dialog.Content className={styles.Content}>
          <_Dialog.Title className={styles.Title}>{props.title}</_Dialog.Title>
          {props.content}
          <_Dialog.Close />
        </_Dialog.Content>
      </_Dialog.Portal>
    </_Dialog.Root>
  );
}

export { Dialog };
