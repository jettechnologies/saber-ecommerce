export const categoriesFetch = async() => {
    try{
        const response = await fetch("https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/fetch-all-product-categories");
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        throw new Error("Error fetching categories");
    }
}

// categoriesFetch();