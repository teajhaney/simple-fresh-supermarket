import React from "react";
import { useRef, useState } from "react";
import { moreInfos } from "../../constants";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Infos = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const screenWidth = scrollRef.current.offsetWidth; // Get the width of one product (default 200px)
      scrollRef.current.scrollBy({
        left: direction === "right" ? screenWidth : -screenWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bodyContents mt-24">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-hidden scroll-smooth no-scrollbar lg:grid lg:grid-cols-4 lg:gap-4 transition-all duration-500 ease-in-out">
        {moreInfos.map((moreInfo, index) => (
          <div
            key={index}
            className=" h-auto w-full  lg:w-full flex-shrink-0 bg-white  flex flex-col gap-2  p-4 rounded-lg   transition-all duration-500 ease-in-out">
            <div className="text-5xl text-primary">{moreInfo.icon}</div>
            <h2 className="font-semibold">{moreInfo.heading}</h2>
            <h2 className=" lg:text-sm text-tertiary/10">
              {moreInfo.description} <span className="text-primary">policy.</span>
            </h2>
          </div>
        ))}
      </div>

      <div className="flex lg:hidden justify-center gap-5 mt-3">
        <IoIosArrowBack
          className="text-secondary text-xl font-extralight cursor-pointer"
          onClick={() => {
            if (currentIndex > 1) {
              setCurrentIndex((prev) => prev - 1);
              handleScroll("left");
            }
          }}
        />
        <h1>
          {currentIndex}/{moreInfos.length}
        </h1>
        <IoIosArrowForward
          className="text-secondary text-xl font-extralight cursor-pointer"
          onClick={() => {
            if (currentIndex < moreInfos.length) {
              setCurrentIndex((prev) => prev + 1);
              handleScroll("right");
            }
          }}
        />
      </div>
    </div>
  );
};

export default Infos;
