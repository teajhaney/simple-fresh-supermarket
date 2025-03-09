import React from 'react'

const DownloadButtons = ({ svg, alt, text, availableWhere , classsName}) => {
  return (
    <div className="bg-secondary h-10 w-36 rounded-sm py-1 px-2 flex items-center">
      <div className="flex gap-2  items-center">
        <img className="object-contain h-7 w-7" src={svg} alt={alt} />
        <div className="flex flex-col text-white">
          <p className="text-[10px]">{text}</p>
          <p className={`${classsName}`}>{availableWhere}</p>
        </div>
      </div>
    </div>
  );
};

export default DownloadButtons
