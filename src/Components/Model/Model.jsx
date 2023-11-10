import { useEffect, useState } from "react";
import useFormHook from "../../Hooks/useFormHook";
import FormInput from "../FormInput/FormInput";
import FilePreview from "../../Utils/FilePreview";
import { useDispatch, useSelector } from "react-redux";
import { createClient, updateClient } from "../../Features/Client/ClientApi";
import {
  getAllClientState,
  setMessageEmpty,
} from "./../../Features/Client/ClientSlice";
import { Toastify } from "../../Utils/Tostify";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpin";

const Model = ({ setClient, singleData }) => {
  //============================= form hook
  const { input, setInput, handleInputChange } = useFormHook({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    country: "",
    state: "",
    clientAddress: "",
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
    companyName: "",
  });

  //==========================file preview
  const [Id, setId] = useState({});

  //==================================handle project file
  const [projectFiles, setProjectFile] = useState(null);
  const { client, message, loader, error } = useSelector(getAllClientState);
  const [avatar, setAvatar] = useState(null);
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleDelete = (item) => {
    setProjectFile([...projectFiles.filter((file) => file !== item)]);
  };
  //================================handle client avatar
  const handleClientAvatar = (e) => {
    setPhoto(e.target.files[0]);
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  //======================================handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (Id) {
      formData.append("clientName", input.clientName);
      formData.append("clientPhone", input.clientPhone);
      formData.append("clientEmail", input.clientEmail);
      formData.append("country", input.country);
      formData.append("state", input.state);
      formData.append("clientAddress", input.clientAddress);
      formData.append("projectName", input.projectName);
      formData.append("projectType", input.projectType);
      formData.append("projectSource", input.projectSource);
      formData.append("budget", input.budget);
      formData.append("amount", input.amount);
      formData.append("projectDesc", input.projectDesc);
      formData.append("timeFrame", input.timeFrame);
      for (let i = 0; i < projectFiles?.length; i++) {
        formData.append("projectFile", projectFiles[i]);
      }
      formData.append("date", input.date);
      formData.append("document", input.document);
      formData.append("clientAvatar", photo);
      formData.append("companyName", input.companyName);

      dispatch(updateClient({ formData, id: Id }));
      setInput({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        country: "",
        state: "",
        clientAddress: "",
        projectName: "",
        projectType: "",
        budget: "",
        amount: "",
        projectDesc: "",
        timeFrame: "",
        projectSource: "",
        date: "",
        document: "",
        companyName: "",
      });
      setId(null);
    } else {
      if (photo) {
        const sellerId = JSON.parse(localStorage.getItem("Seller"))._id;
        formData.append("clientName", input.clientName);
        formData.append("clientPhone", input.clientPhone);
        formData.append("clientEmail", input.clientEmail);
        formData.append("country", input.country);
        formData.append("state", input.state);
        formData.append("clientAddress", input.clientAddress);
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
        formData.append("clientAvatar", photo);
        formData.append("companyName", input.companyName);
        formData.append("sellerId", sellerId);
        dispatch(createClient(formData));
        setInput({
          clientName: "",
          clientEmail: "",
          clientPhone: "",
          country: "",
          state: "",
          clientAddress: "",
          projectName: "",
          projectType: "",
          budget: "",
          amount: "",
          projectDesc: "",
          timeFrame: "",
          projectSource: "",
          date: "",
          document: "",
          companyName: "",
        });
        setPhoto(null);
        setProjectFile(null);
      } else {
        Toastify("Select Client Avatar", "error");
        dispatch(setMessageEmpty());
      }
    }
  };
  useEffect(() => {
    if (error) {
      Toastify(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      Toastify(message, "success");
      dispatch(setMessageEmpty());
      setClient(false);
    }

    if (localStorage.getItem("Seller")) {
      navigate("/");
    }
  }, [message, error, navigate, dispatch, setClient]);
  useEffect(() => {
    setInput({ ...singleData });
    setId(singleData?._id);
    setAvatar(singleData?.clientAvatar);
    setProjectFile(singleData?.projectFile);
  }, [singleData, setInput]);

  return (
    <div className="w-screen h-auto py-[120px] pl-[66px] bg-gray-900 bg-opacity-90 absolute top-0 left-0 overflow-hidden z-[99999] flex justify-center">
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
      <div className="main_model z-[999999999] w-[868px] rounded-[10px] relative h-[1230px] overflow-y-scroll flex justify-start items-start flex-col bg-white border-2 pt-0 p-[42px] pb-0 scrollbar-custom">
        {loader && (
          <div className="w-full h-full absolute top-0 left-0 p-0 flex justify-center items-center bg-blue-300 z-[999999999999]">
            <LoadingSpinner />
          </div>
        )}
        <div className=" sticky top-0 pt-[42px] bg-white w-full">
          <h1 className="text-gray-900 font-['Lato'] tracking-[.8px] text-[26px] font-[800]">
            Please add Client & Project Details information
          </h1>
        </div>
        <p className="text-gray-400 capitalize mt-[4px] font-['Lato'] tracking-[.2px]">
          please provide us with a rough idea about the project you can leave
          any field empty if you don&apos;t have information about it
        </p>
        <form
          onSubmit={handleSubmit}
          className="form_content grid gap-[45px] relative grid-flow-col justify-between mt-[43px] overflow-hidden"
        >
          <div className="right w-[490px] flex flex-col gap-[36px]">
            <div className="client_information flex flex-col items-start">
              <h5 className="text-gray-900 tracking-[.6px] text-[16px] font-['Lato'] font-[600]">
                Client Information
              </h5>
              <p className="text-gray-600 font-['Lato'] tracking-[.5px] mt-[1px]">
                Visual UI / UX Design & Branding
              </p>
              <div className="sections w-full grid grid-cols-2 gap-[20px]">
                <div className="right_section w-full flex flex-col gap-[19px] items-start mt-[17px]">
                  <FormInput
                    type="text"
                    placeholder="Jone Duo"
                    label="Client Name"
                    width={"30px"}
                    name="clientName"
                    value={input.clientName}
                    handleInputChange={handleInputChange}
                  />
                  <FormInput
                    type="text"
                    placeholder="Enter Email"
                    label="Company email"
                    name="clientEmail"
                    value={input.clientEmail}
                    handleInputChange={handleInputChange}
                  />
                  <label
                    className="text-gray-900 font-[800] text-[12px] font-['Lato']"
                    htmlFor=""
                  >
                    Country
                  </label>
                  <select
                    className="border w-full text-gray-500 px-[12px] tracking-[.5px] h-[37px] font-['Lato'] rounded-md mt-[-10px]"
                    name="country"
                    value={input.country}
                    onChange={handleInputChange}
                  >
                    <option className="text-gray-500" value="">
                      ....
                    </option>
                    <option className="text-gray-500" value="United State">
                      United State
                    </option>
                    <option className="text-gray-500" value="Bangladesh">
                      Bangladesh
                    </option>
                    <option className="text-gray-500" value="England">
                      England
                    </option>
                    <option className="text-gray-500" value="Rassia">
                      Rassia
                    </option>
                  </select>
                </div>
                <div className="left_section w-full flex flex-col gap-[19px] items-start mt-[17px]">
                  <FormInput
                    type="text"
                    placeholder="Company name"
                    label="Company Name"
                    width={"30px"}
                    name="companyName"
                    value={input.companyName}
                    handleInputChange={handleInputChange}
                  />
                  <FormInput
                    type="text"
                    placeholder="Enter Phone"
                    label="Client Phone Number"
                    name="clientPhone"
                    value={input.clientPhone}
                    handleInputChange={handleInputChange}
                  />
                  <label
                    className="text-gray-900 font-[800] text-[12px] font-['Lato']"
                    htmlFor=""
                  >
                    State
                  </label>
                  <select
                    className="border w-full h-[37px]  text-gray-500 px-[12px] tracking-[.5px]  rounded-md mt-[-10px]"
                    name="state"
                    value={input.state}
                    onChange={handleInputChange}
                  >
                    <option className="text-gray-500 " value="">
                      ....
                    </option>
                    <option className="text-gray-500 " value="Texas">
                      Texas
                    </option>
                    <option className="text-gray-500 " value="Dhaka">
                      Dhaka
                    </option>
                    <option className="text-gray-500 " value="London">
                      London
                    </option>
                  </select>
                </div>
              </div>
              <label
                className="text-gray-900 font-[800] text-[12px] font-['Lato'] mt-[20px]"
                htmlFor=""
              >
                Client Full Address
              </label>

              <input
                name="clientAddress"
                value={input.clientAddress}
                onChange={handleInputChange}
                className="w-full border mt-[10px] h-[36px] rounded-md pl-[16px] placeholder:uppercase placeholder:font-['Lato']"
                type="text"
                placeholder="3401 STAMFORD ST LAREDO TX 78043-1972 USA"
              />
            </div>
            <div className="project_information flex flex-col items-start">
              <h5 className="text-gray-900 tracking-[.6px] text-[16px] font-['Lato'] font-[600]">
                Project Information
              </h5>
              <p className="text-gray-600 font-['Lato'] tracking-[.5px] mt-[1px]">
                Visual UI / UX Design & Branding
              </p>
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
                  <div className="inputs flex mt-[2px] items-center gap-[30px]">
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
                  </div>
                </div>
                <div className="left_section w-full flex flex-col gap-[19px] items-start mt-[18px]">
                  <label
                    className="text-gray-900 font-[800] text-[12px] font-['Lato']"
                    htmlFor=""
                  >
                    Type of Project
                  </label>
                  <select
                    className="border w-full h-[37px]  text-gray-500 px-[12px] tracking-[.5px]  rounded-md mt-[-10px]"
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
                  </select>

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
            <div className="description w-full flex flex-col items-start">
              <label
                className="text-gray-900 font-[800] text-[12px] font-['Lato'] mt-[-16px]"
                htmlFor=""
              >
                Brief Description of Project
              </label>
              <textarea
                className="border w-full h-[80px] rounded-[10px] mt-[10px] py-[8px] px-[16px]"
                name="projectDesc"
                value={input.projectDesc}
                onChange={handleInputChange}
                id=""
                cols="30"
                rows="10"
                placeholder="Mar 4, 2023"
              ></textarea>
            </div>
            <div className="project_datials flex flex-col items-start">
              <div className="sections w-full items-center justify-center grid grid-cols-2 gap-[20px]">
                <div className="right_section w-full flex flex-col gap-[19px] items-start mt-[-20px]">
                  <label
                    className="text-gray-900 font-[800] text-[12px] font-['Lato']"
                    htmlFor=""
                  >
                    Project Source
                  </label>
                  <select
                    className="border w-full text-gray-500 px-[12px] tracking-[.5px] h-[37px] font-['Lato'] rounded-md mt-[-10px]"
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
                  </select>
                  <label
                    className="text-gray-900 font-[800] text-[12px] font-['Lato']"
                    htmlFor=""
                  >
                    Timeframe
                  </label>
                  <select
                    className="border w-full text-gray-500 px-[12px] tracking-[.5px] h-[37px] font-['Lato'] rounded-md mt-[-10px]"
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
                  </select>
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
                  <label
                    className="text-gray-500 cursor-pointer transition-all ease-in-out duration-500 hover:bg-gray-300 border bg-gray-200 w-full h-[36px] rounded-md mt-[-5px] flex justify-center font-['Lato'] text-[12px] items-center tracking-[0.24px]"
                    htmlFor="uploadFile"
                  >
                    {projectFiles?.length > 0
                      ? projectFiles?.length + `  File Uploaded`
                      : "Upload Files"}
                  </label>
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
              <div className="agree flex items-center gap-[20px]">
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
              </div>
              <button
                type="submit"
                className="text-white mt-[-15px] bg-purple-500 w-[145px] h-[36px] rounded-lg font-['Lato'] flex justify-center items-center text-[14px] font-[500] hover:bg-purple-700 transition-all ease-in-out duration-500"
              >
                Submit Now
              </button>
            </div>
          </div>
          <div className="left w-[220px] flex flex-col items-start">
            <div className="avatar border flex justify-center items-center w-[150px] ml-[4px] overflow-hidden mt-[4px] rounded-md h-[140px]">
              {avatar ? (
                <img className="w-full h-full object-cover" src={avatar} />
              ) : (
                "Select avatar"
              )}
            </div>
            <label
              className="border  text-gray-500 font-['Lato'] font-[600] w-[180px] h-[36px] mt-[12px] ml-[5px] flex justify-center rounded-md items-center"
              htmlFor="uploadAvatar"
            >
              Upload client avatar
            </label>
            <input
              type="file"
              onChange={handleClientAvatar}
              className="hidden"
              id="uploadAvatar"
            />
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
            <div className="preview w-full h-auto overflow-hidden gap-2 grid grid-cols-2 mt-10">
              <h1 className="col-span-2 border-t border-b text-[16px] font-bold uppercase py-2">
                Document Preview
              </h1>
              {projectFiles?.length > 0 ? (
                projectFiles?.map((item, index) => {
                  return (
                    <div key={index} className="relative group">
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
                    </div>
                  );
                })
              ) : (
                <div className=" col-span-2 gap-[5px] grid grid-cols-2  w-full ">
                  <img
                    className="w-full border h-full object-cover"
                    src="https://assets.website-files.com/6324331488eeaaad6ed0be97/63620f99776dc1648a7a5d0a_image-preview.png"
                  />

                  <img
                    className="w-full border h-full object-cover"
                    src="https://assets.website-files.com/6324331488eeaaad6ed0be97/63620f99776dc1648a7a5d0a_image-preview.png"
                  />
                  <img
                    className="w-full border h-full object-cover"
                    src="https://assets.website-files.com/6324331488eeaaad6ed0be97/63620f99776dc1648a7a5d0a_image-preview.png"
                  />

                  <img
                    className="w-full border h-full object-cover"
                    src="https://assets.website-files.com/6324331488eeaaad6ed0be97/63620f99776dc1648a7a5d0a_image-preview.png"
                  />
                  <img
                    className="w-full border h-full object-cover"
                    src="https://assets.website-files.com/6324331488eeaaad6ed0be97/63620f99776dc1648a7a5d0a_image-preview.png"
                  />

                  <img
                    className="w-full border h-full object-cover"
                    src="https://assets.website-files.com/6324331488eeaaad6ed0be97/63620f99776dc1648a7a5d0a_image-preview.png"
                  />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Model;
