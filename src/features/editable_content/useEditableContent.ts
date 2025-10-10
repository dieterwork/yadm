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
  useOnSelectionChange,
  type OnSelectionChangeFunc,
} from "@xyflow/react";
import {
  setAction,
  updateNode,
  updateNodeEditable,
} from "../modeler/useDEMOModelerStore";
import type { DEMONode } from "../nodes/nodes.types";
import type { DEMOEdge } from "../edges/edges.types";
import { setMaxLines } from "./utils/setMaxLines";

let didInit = false;

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
  ref: RefObject<HTMLDivElement>;
  onContentUpdate: (e: string) => void;
  maxLines?: number;
  maxLength?: number;
  nodeId: string;
  fontSize: number;
  leading: number;
  textAlign: CSSProperties["textAlign"];
}) => {
  // const onChange: OnSelectionChangeFunc<DEMONode, DEMOEdge> = ({ nodes }) => {
  //   const hasSelectedNode = nodes.some((node) => nodeId === node.id);
  //   if (!hasSelectedNode) {
  //     updateNodeEditable(nodeId, false);
  //     updateNode(nodeId, { draggable: true });
  //   }
  // };
  // useOnSelectionChange({
  //   onChange,
  // });

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      const el = ref?.current;
      if (el && content) {
        if (!el.textContent) {
          el.innerHTML = "<br />";
        } else {
          el.innerHTML = content;
        }
      }
    }
  }, []);

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
