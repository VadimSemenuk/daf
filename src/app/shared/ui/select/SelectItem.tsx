import * as React from "react";
import { Select } from "radix-ui";
import "./Select.module.css";
import classnames from "classnames";
import styles from "./Select.module.css";
import type { SelectItemProps } from "@radix-ui/react-select";

type SelectItemBase = SelectItemProps & React.RefAttributes<HTMLDivElement>;

const SelectItem = (props: SelectItemBase) => {
  return (
    <Select.Item
      className={classnames(styles.Item, props.className)}
      {...props}
      ref={props.ref}
    >
      <Select.ItemText>{props.children}</Select.ItemText>
      {/*<Select.ItemIndicator className={styles.ItemIndicator}>*/}
      {/*  <CheckIcon />*/}
      {/*</Select.ItemIndicator>*/}
    </Select.Item>
  );
};

export default SelectItem;
