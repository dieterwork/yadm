import { useContext } from "react";
import { getStateFill } from "../../../../shared/utils/utils";
import { ShapeContext } from "../../../shapes/ShapeContext";

import type { SeveralActorsState } from "./severalActors.types";
import Rectangle from "../../../shapes/Rectangle";
import DoubleDiamondInCircle from "../../../shapes/DoubleDiamondInCircle";
import { calculateDoubleDiamondInCircleDimensions } from "../../../shapes/utils/calculateDoubleDiamondInCircleDimensions";
import { DEFAULT_FILL_OPACITY } from "../../../shapes/utils/consts";
import { DEFAULT_SIZE_MAP } from "../../utils/consts";

interface TransactionShapeProps {
  state: SeveralActorsState;
  color?: string;
}

const SeveralActorsShape = ({ state, color }: TransactionShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;
  if (!width || !height) return;
  const fill = getStateFill(state, color);

  const dimensions = calculateDoubleDiamondInCircleDimensions(
    DEFAULT_SIZE_MAP["transaction"].width,
    1 / 8
  );

  return (
    <g {...restSvgAttributes} stroke={undefined} strokeWidth={undefined}>
      <g
        stroke={restSvgAttributes.stroke}
        strokeWidth={restSvgAttributes.strokeWidth}
        transform={`translate(0, 50)`}
      >
        <Rectangle width={width} height={+height - 50} fill="white" />
        <Rectangle
          fill={fill}
          width={width}
          height={+height - 50}
          fillOpacity={DEFAULT_FILL_OPACITY}
        />
      </g>
      <g
        transform={`translate(${width / 2 - dimensions.width / 2}, 0)`}
        stroke="black"
        strokeWidth={2}
      >
        <DoubleDiamondInCircle
          fill={fill}
          width={dimensions.width}
          height={dimensions.height}
          fillOpacity={DEFAULT_FILL_OPACITY}
          diamondAttributes={{ stroke: "var(--color-red-500)" }}
        />
      </g>
    </g>
  );
};

export default SeveralActorsShape;
