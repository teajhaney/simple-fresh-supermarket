import React from "react";
import { IoFilterOutline } from "react-icons/io5";
import {ProductList} from "../components/export_components";

const ProductsPage = () => {
  return (
    <div className="bodyContent mt-8">
      <h1 className="text-sm font-semibold">
        <span className="text-primary">Home</span> /{" "}
        <span className="text-tertiary">Products</span>
      </h1>
      {/* filter and product */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5">
        {/* filter div */}
        <div className="md:col-span-2 lg:col-span-3 ">
          <div className="flex justify-between md:hidden">
            <div className="flex gap-3">
              <IoFilterOutline />
              <h1 className="text-secondary font-semibold">Filter and sort</h1>
            </div>
            <h1 className="text-grayed font-semibold">18 products</h1>
          </div>
        </div>
        {/* product div */}
        <ProductList/>
       
      </div>
    </div>
  );
};

export default ProductsPage;
