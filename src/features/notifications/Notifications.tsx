import {
  CheckCircleIcon,
  WarningIcon,
  XCircleIcon,
  XIcon,
} from "@phosphor-icons/react";
import { cn } from "@sglara/cn";
import { Button } from "react-aria-components";
import toastFn, { useToaster } from "react-hot-toast/headless";

const Notifications = () => {
  const { toasts, handlers } = useToaster({ duration: 10000 });
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;

  return (
    <div
      className="notifications | fixed top-2 mx-auto left-0 right-0"
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((toast) => {
        const offset = calculateOffset(toast, {
          reverseOrder: false,
          gutter: 8,
        });

        const ref = (el: HTMLDivElement | null) => {
          if (el && typeof toast.height !== "number") {
            const height = el.getBoundingClientRect().height;
            updateHeight(toast.id, height);
          }
        };

        return (
          <div
            key={toast.id}
            ref={ref}
            className={cn(
              "toast | flex justify-center absolute w-[20rem] transition-all duration-500 ease-out",
              toast.visible ? "opacity-100" : "opacity-0"
            )}
            style={{
              transform: `translateY(${offset}px)`,
            }}
            {...toast.ariaProps}
          >
            <div
              data-type={toast.type}
              className="grid grid-cols-[auto_1fr_auto] gap-2 items-center bg-white data-[type='success']:bg-emerald-100 data-[type='error']:bg-rose-100 text-xs p-2.5 shadow-lg rounded-md text-slate-900 font-medium"
            >
              <div>
                {toast.type === "error" && (
                  <XCircleIcon size={24} color="var(--color-emerald-500)" />
                )}
                {toast.type === "success" && (
                  <CheckCircleIcon size={24} color="var(--color-emerald-500)" />
                )}
              </div>
              {/* @ts-ignore */}
              <div>{toast.message}</div>
              <div>
                <Button
                  onPress={() => {
                    toastFn.dismiss(toast.id);
                  }}
                >
                  <XIcon
                    aria-label="Close toast"
                    size={20}
                    color="var(--color-slate-900)"
                  />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
