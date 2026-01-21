import { useKeyPress, type KeyCode } from "@xyflow/react";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useShortcut = (keyCode: KeyCode, callback: (args?: any) => any) => {
  const [didRun, setDidRun] = useState(false);
  const shouldRun = useKeyPress(keyCode, { preventDefault: true });

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
