import {
  getEdge,
  getNode,
  updateEdge,
  updateEdgeData,
} from "$/features/modeler/store/useDEMOModelerStore";
import {
  ArrowElbowUpRightIcon,
  ArrowRightIcon,
  CheckIcon,
  LineSegmentIcon,
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
import type { ObjectFactDiagramEdge } from "$/features/edges/edges.types";
import getMarkerType from "$/features/modeler/utils/getMarkerType";

const ChangeLawControl = ({ edgeId }: DEMOEdgeToolbarControlProps) => {
  const { t } = useTranslation();
  const edge = getEdge(edgeId);
  if (!edge || !edge.data || !("law" in edge.data)) return null;

  const options = [
    { id: "precedence", label: t(($) => $["Precedence"]) },
    { id: "exclusion", label: t(($) => $["Exclusion"]) },
  ];

  const [selected, setSelected] = useState<Selection>(new Set([edge.data.law]));

  const sourceNode = getNode(edge.source);
  const targetNode = getNode(edge.target);

  const marker = getMarkerType(sourceNode?.type, targetNode?.type, "default");

  return (
    <MenuTrigger>
      <DEMOElementToolbarButton
        label={t(($) => $["Change law"])}
        icon={({ size, color }) => (
          <LineSegmentIcon size={size} color={color} />
        )}
        menuTrigger
        id="change_law"
      />
      <Popover
        placement="right top"
        shouldFlip={false}
        className="outline-hidden"
      >
        <DEMOElementToolbarListBox
          aria-labelledby="change_law"
          items={options}
          selectedKeys={selected}
          selectionMode="single"
          onSelectionChange={(selection) => {
            setSelected(selection);
            if (!(selection instanceof Set)) return;
            for (const entry of selection) {
              if (entry !== "exclusion" && entry !== "precedence") return;

              updateEdgeData<ObjectFactDiagramEdge>(edgeId, (data) => ({
                ...data,
                law: entry,
              }));

              if (marker.markerStart) {
                updateEdge(edgeId, (edge) => ({
                  ...edge,
                  markerStart:
                    entry === "exclusion" ? undefined : marker.markerStart,
                }));
              }

              if (marker.markerEnd) {
                updateEdge(edgeId, (edge) => ({
                  ...edge,
                  markerEnd:
                    entry === "exclusion" ? undefined : marker.markerEnd,
                }));
              }

              if (marker.markerMid) {
                updateEdgeData<ObjectFactDiagramEdge>(edgeId, (data) => ({
                  ...data,
                  markerMid:
                    entry === "exclusion" ? undefined : marker.markerMid,
                }));
              }

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
                const Icon = item.id === "precedence" ? CheckIcon : XIcon;
                return <Icon {...iconProps} />;
              }}
            />
          )}
        </DEMOElementToolbarListBox>
      </Popover>
    </MenuTrigger>
  );
};

export default ChangeLawControl;
