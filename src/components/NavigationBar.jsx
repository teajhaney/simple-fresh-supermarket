import { useState, useRef } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { useEffect } from "react";
import { accounts, categories, shops } from "../constants";
import { CgMenuGridR } from "react-icons/cg";
import { OptionMenu } from "./export_components";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/useStateContext";

//code
const NavigationBar = () => {
  const { setActiveSideBarNav, activeSideBarNav } = useStateContext();
  const { activeCartSideBar, setActiveCartSideBar } = useStateContext();
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [departmentSelected, setDepartmentSelected] =
    useState("All Departments");
  const departmentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        departmentRef.current &&
        !departmentRef.current.contains(event.target)
      ) {
        setIsDepartmentOpen(false);
      }
    };

    if (isDepartmentOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDepartmentOpen]);

  return (
    <nav className=" flex flex-col gap-3 lg:pb-5  border-b-2 border-b-accents">
      <div className="bodyContent h-16 flex justify-between items-center">
        <div className="flex items-center gap-16 text-4xl">
          {/* Logo */}
          <div className="flex items-center gap-2 text-4xl">
            {activeSideBarNav ? (
              <RxCross2
                className="lg:hidden cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSideBarNav((prevState) => !prevState);
                }}
              />
            ) : (
              <IoMdMenu
                className="lg:hidden cursor-pointer"
                onClick={() => setActiveSideBarNav((prevState) => !prevState)}
              />
            )}
            <GiShoppingCart className="text-primary" />
            <h1 className="text-2xl font-bold">SimpleCart</h1>
          </div>
          {/* search */}
          <input
            type="search"
            name="search"
            id="search"
            className="w-200  h-10 hidden lg:flex rounded-sm border-2 text-secondary outline-primary px-3 text-lg    border-accents"
            placeholder="Search"
          />
          {/* right icons */}
        </div>
        <div className="flex items-center gap-2 text-2xl">
          <CiSearch className="hidden lg:flex" />
          <NavLink
            to="/sign-in"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : ""
            }>
            <CiUser />
          </NavLink>
          {activeCartSideBar ? (
            <CiShoppingCart className=" cursor-pointer" onClick="" />
          ) : (
            <CiShoppingCart
              className=" cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setActiveCartSideBar((prevState) => !prevState);
              }}
            />
          )}
        </div>
      </div>
      {/* Navbar */}
      <div className="bodyContent hidden lg:flex gap-8 items-center text-secondary">
        {/* departments */}
        <div className="relative w-52 h-10" ref={departmentRef}>
          {/* Select Box */}
          <div
            className="  flex justify-center text-white gap-3 items-center bg-primary  p-3 rounded-md  cursor-pointer"
            onClick={() => setIsDepartmentOpen(!isDepartmentOpen)}>
            <CgMenuGridR className="" />
            <span>{departmentSelected}</span>
          </div>
          {/* Dropdown Options */}
          {isDepartmentOpen && (
            <ul className="absolute w-full bg-white  border-2 border-accents  rounded-md my-2 shadow-md z-10">
              {categories.map((category, index) => (
                <NavLink key={index} to="/products-page">
                  <li
                    className="p-1 hover:bg-accents text-sm text-tertiary rounded-md mx-3 my-2 cursor-pointer transition"
                    onClick={() => {
                      setDepartmentSelected(category.title);
                      setIsDepartmentOpen(false);
                    }}>
                    {category.title}
                  </li>
                </NavLink>
              ))}
            </ul>
          )}
        </div>
        {/* Nav items */}
        <div>
          <ul className=" flex gap-10 items-center cursor-pointer">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : ""
              }>
              Home
            </NavLink>
            {/* shop */}
            <li>
              <OptionMenu navItem={"Products"} navDropDownItems={shops} />
            </li>
            {/* account */}
            <li>
              {" "}
              <OptionMenu navItem={"Account"} navDropDownItems={accounts} />
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive ? "text-primary font-bold" : ""
                }>
                Blog
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
