// import ProductList from "../components/ProductList";
// import Filters from "../components/Filters";
import Modal from "@/components/Modal";
// import { useParams } from "react-router";
// import { useNavigate } from "react-router-dom";
// import filterIcon from "../assets/icons/filter.svg";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DropdownIcon } from "../../icons/svg";
import Select from "@/components/Select";
// import SideNavBar from "../components/SideNavBar";
import { DollarSign, SlidersHorizontal } from "lucide-react";
import ReactSlider from "react-slider";
import ProductCard from "@/components/ProductCard";

function Store() {
  // const { search, category = "all" } = useParams<{
  //   search?: string;
  //   category?: string;
  // }>();
  // const searchTerm = search ?? "";
  // const categoryTerm = category ?? "all";

  // const navigate = useNavigate();

  // const handleClearFilter = () => {
  //   navigate("/store/all");
  // };
  const location = useLocation();
  const paths:string[] = location.pathname.split("/").filter(Boolean);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleClick = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const MIN = 0, MAX = 100;

  const [values, setValues] = useState([MIN, MAX]);

  console.log(values)

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
            {
              paths.map((path, index) =>(
                <li className="flex items-center gap-2" key = {index}>
                  <Link to = {`/${path}`}>
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
              <Select className="border-2 border-gray " select={[{key: "recommend", value: "recommend"}, {key: "customer review", value: "customer review"}, {key: "lowest - highest", value: "lowest - highest"}]}/>
            </div>
          </div>
        </div>
        {/* the main section */}
        <div id = "main-section" className="mt-8">

            {/* exte */}

            <div className="w-full">
              <div className="flex flex-wrap justify-between gap-4">
                      {
                        [1,2,3,4,5,6,7,8].map(index => (
                          <div className="w-full md:w-[44.5vw] lg:w-[22.5vw] h-[23rem] z-20" key={index}>
                            <ProductCard />
                          </div>
                        ))
                      }
                    </div>
            </div>
        </div>

      </section>

      <Modal position="left" open={isFiltersOpen} onClose={handleClick}>
        <div onClick={handleClick}>
        <div className="border-b border-black pb-4">
                      <h3 className="font-semibold text-xl capitalize text-text-black mb-4">filters</h3>
                      <ul className="flex flex-wrap gap-3">
                      </ul>
                    </div>
                    <div className="border-b border-black p-4 flex flex-col gap-4">
                      <p className="font-medium text-size-500 text-text-black capitalize">
                        categories
                      </p>
                      <div className="w-full h-full">
                        <Select className="border border-black" select={[{key: "recommend", value: "recommend"}, {key: "customer review", value: "customer review"}, {key: "lowest - highest", value: "lowest - highest"}]}/>
                      </div>
                    </div>
                    <div className="border-b border-black p-4 flex flex-col gap-4">
                      <p className="font-medium text-size-500 text-text-black capitalize">
                        sort by
                      </p>
                      <div className="w-full h-full">
                        <Select className="border border-black" select={[{key: "recommend", value: "recommend"}, {key: "customer review", value: "customer review"}, {key: "lowest - highest", value: "lowest - highest"}]}/>
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
