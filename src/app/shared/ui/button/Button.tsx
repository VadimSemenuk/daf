import styles from "./Button.module.css";
import type { ReactElement } from "react";
import classnames from "classnames";

type Base = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface Props extends Base {
  children: ReactElement | ReactElement[] | string;
  isActive?: boolean;
  inline?: boolean;
  sm?: boolean;
  bg?: boolean;
  wide?: boolean;
  narrow?: boolean;
  filled?: boolean;
  outlined?: boolean;
}

export default function Button({
  children,
  isActive,
  inline = true,
  sm,
  bg,
  wide,
  narrow,
  filled,
  outlined,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={classnames(
        styles.button,
        props.className,
        inline ? styles.inline : styles.block,
        sm ? styles.sm : null,
        !sm && !bg ? styles.md : null,
        bg ? styles.bg : null,
        wide ? styles.wide : null,
        narrow ? styles.narrow : null,
        filled ? styles.filled : null,
        outlined ? styles.outlined : null,
        isActive == undefined ? null : isActive ? styles.active : styles.inactive,
      )}
    >
      {children}
    </button>
  );
}
