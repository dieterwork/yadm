import AggregationHandle from "./AggregationHandle";
import GeneralisationHandle from "./GeneralisationHandle";
import { Position } from "@xyflow/react";
import getDerivationRotation from "./utils/getDerivationRotation";

type Props = {
  position: Position;
  derivation?: "generalisation" | "aggregation" | "none";
};

const DerivationHandle = ({ position, derivation = "none" }: Props) => {
  const rotation = getDerivationRotation({ position });

  if (derivation === "aggregation") {
    return <AggregationHandle rotation={rotation} />;
  } else if (derivation === "generalisation") {
    return <GeneralisationHandle rotation={rotation} />;
  } else {
    return null;
  }
};

export default DerivationHandle;
