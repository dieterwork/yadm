const convertWhitePixelsToTransparentPixels = async (
  image: HTMLImageElement
) => {
  const canvas = new OffscreenCanvas(image.width, image.height);

  const ctx = canvas.getContext("2d");

  ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
  const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
  const pixel = imageData?.data;

  const r = 0,
    g = 1,
    b = 2,
    a = 3;

  if (!pixel) throw new Error("Pixel data not found");

  for (let p = 0; p < pixel.length; p += 4) {
    if (pixel[p + r] == 255 && pixel[p + g] == 255 && pixel[p + b] == 255) {
      // if white then change alpha to 0
      pixel[p + a] = 0;
    }
  }

  ctx?.putImageData(imageData, 0, 0);

  return await canvas.convertToBlob();
};

export default convertWhitePixelsToTransparentPixels;
