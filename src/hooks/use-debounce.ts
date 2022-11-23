import { useEffect, useRef, useState } from "react";

export const useDebounce = <V>(value: V, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      prev.current = value;
      clearTimeout(timer);
    };
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return debouncedValue;
};
