import React from "react";
import { blogs, blogFirstImage } from "./../constants";
import { GiShoppingCart } from "react-icons/gi";

const BlogPage = () => {
  return (
    <section className="bodyContent py-10 flex flex-col gap-5">
      <h1 className="text-secondary font-semibold text-xl lg:text-5xl ">
        Simplecart Blog
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        <div
          className="relative lg:col-span-4 rounded-lg w-full bg-cover h-72 md:h-96 bg-no-repeat p-5 "
          style={{ backgroundImage: `url(${blogFirstImage})` }}>
          <div className="absolute bottom-10 flex gap-2 items-center">
            <GiShoppingCart className="text-primary font-bold text-3xl" />
            <h1 className="text-3xl font-bold">SimpleCart</h1>
          </div>
        </div>
        <div className="md:self-center lg:col-span-2 group flex flex-col gap-3">
          <h1 className="text-tertiary font-bold text-xl md:text-3xl group-hover:text-primary duration-500 transition-all ease-in-out">
            Garlic Cream Bucatini with Peas and Asparagus
          </h1>
          <p className="text-tertiary text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            dictum, ipsum ac pretium consequat, diam dui malesuada nulla,
            acsemper arcu dolor at dolor. Donec imperdiet urna eget consequat
            accumsan. Morbi...
          </p>
          <div className="flex justify-between">
            <h1 className="text-tertiary text-[13px]">12 August 2024</h1>
            <h1 className="text-tertiary font-semibold text-[12px]">
              Authur<span className="text-sm font-normal"> : Jane Smith</span>
            </h1>
          </div>
        </div>
      </div>
      <div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map(
          (
            { image, heading, subHeading, date, authur, description },
            index
          ) => (
            <div key={index} className="flex flex-col group gap-3">
              <div className="h-48 w-full rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={heading}
                  className="h-full w-full object-cover rounded-lg group-hover:scale-105 duration-500 transition-all ease-in-out"
                />
              </div>
              <h1 className="text-primary">{subHeading}</h1>
              <h1 className="text-tertiary font-bold text-sm group-hover:text-primary duration-500 transition-all ease-in-out">
                {heading}
              </h1>
              <p className="text-tertiary text-sm">{description}</p>
              <div className="flex justify-between">
                <h1 className="text-tertiary text-[13px]">{date}</h1>
                <h1 className="text-tertiary font-semibold text-[12px]">
                  Authur<span className="text-sm font-normal"> : {authur}</span>
                </h1>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default BlogPage;
