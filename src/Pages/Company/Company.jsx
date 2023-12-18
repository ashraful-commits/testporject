import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoggedInSeller, LogoutSeller } from "../../Features/Seller/SellerApi";
import { Toastify } from "../../Utils/Tostify";
import {
  getAllSellerState,
  setMessageEmpty,
} from "../../Features/Seller/SellerSlice";

import { motion } from "framer-motion";
import { getAllCompanyState } from "../../Features/Company/CompanySlice";
import {
  companyStatus,
  getAllCompany,
  getSingleCompany,
  deleteCompany,
} from "../../Features/Company/CompanyApi";
import CompanyModel from "../../Components/Model/CompanyModel";
import swal from "sweetalert";

const Company = () => {
  //==============================================TODO:all state
  const [notification, setNotification] = useState(false);
  const [companyModel, setCompanyModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [Id, setId] = useState(null);
  //=========================================== TODO:redux data
  const { error, message, company, singleCompany } =
    useSelector(getAllCompanyState);
  const { loginInSeller } = useSelector(getAllSellerState);
  //===================================================== TODO:dispatch/navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //===========================================================TODO:handle logout
  const handleLogout = () => {
    dispatch(LogoutSeller());
    localStorage.clear("Seller");
    navigate("/login");
  };
  //============================================================ TODO:toastify
  useEffect(() => {
    if (error) {
      Toastify(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      Toastify(message, "success");
      dispatch(setMessageEmpty());
    }

    if (!localStorage.getItem("Seller")) {
      navigate("/login");
    }
  }, [error, message, dispatch, navigate]);
  //=============================================================== TODO:logged in seller data
  useEffect(() => {
    dispatch(LoggedInSeller());
    dispatch(getAllCompany());
  }, [dispatch]);

  //======================================================== TODO:return
  const handleCompanyStatus = (id, status) => {
    dispatch(companyStatus({ id, status: !status }));
  };
  //================================handle edit
  const handleEdit = (id) => {
    setId(id);
    setEditModel(true);
  };
  //================================handle edit
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (id) {
          dispatch(deleteCompany(id)).then(() => {
            dispatch(getAllCompany());
          });
        }

        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  //=============================================get single company
  useEffect(() => {
    if (Id) {
      dispatch(getSingleCompany(Id));
    }
  }, [Id, dispatch]);
  return (
    <>
      {/* ===================================add company  */}
      {companyModel && (
        <CompanyModel setModel={setCompanyModel} title="Add company" />
      )}
      {/* =====================================edit model  */}
      {editModel && (
        <CompanyModel
          setModel={setEditModel}
          title="Edit company"
          singleData={singleCompany}
        />
      )}

      {/* ==============================main container  */}
      <motion.div
        initial={{ y: -15, opacity: 0.1 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 200,
          ease: [0.17, 0.67, 0.83, 0.67],
          delay: 0.2,
        }}
        className="min-w-[1340px] scroll-smooth  bg-[#fff] rounded-[15px] min-h-[909px] grid grid-flow-col overflow-hidden"
      >
        <>
          {/**======================================================TODO:dashboard */}
          <div className="dashboard px-[35px] w-[1400px] h-full">
            {/* ===========================================TODO:header  */}
            <div className="header items-center mt-[30px] w-full h-[37px]  flex justify-between">
              <div className="flex ">
                <Link
                  className="flex items-center px-3 py-1 transition-all duration-500 ease-in-out border rounded-md gap-x-4 hover:bg-cyan-700 gap-x-3 group"
                  to="/"
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    id="left"
                    data-name="Flat Color"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon flat-color #858585 hover:fill-white"
                  >
                    <path
                      id="primary"
                      d="M21,11H5.41l5.3-5.29A1,1,0,1,0,9.29,4.29l-7,7a1,1,0,0,0,0,1.42l7,7a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L5.41,13H21a1,1,0,0,0,0-2Z"
                      fill="black"
                    ></path>
                  </svg>
                  <h5 className="text-[16px] font-['Lato'] group-hover:text-white  font-[900] leading-[18px] tracking-[.2px] text-[#05222E]">
                    Back
                  </h5>
                </Link>

                {loginInSeller.role === "super_admin" && (
                  <button
                    onClick={() => setCompanyModel(true)}
                    className="px-[10px] py-[5px] bg-cyan-700  rounded-md text-white font-bold hover:bg-gray-700  transition-all duration-500 ease-in-out"
                  >
                    Add new company
                  </button>
                )}
              </div>
              <div className="search_noti_setting items-center justify-between flex w-[200px]">
                <div className="search flex justify-between items-center pl-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    className=" shrink-0"
                  >
                    <path
                      d="M18.9842 17.6825L15.8675 14.575C16.8731 13.2939 17.4187 11.7119 17.4167 10.0833C17.4167 8.63294 16.9866 7.21512 16.1808 6.00916C15.375 4.80319 14.2297 3.86326 12.8897 3.30822C11.5497 2.75318 10.0752 2.60795 8.65267 2.89091C7.23014 3.17387 5.92347 3.8723 4.89788 4.89789C3.8723 5.92347 3.17386 7.23015 2.89091 8.65268C2.60795 10.0752 2.75317 11.5497 3.30821 12.8897C3.86326 14.2297 4.80319 15.375 6.00915 16.1808C7.21511 16.9866 8.63294 17.4167 10.0833 17.4167C11.7119 17.4187 13.2939 16.8731 14.575 15.8675L17.6825 18.9842C17.7677 19.0701 17.8691 19.1383 17.9808 19.1848C18.0925 19.2314 18.2123 19.2553 18.3333 19.2553C18.4543 19.2553 18.5742 19.2314 18.6859 19.1848C18.7976 19.1383 18.8989 19.0701 18.9842 18.9842C19.0701 18.899 19.1383 18.7976 19.1848 18.6859C19.2314 18.5742 19.2553 18.4543 19.2553 18.3333C19.2553 18.2123 19.2314 18.0925 19.1848 17.9808C19.1383 17.8691 19.0701 17.7677 18.9842 17.6825ZM4.58333 10.0833C4.58333 8.99554 4.9059 7.93217 5.51025 7.0277C6.1146 6.12323 6.97358 5.41828 7.97857 5.002C8.98357 4.58572 10.0894 4.4768 11.1563 4.68902C12.2232 4.90124 13.2032 5.42506 13.9724 6.19425C14.7416 6.96344 15.2654 7.94345 15.4777 9.01034C15.6899 10.0772 15.581 11.1831 15.1647 12.1881C14.7484 13.1931 14.0434 14.0521 13.139 14.6564C12.2345 15.2608 11.1711 15.5833 10.0833 15.5833C8.62464 15.5833 7.22569 15.0039 6.19424 13.9724C5.16279 12.941 4.58333 11.542 4.58333 10.0833Z"
                      fill="#05222E"
                    />
                  </svg>
                  <input
                    className="w-[95%] focus:outline-none h-[18px] placeholder:text-[14px] placeholder:font-[400] pl-[8px]"
                    type="text"
                    placeholder="Search"
                  />
                </div>
                <div className="not_setting flex gap-[7px]">
                  <button
                    onClick={() => setNotification(!notification)}
                    className="notification hover:bg-gray-400 transition-all relative duration-500 ease-in-out  w-[37px] h-[37px] justify-center items-center flex rounded-full bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_650_816)">
                        <path
                          d="M14.2631 11.2754C13.2551 10.4233 12.6771 9.17798 12.6771 7.85864V6C12.6771 3.65405 10.9344 1.71204 8.67712 1.38672V0.666626C8.67712 0.297974 8.37842 0 8.01038 0C7.64246 0 7.34375 0.297974 7.34375 0.666626V1.38672C5.08569 1.71204 3.34375 3.65405 3.34375 6V7.85864C3.34375 9.17798 2.76575 10.4233 1.75171 11.2806C1.49243 11.5027 1.34375 11.8253 1.34375 12.1666C1.34375 12.8101 1.86707 13.3334 2.51038 13.3334H13.5104C14.1538 13.3334 14.6771 12.8101 14.6771 12.1666C14.6771 11.8253 14.5284 11.5027 14.2631 11.2754Z"
                          fill="#05222E"
                        />
                        <path
                          d="M8.01038 16C9.21777 16 10.2278 15.1393 10.4597 14H5.56104C5.79309 15.1393 6.8031 16 8.01038 16Z"
                          fill="#05222E"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_650_816">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="w-2  h-2 absolute top-[2px] right-1 rounded-full bg-orange-400"></span>
                    {/* //====================================== TODO:Notification dropdown menu */}
                    {notification && (
                      <motion.div
                        initial={{ opacity: 0.4, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0.4, y: -10 }}
                        transition={{
                          duration: 0.2,
                          delay: 0.1,
                          ease: "linear",
                        }}
                        className="absolute border overflow-hidden p-[18px] w-[325px] h-[580px] bg-white z-[9999999999] shadow-lg right-[10px]  top-[35px] rounded-[10px]"
                      >
                        <div className="flex items-center justify-between header">
                          <p className="font-[500]">Notifications</p>
                          <a
                            className="text-[10px] inline-block underline-2"
                            href=""
                          >
                            Mark all as read
                          </a>
                        </div>
                        <div className="Navbar border-b flex justify-between items-end  w-full h-[44px]">
                          <div className="flex items-center group_button ">
                            <button className="text-[12px]  flex gap-[6px] p-[7px] items-center justify-center">
                              All
                              <span className="h-[14px]  flex justify-center items-center rounded-[5px] bg-gray-900 w-[18px] text-white">
                                8
                              </span>
                            </button>
                            <button className="text-[12px]  flex gap-[10px] p-[7px] items-center justify-center">
                              Following <span>6</span>
                            </button>
                            <button className="text-[12px]  flex gap-[6px] p-[7px] items-center justify-center">
                              Archive
                            </button>
                          </div>
                          <button className="text-[12px] h-[30px] flex gap-[6px] items-center justify-center p-[3px]">
                            <svg
                              width="13"
                              height=""
                              viewBox="0 0 1024 1024"
                              fill="#000000"
                              className="icon"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M825.6 647.2l-6.4 12.8 8 12 78.4 116 3.2-31.2-139.2 135.2 29.6-3.2-127.2-76-10.4-6.4-11.2 4.8c-8 3.2-16 6.4-24.8 9.6l-13.6 4.8-3.2 13.6-28 131.2 24-19.2H408l24 18.4-34.4-137.6-3.2-12-12-4.8c-7.2-3.2-14.4-5.6-21.6-9.6l-12-5.6-11.2 7.2-120 76.8 30.4 3.2-139.2-136 4 30.4 77.6-124 7.2-11.2-5.6-12c-4-8-7.2-16.8-9.6-24.8l-4.8-12.8-13.6-2.4-134.4-28 19.2 24v-192l-18.4 24 141.6-33.6 12-3.2 4.8-12c3.2-8 7.2-16.8 11.2-24.8l6.4-12.8-8-12-73.6-110.4-3.2 31.2 138.4-136.8-30.4 4L352 186.4l10.4 6.4 11.2-4.8c6.4-2.4 13.6-5.6 20-8l12.8-4 3.2-12.8 32.8-132.8-24 18.4H616l-24-19.2 28.8 136 2.4 12.8 12.8 4.8c10.4 4 20 8 29.6 12.8l12 5.6 11.2-7.2 113.6-71.2-28.8-3.2 140 134.4-4-30.4-76 120-7.2 11.2 5.6 12c3.2 8 7.2 16.8 9.6 24.8l4 12.8 12.8 3.2 134.4 32-18.4-24v192l19.2-24-141.6 28.8-12.8 2.4-4.8 12c-2.4 6.4-5.6 13.6-8.8 20z m32-11.2l4.8 24 141.6-28.8 19.2-4V396l-18.4-4.8-134.4-32-5.6 24 23.2-8c-3.2-9.6-7.2-19.2-11.2-28.8l-22.4 9.6 20.8 12.8 76-120 10.4-16.8-14.4-13.6-140-134.4L793.6 72l-16 10.4L664 153.6l12.8 20.8L688 152c-11.2-5.6-22.4-10.4-34.4-14.4L644.8 160l24-4.8-28.8-136-4-19.2H400.8l-4.8 18.4-32.8 132.8 24 5.6-8-23.2c-8 2.4-15.2 5.6-23.2 8.8l9.6 22.4 12.8-20.8-123.2-73.6-16-9.6-13.6 13.6-138.4 136.8-14.4 14.4 11.2 16.8L157.6 352l20-13.6-21.6-10.4c-4.8 9.6-8.8 18.4-12.8 28l22.4 9.6-5.6-24-141.6 33.6-18.4 4v231.2l19.2 4 135.2 27.2 4.8-24-23.2 8c3.2 9.6 7.2 19.2 11.2 28.8l22.4-9.6-20.8-12.8-77.6 124-10.4 16.8 14.4 13.6 139.2 135.2 13.6 13.6 16-10.4 120-76.8-12.8-20.8-10.4 22.4c8 4 16.8 7.2 24.8 10.4l8.8-22.4-24 5.6 34.4 137.6 4.8 18.4H624.8l4-19.2 28-131.2-24-4.8 8 23.2c9.6-3.2 18.4-6.4 28-10.4l-9.6-22.4-12.8 20.8 127.2 76 16 9.6 13.6-12.8 139.2-136 14.4-14.4-11.2-16.8-78.4-116-20 13.6 21.6 11.2c4-8 8-16 11.2-24l-22.4-9.6z"
                                fill=""
                              />
                              <path
                                d="M512 681.6c-100 0-181.6-81.6-181.6-181.6S412 318.4 512 318.4 693.6 400 693.6 500 612 681.6 512 681.6z m0-315.2c-73.6 0-133.6 60-133.6 133.6S438.4 633.6 512 633.6s133.6-60 133.6-133.6S585.6 366.4 512 366.4z"
                                fill=""
                              />
                            </svg>
                          </button>
                        </div>
                        <ul className="w-full space-y-[2px]  h-[475px] mt-[3px] overflow-y-scroll scroll">
                          <li className=" h-[44px] hover:bg-gray-100 transition-all ease-in-out duration-500 bg-orange-50">
                            <div className="w-full h-full flex items-center gap-[10px]">
                              <div className="w-6 h-6 overflow-hidden rounded-sm avatar">
                                <img
                                  className="w-full h-full"
                                  src="https://www.w3schools.com/howto/img_avatar.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center message_datials">
                                <h4 className="text-[12px] font-[500]">
                                  Jess Raddon Mention you in Tennnis List
                                </h4>
                                <span className="text-[10px]">
                                  4h ago . Hobby List
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className=" h-[44px] hover:bg-gray-100 transition-all ease-in-out duration-500 bg-orange-50">
                            <div className="w-full h-full flex items-center gap-[10px]">
                              <div className="w-6 h-6 overflow-hidden rounded-sm avatar">
                                <img
                                  className="w-full h-full"
                                  src="https://www.w3schools.com/howto/img_avatar.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center message_datials">
                                <h4 className="text-[12px] font-[500]">
                                  Jess Raddon Mention you in Tennnis List
                                </h4>
                                <span className="text-[10px]">
                                  4h ago . Hobby List
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className=" h-[44px] hover:bg-gray-100 transition-all ease-in-out duration-500 bg-orange-50">
                            <div className="w-full h-full flex items-center gap-[10px]">
                              <div className="w-6 h-6 overflow-hidden rounded-sm avatar">
                                <img
                                  className="w-full h-full"
                                  src="https://www.w3schools.com/howto/img_avatar.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center message_datials">
                                <h4 className="text-[12px] font-[500]">
                                  Jess Raddon Mention you in Tennnis List
                                </h4>
                                <span className="text-[10px]">
                                  4h ago . Hobby List
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className=" h-[44px] hover:bg-gray-100 transition-all ease-in-out duration-500">
                            <div className="w-full h-full flex items-center gap-[10px]">
                              <div className="w-6 h-6 overflow-hidden rounded-sm avatar">
                                <img
                                  className="w-full h-full"
                                  src="https://www.w3schools.com/howto/img_avatar.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center message_datials">
                                <h4 className="text-[12px] font-[500]">
                                  Jess Raddon Mention you in Tennnis List
                                </h4>
                                <span className="text-[10px]">
                                  4h ago . Hobby List
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className=" h-[44px] hover:bg-gray-100 transition-all ease-in-out duration-500">
                            <div className="w-full h-full flex items-center gap-[10px]">
                              <div className="w-6 h-6 overflow-hidden rounded-sm avatar">
                                <img
                                  className="w-full h-full"
                                  src="https://www.w3schools.com/howto/img_avatar.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center message_datials">
                                <h4 className="text-[12px] font-[500]">
                                  Jess Raddon Mention you in Tennnis List
                                </h4>
                                <span className="text-[10px]">
                                  4h ago . Hobby List
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className=" h-[44px] hover:bg-gray-100 transition-all ease-in-out duration-500">
                            <div className="w-full h-full flex items-center gap-[10px]">
                              <div className="w-6 h-6 overflow-hidden rounded-sm avatar">
                                <img
                                  className="w-full h-full"
                                  src="https://www.w3schools.com/howto/img_avatar.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center message_datials">
                                <h4 className="text-[12px] font-[500]">
                                  Jess Raddon Mention you in Tennnis List
                                </h4>
                                <span className="text-[10px]">
                                  4h ago . Hobby List
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className=" h-[44px] hover:bg-gray-100 transition-all ease-in-out duration-500">
                            <div className="w-full h-full flex items-center gap-[10px]">
                              <div className="w-6 h-6 overflow-hidden rounded-sm avatar">
                                <img
                                  className="w-full h-full"
                                  src="https://www.w3schools.com/howto/img_avatar.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center message_datials">
                                <h4 className="text-[12px] font-[500]">
                                  Jess Raddon Mention you in Tennnis List
                                </h4>
                                <span className="text-[10px]">
                                  4h ago . Hobby List
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className=" h-[44px] hover:bg-gray-100 transition-all ease-in-out duration-500">
                            <div className="w-full h-full flex items-center gap-[10px]">
                              <div className="w-6 h-6 overflow-hidden rounded-sm avatar">
                                <img
                                  className="w-full h-full"
                                  src="https://www.w3schools.com/howto/img_avatar.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center message_datials">
                                <h4 className="text-[12px] font-[500]">
                                  Jess Raddon Mention you in Tennnis List
                                </h4>
                                <span className="text-[10px]">
                                  4h ago . Hobby List
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className=" h-[44px] hover:bg-gray-100 transition-all ease-in-out duration-500">
                            <div className="w-full h-full flex items-center gap-[10px]">
                              <div className="w-6 h-6 overflow-hidden rounded-sm avatar">
                                <img
                                  className="w-full h-full"
                                  src="https://www.w3schools.com/howto/img_avatar.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center message_datials">
                                <h4 className="text-[12px] font-[500]">
                                  Jess Raddon Mention you in Tennnis List
                                </h4>
                                <span className="text-[10px]">
                                  4h ago . Hobby List
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className=" h-[44px] hover:bg-gray-100 transition-all ease-in-out duration-500">
                            <div className="w-full h-full flex items-center gap-[10px]">
                              <div className="w-6 h-6 overflow-hidden rounded-sm avatar">
                                <img
                                  className="w-full h-full"
                                  src="https://www.w3schools.com/howto/img_avatar.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center message_datials">
                                <h4 className="text-[12px] font-[500]">
                                  Jess Raddon Mention you in Tennnis List
                                </h4>
                                <span className="text-[10px]">
                                  4h ago . Hobby List
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className=" h-[44px] hover:bg-gray-100 transition-all ease-in-out duration-500">
                            <div className="w-full h-full flex items-center gap-[10px]">
                              <div className="w-6 h-6 overflow-hidden rounded-sm avatar">
                                <img
                                  className="w-full h-full"
                                  src="https://www.w3schools.com/howto/img_avatar.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center message_datials">
                                <h4 className="text-[12px] font-[500]">
                                  Jess Raddon Mention you in Tennnis List
                                </h4>
                                <span className="text-[10px]">
                                  4h ago . Hobby List
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className=" h-[44px] hover:bg-gray-100 transition-all ease-in-out duration-500">
                            <div className="w-full h-full flex items-center gap-[10px]">
                              <div className="w-6 h-6 overflow-hidden rounded-sm avatar">
                                <img
                                  className="w-full h-full"
                                  src="https://www.w3schools.com/howto/img_avatar.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center message_datials">
                                <h4 className="text-[12px] font-[500]">
                                  Jess Raddon Mention you in Tennnis List
                                </h4>
                                <span className="text-[10px]">
                                  4h ago . Hobby List
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className=" h-[44px] hover:bg-gray-100 transition-all ease-in-out duration-500">
                            <div className="w-full h-full flex items-center gap-[10px]">
                              <div className="w-6 h-6 overflow-hidden rounded-sm avatar">
                                <img
                                  className="w-full h-full"
                                  src="https://www.w3schools.com/howto/img_avatar.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center message_datials">
                                <h4 className="text-[12px] font-[500]">
                                  Jess Raddon Mention you in Tennnis List
                                </h4>
                                <span className="text-[10px]">
                                  4h ago . Hobby List
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className=" h-[44px] hover:bg-gray-100 transition-all ease-in-out duration-500">
                            <div className="w-full h-full flex items-center gap-[10px]">
                              <div className="w-6 h-6 overflow-hidden rounded-sm avatar">
                                <img
                                  className="w-full h-full"
                                  src="https://www.w3schools.com/howto/img_avatar.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center message_datials">
                                <h4 className="text-[12px] font-[500]">
                                  Jess Raddon Mention you in Tennnis List
                                </h4>
                                <span className="text-[10px]">
                                  4h ago . Hobby List
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className=" h-[44px] hover:bg-gray-100 transition-all ease-in-out duration-500">
                            <div className="w-full h-full flex items-center gap-[10px]">
                              <div className="w-6 h-6 overflow-hidden rounded-sm avatar">
                                <img
                                  className="w-full h-full"
                                  src="https://www.w3schools.com/howto/img_avatar.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center message_datials">
                                <h4 className="text-[12px] font-[500]">
                                  Jess Raddon Mention you in Tennnis List
                                </h4>
                                <span className="text-[10px]">
                                  4h ago . Hobby List
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className=" h-[44px] hover:bg-gray-100 transition-all ease-in-out duration-500">
                            <div className="w-full h-full flex items-center gap-[10px]">
                              <div className="w-6 h-6 overflow-hidden rounded-sm avatar">
                                <img
                                  className="w-full h-full"
                                  src="https://www.w3schools.com/howto/img_avatar.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center message_datials">
                                <h4 className="text-[12px] font-[500]">
                                  Jess Raddon Mention you in Tennnis List
                                </h4>
                                <span className="text-[10px]">
                                  4h ago . Hobby List
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </button>
                  <button className="setting hover:bg-gray-400 transition-all duration-500 ease-in-out w-[37px] h-[37px] justify-center items-center flex rounded-full bg-gray-200 scale-105">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_650_819)">
                        <path
                          d="M14.605 5.92024C14.3132 5.87786 14.0348 5.77021 13.7904 5.6053C13.546 5.44039 13.342 5.22248 13.1935 4.96778C13.045 4.71309 12.9559 4.42818 12.9328 4.13427C12.9097 3.84035 12.9531 3.54501 13.06 3.27024C13.1279 3.0906 13.1379 2.89421 13.0886 2.7086C13.0393 2.52299 12.9331 2.35747 12.785 2.23524C12.131 1.68607 11.3866 1.25466 10.585 0.960238C10.4025 0.89243 10.2032 0.883958 10.0155 0.936029C9.8279 0.9881 9.66148 1.09806 9.54 1.25024C9.35713 1.48406 9.12343 1.67318 8.8566 1.80324C8.58978 1.93331 8.29683 2.0009 8 2.0009C7.70316 2.0009 7.41022 1.93331 7.14339 1.80324C6.87656 1.67318 6.64286 1.48406 6.46 1.25024C6.33851 1.09806 6.17209 0.9881 5.98445 0.936029C5.79682 0.883958 5.59753 0.89243 5.415 0.960238C4.67483 1.23206 3.98279 1.62028 3.365 2.11024C3.20927 2.23352 3.0971 2.40342 3.04491 2.59506C2.99273 2.78671 3.00327 2.99002 3.075 3.17524C3.19037 3.45728 3.23804 3.76244 3.21418 4.06624C3.19032 4.37003 3.09559 4.66401 2.9376 4.92458C2.7796 5.18515 2.56273 5.40507 2.30439 5.56669C2.04605 5.72831 1.75343 5.82714 1.45 5.85524C1.253 5.8763 1.06797 5.96006 0.922151 6.09418C0.776331 6.22829 0.677426 6.40569 0.639996 6.60024C0.546894 7.06109 0.499996 7.53008 0.499996 8.00024C0.499311 8.39385 0.531086 8.78685 0.594996 9.17524C0.626803 9.37602 0.723869 9.56074 0.871186 9.70083C1.0185 9.84091 1.20786 9.92857 1.41 9.95024C1.72009 9.97934 2.01871 10.0823 2.28085 10.2505C2.54299 10.4187 2.76103 10.6472 2.91671 10.917C3.0724 11.1867 3.1612 11.4899 3.17569 11.801C3.19018 12.1121 3.12993 12.4222 3 12.7052C2.91496 12.8894 2.89387 13.0966 2.94006 13.2941C2.98626 13.4916 3.09711 13.6679 3.255 13.7952C3.90505 14.3344 4.64228 14.7588 5.435 15.0502C5.53637 15.0854 5.64273 15.1039 5.75 15.1052C5.89708 15.1049 6.04194 15.0693 6.17244 15.0015C6.30294 14.9336 6.41526 14.8355 6.5 14.7152C6.6782 14.4556 6.91709 14.2434 7.19591 14.097C7.47474 13.9506 7.78508 13.8745 8.1 13.8752C8.40512 13.8756 8.70594 13.9472 8.97851 14.0844C9.25107 14.2215 9.48785 14.4204 9.67 14.6652C9.79115 14.8281 9.96276 14.9463 10.1581 15.0015C10.3534 15.0566 10.5615 15.0457 10.75 14.9702C11.4748 14.6785 12.1496 14.2753 12.75 13.7752C12.9008 13.6506 13.0082 13.4813 13.0567 13.2917C13.1052 13.1021 13.0924 12.902 13.02 12.7202C12.9024 12.4418 12.8511 12.1399 12.8702 11.8383C12.8893 11.5366 12.9783 11.2436 13.13 10.9822C13.2818 10.7209 13.4922 10.4984 13.7447 10.3323C13.9972 10.1662 14.2849 10.0611 14.585 10.0252C14.7796 9.99833 14.9606 9.91017 15.1017 9.77353C15.2428 9.63689 15.3368 9.45886 15.37 9.26524C15.4503 8.84819 15.4938 8.4249 15.5 8.00024C15.5001 7.55231 15.4582 7.10536 15.375 6.66524C15.3412 6.47589 15.2487 6.30199 15.1104 6.16825C14.9722 6.03451 14.7954 5.94773 14.605 5.92024ZM10.5 8.00024C10.5 8.49469 10.3534 8.97804 10.0787 9.38916C9.80397 9.80029 9.41352 10.1207 8.9567 10.3099C8.49989 10.4992 7.99722 10.5487 7.51227 10.4522C7.02732 10.3557 6.58186 10.1176 6.23223 9.76801C5.8826 9.41837 5.6445 8.97292 5.54803 8.48796C5.45157 8.00301 5.50108 7.50035 5.6903 7.04353C5.87952 6.58671 6.19995 6.19627 6.61107 5.92156C7.02219 5.64686 7.50554 5.50024 8 5.50024C8.66304 5.50024 9.29892 5.76363 9.76776 6.23247C10.2366 6.70131 10.5 7.3372 10.5 8.00024Z"
                          fill="#05222E"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_650_819">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* =================================================== */}
            <div className="w-full py-3 mt-5 border-b-2">
              <h5 className="text-[20px] font-['Lato']  font-[900] leading-[18px] tracking-[.2px] text-[#05222E]">
                Companies
              </h5>
            </div>
            {/* ========================== all company */}

            <div className="grid w-full grid-cols-3 mt-5">
              {company?.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="w-[420px] h-[500px] border rounded-lg p-5"
                  >
                    <div className="flex items-end gap-x-4 ">
                      {item?.companyLogo ? (
                        <img
                          className="h-[50px] rounded-md w-[100px] object-cover"
                          src={item?.companyLogo}
                        />
                      ) : (
                        <img
                          className="h-[50px] w-[100px] object-cover"
                          src="https://s3.us-east-2.amazonaws.com/digitalhealth.prod/DigitalHealth/1624343086078_default_company_image.jpg"
                        />
                      )}

                      <p className="font-['Lato']  font-[900] text-[18px] capitalize">
                        {item?.companyName}
                      </p>
                    </div>

                    <hr className="my-2" />
                    <div className="flex flex-col gap-y-3">
                      <p className="text-[12px] font-['Lato']  font-[900] leading-[18px] tracking-[.2px] text-[#05222E]">
                        Contact: {item.contact}
                      </p>
                      <p className="text-[12px] font-['Lato']  font-[900] leading-[18px] tracking-[.2px] text-[#05222E]">
                        Email: {item.email}
                      </p>
                      <p className="text-[12px] font-['Lato']  font-[900] leading-[18px] tracking-[.2px] text-[#05222E]">
                        Location: {item.location}
                      </p>
                      <p className="text-[14px] font-['Lato']  font-[900] leading-[18px] tracking-[.2px] text-[#05222E]">
                        About
                      </p>
                      <hr />
                      <p className="text-[14px] font-['Lato'] truncate overflow-clip font-[400] leading-[18px] tracking-[.2px] text-[#05222E]">
                        {item.desc}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex justify-between p-2 border rounded-md tutorial bg-cyan-100">
                        <p className="font-['Lato'] font-bold">Tutorial</p>{" "}
                        <span className="font-['Lato'] font-[500] block">
                          0
                        </span>
                      </div>
                      <div className="flex justify-between p-2 border rounded-md course bg-cyan-100">
                        <p className="font-['Lato'] font-bold">Course</p>{" "}
                        <span className="font-['Lato'] font-[500] block">
                          0
                        </span>
                      </div>
                    </div>
                    <div className="w-full overflow-hidden">
                      <section className="p-2 mt-2 text-gray-600 border rounded-md body-font">
                        <div className="container px-1 py-2 mx-auto">
                          <div className="flex ">
                            <div className="p-1">
                              <div className="border-gray-200 border-opacity-50 ">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-100">
                                  <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="w-8 h-8"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                  </svg>
                                </div>
                                <div className="">
                                  <h2 className="mb-1 text-lg font-medium text-gray-900 title-font">
                                    Shooting Stars
                                  </h2>
                                  <p className="truncate overflow-clip">
                                    Blue bottle crucifix vinyl post-ironic four
                                    dollar toast vegan taxidermy.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div className="flex items-center justify-center mt-auto mr-3">
                      {loginInSeller.role === "super_admin" && (
                        <div className="flex items-center justify-center w-full h-auto p-1 mt-2 mb-auto rounded-md gap-x-4 ">
                          <div className="px-2 py-1 font-bold capitalize transition-all duration-500 ease-in-out border rounded-md hover:text-white bg-cyan-100 hover:bg-gray-700 ">
                            <input
                              onClick={() =>
                                handleCompanyStatus(item?._id, item?.status)
                              }
                              className=""
                              checked={item?.status}
                              type="checkbox"
                            />
                          </div>
                          <button
                            onClick={() => handleEdit(item?._id)}
                            className="px-2 py-1 font-bold capitalize transition-all duration-500 ease-in-out border rounded-md hover:text-white bg-cyan-100 hover:bg-gray-700 "
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item?._id)}
                            className="px-2 py-1 font-bold capitalize transition-all duration-500 ease-in-out border rounded-md hover:text-white bg-cyan-100 hover:bg-gray-700 "
                          >
                            Delete
                          </button>
                        </div>
                      )}
                      <Link
                        className="flex items-center justify-center w-8 h-8 mt-2 border rounded-md hover:bg-gray-200 "
                        to={`/company/${item?._id}`}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          fill="none"
                          stroke="#000000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        >
                          <path d="m1.75 8s2-4.25 6.25-4.25 6.25 4.25 6.25 4.25-2 4.25-6.25 4.25-6.25-4.25-6.25-4.25z" />
                          <circle cx="8" cy="8" r="1.25" fill="#000000" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      </motion.div>
    </>
  );
};

export default Company;
