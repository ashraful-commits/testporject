import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginUserSeller = ({
  loginInSeller,
  input,
  handleRoleUpdate,
  handleDropdown,
  dropdown,
  dropId,
  handleEdit,
  handleDelete,
  handleStatusUpdate,
}) => {
  //======================================all state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [MaxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [MinPageNumberLimit, setMinPageNumberLimit] = useState(0);
  //========================pages

  const pages = [];
  for (
    let i = 1;
    i <= Math.ceil(loginInSeller?.salesPerson?.length / itemsPerPage);
    i++
  ) {
    console.log(i);
    pages.push(i);
  }
  //===================================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = loginInSeller?.salesPerson.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
      {[...currentItems, loginInSeller]?.length > 0 ? (
        [...currentItems, loginInSeller]
          .filter((seller) => {
            return (
              (input?.text
                ? seller?.name
                    ?.toLowerCase()
                    .includes(input?.text?.toLowerCase())
                : true) &&
              (input?.email
                ? seller?.email
                    ?.toLowerCase()
                    .includes(input?.email?.toLowerCase())
                : true) &&
              (input?.role ? seller?.role?.includes(input?.role) : true) &&
              seller?.status === true
            );
          })
          ?.map((item, index) => {
            return (
              <tr
                key={index}
                className="w-full  transition-all duration-500 ease-in-out grid grid-flow-col justify-between items-center border my-1 rounded-md py-2 h-[3.4375rem]  text-center relative"
              >
                <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[20px]  text-cyan-700 ">
                  <span className="text-[.8125rem] font-[500] px-[.125rem] text-[#D9D9D9]">
                    {index + 1}.
                  </span>
                </td>
                <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-cyan-700 ">
                  <span className="truncate text-[13px] capitalize font-[500] text-cyan-700  w-[120px]">
                    {item.name}
                  </span>
                </td>
                <Link className="cursor-pointer " to={`/seller/${item._id}`}>
                  <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-cyan-700 ">
                    {item.avatar ? (
                      <img
                        className="w-[35px] h-[35px] rounded-full"
                        src={item.avatar}
                        alt={item.name}
                      />
                    ) : (
                      <img
                        className="w-[35px] h-[35px] rounded-full"
                        src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
                      />
                    )}
                  </td>
                </Link>
                <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-cyan-700 ">
                  {item?.client?.length > 0 ? (
                    <span>{item?.client?.length}</span>
                  ) : (
                    <span>0</span>
                  )}
                </td>
                <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-cyan-700 ">
                  {item?.projects?.length > 0 ? (
                    <span>{item?.projects?.length}</span>
                  ) : (
                    <span>0</span>
                  )}
                </td>
                <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-cyan-700 ">
                  {item?.salesPerson?.length > 0 ? (
                    <span>{item?.salesPerson?.length}</span>
                  ) : (
                    <span>0</span>
                  )}
                </td>
                {loginInSeller?.role === "super_admin" && (
                  <td
                    className={`text-[.8125rem] w-[120px] flex justify-start items-center font-[400] text-[#3A3A49] `}
                  >
                    <button>
                      <select
                        className={` focus:outline-none  ${
                          item?.role == "admin" &&
                          "text-[#F2994A] border-[#F2994A] border-[.0187rem] bg-[#FFF8F2] rounded-[2.8125rem] text-[.625rem] h-[1.125rem] w-[3.75rem]   "
                        } ${
                          item?.role == "user" &&
                          "text-[#FFF] border-[.0187rem] bg-[#878790] rounded-[2.8125rem] text-[.625rem] h-[1.425rem] w-[3.75rem]   "
                        } ${
                          item?.role == "super_admin" &&
                          "text-[#FFF] border-[.0187rem] bg-[#adff87] rounded-[2.8125rem] text-[.625rem] h-[1.425rem] w-[3.75rem]   "
                        }  `}
                        name="projectType"
                        id=""
                        value={item?.role}
                        onChange={(e) =>
                          handleRoleUpdate(item._id, e.target.value)
                        }
                      >
                        <option className="text-gray-200 " value="user">
                          ...select...
                        </option>
                        <option className="text-gray-200 " value="user">
                          User
                        </option>
                        <option className="text-gray-200 " value="admin">
                          Admin
                        </option>
                        <option className="text-gray-200 " value="super_admin">
                          Super admin
                        </option>
                      </select>
                    </button>
                  </td>
                )}

                {loginInSeller?.role === "super_admin" && (
                  <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[400] w-[100px] text-[#3A3A49]">
                    <input
                      onChange={() => handleStatusUpdate(item._id, item.status)}
                      type="checkbox"
                      checked={item?.status}
                      value={item?.status}
                      className="cursor-pointer "
                    />
                  </td>
                )}

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
                  <div className="w-[100px] h-auto flex flex-col gap-3 py-2 border shadow-xl rounded-md top-12 right-12 bg-white z-[99] absolute">
                    <Link
                      className="text-[12px] font-['Work_sans']"
                      to={`/seller/${item?._id}`}
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
              </tr>
            );
          })
      ) : (
        <span className="text-[12px] font-[600] text-center w-full inline-block py-5">
          No Sales Person!
        </span>
      )}
      {/* ===========================pagination  */}
      <ul className="flex items-center justify-center gap-4 mt-5 ">
        {currentItems?.length > 0 && (
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
        {currentItems?.length > 0 && (
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

export default LoginUserSeller;
