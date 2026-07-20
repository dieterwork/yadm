import { createPortal } from "react-dom";
import { usePreviewNodeStore } from "./usePreviewNodeStore";
import actorIcon from "$assets/DEMO_icons/Actor.svg";
import transactionIcon from "$assets/DEMO_icons/Transaction.svg";
import transactorIcon from "$assets/DEMO_icons/Transactor.svg";
import severalActorsIcon from "$assets/DEMO_icons/Several Actors.svg";
import compositeIcon from "$assets/DEMO_icons/Composite.svg";
import selfActivationIcon from "$assets/DEMO_icons/Self-Activation.svg";
import elementaryActorIcon from "$assets/DEMO_icons/Elementary Actor.svg";
import transactionTimeIcon from "$assets/DEMO_icons/Transaction Time.svg";
import initiationFactIcon from "$assets/DEMO_icons/Initiation Fact.svg";
import cActIcon from "$assets/DEMO_icons/C-Act.svg";
import cFactIcon from "$assets/DEMO_icons/C-Fact.svg";
import tkExecutionIcon from "$assets/DEMO_icons/TK Execution.svg";
import productionEventIcon from "$assets/DEMO_icons/Production Event.svg";
import setIcon from "$assets/DEMO_icons/Set.svg";
import entityTypeIcon from "$assets/DEMO_icons/Entity Type.svg";
import attributeIcon from "$assets/DEMO_icons/Attribute.svg";
import textIcon from "$assets/DEMO_icons/Text.svg";
import organizationIcon from "$assets/DEMO_icons/Organization.svg";
import multipleTransactionKindIcon from "$assets/DEMO_icons/Multiple Transaction Kind.svg";
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
  set: setIcon,
  entity_type: entityTypeIcon,
  attribute: attributeIcon,
  transaction_kind: null,
  ghost: null,
  text: textIcon,
  organization: organizationIcon,
  multiple_transaction_kind: multipleTransactionKindIcon,
} satisfies Record<DEMONode["type"], string | null>;

interface PreviewNodeProps {
  type: DEMONode["type"] | null;
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
        document.body,
      )}
    </>
  );
};

export default PreviewNode;
