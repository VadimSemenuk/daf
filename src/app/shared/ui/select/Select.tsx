import { Select } from "radix-ui";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import "./Select.module.css";
import styles from "./Select.module.css";
import SelectItem from "app/shared/ui/select/SelectItem.tsx";

interface SelectProps {
  options: Option[];
  value: string;
  onValueChange(value: string): void;
}

interface Option {
  value: string;
  textValue: string;
}

const _Select = (props: SelectProps) => (
  <Select.Root
    value={props.value}
    onValueChange={props.onValueChange}
  >
    <Select.Trigger className={styles.Trigger}>
      {/*<Select.Value*/}
      {/*  placeholder="Микрофон"*/}
      {/*  aria-label={props.value}*/}
      {/*>*/}
      {/*  {[value]}*/}
      {/*</Select.Value>*/}
      <Select.Value
        className={styles.Value}
        placeholder="Микрофон"
      />
      <Select.Icon className={styles.Icon}>
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>

    <Select.Portal>
      <Select.Content className={styles.Content}>
        <Select.ScrollUpButton className={styles.ScrollButton}>
          <ChevronUpIcon />
        </Select.ScrollUpButton>

        <Select.Viewport className={styles.Viewport}>
          {props.options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.textValue}
            </SelectItem>
          ))}
        </Select.Viewport>

        <Select.ScrollDownButton className={styles.ScrollButton}>
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

export default _Select;
