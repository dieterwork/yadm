const getShapeDimensions = (
  [minX, minY]: [number, number],
  [maxX, maxY]: [number, number],
  zoom: number = 1
) => {
  return {
    width: Math.abs(maxX - minX) / zoom,
    height: Math.abs(maxY - minY) / zoom,
  };
};

export default getShapeDimensions;
