/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { gorceryProducts, productListVariantsXright } from "../../constants";
import { ButtonComponent } from "./../export_components";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useStateContext } from "../../contexts/useStateContext";

const PopularProducts = () => {
  const { addTocart } = useStateContext();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const productWidth = 400; // Get the width of one product (default 200px)
      scrollRef.current.scrollBy({
        left: direction === "right" ? productWidth : -productWidth,
        behavior: "smooth",
      });
    }
  };
  // Navigate to product details page with data
  const handleProductClick = (product) => {
    navigate("/products-details-page", { state: { product } });
  };
  return (
    <section className="mt-20  flex flex-col gap-3">
      <h1 className="sectionHeadings">Popular Products</h1>
      {/* Product List */}
      <motion.div
        variants={productListVariantsXright}
        initial="hidden"
        animate="visible"
        exit="hidden">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-hidden scroll-smooth no-scrollbar lg:grid lg:grid-cols-5 ">
          {gorceryProducts
            .filter((product) => product.popular)
            .map((gorceryProduct, index) => (
              <div
                key={index}
                onClick={() => handleProductClick(gorceryProduct)}
                className="cursor-pointer group">
                <div className=" h-auto w-100  lg:w-full flex-shrink-0 bg-white  flex flex-col gap-2  p-4 rounded-lg  border border-accents group-hover:border-primary transition-all duration-500 ease-in-out">
                  <img
                    src={gorceryProduct.productImage}
                    alt={gorceryProduct.productName}
                    className="w-full h-full object-contain"
                  />
                  <h2 className="text-lg lg:text-sm font-semibold group-hover:text-primary">
                    {gorceryProduct.productName}
                  </h2>
                  <div className="flex text-[#FFC007] text-sm">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < gorceryProduct.productRatings
                            ? "text-[#FFC007]"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-secondary">
                    ${gorceryProduct.productPrice.toFixed(2)}
                  </p>
                  <ButtonComponent
                    text={"Add to cart"}
                    className="bg-primary text-[10px]"
                    onClick={(event) => {
                      event.stopPropagation();
                      addTocart(gorceryProduct);
                    }}
                  />
                </div>
              </div>
            ))}
        </div>

        {/* Mobile Scroll Button */}
        <div className="flex lg:hidden justify-center gap-5 mt-3">
          <IoIosArrowBack
            className={`text-xl font-extralight cursor-pointer ${
              currentIndex === 1 ? "text-gray-300" : "text-secondary"
            }`}
            onClick={() => {
              if (currentIndex > 1) {
                setCurrentIndex((prev) => prev - 1);
                handleScroll("left");
              }
            }}
          />
          <h1>
            {currentIndex}/
            {gorceryProducts.filter((product) => product.popular).length}
          </h1>
          <IoIosArrowForward
            className={`text-xl font-extralight cursor-pointer ${
              currentIndex ===
              gorceryProducts.filter((product) => product.popular).length
                ? "text-gray-300"
                : "text-secondary"
            }`}
            onClick={() => {
              if (
                currentIndex <
                gorceryProducts.filter((product) => product.popular).length
              ) {
                setCurrentIndex((prev) => prev + 1);
                handleScroll("right");
              }
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default PopularProducts;
