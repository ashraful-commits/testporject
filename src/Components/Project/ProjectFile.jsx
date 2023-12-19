import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getAllProjectState } from "../../Features/Project/ProjectSlice";
import { deleteFiles } from "../../Features/Project/ProjectApi";
import LinkIcon from "../../Icons/LinkIcon";
import DeleteIcon from "../../Icons/DeleteIcon";
import DownloadIcon from "../../Icons/DownloadIcon";

const ProjectFile = ({ svg, name, title, file }) => {
  const [downloadMenu, setDownloadMenu] = useState(false);
  const dispatch = useDispatch();
  const { downloadLink } = useSelector(getAllProjectState);
  const handleDownlaod = (file) => {
    setDownloadMenu(!downloadMenu);
  };
  //=============================================TODO:deleteFile
  const handleDeleteFile = (file) => {
    dispatch(deleteFiles(file));
  };
  return (
    <div className="flex transition-all ease-in-out duration-500 hover:scale-105 gap-[14px] relative h-[57px]  w-[214px] items-center justify-start pl-[20px] mb-[2px] border rounded-md">
      {downloadMenu && (
        <div className="absolute download top-4 right-6">
          <Link to={file} target="blank">
            <LinkIcon />
          </Link>
          <button onClick={() => handleDeleteFile(file)}>
            <DeleteIcon />
          </button>
        </div>
      )}
      <div className="w-[23px] h-[23px] overflow-hidden">{svg}</div>
      <div className="flex flex-col">
        <span className="text-md  font-bold font-['work_sans'] leading-[22px]">
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
        className="absolute cursor-pointer justify-self-end right-3"
      >
        <DownloadIcon />
      </button>
    </div>
  );
};

export default ProjectFile;
