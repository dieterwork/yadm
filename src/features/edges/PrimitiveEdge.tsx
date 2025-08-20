import {
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  getEdgeCenter,
  getSmoothStepPath,
  getStraightPath,
  useInternalNode,
  useReactFlow,
  type Edge,
} from "@xyflow/react";

import ClickableBaseEdge from "./ClickableBaseEdge";
import "./PositionableEdge.css";
import { getEdgeParams } from "./utils";
import { useDEMOModeler } from "../modeler/useDEMOModeler";

type positionHandler = {
  x: number;
  y: number;
  active?: number;
};

const PrimitiveEdge = ({
  id,
  source,
  target,
  style = { stroke: "black", strokeWidth: 2 },
  markerEnd,
  data,
}: Omit<
  EdgeProps<Edge>,
  | "sourceX"
  | "sourceY"
  | "targetX"
  | "targetY"
  | "sourcePosition"
  | "targetPosition"
>) => {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  if (!sourceNode || !targetNode) return null;

  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } =
    getEdgeParams(sourceNode, targetNode);

  const [centerX, centerY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const { screenToFlowPosition } = useReactFlow();
  const edges = useDEMOModeler((state) => state.edges);
  const setEdges = useDEMOModeler((state) => state.setEdges);
  const positionHandlers =
    (data?.positionHandlers as Array<positionHandler>) ?? [
      { x: centerX, y: centerY, active: true },
    ];
  const edgeSegmentsCount = positionHandlers.length + 1;
  const edgeSegmentsArray = [];

  // calculate the origin and destination of all the segments
  for (let i = 0; i < edgeSegmentsCount; i++) {
    let segmentSourceX, segmentSourceY, segmentTargetX, segmentTargetY;

    if (i === 0) {
      segmentSourceX = sourceX;
      segmentSourceY = sourceY;
    } else {
      const handler = positionHandlers[i - 1];
      segmentSourceX = handler.x;
      segmentSourceY = handler.y;
    }

    if (i === edgeSegmentsCount - 1) {
      segmentTargetX = targetX;
      segmentTargetY = targetY;
    } else {
      const handler = positionHandlers[i];
      segmentTargetX = handler.x;
      segmentTargetY = handler.y;
    }

    const [edgePath, labelX, labelY] = getSmoothStepPath({
      sourceX: segmentSourceX,
      sourceY: segmentSourceY,
      sourcePosition,
      targetX: segmentTargetX,
      targetY: segmentTargetY,
      targetPosition,
    });
    edgeSegmentsArray.push({ edgePath, labelX, labelY });
  }

  return (
    <>
      {edgeSegmentsArray.map(({ edgePath }, index) => (
        <ClickableBaseEdge
          onClick={(event) => {
            //console.log("OnClick");
            const position = screenToFlowPosition({
              x: event.clientX,
              y: event.clientY,
            });

            const new_edges = edges.map((x) => x);
            const edgeIndex = new_edges.findIndex((edge) => edge.id === id);
            if (Array.isArray(new_edges[edgeIndex].data)) {
              (
                new_edges[edgeIndex].data
                  ?.positionHandlers as Array<positionHandler>
              ).splice(index, 0, {
                x: position.x,
                y: position.y,
                active: -1,
              });
            }
            setEdges(new_edges);
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            const newEdges = [...edges].filter((edge) => edge.id !== id);
            setEdges(newEdges);
          }}
          key={`edge${id}_segment${index}`}
          path={edgePath}
          markerEnd={markerEnd}
          style={style}
        />
      ))}
      {/* {positionHandlers.map(({ x, y, active }, handlerIndex) => (
        <EdgeLabelRenderer key={`edge${id}_handler${handlerIndex}`}>
          <div
            className="nopan positionHandlerContainer"
            style={{
              transform: `translate(-50%, -50%) translate(${x}px,${y}px)`,
            }}
          >
            <div
              className={`positionHandlerEventContainer ${active} ${
                `${active ?? -1}` !== "-1" ? "active" : ""
              }`}
              data-active={active ?? -1}
              // mouse move is used to move the handler when its been mousedowned on
              onMouseMove={(event) => {
                //console.log("On Move");
                let activeEdge = -1;
                activeEdge = parseInt(
                  (event.target as HTMLButtonElement).dataset.active ?? "-1"
                );
                //console.log("On Move with event.target=");
                //console.log(event.target);
                //console.log("On Move with event.target.dataset.active=");
                //console.log((event.target as HTMLButtonElement).dataset.active);
                //console.log("On Move with edge="+String(activeEdge));
                if (activeEdge === -1) {
                  return;
                }
                const position = screenToFlowPosition({
                  x: event.clientX,
                  y: event.clientY,
                });
                const new_edges = edges.map((x) => x);
                new_edges[activeEdge].id = String(Math.random());
                //console.log("Gen new ID=" + new_edges[activeEdge].id);
                if (new_edges[activeEdge].data != null) {
                  (
                    new_edges[activeEdge].data
                      ?.positionHandlers as Array<positionHandler>
                  )[handlerIndex] = {
                    x: position.x,
                    y: position.y,
                    active: activeEdge,
                  };
                }
                //console.log(new_edges);
                setEdges(new_edges);
              }}
              // mouse up is used to release all the handlers
              onMouseUp={() => {
                //console.log("On MouseUp");
                const new_edges = edges.map((x) => x);
                // const edgeIndex = edges.findIndex((edge) => edge.id === id);
                for (let i = 0; i < new_edges.length; i++) {
                  let handlersLength = 0;
                  if (new_edges[i].data != null) {
                    handlersLength = (
                      new_edges[i].data
                        ?.positionHandlers as Array<positionHandler>
                    ).length;
                  }
                  for (let j = 0; j < handlersLength; j++) {
                    (
                      new_edges[i].data
                        ?.positionHandlers as Array<positionHandler>
                    )[j].active = -1;
                  }
                }
                setEdges(new_edges);
              }}
            >
              <button
                className="positionHandler"
                data-active={active ?? -1}
                // mouse down is used to activate the handler
                style={{
                  backgroundColor: style.stroke,
                  width: Number(style.strokeWidth) + 2,
                  height: Number(style.strokeWidth) + 2,
                  border: "5px transparent",
                }}
                onMouseDown={() => {
                  const new_edges = [...edges];
                  const edgeIndex = new_edges.findIndex(
                    (edge) => edge.id === id
                  );
                  //console.log("EdgeIndex=" + String(edgeIndex));
                  //console.log("HandlerIndex=" + String(handlerIndex));
                  (
                    new_edges[edgeIndex].data
                      ?.positionHandlers as Array<positionHandler>
                  )[handlerIndex].active = edgeIndex;
                  setEdges(new_edges);
                }}
                // right click is used to delete the handler
                onContextMenu={(event) => {
                  event.preventDefault();
                  const new_edges = edges.map((x) => x);
                  const edgeIndex = new_edges.findIndex(
                    (edge) => edge.id === id
                  );
                  new_edges[edgeIndex].id = String(Math.random());
                  (
                    new_edges[edgeIndex].data
                      ?.positionHandlers as Array<positionHandler>
                  ).splice(handlerIndex, 1);
                  setEdges(new_edges);
                }}
              ></button>
            </div>
          </div>
        </EdgeLabelRenderer>
      ))} */}
    </>
  );
};

export default PrimitiveEdge;
