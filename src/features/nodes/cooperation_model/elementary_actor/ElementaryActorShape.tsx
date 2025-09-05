import { useContext } from "react";
import { getStateFill } from "../../../../shared/utils/utils";
import { ShapeContext } from "../../../shapes/ShapeContext";
import DiamondInCircle from "../../../shapes/DiamondInCircle";
import type { ElementaryActorState } from "./elementaryActor.types";
import Rectangle from "../../../shapes/Rectangle";
import { DEFAULT_FILL_OPACITY } from "../../../shapes/utils/consts";
import { DEFAULT_SIZE_MAP, MEDIUM_NODE_SIZE } from "../../utils/consts";

interface TransactionShapeProps {
  state: ElementaryActorState;
  color?: string;
}

const ElementaryActorShape = ({ state, color }: TransactionShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;
  if (!width || !height) return;
  const fill = getStateFill(state, color);

  return (
    <g {...restSvgAttributes} stroke={undefined} strokeWidth={undefined}>
      <Rectangle
        stroke={restSvgAttributes.stroke}
        strokeWidth={4}
        transform={`translate(0, ${MEDIUM_NODE_SIZE / 2})`}
        fill={fill}
        width={width}
        height={+height - MEDIUM_NODE_SIZE / 2}
        fillOpacity={DEFAULT_FILL_OPACITY}
      />
      <DiamondInCircle
        transform={`translate(${width / 2 - MEDIUM_NODE_SIZE / 2}, 0)`}
        stroke="black"
        strokeWidth={2}
        fill={fill}
        width={MEDIUM_NODE_SIZE}
        height={MEDIUM_NODE_SIZE}
        fillOpacity={DEFAULT_FILL_OPACITY}
        diamondAttributes={{ stroke: "var(--color-red-500)" }}
      />
    </g>
  );
};

export default ElementaryActorShape;
