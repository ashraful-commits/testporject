import React from "react";

const ProjectFile = ({ svg, name, title }) => {
  return (
    <div className="flex gap-[14px] relative h-[57px] w-[214px] items-center justify-start pl-[20px] mb-[2px] border rounded-md">
      <div className="w-[23px] h-[23px] overflow-hidden">{svg}</div>
      <div className="flex flex-col">
        <span className="text-[14px] font-bold font-['work_sans'] leading-[22px]">
          {name}
        </span>
        <span className="text-[11px] font-bold font-['work_sans']">
          {title}
        </span>
      </div>
      <button className=" justify-self-end absolute right-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3"
          height="17"
          viewBox="0 0 3 17"
          fill="none"
        >
          <circle
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="rotate(90 1.5 1.5)"
            fill="#D9D9D9"
          />
          <circle
            cx="1.5"
            cy="8.5"
            r="1.5"
            transform="rotate(90 1.5 8.5)"
            fill="#D9D9D9"
          />
          <circle
            cx="1.5"
            cy="15.5"
            r="1.5"
            transform="rotate(90 1.5 15.5)"
            fill="#D9D9D9"
          />
        </svg>
      </button>
    </div>
  );
};

export default ProjectFile;
