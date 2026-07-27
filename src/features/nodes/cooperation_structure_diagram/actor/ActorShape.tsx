import QuestionMark from "../../../shapes/QuestionMark";
import Rectangle from "../../../shapes/Rectangle";
import { getFocusFill } from "../../../../shared/utils/utils";
import type { ActorState } from "./actor.types";
import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import type { NodeFocus } from "../../nodes.types";

interface ActorShapeProps {
  state: ActorState;
  focus: NodeFocus;
  color?: string;
}

const ActorShape = ({ state, focus, color }: ActorShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;
  const fill = getFocusFill(focus, color);

  switch (state) {
    case "missing":
      return (
        <Rectangle
          {...restSvgAttributes}
          width={width}
          height={height}
          fill={fill}
          strokeDasharray={"6 4"}
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
          />
        </>
      );
    }
  }
};

export default ActorShape;
