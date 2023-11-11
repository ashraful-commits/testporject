import React, { useState } from "react";
import { fileDownload } from "../Features/Client/ClientApi";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientState } from "../Features/Client/ClientSlice";
import { Link } from "react-router-dom";
const ProjectFile = ({ svg, name, title, file }) => {
  const [downloadMenu, setDownloadMenu] = useState(false);
  const dispatch = useDispatch();
  const { downloadLink } = useSelector(getAllClientState);
  const handleDownlaod = (file) => {
    setDownloadMenu(!downloadMenu);
    const fileFormat = file?.split(".").pop();
    const encodedUrl = encodeURIComponent(file);
    dispatch(fileDownload({ file: encodedUrl, fileFormat: fileFormat }));
  };
  return (
    <div className="flex gap-[14px] relative h-[57px]  w-[214px] items-center justify-start pl-[20px] mb-[2px] border rounded-md">
      {downloadMenu && (
        <div className="download absolute top-4 right-6">
          <Link target="blank" to={downloadLink}>
            <svg
              fill="#000000"
              width="24"
              height="24"
              viewBox="-5 -5 24 24"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin"
              className="jam jam-download"
            >
              <path d="M8 6.641l1.121-1.12a1 1 0 0 1 1.415 1.413L7.707 9.763a.997.997 0 0 1-1.414 0L3.464 6.934A1 1 0 1 1 4.88 5.52L6 6.641V1a1 1 0 1 1 2 0v5.641zM1 12h12a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2z" />
            </svg>
          </Link>
        </div>
      )}
      <div className="w-[23px] h-[23px] overflow-hidden">{svg}</div>
      <div className="flex flex-col">
        <span className="text-[14px] font-bold font-['work_sans'] leading-[22px]">
          {name}
        </span>
        <span className="text-[11px] font-bold font-['work_sans']">
          {title}
        </span>
      </div>

      <button
        onClick={() => handleDownlaod(file)}
        className=" justify-self-end cursor-pointer absolute right-3"
      >
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
