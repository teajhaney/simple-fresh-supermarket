import React from 'react'

const ButtonComponent = ({ text, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded-md w-fit text-white cursor-pointer px-*  ${className}`}>
      {text}
    </button>
  );
};

export default ButtonComponent;
