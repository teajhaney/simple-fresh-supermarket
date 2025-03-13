import React from "react";
import { useStateContext } from "../contexts/useStateContext";
import { ButtonComponent } from "../components/export_components";
import { useNavigate, NavLink } from "react-router-dom";

const CheckoutPage = () => {
  const { cart } = useStateContext();
  const navigate = useNavigate();
  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );
  const handleProductClick = (product) => {
    navigate("/products-details-page", { state: { product } });
  };
  return (
    <div className="bodyContent p-5 ">
      {cart.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <ButtonComponent
              className={"text-sm font-bold bg-primary self-center"}
              text={"Continue Shopping"}
              onClick={() => {
                navigate("/products-page");
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Have an account?</h2>
            <h2>
              <NavLink to="/sign-in" className="text-primary">
                Log in
              </NavLink>{" "}
              to check out faster.
            </h2>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-5">Checkout</h1>

          {/* Cart Items Summary */}
          <div className="space-y-5">
            {cart.map((item) => (
              <div
                onClick={()=>handleProductClick(item)}
                key={item.id}
                className="flex items-center justify-between gap-4 border-b border-b-accents pb-3 cursor-pointer">
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 border-2 border-accents object-cover rounded-lg">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover rounded"
                    />
                    <div className="absolute rounded-full h-6 w-6 -top-2 -right-2.5 bg-secondary flex items-center justify-center">
                      <p className="text-white">{item.quantity}</p>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold">
                      {item.productName}
                    </h2>

                    <p className="text-primary font-bold">
                      ${item.productPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="text-primary font-bold">
                  ${(item.productPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="mt-5 text-lg font-bold flex flex-col justify-between items-end">
            <p>Total: ${totalPrice.toFixed(2)}</p>
            {/* Payment Button */}
            <ButtonComponent
              className="bg-primary  mt-5 "
              text="Complete order"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
