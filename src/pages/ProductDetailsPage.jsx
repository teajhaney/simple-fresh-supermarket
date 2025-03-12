import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import {
  ButtonComponent,
  CollapsibleSection,
  Tab,
} from "../components/export_components";
import {
  productListVariantsXright,
  productListVariantsXleft,
} from "../constants";
import { useStateContext } from "../contexts/useStateContext";

const ProductDetailsPage = () => {
  const { addTocart } = useStateContext();
  const [counter, setCounter] = useState(1);
  const location = useLocation();
  const product = location.state?.product;
  //increase counter
  const increaseCounter = () => setCounter((prev) => prev + 1);
  //decrease counter
  const decreaseCounter = () => setCounter((prev) => (prev > 1 ? prev - 1 : 1));
  if (!product) {
    return (
      <p className="text-center text-red-500">No product details available.</p>
    );
  }
  return (
    <div className="bodyContent my-8 flex- flex-col gap-5">
      {" "}
      <h1 className="text-sm font-semibold">
        <span className="text-primary">
          <NavLink to="/">Home</NavLink>
        </span>{" "}
        /{" "}
        <span className="text-primary">
          <NavLink to="/products-page">Products</NavLink>
        </span>{" "}
        /<span className="text-tertiary"> {product.productName}</span>
      </h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2">
        {/* product image */}
        <motion.div
          variants={productListVariantsXleft}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="w-full md:self-center">
          <img src={product.productImage} alt="" />
        </motion.div>
        {/* product details */}
        <motion.div
          variants={productListVariantsXright}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="w-full">
          <div className="  w-full h-full flex flex-col gap-5">
            {" "}
            <h2 className="text-3xl text-tertiary font-semibold ">
              {product.productName}
            </h2>
            <div className="flex text-[#FFC007] text-sm">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={` text-sm
                                    ${
                                      i < product.productRatings
                                        ? "text-[#FFC007]"
                                        : "text-gray-300"
                                    }
                                  `}
                />
              ))}
            </div>
            <p className="text-secondary text-2xl font-semibold">
              ${product.productPrice.toFixed(2)}
            </p>
            <hr className="border-t-2  border-accents" />
            <p className="text-sm">
              {product.productName} is Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Repellendus possimus voluptates numquam quia,
              incidunt perspiciatis modi consequatur consectetur qui nisi
              dolorem natus delectus accusantium dolores molestias culpa
              perferendis animi laudantium!
            </p>
            <div className="flex">
              <button
                className="h-8 w-8 text-secondary flex justify-center items-center border border-accents rounded-tl-lg rounded-bl-lg "
                onClick={decreaseCounter}>
                -
              </button>
              <div className="h-8 w-10 text-secondary flex justify-center items-center border border-accents">
                {counter}
              </div>
              <button
                className="h-8 w-8 text-secondary flex justify-center items-center border border-accents rounded-tr-lg rounded-br-lg  "
                onClick={increaseCounter}>
                +
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <ButtonComponent
                text={"Add to cart"}
                className={"bg-primary"}
                onClick={(event) => {
                  event.stopPropagation(); // Stop the click event from reaching the parent
                  addTocart(product);
                }}
              />
              <ButtonComponent text={"Buy it now"} className={"bg-secondary"} />
            </div>
            <hr className="border-t-2  border-accents" />
            <CollapsibleSection
              title={"Ingredients"}
              children={
                <p className="text-tertiary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus autem magni nulla eveniet ducimus reiciendis
                  vitae ex, ullam mollitia, quae asperiores, iure repellat
                  laboriosam dolorem corrupti quis fuga delectus neque.
                </p>
              }
            />
            <hr className="border-t-2  border-accents" />
            <CollapsibleSection
              title={"Storage Information"}
              children={
                <div className="flex flex-col gap-2 text-tertiary pl-5">
                  <p>Diameter: 12 inches (30.5 cm)</p>
                  <p>Thickness: 1 inch (2.5 cm) </p>
                  <p>Packaging Dimensions: 12.5 x 12.5 x</p>
                  <p>1.5 inches Weight: 500 grams (17.6 oz)</p>
                </div>
              }
            />
          </div>
        </motion.div>
      </div>
      <Tab productName={product.productName} />
    </div>
  );
};

export default ProductDetailsPage;
