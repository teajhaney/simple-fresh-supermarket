import React from "react";
import { useStateContext } from "../contexts/useStateContext";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
const SideBarNav = () => {
  const { activeSideBarNav, setActiveSideBarNav } = useStateContext();
  const sideBarRef = useRef(null);
  // Close sidebar when screen size is lg or larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setActiveSideBarNav(false); // Force sidebar to be inactive on large screens
      }
    };

    handleResize(); // Run on mount to check initial screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setActiveSideBarNav]);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (activeSideBarNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeSideBarNav]);
  ///////
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close sidebar if cart is not active and click is outside sidebar
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
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

  ///height
  const viewHeight = parent.outerHeight;
  return (
    <div
      className={`fixed left-0 w-72 z-30 h-200 bg-white lg:hidden border-r-2 border-accents flex flex-col  transition-transform duration-300 ease-in-out transform ${
        activeSideBarNav ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ height: viewHeight }}
      ref={sideBarRef}>
      {/* //sidebar links */}
      <div className="flex flex-col  gap-3 p-5 text-secondary">
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
      {/* buttom */}
      <div className="  p-5 flex flex-col gap-3  text-secondary bg-accents  ">
        <NavLink
          to="/sign-in"
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
  );
};

export default SideBarNav;
