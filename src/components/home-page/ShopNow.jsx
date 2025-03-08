import React from "react";
import { shopNowBg } from "../../constants";
import { NavLink } from "react-router-dom";
import { ButtonComponent } from "../export_components";
const ShopNow = () => {
  return (
    <>
      {" "}
      <NavLink to={"/products-page"}>
        <section
          className="bg-cover bg-center h-80 md:h-120  rounded-lg flex flex-col justify-center gap-4 px-3 md:px-16 cursor-pointer"
          style={{ backgroundImage: `url(${shopNowBg})` }}>
          <div className="w-96 md:w-100 flex flex-col justify-center gap-4">
            <h1 className="text-[10px] text-secondary font-bold bg-[#FFC007] rounded-sm py-0.5 px-1 w-fit">
              Opening Sale Discount 50%
            </h1>
            <h1 className="text-xl md:text-5xl font-bold">
              SuperMarket For Fresh Grocery
            </h1>
            <h1 className="text-tertiary opacity-50 text-[12px] md:text-xl font-semibold">
              Introduced a new model for online grocery shopping and convinient
              home delivery
            </h1>
            <ButtonComponent
              text={"Shop Now →"}
              className={"bg-secondary cursor-pointer"}
            />
          </div>
        </section>
      </NavLink>
    </>
  );
};

export default ShopNow;
