import type { DEMOHandlesData } from "../nodes/nodes.types";

interface UpdateNodeHandlesParams {
  width: number;
  height: number;
  handles: DEMOHandlesData;
}

const calcDefaultHandlePosition = (
  handleIndex: number,
  numOfHandles: number,
  size: number,
  max?: number,
  offset?: number
) => {
  const handleNum = handleIndex + 1;
  const sizeWithOffset = size - Math.abs(offset ?? 0);
  const handlePercentage =
    handleNum / Math.floor(Math.min(numOfHandles, max ?? 999) + 1);
  const position = handlePercentage * sizeWithOffset + (offset ?? 0);
  return position;
};

export const useNodeHandles = ({
  width,
  height,
  handles,
}: UpdateNodeHandlesParams): DEMOHandlesData => {
  return {
    ...handles,
    top: {
      ...handles.top,
      handles:
        handles.top?.handles &&
        handles.top.handles.map((handle, i, handlesArr) => ({
          ...handle,
          style: {
            left: calcDefaultHandlePosition(
              i,
              handlesArr.length,
              width,
              handles.top?.max,
              handles.top?.offset
            ),
          },
        })),
    },
    bottom: {
      ...handles.bottom,
      handles:
        handles.bottom?.handles &&
        handles.bottom.handles.map((handle, i, handlesArr) => ({
          ...handle,
          style: {
            left: calcDefaultHandlePosition(
              i,
              handlesArr.length,
              width,
              handles.bottom?.max,
              handles.bottom?.offset
            ),
          },
        })),
    },
    left: {
      ...handles.left,
      handles:
        handles.left?.handles &&
        handles.left.handles.map((handle, i, handlesArr) => ({
          ...handle,
          style: {
            top: calcDefaultHandlePosition(
              i,
              handlesArr.length,
              height,
              handles.left?.max,
              handles.left?.offset
            ),
          },
        })),
    },
    right: {
      ...handles.right,
      handles:
        handles.right?.handles &&
        handles.right.handles.map((handle, i, handlesArr) => ({
          ...handle,
          style: {
            top: calcDefaultHandlePosition(
              i,
              handlesArr.length,
              height,
              handles.right?.max,
              handles.right?.offset
            ),
          },
        })),
    },
  };
};
