import React from "react";

const SoftWere = ({ svg, name }) => {
  return (
    <div className=" flex h-[30px]">
      <button className="border flex gap-[5px] px-[10px] py-[1px] rounded-2xl bg-gray-100 hover:bg-gray-300 hover:text-white transition-all duration-500 ease-in-out justify-center items-center">
        {svg}
        <span className="text-[12px] font-['work_sans']">{name}</span>
      </button>
    </div>
  );
};

export default SoftWere;
