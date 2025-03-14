import React, { useEffect, useRef } from "react";
import { useStateContext } from "../contexts/useStateContext";
import { RxCross2 } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
  const totalPrice =
    cart.reduce((acc, item) => acc + item.productPrice * item.quantity, 0) || 0;
  ///handle clickj
  const handleProductClick = (product) => {
    navigate("/products-details-page", { state: { product } });
  };
  return (
    <div
      className={`fixed right-0 top-0 w-96 h-full py-10 px-5 bg-white z-50 transition-transform duration-300 ease-in-out transform ${
        activeCartSideBar ? "translate-x-0" : "translate-x-full"
      } flex flex-col gap-10 pt-20 ${
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
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <ButtonComponent
              className={"text-sm font-bold bg-primary self-center"}
              text={"Continue Shopping"}
              onClick={() => {
                navigate("/products-page");
                setActiveCartSideBar((prev) => !prev);
              }}
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
        <div className="flex flex-col h-full">
          <div className="mt-4 flex flex-col gap-5 overflow-y-auto custom-scrollbar-hidden flex-1">
            <hr className="border-t border-accents" />
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex pb-3 justify-between items-center border-b border-b-accents ">
                <div className="flex gap-2">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded cursor-pointer"
                    onClick={() => {
                      handleProductClick(item);
                      setActiveCartSideBar(false);
                    }}
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold">
                      {item.productName}
                    </h3>
                    <p className="text-secondary font-extralight">
                      ${item.productPrice.toFixed(2)}
                    </p>
                    <div className="flex gap-2 items-center">
                      <div className="flex items-center">
                        <button
                          className="h-8 w-8 text-secondary flex justify-center items-center border border-accents cursor-pointer rounded-tl-lg rounded-bl-lg"
                          onClick={() => updateCartQuantity(item.id, -1)}>
                          -
                        </button>
                        <span className="h-8 w-10 text-secondary flex justify-center items-center border border-accents">
                          {item.quantity}
                        </span>
                        <button
                          className="h-8 w-8 text-secondary flex justify-center items-center border border-accents cursor-pointer rounded-tr-lg rounded-br-lg"
                          onClick={() => updateCartQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>
                      <PiTrashThin
                        className="text-primary text-2xl"
                        onClick={() => deleteCart(item)}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-secondary font-bold">
                  ${(item.productPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 mt-auto">
            <div className="flex justify-between items-center mt-5">
              <h1 className="text-xl font-bold text-right">Estimated total</h1>
              <div className="text-xl font-bold text-right">
                ${totalPrice.toFixed(2)}
              </div>
            </div>
            <p className="text-[12px]">
              Taxes, discounts and shipping calculated at checkout
            </p>
            <NavLink
              to="/checkout-page"
              onClick={() => setActiveCartSideBar((prev) => !prev)}>
              <ButtonComponent
                className={"bg-primary w-full"}
                text={"Checkout"}></ButtonComponent>
            </NavLink>
            <NavLink
              to="/cart"
              onClick={() => setActiveCartSideBar((prev) => !prev)}>
              <p className="text-primary text-center">View cart</p>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSideBar;
