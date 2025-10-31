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
import { z } from "zod";
import toast from "react-hot-toast/headless";

const fileNameSchema = z
  .string()
  .max(80, { error: "File name must be less than 80 characters" })
  .regex(new RegExp(/([A-Za-z0-9\-\_]+)/), {
    error:
      "File name can only contain letters, numbers, parentheses, underscores, and dashes",
  });

const testFileName = (fileName: string) => {
  try {
    fileNameSchema.parse(fileName);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error };
    }
  }
};

const useExport = () => {
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const fileName = useDEMOModelerStore((state) => state.fileName);
  const DEMOInstance = useDEMOModelerStore((state) => state.DEMOInstance);
  const { getNodesBounds } = useReactFlow();
  const nodesBounds = getNodesBounds(nodes);
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);

  const exportAsPNG = async (scaleFactor: number) => {
    try {
      const parsedFileName = fileNameSchema.parse(fileName);
      setExportEnabled(true);
      const { url } = await generatePNG({ nodesBounds, scaleFactor });
      downloadFile(url, parsedFileName + ` x${scaleFactor}.png`);
      setExportEnabled(false);
    } catch (err) {
      console.error("Could not generate PNG.", err);
      if (err instanceof z.ZodError) {
        for (const error of err.issues) {
          toast.error(error.message);
        }
      }
    }
  };

  const exportAsPDF = async (scaleFactor: number) => {
    try {
      const parsedFileName = fileNameSchema.parse(fileName);
      setExportEnabled(true);
      const { url, width, height } = await generatePNG({
        nodesBounds,
        scaleFactor: scaleFactor * (4 / 3),
      });
      const doc = new jsPDF("landscape", "px", [width, height]);
      doc.addImage(url, "png", width / 4, height / 4, width / 2, height / 2);
      doc.output("dataurlnewwindow", {
        filename: parsedFileName + ` x${scaleFactor}.pdf`,
      });
      setExportEnabled(false);
    } catch (err) {
      console.error("Could not generate PDF.", err);
      if (err instanceof z.ZodError) {
        for (const error of err.issues) {
          toast.error(error.message);
        }
      }
    }
  };

  const exportAsJSON = () => {
    if (!DEMOInstance) return;
    try {
      const parsedFileName = fileNameSchema.parse(fileName);
      const jsModel: DEMOModelJSON = {
        ...DEMOInstance.toObject(),
        isEnabled,
        version: "1.0.0",
      };
      const jsonModel = JSON.stringify(jsModel);
      const file = new Blob([jsonModel], { type: "application/json" });
      const url = URL.createObjectURL(file);
      downloadFile(url, parsedFileName + ".json");
    } catch (err) {
      console.error("Could not generate JSON:", err);
      if (err instanceof z.ZodError) {
        for (const error of err.issues) {
          toast.error(error.message);
        }
      }
    }
  };

  return { exportAsPNG, exportAsPDF, exportAsJSON };
};

export default useExport;
