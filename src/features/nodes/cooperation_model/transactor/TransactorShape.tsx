import QuestionMark from "../../../shapes/QuestionMark";
import Rectangle from "../../../shapes/Rectangle";
import type { Scope } from "../cooperation_model.types";
import { getScopeFill } from "../utils";
import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import type { TransactorState } from "./transactor.types";
import Diamond from "../../../shapes/Diamond";
import Circle from "../../../shapes/Circle";

interface TransactorShapeProps {
  state: TransactorState;
  color?: string;
}

const ActorShape = ({ state, color }: TransactorShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;
  const fill = "red";

  return (
    <g>
      <Rectangle width={width} height={height} />
      <g>
        <Circle width={width} height={height} />
        <Diamond width={width} height={height} />
      </g>
    </g>
  );
};

export default ActorShape;
