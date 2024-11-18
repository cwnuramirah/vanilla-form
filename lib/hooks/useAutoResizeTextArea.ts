import { useEffect, useRef } from "react";

export default function useAutoResizeTextArea(
  value: string
): React.RefCallback<HTMLTextAreaElement> {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      adjustHeight(ref.current);
    }
  }, [value]);

  const adjustHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    const newHeight = textarea.scrollHeight;
    textarea.style.height = `${newHeight}px`;
  };

  return (node: HTMLTextAreaElement | null) => {
    ref.current = node;
    if (node) {
      adjustHeight(node);
    }
  };
}
