import React, { useState } from "react";

const TabBar = ({ productName }) => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="w-full  mt-8">
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-300">
        <button
          className={`w-fit p-3 text-center ${
            activeTab === 1
              ? "border-b-2 border-primary text-primary font-bold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(1)}>
          Description
        </button>
        <button
          className={`w-fit p-3 text-center ${
            activeTab === 2
              ? "border-b-2 border-primary text-primary font-bold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(2)}>
          More Information
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-5 text-tertiary text-sm ">
        {activeTab === 1 ? (
          <div>
            <p>
              <span>{productName}</span> is lorem ipsum dolor sit amet consectetur
              adipisicing elit. Aspernatur sed quaerat ipsa repellat tempora,
              perspiciatis, enim consequuntur minus aut illo modi alias nostrum
              rem quidem ab necessitatibus temporibus? Minima, incidunt? Lorem,
              ipsum dolor sit amet consectetur adipisicing elit. Sequi laborum
              sapiente aliquam nemo fuga sit illo nesciunt saepe quibusdam
              similique! Minima sit consequuntur aliquid voluptate id autem
              eaque ipsa sapiente?Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Explicabo, voluptatibus reiciendis iusto magni,
              tenetur eaque adipisci placeat assumenda corporis pariatur
              consectetur nesciunt sint, quis natus quod eum at eius corrupti?
            </p>
          </div>
        ) : (
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur sed quaerat ipsa repellat tempora, perspiciatis, enim
              consequuntur minus aut illo modi alias nostrum rem quidem ab
              necessitatibus temporibus? Minima, incidunt? Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Sequi laborum sapiente
              aliquam nemo fuga sit illo nesciunt saepe quibusdam similique!
              Minima sit consequuntur aliquid voluptate id autem eaque ipsa
              sapiente?Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo, voluptatibus reiciendis iusto magni, tenetur eaque
              adipisci placeat assumenda corporis pariatur consectetur nesciunt
              sint, quis natus quod eum at eius corrupti?
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabBar;
