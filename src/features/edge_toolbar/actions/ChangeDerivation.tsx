import {
  getEdge,
  getNode,
  setEdges,
  updateNodeHandlesDerivation,
  useDEMOModelerStore,
} from "$/features/modeler/store/useDEMOModelerStore";
import {
  AsteriskIcon,
  PlusIcon,
  TriangleIcon,
  XIcon,
} from "@phosphor-icons/react";
import { MenuTrigger, Popover, type Selection } from "react-aria-components";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import DEMOElementToolbarListBox from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBox";
import DEMOElementToolbarListBoxItem from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBoxItem";
import type { DEMOEdgeToolbarControlProps } from "../types/DEMOEdgeToolbar.types";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";
import type { DEMOEdge } from "$/features/edges/edges.types";
import getNodeHandle from "$/features/connection_handles/utils/getHandle";
import markerMap from "$/features/modeler/utils/markerMap";

const ChangeDerivationControl = ({ edgeId }: DEMOEdgeToolbarControlProps) => {
  const { t } = useTranslation();
  const edge = getEdge(edgeId);
  const edges = useDEMOModelerStore((state) => state.edges);
  const targetNode = getNode(edge?.target);
  const handle = getNodeHandle(targetNode, edge?.targetHandle);

  const options = [
    {
      id: "aggregation",
      label: t(($) => $["Aggregation"]),
      icon: AsteriskIcon,
    },
    {
      id: "generalisation",
      label: t(($) => $["Generalisation"]),
      icon: PlusIcon,
    },
    { id: "none", label: t(($) => $["None"]), icon: XIcon },
  ];

  const [selected, setSelected] = useState<Selection>(
    new Set([handle?.handle.derivation ?? options[2].id]),
  );

  const edgesConnected = edges.filter(
    (e) => e.targetHandle === edge?.targetHandle,
  );

  return (
    <MenuTrigger>
      <DEMOElementToolbarButton
        label={t(($) => $["Change derivation"])}
        icon={({ size, color }) => <TriangleIcon size={size} color={color} />}
        menuTrigger
        id="change_derivation"
      />
      <Popover
        placement="right top"
        shouldFlip={false}
        className="outline-hidden"
      >
        <DEMOElementToolbarListBox
          aria-labelledby="change_derivation"
          items={options}
          selectedKeys={selected}
          selectionMode="single"
          onSelectionChange={(selection) => {
            setSelected(selection);
            if (!(selection instanceof Set)) return;
            for (const entry of selection) {
              if (typeof entry !== "string") return;
              updateNodeHandlesDerivation(
                targetNode?.id,
                edge?.targetHandle,
                handle?.position,
                entry,
              );
              setEdges((edges) =>
                edges.map((e) => {
                  if (!edgesConnected.includes(e)) return e;
                  const sourceNode = getNode(e.source);
                  const targetNode = getNode(e.target);
                  const newEdge = {
                    ...e,
                    data: {
                      ...e.data,
                      lineType: entry !== "none" ? "dashed" : "solid",
                      markerMid:
                        entry === "none"
                          ? markerMap[sourceNode?.type ?? "entity_type"]?.find(
                              (item) =>
                                item.id === targetNode?.type ||
                                item.id === "entity_type",
                            )?.default.markerMid
                          : undefined,
                    },
                  } as DEMOEdge;
                  return newEdge;
                }),
              );
              takeSnapshotAndSave();
            }
          }}
        >
          {(item) => (
            <DEMOElementToolbarListBoxItem
              key={item.id}
              label={item.label}
              textValue={item.label}
              id={item.id}
              icon={(iconProps) => {
                const Icon = item.icon;
                return <Icon {...iconProps} />;
              }}
            />
          )}
        </DEMOElementToolbarListBox>
      </Popover>
    </MenuTrigger>
  );
};

export default ChangeDerivationControl;
