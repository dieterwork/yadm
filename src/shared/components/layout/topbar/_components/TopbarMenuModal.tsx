import { XIcon } from "@phosphor-icons/react";
import { cn } from "@sglara/cn";
import type { ReactNode } from "react";
import {
  Button,
  Dialog,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components";

export type DEMOModalProps = {
  title?: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  children?: ReactNode;
};

const DEMOModal = ({
  isOpen,
  onOpenChange,
  title,
  children,
}: DEMOModalProps) => {
  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className={({ isEntering, isExiting }) =>
        cn(
          "absolute inset-0 w-full h-(--page-height) z-10 bg-black/25 backdrop-blur isolate",
          isEntering && "animate-in fade-in duration-300 ease-out",
          isExiting && "animate-out fade-out duration-200 ease-in"
        )
      }
    >
      <Modal
        className={({ isEntering, isExiting }) =>
          cn(
            "sticky inset-0 w-full h-(--visual-viewport-height) flex items-center justify-center p-4 box-border text-center",
            isEntering && "animate-in zoom-in-95 ease-out duration-300",
            isExiting && "animate-out zoom-out-95 ease-in duration-200"
          )
        }
      >
        <Dialog className="w-[calc(100%-2rem)] max-w-2xl max-h-full overflow-hidden rounded-xl bg-white p-8 text-left align-middle shadow-xl outline-hidden relative">
          {({ close }) => (
            <>
              <Heading
                slot="title"
                className="text-2xl font-semibold leading-none text-slate-900"
              >
                {title}
              </Heading>
              <div className="grid place-items-center w-6 h-6 absolute right-8 top-8">
                <Button onPress={close} className="select-none cursor-pointer">
                  <XIcon color="var(--color-slate-700)" />
                </Button>
              </div>
              <div className="mt-5">{children}</div>
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

export default DEMOModal;
