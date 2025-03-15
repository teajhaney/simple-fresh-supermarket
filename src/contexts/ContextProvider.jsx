import { useState, useCallback } from "react";
import { StateContext } from "./useStateContext";

export const ContextProvider = ({ children }) => {
  const [activeSideBarNav, setActiveSideBarNav] = useState(false);
  const [activeCartSideBar, setActiveCartSideBar] = useState(false);
  const [activeFilterSideBar, setActiveFilterSideBar] = useState(false);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const debouncedSetNotification = useCallback(() => {
    let timeoutId;
    return (newMessage) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setNotification(newMessage);
        setTimeout(() => {
          setNotification(null);
        }, 1000);
      }, 500);
    };
  }, []);

  const setDebouncedNotification = debouncedSetNotification();

  const addTocart = (product, setQuantity = false) => {
    // Validate product data
    if (
      !product ||
      !product.id ||
      !product.productName ||
      isNaN(product.productPrice)
    ) {
      console.error("Invalid product data:", product);
      return;
    }

    const quantityToAdd = product.quantity || 1;
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      // Item exists in cart
      const updatedCart = [...cart];
      if (setQuantity) {
        // Set the quantity to the provided value (used in ProductDetailsPage)
        updatedCart[existingItemIndex].quantity = quantityToAdd;
      } else {
        // Increment the quantity (used in ProductList and PopularProducts)
        updatedCart[existingItemIndex].quantity += quantityToAdd;
      }
      setCart(updatedCart);
    } else {
      // New item, add to cart with validated price
      setCart((prevCart) => [
        ...prevCart,
        {
          ...product,
          productPrice: Number(product.productPrice), // Ensure price is a number
          quantity: quantityToAdd,
        },
      ]);
    }

    setDebouncedNotification(`${product.productName} has been added to cart!`);
  };

  const updateCartQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

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
