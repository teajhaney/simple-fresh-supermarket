// Layout.jsx
import { Outlet } from "react-router-dom";
import {
  NavigationBar,
  Announcement,
  Footer,
  SideBarNav,
  CartSideBar,
} from "./export_components";

const Layout = () => (
  <div className="relative">
    <Announcement />
    <NavigationBar />
    <SideBarNav />
    <CartSideBar/>
    <Outlet />
    <Footer />
  </div>
);

export default Layout;
