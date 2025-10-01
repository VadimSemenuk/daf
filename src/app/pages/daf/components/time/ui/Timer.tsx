import { useStopwatch } from "app/pages/daf/hooks/useStopwatch.ts";
import Time from "app/pages/daf/components/time/ui/Time.tsx";
import { useEffect } from "react";

interface Props {
  startSeconds: number;
  onFinish: () => void;
  // onSecondsChange: (seconds: number) => void;
}

export default function Timer(props: Props) {
  const seconds = useStopwatch();
  const normalizedSeconds = Math.max(0, props.startSeconds - seconds);

  const onFinish = props.onFinish;
  useEffect(() => {
    if (normalizedSeconds === 0) {
      onFinish();
    }
  }, [normalizedSeconds, onFinish]);

  return <Time seconds={normalizedSeconds} />;
}
