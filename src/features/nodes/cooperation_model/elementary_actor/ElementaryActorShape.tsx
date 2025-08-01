import { useContext } from "react";
import { getStateFill } from "../../../../shared/utils/utils";
import { ShapeContext } from "../../../shapes/ShapeContext";
import DiamondInCircle from "../../../shapes/DiamondInCircle";
import type { ElementaryActorState } from "./elementaryActor.types";
import Rectangle from "../../../shapes/Rectangle";
import { DEFAULT_FILL_OPACITY } from "../../../shapes/utils/consts";

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
      <g
        stroke={restSvgAttributes.stroke}
        strokeWidth={restSvgAttributes.strokeWidth}
        transform={`translate(0, ${+width / 4})`}
      >
        <Rectangle width={width} height={+height - +width / 4} fill="white" />
        <Rectangle
          fill={fill}
          width={width}
          height={+height - +width / 4}
          fillOpacity={DEFAULT_FILL_OPACITY}
        />
      </g>
      <g
        transform={`translate(${+width / 4}, 0)`}
        stroke="black"
        strokeWidth={2}
      >
        <DiamondInCircle
          fill={fill}
          width={+width / 2}
          height={+width / 2}
          fillOpacity={DEFAULT_FILL_OPACITY}
          diamondAttributes={{ stroke: "var(--color-red-500)" }}
        />
      </g>
    </g>
  );
};

export default ElementaryActorShape;
