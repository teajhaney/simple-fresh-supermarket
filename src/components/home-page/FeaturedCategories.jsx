/* eslint-disable no-unused-vars */
import React from "react";
import { categories , productListVariantsYbottom} from "../../constants";
import { NavLink } from "react-router-dom";
import {motion} from "framer-motion"
const FeaturedCategories = () => {
  return (
    <section className=" h-fit mt-24 ">
      <motion.div
        variants={productListVariantsYbottom}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex flex-col gap-3">
        <h1 className="sectionHeadings">Featured Categories</h1>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 transition-all duration-500 ease-in-out">
          {categories.map(({ categoryImage, title }, index) => (
            <NavLink to="/products-page" key={index}>
              <div className="h-60 w-full flex flex-col  gap-3 justify-center items-center rounded-lg border border-accents hover:border-primary hover:shadow-[10px_10px_50px_-30px_rgb(0,0,0,0.25)] transition-all duration-500 ease-in-out">
                <img src={categoryImage} alt={title} />
                <h1>{title}</h1>
              </div>
            </NavLink>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedCategories;
