const ProjectDetails = ({ svg, title, number, styles }) => {
  return (
    <div className="border rounded-md gap-[10px] h-[97px] w-[240px] flex items-center justify-center">
      <div className="w-[42px] h-[42px] rounded-full bg-gray-200 shrink-0 flex justify-center items-center ml-4">
        {svg}
      </div>
      <div className="w-full h-full flex gap-2 flex-col justify-center">
        <p className={` leading-[5px]  text-[#878790]  font-[400]`}>{title}</p>
        <p
          className={`text-[24px] ${styles} leading-[32px] flex items-center gap-2 font-[600]`}
        >
          {title === "Commission Due" && "$"}
          {title === "Payment Received" && "$"}
          {number}
          {title === "Payment Received" && (
            <span className="text-[12px] text-gray-400 font-[400] font-['work_sans']">
              This Week
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProjectDetails;
