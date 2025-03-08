import React from 'react'

const ButtonComponent = ({ text, className }) => {
  return (
    <button
      className={`py-2 px-3 w-fit rounded-md text-white px-*  ${className}`}>
      {text}
    </button>
  );
};

export default ButtonComponent;
