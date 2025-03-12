import { useState } from "react";
import { StateContext } from "./useStateContext"; // Import from the new file

export const ContextProvider = ({ children }) => {
  const [activeSideBarNav, setActiveSideBarNav] = useState(false);
  const [activeCartSideBar, setActiveCartSideBar] = useState(false);
  const [activeFilterSideBar, setActiveFilterSideBar] = useState(false);
  //cart
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  //add to cart function
  // const addTocart = (product) => {
  //   setCart((prevCart) => [...prevCart, product]);
  //   // Show notification
  //   setNotification(`${product.productName} has been added to cart!`);

  //   // Hide notification after 5 seconds
  //   setTimeout(() => {
  //     setNotification(null);
  //   }, 1000);
  // };

  //add to cartCount
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const addTocart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Increase the quantity instead of adding duplicate
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    // Show notification
    setNotification(`${product.productName} has been added to cart!`);

    // Hide notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };
  // Function to update quantity
  const updateCartQuantity = (id, amount) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + amount }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove item if quantity is 0
    );
  };
  //delete acrt
  const deleteCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };
  return (
    <StateContext.Provider
      value={{
        activeSideBarNav,
        setActiveSideBarNav,
        activeCartSideBar,
        setActiveCartSideBar,
        activeFilterSideBar,
        setActiveFilterSideBar,
        //cart
        cart,
        addTocart,
        deleteCart,
        notification,
        updateCartQuantity,
        cartCount,
      }}>
      {children}
    </StateContext.Provider>
  );
};
