import { useEffect, useState } from "react";

export const useStopwatch = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    function tick() {
      setSeconds(Math.floor((Date.now() - startTime) / 1000));
    }

    const interval = setInterval(tick, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return seconds;
};
