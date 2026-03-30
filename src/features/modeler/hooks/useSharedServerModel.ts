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
    localStorage.setItem(SHARED_MODEL_STORAGE_KEY, isShared ? "true" : "false");

    window.dispatchEvent(new Event("storage"));
  };

  return [isSharedServerModel === "true", setSharedModel];
};

export default useSharedServerModel;
