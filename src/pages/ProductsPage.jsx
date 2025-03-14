import React, { useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import {
  ProductList,
  FilterSection,
  FilterSideBar,
} from "../components/export_components";
import { NavLink } from "react-router-dom";
import {useStateContext} from "../contexts/useStateContext"
import { gorceryProducts } from "../constants";
const ProductsPage = () => {
  const { setActiveFilterSideBar } = useStateContext();
const [filters, setFilters] = useState({
  inStock: false,
  outOfStock: false,
  priceRange: { from: 0, to: 250 },
  categories: [],
});

const handleFilterChange = (newFilters) => {
  setFilters(newFilters);
};
  
  return (
    <div className="bodyContent my-8">
      <h1 className="text-sm font-semibold">
        <span className="text-primary">
          <NavLink to="/">Home</NavLink>
        </span>{" "}
        / <span className="text-tertiary">Products</span>
      </h1>
      {/* filter and product */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5">
        {/* filter div */}
        <div className="md:col-span-2 lg:col-span-3 ">
          {/* hidden */}
          <div
            className="flex justify-between md:hidden cursor-pointer"
            onClick={() => setActiveFilterSideBar((prevState) => !prevState)}>
            <div className="flex gap-3">
              <IoFilterOutline />
              <h1 className="text-secondary font-semibold hover:underline hover:decoration-secondary">
                Filter and sort
              </h1>
            </div>
            <h1 className="text-grayed font-semibold">
              {gorceryProducts.length} products
            </h1>
          </div>
          <FilterSection onFilterChange={handleFilterChange} />
        </div>
        {/* product div */}
        <ProductList filters={filters} />
        <FilterSideBar onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
};

export default ProductsPage;

