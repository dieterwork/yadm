import {
  CheckCircleIcon,
  LinkBreakIcon,
  LinkIcon,
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
      className="notifications | absolute top-2 right-2"
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((toast, i) => {
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
              "toast | flex justify-end absolute w-[18rem] transition-all duration-500 ease-out top-2 right-2",
              toast?.visible
                ? "animate-in fade-in"
                : "animate-out fade-out opacity-0"
            )}
            style={{
              transform: `translateY(${offset}px)`,
              zIndex: 99999 - i,
            }}
            {...toast.ariaProps}
          >
            <div
              data-type={toast.type}
              className="grid grid-cols-[auto_1fr_auto] gap-2 items-center bg-white data-[type='success']:bg-emerald-100 data-[type='error']:bg-rose-100 text-xs p-2.5 shadow-lg rounded-md text-slate-900 font-medium"
            >
              <div>
                {toast.type === "error" && (
                  <XCircleIcon
                    size={24}
                    color="var(--color-rose-500)"
                    weight="fill"
                  />
                )}
                {toast.type === "success" && (
                  <CheckCircleIcon
                    size={24}
                    color="var(--color-emerald-500)"
                    weight="fill"
                  />
                )}
                {toast.icon === "link" && (
                  <LinkIcon size={24} color="var(--color-sky-900)" />
                )}
                {toast.icon === "linkBreak" && (
                  <LinkBreakIcon size={24} color="var(--color-slate-900)" />
                )}
              </div>
              {/* @ts-expect-error toast.message throwing error that it cannot be a jsx element... */}
              <div className="leading-[1.3]">{toast.message}</div>
              {!toast.className?.includes("no-remove") && (
                <div className="grid place-items-center">
                  <Button
                    className="cursor-pointer"
                    onPress={() => {
                      toastFn.dismiss(toast.id);
                    }}
                  >
                    <XIcon
                      aria-label="Close toast"
                      size={14}
                      color="var(--color-slate-900)"
                    />
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
