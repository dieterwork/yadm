import { Position, type InternalNode, type Node } from "@xyflow/react";

// returns the position (top,right,bottom or right) passed node compared to
function getParams<
  NodeAType extends Node = Node,
  NodeBType extends Node = Node
>(
  nodeA: InternalNode<NodeAType>,
  nodeB: InternalNode<NodeBType>
): [number, number, Position] {
  const centerA = getNodeCenter(nodeA);
  const centerB = getNodeCenter(nodeB);

  const horizontalDiff = Math.abs(centerA.x - centerB.x);
  const verticalDiff = Math.abs(centerA.y - centerB.y);

  let position;

  // when the horizontal difference between the nodes is bigger, we use Position.Left or Position.Right for the handle
  if (horizontalDiff > verticalDiff) {
    position = centerA.x > centerB.x ? Position.Left : Position.Right;
  } else {
    // here the vertical difference between the nodes is bigger, so we use Position.Top or Position.Bottom for the handle
    position = centerA.y > centerB.y ? Position.Top : Position.Bottom;
  }

  const [x, y] = getHandleCoordsByPosition(nodeA, position);
  return [x, y, position];
}

function getHandleCoordsByPosition<NodeType extends Node = Node>(
  node: InternalNode<NodeType>,
  handlePosition: Position
) {
  if (!node.internals?.handleBounds || !node.internals.handleBounds.source)
    throw new Error("Could not find handle bounds source");
  // all handles are from type source, that's why we use handleBounds.source here
  const handles = node.internals.handleBounds.source.filter(
    (h) => h.position === handlePosition
  );

  const handle = handles[Math.floor(handles.length / 2)];

  if (!handle) throw new Error("Could not find handle source");

  let offsetX = handle.width / 2;
  let offsetY = handle.height / 2;

  // this is a tiny detail to make the markerEnd of an edge visible.
  // The handle position that gets calculated has the origin top-left, so depending which side we are using, we add a little offset
  // when the handlePosition is Position.Right for example, we need to add an offset as big as the handle itself in order to get the correct position
  switch (handlePosition) {
    case Position.Left:
      offsetX = 0;
      break;
    case Position.Right:
      offsetX = handle.width;
      break;
    case Position.Top:
      offsetY = 0;
      break;
    case Position.Bottom:
      offsetY = handle.height;
      break;
  }

  const x = node.internals.positionAbsolute.x + handle.x + offsetX;
  const y = node.internals.positionAbsolute.y + handle.y + offsetY;

  return [x, y];
}

function getNodeCenter<NodeType extends Node>(node: InternalNode<NodeType>) {
  if (!node.measured.width || !node.measured.height)
    throw new Error("Could not find node width or height");
  return {
    x: node.internals.positionAbsolute.x + node.measured.width / 2,
    y: node.internals.positionAbsolute.y + node.measured.height / 2,
  };
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams<
  NodeTypeSource extends Node = Node,
  NodeTypeTarget extends Node = Node
>(source: InternalNode<NodeTypeSource>, target: InternalNode<NodeTypeTarget>) {
  const [sx, sy, sourcePos] = getParams(source, target);
  const [tx, ty, targetPos] = getParams(target, source);

  return {
    sx,
    sy,
    tx,
    ty,
    sourcePos,
    targetPos,
  };
}
