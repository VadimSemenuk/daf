import { useEffect, useState } from "react";

/**
 * useDebounce Hook
 * @param value - The value to debounce
 * @param delay - Delay in ms (default: 500)
 * @returns Debounced value
 */
export function useDebounceValue<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
