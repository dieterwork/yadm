import type { PublicModel } from "../../../../shared/types/types";

const loadPublicModels = async (): Promise<PublicModel[]> => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/public-files`);

  if (!res.ok) {
    throw new Error("Fetch failed");
  }

  return res.json();
};

export default loadPublicModels;
