import React from "react";

const Footer = () => {
  return (
    <footer className="bg-accents h-fit ">
      <div className="bodyContent flex flex-col gap-5">
        {/* First footer */}
        <div className="flex flex-col gap-5 md:grid md:grid-cols-3 lg:grid lg:grid-cols-5"></div>
        {/* Second footer */}
        <div className="flex flex-col gap-5 lg:flex-row lg:justify-between"></div>
        {/* Third footer */}
        <div className="flex flex-col gap-5 lg:flex-row lg:justify-between"></div>
      </div>
    </footer>
  );
};

export default Footer;
