import React from 'react'

const Announcement = () => {
  return (
    <div className="bg-accents h-7 2xl:mx-auto 2xl:w-[1270px] flex justify-center items-center lg:justify-between">
      <h1 className="font-inter text-[13px] text-tertiary">
        Super Value Deals – Save more with coupons
      </h1>
      <select
        name="country"
        id="country"
        className="hidden lg:flex text-tertiary">
        <option value="English">English</option>
        <option value="French">French</option>
        <option value="germany">germany</option>
      </select>
    </div>
  );
}

export default Announcement
