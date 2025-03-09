import React, { useEffect, useRef } from "react";
import { useStateContext } from "../contexts/useStateContext";
import { RxCross2 } from "react-icons/rx";
import {
  CollapsibleSection,
  CheckboxWithText,
  RangeComponent,
  ButtonComponent,
} from "./export_components";
import { gorceryProducts, productCategories } from "../constants";

const FilterSideBar = () => {
  const { activeFilterSideBar, setActiveFilterSideBar } = useStateContext();
  const FilterRef = useRef(null);
  const sideBarRef = useRef(null);

  useEffect(() => {
    console.log("FilterSideBar activeFilterSideBar:", activeFilterSideBar); // Debug
    const handleClickOutside = (event) => {
      if (
        FilterRef.current &&
        !FilterRef.current.contains(event.target) &&
        !sideBarRef.current.contains(event.target)
      ) {
        setActiveFilterSideBar(false);
      }
    };

    if (activeFilterSideBar) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeFilterSideBar, setActiveFilterSideBar]);
  //product in stock

  // Count the number of products in stock
  const productsInStock = gorceryProducts.filter(
    (product) => product.productInStock === true //
  ).length;

  //product out of stock
  const productOutOfStock = gorceryProducts.filter(
    (product) => product.productInStock === false
  ).length;
  //////
  return (
    <div
      className={`fixed right-0 top-0 w-72 h-full py-2 bg-white z-50 transition-transform duration-300 ease-in-out transform  md:hidden ${
        activeFilterSideBar ? "translate-x-0" : "translate-x-full"
      } flex flex-col gap-10 border-l border-accents`}
      ref={FilterRef}>
      {/* top section */}
      <div>
        <div className="flex flex-col gap-1 items-center">
          <p className="text-secondary font-bold">Filter and sort</p>
          <p className="text-tertiary text-sm">
            {gorceryProducts.length} products
          </p>
        </div>
        <RxCross2
          className="absolute cursor-pointer top-5 right-2"
          onClick={() => setActiveFilterSideBar(false)}
        />
        <hr className="border-t-2  border-accents" />
        {/* filter */}
        <div className="mt-10">
          <div className="px-5 flex flex-col gap-5">
            <div>
              <CollapsibleSection title="Availability">
                <CheckboxWithText label={`In stock (${productsInStock})`} />
                <CheckboxWithText label={`In stock (${productOutOfStock})`} />
              </CollapsibleSection>
            </div>
            <hr className="border-t-2  border-accents" />
            {/* Range */}
            <div>
              <CollapsibleSection title="Price">
                <div className="flex flex-col gap-3 mt-5">
                  <p>The highest price is $250.00</p>
                  <RangeComponent />
                </div>
                <hr className="border-t-2  border-accents" />
              </CollapsibleSection>
            </div>
            <hr className="border-t-2  border-accents" />
            <div>
              <CollapsibleSection title="Category">
                {productCategories.map((productCategory) => (
                  <CheckboxWithText label={productCategory} />
                ))}
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </div>
      {/* button */}
      <div className="flex flex-col gap-4 px-5">
        <hr className="border-t-2  border-accents" />
        <div className="flex gap-2 justify-between">
          <button className="py-2 px-4 w-fit rounded-md text-secondary  bg-white border border-accents">
            Remove all
          </button>
          <button className="py-2 px-4 w-fit rounded-md text-white  bg-primary">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
