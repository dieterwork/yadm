import {
  useEffect,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type RefObject,
} from "react";
import {
  getCaretPosition,
  getCurrentFocusedText,
  getInnerText,
  getSelectionOffset,
  setSelectionOffset,
} from "./utils";

export const useEditableContent = ({
  content,
  ref,
  onContentUpdate,
  maxLines,
}: {
  content?: string;
  ref: RefObject<HTMLDivElement>;
  onContentUpdate: (e: string) => void;
  maxLines?: number;
}) => {
  const [canEdit, setEdit] = useState(false);
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
    if (e.ctrlKey && e.key === "b") {
      e.preventDefault();
      const target = e.currentTarget;
      if (!(target instanceof Node)) throw new Error("Target is not a node");
      const text = getCurrentFocusedText(target);
      // get current selection
      const [start, end] = getSelectionOffset(target);
      if (!text) throw new Error("Could not find text");
      const elements = target.querySelectorAll("*");
      if (elements.length === 0) {
        // must be inner text
        target.innerHTML = "<b>" + target.innerText + "</b>";
      }
      let currentEl: HTMLElement | null = null;
      for (const el of elements) {
        console.log(el.innerText);
        if (!(el instanceof Node))
          throw new Error("Element is not an HTML element");
        if (el.innerText.trim() === text.trim()) {
          currentEl = el;
        }
      }
      if (!currentEl) return;
      if (currentEl?.nodeName === "B") {
        const parentDiv = currentEl.parentNode;
        if (!parentDiv) return;
        parentDiv.innerHTML = text;
      } else if (currentEl.nodeName === "DIV") {
        currentEl.innerHTML = "<b>" + text + "</b>";
      }
      setSelectionOffset(target, start, end);
    }
  };

  return { onInput, onKeyDown };
};
