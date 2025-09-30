import QuestionMark from "../../../shapes/QuestionMark";
import Rectangle from "../../../shapes/Rectangle";
import { getScopeFill } from "../../../../shared/utils/utils";
import type { ActorState } from "./actor.types";
import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import { DEFAULT_FILL_OPACITY } from "../../../shapes/utils/consts";
import type { NodeScope } from "../../nodes.types";

interface ActorShapeProps {
  state: ActorState;
  scope: NodeScope;
  color?: string;
}

const ActorShape = ({ state, scope, color }: ActorShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;
  const fill = getScopeFill(scope, color);

  switch (state) {
    case "missing":
      return (
        <Rectangle
          {...restSvgAttributes}
          width={width}
          height={height}
          fill={fill}
          strokeDasharray={"6 4"}
          fillOpacity={0.2}
        />
      );

    case "unclear":
      return (
        <g>
          <Rectangle
            {...restSvgAttributes}
            width={width}
            height={height}
            fill={fill}
            fillOpacity={DEFAULT_FILL_OPACITY}
          />
          <QuestionMark {...restSvgAttributes} width={width} height={height} />
        </g>
      );

    default: {
      return (
        <>
          <Rectangle
            {...restSvgAttributes}
            width={width}
            height={height}
            fill={fill}
            fillOpacity={DEFAULT_FILL_OPACITY}
          />
        </>
      );
    }
  }
};

export default ActorShape;
