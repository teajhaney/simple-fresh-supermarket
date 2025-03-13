import React, { useEffect, useRef } from "react";
import { useStateContext } from "../contexts/useStateContext";
import { NavLink, useNavigate } from "react-router-dom";
import { ButtonComponent } from "../components/export_components";
import { PiTrashThin } from "react-icons/pi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { productListVariantsXright } from "../constants";

const CartPage = () => {
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
  return (
    <section className="bodyContent ">
      <motion.div
        variants={productListVariantsXright}
        initial="hidden"
        animate="visible"
        exit="hidden">
        <div
          className={`w-full h-full py-5 px-5  z-50  flex flex-col gap-5 ${
            cart.length === 0 && "justify-center items-center"
          } `}>
          {cart.length === 0 ? (
            <div className="flex flex-col justify-center items-center gap-10 ">
              <div className="flex flex-col gap-2 ">
                <h2 className="text-2xl lg:text-5xl font-bold">
                  Your cart is empty
                </h2>
                <ButtonComponent
                  className={
                    "text-sm lg:text3xl font-bold bg-primary self-center"
                  }
                  text={"Continue Shopping"}
                  onClick={() => {
                    navigate("/products-page");
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl lg:text-4xl font-bold">
                  Have an account?
                </h2>
                <h2 className="text-center">
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
            <div className="mt-4 flex flex-col gap-5">
              <div className="flex justify-between items-end">
                <h2 className=" let-2 text-3xl font-semibold text-center">
                  Your Cart
                </h2>
                <NavLink to="/products-page">
                  <p className="fonts-extralight">Continue Shopping</p>
                </NavLink>
              </div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-b-accents pb-3">
                  <div className="flex gap-2">
                    <div className="flex items-center ">
                      <PiTrashThin
                        className=" text-primary text-2xl"
                        onClick={() => deleteCart(item)}
                      />
                      {/* image */}
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded "
                      />
                    </div>
                    {/* product names and price and delete button */}
                    <div className="flex flex-col gap-2">
                      <h3 className="text-sm font-semibold  lg:min-w-50">
                        {item.productName}
                      </h3>
                      <p className="text-secondary font-extralight">
                        ${item.productPrice.toFixed(2)}
                      </p>
                      {/* buttons sm screen*/}
                      <div className="flex items-center lg:hidden">
                        <button
                          className="h-8 w-8 text-secondary flex justify-center items-center border border-accents rounded-tl-lg rounded-bl-lg"
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
                    </div>
                  </div>
                  {/*  button lg screen*/}
                  <div className="hidden lg:flex items-center justify-center  ">
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
                  <p className="text-secondary font-bold min-w-50 flex justify-end">
                    ${(item.productPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="flex flex-col gap-3 items-center lg:items-end">
                <div className="flex gap-5 justify-center items-center mt-20 ">
                  <h1 className="text-xl font-bold text-right">
                    Estimated total
                  </h1>
                  <div className="text-xl  text-right">
                    ${totalPrice.toFixed(2)} USD
                  </div>
                </div>
                <p className="text-[12px] text-center">
                  Taxes, discounts and shipping calculated at checkout
                </p>
                <ButtonComponent
                  className={"bg-primary !wi-96 "}
                  text={"Check out"}></ButtonComponent>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default CartPage;
