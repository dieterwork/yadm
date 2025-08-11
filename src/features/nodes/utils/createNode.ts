import type { XYPosition } from "@xyflow/react";
import type { DEMONode } from "../nodes.types";
import uuid from "../../../shared/utils/uuid";
import { DEFAULT_CONTENT_MAP, DEFAULT_SIZE_MAP } from "./consts";

interface CreateNodeParams {
  type: "actor" | "transactor" | "transaction" | "self_activation";
  position: XYPosition;
  parentId?: string;
  id?: string;
}
export const createNode = <T extends string>({
  type,
  position,
  parentId,
  id,
}: CreateNodeParams): DEMONode<T> | DEMONode<T>[] => {
  if (!id) id = uuid();
  switch (type) {
    case "actor": {
      return {
        id: id,
        type: type,
        position,
        data: {
          state: "default",
          content: DEFAULT_CONTENT_MAP[type],
          scope: "in",
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
        id: id,
        type: type,
        position,
        data: { state: "default", content: DEFAULT_CONTENT_MAP[type] },
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
        data: { state: "default", content: DEFAULT_CONTENT_MAP[type] },
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
        data: { state: "default", content: DEFAULT_CONTENT_MAP[type] },
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
        data: { state: "default", content: DEFAULT_CONTENT_MAP[type] },
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
        data: { state: "default", content: DEFAULT_CONTENT_MAP[type] },
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
        data: { state: "default", content: DEFAULT_CONTENT_MAP[type] },
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
        data: { content: DEFAULT_CONTENT_MAP[type] },
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
        data: { content: DEFAULT_CONTENT_MAP[type] },
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
        data: { scope: "in", content: DEFAULT_CONTENT_MAP[type] },
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
      const innerId = uuid();
      return [
        {
          id: id,
          position,
          type: "transaction_time",
          data: {},
          style: {
            width: DEFAULT_SIZE_MAP["transaction_time"].width,
            height: DEFAULT_SIZE_MAP["transaction_time"].height,
            fill: "white",
            strokeWidth: 2,
            stroke: "black",
          },
          selected: true,
        },
        {
          id: innerId,
          type: "transaction_time_inner",
          parentId: id,
          position: {
            x:
              DEFAULT_SIZE_MAP["transaction_time"].width / 2 -
              DEFAULT_SIZE_MAP["transaction_time_inner"].width / 2,
            y:
              DEFAULT_SIZE_MAP["transaction_time"].height / 2 -
              DEFAULT_SIZE_MAP["transaction_time_inner"].height / 2,
          },
          data: {},
          style: {
            width: DEFAULT_SIZE_MAP["transaction_time_inner"].width,
            height: DEFAULT_SIZE_MAP["transaction_time_inner"].height,
            fill: "white",
            strokeWidth: 2,
            stroke: "black",
          },
          extent: "parent",
          selected: false,
        },
        {
          id: uuid(),
          parentId: innerId,
          type: "transaction_kind",
          position: {
            x:
              DEFAULT_SIZE_MAP["transaction_time_inner"].width / 2 -
              DEFAULT_SIZE_MAP["transaction_kind"].width / 2,
            y:
              DEFAULT_SIZE_MAP["transaction_time_inner"].height / 2 -
              DEFAULT_SIZE_MAP["transaction_kind"].height / 2,
          },
          data: { content: DEFAULT_CONTENT_MAP[type] },
          style: {
            width: DEFAULT_SIZE_MAP["transaction_kind"].width,
            height: DEFAULT_SIZE_MAP["transaction_kind"].height,
            fill: "white",
            strokeWidth: 2,
            stroke: "black",
          },
          extent: [
            [12.5, 12.5],
            [
              DEFAULT_SIZE_MAP["transaction_time_inner"].width - 12.5,
              DEFAULT_SIZE_MAP["transaction_time_inner"].height - 12.5,
            ],
          ],
          selected: false,
        },
      ];
    }

    case "initiation_fact": {
      return {
        id,
        type,
        position,
        parentId,
        data: {},
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "white",
          strokeWidth: 2,
          stroke: "black",
        },
        selected: true,
        extent: "parent",
      };
    }

    case "c_fact": {
      return {
        id,
        type,
        position,
        parentId,
        data: {},
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "white",
          strokeWidth: 2,
          stroke: "black",
        },
        selected: true,
        extent: "parent",
      };
    }

    case "c_act": {
      return {
        id,
        type,
        position,
        parentId,
        data: {},
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "white",
          strokeWidth: 2,
          stroke: "black",
        },
        selected: true,
        extent: "parent",
      };
    }
    case "tk_execution": {
      return {
        id,
        type,
        position,
        parentId,
        data: {},
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: "var(--color-slate-500)",
          strokeWidth: 2,
          stroke: "black",
        },
        selected: true,
        extent: "parent",
      };
    }
    case "ofd_text_node": {
      return {
        id,
        type,
        position,
        parentId,
        data: {},
        style: {
          width: 50,
          height: 20,
        },
        selected: true,
      };
    }
    default:
      throw new Error(`Could not find node type ${type}`);
  }
};
