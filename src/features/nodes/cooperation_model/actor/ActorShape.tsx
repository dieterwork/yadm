import QuestionMark from "../../../shapes/QuestionMark";
import Rectangle from "../../../shapes/Rectangle";
import type { Scope } from "../cooperation_model.types";
import { getScopeFill } from "../../../../shared/utils/utils";
import type { ActorState } from "./actor.types";
import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";

interface ActorShapeProps {
  state: ActorState;
  scope: Scope;
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
        <>
          <Rectangle
            width={width}
            height={height}
            fill={"white"}
            strokeDasharray={"4 1"}
            fillOpacity={1}
            {...restSvgAttributes}
          />
          <Rectangle
            width={width}
            height={height}
            fill={fill}
            strokeDasharray={"4 1"}
            fillOpacity={0.2}
            {...restSvgAttributes}
          />
        </>
      );

    case "unclear":
      return (
        <g {...restSvgAttributes}>
          <Rectangle
            width={width}
            height={height}
            fill={"white"}
            {...restSvgAttributes}
          />
          <Rectangle
            width={width}
            height={height}
            fill={fill}
            fillOpacity={0.2}
          />
          <QuestionMark width={width} height={height} />
        </g>
      );

    default: {
      return (
        <>
          <Rectangle
            width={width}
            height={height}
            fill={"white"}
            {...restSvgAttributes}
          />
          <Rectangle
            width={width}
            height={height}
            fill={fill}
            fillOpacity={0.2}
            {...restSvgAttributes}
          />
        </>
      );
    }
  }
};

export default ActorShape;
