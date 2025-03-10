import React from "react";
import { NavLink } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ProductDetailsPage = () => {
  return (
    <div className="bodyContent my-8">
      {" "}
      <h1 className="text-sm font-semibold">
        <span className="text-primary">
          <NavLink to="/">Home</NavLink>
        </span>{" "}
        /{" "}
        <span className="text-primary">
          <NavLink to='/products-page'>Products</NavLink>
        </span>{" "}
        /<span className="text-tertiary"> products</span>
      </h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2"></div>
    </div>
  );
};

export default ProductDetailsPage;
