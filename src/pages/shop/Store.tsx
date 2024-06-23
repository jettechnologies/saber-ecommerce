// import ProductList from "../components/ProductList";
// import Filters from "../components/Filters";
import Modal from "@/components/Modal";
import { useParams } from "react-router";
// import { useNavigate } from "react-router-dom";
// import filterIcon from "../assets/icons/filter.svg";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DropdownIcon } from "../../icons/svg";
import Select from "@/components/Select";
// import SideNavBar from "../components/SideNavBar";
import { DollarSign, SlidersHorizontal } from "lucide-react";
import ReactSlider from "react-slider";
import ProductCard from "@/components/ProductCard";
import { useNavigate } from "react-router-dom";
// import { useProducts } from "@/hooks/useProducts";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import useGetRequest from "@/hooks/useGetRequest";
import { CategoryTypeWithProduct, ProductType } from "@/types";
import { useProductCatergories } from "@/context/productCatergoriesContext";

function Store() {
  const { category } = useParams<{
    category?: string;
  }>();
  const categoryTerm = category ?? "";
  const navigate = useNavigate();

  
  const location = useLocation();
  const paths:string[] = location.pathname.split("/").filter(Boolean);
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search') || '';

  const { categories, products, loading, error } = useProductCatergories();
  const categoryWithProduct = useGetRequest<CategoryTypeWithProduct[]>(`browse/fetch-one-product-category-with-products/${categoryTerm}`, {}, !!categoryTerm);

  const productCategories: { key: string; value: string }[] = categories.map(
    (category) => ({
      key: category.id.toLocaleString(),
      value: category.name,
    })
  );

  const { data: searchResults, loading: searchLoading, error: searchError } = useGetRequest<ProductType[]>(
    `browse/search-product?keyword=${search}`,
    {}, // Empty options object
    !!search // Only fetch if search is not empty
  );

  console.log(searchError, searchLoading, searchResults);

  // state to handle filtering would have to make it possible that it accepts the whole filter value of sort and price differences
  const [filter, setFilter] = useState("");

  const handleCategorySearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

    setFilter(target.value);
  }

  useEffect(() =>{
    filter !== "" && navigate(`/store/${filter}`, {replace: true});
    setFilter("");
  },[filter, navigate, setFilter]);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleClick = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const MIN = 0, MAX = 100;

  const [values, setValues] = useState([MIN, MAX]);

  if (loading) {
    return <div className="w-full min-h-screen">
      <Spinner />
    </div>;
  }

  if(error){
    return <div className="w-full min-h-screen">
      <h5>{error}</h5>
    </div>;
  }
  // console.log(filter)

  return (
    <>
      <section className="w-full h-full px-8">
        <div id = "page-banner" className="w-full h-[300px] bg-gray flex flex-col justify-center items-center gap-y-4">
          <ul className="w-fit flex gap-2 text-size-400 font-semibold text-text-black capitalize">
            <li className="flex items-center gap-2">
              <Link to = "/">
                home
              </Link>
              <DropdownIcon stroke="#6C7275" className="h-3 w-3 -rotate-90" />
            </li>
            <li className="flex items-center gap-2">
              <Link to = "/store">
                Shop
              </Link>
              <DropdownIcon stroke="#6C7275" className="h-3 w-3 -rotate-90" />
            </li>
            {
              paths.slice(1).map((path, index) =>(
                <li className="flex items-center gap-2" key = {index}>
                  <Link to = {`/store/${path}`}>
                    {path}
                  </Link>
                  <DropdownIcon stroke="#6C7275" className="h-3 w-3 -rotate-90" />
                </li>
              ))
            }
          </ul>
          <h2 className="text-4xl lg:text-6xl font-bold text-text-black capitalize">
            Collections
          </h2>
          <p className="text-size-500 font-medium text-text-black">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque animi illum perferendis!
          </p>
        </div>

        <div className="border-b border-black py-8">
          <div className="flex justify-between w-full items-center">
              <button 
                className="p-2 flex gap-4 items-center hover:underline" 
                type="button"
                onClick = {handleClick}
              >
                <SlidersHorizontal />
                <p className="text-text-black font-medium text-size-500">Filters</p>
              </button>
            <div className="flex gap-x-4 items-center">
              <label htmlFor="sort">
                <p className="text-size-500 font-medium text-text-black">Sort by</p>
              </label>
              <Select id = "sort" name="sort" className="border border-black" defaultText="Sort by" select={[{key: "recommend", value: "recommend"}, {key: "customer review", value: "customer review"}, {key: "lowest - highest", value: "lowest - highest"}]}/>
            </div>
          </div>
        </div>
        {/* the main section */}
        <div id = "main-section" className="mt-8">

            {/* exte */}

            <div className="w-full">
              {categoryTerm === "" ?(products.length > 0 ? <div className="flex flex-wrap justify-between gap-4">
                      {
                        products.map(product => (
                          <div className="w-full md:w-[44.5vw] lg:w-[22.5vw] h-[23rem] z-20" key={product.id}>
                            <ProductCard product={product}/>
                          </div>
                        ))
                      }
                    </div>
                  : (products.length === 0 || error) &&
                      <div className="flex flex-col items-center justify-center text-center mx-4 lg:mx-24 min-h-">
                        <h1>
                          The product you tried to reach does not exist, please search another
                          one.
                        </h1>
                        <Link
                          to="/store"
                          className="w-full lg:w-[50%] mt-6 flex items-center justify-center text-lg text-white px-10 py-3 gap-3 font-semibold rounded-lg hover:scale-110 transition-transform"
                        >
                          <Button size = "large" className="text-size-500 w-full h-full">Shop</Button>
                        </Link>
                    </div>
                ): (
                  (categoryWithProduct.data[0]?.products && categoryWithProduct.data[0]?.products.length > 0 )? <div className="flex flex-wrap justify-between gap-4">
                      {
                        categoryWithProduct.data[0]?.products.map(product => (
                          <div className="w-full md:w-[44.5vw] lg:w-[22.5vw] h-[23rem] z-20" key={product.id}>
                            <ProductCard product={product}/>
                          </div>
                        ))
                      }
                    </div>
                  : (categoryWithProduct.data[0]?.products.length === 0 || categoryWithProduct.error) &&
                      <div className="flex flex-col items-center justify-center text-center mx-4 lg:mx-24 min-h-">
                        <h1>
                          The product you tried to reach does not exist, please search another
                          one.
                        </h1>
                        <Link
                          to="/store"
                          className="w-full lg:w-[50%] mt-6 flex items-center justify-center text-lg text-white px-10 py-3 gap-3 font-semibold rounded-lg hover:scale-110 transition-transform"
                        >
                          <Button size = "large" className="text-size-500 w-full h-full">Shop</Button>
                        </Link>
                    </div>
                ) }
            </div>
        </div>

      </section>


      {/* <div className={`w-full h-[--hero-height] ${!isFiltersOpen ? "block": "hidden"} border-2 border-black`}></div> */}
      <Modal open={isFiltersOpen} onClose={handleClick} position = "left">
        <div>
        <div className="border-b border-black pb-4">
                      <h3 className="font-semibold text-xl capitalize text-text-black mb-4">filters</h3>
                      <ul className="flex flex-wrap gap-3">
                      </ul>
                    </div>
                    <div className="border-b border-black p-4 flex flex-col gap-4">
                      <label htmlFor="category" className="font-medium text-size-500 text-text-black capitalize">
                        categories
                      </label>
                      <div className="w-full h-full">
                        <Select 
                          id="category" 
                          name="category" 
                          // value={filter} 
                          defaultText="Categories" 
                          handleInputChange={handleCategorySearch}
                          className="border border-black"
                          select={productCategories}
                        />
                      </div>
                    </div>
                    <div className="border-b border-black p-4 flex flex-col gap-4">
                      <label htmlFor="sort" className="font-medium text-size-500 text-text-black capitalize">
                        sort by
                      </label>
                      <div className="w-full h-full">
                        <Select id = "sort" name="sort" className="border border-black" defaultText="Sort by" select={[{key: "recommend", value: "recommend"}, {key: "customer review", value: "customer review"}, {key: "lowest - highest", value: "lowest - highest"}]}/>
                      </div>
                    </div>
                    <div className="border-b border-black p-4 pb-6 flex flex-col gap-4">
                      <p className="font-medium text-size-500 text-text-black capitalize">
                        price
                      </p>
                      <div className="flex flex-col gap-y-6">
                        <div className="flex justify-between">
                          <div className="border border-black px-3 py-4 w-[8rem] flex items-center">
                            <DollarSign size={15}/> {values[0]}
                          </div>
                          <div className="border border-black px-3 py-4 w-[8rem] flex items-center">
                            <DollarSign size={15}/> {values[1]}
                          </div>
                        </div>
                        <ReactSlider
                            className="horizontal-slider"
                            thumbClassName="price-thumb"
                            trackClassName="price-track"
                            defaultValue={values}
                            ariaLabel={['Lower thumb', 'Upper thumb']}
                            pearling
                            onChange={(value) => setValues(value)}
                            minDistance={10}
                            min = {MIN}
                            max = {MAX}
                        />
                      </div>
                    </div>
        </div>
      </Modal>
    </>
  );
}

export default Store;
