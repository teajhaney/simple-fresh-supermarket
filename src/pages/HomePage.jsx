import React from "react";
import {
  Announcement,
  NavigationBar,
  SideBarNav,
  ButtonComponent,
  ShopNow,
  FeaturedCategories,
  DiscountsComponent,
  PopularProducts,
  DailyBestSells,
} from "../components/export_components";


import { NavLink } from "react-router-dom";


const HomePage = () => {
  return (
    <section className="bodyContent py-5">
      {/* <Announcement /> */}
      {/* <NavigationBar /> */}
      {/* <SideBarNav /> */}
      <ShopNow />
      <FeaturedCategories />
      <DiscountsComponent />
      <PopularProducts />
      <DailyBestSells />
    </section>
  );
};

export default HomePage;
