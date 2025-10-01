import { Slider as _Slider } from "radix-ui";
import type { SliderProps } from "@radix-ui/react-slider";
import style from "./Slider.module.css";

export default function Slider(props: SliderProps) {
  return (
    <_Slider.Root
      {...props}
      className={style.SliderRoot}
    >
      <_Slider.Track className={style.SliderTrack}>
        <_Slider.Range className={style.SliderRange} />
      </_Slider.Track>
      <_Slider.Thumb
        className={style.SliderThumb}
        aria-label="Volume"
      />
    </_Slider.Root>
  );
}
