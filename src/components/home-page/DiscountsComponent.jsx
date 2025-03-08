import React from "react";
import { discounts } from "../../constants";
import { ButtonComponent } from "../export_components";
import { NavLink } from "react-router-dom";
const DiscountsComponents = () => {
  return (
    <div className="  mt-16 grid grid-cols-1 lg:grid-cols-2 gap-5">
      {discounts.map(({ image, title, discount }, index) => (
        <NavLink to="/products-page">
          <div
            key={index}
            className="h-52 rounded-lg overflow-hidden flex flex-col gap-2  justify-center  px-5 bg-cover"
            style={{ backgroundImage: `url(${image})` }}>
            <h1 className="sectionHeadings">{title}</h1>
            <h1>{discount}</h1>
            <ButtonComponent text={"Shop Now"} className={"bg-secondary cursor-pointer"} />
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default DiscountsComponents;
