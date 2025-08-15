export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  wait: number
) => {
  let timeout: ReturnType<typeof setTimeout>;

  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };

  return debounced;
};
