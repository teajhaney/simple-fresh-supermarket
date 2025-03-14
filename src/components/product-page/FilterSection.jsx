import React, { useState } from "react";
import {
  CollapsibleSection,
  CheckboxWithText,
  RangeComponent,
} from ".././export_components.jsx";
import { gorceryProducts, productCategories } from "../../constants";

const FilterSection = ({ onFilterChange }) => {
  // State for filter options
  const [filters, setFilters] = useState({
    inStock: false,
    outOfStock: false,
    priceRange: { from: 0, to: 250 },
    categories: [],
  });

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
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [type]: checked,
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Handle price range changes
  const handlePriceRangeChange = (newRange) => {
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        priceRange: newRange,
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Handle category checkbox changes
  const handleCategoryChange = (category, checked) => {
    setFilters((prevFilters) => {
      const updatedCategories = checked
        ? [...prevFilters.categories, category]
        : prevFilters.categories.filter((cat) => cat !== category);
      const newFilters = {
        ...prevFilters,
        categories: updatedCategories,
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <aside className="hidden md:flex md:flex-col md:gap-3 md:mr-10">
      <h1 className="sectionHeadings">Filter:</h1>
      <hr className="border-t-2 border-accents" />
      {/* Availability */}
      <div>
        <CollapsibleSection title="Availability">
          <CheckboxWithText
            label={`In stock (${productsInStock})`}
            checked={filters.inStock}
            onChange={(checked) => handleAvailabilityChange("inStock", checked)}
          />
          <CheckboxWithText
            label={`Out of stock (${productOutOfStock})`}
            checked={filters.outOfStock}
            onChange={(checked) =>
              handleAvailabilityChange("outOfStock", checked)
            }
          />
        </CollapsibleSection>
      </div>
      <hr className="border-t-2 border-accents" />
      {/* Price Range */}
      <div>
        <CollapsibleSection title="Price">
          <div className="flex flex-col gap-3 mt-5">
            <p>The highest price is $250.00</p>
            <RangeComponent onRangeChange={handlePriceRangeChange} />
          </div>
        </CollapsibleSection>
      </div>
      <hr className="border-t-2 border-accents" />
      {/* Categories */}
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
    </aside>
  );
};

export default FilterSection;
