import React, { useState } from "react";
import { fileDownloadFunc } from "../Features/Client/ClientApi";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientState } from "../Features/Client/ClientSlice";
import { Link } from "react-router-dom";

import fileDownload from "js-file-download";

const ProjectFile = ({ svg, name, title, file }) => {
  const [downloadMenu, setDownloadMenu] = useState(false);
  const dispatch = useDispatch();
  const { downloadLink } = useSelector(getAllClientState);
  const handleDownlaod = (file) => {
    setDownloadMenu(!downloadMenu);
  };
  // const handleFileDownload = () => {
  //   const fileFormat = file?.split(".").pop();
  //   // const encodedUrl = encodeURIComponent(file);
  //   console.log(file);
  //   // fileDownload(file, `filename.${fileFormat}`);
  //   // window.open(file);
  //   // dispatch(
  //   //   fileDownloadFunc({ file: encodedUrl, fileFormat: fileFormat })
  //   // ).then((res) => {
  //   //   fileDownload(file, `filename.${fileFormat}`);
  //   // });
  //   // Replace 'public-id' with the actual public ID of the image
  //   const imageUrl = file;

  //   // Create an anchor element
  //   const downloadLink = document.createElement("a");
  //   downloadLink.href = imageUrl;

  //   // Set the download attribute with the desired filename
  //   downloadLink.download = `your-image-filename.jpg.${fileFormat}`;

  //   // Append the anchor to the document body
  //   document.body.appendChild(downloadLink);

  //   // Trigger a click on the anchor to initiate the download
  //   downloadLink.click();

  //   // Remove the anchor from the document body
  //   document.body.removeChild(downloadLink);
  // };
  return (
    <div className="flex transition-all ease-in-out duration-500 hover:scale-105 gap-[14px] relative h-[57px]  w-[214px] items-center justify-start pl-[20px] mb-[2px] border rounded-md">
      {downloadMenu && (
        <div className="download absolute top-4 right-6">
          <Link to={file} target="blank">
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
          {/* <button onClick={() => handleFileDownload(file)}>
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
          </button> */}
        </div>
      )}
      <div className="w-[23px] h-[23px] overflow-hidden">{svg}</div>
      <div className="flex flex-col">
        <span className="text-[14px] font-bold font-['work_sans'] leading-[22px]">
          {name}
        </span>
        <Link
          target="blank"
          to={file}
          className="text-[11px] font-bold font-['work_sans']"
        >
          {`${name} Link`}
        </Link>
      </div>
      {/* //===============================================download button  */}
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
