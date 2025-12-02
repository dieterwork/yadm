import {
  useEffect,
  type CSSProperties,
  type FormEvent,
  type InputEvent,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { setMaxLength } from "./utils/setMaxLength";
import { toggleBoldText } from "./utils/toggleBoldText";
import {
  setAction,
  updateNode,
  updateNodeEditable,
  useDEMOModelerStore,
} from "../modeler/useDEMOModelerStore";
import { setMaxLines } from "./utils/setMaxLines";
import useClickOutside from "$/shared/hooks/useClickOutside";

export const useEditableContent = ({
  content,
  ref,
  onContentUpdate,
  maxLines,
  maxLength,
  nodeId,
  fontSize,
  leading,
  textAlign,
}: {
  content?: string;
  ref: RefObject<HTMLSpanElement>;
  onContentUpdate: (e: string) => void;
  maxLines?: number;
  maxLength?: number;
  nodeId: string;
  fontSize: number;
  leading: number;
  textAlign: CSSProperties["textAlign"];
}) => {
  useClickOutside(ref, () => {
    if (document.activeElement !== ref.current) return;
    if (!(document.activeElement instanceof HTMLSpanElement)) return;
    updateNodeEditable(nodeId, false);
    updateNode(nodeId, { draggable: true, selected: true });
    setAction("pan");
    setTimeout(() => {
      if (document.activeElement !== ref.current) return;
      if (!(document.activeElement instanceof HTMLSpanElement)) return;
      document.activeElement.blur();
    }, 50);
  });

  const onInput = (e: FormEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (!(target instanceof HTMLElement)) return;

    onContentUpdate(target.innerHTML);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey && e.key === "b") {
      toggleBoldText(e);
    }
  };

  const onBeforeInput = (e: InputEvent<HTMLDivElement>) => {
    if (maxLength) {
      setMaxLength(e, ref.current, maxLength);
    }
    if (maxLines) {
      setMaxLines(e, ref.current, maxLines, fontSize, leading, textAlign);
    }
  };
  return { onInput, onKeyDown, onBeforeInput };
};
