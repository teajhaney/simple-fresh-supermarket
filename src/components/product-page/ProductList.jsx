import React, { useState } from "react";
import { gorceryProducts, productListVariantsXright } from "../../constants";
import { ButtonComponent } from "../export_components";
import { FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useStateContext } from "../../contexts/useStateContext";

const ProductList = ({
  filters = {
    inStock: false,
    outOfStock: false,
    priceRange: { from: 0, to: 250 },
    categories: [],
  },
}) => {
  const { addTocart } = useStateContext();
  const navigate = useNavigate();

  // Number of products per page
  const productsPerPage = 8;

  // State to track the current page
  const [currentPage, setCurrentPage] = useState(0);

  // Filter products based on the provided filters
  const filteredProducts = gorceryProducts.filter((product) => {
    // Availability filter
    const matchesAvailability =
      (!filters.inStock && !filters.outOfStock) || // Show all if neither is selected
      (filters.inStock && product.productInStock) || // Show in-stock if checked
      (filters.outOfStock && !product.productInStock); // Show out-of-stock if checked

    // Price range filter
    const matchesPrice =
      product.productPrice >= filters.priceRange.from &&
      product.productPrice <= filters.priceRange.to;

    // Category filter (handle empty or invalid categories)
    const productCategories = Array.isArray(product.productCategory)
      ? product.productCategory
      : [product.productCategory].filter(Boolean); // Convert to array and filter out empty strings
    const matchesCategory =
      filters.categories.length === 0 || // Show all if no categories selected
      productCategories.some((category) =>
        filters.categories.includes(category)
      );

    return matchesAvailability && matchesPrice && matchesCategory;
  });

  // Calculate total number of pages based on filtered products
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Determine products to display
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  // Navigate to product details page with data
  const handleProductClick = (product) => {
    navigate("/products-details-page", { state: { product } });
  };

  return (
    <section className="md:col-span-4 lg:col-span-9 flex-col">
      <div className="flex flex-col gap-3">
        <div className="h-30 p-10 bg-accents flex flex-col justify-center rounded-lg gap-2">
          {/* Products heading */}
          <h1 className="text-2xl lg:text-5xl font-bold text-tertiary">
            Products
          </h1>
        </div>
        {/* Products list */}
        <motion.div
          key={currentPage}
          variants={productListVariantsXright}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((displayedProduct, index) => (
              <div
                key={index}
                onClick={() => handleProductClick(displayedProduct)}
                className="cursor-pointer group">
                <div className="h-90 lg:w-full flex-shrink-0 bg-white flex flex-col gap-2 p-4 rounded-lg border border-accents group-hover:border-primary transition-all duration-500 ease-in-out">
                  <img
                    src={displayedProduct.productImage}
                    alt={displayedProduct.productName}
                    className="w-full h-[60%] object-contain"
                  />
                  <h2 className="text-sm font-semibold group-hover:text-primary">
                    {displayedProduct.productName}
                  </h2>
                  <div className="flex text-[#FFC007] text-sm">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < displayedProduct.productRatings
                            ? "text-[#FFC007]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-secondary">
                    ${displayedProduct.productPrice.toFixed(2)}
                  </p>
                  <ButtonComponent
                    text={displayedProduct.buttonLabel}
                    className="bg-primary text-[12px] font-bold"
                    onClick={(event) => {
                      event.stopPropagation();
                      if (displayedProduct.buttonLabel === "Add to cart") {
                        // addTocart(displayedProduct);
                        addTocart({ ...displayedProduct, quantity: 1 }, false);
                      }
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No products match the filters.
            </p>
          )}
        </motion.div>
      </div>

      {/* Pagination Buttons */}
      <div className="flex gap-4 mt-4">
        {/* Generate buttons dynamically based on total pages */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === index
                ? "bg-primary text-white cursor-not-allowed"
                : "text-secondary hover:bg-accents"
            }`}>
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          className={`px-4 py-2 rounded-lg font-semibold border border-accents ${
            currentPage >= totalPages - 1
              ? "bg-accents cursor-not-allowed"
              : "text-secondary hover:bg-accents"
          }`}
          disabled={currentPage >= totalPages - 1}>
          <IoIosArrowForward />
        </button>
      </div>
    </section>
  );
};

export default ProductList;
