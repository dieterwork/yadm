const loadPublicModel = async ({
  fileName,
  company,
}: {
  fileName: string;
  company: string;
}) => {
  const url = new URL(
    `${import.meta.env.VITE_BASE_URL}/models/${company}/${fileName}.json`
  );

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Fetch failed");
  }

  return res.json();
};

export default loadPublicModel;
