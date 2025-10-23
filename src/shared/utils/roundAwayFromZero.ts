export const roundAwayFromZero = (value: number) =>
  value >= 0 ? Math.ceil(value) : Math.floor(value);
