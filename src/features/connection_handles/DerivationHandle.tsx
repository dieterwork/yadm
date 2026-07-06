import AggregationHandle from "./AggregationHandle";
import GeneralisationHandle from "./GeneralisationHandle";
import { Position, type XYPosition } from "@xyflow/react";
import getDerivationRotation from "./utils/getDerivationRotation";

type Props = {
  position: Position;
  derivation?: "generalisation" | "aggregation" | "none";
  xyPosition?: XYPosition;
};

const DerivationHandle = ({
  position,
  derivation = "none",
  xyPosition,
}: Props) => {
  const rotation = getDerivationRotation({ position });

  if (derivation === "aggregation") {
    return <AggregationHandle rotation={rotation} xyPosition={xyPosition} />;
  } else if (derivation === "generalisation") {
    return <GeneralisationHandle rotation={rotation} xyPosition={xyPosition} />;
  } else {
    return null;
  }
};

export default DerivationHandle;
