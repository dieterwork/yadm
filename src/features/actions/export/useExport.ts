import {
  setExportEnabled,
  setNodesHandlesVisibility,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import jsPDF from "jspdf";
import { downloadFile, generatePNG } from "./utils";
import "svg2pdf.js";
import { useReactFlow } from "@xyflow/react";
import type { DEMOModelJSON } from "$/shared/types/reactFlow.types";

const useExport = () => {
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const fileName = useDEMOModelerStore((state) => state.fileName);
  const DEMOInstance = useDEMOModelerStore((state) => state.DEMOInstance);
  const { getNodesBounds } = useReactFlow();
  const nodesBounds = getNodesBounds(nodes);
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);

  const exportAsPNG = async (scaleFactor: number) => {
    try {
      setExportEnabled(true);
      const { url } = await generatePNG({ nodesBounds, scaleFactor });
      downloadFile(url, fileName + ` x${scaleFactor}.png`);
      setExportEnabled(false);
    } catch (err) {
      console.error("Could not generate PNG.", err);
    }
  };

  const exportAsPDF = async (scaleFactor: number) => {
    try {
      setExportEnabled(true);
      const { url, width, height } = await generatePNG({
        nodesBounds,
        scaleFactor: scaleFactor * (4 / 3),
      });
      const doc = new jsPDF("landscape", "px", [width, height]);
      doc.addImage(url, "png", width / 4, height / 4, width / 2, height / 2);
      doc.output("dataurlnewwindow", {
        filename: fileName + ` x${scaleFactor}.pdf`,
      });
      setExportEnabled(false);
    } catch (err) {
      console.error("Could not generate PDF.", err);
    }
  };

  const exportAsJSON = () => {
    if (!DEMOInstance) return;
    const jsModel: DEMOModelJSON = {
      ...DEMOInstance.toObject(),
      isEnabled,
      version: "1.0.0",
    };
    const jsonModel = JSON.stringify(jsModel);
    const file = new Blob([jsonModel], { type: "application/json" });
    const url = URL.createObjectURL(file);
    downloadFile(url, fileName + ".json");
  };

  return { exportAsPNG, exportAsPDF, exportAsJSON };
};

export default useExport;
