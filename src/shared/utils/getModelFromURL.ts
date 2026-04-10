const getModelFromUrl = () => {
  const queryParams = new URLSearchParams();

  const model = queryParams.get("model");

  if (!model) throw new Error("Model not found");

  // Add pagination params
  queryParams.append(
    "limit",
    (params?.limit ?? PAGINATION_CONFIG.ITEMS_PER_PAGE).toString()
  );
  queryParams.append(
    "skip",
    (params?.skip ?? PAGINATION_CONFIG.INITIAL_ITEMS_TO_SKIP).toString()
  );

  const response = await fetch(`${getProductsUrl()}?${queryParams}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - failed to load products.`);
  }

  return response.json() as Promise<ProductResponse>;
};

export default getModelFromUrl;
