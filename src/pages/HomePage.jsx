import React from "react";
import {
  Announcement,
  NavigationBar,
  SideBarNav,
  ButtonComponent,
  ShopNow,
  FeaturedCategories,
} from "../components/export_components";


import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="bodyContent py-5">
      {/* <Announcement /> */}
      {/* <NavigationBar /> */}
      {/* <SideBarNav /> */}
      <ShopNow />
      <FeaturedCategories/>
    </section>
  );
};

export default HomePage;
