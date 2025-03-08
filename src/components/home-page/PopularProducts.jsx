import React, { useRef } from "react";
import { gorceryProducts } from "../../constants"
import { ButtonComponent } from './../export_components'
const PopularProducts = () => {
  const scrollRef = useRef(null);

  // Scroll Handler
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust as needed
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-20 bg-primary flex flex-col gap-3">
      <h1 className="sectionHeadings">Popular Products</h1>
      {/* Product List */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-hidden scroll-smooth no-scrollbar lg:grid lg:grid-cols-5">
        {gorceryProducts.map((gorceryProduct, index) => (
          <div
            key={index}
            className="w-60 h-80 bg-white shadow-lg flex flex-col items-center p-4 rounded-lg">
            <img
              src={gorceryProduct.productImage}
              alt={gorceryProduct.productName}
              className="w-full h-40 object-cover"
            />
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="text-gray-500">{gorceryProduct.productPrice}</p>
            <ButtonComponent text={"Buy Now"} className="bg-secondary mt-2" />
          </div>
        ))}
      </div>

      {/* Mobile Scroll Button */}
      <div className="flex lg :hidden justify-center gap-5 mt-3">
        <button
          className="bg-black text-white px-4 py-2"
          onClick={() => handleScroll("left")}>
          ◀ Prev
        </button>
        <button
          className="bg-black text-white px-4 py-2"
          onClick={() => handleScroll("right")}>
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default PopularProducts;
