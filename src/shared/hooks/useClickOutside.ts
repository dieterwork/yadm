import { useEffect, type RefObject } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: () => void,
  isDisabled?: boolean
) => {
  useEffect(() => {
    function handlePointerOutside(e: MouseEvent) {
      if (
        e.target &&
        e.target instanceof Node &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        handler();
      }
    }
    document.addEventListener("pointerdown", handlePointerOutside);
    return () => {
      document.removeEventListener("pointerdown", handlePointerOutside);
    };
  }, []);
};

export default useClickOutside;
