import React from "react";

const SalesPeople = ({
  avatar,
  name,
  title,
  project,
  clients,
  earning,
  companyLogo,
  companyName,
  ActiveClient,
  styles,
}) => {
  return (
    <div className="border p-[22px] flex-col rounded-md w-[304px] h-[340px] flex items-center ">
      <div className="people w-full gap-[18px] flex items-center">
        <div className="avtar w-[51px] h-51px] rounded">
          <img src={avatar} className="w-full h-full" alt="" />
        </div>
        <div className="detials">
          <h5 className="text-[18px]  font-[500] leading-[22px] font-['work_sans'] text-[#230B34]">
            {name}
          </h5>
          <h6 className="text-[13px] font-[400] leading-[18px] font-['work_sans']">
            {title}
          </h6>
        </div>
      </div>
      <div className="work_detials mt-5 flex justify-between w-full">
        <div className="flex justify-center items-center flex-col">
          <h4 className="text-[24px] text-[#230B34] font-['work_sans'] font-[600]">
            {project}
          </h4>
          <h6 className="text-[#878790] text-[13px] font-['work_sans']">
            Project
          </h6>
        </div>
        <div className="flex justify-center items-center flex-col">
          <h4 className="text-[24px] text-[#230B34] font-['work_sans'] font-[600]">
            {clients}
          </h4>
          <h6 className="text-[#878790] text-[13px] font-['work_sans']">
            Clients
          </h6>
        </div>
        <div className="flex justify-center items-center flex-col">
          <h4 className="text-[24px] text-[#230B34] font-['work_sans'] font-[600]">
            {earning}
          </h4>
          <h6 className="text-[#878790] text-[13px] font-['work_sans']">
            Earnings
          </h6>
        </div>
      </div>
      <div className="company flex w-full gap-2 mt-5 ">
        <div className="companyLogo w-[41px] h-[41px] rounded-md">
          <img src={companyLogo} alt="" />
        </div>
        <div className="compney_detials">
          <h6 className="text-[#878790] text-[13px] font-['work_sans']">
            Company
          </h6>
          <h6 className="text-[14px] font-[500] font-['work_sans']">
            {companyName}
          </h6>
        </div>
      </div>
      <h5 className="w-full mt-10 font-['work_sans'] font-[500]">
        Active Clients
      </h5>
      <div className="flex w-full mt-3">
        <div className="clients flex w-full">
          <div className="clientAvatar w-[29px] h-[29px] rounded-full overflow-hidden mr-[-10px]">
            <img
              className="w-full h-full rounded-full  border-[2px] border-white"
              src={avatar}
              alt=""
            />
          </div>
          <div className="clientAvatar w-[29px] h-[29px] rounded-full overflow-hidden mr-[-10px]">
            <img
              className="w-full h-full rounded-full  border-[2px] border-white"
              src={avatar}
              alt=""
            />
          </div>
          <div className="clientAvatar w-[29px] h-[29px] rounded-full overflow-hidden mr-[-10px]">
            <img
              className="w-full h-full rounded-full  border-[2px] border-white"
              src={avatar}
              alt=""
            />
          </div>
          <div className="clientAvatar w-[29px] h-[29px] rounded-full overflow-hidden mr-[-10px]">
            <img
              className="w-full h-full rounded-full  border-[2px] border-white"
              src={avatar}
              alt=""
            />
          </div>
          <button className="clientAvatar w-[29px] h-[29px] rounded-full overflow-hidden mr-[-10px] bg-gray-200 flex justify-center items-center text-[12px] hover:bg-gray-300 font-[500] transition-all duration-500 ease-in-out cursor-pointer">
            18+
          </button>
        </div>
        <button className="w-[117px] h-[40px] flex justify-center items-center bg-purple-100 text-purple-600 hover:text-white rounded-md hover:bg-purple-700 transition-all">
          Manage
        </button>
      </div>
    </div>
  );
};

export default SalesPeople;