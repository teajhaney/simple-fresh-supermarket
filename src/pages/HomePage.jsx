import React from "react";
import {
  ShopNow,
  FeaturedCategories,
  DiscountsComponent,
  PopularProducts,
  DailyBestSells,
  Infos,
} from "../components/export_components";

import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="bodyContent py-5">
      <ShopNow />
      <FeaturedCategories />
      <DiscountsComponent />
      <PopularProducts />
      <DailyBestSells />
      <Infos />
    </section>
  );
};

export default HomePage;
