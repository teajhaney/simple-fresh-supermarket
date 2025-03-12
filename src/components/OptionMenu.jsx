import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const OptionMenu = ({ navItem, navDropDownItems }) => {
  const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); 
const isActive =
  (navItem === "Products" &&
    (location.pathname.startsWith("/products") ||
      location.pathname === "/cart")) ||
  (navItem === "Account" &&
    (location.pathname.startsWith("/sign-in") ||
      location.pathname === "/sign-up"));
  return (
    <div className="relative">
      {/* Select Box */}
      <div
        className={`gap-3 items-center p-3 rounded-md cursor-pointer ${
          isActive ? "text-primary" : ""
        }`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}>
        <span>{navItem}</span>
        {/* Dropdown Options */}
        {isOpen && (
          <ul className="absolute bg-white border-2 border-accents rounded-md my-2 shadow-md z-50 min-w-30">
            {navDropDownItems.map((navDropDownItem) => (
              <li
                key={navDropDownItem.path}
                className="p-1 rounded-md mx-3 my-2 cursor-pointer transition hover:text-primary ">
                <NavLink
                  to={navDropDownItem.path}
                  className={({ isActive }) =>
                    isActive
                      ? "block text-primary "
                      : "block text-tertiary hover:text-primary"
                  }>
                  {navDropDownItem.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OptionMenu;
