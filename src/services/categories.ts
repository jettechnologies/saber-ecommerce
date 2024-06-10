export const categoriesFetch = async() => {
    try{
        const response = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}`);
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        throw new Error("Error fetching categories");
    }
}

// categoriesFetch();