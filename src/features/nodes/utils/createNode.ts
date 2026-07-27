import { type XYPosition } from "@xyflow/react";
import type { DEMONode } from "../nodes.types";
import uuid from "../../../shared/utils/uuid";
import {
  DEFAULT_CONTENT_MAP,
  DEFAULT_SIZE_MAP,
  SMALL_NODE_SIZE,
} from "./consts";
import type { CSSProperties } from "react";
import { calculateDoubleDiamondInCircleDimensions } from "$/features/shapes/utils/calculateDoubleDiamondInCircleDimensions";
import {
  NODE_BACKGROUND_COLOR_MAP,
  NODE_BORDER_COLOR_MAP,
  ORGANIZATION_BORDER_COLOR_MAP,
} from "$/shared/components/ui/colors/colors.consts";
import type { TFunction } from "i18next";

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
  translateFn: TFunction;
  data?: DEMONode["data"];
  style: CSSProperties;
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
  textAlign,
  translateFn: t,
  data,
  style,
}: CreateNodeParams): DEMONode | DEMONode[] => {
  if (!id) id = uuid();
  switch (type) {
    case "actor": {
      return {
        id: `actor_${id}`,
        ariaLabel: t(($) => $["Actor"]),
        type: type,
        position,
        deletable: true,
        data: {
          subModel: "cooperation_structure_diagram",
          state: "default",
          content: DEFAULT_CONTENT_MAP[type],
          focus: "in",
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
          fill: NODE_BACKGROUND_COLOR_MAP["default"],
          stroke: NODE_BORDER_COLOR_MAP["default"],
        },
        selected: true,
        zIndex: 190,
      };
    }

    case "transaction": {
      return {
        id: `transaction_${id}`,
        ariaLabel: t(($) => $["Transaction"]),
        type: type,
        position,
        deletable: true,
        data: {
          resizable: true,
          subModel: "cooperation_structure_diagram",
          focus: "in",
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
          fill: NODE_BACKGROUND_COLOR_MAP["default"],
          stroke: NODE_BORDER_COLOR_MAP["default"],
        },
        selected: true,
        zIndex: 190,
      };
    }

    case "multiple_transaction_kind": {
      return {
        id: `multiple_transaction_kind_${id}`,
        ariaLabel: t(($) => $["Multiple Transaction Kind"]),
        type: type,
        position,
        deletable: true,
        data: {
          resizable: true,
          subModel: "cooperation_structure_diagram",
          focus: "in",
          state: "default",
          content: DEFAULT_CONTENT_MAP[type],
          handles: {
            isVisible: true,
            top: {
              handles: [
                {
                  id: uuid(),
                  type: "source",
                  offset: 0.5 - 6 / DEFAULT_SIZE_MAP[type].width,
                  canDrag: false,
                },
              ],
              max: 1,
            },
            bottom: {
              handles: [
                {
                  id: uuid(),
                  type: "source",
                  offset: 0.5 - 6 / DEFAULT_SIZE_MAP[type].width,
                  canDrag: false,
                },
              ],
              max: 1,
            },
            left: {
              handles: [
                {
                  id: uuid(),
                  type: "source",
                  offset: 0.5,
                  canDrag: false,
                },
              ],
              max: 1,
            },
            right: {
              handles: [
                {
                  id: uuid(),
                  type: "source",
                  offset: 0.5,
                  canDrag: false,
                },
              ],
              max: 1,
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: NODE_BACKGROUND_COLOR_MAP["default"],
          stroke: NODE_BORDER_COLOR_MAP["default"],
        },
        selected: true,
        zIndex: 190,
      };
    }

    case "transactor": {
      const transactionId = uuid();
      const actorId = uuid();
      return [
        {
          id: actorId,
          type: "actor",
          ariaLabel: t(($) => $["Actor"]),
          position: { x: 0, y: DEFAULT_SIZE_MAP["transaction"].height / 2 },
          deletable: false,
          data: {
            state: "default",
            focus: "in",
            content: DEFAULT_CONTENT_MAP["actor"],
            handles: {
              isVisible: true,
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
            resizable: false,
            actions: [
              "addHandle",
              "changeColor",
              "toggleHandlesVisibility",
              "editText",
              "changeFontSize",
              "changeFocus",
            ],
          },
          style: {
            width: DEFAULT_SIZE_MAP[type].width,
            height:
              DEFAULT_SIZE_MAP[type].height -
              DEFAULT_SIZE_MAP["transaction"].height / 2,
            fill: NODE_BACKGROUND_COLOR_MAP["default"],
            stroke: NODE_BORDER_COLOR_MAP["default"],
            strokeWidth: 2,
          },
          selected: false,
          parentId: id,
          draggable: false,
          extent: [
            [0, DEFAULT_SIZE_MAP["transaction"].height],
            [DEFAULT_SIZE_MAP[type].width, DEFAULT_SIZE_MAP[type].height],
          ],
          zIndex: 191,
        },
        {
          id: transactionId,
          type: "transaction",
          ariaLabel: t(($) => $["Transaction"]),
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
            stroke: NODE_BORDER_COLOR_MAP["default"],
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
          zIndex: 192,
          draggable: false,
        },
        {
          id: id,
          type: type,
          ariaLabel: t(($) => $["Transactor"]),
          position,
          deletable: true,
          data: {
            content: DEFAULT_CONTENT_MAP[type],
            actions: [
              "changeColor",
              "changeFontSize",
              "toggleHandlesVisibility",
            ],
            subModel: "cooperation_structure_diagram",
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
      const transactionId = uuid();
      const actorId = uuid();
      return [
        {
          id: actorId,
          type: "actor",
          ariaLabel: t(($) => $["Actor"]),
          position: { x: 0, y: 0 },
          deletable: false,
          data: {
            state: "default",
            focus: "in",
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
            resizable: false,
            actions: [
              "addHandle",
              "changeColor",
              "toggleHandlesVisibility",
              "editText",
              "changeFontSize",
              "changeFocus",
            ],
          },
          style: {
            width: DEFAULT_SIZE_MAP[type].width,
            height: DEFAULT_SIZE_MAP[type].height,
            fill: NODE_BACKGROUND_COLOR_MAP["default"],
            stroke: NODE_BORDER_COLOR_MAP["default"],
            strokeWidth: 2,
          },
          selected: false,
          parentId: id,
          draggable: false,
          extent: [
            [0, 0],
            [DEFAULT_SIZE_MAP[type].width, DEFAULT_SIZE_MAP[type].height],
          ],
          zIndex: 191,
        },
        {
          id: transactionId,
          type: "transaction",
          ariaLabel: t(($) => $["Transaction"]),
          deletable: false,
          position: {
            x:
              DEFAULT_SIZE_MAP[type].width / 2 -
              DEFAULT_SIZE_MAP["transaction"].width / 2,
            y:
              DEFAULT_SIZE_MAP[type].height / 2 -
              DEFAULT_SIZE_MAP["transaction"].height / 2,
          },
          data: {
            state: "default",
            content: DEFAULT_CONTENT_MAP["transaction"],
            actions: ["changeColor", "editText", "changeFontSize"],
            resizable: false,
          },
          style: {
            width: DEFAULT_SIZE_MAP["transaction"].width,
            height: DEFAULT_SIZE_MAP["transaction"].height,
            stroke: NODE_BORDER_COLOR_MAP["default"],
            strokeWidth: 2,
          },
          selected: false,
          parentId: id,
          extent: [
            [
              DEFAULT_SIZE_MAP[type].width / 2 -
                DEFAULT_SIZE_MAP["transaction"].width / 2,
              DEFAULT_SIZE_MAP[type].height / 2 -
                DEFAULT_SIZE_MAP["transaction"].height / 2,
            ],
            [
              DEFAULT_SIZE_MAP[type].width / 2 +
                DEFAULT_SIZE_MAP["transaction"].width / 2,
              DEFAULT_SIZE_MAP[type].height / 2 +
                DEFAULT_SIZE_MAP["transaction"].height / 2,
            ],
          ],
          zIndex: 192,
          draggable: false,
        },
        {
          id: id,
          type: type,
          ariaLabel: t(($) => $["Self Activation"]),
          position,
          deletable: true,
          data: {
            subModel: "cooperation_structure_diagram",
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

    case "composite": {
      return {
        id: id,
        type: type,
        position,
        ariaLabel: t(($) => $["Composite"]),
        deletable: true,
        data: {
          focus: "in",
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
          fill: NODE_BACKGROUND_COLOR_MAP["default"],
          stroke: NODE_BORDER_COLOR_MAP["gray"],
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
          ariaLabel: t(($) => $["Composite"]),
          deletable: false,
          position: { x: 0, y: DEFAULT_SIZE_MAP["transaction"].height / 2 },
          data: {
            focus: "in",
            content: DEFAULT_CONTENT_MAP["composite"],
            handles: {
              isVisible: true,
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
            resizable: false,
            actions: [
              "addHandle",
              "changeColor",
              "toggleHandlesVisibility",
              "editText",
              "changeFontSize",
              "changeFocus",
            ],
          },
          style: {
            width: DEFAULT_SIZE_MAP[type].width,
            height:
              DEFAULT_SIZE_MAP[type].height -
              DEFAULT_SIZE_MAP["transaction"].height / 2,
            fill: NODE_BACKGROUND_COLOR_MAP["default"],
            stroke: NODE_BORDER_COLOR_MAP["gray"],
          },
          selected: false,
          parentId: id,
          draggable: false,
          extent: [
            [0, DEFAULT_SIZE_MAP["transaction"].height],
            [DEFAULT_SIZE_MAP[type].width, DEFAULT_SIZE_MAP[type].height],
          ],
          zIndex: 191,
        },
        {
          id: transactionId,
          type: "transaction",
          ariaLabel: t(($) => $["Transaction"]),
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
            stroke: NODE_BORDER_COLOR_MAP["default"],
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
          zIndex: 192,
        },
        {
          id: id,
          type: type,
          position,
          ariaLabel: t(($) => $["Elementary Actor"]),
          deletable: true,
          data: {
            state: "internal",
            content: DEFAULT_CONTENT_MAP[type],
            actions: [
              "changeColor",
              "changeFontSize",
              "toggleHandlesVisibility",
            ],
            subModel: "cooperation_structure_diagram",
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
        DEFAULT_SIZE_MAP["transaction"].width,
      );
      transactionSize.width = transactionSize.width + 4;
      return [
        {
          id: actorId,
          type: "actor",
          ariaLabel: t(($) => $["Actor"]),
          position: { x: 0, y: DEFAULT_SIZE_MAP["transaction"].height / 2 },
          deletable: false,
          data: {
            subModel: "cooperation_structure_diagram",
            state: "default",
            focus: "in",
            content: DEFAULT_CONTENT_MAP["actor"],
            handles: {
              isVisible: true,
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
            resizable: false,
            actions: [
              "addHandle",
              "changeColor",
              "toggleHandlesVisibility",
              "editText",
              "changeFontSize",
              "changeFocus",
            ],
          },
          style: {
            width: DEFAULT_SIZE_MAP[type].width,
            height:
              DEFAULT_SIZE_MAP[type].height -
              DEFAULT_SIZE_MAP["transaction"].height / 2,
            fill: NODE_BACKGROUND_COLOR_MAP["default"],
            stroke: NODE_BORDER_COLOR_MAP["default"],
            strokeWidth: 2,
          },
          selected: false,
          parentId: id,
          draggable: false,
          extent: [
            [0, DEFAULT_SIZE_MAP["transaction"].height],
            [DEFAULT_SIZE_MAP[type].width, DEFAULT_SIZE_MAP[type].height],
          ],
          zIndex: 191,
        },
        {
          id: transactionId,
          type: "transaction",
          ariaLabel: t(($) => $["Transaction"]),
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
            stroke: NODE_BORDER_COLOR_MAP["default"],
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
          zIndex: 192,
          draggable: false,
        },
        {
          id: id,
          type: type,
          position,
          deletable: true,
          ariaLabel: t(($) => $["Several Actors"]),
          data: {
            subModel: "cooperation_structure_diagram",
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
        ariaLabel: t(($) => $["Production Event"]),
        deletable: true,
        data: {
          subModel: "object_fact_diagram",
          content: DEFAULT_CONTENT_MAP[type],
          fontSize: 12,
          handles: {
            isVisible: true,
            top: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
              step: SMALL_NODE_SIZE,
            },
            bottom: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
              step: SMALL_NODE_SIZE,
            },
            left: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
              step: SMALL_NODE_SIZE,
            },
            right: {
              handles: [
                { id: uuid(), type: "source", offset: 0.5, canDrag: false },
              ],
              max: 1,
              step: SMALL_NODE_SIZE,
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: NODE_BACKGROUND_COLOR_MAP["red"],
          strokeWidth: 2,
          stroke: NODE_BORDER_COLOR_MAP["default"],
        },
        selected: true,
        zIndex: 193,
      };
    }

    case "set": {
      const parentEntityTypeId = uuid();
      const childEntityTypeId = uuid();
      return [
        {
          id: id,
          type: type,
          position,
          ariaLabel: t(($) => $["Set"]),
          deletable: true,
          data: {
            subModel: "object_fact_diagram",
            content: DEFAULT_CONTENT_MAP[type],
            focus: "in",
          },
          style: {
            width: DEFAULT_SIZE_MAP[type].width,
            height: DEFAULT_SIZE_MAP[type].height,
            fill: NODE_BACKGROUND_COLOR_MAP["default"],
            strokeWidth: 2,
            stroke: NODE_BORDER_COLOR_MAP["default"],
          },
          selected: true,
          zIndex: 190,
        },
        {
          id: childEntityTypeId,
          type: "entity_type",
          position: {
            x:
              DEFAULT_SIZE_MAP[type].width / 2 -
              (DEFAULT_SIZE_MAP[type].width / 2 - 20),
            y:
              DEFAULT_SIZE_MAP[type].height / 2 -
              (DEFAULT_SIZE_MAP[type].height / 2 - 20),
          },
          ariaLabel: t(($) => $["Entity Type"]),
          deletable: false,
          parentId: parentEntityTypeId,
          extent: [
            [
              DEFAULT_SIZE_MAP[type].width / 2 -
                (DEFAULT_SIZE_MAP[type].width - 20) / 2,
              DEFAULT_SIZE_MAP[type].height / 2 -
                (DEFAULT_SIZE_MAP[type].height - 20) / 2,
            ],
            [
              DEFAULT_SIZE_MAP[type].width / 2 +
                (DEFAULT_SIZE_MAP[type].width - 20) / 2,
              DEFAULT_SIZE_MAP[type].height / 2 +
                (DEFAULT_SIZE_MAP[type].height - 20) / 2,
            ],
          ],
          data: {
            resizable: false,
            fontSize: 12,
            focus: "in",
            subModel: "object_fact_diagram",
            content: DEFAULT_CONTENT_MAP[type],
            actions: [
              "addHandle",
              "changeFontSize",
              "editText",
              "toggleHandlesVisibility",
            ],
            handles: {
              isVisible: true,
              top: {
                handles: [
                  {
                    id: uuid(),
                    type: "source",
                    offset: 0.5,
                    derivation: "none",
                  },
                ],
              },
              bottom: {
                handles: [
                  {
                    id: uuid(),
                    type: "source",
                    offset: 0.5,
                    derivation: "none",
                  },
                ],
              },
              left: {
                handles: [
                  {
                    id: uuid(),
                    type: "source",
                    offset: 0.5,
                    derivation: "none",
                  },
                ],
              },
              right: {
                handles: [
                  {
                    id: uuid(),
                    type: "source",
                    offset: 0.5,
                    derivation: "none",
                  },
                ],
              },
            },
          },
          style: {
            width: DEFAULT_SIZE_MAP[type].width - 20,
            height: DEFAULT_SIZE_MAP[type].height - 20,
            fill: NODE_BACKGROUND_COLOR_MAP["default"],
            strokeWidth: 2,
            stroke: NODE_BORDER_COLOR_MAP["default"],
          },
          selected: false,
          draggable: false,
          zIndex: 191,
        },
        {
          id: parentEntityTypeId,
          type: "entity_type",
          position: { x: 0, y: 0 },
          parentId: id,
          ariaLabel: t(($) => $["Entity Type"]),
          deletable: false,
          extent: [
            [0, 0],
            [DEFAULT_SIZE_MAP[type].width, DEFAULT_SIZE_MAP[type].height],
          ],
          data: {
            resizable: false,
            focus: "in",
            subModel: "object_fact_diagram",
            content: DEFAULT_CONTENT_MAP[type],
            actions: ["addHandle", "toggleHandlesVisibility"],
            handles: {
              isVisible: true,
              top: {
                handles: [
                  {
                    id: uuid(),
                    type: "source",
                    offset: 0.5,
                    derivation: "none",
                  },
                ],
              },
              bottom: {
                handles: [
                  {
                    id: uuid(),
                    type: "source",
                    offset: 0.5,
                    derivation: "none",
                  },
                ],
              },
              left: {
                handles: [
                  {
                    id: uuid(),
                    type: "source",
                    offset: 0.5,
                    derivation: "none",
                  },
                ],
              },
              right: {
                handles: [
                  {
                    id: uuid(),
                    type: "source",
                    offset: 0.5,
                    derivation: "none",
                  },
                ],
              },
            },
          },
          style: {
            width: DEFAULT_SIZE_MAP[type].width,
            height: DEFAULT_SIZE_MAP[type].height,
            fill: NODE_BACKGROUND_COLOR_MAP["default"],
            strokeWidth: 2,
            stroke: NODE_BORDER_COLOR_MAP["default"],
          },
          selected: false,
          draggable: false,
          zIndex: 192,
        },
      ];
    }

    case "attribute": {
      return {
        id,
        type: type,
        position,
        ariaLabel: t(($) => $["Attribute"]),
        deletable: true,
        data: {
          subModel: "object_fact_diagram",
          content: DEFAULT_CONTENT_MAP[type],
          fontSize: 12,
          focus: "in",
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
          fill: NODE_BACKGROUND_COLOR_MAP["default"],
          strokeWidth: 2,
          stroke: NODE_BORDER_COLOR_MAP["default"],
        },
        selected: true,
        zIndex: 190,
      };
    }

    case "entity_type": {
      return {
        id,
        type: type,
        position,
        ariaLabel: t(($) => $["Entity Type"]),
        deletable: true,
        data: {
          subModel: "object_fact_diagram",
          content: DEFAULT_CONTENT_MAP[type],
          focus: "in",
          fontSize: 12,
          handles: {
            isVisible: true,
            top: {
              handles: [
                {
                  id: uuid(),
                  type: "source",
                  offset: 0.5,
                  derivation: "none",
                },
              ],
            },
            bottom: {
              handles: [
                {
                  id: uuid(),
                  type: "source",
                  offset: 0.5,
                  derivation: "none",
                },
              ],
            },
            left: {
              handles: [
                {
                  id: uuid(),
                  type: "source",
                  offset: 0.5,
                  derivation: "none",
                },
              ],
            },
            right: {
              handles: [
                {
                  id: uuid(),
                  type: "source",
                  offset: 0.5,
                  derivation: "none",
                },
              ],
            },
          },
        },
        style: {
          width: DEFAULT_SIZE_MAP[type].width,
          height: DEFAULT_SIZE_MAP[type].height,
          fill: NODE_BACKGROUND_COLOR_MAP["default"],
          strokeWidth: 2,
          stroke: NODE_BORDER_COLOR_MAP["default"],
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
          ariaLabel: t(($) => $["Transaction Time"]),
          data: {
            subModel: "process_structure_diagram",
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
            fill: NODE_BACKGROUND_COLOR_MAP["default"],
            strokeWidth: 2,
            stroke: NODE_BORDER_COLOR_MAP["default"],
          },
          selected: true,
          zIndex: 190,
        },
        {
          id: uuid(),
          parentId: id,
          type: "transaction_kind",
          deletable: false,
          ariaLabel: t(($) => $["Transaction Kind"]),
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
            subModel: "process_structure_diagram",
          },
          style: {
            width: DEFAULT_SIZE_MAP["transaction_kind"].width,
            height: DEFAULT_SIZE_MAP["transaction_kind"].height,
            fill: NODE_BACKGROUND_COLOR_MAP["default"],
            strokeWidth: 2,
            stroke: NODE_BORDER_COLOR_MAP["default"],
          },
          extent: [
            [2, 2],
            [
              DEFAULT_SIZE_MAP["transaction_time"].width - 2,
              DEFAULT_SIZE_MAP["transaction_time"].height - 2,
            ],
          ],
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
        ariaLabel: t(($) => $["Initiation Fact"]),
        deletable: true,
        data: {
          subModel: "process_structure_diagram",
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
          fill: NODE_BACKGROUND_COLOR_MAP["default"],
          strokeWidth: 2,
          stroke: NODE_BORDER_COLOR_MAP["default"],
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
        ariaLabel: t(($) => $["C-Fact"]),
        deletable: true,
        data: {
          subModel: "process_structure_diagram",
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
          fill: NODE_BACKGROUND_COLOR_MAP["default"],
          strokeWidth: 2,
          stroke: NODE_BORDER_COLOR_MAP["default"],
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
        ariaLabel: t(($) => $["C-Act"]),
        deletable: true,
        data: {
          subModel: "process_structure_diagram",
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
          fill: NODE_BACKGROUND_COLOR_MAP["default"],
          strokeWidth: 2,
          stroke: NODE_BORDER_COLOR_MAP["default"],
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
        ariaLabel: t(($) => $["TK / Execution"]),
        deletable: true,
        data: {
          subModel: "process_structure_diagram",
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
          fill: NODE_BACKGROUND_COLOR_MAP["gray"],
          strokeWidth: 2,
          stroke: NODE_BORDER_COLOR_MAP["default"],
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
        ariaLabel: t(($) => $["Text"]),
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
      // The editable label above the organization is rendered by
      // OrganizationNode (data.label), so no separate text child is needed.
      return {
        id,
        type,
        position,
        data: { state: "default", content: { body: "" }, fontSize: 12 },
        ariaLabel: t(($) => $["Organization"]),
        deletable: true,
        style: {
          width: width ?? DEFAULT_SIZE_MAP["organization"].width,
          height: height ?? DEFAULT_SIZE_MAP["organization"].height,
          fill: NODE_BACKGROUND_COLOR_MAP["transparent"],
          stroke: ORGANIZATION_BORDER_COLOR_MAP["default"],
          strokeWidth: 16,
        },
        selected: selected ?? true,
        zIndex: 210,
      };
    }
    case "whiteboard": {
      return [
        {
          id,
          type,
          position,
          data: { points: [], ...data },
          ariaLabel: t(($) => $["Whiteboard"]),
          deletable: true,
          style: {
            width: width ?? 100,
            height: height ?? 100,
            stroke: "#000",
            strokeWidth: 16,
            ...style,
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
