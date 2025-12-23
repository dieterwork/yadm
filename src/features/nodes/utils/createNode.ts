import { Position, type XYPosition } from "@xyflow/react";
import type { DEMONode } from "../nodes.types";
import uuid from "../../../shared/utils/uuid";
import {
  DEFAULT_CONTENT_MAP,
  DEFAULT_SIZE_MAP,
  MEDIUM_NODE_SIZE,
  SMALL_NODE_SIZE,
  X_SMALL_NODE_SIZE,
} from "./consts";
import type { CSSProperties } from "react";
import { calculateDoubleDiamondInCircleDimensions } from "$/features/shapes/utils/calculateDoubleDiamondInCircleDimensions";

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
        ariaLabel: "Actor",
        type: type,
        position,
        deletable: true,
        data: {
          subModel: "cooperation_model",
          state: "default",
          content: DEFAULT_CONTENT_MAP[type],
          scope: "in",
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
            },
            bottom: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
            },
            left: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
            },
            right: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
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
        zIndex: 190,
      };
    }

    case "transaction": {
      return {
        id: `transaction_${id}`,
        ariaLabel: "Transaction",
        type: type,
        position,
        deletable: true,
        data: {
          subModel: "cooperation_model",
          scope: "in",
          state: "default",
          content: DEFAULT_CONTENT_MAP[type],
          handles: {
            isVisible: true,
            top: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
            },
            bottom: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
            },
            left: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
            },
            right: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
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
        zIndex: 190,
      };
    }

    case "transactor": {
      const transactionId = uuid();
      const actorId = uuid();
      const transactionSize = calculateDoubleDiamondInCircleDimensions(
        DEFAULT_SIZE_MAP["transaction"].width
      );
      transactionSize.width = transactionSize.width + 4;
      return [
        {
          id: actorId,
          type: "actor",
          ariaLabel: "Actor",
          position: { x: 0, y: DEFAULT_SIZE_MAP["transaction"].height / 2 },
          deletable: false,
          data: {
            state: "default",
            content: DEFAULT_CONTENT_MAP["actor"],
            handles: {
              isVisible: true,
              bottom: {
                handles: [{ id: uuid(), type: "source", offset: 0.5 }],
                max: 1,
              },
              left: {
                handles: [{ id: uuid(), type: "source", offset: 0.5 }],
                max: 1,
              },
              right: {
                handles: [{ id: uuid(), type: "source", offset: 0.5 }],
                max: 1,
              },
            },
            resizable: false,
            actions: [
              "addHandle",
              "changeColor",
              "toggleHandlesVisibility",
              "editText",
              "changeFontSize",
            ],
          },
          style: {
            width: DEFAULT_SIZE_MAP[type].width,
            height:
              DEFAULT_SIZE_MAP[type].height -
              DEFAULT_SIZE_MAP["transaction"].height / 2,
            fill: "white",
            stroke: "var(--color-slate-900)",
            strokeWidth: 2,
          },
          selected: false,
          parentId: id,
          draggable: false,
          extent: [
            [0, DEFAULT_SIZE_MAP["transaction"].height],
            [DEFAULT_SIZE_MAP[type].width, DEFAULT_SIZE_MAP[type].height],
          ],
          zIndex: 170,
        },
        {
          id: transactionId,
          type: "transaction",
          ariaLabel: "Transaction",
          deletable: false,
          position: {
            x:
              DEFAULT_SIZE_MAP[type].width / 2 -
              DEFAULT_SIZE_MAP["transaction"].width / 2,
            y: 0,
          },
          data: {
            state: "default",
            content: DEFAULT_CONTENT_MAP["transaction"],
            handles: {
              isVisible: true,
              top: {
                handles: [
                  { id: uuid(), type: "source", offset: 0.5, canDrag: false },
                ],
                max: 1,
              },
            },
            actions: [
              "addHandle",
              "changeColor",
              "toggleHandlesVisibility",
              "editText",
              "changeFontSize",
            ],
            resizable: false,
          },
          style: {
            width: DEFAULT_SIZE_MAP["transaction"].width,
            height: DEFAULT_SIZE_MAP["transaction"].height,
            stroke: "var(--color-slate-900)",
            strokeWidth: 2,
          },
          selected: false,
          parentId: id,
          extent: [
            [
              DEFAULT_SIZE_MAP[type].width / 2 -
                DEFAULT_SIZE_MAP["transaction"].width / 2,
              0,
            ],
            [
              DEFAULT_SIZE_MAP[type].width / 2 +
                DEFAULT_SIZE_MAP["transaction"].width / 2,
              DEFAULT_SIZE_MAP["transaction"].height,
            ],
          ],
          zIndex: 180,
          draggable: false,
        },
        {
          id: id,
          type: type,
          ariaLabel: "Transactor",
          position,
          deletable: true,
          data: {
            state: "internal",
            content: DEFAULT_CONTENT_MAP[type],
            actions: [
              "changeColor",
              "changeFontSize",
              "toggleHandlesVisibility",
            ],
            subModel: "cooperation_model",
          },
          style: {
            width: DEFAULT_SIZE_MAP[type].width,
            height: DEFAULT_SIZE_MAP[type].height,
          },
          selected: true,
          zIndex: 190,
        },
      ];
    }

    case "self_activation": {
      return {
        id: id,
        type: type,
        position,
        ariaLabel: "Self Activation",
        deletable: true,
        data: {
          state: "default",
          content: DEFAULT_CONTENT_MAP[type],
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
            },
            bottom: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
            },
            left: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
            },
            right: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
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
        zIndex: 190,
      };
    }

    case "composite": {
      return {
        id: id,
        type: type,
        position,
        ariaLabel: "Composite",
        deletable: true,
        data: {
          state: "default",
          content: DEFAULT_CONTENT_MAP[type],
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
            },
            bottom: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
            },
            left: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
            },
            right: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
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
        zIndex: 190,
      };
    }

    case "elementary_actor": {
      const transactionId = uuid();
      const compositeId = uuid();

      return [
        {
          id: compositeId,
          type: "composite",
          ariaLabel: "Composite",
          deletable: false,
          position: { x: 0, y: DEFAULT_SIZE_MAP["transaction"].height / 2 },
          data: {
            state: "default",
            content: DEFAULT_CONTENT_MAP["composite"],
            handles: {
              isVisible: true,
              bottom: {
                handles: [{ id: uuid(), type: "source", offset: 0.5 }],
                max: 1,
              },
              left: {
                handles: [{ id: uuid(), type: "source", offset: 0.5 }],
                max: 1,
              },
              right: {
                handles: [{ id: uuid(), type: "source", offset: 0.5 }],
                max: 1,
              },
            },
            resizable: false,
            actions: [
              "addHandle",
              "changeColor",
              "toggleHandlesVisibility",
              "editText",
              "changeFontSize",
            ],
          },
          style: {
            width: DEFAULT_SIZE_MAP[type].width,
            height:
              DEFAULT_SIZE_MAP[type].height -
              DEFAULT_SIZE_MAP["transaction"].height / 2,
            fill: "white",
            stroke: "var(--color-slate-500)",
          },
          selected: false,
          parentId: id,
          draggable: false,
          extent: [
            [0, DEFAULT_SIZE_MAP["transaction"].height],
            [DEFAULT_SIZE_MAP[type].width, DEFAULT_SIZE_MAP[type].height],
          ],
          zIndex: 170,
        },
        {
          id: transactionId,
          type: "transaction",
          ariaLabel: "Transaction",
          deletable: false,
          position: {
            x:
              DEFAULT_SIZE_MAP[type].width / 2 -
              DEFAULT_SIZE_MAP["transaction"].width / 2,
            y: 0,
          },
          data: {
            state: "default",
            content: DEFAULT_CONTENT_MAP["transaction"],
            handles: {
              isVisible: true,
              top: {
                handles: [
                  { id: uuid(), type: "source", offset: 0.5, canDrag: false },
                ],
                max: 1,
              },
            },
            actions: [
              "addHandle",
              "changeColor",
              "toggleHandlesVisibility",
              "editText",
              "changeFontSize",
            ],
            resizable: false,
          },
          style: {
            width: DEFAULT_SIZE_MAP["transaction"].width,
            height: DEFAULT_SIZE_MAP["transaction"].height,
            stroke: "var(--color-slate-900)",
            strokeWidth: 2,
          },
          selected: false,
          parentId: id,
          extent: [
            [
              DEFAULT_SIZE_MAP[type].width / 2 -
                DEFAULT_SIZE_MAP["transaction"].width / 2,
              0,
            ],
            [
              DEFAULT_SIZE_MAP[type].width / 2 +
                DEFAULT_SIZE_MAP["transaction"].width / 2,
              DEFAULT_SIZE_MAP["transaction"].height,
            ],
          ],
          draggable: false,
          zIndex: 180,
        },
        {
          id: id,
          type: type,
          position,
          ariaLabel: "Elementary Actor",
          deletable: true,
          data: {
            state: "internal",
            content: DEFAULT_CONTENT_MAP[type],
            actions: [
              "changeColor",
              "changeFontSize",
              "toggleHandlesVisibility",
            ],
            subModel: "cooperation_model",
          },
          style: {
            width: DEFAULT_SIZE_MAP[type].width,
            height: DEFAULT_SIZE_MAP[type].height,
          },
          selected: true,
          zIndex: 190,
        },
      ];
    }

    case "several_actors": {
      const transactionId = uuid();
      const actorId = uuid();
      const transactionSize = calculateDoubleDiamondInCircleDimensions(
        DEFAULT_SIZE_MAP["transaction"].width
      );
      transactionSize.width = transactionSize.width + 4;
      return [
        {
          id: actorId,
          type: "actor",
          ariaLabel: "Actor",
          position: { x: 0, y: DEFAULT_SIZE_MAP["transaction"].height / 2 },
          deletable: false,
          data: {
            subModel: "cooperation_model",
            state: "default",
            content: DEFAULT_CONTENT_MAP["actor"],
            handles: {
              isVisible: true,
              bottom: {
                handles: [{ id: uuid(), type: "source", offset: 0.5 }],
                max: 1,
              },
              left: {
                handles: [{ id: uuid(), type: "source", offset: 0.5 }],
                max: 1,
              },
              right: {
                handles: [{ id: uuid(), type: "source", offset: 0.5 }],
                max: 1,
              },
            },
            resizable: false,
            actions: [
              "addHandle",
              "changeColor",
              "toggleHandlesVisibility",
              "editText",
              "changeFontSize",
            ],
          },
          style: {
            width: DEFAULT_SIZE_MAP[type].width,
            height:
              DEFAULT_SIZE_MAP[type].height -
              DEFAULT_SIZE_MAP["transaction"].height / 2,
            fill: "white",
            stroke: "var(--color-slate-900)",
            strokeWidth: 2,
          },
          selected: false,
          parentId: id,
          draggable: false,
          extent: [
            [0, DEFAULT_SIZE_MAP["transaction"].height],
            [DEFAULT_SIZE_MAP[type].width, DEFAULT_SIZE_MAP[type].height],
          ],
          zIndex: 170,
        },
        {
          id: transactionId,
          type: "transaction",
          ariaLabel: "Transaction",
          deletable: false,
          position: {
            x: DEFAULT_SIZE_MAP[type].width / 2 - transactionSize.width / 2,
            y: 0,
          },
          data: {
            state: "double",
            content: DEFAULT_CONTENT_MAP["transaction"],
            handles: {
              isVisible: true,
              top: {
                handles: [
                  {
                    id: uuid(),
                    type: "source",
                    offset:
                      (DEFAULT_SIZE_MAP["several_actors"].width / 2 -
                        DEFAULT_SIZE_MAP["transaction"].width * (1 / 8) +
                        1) /
                      DEFAULT_SIZE_MAP["several_actors"].width,
                    canDrag: false,
                  },
                ],
                max: 1,
              },
            },
            actions: [
              "addHandle",
              "changeColor",
              "toggleHandlesVisibility",
              "editText",
              "changeFontSize",
            ],
            resizable: false,
          },
          style: {
            width: transactionSize.width,
            height: transactionSize.height,
            stroke: "var(--color-slate-900)",
            strokeWidth: 2,
          },
          selected: false,
          parentId: id,
          extent: [
            [DEFAULT_SIZE_MAP[type].width / 2 - transactionSize.width / 2, 0],
            [
              DEFAULT_SIZE_MAP[type].width / 2 + transactionSize.width / 2,
              transactionSize.height,
            ],
          ],
          zIndex: 180,
          draggable: false,
        },
        {
          id: id,
          type: type,
          position,
          deletable: true,
          ariaLabel: "Several Actors",
          data: {
            subModel: "cooperation_model",
            state: "internal",
            content: DEFAULT_CONTENT_MAP[type],
            actions: [
              "changeColor",
              "changeFontSize",
              "toggleHandlesVisibility",
            ],
          },
          style: {
            width: DEFAULT_SIZE_MAP[type].width,
            height: DEFAULT_SIZE_MAP[type].height,
          },
          selected: true,
          zIndex: 190,
        },
      ];
    }

    case "production_event": {
      return {
        id: id,
        type: type,
        position,
        ariaLabel: "Production Event",
        deletable: true,
        data: {
          subModel: "process_structure_diagram",
          content: DEFAULT_CONTENT_MAP[type],
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
              max: 1,
              step: SMALL_NODE_SIZE,
            },
            bottom: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
              max: 1,
              step: SMALL_NODE_SIZE,
            },
            left: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
              max: 1,
              step: SMALL_NODE_SIZE,
            },
            right: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
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
        zIndex: 190,
      };
    }

    case "entity_class": {
      return {
        id: id,
        type: type,
        position,
        ariaLabel: "Entity Class",
        deletable: true,
        data: {
          subModel: "process_structure_diagram",
          content: DEFAULT_CONTENT_MAP[type],
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
            },
            bottom: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
            },
            left: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
            },
            right: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
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
        zIndex: 190,
      };
    }

    case "derived_entity": {
      return {
        id,
        type: type,
        position,
        ariaLabel: "Derived Entity",
        deletable: true,
        data: {
          subModel: "process_structure_diagram",
          content: DEFAULT_CONTENT_MAP[type],
          handles: {
            isVisible: true,
            top: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
            },
            bottom: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
            },
            left: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
            },
            right: {
              handles: [{ id: uuid(), type: "source", offset: 0.5 }],
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
        zIndex: 190,
      };
    }

    // transaction pattern diagram
    case "transaction_time": {
      return [
        {
          id,
          type: "transaction_time",
          deletable: true,
          position,
          ariaLabel: "Transaction Time",
          data: {
            subModel: "object_fact_diagram",
            handles: {
              isVisible: true,
              left: {
                handles: [
                  { id: uuid(), type: "source", offset: 0.5, canDrag: false },
                ],
              },
              right: {
                handles: [
                  { id: uuid(), type: "source", offset: 0.5, canDrag: false },
                ],
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
          zIndex: 190,
        },
        {
          id: uuid(),
          parentId: id,
          type: "transaction_kind",
          deletable: false,
          ariaLabel: "Transaction Kind",
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
            subModel: "object_fact_diagram",
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
          zIndex: 180,
        },
      ];
    }

    case "initiation_fact": {
      return {
        id,
        type,
        position,
        parentId,
        ariaLabel: "Initiation Fact",
        deletable: true,
        data: {
          subModel: "object_fact_diagram",
          color: "default",
          handles: {
            isVisible: true,
            top: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
            },
            bottom: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
            },
            left: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
            },
            right: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
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
        zIndex: 200,
      };
    }

    case "c_fact": {
      return {
        id,
        type,
        position,
        parentId,
        ariaLabel: "C-Fact",
        deletable: true,
        data: {
          subModel: "object_fact_diagram",
          color: "default",
          handles: {
            isVisible: true,
            top: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
            },
            bottom: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
            },
            left: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
            },
            right: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
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
        zIndex: 200,
      };
    }

    case "c_act": {
      return {
        id,
        type,
        position,
        parentId,
        ariaLabel: "C-Act",
        deletable: true,
        data: {
          subModel: "object_fact_diagram",
          color: "default",
          handles: {
            isVisible: true,
            top: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
            },
            bottom: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
            },
            left: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
            },
            right: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
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
        zIndex: 200,
      };
    }
    case "tk_execution": {
      return {
        id,
        type,
        position,
        parentId,
        ariaLabel: "TK / Execution",
        deletable: true,
        data: {
          subModel: "object_fact_diagram",
          color: "default",
          handles: {
            isVisible: true,
            top: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
            },
            bottom: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
            },
            left: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
            },
            right: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
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
        zIndex: 200,
      };
    }
    case "text": {
      return {
        id,
        type,
        position,
        parentId,
        ariaLabel: "Text",
        deletable: true,
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
        zIndex: 210,
      };
    }
    case "organization": {
      return [
        {
          id,
          type,
          position,
          data: { state: "default" },
          ariaLabel: "Organization",
          deletable: true,
          style: {
            width: width ?? DEFAULT_SIZE_MAP["organization"].width,
            height: height ?? DEFAULT_SIZE_MAP["organization"].height,
            fill: "white",
            stroke: "var(--color-rose-500)",
            strokeWidth: 16,
          },
          selected: selected ?? true,
          zIndex: 100,
        },
        {
          id: uuid(),
          type: "text",
          deletable: true,
          position: {
            x:
              DEFAULT_SIZE_MAP["organization"].width / 2 -
              DEFAULT_SIZE_MAP["organization"].width / 4,
            y: -X_SMALL_NODE_SIZE - 4,
          },
          parentId: id,
          ariaLabel: "Text",
          data: {
            content: "",
            textAlign: "center",
            isEditable: false,
            alignContent: "center",
            fontSize: 12,
            isBorderVisible: true,
          },
          style: {
            width: DEFAULT_SIZE_MAP["organization"].width / 2,
            height: X_SMALL_NODE_SIZE,
            fill: "white",
            stroke: "var(--color-rose-500)",
          },
          selected: selected ?? true,
          zIndex: 210,
        },
      ];
    }
    default:
      throw new Error(`Could not find node type ${type}`);
  }
};
