// CartSideBar.jsx
import React, { useEffect, useRef } from "react";
import { useStateContext } from "../contexts/useStateContext";
import { RxCross2 } from "react-icons/rx";

const CartSideBar = () => {
  const { activeCartSideBar, setActiveCartSideBar } = useStateContext();
  const cartRef = useRef(null);

  useEffect(() => {
    console.log("CartSideBar activeCartSideBar:", activeCartSideBar); // Debug
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setActiveCartSideBar(false);
      }
    };

    if (activeCartSideBar) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeCartSideBar, setActiveCartSideBar]);

  return (
    <div
      className={`fixed right-0 top-0 w-72 h-full bg-white z-50 transition-transform duration-300 ease-in-out transform ${
        activeCartSideBar ? "translate-x-0" : "translate-x-full"
      }`}
      ref={cartRef}>
      <div className="flex justify-between items-center p-4 border-b-2 border-accents">
        <h2 className="text-xl font-bold">Cart</h2>
        <RxCross2
          className="cursor-pointer"
          onClick={() => setActiveCartSideBar(false)}
        />
      </div>
      <div className="p-4">
        <p>Cart items here...</p>
      </div>
    </div>
  );
};

export default CartSideBar;
