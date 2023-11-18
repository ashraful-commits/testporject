import { useEffect, useState, useRef } from "react";
import LoadingSpinner from "../LoadingSpin";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellerState } from "../../Features/Seller/SellerSlice";
import FormInput from "../FormInput/FormInput";
import {
  AddSalePerson,
  LoggedInSeller,
  SellerRegistration,
  updateSeller,
} from "../../Features/Seller/SellerApi";
import { Toastify } from "../../Utils/Tostify";
import { setMessageEmpty } from "../../Features/Client/ClientSlice";
import { motion } from "framer-motion";

const SalesModel = ({ setModel, sellerId, singleData, title }) => {
  const {
    loader: salesLoader,
    message,
    error,
    loginInSeller,
  } = useSelector(getAllSellerState);
  const [input, setInput] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
    avatar: "",
    employment: "",
    website: "",
    companyName: "",
  });
  //==========================================ref
  const form = useRef();
  //================================state
  const [avatar, setAvatar] = useState(null);
  const [componyAvatar, setComponyAvatar] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [companyPhoto, setCompanyPhoto] = useState(null);
  const dispatch = useDispatch();

  //========================handle Avatar

  const handleSellerAvatar = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
    setPhoto(e.target.files[0]);
  };
  const handleCompanyAvatar = (e) => {
    setComponyAvatar(URL.createObjectURL(e.target.files[0]));
    setCompanyPhoto(e.target.files[0]);
  };
  //===========================handle inputChange
  const handleInputChange = (e) => {
    console.log(e);
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //============================ form submit

  const handleSubmit = (e) => {
    e.preventDefault();
    if (singleData?._id) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("companyName", input.companyName);
      if (input.role) {
        formData.append("role", input.role);
      }
      formData.append("website", input.website);
      formData.append("employment", input.employment);
      if (photo) {
        formData.append("sellerAvatar", photo);
      }
      if (companyPhoto) {
        formData.append("companyAvatar", companyPhoto);
      }

      dispatch(updateSeller({ id: singleData?._id, formData })).then(() => {
        dispatch(LoggedInSeller());
        setModel(false);
        setInput({
          name: "",
          role: "",
          email: "",
          password: "",
          avatar: "",
          employment: "",
          website: "",
        });
      });
    } else {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("companyName", input.companyName);
      if (input.role) {
        formData.append("role", input.role);
      }
      formData.append("website", input.website);
      formData.append("employment", input.employment);
      formData.append("sellerAvatar", photo);
      if (companyPhoto) {
        formData.append("companyAvatar", companyPhoto);
      }
      formData.append("sellerId", sellerId);
      if (photo) {
        dispatch(SellerRegistration(formData)).then(() => {
          setInput({
            name: "",
            role: "",
            email: "",
            password: "",
            avatar: "",
            employment: "",
            website: "",
          });
        });
      }
      if (photo && sellerId) {
        setModel(false);
        AddSalePerson(formData);
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
    }
  }, [error, message, dispatch]);
  useEffect(() => {
    console.log(singleData);
    setInput({ ...singleData });
    setAvatar(singleData?.avatar);
    setComponyAvatar(singleData?.companyAvatar);
  }, [singleData]);
  return (
    <>
      <div className="w-screen min-h-[1240px] h-screen pt-[150px] pl-[66px] bg-gray-900 bg-opacity-90 fixed bottom-0  top-0 left-0  z-[99999] flex justify-center ">
        {/* //==================================================close button  */}
        <button
          onClick={() => setModel(false)}
          className="absolute right-16 top-10 hover:scale-105 transition-all duration-500 ease-in-out z-[99999]"
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
        {/* //========================================== main model  */}
        <motion.div
          initial={{ scale: 0.3 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{
            duration: 1.5,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          className="main_model z-[999999999] w-[500px] rounded-[10px] h-[65vh]   justify-center items-center flex flex-col bg-white border-2 pt-0 p-[42px] pb-0 scrollbar-custom relative"
        >
          {salesLoader && (
            <motion.div
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.4 }}
              transition={{ duration: 1.3 }}
              className="w-full h-full absolute top-0 left-0 p-0 flex bg-opacity-25 justify-center items-center bg-cyan-600 z-[999999999999999999]"
            >
              <div className="absolute top-[45%]">
                <LoadingSpinner />
              </div>
            </motion.div>
          )}
          <div className="pt-[10px] bg-white w-full col-span-2">
            <h1 className="text-gray-900 font-['Lato'] tracking-[.8px] text-[26px] font-[800]">
              {title ? title : "Add New"} person
            </h1>
          </div>
          {/* //=========================form  */}
          <form
            ref={form}
            onSubmit={handleSubmit}
            className="form_content col-span-2 grid relative justify-between mt-[10px] overflow-hidden items-center"
          >
            <div className="right w-full flex flex-col justify-center">
              <div className="  grid grid-cols-2 gap-y-2 gap-2  justify-center">
                <FormInput
                  placeholder="Name"
                  label={"Name"}
                  name="name"
                  type="text"
                  value={input.name}
                  handleInputChange={handleInputChange}
                />
                <FormInput
                  placeholder="Email"
                  label={"Email"}
                  type="email"
                  name="email"
                  value={input.email}
                  handleInputChange={handleInputChange}
                />
                {title === "Edit" ? (
                  ""
                ) : (
                  <FormInput
                    placeholder="Password"
                    label={"Password"}
                    name="password"
                    value={input.password}
                    type="password"
                    handleInputChange={handleInputChange}
                  />
                )}

                <FormInput
                  placeholder="Website"
                  label={"Website"}
                  name="website"
                  value={input.website}
                  type="text"
                  handleInputChange={handleInputChange}
                />
                <FormInput
                  placeholder="Company Name"
                  label={"Company Name"}
                  name="companyName"
                  value={input.companyName}
                  type="text"
                  handleInputChange={handleInputChange}
                />
                <FormInput
                  placeholder="employment"
                  label={"Employment"}
                  name="employment"
                  value={input.employment}
                  type="text"
                  handleInputChange={handleInputChange}
                />
                {loginInSeller?.role === "admin" && (
                  <div className="flex flex-col gap-y-1">
                    <label
                      className="text-gray-900 text-start w-full my-2 font-[800] text-[12px] font-['Lato']"
                      htmlFor=""
                    >
                      Role
                    </label>
                    <motion.select
                      initial={{ y: -15, opacity: 0.3 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 * Math.random() * 10,
                      }}
                      className="border w-full focus:outline-none  text-gray-500 px-[12px] tracking-[.5px] h-[37px] my-2 font-['work_sans'] rounded-md mt-[-10px]"
                      name="role"
                      value={input.role}
                      onChange={handleInputChange}
                    >
                      <option
                        className="text-gray-500 border-none"
                        value="user"
                      >
                        User
                      </option>
                      <option
                        className="text-gray-500 border-none"
                        value="admin"
                      >
                        Admin
                      </option>
                    </motion.select>
                  </div>
                )}

                <div className="flex gap-5 col-span-2 justify-center">
                  <motion.label
                    initial={{ y: -15, opacity: 0.3 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 * Math.random() * 10,
                    }}
                    htmlFor="uploadAvatar"
                    className="avatar border  flex justify-center items-center w-[150px] ml-[4px] overflow-hidden mt-[4px] rounded-md h-[140px]"
                  >
                    {avatar ? (
                      <img
                        className="w-full h-full object-cover"
                        src={avatar}
                      />
                    ) : (
                      "Select avatar"
                    )}
                  </motion.label>
                  <motion.label
                    initial={{ y: -15, opacity: 0.3 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 * Math.random() * 10,
                    }}
                    htmlFor="uploadCompanyAvatar"
                    className="avatar border  flex justify-center items-center w-[150px] ml-[4px] overflow-hidden mt-[4px] rounded-md h-[140px]"
                  >
                    {componyAvatar ? (
                      <img
                        className="w-full h-full object-cover"
                        src={componyAvatar}
                      />
                    ) : (
                      "company avatar"
                    )}
                  </motion.label>
                </div>

                <input
                  type="file"
                  onChange={handleSellerAvatar}
                  className="hidden"
                  id="uploadAvatar"
                />
                <input
                  type="file"
                  onChange={handleCompanyAvatar}
                  className="hidden"
                  id="uploadCompanyAvatar"
                />
              </div>
              <div className="submit_section  flex justify-center flex-col items-center mt-5 bg-white col-span-2 ">
                <motion.div
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1 * Math.random() * 10,
                  }}
                  className="agree flex w-full align-middle items-center gap-[20px]"
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
                  className="text-white hover:scale-110  mt-[15px] bg-purple-500 w-[100%] h-[36px] rounded-lg font-['Lato'] flex justify-center items-center text-[14px] font-[500] hover:bg-purple-700 my-3 transition-all ease-in-out duration-500"
                >
                  Submit Now
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default SalesModel;
