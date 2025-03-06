import React from "react";
import { useStateContext } from "../contexts/useStateContext";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
const SideBarNav = () => {
  const { activeSideBarNav, setActiveSideBarNav } = useStateContext();
  const sideBarRef = useRef(null);
    const cartRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target) &&
        !cartRef.current.contains(event.target)
      ) {
        setActiveSideBarNav(false);
      }
    };

    if (activeSideBarNav) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeSideBarNav, setActiveSideBarNav]);
  return (
    <>
      {activeSideBarNav && (
        <div
          className={`fixed left-0 w-72 h-full bg-white z-50 lg:hidden border-r-2 border-accents flex flex-col overflow-hidden transition-transform duration-300 ease-in-out transform ${
            activeSideBarNav ? "translate-x-0" : "-translate-x-full"
          }`}
          ref={sideBarRef}>
          <div className="flex flex-col  gap-3 mt-5 mx-5 text-secondary">
            {/* Logo */}
            {/* <div className="flex items-center gap-5 mb-5">
              <GiShoppingCart className="text-primary text-4xl" />
              <h1 className="text-2xl font-bold">SimpleCart</h1>
            </div> */}
            {/* //sidebar links */}
            <NavLink
              to="/"
              onClick={() => setActiveSideBarNav((prevState) => !prevState)}
              className={({ isActive }) =>
                isActive ? "bg-primary font-bold  rounded-lg" : ""
              }>
              <div className="w-full  px-2 py-3  ">Home</div>
            </NavLink>
            <NavLink
              to="/products-page"
              onClick={() => setActiveSideBarNav((prevState) => !prevState)}
              className={({ isActive }) =>
                isActive ? "bg-primary font-bold  rounded-lg" : ""
              }>
              <div className="w-full  px-2 py-3  ">Products</div>
            </NavLink>
            <NavLink
              to="/cart"
              onClick={() => setActiveSideBarNav((prevState) => !prevState)}
              className={({ isActive }) =>
                isActive ? "bg-primary font-bold  rounded-lg" : ""
              }>
              <div className="w-full  px-2 py-3  ">Cart</div>
            </NavLink>
            <NavLink
              to="/blog"
              onClick={() => setActiveSideBarNav((prevState) => !prevState)}
              className={({ isActive }) =>
                isActive ? "bg-primary font-bold  rounded-lg" : ""
              }>
              <div className="w-full  px-2 py-3  ">Blog</div>
            </NavLink>
          </div>
          <div className="flex flex-col gap-5 px-5 py-5 text-secondary  bg-accents">
            <NavLink
              to="/Sign-in"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold  rounded-lg" : ""
              }
              onClick={() => setActiveSideBarNav((prevState) => !prevState)}>
              <div className="flex gap-3 items-center text-md">
                <CiUser />

                <h1>Log in</h1>
              </div>
            </NavLink>
            <div>
              {" "}
              <select
                name="country"
                id="country"
                className=" lg:flex text-tertiary cursor-pointer outline-primary">
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="germany">German</option>
              </select>
            </div>
            <div className="flex gap-5">
              <FaTwitter />
              <FaFacebook />
              <FaInstagram />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBarNav;
