// CartSideBar.jsx
import React, { useEffect, useRef } from "react";
import { useStateContext } from "../contexts/useStateContext";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { ButtonComponent } from "./export_components";

const CartSideBar = () => {
  const { activeCartSideBar, setActiveCartSideBar } = useStateContext();
  const cartRef = useRef(null);
  const sideBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        !sideBarRef.current.contains(event.target)
      ) {
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
      className={`fixed right-0 top-0 w-72 h-full py-10 bg-white z-50 transition-transform duration-300 ease-in-out transform ${
        activeCartSideBar ? "translate-x-0" : "translate-x-full"
      } flex flex-col justify-center items-center border-l border-accents px-2`}
      ref={cartRef}>
      <RxCross2
        className="absolute cursor-pointer top-5 right-2"
        onClick={() => setActiveCartSideBar(false)}
      />

      <div className="flex flex-col justify-center items-center gap-10 ">
        <div className="flex flex-col gap-2 ">
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <ButtonComponent
            className={"text-sm font-bold bg-primary self-center"}
            text={"Continue Shopping"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Have an account?</h2>
          <h2>
            <NavLink
              to="/sign-in"
              onClick={() => setActiveCartSideBar(false)}
              className="text-primary">
              Log in
            </NavLink>{" "}
            to check out faster.
          </h2>
          
        </div>
      </div>
    </div>
  );
};

export default CartSideBar;
