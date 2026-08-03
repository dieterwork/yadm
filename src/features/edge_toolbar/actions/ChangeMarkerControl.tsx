import {
  getEdge,
  getNode,
  updateEdge,
  updateEdgeData,
} from "$/features/modeler/store/useDEMOModelerStore";
import {
  ArrowRightIcon,
  CaretRightIcon,
  DiamondsFourIcon,
  ProhibitIcon,
} from "@phosphor-icons/react";
import { MenuTrigger, Popover } from "react-aria-components";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import DEMOElementToolbarListBox from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBox";
import DEMOElementToolbarListBoxItem from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBoxItem";
import type { DEMOEdgeToolbarControlProps } from "../types/DEMOEdgeToolbar.types";
import { useTranslation } from "react-i18next";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";
import getMarkerType from "$/features/modeler/utils/getMarkerType";
import type { DEMOEdge } from "$/features/edges/edges.types";

type MarkerOption = "markerMid" | "markerEnd" | "none";

const ChangeMarkerControl = ({ edgeId }: DEMOEdgeToolbarControlProps) => {
  const { t } = useTranslation();
  const edge = getEdge(edgeId);
  if (!edge) return null;

  const sourceNode = getNode(edge.source);
  const targetNode = getNode(edge.target);
  const markerType = getMarkerType(sourceNode?.type, targetNode?.type, "all");

  const current: MarkerOption =
    edge.data && "markerMid" in edge.data && edge.data.markerMid
      ? "markerMid"
      : edge.markerEnd
        ? "markerEnd"
        : "none";

  const options: { id: MarkerOption; label: string }[] = [
    { id: "markerMid", label: t(($) => $["Mid marker"]) },
    { id: "markerEnd", label: t(($) => $["End marker"]) },
    { id: "none", label: t(($) => $["No marker"]) },
  ];
  const filteredOptions = options.filter(
    (o) => Boolean(markerType[o.id]) || o.id === "none",
  );

  const selected = new Set([current]);

  const changeMarker = (option: MarkerOption) => {
    if (option === "markerMid") {
      updateEdgeData<DEMOEdge>(edgeId, (data) => ({
        ...data,
        markerMid: markerType.markerMid,
      }));
      updateEdge(edgeId, { markerEnd: undefined, markerStart: undefined });
    } else if (option === "markerEnd") {
      updateEdgeData<DEMOEdge>(edgeId, (data) => ({
        ...data,
        markerMid: undefined,
      }));
      updateEdge(edgeId, {
        markerEnd: markerType.markerEnd,
        markerStart: undefined,
      });
    } else {
      updateEdgeData<DEMOEdge>(edgeId, (data) => ({
        ...data,
        markerMid: undefined,
      }));
      updateEdge(edgeId, { markerEnd: undefined, markerStart: undefined });
    }
    takeSnapshotAndSave();
  };

  return (
    <MenuTrigger>
      <DEMOElementToolbarButton
        label={t(($) => $["Change marker"])}
        icon={({ size, color }) => (
          <DiamondsFourIcon size={size} color={color} />
        )}
        menuTrigger
        id="change_marker"
      />
      <Popover
        placement="right top"
        shouldFlip={false}
        className="outline-hidden"
      >
        <DEMOElementToolbarListBox
          aria-labelledby="change_marker"
          items={filteredOptions}
          selectedKeys={selected}
          selectionMode="single"
          onSelectionChange={(selection) => {
            if (!(selection instanceof Set)) return;
            for (const entry of selection) {
              changeMarker(entry as MarkerOption);
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
                if (item.id === "markerMid")
                  return <CaretRightIcon {...iconProps} />;
                if (item.id === "markerEnd")
                  return <ArrowRightIcon {...iconProps} weight="fill" />;
                return <ProhibitIcon {...iconProps} />;
              }}
            />
          )}
        </DEMOElementToolbarListBox>
      </Popover>
    </MenuTrigger>
  );
};

export default ChangeMarkerControl;
