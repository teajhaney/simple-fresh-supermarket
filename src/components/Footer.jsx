import React from "react";
import {
  footerCategories,
  getToKnowUs,
  forConsumers,
  becomeShoppers,
  programs,
  svgs,
} from "../constants";
import { DownloadButtons } from "./export_components";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";

///////
const Footer = () => {
  return (
    <footer className=" bg-accents h-fit  py-14 ">
      <div className="bodyContent flex flex-col gap-5">
        {/* First footer */}
        <div className="flex flex-col gap-5 md:grid md:grid-cols-3 lg:grid lg:grid-cols-5 transition-all duration-500 ease-in-out">
          {/* categories */}
          <div className="flex flex-col gap-3">
            <h1 className="text-secondary font-semibold text-lg">Categories</h1>
            <div className="flex flex-col gap-2">
              {footerCategories.map((footerCategory, index) => (
                <NavLink key={index} to="/products-page">
                  <p className="text-sm text-tertiary">{footerCategory}</p>
                </NavLink>
              ))}
            </div>
          </div>
          {/* get to know us */}
          <div className="flex flex-col gap-3">
            <h1 className="text-secondary font-semibold text-lg">
              Get to know us
            </h1>
            <div className="flex flex-col gap-2">
              {getToKnowUs.map((getToKnowUs, index) => (
                <p key={index} className="text-sm text-tertiary">
                  {getToKnowUs}
                </p>
              ))}
            </div>
          </div>
          {/*For consumers */}
          <div className="flex flex-col gap-3">
            <h1 className="text-secondary font-semibold text-lg">
              For consumers
            </h1>
            <div className="flex flex-col gap-2">
              {forConsumers.map((forConsumer, index) => (
                <p key={index} className="text-sm text-tertiary">
                  {forConsumer}
                </p>
              ))}
            </div>
          </div>
          {/*shopper */}
          <div className="flex flex-col gap-3">
            <h1 className="text-secondary font-semibold text-lg">
              Become a Shooper
            </h1>
            <div className="flex flex-col gap-2">
              {becomeShoppers.map((becomeShopper, index) => (
                <p key={index} className="text-sm text-tertiary">
                  {becomeShopper}
                </p>
              ))}
            </div>
          </div>
          {/*programs */}
          <div className="flex flex-col gap-3">
            <h1 className="text-secondary font-semibold text-lg">
              SimpleCart programs
            </h1>
            <div className="flex flex-col gap-2">
              {programs.map((program, index) => (
                <p key={index} className="text-sm text-tertiary">
                  {program}
                </p>
              ))}
            </div>
          </div>
        </div>
        <hr />
        {/* Second footer */}
        <div className="flex flex-col gap-5 lg:flex-row lg:justify-between transition-all duration-500 ease-in-out">
          {/* payment partners */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 transition-all duration-500 ease-in-out">
            <h1 className="text-secondary font-light ">Payment Partners</h1>
            <div className="flex gap-2">
              {svgs.map((svg, index) => (
                <div
                  key={index}
                  className="h-6 w-10 bg-white rounded-sm gap-2 flex justify-center items-center object-center">
                  <img src={svg} alt="payment options" />
                </div>
              ))}
            </div>
          </div>
          {/* download */}
          <div className="flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500 ease-in-out">
            <h1 className="text-secondary font-light ">
              Get deliveries with SimpleCart
            </h1>
            {/* downlodn button */}
            <div className="flex gap-3">
              <DownloadButtons
                svg={"/apple.svg"}
                alt={"apple logo"}
                text={"Availble on the"}
                availableWhere={"App Store"}
                className={"text-lg"}
              />
              <DownloadButtons
                svg={"/google-play.svg"}
                alt={"google logo"}
                text={"GET IT ON"}
                availableWhere={"Google Play"}
              />
            </div>
          </div>
        </div>
        <hr />
        {/* Third footer */}
        <div className="flex flex-col gap-5 md:flex-row md:justify-between transition-all duration-500 ease-in-out">
          <p className="text-sm text-tertiary">
            Copyright 2025 ©freshcart. All rights reserved.Powered by simplecart
          </p>
          <div className="flex gap-3 items-center">
            <p className="text-sm text-tertiary">Follow us on</p>
            <div className="flex gap-2">
              <div className="h-8 w-8 border border-secondary rounded-lg flex items-center justify-center">
                <FaFacebook />
              </div>
              <div className="h-8 w-8 border border-secondary rounded-lg flex items-center justify-center">
                <FaInstagram />
              </div>
              <div className="h-8 w-8 border border-tertiary rounded-lg flex items-center justify-center">
                <FaTwitter />
              </div>
            </div>
          </div>
        </div>
        <a className="text-sm text-tertiary text-center hover:underline hover:decoration-primary hover:text-primary" href="https://github.com/teajhaney" target="_blank" rel="noreferrer"> Github @teajhaney</a>
      </div>
    </footer>
  );
};

export default Footer;
