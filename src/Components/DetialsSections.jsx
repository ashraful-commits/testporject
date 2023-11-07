import React from "react";

const DetialsSections = ({ svg, title, name }) => {
  return (
    <div className="w-full h-[30px] flex justify-start items-center gap-[15px]">
      <div className="w-[32px] h-[27px] flex justify-center items-center bg-blue-300 rounded-[5px] border-[.3px] border-[#2F80ED]">
        {svg}
      </div>
      <div className="w-full flex flex-col justify-center  items-start">
        <span className="text-[12px] leading-[15px] font-[400] text-[#878790] text-['work_sans']">
          {title}
        </span>
        <span className="text-[18px] leading-[16px] font-[500] text-[#230B34] font-['work_sans']">
          {name}
        </span>
      </div>
    </div>
  );
};

export default DetialsSections;
