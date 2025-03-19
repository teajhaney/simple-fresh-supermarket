import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import axios from "axios";
import { IoConstructSharp } from "react-icons/io5";

const config = {
  reference: new Date().getTime().toString(),
  publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
};
const PaymentPage = () => {
  const location = useLocation();
  //  Use useMemo to prevent unnecessary re-renders
  const cart = useMemo(
    () => location.state?.cart || [],
    [location.state?.cart]
  );

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);

  const handleSuccess = (reference) => {
    return alert("Payment succesful:", reference);
  };

  // you can call this function anything
  const handleCloseAction = () => {
    return alert("Do ypu really wanna close this page?");
  };

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    ...config,
    text: "Pay with paystack",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleCloseAction,
  };

  // Calculate total price
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          "https://v6.exchangerate-api.com/v6/a5150d4ec9b865c31fdb36f2/latest/USD"
        );
        const data = response.data;
        const exchangeRate = data.conversion_rates.NGN;
        const totalPriceUSD = cart.reduce(
          (acc, item) => acc + item.productPrice * item.quantity,
          0
        );
        const totalPriceNGN = totalPriceUSD * exchangeRate;
        setAmount(Math.round(totalPriceNGN * 100)); // Convert to kobo
      } catch (e) {
        console.log("Payment failed:", e);
      }
    };
    fetchExchangeRate();
  }, [cart]);

  const style = {
    input:
      "block w-full px-4 py-2 mb-4 rounded-md border-2 border-accents focus:outline-primary focus:border-primary",
    button:
      "block w-full px-4 py-2 bg-primary text-white rounded-md cursor-pointer",
  };

  return (
    <div className=" bodyContent my-20 flex flex-col items-center">
      <p>Make ypur payment here</p>
      <div className="w-96 mx-auto my-4">
        <input
          type="email"
          placeholder="Email"
          className={style.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="name"
          placeholder="Name"
          className={style.input}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount"
          className={style.input}
          value={`₦ ${(amount / 100).toFixed(2)}`}
          readOnly
        />
        <input
          type="number"
          placeholder="Phone number"
          className={style.input}
          onChange={(e) => setPhone(e.target.value)}
        />
        <PaystackButton {...componentProps} className={style.button} />
      </div>
    </div>
  );
};

export default PaymentPage;
