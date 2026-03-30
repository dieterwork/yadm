const getRelativeMouseCoordinates = (
  offset: { top: number; left: number },
  pointerCoordinates: [number, number]
) => {
  return [
    pointerCoordinates[0] - offset.left,
    pointerCoordinates[1] - offset.top,
  ];
};

export default getRelativeMouseCoordinates;
