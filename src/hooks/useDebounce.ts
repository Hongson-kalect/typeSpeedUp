import { useState, useEffect } from "react";

export const useDebounce = (text: string, time: number = 500) => {
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedText(text), time);
    return () => clearTimeout(timeoutId);
  }, [text, time]);

  return debouncedText;
};
