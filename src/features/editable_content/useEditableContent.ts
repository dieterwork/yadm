import {
  useEffect,
  type FormEvent,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { setMaxLength, toggleBoldText } from "./utils";
export const useEditableContent = ({
  content,
  ref,
  onContentUpdate,
  maxLines,
  maxLength,
}: {
  content?: string;
  ref: RefObject<HTMLDivElement>;
  onContentUpdate: (e: string) => void;
  maxLines?: number;
  maxLength?: number;
}) => {
  useEffect(() => {
    const el = ref?.current;
    if (!el || !content) return;

    if (!el.innerHTML) el.innerHTML = "<br />";

    el.innerHTML = content;
  }, [content]);

  const onInput = (e: FormEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (!(target instanceof HTMLElement)) return;

    onContentUpdate(target.innerHTML);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // set max length
    if (maxLength) {
      setMaxLength(e, maxLength);
    }

    // toggle bold text
    if (e.ctrlKey && e.key === "b") {
      toggleBoldText(e);
    }
  };

  return { onInput, onKeyDown };
};
