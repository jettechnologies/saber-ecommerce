import { ProductType } from "../types";
// export const productsFetch = async (page: number, category: string) => {
//   try {
//     const response = await fetch(
//       `${import.meta.env.VITE_PRODUCT_LIST_API}${
//         category && category !== "all" ? `/category/${category}` : ""
//       }?limit=${6 * page}`
//     );
//     const json = await response.json();

//     const products = json;

//     return products?.map((product: ProductType) => ({
//       id: product.product_id,
//       title: product.name,
//       description: product.description,
//       price: product.price.toFixed(2),
//       category: product.category,
//       image: product.image,
//       availability: product.availability,
//     }));
//   } catch (error) {
//     throw new Error("Error fetching products");
//   }
// };

export const productsFetch = async() =>{
  try{
    const response =  await fetch("https://fake-store-api.mock.beeceptor.com/api/products");
    const json = await response.json();
    const products = json;

    return products?.map((product: ProductType) => ({
      product_id: product.product_id,
      name: product.name,
      description: product.description,
      price: (parseFloat(product.price.toFixed(2))),
      category: product.category,
      image: product.image,
      availability: product.availability,
      rating: product.rating,
    }))
  }
  catch(error){
    throw new Error("Error fetching products");
  }
}
