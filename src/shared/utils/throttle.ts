const throttle = <T extends []>(
  callback: (..._: T) => void,
  wait: number
): ((..._: T) => void) => {
  let queuedToRun: NodeJS.Timeout | undefined;
  let previouslyRun: number;
  return function invokeFn(...args: T) {
    const now = Date.now();
    queuedToRun = clearTimeout(queuedToRun) as undefined;
    if (!previouslyRun || now - previouslyRun >= wait) {
      callback(...args);
      previouslyRun = now;
    } else {
      queuedToRun = setTimeout(
        invokeFn.bind(null, ...args),
        wait - (now - previouslyRun)
      );
    }
  };
};

export default throttle;
