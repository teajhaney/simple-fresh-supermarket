import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../contexts/useStateContext";
import { RxCross2 } from "react-icons/rx";
import {
  CollapsibleSection,
  CheckboxWithText,
  RangeComponent,
} from "../export_components";
import { gorceryProducts, productCategories } from "../../constants";

const FilterSideBar = ({ onFilterChange }) => {
  const { activeFilterSideBar, setActiveFilterSideBar } = useStateContext();
  const FilterRef = useRef(null);
  const sideBarRef = useRef(null);

  // State for filter options
  const [filters, setFilters] = useState({
    inStock: false,
    outOfStock: false,
    priceRange: { from: 0, to: 250 },
    categories: [],
  });

  useEffect(() => {
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

  // Count the number of products in stock
  const productsInStock = gorceryProducts.filter(
    (product) => product.productInStock === true
  ).length;

  // Count the number of products out of stock
  const productOutOfStock = gorceryProducts.filter(
    (product) => product.productInStock === false
  ).length;

  // Handle checkbox changes for availability
  const handleAvailabilityChange = (type, checked) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: checked,
    }));
  };

  // Handle price range changes
  const handlePriceRangeChange = (newRange) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: newRange,
    }));
  };

  // Handle category checkbox changes
  const handleCategoryChange = (category, checked) => {
    setFilters((prevFilters) => {
      const updatedCategories = checked
        ? [...prevFilters.categories, category]
        : prevFilters.categories.filter((cat) => cat !== category);
      return {
        ...prevFilters,
        categories: updatedCategories,
      };
    });
  };

  // Handle applying filters
  const handleApplyFilters = () => {
    onFilterChange(filters);
    setActiveFilterSideBar(false); // Close the sidebar after applying
  };

  // Handle removing all filters
  const handleRemoveAllFilters = () => {
    const resetFilters = {
      inStock: false,
      outOfStock: false,
      priceRange: { from: 0, to: 250 },
      categories: [],
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div
      className={`fixed right-0 top-0 w-72 h-full py-2 bg-white z-50 transition-transform duration-300 ease-in-out transform md:hidden ${
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
        <hr className="border-t-2 border-accents" />
        {/* filter */}
        <div className="mt-10">
          <div className="px-5 flex flex-col gap-5">
            <div>
              <CollapsibleSection title="Availability">
                <CheckboxWithText
                  label={`In stock (${productsInStock})`}
                  checked={filters.inStock}
                  onChange={(checked) =>
                    handleAvailabilityChange("inStock", checked)
                  }
                />
                <CheckboxWithText
                  label={`Out of stock (${productOutOfStock})`} // Fixed label typo
                  checked={filters.outOfStock}
                  onChange={(checked) =>
                    handleAvailabilityChange("outOfStock", checked)
                  }
                />
              </CollapsibleSection>
            </div>
            <hr className="border-t-2 border-accents" />
            {/* Range */}
            <div>
              <CollapsibleSection title="Price">
                <div className="flex flex-col gap-3 mt-5">
                  <p>The highest price is $250.00</p>
                  <RangeComponent onRangeChange={handlePriceRangeChange} />
                </div>
                <hr className="border-t-2 border-accents" />
              </CollapsibleSection>
            </div>
            <hr className="border-t-2 border-accents" />
            <div>
              <CollapsibleSection title="Category">
                {productCategories.map((productCategory, index) => (
                  <CheckboxWithText
                    key={index}
                    label={productCategory}
                    checked={filters.categories.includes(productCategory)}
                    onChange={(checked) =>
                      handleCategoryChange(productCategory, checked)
                    }
                  />
                ))}
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </div>
      {/* button */}
      <div className="flex flex-col gap-4 px-5">
        <hr className="border-t-2 border-accents" />
        <div className="flex gap-2 justify-between">
          <button
            className="py-2 px-4 w-fit rounded-md text-secondary bg-white border border-accents"
            onClick={handleRemoveAllFilters}>
            Remove all
          </button>
          <button
            className="py-2 px-4 w-fit rounded-md text-white bg-primary"
            onClick={handleApplyFilters}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
