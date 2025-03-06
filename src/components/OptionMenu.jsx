import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const OptionMenu = ({ navItem, navDropDownItems }) => {
  const [isOpen, setIsOpen] = useState(false);
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
    <div>
      {/* Select Box */}
      <div
        className="relative  gap-3 items-center  p-3 rounded-md  cursor-pointer"
        ref={dropdownRef}
        onClick={() => setIsOpen(!isOpen)}>
        <span>{navItem}</span>
      </div>
      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute  bg-white border-2 border-accents  rounded-md my-2 shadow-md z-10">
          {navDropDownItems.map((navDropDownItem) => (
            <Link
              key={navDropDownItem.path}
              to={navDropDownItem.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : ""
              }>
              <li className="p-1 hover:bg-accents text-sm text-tertiary rounded-md mx-3 my-2 cursor-pointer transition">
                {navDropDownItem.title}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OptionMenu;
