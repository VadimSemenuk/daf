import { useEffect, useState } from "react";

interface Props {
  isActive: boolean;
}

export const useStopwatch = (props: Props) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    if (props.isActive) {
      const startTime = Date.now();

      function tick() {
        setSeconds(Math.floor((Date.now() - startTime) / 1000));
      }

      interval = setInterval(tick, 1000);
    } else {
      setSeconds(0);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [props.isActive]);

  return seconds;
};
