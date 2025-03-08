import React from "react";
import { discounts } from "../../constants";
import { ButtonComponent } from "../export_components";
import { NavLink } from "react-router-dom";
const DiscountsComponents = () => {
  return (
    <div className="  mt-16 grid grid-cols-1 lg:grid-cols-2 gap-5 transition-all duration-500 ease-in-out">
      {discounts.map(({ image, title, discount }, index) => (
        <NavLink to="/products-page">
          <div className="h-52 rounded-lg overflow-hidden group">
            <div
              key={index}
              className="h-52 rounded-lg overflow-hidden flex flex-col gap-2  justify-center  px-5 bg-cover group-hover:scale-101 transition-all duration-300 ease-in-out"
              style={{ backgroundImage: `url(${image})` }}>
              <h1 className="sectionHeadings group-hover:scale-101 transition-all duration-300 ease-in-out">
                {title}
              </h1>
              <h1 className="group-hover:scale-101 transition-all duration-300 ease-in-out">
                {discount}
              </h1>
              <ButtonComponent
                text={"Shop Now"}
                className={
                  "bg-secondary cursor-pointer group-hover:scale-101 transition-all duration-300 ease-in-out"
                }
              />
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default DiscountsComponents;
