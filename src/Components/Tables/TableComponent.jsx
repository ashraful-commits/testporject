import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  getAllProject,
  permissionUpdate,
  projectStatusUpdate,
  updateCommissionRate,
  updateSalesCommissionRate,
} from "../../Features/Project/ProjectApi";
import { setMessageEmpty } from "../../Features/Project/ProjectSlice";
import Model from "../Model/Model";
import swal from "sweetalert";
import LoadingSpinner from "../LoadingSpin";
import { getAllSellerState } from "../../Features/Seller/SellerSlice";

import { Link } from "react-router-dom";
import { Toastify } from "../../Utils/Tostify";
import { LoggedInSeller } from "../../Features/Seller/SellerApi";
import { motion } from "framer-motion";
import { getAllProjectState } from "../../Features/Project/ProjectSlice";

const TableComponent = ({ sellerId, input }) => {
  const { project, loader, error, message } = useSelector(getAllProjectState);
  const { loginInSeller, loader: sellerLoader } =
    useSelector(getAllSellerState);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  //======================================================================================edit model
  const [editModel, setEditModel] = useState(false);
  //========================================================================================== singleData
  const [singleData, setSingleData] = useState({});
  //========================================================================================set limit
  const [limit, setLimit] = useState(7);
  //========================================================================================set limit
  const [dropdown, setDropdown] = useState(false);
  //=======================================================================================dropId
  const [dropId, setDropId] = useState(null);
  //================================all ref
  const dropdownRef = useRef();
  //========================================= handledrop down men
  const handleDropdown = (id) => {
    setDropdown(!dropdown);
    setDropId(id);
  };
  //===================================================================================handle edit
  const handleEdit = (id) => {
    setEditModel(true);
    setSingleData(project.find((item) => item._id == id));
  };
  //===============================================================================handle edit
  const handleSellerEdit = (id) => {
    setEditModel(true);
    setSingleData(loginInSeller?.projects?.find((item) => item._id == id));
  };
  //===============================================================================handle delete
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProject(id)).then(() => {
          dispatch(LoggedInSeller());
        });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  //======================================================================================  handle limit
  const handleLimit = (e) => {
    setLimit(e.target.value);
  };
  //===============================================================================handle permission
  const handlePermission = (id, status) => {
    dispatch(permissionUpdate({ id, status })).then(() => {
      dispatch(LoggedInSeller());
    });
  };
  //===============================================================================handle permission
  const handleProjectStatus = (id, projectStatus) => {
    dispatch(projectStatusUpdate({ id, projectStatus })).then(() => {
      dispatch(LoggedInSeller());
    });
  };
  //============================================================================== handle commission
  const handleCommission = (id, commissionRate) => {
    dispatch(updateCommissionRate({ id, commissionRate })).then(() => {
      dispatch(LoggedInSeller());
    });
  };
  //=============================================================================handle sale commission
  const handleSalesCommission = (id, salesCommissionRate) => {
    dispatch(updateSalesCommissionRate({ id, salesCommissionRate })).then(
      () => {
        dispatch(LoggedInSeller());
      }
    );
  };
  //===================================================================================get user client
  useEffect(() => {
    dispatch(getAllProject());
  }, [dispatch, sellerId, currentPage, limit, loginInSeller]);
  //====================================================================================next page
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  //===================================================================================prev page
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  //====================================================================================== toastify
  useEffect(() => {
    if (error) {
      Toastify(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      Toastify(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [message, error, dispatch]);
  //===================================window dorpdown menu
  const handleWindowDropdwon = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target.value)) {
      setDropdown(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleWindowDropdwon);
    return () => window.removeEventListener("click", handleWindowDropdwon);
  }, []);
  //=========================================================================return
  return (
    <div ref={dropdownRef}>
      {/* //=============================================edit modle  */}
      {editModel && (
        <Model
          setClient={setEditModel}
          title="Edit Project"
          singleData={singleData}
        />
      )}
      <table className="w-full  min-h-[490px] rounded-md ">
        {/* //======================================table header  */}
        <thead>
          <tr className="w-full min-h-[1.875rem] h-full  grid pr-6 grid-flow-col justify-between border-b py-2 text-center">
            <th className="text-[.8125rem] font-['work_sans'] w-[30px]  text-start font-[400]"></th>
            <th className="text-[.8125rem] font-['work_sans'] -ml-[3rem] w-[150px]  text-start font-[400]">
              Company Name
            </th>
            <th className="text-[.8125rem] font-['work_sans'] -ml-[4rem] w-[150px]  text-start font-[400]">
              Client Name
            </th>
            <th className="text-[.8125rem] w-[100px] font-['work_sans'] text-start font-[400]">
              Data Signed
            </th>
            <th className="text-[.8125rem] font-['work_sans'] w-[120px]  text-start font-[400]">
              Contact Amount
            </th>
            {loginInSeller?.role === "user" && (
              <th className="text-[.8125rem] font-['work_sans'] w-[100px]  text-start font-[400]">
                Commission
              </th>
            )}
            {loginInSeller?.role === "super_admin" && (
              <th className="text-[.8125rem] font-['work_sans'] w-[100px]  text-start font-[400]">
                Project status
              </th>
            )}
            {loginInSeller?.role === "admin" && (
              <th className="text-[.8125rem] font-['work_sans'] w-[120px]  text-start font-[400]">
                commission rate
              </th>
            )}
            {loginInSeller?.role === "super_admin" && (
              <th className="text-[.8125rem] font-['work_sans'] w-[120px]  text-start font-[400]">
                commission rate
              </th>
            )}

            {loginInSeller?.role === "super_admin" && (
              <th className="text-[.8125rem] font-['work_sans'] w-[80px]  text-start font-[400]">
                Permission
              </th>
            )}
            <th className="text-[.8125rem] font-['work_sans'] w-[100px]  text-start font-[400]">
              Client source
            </th>
            <th className="text-[.8125rem] w-[50px] font-['work_sans'] flex justify-end items-start  font-[400]"></th>
          </tr>
        </thead>
        {/* //==========================================table body  */}
        <tbody className="relative w-full h-full border">
          {(loader || sellerLoader) && (
            <motion.div
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.4 }}
              transition={{ duration: 1.3 }}
              className="absolute top-0 left-0 w-full h-full bg-cyan-700 bg-opacity-20"
            >
              <div className="w-full absolute h-full top-[45%]">
                <LoadingSpinner />
              </div>
            </motion.div>
          )}
          {loginInSeller?.role === "super_admin" ? (
            project?.length > 0 ? (
              project
                .filter((project) => {
                  return (
                    (input?.text
                      ? project?.clientId?.clientName
                          ?.toLowerCase()
                          .includes(input?.text?.toLowerCase())
                      : true) &&
                    (input?.startDate
                      ? new Date(project?.date) >= new Date(input?.startDate)
                      : true) &&
                    (input?.endDate
                      ? new Date(project?.date) <= new Date(input?.endDate)
                      : true) &&
                    (input?.status
                      ? project?.projectStatus === input?.status
                      : true) &&
                    (input?.companyName
                      ? project?.company?.companyName === input?.companyName
                      : true)
                  );
                })
                ?.map((item, index) => {
                  return (
                    <motion.tr
                      initial={{ y: -15, opacity: 0.1 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 2,
                        type: "spring",
                        stiffness: 200,
                        ease: [0.17, 0.67, 0.83, 0.67],
                        delay: `.${index}`,
                      }}
                      key={index}
                      className={`${
                        loginInSeller?._id === item?.sellerId?._id
                          ? "bg-gray-100 "
                          : ""
                      } w-full grid grid-flow-col  transition-all duration-500 ease-in-out justify-between items-center border-b py-2 h-[3.4375rem] relative text-center`}
                    >
                      <td className=" items-center text-[.8125rem] truncate text-start font-[500] w-[30px]  text-cyan-700 ">
                        <span className="text-[.8125rem] font-[500] px-[1rem] block text-[#D9D9D9]">
                          {index + 1}.
                        </span>{" "}
                      </td>
                      <td className="w-[150px] px-2 overflow-hidden -ml-14 items-center flex gap-[.3125rem] relative">
                        <Link to={`/${item._id}`}>
                          <span className="  capitalize truncate text-[13px] font-[500] text-cyan-700  w-[70px]">
                            {item?.company?.companyName}
                          </span>
                        </Link>
                      </td>
                      <td className="w-[150px]  -ml-[4rem] overflow-hidden items-center flex gap-[.3125rem] relative">
                        <Link to={`/${item._id}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="26"
                            viewBox="0 0 32 26"
                            fill="none"
                          >
                            <path
                              d="M17.3825 4.33948L14.3154 1.00804C13.7253 0.368794 12.8894 0 12.0165 0H3.12246C1.39527 0 0 1.40142 0 3.12246V22.8775C0 24.5986 1.39527 26 3.12246 26H28.348C30.069 26 31.4704 24.6047 31.4704 22.8775V7.46194C31.4704 5.7409 30.0752 4.33948 28.348 4.33948H17.3825Z"
                              fill="#0891b2"
                            />
                          </svg>
                        </Link>

                        {item?.clientId?.clientAvatar ? (
                          <Link to={`/${item?._id}`}>
                            <img
                              className="w-[1.25rem] absolute left-3 top-2 h-[1.25rem] border-[.125rem] border-white rounded-full"
                              src={item?.clientId?.clientAvatar}
                            />
                          </Link>
                        ) : (
                          <Link to={`/${item?._id}`}>
                            <img
                              className="w-[1.25rem] absolute left-3 top-2 h-[1.25rem] border-[.125rem] border-white rounded-full"
                              src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                            />
                          </Link>
                        )}

                        <span className="  capitalize truncate text-[13px] font-[500] text-cyan-700  w-[100px]">
                          {item?.clientId?.clientName}
                        </span>
                      </td>
                      <td className=" items-center text-[.8125rem] truncate text-start font-[400] w-[100px] text-[#3A3A49]">
                        {item?.date}
                      </td>
                      <td className="w-[120px]  items-center flex text-[.8125rem] text-start font-[400] text-[#3A3A49] gap-[.3125rem]">
                        <div
                          className="bg-gray-200 h-[.375rem] w-[50%] "
                          role="progressbar"
                          aria-label="progressbar"
                          aria-valuemin="0"
                          aria-valuemax="10000"
                        >
                          <div
                            className="h-full bg-cyan-700 "
                            style={{
                              width: `${((100 * item?.amount) / 100000).toFixed(
                                2
                              )}%`,
                            }}
                          />
                        </div>
                        ${item?.amount && item?.amount}
                      </td>
                      {loginInSeller?.role === "user" && (
                        <td className="w-[100px]  items-center text-[.8125rem] truncate text-start font-[600] text-[#3A3A49]">
                          $
                          {item?.amount &&
                            ((item?.amount * 100) / 15 / 100).toFixed(2)}
                        </td>
                      )}

                      {loginInSeller?.role === "super_admin" && (
                        <td
                          className={`text-[.8125rem] w-[100px] flex justify-start items-center font-[400] text-[#3A3A49] `}
                        >
                          <button>
                            <select
                              className={` focus:outline-none w-[100px] ${
                                item?.projectStatus == "pending" &&
                                "text-[#F2994A] border-[#F2994A] border-[.0187rem] bg-[#FFF8F2] rounded-[2.8125rem] text-[.625rem] h-[1.125rem] w-[3.75rem]   "
                              } ${
                                item?.projectStatus == "complete" &&
                                "text-[#FFF] border-[.0187rem] bg-[#878790] rounded-[2.8125rem] text-[.625rem] h-[1.125rem] w-[3.75rem]   "
                              }  ${
                                item?.projectStatus == "on hold" &&
                                "text-[#F95959] border-[#F95959] border-[.0187rem] bg-[#FEE] rounded-[2.8125rem] text-[.625rem] h-[1.125rem] w-[3.75rem]   "
                              }   ${
                                item?.projectStatus == "on going" &&
                                "text-[#3AAE54] border-[#3AAE54] border-[.0187rem] bg-[#E7FBF0] rounded-[2.8125rem] text-[.625rem] h-[1.125rem] w-[3.75rem]   "
                              }`}
                              name="projectType"
                              id=""
                              value={item.projectStatus}
                              onChange={(e) =>
                                handleProjectStatus(item._id, e.target.value)
                              }
                            >
                              <option className="text-gray-500 " value="....">
                                ...select...
                              </option>
                              <option
                                className="text-gray-500 "
                                value="pending"
                              >
                                pending
                              </option>
                              <option
                                className="text-gray-500 "
                                value="on going"
                              >
                                on going
                              </option>
                              <option
                                className="text-gray-500 "
                                value="on hold"
                              >
                                on hold
                              </option>
                              <option
                                className="text-gray-500 "
                                value="complete"
                              >
                                complete
                              </option>
                            </select>
                          </button>
                        </td>
                      )}
                      {loginInSeller?.role === "super_admin" && (
                        <td
                          className={`text-[.8125rem] w-[100px] flex justify-start items-center font-[400] text-[#3A3A49] `}
                        >
                          <button>
                            <select
                              className={` focus:outline-none border rounded-full w-full px-2`}
                              name="commissionRate"
                              id=""
                              value={item?.commissionRate}
                              onChange={(e) =>
                                handleCommission(item._id, e.target.value)
                              }
                            >
                              <option className="text-gray-500 " value="">
                                ...
                              </option>
                              <option className="text-gray-500 " value="5">
                                5%
                              </option>
                              <option className="text-gray-500 " value="10">
                                10%
                              </option>
                              <option className="text-gray-500 " value="15">
                                15%
                              </option>
                              <option className="text-gray-500 " value="20">
                                20%
                              </option>
                              <option className="text-gray-500 " value="25">
                                25%
                              </option>
                            </select>
                          </button>
                        </td>
                      )}
                      {loginInSeller?.role === "admin" && (
                        <td
                          className={`text-[.8125rem] w-[100px] flex justify-start items-center font-[400] text-[#3A3A49] `}
                        >
                          <button>
                            <select
                              className={` focus:outline-none border rounded-full w-full px-2`}
                              name="commissionRate"
                              id=""
                              value={item?.commissionRate}
                              onChange={(e) =>
                                handleCommission(item._id, e.target.value)
                              }
                            >
                              <option className="text-gray-500 " value="">
                                ...
                              </option>
                              <option className="text-gray-500 " value="5">
                                5%
                              </option>
                              <option className="text-gray-500 " value="10">
                                10%
                              </option>
                              <option className="text-gray-500 " value="15">
                                15%
                              </option>
                              <option className="text-gray-500 " value="20">
                                20%
                              </option>
                              <option className="text-gray-500 " value="25">
                                25%
                              </option>
                            </select>
                          </button>
                        </td>
                      )}
                      {loginInSeller?.role == "super_admin" && (
                        <td className=" items-center text-[.8125rem] truncate text-start font-[400] w-[80px] text-[#3A3A49]">
                          <input
                            onChange={() =>
                              handlePermission(item._id, item.status)
                            }
                            type="checkbox"
                            checked={item?.status}
                          />
                        </td>
                      )}
                      <td className=" items-center text-[.8125rem] truncate text-start font-[400] w-[100px] text-[#3A3A49]">
                        {item?.projectSource}
                      </td>
                      <td className="  relative z-0 text-[.8125rem] flex items-center justify-center gap-2 truncate text-center pr-4 font-[400] w-[50px] h-full text-[#3A3A49] ">
                        <button
                          className="flex items-center justify-center w-full h-full transition-all duration-500 ease-in-out rounded-md cursor-pointer hover:border"
                          onClick={() => handleDropdown(item?._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="5"
                            height="20"
                            viewBox="0 0 5 20"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.54427 2.26411C4.54427 3.47531 3.52724 4.45822 2.27208 4.45822C1.01691 4.45822 -0.00012207 3.47531 -0.00012207 2.26411C-0.00012207 1.05201 1.01691 0.0699997 2.27208 0.0699997C3.52724 0.0699997 4.54427 1.05201 4.54427 2.26411ZM4.54427 10.035C4.54427 11.239 3.52724 12.2146 2.27208 12.2146C1.01691 12.2146 -0.00012207 11.239 -0.00012207 10.035C-0.00012207 8.83105 1.01691 7.85538 2.27208 7.85538C3.52724 7.85538 4.54427 8.83105 4.54427 10.035ZM4.54427 17.8059C4.54427 19.018 3.52724 20 2.27208 20C1.01691 20 -0.00012207 19.018 -0.00012207 17.8059C-0.00012207 16.5947 1.01691 15.6118 2.27208 15.6118C3.52724 15.6118 4.54427 16.5947 4.54427 17.8059Z"
                              fill="#D0D7DD"
                              fillOpacity="0.72727"
                            />
                          </svg>
                        </button>
                      </td>
                      {dropdown && dropId === item?._id && (
                        <div className="w-[100px] h-auto flex flex-col gap-3 py-2 border shadow-xl rounded-md top-12 right-12 bg-white z-[99] absolute">
                          <Link to={`/${item._id}`}>View</Link>
                          <button onClick={() => handleEdit(item._id)}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(item._id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </motion.tr>
                  );
                })
            ) : (
              <span className="text-[12px] font-[600] text-center w-full inline-block py-5">
                No project!
              </span>
            )
          ) : loginInSeller?.projects?.length > 0 ? (
            loginInSeller?.projects
              ?.filter((project) => {
                return (
                  (input?.text
                    ? project?.clientId?.clientName
                        ?.toLowerCase()
                        .includes(input?.text?.toLowerCase())
                    : true) &&
                  (input?.startDate
                    ? new Date(project?.date) >= new Date(input?.startDate)
                    : true) &&
                  (input?.endDate
                    ? new Date(project?.date) <= new Date(input?.endDate)
                    : true) &&
                  (input?.status
                    ? project?.projectStatus === input?.status
                    : true) &&
                  project?.status === true &&
                  (input?.companyName
                    ? project?.company?.companyName === input?.companyName
                    : true)
                );
              })
              .map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="w-full grid transition-all duration-500 ease-in-out grid-flow-col justify-between items-center border-b py-2 h-[3.4375rem]  text-center"
                  >
                    <td className=" items-center text-[.8125rem] truncate text-start font-[500] w-[30px]  text-cyan-700 ">
                      <span className="text-[.8125rem] font-[500] px-[.125rem] text-[#D9D9D9]">
                        {index + 1}.
                      </span>
                    </td>
                    <td className="w-[120px] px-2 overflow-hidden -ml-14 items-center flex gap-[.3125rem] relative">
                      <Link to={`/${item._id}`}>
                        <span className="  capitalize truncate text-[13px] font-[500] text-cyan-700  w-[70px]">
                          {item?.company?.companyName}
                        </span>
                      </Link>
                    </td>
                    <td className="w-[120px] overflow-hidden -ml-14 items-center flex gap-[.3125rem] relative">
                      <Link to={`/${item._id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="26"
                          viewBox="0 0 32 26"
                          fill="none"
                        >
                          <path
                            d="M17.3825 4.33948L14.3154 1.00804C13.7253 0.368794 12.8894 0 12.0165 0H3.12246C1.39527 0 0 1.40142 0 3.12246V22.8775C0 24.5986 1.39527 26 3.12246 26H28.348C30.069 26 31.4704 24.6047 31.4704 22.8775V7.46194C31.4704 5.7409 30.0752 4.33948 28.348 4.33948H17.3825Z"
                            fill="#0891b2"
                          />
                        </svg>
                      </Link>
                      {item?.clientId?.clientAvatar ? (
                        <Link to={`/${item?._id}`}>
                          <img
                            className="w-[1.25rem] absolute left-3 top-2 h-[1.25rem] border-[.125rem] border-white rounded-full"
                            src={item?.clientId?.clientAvatar}
                          />
                        </Link>
                      ) : (
                        <Link to={`/${item?._id}`}>
                          <img
                            className="w-[1.25rem] absolute left-3 top-2 h-[1.25rem] border-[.125rem] border-white rounded-full"
                            src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                          />
                        </Link>
                      )}

                      <span className="  capitalize truncate text-[13px] font-[500] text-cyan-700  w-[70px]">
                        {item?.clientId?.clientName}
                      </span>
                    </td>
                    <td className=" items-center text-[.8125rem] truncate text-start font-[400] w-[100px] text-[#3A3A49]">
                      {item?.date}
                    </td>
                    <td className="w-[120px]  items-center flex text-[.8125rem] text-start font-[400] text-[#3A3A49] gap-[.3125rem]">
                      <div
                        className="bg-gray-200 h-[.375rem] w-[50%] "
                        role="progressbar"
                        aria-label="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="10000"
                      >
                        <div
                          className="h-full bg-cyan-700 "
                          style={{
                            width: `${((100 * item?.amount) / 100000).toFixed(
                              2
                            )}%`,
                          }}
                        />
                      </div>
                      ${item?.amount && item?.amount}
                    </td>
                    {loginInSeller?.role === "user" && (
                      <td className="w-[100px]  items-center text-[.8125rem] truncate text-start font-[600] text-[#3A3A49]">
                        $
                        {item?.amount &&
                          (
                            (item?.amount *
                              parseInt(item.salesCommissionRate)) /
                            100
                          ).toFixed(2)}
                      </td>
                    )}
                    {loginInSeller?.role === "user" && (
                      <td
                        className={`text-[.8125rem] w-[120px]  flex justify-start items-center font-[400] text-[#3A3A49] `}
                      >
                        <button>
                          <select
                            className={` focus:outline-none w-full px-2 ${
                              item?.projectStatus == "pending" &&
                              "text-[#F2994A] border-[#F2994A] border-[.0187rem] bg-[#FFF8F2] rounded-[2.8125rem] text-[.625rem]  "
                            } ${
                              item?.projectStatus == "complete" &&
                              "text-[#FFF] border-[.0187rem] bg-[#878790] rounded-[2.8125rem] text-[.625rem]  "
                            }  ${
                              item?.projectStatus == "on hold" &&
                              "text-[#F95959] border-[#F95959] border-[.0187rem] bg-[#FEE] rounded-[2.8125rem] text-[.625rem]  "
                            }   ${
                              item?.projectStatus == "on going" &&
                              "text-[#3AAE54] border-[#3AAE54] border-[.0187rem] bg-[#E7FBF0] rounded-[2.8125rem] text-[.625rem]  "
                            }`}
                            name="projectType"
                            id=""
                            value={item.projectStatus}
                            onChange={(e) =>
                              handleProjectStatus(item._id, e.target.value)
                            }
                          >
                            <option className="text-gray-500 " value="">
                              .....
                            </option>
                            <option className="text-gray-500 " value="pending">
                              pending
                            </option>
                            <option className="text-gray-500 " value="on going">
                              on going
                            </option>
                            <option className="text-gray-500 " value="on hold">
                              on hold
                            </option>
                            <option className="text-gray-500 " value="complete">
                              complete
                            </option>
                          </select>
                        </button>
                      </td>
                    )}
                    {loginInSeller?.role === "super_admin" && (
                      <td
                        className={`text-[.8125rem] w-[120px] flex justify-start items-center font-[400] text-[#3A3A49] `}
                      >
                        <button>
                          <select
                            className={` focus:outline-none border rounded-full`}
                            name="commissionRate"
                            id=""
                            value={item?.commissionRate}
                            onChange={(e) =>
                              handleCommission(item._id, e.target.value)
                            }
                          >
                            <option className="text-gray-500 " value="5%">
                              5%
                            </option>
                            <option className="text-gray-500 " value="10%">
                              10%
                            </option>
                            <option className="text-gray-500 " value="15%">
                              15%
                            </option>
                            <option className="text-gray-500 " value="20%">
                              20%
                            </option>
                            <option className="text-gray-500 " value="25%">
                              25%
                            </option>
                          </select>
                        </button>
                      </td>
                    )}

                    {loginInSeller?.role === "admin" && (
                      <td
                        className={`text-[.8125rem] w-[120px] flex justify-start items-center font-[400] text-[#3A3A49] `}
                      >
                        <button>
                          <select
                            className={` focus:outline-none border rounded-full`}
                            name="commissionRate"
                            id=""
                            value={item?.salesCommissionRate}
                            onChange={(e) =>
                              handleSalesCommission(item._id, e.target.value)
                            }
                          >
                            <option className="text-gray-500 " value="5">
                              5%
                            </option>
                            <option className="text-gray-500 " value="10">
                              10%
                            </option>
                            <option className="text-gray-500 " value="15">
                              15%
                            </option>
                            <option className="text-gray-500 " value="20">
                              20%
                            </option>
                            <option className="text-gray-500 " value="25">
                              25%
                            </option>
                          </select>
                        </button>
                      </td>
                    )}
                    {loginInSeller?.role == "supper_admin" && (
                      <td className=" items-center text-[.8125rem] truncate text-start font-[400] w-[100px] text-[#3A3A49]">
                        <input
                          onChange={() =>
                            handlePermission(item._id, item.status)
                          }
                          type="checkbox"
                          checked={item?.status}
                        />
                      </td>
                    )}

                    <td className=" items-center text-[.8125rem] truncate text-start font-[500] w-[120px]  text-cyan-700 ">
                      <span className=" capitalize truncate text-[13px] font-[500] text-cyan-700  w-[120px]">
                        {item.projectSource}
                      </span>
                    </td>

                    <td className="  relative z-0 text-[.8125rem] flex items-center justify-center gap-2 truncate text-center pr-4 font-[400] w-[50px] h-full text-[#3A3A49]">
                      <button
                        className="flex items-center justify-center w-full h-full transition-all duration-500 ease-in-out rounded-md cursor-pointer hover:border"
                        onClick={() => handleDropdown(item?._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="5"
                          height="20"
                          viewBox="0 0 5 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.54427 2.26411C4.54427 3.47531 3.52724 4.45822 2.27208 4.45822C1.01691 4.45822 -0.00012207 3.47531 -0.00012207 2.26411C-0.00012207 1.05201 1.01691 0.0699997 2.27208 0.0699997C3.52724 0.0699997 4.54427 1.05201 4.54427 2.26411ZM4.54427 10.035C4.54427 11.239 3.52724 12.2146 2.27208 12.2146C1.01691 12.2146 -0.00012207 11.239 -0.00012207 10.035C-0.00012207 8.83105 1.01691 7.85538 2.27208 7.85538C3.52724 7.85538 4.54427 8.83105 4.54427 10.035ZM4.54427 17.8059C4.54427 19.018 3.52724 20 2.27208 20C1.01691 20 -0.00012207 19.018 -0.00012207 17.8059C-0.00012207 16.5947 1.01691 15.6118 2.27208 15.6118C3.52724 15.6118 4.54427 16.5947 4.54427 17.8059Z"
                            fill="#D0D7DD"
                            fillOpacity="0.72727"
                          />
                        </svg>
                      </button>
                    </td>
                    {dropdown && dropId === item?._id && (
                      <div className="w-[100px] h-auto flex flex-col gap-3 py-2 border shadow-xl rounded-md  top-12 right-12 bg-white z-[999] absolute">
                        <Link to={`/${item._id}`}>view</Link>
                        <button onClick={() => handleSellerEdit(item._id)}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(item._id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </tr>
                );
              })
          ) : (
            <span className="text-[12px] font-[600] text-center w-full inline-block py-5">
              No project!
            </span>
          )}
        </tbody>
        {/* //=======================================table footer  */}
        {(project?.length >= 1 || loginInSeller?.projects?.length >= 1) && (
          <tfoot>
            <div className="flex items-center justify-center gap-2 py-5">
              <button
                className="text-[14px]   w-[25px] h-[25px] flex rounded-md hover:bg-gray-700  justify-center items-center font-[400] text-[#A6A8B1] border capitalize  hover:text-white transition-all ease-in-out duration-500 hover:scale-[101%]"
                onClick={prevPage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <mask
                    id="mask0_1410_2"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_1410_2)">
                    <path
                      d="M12 15L7 10L12 5L13.062 6.062L9.125 10L13.062 13.938L12 15Z"
                      fill="#293050"
                    />
                  </g>
                </svg>
              </button>
              <button
                onClick={() => setCurrentPage(1)}
                className={`${
                  currentPage === 1 ? "bg-cyan-700  text-white" : ""
                } text-[14px] w-[25px] h-[25px] flex rounded-md hover:bg-gray-700  justify-center items-center font-[400] text-[#A6A8B1] border capitalize hover:text-white transition-all ease-in-out duration-500`}
              >
                {1}
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className={`${
                  currentPage === 2 ? "bg-cyan-700  text-white" : ""
                } text-[14px] w-[25px] h-[25px] flex rounded-md hover:bg-gray-700  justify-center items-center font-[400] text-[#A6A8B1] border capitalize hover:text-white transition-all ease-in-out duration-500`}
              >
                2
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`${
                  currentPage === 3 ? "bg-cyan-700  text-white" : ""
                } text-[14px] w-[25px] h-[25px] flex rounded-md hover:bg-gray-700  justify-center items-center font-[400] text-[#A6A8B1] border capitalize hover:text-white transition-all ease-in-out duration-500`}
              >
                3
              </button>
              <button
                onClick={() => setCurrentPage(4)}
                className={`${
                  currentPage === 4 ? "bg-cyan-700  text-white" : ""
                } text-[14px] w-[25px] h-[25px] flex rounded-md hover:bg-gray-700  justify-center items-center font-[400] text-[#A6A8B1] border capitalize hover:text-white transition-all ease-in-out duration-500`}
              >
                4
              </button>
              <select
                onChange={handleLimit}
                className="w-[50px] rounded-md text-[14px] font-[400] text-[#A6A8B1] focus:outline-none border"
              >
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
              </select>
              <button
                className="text-[14px]  w-[25px] h-[25px] flex rounded-md hover:bg-gray-700  justify-center items-center  font-[400] text-[#A6A8B1] border capitalize  hover:text-white transition-all ease-in-out duration-500 hover:scale-[101%] "
                onClick={nextPage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <mask
                    id="mask0_1410_40"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect
                      width="20"
                      height="20"
                      transform="matrix(-1 0 0 1 20 0)"
                      fill="#D9D9D9"
                    />
                  </mask>
                  <g mask="url(#mask0_1410_40)">
                    <path
                      d="M8 15L13 10L8 5L6.938 6.062L10.875 10L6.938 13.938L8 15Z"
                      fill="#293050"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default TableComponent;
