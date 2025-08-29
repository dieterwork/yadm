import uuid from "../../shared/utils/uuid";
import type { DEMOHandlesData } from "../nodes/nodes.types";
import { MEDIUM_NODE_SIZE } from "../nodes/utils/consts";

interface UpdateNodeHandlesParams {
  width: number;
  height: number;
  direction: number[];
  defaultHeight?: number;
  defaultWidth?: number;
  handles: DEMOHandlesData;
}
export const getNodeHandlesOnResize = ({
  width,
  height,
  direction,
  defaultWidth = MEDIUM_NODE_SIZE,
  defaultHeight = MEDIUM_NODE_SIZE,
  handles,
}: UpdateNodeHandlesParams) => {
  const [wDirection, hDirection] = direction;

  const wRatio = Math.floor(width / defaultWidth);

  if (wDirection < 0) {
    if (handles.top?.handles && wRatio < handles.top.handles.length) {
      handles = {
        ...handles,
        top: { ...handles.top, handles: handles.top.handles.slice(0, -1) },
      };
    }
    if (handles.bottom?.handles && wRatio < handles.bottom.handles.length) {
      handles = {
        ...handles,
        bottom: {
          ...handles.bottom,
          handles: handles.bottom.handles.slice(0, -1),
        },
      };
    }
  } else if (wDirection > 0) {
    if (
      handles.top?.handles &&
      wRatio > handles.top.handles.length &&
      (!handles.top.max || wRatio < handles.top.max)
    ) {
      handles = {
        ...handles,
        top: {
          ...handles.top,
          handles: [...handles.top.handles, { id: uuid(), style: { left: 0 } }],
        },
      };
    }
    if (
      handles.bottom?.handles &&
      wRatio > handles.bottom.handles.length &&
      (!handles.bottom.max || wRatio < handles.bottom.max)
    ) {
      handles = {
        ...handles,
        bottom: {
          ...handles.bottom,
          handles: [
            ...handles.bottom.handles,
            { id: uuid(), style: { left: 0 } },
          ],
        },
      };
    }
  }

  const hRatio = Math.floor(height / defaultHeight);

  if (hDirection < 0) {
    if (handles.left?.handles && hRatio < handles.left.handles.length) {
      handles = {
        ...handles,
        left: { ...handles.left, handles: handles.left.handles.slice(0, -1) },
      };
    }
    if (handles.right?.handles && hRatio < handles.right.handles.length) {
      handles = {
        ...handles,
        right: {
          ...handles.right,
          handles: handles.right.handles.slice(0, -1),
        },
      };
    }
  } else if (hDirection > 0) {
    if (
      handles.left?.handles &&
      hRatio > handles.left.handles.length &&
      (!handles.left.max || wRatio < handles.left.max)
    ) {
      handles = {
        ...handles,
        left: {
          ...handles.left,
          handles: [...handles.left.handles, { id: uuid(), style: { top: 0 } }],
        },
      };
    }
    if (
      handles.right?.handles &&
      hRatio > handles.right.handles.length &&
      (!handles.right.max || wRatio < handles.right.max)
    ) {
      handles = {
        ...handles,
        right: {
          ...handles.right,
          handles: [
            ...handles.right.handles,
            { id: uuid(), style: { top: 0 } },
          ],
        },
      };
    }
  }

  handles = {
    ...handles,
    top: {
      ...handles.top,
      handles:
        handles.top?.handles &&
        handles.top.handles.map((handle, i) => ({
          ...handle,
          style: {
            left: ((i + 1) / Math.floor(width / defaultWidth + 1)) * width,
          },
        })),
    },
    bottom: {
      ...handles.bottom,
      handles:
        handles.bottom?.handles &&
        handles.bottom.handles.map((handle, i) => ({
          ...handle,
          style: {
            left: ((i + 1) / Math.floor(width / defaultWidth + 1)) * width,
          },
        })),
    },
    left: {
      ...handles.left,
      handles:
        handles.left?.handles &&
        handles.left.handles.map((handle, i) => ({
          ...handle,
          style: {
            top: ((i + 1) / Math.floor(height / defaultHeight + 1)) * height,
          },
        })),
    },
    right: {
      ...handles.right,
      handles:
        handles.right?.handles &&
        handles.right.handles.map((handle, i) => ({
          ...handle,
          style: {
            top: ((i + 1) / Math.floor(height / defaultHeight + 1)) * height,
          },
        })),
    },
  };

  return handles;
};
