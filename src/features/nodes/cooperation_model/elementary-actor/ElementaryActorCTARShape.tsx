import { useContext } from "react";
import { getStateFill } from "../utils";
import { ShapeContext } from "../../../shapes/ShapeContext";
import DiamondInCircle from "../../../shapes/DiamondInCircle";
import { DEFAULT_FILL_OPACITY } from "../../../shapes/utils";
import type { ElementaryActorCTARState } from "./elementaryActorCTAR.types";
import Rectangle from "../../../shapes/Rectangle";

interface TransactionShapeProps {
  state: ElementaryActorCTARState;
  color?: string;
}

const ElementaryActorCTARShape = ({ state, color }: TransactionShapeProps) => {
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
        />
      </g>
    </g>
  );
};

export default ElementaryActorCTARShape;
