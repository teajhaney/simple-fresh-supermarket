// CartSideBar.jsx
import React, { useEffect, useRef } from "react";
import { useStateContext } from "../contexts/useStateContext";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { ButtonComponent } from "./export_components";
import { PiTrashThin } from "react-icons/pi";

const CartSideBar = () => {
  const {
    activeCartSideBar,
    setActiveCartSideBar,
    cart,
    updateCartQuantity,
    deleteCart,
  } = useStateContext();
  const cartRef = useRef(null);

  useEffect(() => {
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
  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  )||0;
  return (
    <div
      className={`fixed right-0 top-0 w-96 h-full py-10 px-5 bg-white z-50 transition-transform duration-300 ease-in-out transform ${
        activeCartSideBar ? "translate-x-0" : "translate-x-full"
      } flex flex-col gap-5 ${
        cart.length === 0 && "justify-center items-center"
      } border-l border-accents px-2`}
      ref={cartRef}>
      {cart.length === 0 ? (
        ""
      ) : (
        <h2 className="absolute top-5 let-2 text-2xl font-bold text-center">
          Your Cart
        </h2>
      )}
      <RxCross2
        className="absolute cursor-pointer top-5 right-2"
        onClick={() => setActiveCartSideBar(false)}
      />
      {cart.length === 0 ? (
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
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2">
              <div className="flex gap-2">
                {/* image */}
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded"
                />
                {/* product names and price and delete button */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">{item.productName}</h3>
                  <p className="text-accents">
                    ${item.productPrice.toFixed(2)}
                  </p>
                  {/* buttons */}
                  <div className="flex gap-2 items-center">
                    <div className="flex items-center">
                      <button
                        className="h-8 w-8 text-secondary flex justify-center items-center border border-accents rounded-tl-lg rounded-bl-lg "
                        onClick={() => updateCartQuantity(item.id, -1)}>
                        -
                      </button>
                      <span className="h-8 w-10 text-secondary flex justify-center items-center border border-accents">
                        {item.quantity}
                      </span>
                      <button
                        className="h-8 w-8 text-secondary flex justify-center items-center border border-accents rounded-tr-lg rounded-br-lg  "
                        onClick={() => updateCartQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                    {/*  */}
                    <PiTrashThin
                      className=" text-primary text-2xl"
                      onClick={() => deleteCart(item)}
                    />
                  </div>
                </div>
              </div>
              {/*  */}
              <p className="text-secondary font-bold">
                ${(item.productPrice * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-right">Estimated total</h1>
            <div className="text-xl font-bold text-right">
              Total: ${totalPrice.toFixed(2)}
            </div>
          </div>
          <p className="text-[12px]">
            Taxes, discounts and shipping calculated at checkout
          </p>
          <ButtonComponent
            className={"bg-primary w-full"}
            text={"Checkout"}></ButtonComponent>
          <NavLink to="/cart">
            <p className="text-primary text-center">View cart</p>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default CartSideBar;
