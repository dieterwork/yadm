import { useEffect, useState } from "react";
import { useAttachStore } from "../actions/attach/useAttachStore";

export const useCursor = () => {
  const [cursor, setCursor] = useState("default");
  const isAttaching = useAttachStore((state) => state.isAttaching);

  useEffect(() => {
    if (isAttaching) {
      setCursor("crosshair");
    } else {
      setCursor("default");
    }
  }, [isAttaching]);

  return cursor;
};
