import React from 'react'
import { GiShoppingCart } from "react-icons/gi";
import { IoMdMenu } from "react-icons/io";
const NavigationBar = () => {
  return (
    <div className=" flex flex-col bg-red-300">
      <div className="bodyContent h-16 flex justify-between items-center">
        <div className="flex items-center gap-2 text-4xl">
          <IoMdMenu />
                  <GiShoppingCart className="text-primary" />
                  <h1 className="text-2xl">simple</h1>
        </div>
      </div>
      <div className="bodyContent hidden lg:flex "></div>
    </div>
  );
}

export default NavigationBar
