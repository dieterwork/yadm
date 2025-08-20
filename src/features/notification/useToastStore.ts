import { create } from "zustand";
import uuid from "../../shared/utils/uuid";

type Position = "top center" | "bottom center" | "top right" | "bottom right";
type Direction = "fade up" | "fade left";
type Toast = {
  id: string;
  isOpen: boolean;
  message: string;
  type: "success" | "error" | "warning";
};
type ToastState = {
  toasts: Toast[];
  close: (id: string) => void;
  position: Position;
  direction: Direction;
  toast: {
    success: (message: string, closeDelay?: number) => void;
    error: (message: string, closeDelay?: number) => void;
    warning: (message: string, closeDelay?: number) => void;
  };
};

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  close: (id: string) => {
    set({
      toasts: get().toasts.filter((toast) => toast.id !== id),
    });
  },
  message: "",
  toastType: "success",
  position: "bottom center",
  direction: "fade up",
  toast: {
    success: (message, closeDelay = 1000) => {
      const id = uuid();
      set({
        toasts: [
          ...get().toasts,
          { id, isOpen: true, type: "success", message },
        ],
      });
      if (closeDelay) {
        setTimeout(() => {
          set({
            toasts: get().toasts.map((toast) => {
              if (toast.id !== id) return toast;
              return { ...toast, isOpen: false };
            }),
          });
        }, closeDelay);
      }
    },
    warning: (message, closeDelay = 1000) => {
      const id = uuid();
      set({
        toasts: [
          ...get().toasts,
          { id, isOpen: true, type: "warning", message },
        ],
      });
      if (closeDelay) {
        setTimeout(() => {
          set({
            toasts: get().toasts.map((toast) => {
              if (toast.id !== id) return toast;
              return { ...toast, isOpen: false };
            }),
          });
        }, closeDelay);
      }
    },
    error: (message, closeDelay = 1000) => {
      const id = uuid();
      set({
        toasts: [
          ...get().toasts,
          { id, isOpen: true, type: "warning", message },
        ],
      });
      if (closeDelay) {
        setTimeout(() => {
          set({
            toasts: get().toasts.map((toast) => {
              if (toast.id !== id) return toast;
              return { ...toast, isOpen: false };
            }),
          });
        }, closeDelay);
      }
    },
  },
}));
