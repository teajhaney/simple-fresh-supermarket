import React from "react";
import { useStateContext } from "../contexts/useStateContext";
import { useEffect, useRef } from "react";
const SideBarNav = () => {
  const { activeSideBarNav, setActiveSideBarNav } =
    useStateContext();
 const sideBarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
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
  }, [activeSideBarNav, setActiveSideBarNav, sideBarRef]);
  return (
    <>
      {activeSideBarNav && (
        <div
          className="bg-white fixed w-72 min-h-screen z-50 lg:hidden border-r-2 border-r-accents"
          ref={sideBarRef}>
          <h1>wjswbwuw</h1>
        </div>
      )}
    </>
  );
};

export default SideBarNav;
