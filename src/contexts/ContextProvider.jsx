import { useState, useCallback } from "react";
import { StateContext } from "./useStateContext"; // Import from the new file

export const ContextProvider = ({ children }) => {
  const [activeSideBarNav, setActiveSideBarNav] = useState(false);
  const [activeCartSideBar, setActiveCartSideBar] = useState(false);
  const [activeFilterSideBar, setActiveFilterSideBar] = useState(false);
  //cart
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  //cartCount
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  // Debounced setNotification function
  const debouncedSetNotification = useCallback(() => {
    let timeoutId;
    return (newMessage) => {
      clearTimeout(timeoutId); // Clear any existing timer
      timeoutId = setTimeout(() => {
        setNotification(newMessage);
        setTimeout(() => {
          setNotification(null); // Clear notification after 5 seconds
        }, 1000);
      }, 500); // Debounce delay of 500ms
    };
  }, []); // Empty dependency array

  // Initialize the debounced function
  const setDebouncedNotification = debouncedSetNotification();
  //add to cart fn
  const addTocart = (product) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      // Item exists, update quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity = product.quantity;
      setCart(updatedCart);
    } else {
      // New item, add to cart
      setCart((prevCart) => [
        ...prevCart,
        {
          ...product,
          quantity: product.quantity || 1,
        },
      ]);
    }

    // Show notification
    // Use debounced notification
    setDebouncedNotification(`${product.productName} has been added to cart!`);

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
