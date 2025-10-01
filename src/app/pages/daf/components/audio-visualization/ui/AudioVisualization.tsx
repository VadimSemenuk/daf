import type { AudioProcessor } from "app/pages/daf/model/AudioProcessor.ts";
import { useEffect, useRef } from "react";
import styles from "./AudioVisualization.module.css";
import Mic from "app/shared/ui/icons/Mic.tsx";

interface Props {
  audioProcessor: AudioProcessor | null;
}

export default function AudioVisualization(props: Props) {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function updateVolume() {
      const volume = props.audioProcessor?.getVolume() || 0;
      const roundedVolume = Math.round(volume / 0.1) * 0.1;
      const volumeToApply = Math.max(0.1, roundedVolume * 2);
      if (elementRef.current) elementRef.current.style.opacity = volumeToApply.toString();
    }

    let frameId: number;
    let lastUpdateTimestamp: number | null = null;

    function animateUpdateVolume() {
      const currentTimestamp = Date.now();
      if (!lastUpdateTimestamp || currentTimestamp - lastUpdateTimestamp > 100) {
        lastUpdateTimestamp = currentTimestamp;
        updateVolume();
      }

      frameId = requestAnimationFrame(animateUpdateVolume);
    }

    animateUpdateVolume();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [props.audioProcessor]);

  return (
    <div className={styles.audioVisualizationWrapper}>
      <Mic />

      <div
        ref={elementRef}
        className={styles.visualization}
      ></div>
    </div>
  );
}
