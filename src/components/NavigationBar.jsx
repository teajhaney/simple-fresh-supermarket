import React from "react";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdMenu } from "react-icons/io";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { useState, useRef, useEffect } from "react";
import { accounts, featuredCategories, shops } from "../constants";
import { CgMenuGridR } from "react-icons/cg";
import { OptionMenu } from "./export_components";
const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All Deprtments");
  const dropdownRef = useRef(null);
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  if (isOpen) {
    window.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    window.removeEventListener("mousedown", handleClickOutside);
  };
}, [isOpen]);
  return (
    <div className=" flex flex-col gap-3 lg:pb-10  border-b-2 border-b-accents">
      <div className="bodyContent h-16 flex justify-between items-center">
        <div className="flex items-center gap-16 text-4xl">
          {/* Logo */}
          <div className="flex items-center gap-2 text-4xl">
            <IoMdMenu className="lg:hidden" />
            <GiShoppingCart className="text-primary" />
            <h1 className="text-2xl font-bold">SimpleCart</h1>
          </div>
          {/* search */}
          <input
            type="search"
            name="search"
            id="search"
            className="w-200  h-10 hidden lg:flex rounded-sm border-2 text-secondary  px-3 text-lg border-accents"
            placeholder="Search"
          />
          {/* right icons */}
        </div>
        <div className="flex items-center gap-2 text-2xl">
          <CiSearch className="hidden lg:flex" />
          <CiUser />
          <CiShoppingCart />
        </div>
      </div>
      {/* Navbar */}
      <div className="bodyContent hidden lg:flex gap-8 items-center ">
        {/* departments */}
        <div className="relative w-52 h-10" ref={dropdownRef}>
          {/* Select Box */}
          <div
            className="  flex justify-center text-white gap-3 items-center bg-primary  p-3 rounded-md  cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}>
            <CgMenuGridR className="" />
            <span>{selected}</span>
          </div>
          {/* Dropdown Options */}
          {isOpen && (
            <ul className="absolute w-full bg-white  border-2 border-accents  rounded-md my-2 shadow-md z-10">
              {featuredCategories.map((featuredCategory, index) => (
                <li
                  key={index}
                  className="p-1 hover:bg-accents text-sm text-tertiary rounded-md mx-3 my-2 cursor-pointer transition"
                  onClick={() => {
                    setSelected(featuredCategory.title);
                    setIsOpen(false);
                  }}>
                  {featuredCategory.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Nav items */}
        <div>
          <ul className=" flex gap-10 items-center cursor-pointer">
            <li>Home</li>
            {/* shop */}
            <li>
              <OptionMenu navItem={"Shop"} navSubItems={shops} />
            </li>
            <li>
              {" "}
              <OptionMenu navItem={"Account"} navSubItems={accounts} />
            </li>
            <li>Blog</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
