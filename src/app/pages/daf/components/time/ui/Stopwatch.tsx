import { useStopwatch } from "app/pages/daf/hooks/useStopwatch.ts";
import Time from "app/pages/daf/components/time/ui/Time.tsx";

export default function Stopwatch() {
  const seconds = useStopwatch();

  return <Time seconds={seconds} />;
}
