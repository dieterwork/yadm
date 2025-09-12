import { useStore } from "@xyflow/react";

const useHasChildNodes = (id: string) => {
  if (!id) throw new Error("Id not defined");
  return useStore((store) => {
    const childNodeCount = store.parentLookup.get(id)?.size ?? 0;
    return childNodeCount > 0;
  });
};

export default useHasChildNodes;
