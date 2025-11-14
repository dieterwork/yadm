// import { create } from "zustand";
// import { temporal } from "zundo";
// import type {
//   DEMOHandle,
//   DEMOHandlesPositionData,
//   DEMONode,
// } from "../nodes/nodes.types";
// import { Position, type InternalNode, type NodeChange } from "@xyflow/react";
// import { getHelperLines } from "./utils/getHelperLines";
// import convertAbsoluteToRelativePosition from "../nodes/utils/convertAbsoluteToRelativePosition";
// import type { ReactStyleStateSetter } from "$/shared/types/react.types";

// export interface DEMOModelerState {
//   isEnabled: boolean;
//   horizontal: number | undefined;
//   vertical: number | undefined;
// }

// export const useHelperLinesStore = create<DEMOModelerState>()(
//   temporal((set, get) => ({
//     isEnabled: true,
//     horizontal: undefined,
//     vertical: undefined,
//   }))
// );

// export const toggleHelperLines = (
//   isEnabled: ReactStyleStateSetter<boolean>
// ) => {
//   useHelperLinesStore.setState((state) => ({
//     isEnabled:
//       typeof isEnabled === "boolean" ? isEnabled : isEnabled(state.isEnabled),
//   }));
// };

// export const updateHelperLines = (
//   changes: NodeChange<DEMONode>[],
//   nodes: DEMONode[]
// ) => {
//   // reset the helper lines (clear existing lines, if any)
//   useHelperLinesStore.setState(() => ({
//     horizontal: undefined,
//     vertical: undefined,
//   }));

//   const isEnabled = useHelperLinesStore.getState().isEnabled;

//   // this will be true if it's a single node being dragged
//   // inside we calculate the helper lines and snap position for the position where the node is being moved to
//   const change = changes[0];

//   if (
//     isEnabled &&
//     changes.length === 1 &&
//     change.type === "position" &&
//     change.dragging &&
//     change.position
//   ) {
//     const changedNode = nodes.find((node) => node.id === change.id);
//     const helperLines = getHelperLines({
//       change,
//       nodes,
//     });

//     const helperLinesPosition =
//       changedNode &&
//       convertAbsoluteToRelativePosition(
//         helperLines.snapPosition,
//         changedNode,
//         nodes
//       );

//     change.position.x = helperLinesPosition?.x ?? change.position.x;
//     change.position.y = helperLinesPosition?.y ?? change.position.y;

//     // if helper lines are returned, we set them so that they can be displayed
//     useHelperLinesStore.setState(() => ({
//       horizontal: helperLines.horizontal,
//       vertical: helperLines.vertical,
//     }));
//   }
//   return changes;
// };

// const isPosition = (property: string) =>
//   property === Position.Top ||
//   property === Position.Bottom ||
//   property === Position.Left ||
//   property === Position.Right;

// export const updateHelperLinesOnHandleChange = (
//   sourceNode: InternalNode<DEMONode>,
//   sourceHandle: string,
//   targetNode: InternalNode<DEMONode>,
//   targetHandle: string
// ) => {
//   if (!("handles" in sourceNode.data) || !("handles" in targetNode.data))
//     return;

//   // reset the helper lines (clear existing lines, if any)
//   useHelperLinesStore.setState(() => ({
//     horizontal: undefined,
//     vertical: undefined,
//   }));

//   // Get sourceHandle data
//   let sourceHandleData: (DEMOHandle & { position: Position }) | null = null;
//   for (const property in sourceNode.data.handles) {
//     if (isPosition(property)) {
//       const arr = sourceNode.data.handles[property];
//       if (!arr) continue;
//       const handleData = arr.handles?.find(
//         (handle) => handle.id === sourceHandle
//       );
//       if (!handleData) continue;
//       sourceHandleData = { ...handleData, position: property };
//     }
//   }

//   // Get targetHandle data
//   let targetHandleData: (DEMOHandle & { position: Position }) | null = null;
//   for (const property in targetNode.data.handles) {
//     if (isPosition(property)) {
//       const arr = targetNode.data.handles[property];
//       if (!arr) continue;
//       const handleData = arr.handles?.find(
//         (handle) => handle.id === sourceHandle
//       );
//       if (!handleData) continue;
//       targetHandleData = { ...handleData, position: property };
//     }
//   }

//   if (!sourceHandleData || !targetHandleData) {
//     console.log("no handle data for source or target found");
//     return;
//   }

//   // get positions of source and target handle

//   // get absolute coordinates
//   const sourceNodeBounds = {
//     left: sourceNode.internals.positionAbsolute.x ?? 0,
//     right:
//       (sourceNode.internals.positionAbsolute.x ?? 0) +
//       (sourceNode.measured?.width ?? 0),
//     top: sourceNode.internals.positionAbsolute.y ?? 0,
//     bottom:
//       (sourceNode.internals.positionAbsolute.y ?? 0) +
//       (sourceNode.measured?.height ?? 0),
//     width: sourceNode.measured?.width ?? 0,
//     height: sourceNode.measured?.height ?? 0,
//   };

//   const targetNodeBounds = {
//     left: absoluteCoordinates.x ?? 0,
//     right: (absoluteCoordinates.x ?? 0) + (nodeA.measured?.width ?? 0),
//     top: absoluteCoordinates.y ?? 0,
//     bottom: (absoluteCoordinates.y ?? 0) + (nodeA.measured?.height ?? 0),
//     width: nodeA.measured?.width ?? 0,
//     height: nodeA.measured?.height ?? 0,
//   };
// };
