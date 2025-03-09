import React from "react";
import { dailyBestSellImage, gorceryProducts } from "../../constants";
import { ButtonComponent } from "../export_components";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const DailyBestSells = () => {
  return (
    <section className="h-fit mt-24 flex flex-col gap-3 ">
      <h1 className="sectionHeadings">Daily Best Sells</h1>
      <div className="flex flex-col md:flex-row gap-3">
        {/* Best sells label */}
        <NavLink to="/products-page">
          <div
            className="p-8 h-96  2xl:h-96 lg:w-[350px] 2xl:w-[300px] flex flex-col gap-3 bg-center bg-cover bg-no-repeat rounded-lg text-white"
            style={{ backgroundImage: `url(${dailyBestSellImage})` }}>
            <h1 className="font-bold text-xl md:text-2xl">
              100% Organic Coffee Beans
            </h1>
            <h1 className="f">Get the best deal before it closes.</h1>
            <ButtonComponent className={"bg-primary"} text={"Shop now"} />
          </div>
        </NavLink>
        {/* Best sell product */}
        <div className="w-full grid gap-2 grid-cols-1 md:grid-cols-1 lg:grid-cols-3 flex-grow">
          {gorceryProducts
            .filter((product) => product.bestSells)
            .map((gorceryProduct, index) => (
              <NavLink to="/products-details-page" key={index}>
                <div
                  className="bg-white flex flex-col gap-2 p-4 rounded-lg border border-accents hover:border-primary transition-all duration-500 ease-in-out
                  h-auto">
                  {/* Centered Image */}
                  <div className="h-full flex justify-center items-center">
                    <img
                      src={gorceryProduct.productImage}
                      alt={gorceryProduct.productName}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Product Name */}
                  <h2 className="text-lg lg:text-sm font-semibold">
                    {gorceryProduct.productName}
                  </h2>

                  {/* Ratings */}
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

                  {/* Price */}
                  <p className="text-secondary">
                    ${gorceryProduct.productPrice}
                  </p>

                  {/* Button */}
                  <ButtonComponent
                    text={"Add to cart"}
                    className="bg-primary text-[10px]"
                  />
                </div>
              </NavLink>
            ))}
        </div>
      </div>
    </section>
  );
};

export default DailyBestSells;
