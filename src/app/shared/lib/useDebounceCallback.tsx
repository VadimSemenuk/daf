import { useEffect, useRef } from 'react';

function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const debounceRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const debounce = (value: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      callback(value);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return debounce;
}

export default useDebouncedCallback;
