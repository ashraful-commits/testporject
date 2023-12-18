import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AdminProject = ({
  project,
  input,
  handleProjectStatus,
  loginInSeller,
  handleCommission,
  handlePermission,
  handleDropdown,
  dropdown,
  dropId,
  handleEdit,
  handleDelete,
}) => {
  //======================================all state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [MaxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [MinPageNumberLimit, setMinPageNumberLimit] = useState(0);
  //========================pages
  const pages = [];
  for (let i = 1; i <= Math.ceil(project?.length / itemsPerPage); i++) {
    console.log(i);
    pages.push(i);
  }
  //===================================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = project?.slice(indexOfFirstItem, indexOfLastItem);
  //=================================handlepagenumber
  const handlePageNumber = (item) => {
    setCurrentPage(Number(item));
  };
  //====================================pages
  const renderPage = pages.map((item, index) => {
    if (item < MaxPageNumberLimit + 1 && item > MinPageNumberLimit) {
      return (
        <li
          className={`cursor-pointer w-7  h-8  flex items-center justify-center rounded-md ${
            currentPage === item ? "bg-cyan-700 text-white" : "border"
          }`}
          onClick={() => handlePageNumber(item)}
          key={index}
        >
          {item}
        </li>
      );
    } else {
      return null;
    }
  });

  //========================================handle next prev
  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > MaxPageNumberLimit) {
      setMaxPageNumberLimit(MaxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(MinPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(MaxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(MinPageNumberLimit - pageNumberLimit);
    }
  };
  //===================================page increment
  let pageIncrementBtn = null;
  if (pages.length > MaxPageNumberLimit) {
    pageIncrementBtn = (
      <li className="cursor-pointer" onClick={handleNextBtn}>
        &hellip;
      </li>
    );
  }
  return (
    <>
      {currentItems && currentItems?.length > 0 ? (
        currentItems
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
                  <Link to={`/company/${item?.company?._id}`}>
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
                    className="bg-gray-200 h-[.375rem] w-[50%] overflow-hidden "
                    role="progressbar"
                    aria-label="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="10000"
                  >
                    <div
                      className="h-full bg-cyan-700 "
                      style={{
                        width: `${((100 * item?.amount) / 100000).toFixed(2)}%`,
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
                      onChange={() => handlePermission(item._id, item.status)}
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
                    <Link
                      className="text-[12px] font-['Work_sans']"
                      to={`/${item._id}`}
                    >
                      View
                    </Link>
                    <button
                      className="text-[12px] font-['Work_sans']"
                      onClick={() => handleEdit(item._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-[12px] font-['Work_sans']"
                      onClick={() => handleDelete(item._id)}
                    >
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
      )}
      {/* ====================================pagination  */}
      <ul className="flex items-center justify-center gap-4 mt-5 ">
        {currentItems.length > 0 && (
          <li>
            <button
              className="flex items-center justify-center h-8 border rounded-md cursor-pointer w-7 hover:bg-gray-200"
              onClick={handlePrevBtn}
              disabled={currentPage == pages[0] ? true : false}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 48 48"
                version="1"
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 48 48"
              >
                <polygon
                  fill="#005085"
                  points="30.9,43 34,39.9 18.1,24 34,8.1 30.9,5 12,24"
                />
              </svg>
            </button>
          </li>
        )}

        {renderPage}
        {pageIncrementBtn}
        {currentItems.length > 0 && (
          <li>
            <button
              className="flex items-center justify-center h-8 border rounded-md cursor-pointer w-7 hover:bg-gray-200"
              onClick={handleNextBtn}
              disabled={currentPage == pages[pages.length - 1] ? true : false}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 48 48"
                version="1"
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 48 48"
              >
                <polygon
                  fill="#005085"
                  points="17.1,5 14,8.1 29.9,24 14,39.9 17.1,43 36,24"
                />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </>
  );
};

export default AdminProject;
