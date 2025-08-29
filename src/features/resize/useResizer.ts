import { useState } from "react";
import uuid from "../../shared/utils/uuid";
import { MEDIUM_NODE_SIZE } from "../nodes/utils/consts";
import { useUpdateNodeInternals } from "@xyflow/react";

type PosArrParams =
  | {
      offset?: {
        fromTop?: number;
        fromBottom?: number;
        fromLeft?: number;
        fromRight?: number;
      };
      maxNum?: number;
    }
  | true;

interface UseResizerHandlesParams {
  nodeId: string;
  top?: PosArrParams;
  left?: PosArrParams;
  bottom?: PosArrParams;
  right?: PosArrParams;
  width?: number;
  height?: number;
  defaultSizeWidth?: number;
  defaultSizeHeight?: number;
}

export const useResizerHandles = ({
  nodeId,
  top,
  left,
  bottom,
  right,
  width,
  height,
  defaultSizeWidth = MEDIUM_NODE_SIZE,
  defaultSizeHeight = MEDIUM_NODE_SIZE,
}: UseResizerHandlesParams) => {
  const [prevWidth, setPrevWidth] = useState(width ? width : undefined);
  const [prevHeight, setPrevHeight] = useState(height ? height : undefined);
  const [leftArr, setLeftArr] = useState(
    left ? [{ id: uuid(), style: { top: defaultSizeHeight / 2 } }] : undefined
  );
  const [rightArr, setRightArr] = useState(
    right ? [{ id: uuid(), style: { top: defaultSizeHeight / 2 } }] : undefined
  );
  const [topArr, setTopArr] = useState(
    top ? [{ id: uuid(), style: { left: defaultSizeWidth / 2 } }] : undefined
  );
  const [bottomArr, setBottomArr] = useState(
    bottom ? [{ id: uuid(), style: { left: defaultSizeWidth / 2 } }] : undefined
  );

  setWidthArrs: if (prevWidth !== width) {
    setPrevWidth(width);
    if (!prevWidth || !width) break setWidthArrs;

    const wRatio = width / defaultSizeWidth;
    const prevWRatio = prevWidth / defaultSizeWidth;

    // Get difference
    const diff = Math.floor(wRatio) - Math.floor(prevWRatio);

    if (diff < 0) {
      setTopArr((arr) => (arr ? arr.slice(0, -1) : undefined));
      setBottomArr((arr) => (arr ? arr.slice(0, -1) : undefined));
    } else if (diff > 0) {
      setTopArr((arr) =>
        [...arr, { id: uuid(), style: { left: 0 } }].map((handle, i) => ({
          ...handle,
          style: {
            left: ((i + 1) / Math.floor(width / defaultSizeWidth + 1)) * width,
          },
        }))
      );
      setBottomArr((arr) =>
        [...arr, { id: uuid(), style: { left: 0 } }].map((handle, i) => ({
          ...handle,
          style: {
            left: ((i + 1) / Math.floor(width / defaultSizeWidth + 1)) * width,
          },
        }))
      );
    } else {
      setTopArr((arr) =>
        arr.map((handle, i) => ({
          ...handle,
          style: {
            left: ((i + 1) / Math.floor(width / MEDIUM_NODE_SIZE + 1)) * width,
          },
        }))
      );
      setBottomArr((arr) =>
        arr.map((handle, i) => ({
          ...handle,
          style: {
            left: ((i + 1) / Math.floor(width / MEDIUM_NODE_SIZE + 1)) * width,
          },
        }))
      );
    }
  }

  setHeightArrs: if (prevHeight !== height) {
    setPrevHeight(height);
    if (!prevHeight || !height) break setHeightArrs;

    const hRatio = height / defaultSizeHeight;
    const prevHRatio = prevHeight / defaultSizeHeight;

    // Get difference
    const diff = Math.floor(hRatio) - Math.floor(prevHRatio);

    if (diff < 0) {
      setLeftArr((arr) => (arr ? arr.slice(0, -1) : undefined));
      setRightArr((arr) => (arr ? arr.slice(0, -1) : undefined));
    } else if (diff > 0) {
      setLeftArr((arr) =>
        [...arr, { id: uuid(), style: { top: 0 } }].map((handle, i) => ({
          ...handle,
          style: {
            top:
              ((i + 1) / Math.floor(height / defaultSizeHeight + 1)) * height,
          },
        }))
      );
      setRightArr((arr) =>
        [...arr, { id: uuid(), style: { top: 0 } }].map((handle, i) => ({
          ...handle,
          style: {
            top:
              ((i + 1) / Math.floor(height / defaultSizeHeight + 1)) * height,
          },
        }))
      );
    } else {
      setLeftArr((arr) =>
        arr.map((handle, i) => ({
          ...handle,
          style: {
            top:
              ((i + 1) / Math.floor(height / defaultSizeHeight + 1)) * height,
          },
        }))
      );
      setRightArr((arr) =>
        arr.map((handle, i) => ({
          ...handle,
          style: {
            top:
              ((i + 1) / Math.floor(height / defaultSizeHeight + 1)) * height,
          },
        }))
      );
    }
  }

  return {
    topArray: topArr,
    leftArray: leftArr,
    rightArray: rightArr,
    bottomArray: bottomArr,
  };
};
