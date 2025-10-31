import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";
import type { DEMOModelJSON } from "$/shared/types/reactFlow.types";
import debounce from "$/shared/utils/debounce";
import { z } from "zod";

const fileNameSchema = z
  .string()
  .max(80, { error: "File name must be less than 80 characters" })
  .regex(new RegExp(/([A-Za-z0-9\-\_]+)/), {
    error:
      "File name can only contain letters, numbers, parentheses, underscores, and dashes",
  });

const useSave = () => {
  const DEMOInstance = useDEMOModelerStore((state) => state.DEMOInstance);
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const fileName = useDEMOModelerStore((state) => state.fileName);

  const save = () => {
    try {
      if (!DEMOInstance) return;
      fileNameSchema.parse(fileName);
      const jsonModel = JSON.stringify({
        ...DEMOInstance.toObject(),
        isEnabled,
        version: "1.0.0",
      } satisfies DEMOModelJSON);
      localStorage.setItem("demo-model", jsonModel);
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error };
      }
    }
  };

  const autoSave = debounce(() => {
    save();
  }, 3000);

  return { save, autoSave };
};

export default useSave;
