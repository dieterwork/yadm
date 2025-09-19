import { createPortal } from "react-dom";
import { usePreviewNodeStore } from "./usePreviewNodeStore";
import { useShallow } from "zustand/react/shallow";
import actorIcon from "$assets/Actor.svg";
import transactionIcon from "$assets/Transaction.svg";
import transactorIcon from "$assets/Transactor.svg";
import severalActorsIcon from "$assets/Several Actors.svg";
import compositeIcon from "$assets/Composite.svg";
import selfActivationIcon from "$assets/Self-Activation.svg";
import elementaryActorIcon from "$assets/Elementary Actor.svg";
import transactionTimeIcon from "$assets/Transaction Time.svg";
import initiationFactIcon from "$assets/Initiation Fact.svg";
import cActIcon from "$assets/C-Act.svg";
import cFactIcon from "$assets/C-Fact.svg";
import tkExecutionIcon from "$assets/TK Execution.svg";
import productionEventIcon from "$assets/Production Event.svg";
import entityClassIcon from "$assets/Entity Class.svg";
import derivedEntityIcon from "$assets/Derived Entity.svg";
import textIcon from "$assets/Text.svg";
import type { DEMONode } from "../nodes/nodes.types";

const previewNodeMap = {
  actor: actorIcon,
  transaction: transactionIcon,
  transactor: transactorIcon,
  self_activation: selfActivationIcon,
  several_actors: severalActorsIcon,
  composite: compositeIcon,
  elementary_actor: elementaryActorIcon,
  transaction_time: transactionTimeIcon,
  initiation_fact: initiationFactIcon,
  c_act: cActIcon,
  c_fact: cFactIcon,
  tk_execution: tkExecutionIcon,
  production_event: productionEventIcon,
  entity_class: entityClassIcon,
  derived_entity: derivedEntityIcon,
  transaction_kind: null,
  ghost: null,
  text: textIcon,
} satisfies Record<DEMONode["type"], string | null>;

interface PreviewNodeProps {
  type: DEMONode["type"];
}
const PreviewNode = ({ type }: PreviewNodeProps) => {
  if (!type) return null;
  const icon = previewNodeMap[type];
  if (!icon) return null;
  const previewNode = usePreviewNodeStore((state) => state.previewNode);

  return (
    <>
      {createPortal(
        <div
          className={`preview-node | fixed z-9999 pointer-events-none`}
          style={{
            top: previewNode?.position.y ?? 0,
            left: previewNode?.position.x ?? 0,
          }}
        >
          <div className="aspect-square w-[32px]">
            <img src={icon} alt="" className="w-full h-full object-cover" />
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default PreviewNode;
