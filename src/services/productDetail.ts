export const productDetailFetch = async (id: number) => {
  try {
    const response = await fetch(import.meta.env.VITE_PRODUCT_LIST_API + id);
    const json = await response.json();

    const product = json;
    return product;
  } catch (error) {
    throw new Error("Error fetching product");
  }
};
