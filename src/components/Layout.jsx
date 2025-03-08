// Layout.jsx
import { Outlet } from "react-router-dom";
import {
  NavigationBar,
  Announcement,
  Footer,
  SideBarNav,
  CartSideBar,
} from "./export_components";

import { useStateContext } from "../contexts/useStateContext";

const Layout = () => {
  const { activeCartSideBar, setActiveCartSideBar } = useStateContext();

  // Function to close both sidebars when clicking the overlay
  const closeSidebars = () => {
    setActiveCartSideBar(false);
  };
  return (
    <div className="relative">
      <Announcement />
      <NavigationBar />
      <CartSideBar />
      <SideBarNav />

      <Outlet />
      <Footer />
      {activeCartSideBar && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-primary/5 opacity-50 z-40"
          onClick={closeSidebars} // Close when clicking overlay
        ></div>
      )}
    </div>
  );
};

export default Layout;
