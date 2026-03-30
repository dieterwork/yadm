import type { DEMOModelJSON } from "$/shared/types/reactFlow.types";
import { useSyncExternalStore } from "react";

export const LOCAL_MODEL_STORAGE_KEY = "yadm-model" as const;

const getLocalModelDataFromStorage = () =>
  localStorage.getItem(LOCAL_MODEL_STORAGE_KEY) ?? null;

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
};

const useLocalModel = (): [
  DEMOModelJSON | null,
  (model: DEMOModelJSON | null) => void,
] => {
  const localModel = useSyncExternalStore(
    subscribe,
    getLocalModelDataFromStorage
  );

  const setLocalModel = (model: DEMOModelJSON | null) => {
    if (model === null) {
      localStorage.removeItem(LOCAL_MODEL_STORAGE_KEY);
    } else {
      localStorage.setItem(LOCAL_MODEL_STORAGE_KEY, JSON.stringify(model));
    }
    window.dispatchEvent(new Event("storage"));
  };

  return [localModel && JSON.parse(localModel), setLocalModel];
};

export default useLocalModel;
