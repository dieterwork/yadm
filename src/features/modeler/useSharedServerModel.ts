import { useSyncExternalStore } from "react";

export const SHARED_MODEL_STORAGE_KEY = "yadm-shared-model" as const;

const getSharedModelDataFromStorage = () =>
  localStorage.getItem(SHARED_MODEL_STORAGE_KEY) ?? null;

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
};

const useSharedServerModel = (): [boolean, (isShared: boolean) => void] => {
  const isSharedServerModel = useSyncExternalStore(
    subscribe,
    getSharedModelDataFromStorage
  );

  const setSharedModel = (isShared: boolean) => {
    if (!isShared) {
      localStorage.set(SHARED_MODEL_STORAGE_KEY, "false");
    } else {
      localStorage.setItem(SHARED_MODEL_STORAGE_KEY, "true");
    }
    window.dispatchEvent(new Event("storage"));
  };

  return [isSharedServerModel, setSharedModel];
};

export default useSharedServerModel;
