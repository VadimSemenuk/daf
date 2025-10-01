import styles from "./Button.module.css";
import type { ReactElement } from "react";
import classnames from "classnames";

type Base = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface Props extends Base {
  children: ReactElement | ReactElement[] | string;
  inline?: boolean;
  sm?: boolean;
  red?: boolean;
  green?: boolean;
}

export default function Button({ children, inline, sm, red, green, ...props }: Props) {
  return (
    <button
      {...props}
      className={classnames(
        styles.button,
        props.className,
        inline ? styles.inline : null,
        sm ? styles.sm : null,
        red ? styles.red : null,
        green ? styles.green : null,
      )}
    >
      {children}
    </button>
  );
}
