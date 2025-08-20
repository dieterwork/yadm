import { useKeyPress, type KeyCode } from "@xyflow/react";
import { useEffect, useState } from "react";

const useShortcut = (keyCode: KeyCode, callback: Function) => {
  const [didRun, setDidRun] = useState(false);
  const shouldRun = useKeyPress(keyCode);

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
