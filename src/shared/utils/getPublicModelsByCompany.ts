import type { PublicModel } from "../types/types";

const getPublicModelsByCompany = (models: PublicModel[]) => {
  const publicModelsByCompanyMap = new Map<string, PublicModel[]>();

  for (const model of models) {
    if (!publicModelsByCompanyMap.has(model.companyName)) {
      publicModelsByCompanyMap.set(model.companyName, []);
    }

    publicModelsByCompanyMap.get(model.companyName)?.push(model);
  }

  return publicModelsByCompanyMap;
};

export default getPublicModelsByCompany;
