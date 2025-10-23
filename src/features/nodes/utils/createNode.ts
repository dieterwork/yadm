import { Position, type XYPosition } from "@xyflow/react";
import type { DEMONode } from "../nodes.types";
import uuid from "../../../shared/utils/uuid";
import {
  DEFAULT_CONTENT_MAP,
  DEFAULT_SIZE_MAP,
  MEDIUM_NODE_SIZE,
  SMALL_NODE_SIZE,
} from "./consts";
import type { CSSProperties } from "react";

interface CreateNodeParams {
  type: DEMONode["type"];
  position: XYPosition;
  parentId?: string;
  id?: string;
  width?: number;
  height?: number;
  content?: string;
  selected?: boolean;
  zIndex?: number;
  textAlign?: CSSProperties["textAlign"];
}

export const createNode = ({
  type,
  position,
  parentId,
  id,
  width,
  height,
  content,
  selected,
  zIndex,
  textAlign,
}: CreateNodeParams): DEMONode | DEMONode[] => {
  if (!id) id = uuid();
  switch (type) {
    case "actor": {
      return {
        id: `actor_${id}`,
        type: type,
        position,
        data: {
          state: "default",
          content: DEFAULT_CONTENT_MAP[type],
          scope: "in",
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source" }],
            },
            bottom: {
              handles: [{ id: uuid(), type: "source" }],
            },
            left: {
              handles: [{ id: uuid(), type: "source" }],
            },
            right: {
              handles: [{ id: uuid(), type: "source" }],
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "white",
          stroke: "black",
        },
        selected: true,
      };
    }

    case "transaction": {
      return {
        id: `transaction_${id}`,
        type: type,
        position,
        data: {
          state: "default",
          content: DEFAULT_CONTENT_MAP[type],
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            bottom: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            left: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            right: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "white",
          stroke: "black",
        },
        selected: true,
      };
    }

    case "transactor": {
      return {
        id: id,
        type: type,
        position,
        data: {
          state: "default",
          content: DEFAULT_CONTENT_MAP[type],
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            bottom: {
              handles: [{ id: uuid(), type: "source" }],
            },
            left: {
              handles: [{ id: uuid(), type: "source" }],
              offset: MEDIUM_NODE_SIZE / 2,
            },
            right: {
              handles: [{ id: uuid(), type: "source" }],
              offset: MEDIUM_NODE_SIZE / 2,
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "white",
          stroke: "black",
        },
        selected: true,
      };
    }

    case "self_activation": {
      return {
        id: id,
        type: type,
        position,
        data: {
          state: "default",
          content: DEFAULT_CONTENT_MAP[type],
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source" }],
            },
            bottom: {
              handles: [{ id: uuid(), type: "source" }],
            },
            left: {
              handles: [{ id: uuid(), type: "source" }],
            },
            right: {
              handles: [{ id: uuid(), type: "source" }],
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "white",
          stroke: "black",
        },
        selected: true,
      };
    }

    case "composite": {
      return {
        id: id,
        type: type,
        position,
        data: {
          state: "default",
          content: DEFAULT_CONTENT_MAP[type],
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source" }],
            },
            bottom: {
              handles: [{ id: uuid(), type: "source" }],
            },
            left: {
              handles: [{ id: uuid(), type: "source" }],
            },
            right: {
              handles: [{ id: uuid(), type: "source" }],
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "white",
          stroke: "var(--color-slate-500)",
          strokeWidth: 16,
        },
        selected: true,
      };
    }

    case "elementary_actor": {
      return {
        id: id,
        type: type,
        position,
        data: {
          state: "default",
          content: DEFAULT_CONTENT_MAP[type],
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            bottom: {
              handles: [{ id: uuid(), type: "source" }],
            },
            left: {
              handles: [{ id: uuid(), type: "source" }],
              offset: MEDIUM_NODE_SIZE / 2,
            },
            right: {
              handles: [{ id: uuid(), type: "source" }],
              offset: MEDIUM_NODE_SIZE / 2,
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "white",
          stroke: "var(--color-slate-500)",
          strokeWidth: 16,
        },
        selected: true,
      };
    }

    case "several_actors": {
      return {
        id: id,
        type: type,
        position,
        data: {
          state: "default",
          content: DEFAULT_CONTENT_MAP[type],
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source" }],
            },
            bottom: {
              handles: [{ id: uuid(), type: "source" }],
            },
            left: {
              handles: [{ id: uuid(), type: "source" }],
              offset: MEDIUM_NODE_SIZE / 2,
            },
            right: {
              handles: [{ id: uuid(), type: "source" }],
              offset: MEDIUM_NODE_SIZE / 2,
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "white",
          stroke: "var(--color-slate-500)",
          strokeWidth: 16,
        },
        selected: true,
      };
    }

    case "production_event": {
      return {
        id: id,
        type: type,
        position,
        data: {
          content: DEFAULT_CONTENT_MAP[type],
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
              step: SMALL_NODE_SIZE,
            },
            bottom: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
              step: SMALL_NODE_SIZE,
            },
            left: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
              step: SMALL_NODE_SIZE,
            },
            right: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
              step: SMALL_NODE_SIZE,
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "var(--color-red-500)",
          fillOpacity: 1,
          strokeWidth: 2,
          stroke: "black",
        },
        selected: true,
      };
    }

    case "entity_class": {
      return {
        id: id,
        type: type,
        position,
        data: {
          content: DEFAULT_CONTENT_MAP[type],
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source" }],
            },
            bottom: {
              handles: [{ id: uuid(), type: "source" }],
            },
            left: {
              handles: [{ id: uuid(), type: "source" }],
            },
            right: {
              handles: [{ id: uuid(), type: "source" }],
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "white",
          strokeWidth: 2,
          stroke: "black",
        },
        selected: true,
      };
    }

    case "derived_entity": {
      return {
        id,
        type: type,
        position,
        data: {
          scope: "in",
          content: DEFAULT_CONTENT_MAP[type],
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source" }],
            },
            bottom: {
              handles: [{ id: uuid(), type: "source" }],
            },
            left: {
              handles: [{ id: uuid(), type: "source" }],
            },
            right: {
              handles: [{ id: uuid(), type: "source" }],
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "white",
          strokeWidth: 2,
          stroke: "black",
        },
        selected: true,
      };
    }

    // transaction pattern diagram
    case "transaction_time": {
      return [
        {
          id,
          type: "transaction_time",
          position,
          data: {
            handles: {
              isVisible: true,
              left: {
                handles: [{ id: uuid(), type: "source" }],
              },
              right: {
                handles: [{ id: uuid(), type: "source" }],
              },
            },
          },
          style: {
            width: DEFAULT_SIZE_MAP["transaction_time"].width,
            height: DEFAULT_SIZE_MAP["transaction_time"].height,
            fill: "white",
            strokeWidth: 2,
            stroke: "black",
          },
          selected: true,
          zIndex: 1,
        },
        {
          id: uuid(),
          parentId: id,
          type: "transaction_kind",
          position: {
            x:
              DEFAULT_SIZE_MAP["transaction_time"].width / 2 -
              DEFAULT_SIZE_MAP["transaction_kind"].width / 2,
            y:
              DEFAULT_SIZE_MAP["transaction_time"].height / 2 -
              DEFAULT_SIZE_MAP["transaction_kind"].height / 2,
          },
          data: {
            content: DEFAULT_CONTENT_MAP["transaction_kind"],
          },
          style: {
            width: DEFAULT_SIZE_MAP["transaction_kind"].width,
            height: DEFAULT_SIZE_MAP["transaction_kind"].height,
            fill: "white",
            strokeWidth: 2,
            stroke: "black",
          },
          extent: "parent",
          selected: false,
          connectable: false,
          zIndex: 2,
        },
      ];
    }

    case "initiation_fact": {
      return {
        id,
        type,
        position,
        parentId,
        data: {
          color: "default",
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            bottom: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            left: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            right: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "white",
          strokeWidth: 2,
          stroke: "black",
        },
        selected: true,
        zIndex: 2000,
      };
    }

    case "c_fact": {
      return {
        id,
        type,
        position,
        parentId,
        data: {
          color: "default",
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            bottom: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            left: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            right: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "white",
          strokeWidth: 2,
          stroke: "black",
        },
        selected: true,
        zIndex: 2000,
      };
    }

    case "c_act": {
      return {
        id,
        type,
        position,
        parentId,
        data: {
          color: "default",
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            bottom: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            left: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            right: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "white",
          strokeWidth: 2,
          stroke: "black",
        },
        selected: true,
        zIndex: 2000,
      };
    }
    case "tk_execution": {
      return {
        id,
        type,
        position,
        parentId,
        data: {
          color: "default",
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            bottom: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            left: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
            right: {
              handles: [{ id: uuid(), type: "source" }],
              max: 1,
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "var(--color-slate-500)",
          strokeWidth: 2,
          stroke: "black",
        },
        selected: true,
        zIndex: 2000,
      };
    }
    case "text": {
      return {
        id,
        type,
        position,
        parentId,
        data: {
          fontSize: 12,
          alignContent: "start",
          textAlign,
          content: content ?? DEFAULT_CONTENT_MAP["text"],
          isBorderVisible: true,
        },
        style: {
          width: width ?? DEFAULT_SIZE_MAP["text"].width,
          height: height ?? DEFAULT_SIZE_MAP["text"].height,
        },
        selected: selected ?? true,
        zIndex: 3000,
      };
    }
    default:
      throw new Error(`Could not find node type ${type}`);
  }
};
