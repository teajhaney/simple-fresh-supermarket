import React from "react";
import {
  CollapsibleSection,
  CheckboxWithText,
  RangeComponent,
} from ".././export_components.jsx";
import { gorceryProducts, productCategories } from "../../constants";

//product in stock
const FilterSection = () => {
  // Count the number of products in stock
  const productsInStock = gorceryProducts.filter(
    (product) => product.productInStock===true // 
  ).length;

  //product out of stock
  const productOutOfStock = gorceryProducts.filter(
    (product) => product.productInStock === false
  ).length;

  return (
    <aside className="hidden md:flex md:flex-col md:gap-3 md:mr-10">
      <h1 className="sectionHeadings">Filter:</h1>
      <hr className="border-t-2  border-accents" />
      {/* Avilability */}
      <div>
        <CollapsibleSection title="Availability">
          <CheckboxWithText label={`In stock (${productsInStock})`} />
          <CheckboxWithText label={`Out of stock (${productOutOfStock})`} />
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
        </CollapsibleSection>
      </div>
      <hr className="border-t-2  border-accents" />
      <div>
        <CollapsibleSection title="Category">
          {productCategories.map((productCategory,index) => (
            <CheckboxWithText key={index} label={productCategory} />
          ))}
        </CollapsibleSection>
      </div>
    </aside>
  );
};

export default FilterSection;



