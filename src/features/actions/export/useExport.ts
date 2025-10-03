import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";
import jsPDF from "jspdf";
import { downloadFile, generatePNG } from "./utils";
import "svg2pdf.js";

const useExport = () => {
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const fileName = useDEMOModelerStore((state) => state.fileName);
  const DEMOInstance = useDEMOModelerStore((state) => state.DEMOInstance);

  const exportAsPNG = async (scaleFactor: number) => {
    try {
      const { url } = await generatePNG(nodes, scaleFactor);
      downloadFile(url, fileName + `_x${scaleFactor}.png`);
    } catch (err) {
      console.error("Could not generate PNG.", err);
    }
  };

  const exportAsPDF = async (scaleFactor: number) => {
    try {
      const { url, width, height } = await generatePNG(
        nodes,
        scaleFactor * (4 / 3)
      );
      // downloadFile(url, fileName + `_x${scaleFactor}.png`);
      const doc = new jsPDF("landscape", "px", [width, height]);
      doc.addImage(url, "png", width / 4, height / 4, width / 2, height / 2);
      doc.output("dataurlnewwindow", {
        filename: fileName + ".pdf",
      });
    } catch (err) {
      console.error("Could not generate PDF.", err);
    }
  };

  const exportAsJSON = () => {
    if (!DEMOInstance) return;
    const jsonModel = JSON.stringify(DEMOInstance.toObject());
    const file = new Blob([jsonModel], { type: "application/json" });
    const url = URL.createObjectURL(file);
    downloadFile(url, fileName + ".json");
  };

  return { exportAsPNG, exportAsPDF, exportAsJSON };
};

export default useExport;
