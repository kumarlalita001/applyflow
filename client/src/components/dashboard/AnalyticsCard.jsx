import React from "react";

const AnalyticsCard = ({ items }) => {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {items.map((item, index) => (
        <div
          key={index}
          className="   shadow-lg rounded-lg p-6 relative flex gap-4  items-start r lg:items-start"
        >
          <div className="w-full h-full items-center flex flex-1  ">
           {item.icon}
          </div>

          <div className=" w-full">
            <p className=" text-[14px] sm:text-[15px] tracking-wide">
              {item.name}
            </p>
            <h1 className=" text-[24px] mx-4  sm:text-[28px] font-bold tracking-wider">
              {item.numberOfItems}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsCard;
