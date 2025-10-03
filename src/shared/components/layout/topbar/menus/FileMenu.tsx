import { useShallow } from "zustand/react/shallow";
import type {
  Edge,
  ReactFlowInstance,
  ReactFlowJsonObject,
} from "@xyflow/react";
import { useRef, type RefObject } from "react";
import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import TopbarSubMenuButton from "../_components/TopbarSubMenuButton";
import type { DEMOEdge } from "$/features/edges/edges.types";
import {
  clearModel,
  setEdges,
  setNodes,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import type { DEMONode } from "$/features/nodes/nodes.types";
import useSave from "$/features/actions/save/useSave";
import useExport from "$/features/actions/export/useExport";
import useImport from "$/features/actions/import/useImport";

const FileMenu = () => {
  const { save } = useSave();
  const { exportAsPNG, exportAsPDF, exportAsJSON } = useExport();

  const { importJSON } = useImport();

  return (
    <TopbarMenuButton label="File">
      <TopbarMenuItem
        onAction={() => {
          clearModel();
          localStorage.removeItem("demo-model");
        }}
      >
        New
      </TopbarMenuItem>
      <TopbarMenuItem
        onAction={() => {
          save();
        }}
      >
        Save
      </TopbarMenuItem>

      <TopbarMenuItem
        onAction={() => {
          importJSON();
        }}
      >
        Import JSON
      </TopbarMenuItem>
      <TopbarSubMenuButton label="Export as">
        <TopbarMenuItem
          onAction={() => {
            exportAsJSON();
          }}
        >
          JSON
        </TopbarMenuItem>
        <TopbarSubMenuButton label="PNG">
          <TopbarMenuItem
            onAction={() => {
              exportAsPNG(1);
            }}
          >
            1x
          </TopbarMenuItem>
          <TopbarMenuItem
            onAction={() => {
              exportAsPNG(2);
            }}
          >
            2x
          </TopbarMenuItem>
          <TopbarMenuItem
            onAction={() => {
              exportAsPNG(3);
            }}
          >
            3x
          </TopbarMenuItem>
          <TopbarMenuItem
            onAction={() => {
              exportAsPNG(4);
            }}
          >
            4x
          </TopbarMenuItem>
        </TopbarSubMenuButton>
        <TopbarSubMenuButton label="PDF">
          <TopbarMenuItem
            onAction={() => {
              exportAsPDF(1);
            }}
          >
            1x
          </TopbarMenuItem>
          <TopbarMenuItem
            onAction={() => {
              exportAsPDF(2);
            }}
          >
            2x
          </TopbarMenuItem>
          <TopbarMenuItem
            onAction={() => {
              exportAsPDF(3);
            }}
          >
            3x
          </TopbarMenuItem>
          <TopbarMenuItem
            onAction={() => {
              exportAsPDF(4);
            }}
          >
            4x
          </TopbarMenuItem>
        </TopbarSubMenuButton>
      </TopbarSubMenuButton>
      <TopbarMenuItem>Exit</TopbarMenuItem>
    </TopbarMenuButton>
  );
};

export default FileMenu;
