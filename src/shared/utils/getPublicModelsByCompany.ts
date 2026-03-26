import type { PublicModel } from "../types/types";

const getPublicModelsByCompany = (
  models: Array<PublicModel & { id: string }>
) => {
  const publicModelsByCompanyMap = new Map<
    string,
    Array<PublicModel & { id: string }>
  >();

  for (const model of models) {
    if (!publicModelsByCompanyMap.has(model.companyName)) {
      publicModelsByCompanyMap.set(model.companyName, []);
    }

    publicModelsByCompanyMap.get(model.companyName)?.push(model);
  }

  return publicModelsByCompanyMap;
};

export default getPublicModelsByCompany;
