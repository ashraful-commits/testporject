import { useEffect, useState } from "react";
import useFormHook from "../../Hooks/useFormHook";
import FormInput from "../FormInput/FormInput";
import FilePreview from "../../Utils/FilePreview";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClientState,
  setMessageEmpty,
} from "./../../Features/Client/ClientSlice";
import { Toastify } from "../../Utils/Tostify";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpin";

import { LoggedInSeller } from "../../Features/Seller/SellerApi";
import { motion } from "framer-motion";
import { getAllCompanyState } from "../../Features/Company/CompanySlice";
import {
  createProject,
  getAllProject,
  updateProject,
} from "../../Features/Project/ProjectApi";
import { getAllClient } from "../../Features/Client/ClientApi";
import { getAllProjectState } from "../../Features/Project/ProjectSlice";
import { getAllCompany } from "../../Features/Company/CompanyApi";

const Model = ({ setClient, singleData, setForm, title }) => {
  //=============================  TODO:form hook
  const { input, setInput, handleInputChange } = useFormHook({
    clientId: "",
    projectName: "",
    projectType: "",
    budget: "",
    amount: "",
    projectDesc: "",
    timeFrame: "",
    projectSource: "",
    date: "",
    document: "",
    clientAvatar: "",
    company: "",
    password: "",
    commissionRate: "",
  });
  console.log(singleData);
  console.log(input);
  //========================== TODO:file preview
  const [Id, setId] = useState({});

  //================================== TODO:handle project file
  const [projectFiles, setProjectFile] = useState(null);
  const { client, message, loader, error } = useSelector(getAllClientState);
  const { loader: projectLoader } = useSelector(getAllProjectState);
  const { company } = useSelector(getAllCompanyState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //======================================= TODO:handle project file
  const handleProjectFile = (e) => {
    const allFiles = [...e.target.files];

    let docFile = [];
    allFiles?.forEach((file) => {
      docFile.push(file);
    });
    setProjectFile((prev) => {
      if (prev?.length > 0) {
        return [...prev, ...docFile];
      } else {
        return [...docFile];
      }
    });
  };
  //========================================  TODO:handle delete
  const handleDelete = (item) => {
    setProjectFile([...projectFiles.filter((file) => file !== item)]);
  };

  //====================================== TODO:handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (Id) {
      formData.append("clientId", input.clientId);
      formData.append("projectName", input.projectName);
      formData.append("projectType", input.projectType);
      formData.append("projectSource", input.projectSource);
      formData.append("budget", input.budget);
      formData.append("amount", input.amount);
      formData.append("projectDesc", input.projectDesc);
      formData.append("timeFrame", input.timeFrame);
      formData.append("commissionRate", input.commissionRate);
      for (let i = 0; i < projectFiles?.length; i++) {
        formData.append("projectFile", projectFiles[i]);
      }
      formData.append("date", input.date);
      formData.append("document", input.document);
      formData.append("company", input.company);
      dispatch(updateProject({ formData, id: Id }))
        .then(() => {
          dispatch(LoggedInSeller());
          setClient(false);
          setInput({
            clientId: "",
            projectName: "",
            projectType: "",
            budget: "",
            amount: "",
            projectDesc: "",
            timeFrame: "",
            projectSource: "",
            date: "",
            document: "",
            company: "",
          });
          setId(null);
        })
        .catch((error) => {
          console.error("Error updating project:", error);
        });
    } else {
      const sellerId = JSON.parse(localStorage.getItem("Seller"))._id;
      formData.append("clientId", input.clientId);
      formData.append("projectName", input.projectName);
      formData.append("projectType", input.projectType);
      formData.append("projectSource", input.projectSource);
      formData.append("budget", input.budget);
      formData.append("amount", input.amount);
      formData.append("projectDesc", input.projectDesc);
      formData.append("timeFrame", input.timeFrame);
      for (let i = 0; i < projectFiles.length; i++) {
        formData.append("projectFile", projectFiles[i]);
      }
      formData.append("date", input.date);
      formData.append("document", input.document);
      formData.append("company", input.company);
      formData.append("sellerId", sellerId);
      dispatch(createProject(formData)).then(() => {
        dispatch(LoggedInSeller());
        setInput({
          clientId: "",
          projectName: "",
          projectType: "",
          budget: "",
          amount: "",
          projectDesc: "",
          timeFrame: "",
          projectSource: "",
          date: "",
          document: "",
          company: "",
        });
        setProjectFile(null);
        setClient(false);
      });
    }
  };

  //=====================================  TODO:alert toastify
  useEffect(() => {
    if (error) {
      Toastify(error, "error");
      dispatch(setMessageEmpty());
      setClient(false);
    }
    if (message) {
      Toastify(message, "success");
      dispatch(setMessageEmpty());
      setClient(false);
    }
  }, [message, error, navigate, dispatch, setClient]);
  //========================================= TODO:single edit data
  useEffect(() => {
    setInput({
      ...singleData,
      company: singleData?.company?._id,
      clientId: singleData?.clientId?._id,
    });
    setId(singleData?._id);
    setProjectFile(singleData?.projectFile);
  }, [singleData, setInput]);
  //================================================= handle commission rate
  useEffect(() => {
    if (input.company == "657a1bc0687f68c763928a96") {
      setInput((prev) => ({
        ...prev,
        commissionRate: 10,
      }));
    }
    if (input.company == "657a24ae1b068afbcf8039a0") {
      setInput((prev) => ({
        ...prev,
        commissionRate: 15,
      }));
    }
  }, [input.company, setInput]);
  useEffect(() => {
    dispatch(getAllClient());
    dispatch(getAllCompany());
  }, [dispatch]);
  return (
    <motion.div className="w-screen h-screen pt-[50px] pl-[66px] bg-gray-900 bg-opacity-90 fixed top-0 left-0 scroll-smooth overflow-y-auto z-[99999] flex justify-center">
      {/* //==================================================== TODO:close button  */}
      <button
        onClick={() => setClient(false)}
        className="absolute right-16 top-10 z-[99999]"
      >
        <svg
          width="23px"
          height="23px"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <path
            style={{ fill: "#ffffff", stroke: "none", strokeWidth: 4 }}
            d="M 20,4 3,21 33,50 3,80 20,97 49,67 79,97 95,80 65,50 95,20 80,4 50,34 z"
          />
        </svg>
      </button>
      {/* //==================================================== TODO:main model  */}
      <motion.div
        initial={{ scale: 0.3 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{
          duration: 1.5,
          type: "spring",
          stiffness: 100,
          damping: 12,
        }}
        className="main_model z-[999999999] w-[868px] rounded-[10px] relative h-[90vh] scroll-smooth overflow-y-scroll flex justify-start items-start flex-col bg-white border-2 pt-0 p-[42px] pb-0 scrollbar-custom"
      >
        {/* //=========================================================  TODO:loader  */}
        {loader && (
          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.4 }}
            transition={{ duration: 1.3 }}
            className="w-full h-full absolute top-0 left-0 p-0 flex bg-opacity-30 justify-center items-center bg-purple-600 z-[99999999999999999]"
          >
            <div className="w-full h-full absolute top-[45%]">
              <LoadingSpinner />
            </div>
          </motion.div>
        )}
        {projectLoader && (
          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.4 }}
            transition={{ duration: 1.3 }}
            className="w-full h-full absolute top-0 left-0 p-0 flex bg-opacity-30 justify-center items-center bg-purple-600 z-[99999999999999999]"
          >
            <div className="w-full h-full absolute top-[45%]">
              <LoadingSpinner />
            </div>
          </motion.div>
        )}
        <div className=" sticky top-0 pt-[42px] bg-white w-full">
          <div className="flex gap-x-4">
            <button
              className="flex justify-center items-center w-[150px] h-[40px] font-bold text-white hover:bg-purple-900 transition-all duration-500 ease-in-out bg-green-500 rounded-md"
              onClick={() => setForm(false)}
            >
              {title}
            </button>
          </div>
          <h1 className="text-gray-900 font-['Lato'] tracking-[.8px] text-[26px] font-[800]">
            Please add Project Details information
          </h1>
        </div>
        <p className="text-gray-400 capitalize mt-[4px] font-['Lato'] tracking-[.2px]">
          please provide us with a rough idea about the project you can leave
          any field empty if you don&apos;t have information about it
        </p>

        {/* //===============================================================  TODO:form  */}
        <form
          onSubmit={handleSubmit}
          className="form_content grid gap-[45px] relative grid-flow-col justify-between mt-[43px] scroll-smooth overflow-y-auto"
        >
          {/* //========================================================= TODO:right section  */}
          <div className="right w-[490px] flex flex-col gap-[36px]">
            <div className="flex flex-col items-start client_information">
              <h5 className="text-gray-900 tracking-[.6px] text-[16px] font-['Lato'] font-[600]">
                Client Information
              </h5>
              <p className="text-gray-600 font-['Lato'] tracking-[.5px] mt-[1px]">
                Visual UI / UX Design & Branding
              </p>
              <div className="sections w-full grid grid-cols-2 gap-[20px]">
                <div className="left_section w-full flex flex-col gap-[19px] items-start mt-[17px]">
                  <label
                    className="text-gray-900 font-[800] text-[12px] font-['Lato']"
                    htmlFor=""
                  >
                    Client Name
                  </label>
                  <select
                    className="border w-full text-gray-500 px-[12px] tracking-[.5px] h-[37px] font-['Lato'] hover:scale-105 transition-all duration-500 ease-in-out rounded-md mt-[-10px]"
                    name="clientId"
                    value={input.clientId}
                    onChange={handleInputChange}
                  >
                    <option className="text-gray-500" value="">
                      ....
                    </option>

                    {client?.map((item, i) => {
                      return (
                        <option
                          key={i}
                          className="text-gray-500"
                          value={item?._id}
                        >
                          {item?.clientName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="sections w-full grid grid-cols-2 gap-[20px]">
                <div className="left_section w-full flex flex-col gap-[19px] items-start mt-[17px]">
                  <label
                    className="text-gray-900 font-[800] text-[12px] font-['Lato']"
                    htmlFor=""
                  >
                    Company Name
                  </label>
                  <select
                    className="border w-full text-gray-500 px-[12px] tracking-[.5px] h-[37px] font-['Lato'] hover:scale-105 transition-all duration-500 ease-in-out rounded-md mt-[-10px]"
                    name="company"
                    value={input.company}
                    onChange={handleInputChange}
                  >
                    <option className="text-gray-500" value="">
                      ....
                    </option>

                    {company
                      ?.filter((item) => item.status === true)
                      .map((item, i) => {
                        return (
                          <option
                            key={i}
                            className="text-gray-500"
                            value={item?._id}
                          >
                            {item?.companyName}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="left_section w-full flex flex-col gap-[19px] items-start mt-[17px]">
                  <FormInput
                    type="text"
                    placeholder="Commission rate"
                    label="Commission rate"
                    value={input.commissionRate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start project_information">
              <h5 className="text-gray-900 tracking-[.6px] text-[16px] font-['Lato'] font-[600]">
                Project Information
              </h5>

              <div className="sections w-full grid grid-cols-2 gap-[20px]">
                <div className="right_section w-full flex flex-col gap-[19px] items-start mt-[17px]">
                  <FormInput
                    type="text"
                    placeholder="Jone Duo"
                    label="Project Name"
                    width={"30px"}
                    name="projectName"
                    value={input.projectName}
                    handleInputChange={handleInputChange}
                  />
                  <label
                    className="text-gray-900 font-[800] text-[12px] font-['Lato'] mt-[2px]"
                    htmlFor=""
                  >
                    Budget
                  </label>
                  <motion.div
                    initial={{ y: -15, opacity: 0.3 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 * Math.random() * 10,
                    }}
                    className="inputs flex mt-[2px] items-center gap-[30px]"
                  >
                    <div className="checkboxs flex items-center gap-[10px]">
                      <input
                        name="budget"
                        value="Fixed Budget"
                        onChange={handleInputChange}
                        checked={input.budget === "Fixed Budget"}
                        className="w-4 h-4"
                        type="checkbox"
                      />
                      <label
                        className="text-gray-900 font-[800] text-[12px] font-['Lato'] tracking-[.2px]"
                        htmlFor=""
                      >
                        Fixed Budget
                      </label>
                    </div>
                    <div className="checkboxs flex items-center gap-[10px]">
                      <input
                        name="budget"
                        value="Hourly Rate"
                        onChange={handleInputChange}
                        checked={input.budget === "Hourly Rate"}
                        className="w-4 h-4"
                        type="checkbox"
                      />
                      <label
                        className="text-gray-900 font-[800] text-[12px] font-['Lato'] tracking-[.2px]"
                        htmlFor=""
                      >
                        Hourly Rate
                      </label>
                    </div>
                  </motion.div>
                </div>
                <div className="left_section w-full flex flex-col gap-[19px] items-start mt-[18px]">
                  <label
                    className="text-gray-900 font-[800] text-[12px] font-['Lato']"
                    htmlFor=""
                  >
                    Type of Project
                  </label>
                  <motion.select
                    initial={{ y: -15, opacity: 0.3 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 * Math.random() * 10,
                    }}
                    className="border w-full h-[37px]  text-gray-500 px-[12px] tracking-[.5px] hover:scale-105 transition-all duration-500 ease-in-out  rounded-md mt-[-10px]"
                    name="projectType"
                    id=""
                    value={input.projectType}
                    onChange={handleInputChange}
                  >
                    <option className="text-gray-500 " value="">
                      ....
                    </option>
                    <option
                      className="text-gray-500 "
                      value="Web Site Redesign"
                    >
                      Web Site Redesign
                    </option>
                    <option className="text-gray-500 " value="Web Design">
                      Web Design
                    </option>
                    <option className="text-gray-500 " value="Graphic Design">
                      Graphic Design
                    </option>
                  </motion.select>

                  <FormInput
                    type="text"
                    placeholder="$2504"
                    label="Amount"
                    width={"30px"}
                    name="amount"
                    value={input.amount}
                    handleInputChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start w-full description">
              <label
                className="text-gray-900 font-[800] text-[12px] font-['Lato'] mt-[-16px]"
                htmlFor=""
              >
                Brief Description of Project
              </label>
              <motion.textarea
                initial={{ y: -15, opacity: 0.3 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 * Math.random() * 10,
                }}
                className="border w-full h-[80px] rounded-[10px] mt-[10px] py-[8px] px-[16px]"
                name="projectDesc"
                value={input.projectDesc}
                onChange={handleInputChange}
                id=""
                cols="30"
                rows="10"
                placeholder="Mar 4, 2023"
              ></motion.textarea>
            </div>
            <div className="flex flex-col items-start project_datials">
              <div className="sections w-full items-center justify-center grid grid-cols-2 gap-[20px]">
                <div className="right_section w-full flex flex-col gap-[19px] items-start mt-[-20px]">
                  <label
                    className="text-gray-900 font-[800] text-[12px] font-['Lato']"
                    htmlFor=""
                  >
                    Project Source
                  </label>
                  <motion.select
                    initial={{ y: -15, opacity: 0.3 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 * Math.random() * 10,
                    }}
                    className="border w-full text-gray-500 px-[12px] tracking-[.5px] h-[37px] font-['Lato'] hover:scale-105 transition-all duration-500 ease-in-out rounded-md mt-[-10px]"
                    name="projectSource"
                    value={input.projectSource}
                    onChange={handleInputChange}
                    id=""
                  >
                    <option className="text-gray-500" value="">
                      ....
                    </option>
                    <option className="text-gray-500" value="Fiverr">
                      Fiverr
                    </option>
                    <option className="text-gray-500" value="Freelancer">
                      Freelancer
                    </option>
                  </motion.select>
                  <label
                    className="text-gray-900 font-[800] text-[12px] font-['Lato']"
                    htmlFor=""
                  >
                    Timeframe
                  </label>
                  <motion.select
                    initial={{ y: -15, opacity: 0.3 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 * Math.random() * 10,
                    }}
                    className="border w-full text-gray-500 px-[12px] tracking-[.5px] h-[37px] font-['Lato'] hover:scale-105 transition-all duration-500 ease-in-out rounded-md mt-[-10px]"
                    name="timeFrame"
                    value={input.timeFrame}
                    id=""
                    onChange={handleInputChange}
                  >
                    <option className="text-gray-500" value="">
                      ....
                    </option>
                    <option className="text-gray-500" value="1 Month">
                      1 Month
                    </option>
                    <option className="text-gray-500" value="2 Month">
                      2 Month
                    </option>
                    <option className="text-gray-500" value="3 Month">
                      3 Month
                    </option>
                  </motion.select>
                </div>
                <div className="left_section w-full flex flex-col gap-[16px] items-start">
                  <FormInput
                    type="date"
                    label="Date assigned"
                    name="date"
                    value={input.date}
                    handleInputChange={handleInputChange}
                  />
                  <label
                    className="text-gray-900 font-[800] text-[12px] font-['Lato'] tracking-[.5px]"
                    htmlFor=""
                  >
                    Upload Relevant Document
                  </label>
                  <motion.label
                    initial={{ y: -15, opacity: 0.3 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 * Math.random() * 10,
                    }}
                    className="text-gray-500 cursor-pointer transition-all ease-in-out duration-500 hover:bg-gray-300 border bg-gray-200 w-full h-[36px] rounded-md mt-[-5px] flex justify-center font-['Lato'] text-[12px] items-center tracking-[0.24px]"
                    htmlFor="uploadFile"
                  >
                    {projectFiles?.length > 0
                      ? projectFiles?.length + `  File Uploaded`
                      : "Upload Files"}
                  </motion.label>
                  <input
                    id="uploadFile"
                    className="w-full  border h-[36px] hidden"
                    type="file"
                    multiple
                    onChange={handleProjectFile}
                  />
                </div>
              </div>
            </div>
            <div className="submit_section sticky bottom-0 bg-white flex justify-between items-start py-[42px]">
              <motion.div
                initial={{ y: -15, opacity: 0.3 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 * Math.random() * 10,
                }}
                className="agree flex items-center gap-[20px]"
              >
                <input type="checkbox" className="w-4 h-4" />
                <label
                  className="text-gray-900 font-[800] text-[12px] font-['Lato']"
                  htmlFor="i agree with all "
                >
                  I agree with all
                  <a
                    className="text-purple-500 hover:text-purple-800 transition-all duration-500 pl-[5px]"
                    href=""
                  >
                    terms & condition
                  </a>
                </label>
              </motion.div>
              <motion.button
                initial={{ y: -15, opacity: 0.3 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 * Math.random() * 10,
                }}
                type="submit"
                className="text-white mt-[-15px]  bg-purple-500 w-[145px] h-[36px] rounded-lg font-['Lato'] flex justify-center items-center text-[14px] font-[500] hover:bg-purple-700 transition-all ease-in-out duration-500 hover:scale-105 "
              >
                Submit Now
              </motion.button>
            </div>
          </div>
          {/* //=============================================================== left section  */}
          <div className="left w-[220px] flex flex-col items-start">
            <p className="text-gray-700 font-[600] text-[16px] font-['Work_Sans'] mt-[20px] ml-[5px] ">
              Contact Us
            </p>
            <p className="text-gray-400 font-['Work_Sans'] tracking-[px] text-left">
              For any quires or information contact with our support team
            </p>
            <label className="text-gray-300 mt-[15px] ml-[5px]" htmlFor="">
              Phone
            </label>
            <h4 className="text-gray-800 text-[18px] font-[700] font-['Work_Sans'] ml-[5px]">
              (880) 22- 9944
            </h4>
            <label className="text-gray-300 mt-[18px] ml-[5px]" htmlFor="">
              Email
            </label>
            <h4 className="text-gray-800 text-[18px] font-[600] mt-[2px] font-['Work_Sans'] ml-[6px] tracking-[-.5px]">
              info@imageappeal.com
            </h4>
            <div className="grid w-full h-auto grid-cols-2 gap-2 mt-10 overflow-hidden preview">
              <h1 className="col-span-2 border-t border-b text-[16px] font-bold uppercase py-2">
                Document Preview
              </h1>
              {projectFiles?.length > 0 ? (
                projectFiles?.map((item, index) => {
                  return (
                    <motion.div
                      initial={{ y: -15, opacity: 0.3 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 * index,
                      }}
                      key={index}
                      className="relative group"
                    >
                      <span
                        onClick={() => handleDelete(item)}
                        className="absolute cursor-pointer hidden group-hover:block bg-gray-300 rounded-full top-1 right-1 p-[5px]"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.7929 7.49998L1.14645 1.85353L1.85356 1.14642L7.50001 6.79287L13.1465 1.14642L13.8536 1.85353L8.20711 7.49998L13.8536 13.1464L13.1465 13.8535L7.50001 8.20708L1.85356 13.8535L1.14645 13.1464L6.7929 7.49998Z"
                            fill="#fff"
                          />
                        </svg>
                      </span>
                      <FilePreview item={item} />
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1 * Math.random() * 10,
                  }}
                  className=" col-span-2 gap-[5px] grid grid-cols-2  w-full "
                >
                  <img
                    className="object-cover w-full h-full border"
                    src="https://assets.website-files.com/6324331488eeaaad6ed0be97/63620f99776dc1648a7a5d0a_image-preview.png"
                  />

                  <img
                    className="object-cover w-full h-full border"
                    src="https://assets.website-files.com/6324331488eeaaad6ed0be97/63620f99776dc1648a7a5d0a_image-preview.png"
                  />
                  <img
                    className="object-cover w-full h-full border"
                    src="https://assets.website-files.com/6324331488eeaaad6ed0be97/63620f99776dc1648a7a5d0a_image-preview.png"
                  />

                  <img
                    className="object-cover w-full h-full border"
                    src="https://assets.website-files.com/6324331488eeaaad6ed0be97/63620f99776dc1648a7a5d0a_image-preview.png"
                  />
                  <img
                    className="object-cover w-full h-full border"
                    src="https://assets.website-files.com/6324331488eeaaad6ed0be97/63620f99776dc1648a7a5d0a_image-preview.png"
                  />

                  <img
                    className="object-cover w-full h-full border"
                    src="https://assets.website-files.com/6324331488eeaaad6ed0be97/63620f99776dc1648a7a5d0a_image-preview.png"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Model;
