import { useKeyPress, type KeyCode } from "@xyflow/react";
import type { UseKeyPressOptions } from "node_modules/@xyflow/react/dist/esm/hooks/useKeyPress";
import { useEffect, useState } from "react";

const useShortcut = (
  keyCode: KeyCode,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (args?: any) => any,
  options?: UseKeyPressOptions
) => {
  const [didRun, setDidRun] = useState(false);
  const shouldRun = useKeyPress(keyCode, {
    preventDefault: true,
    actInsideInputWithModifier: false,
    ...options,
  });

  useEffect(() => {
    if (shouldRun && !didRun) {
      callback();
      setDidRun(true);
    } else {
      setDidRun(shouldRun);
    }
  }, [shouldRun, didRun, callback]);
};

export default useShortcut;
