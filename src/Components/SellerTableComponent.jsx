import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteClient, permissionUpdate } from "../Features/Client/ClientApi";
import {
  getAllClientState,
  setMessageEmpty,
} from "../Features/Client/ClientSlice";

import swal from "sweetalert";
import LoadingSpinner from "./LoadingSpin";
import { getAllSellerState } from "../Features/Seller/SellerSlice";
import {
  LoggedInSeller,
  deleteSeller,
  getAllSeller,
  updateSellerRole,
  updateSellerStatus,
} from "../Features/Seller/SellerApi";
import { Link } from "react-router-dom";
import { Toastify } from "../Utils/Tostify";
import SalesModel from "./Model/SalesModel";
import { motion } from "framer-motion";

const SellerTableComponent = ({ setModel, sellerId, input }) => {
  const { loader, error, message } = useSelector(getAllClientState);

  const {
    loginInSeller,
    seller,
    loader: sellerLoader,
  } = useSelector(getAllSellerState);

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  //=========================edit model
  const [editModel, setEditModel] = useState(false);
  //=================== singleData
  const [singleData, setSingleData] = useState({});

  //===========================set limit
  const [limit, setLimit] = useState(7);
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
  //========================handle edit
  const handleEdit = (id) => {
    setEditModel(true);
    const existingSeller =
      loginInSeller?.salesPerson &&
      [...loginInSeller.salesPerson, loginInSeller].find(
        (item) => item._id === id
      );

    if (loginInSeller.role === "user") {
      setSingleData(existingSeller);
    } else {
      const foundItem = seller?.find((item) => item._id === id);
      if (foundItem) {
        setSingleData(foundItem);
      }
    }
  };

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteSeller({ id, sellerId })).then(() => {
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
  //===============  handle limit
  const handleLimit = (e) => {
    setLimit(e.target.value);
  };
  //===============handle permission
  const handleStatusUpdate = (id, status) => {
    dispatch(updateSellerStatus({ id, status }));
  };
  //===============handle permission
  const handleRoleUpdate = (id, role) => {
    dispatch(updateSellerRole({ id, role }));
  };

  //==========================next page
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  //============prev page
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  //========================================= toastify

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
  useEffect(() => {
    dispatch(
      getAllSeller({ role: loginInSeller?.role, page: currentPage, limit })
    );
  }, [dispatch, limit, currentPage, loginInSeller]);

  const handleWindowDropdwon = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target.value)) {
      setDropdown(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleWindowDropdwon);
    return () => window.removeEventListener("click", handleWindowDropdwon);
  }, []);
  return (
    <div ref={dropdownRef}>
      {/* //===================================edit model  */}
      {editModel && (
        <SalesModel
          setModel={setEditModel}
          singleData={singleData}
          title="Edit"
        />
      )}
      {/* //=============================================table  */}
      <table className="w-full  min-h-[490px] h-full overflow-hidden">
        {/* //============================================table header  */}
        <thead>
          <tr className="w-full h-[1.875rem]  grid  grid-flow-col justify-between border-b py-2 px-2 text-center">
            <th className="text-[.8125rem] flex items-center justify-start w-[20px] font-['work_sans'] text-start font-[400]"></th>
            <th className="text-[.8125rem] flex items-center justify-start w-[120px] font-['work_sans'] text-start font-[400]">
              Seller Name
            </th>
            <th className="text-[.8125rem] flex items-center justify-center w-[120px] font-['work_sans'] text-start font-[400]">
              Avatar
            </th>
            <th className="text-[.8125rem] flex items-center justify-center w-[120px] font-['work_sans'] text-start font-[400]">
              Total Client
            </th>
            <th className="text-[.8125rem] flex items-center justify-center w-[120px] font-['work_sans'] text-start font-[400]">
              Total Projects
            </th>
            <th className="text-[.8125rem] flex items-center justify-center w-[120px] font-['work_sans'] text-start font-[400]">
              Total Sales Guy
            </th>

            {loginInSeller?.role === "super_admin" && (
              <th className="text-[.8125rem] font-['work_sans'] w-[120px]  text-start font-[400]">
                Seller Role
              </th>
            )}
            {loginInSeller?.role === "super_admin" && (
              <th className="text-[.8125rem] font-['work_sans'] w-[120px]  text-start font-[400]">
                Permission status
              </th>
            )}

            <th className="text-[.8125rem] w-[80px] font-['work_sans'] flex items-center justify-end text-start font-[400]"></th>
          </tr>
        </thead>
        {/* //================================================table body  */}
        <tbody className="relative border">
          {(loader || sellerLoader) && (
            <motion.div
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.2 }}
              transition={{ duration: 1.3 }}
              className="w-full h-full bg-cyan-600 bg-opacity-20 absolute top left-0"
            >
              <div className="w-full absolute h-full top-[45%]">
                <LoadingSpinner />
              </div>
            </motion.div>
          )}

          {loginInSeller?.role === "super_admin" ? (
            seller?.length > 0 ? (
              seller
                ?.filter((seller) => {
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
                    (input?.role ? seller?.role?.includes(input?.role) : true)
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
                        loginInSeller?._id === item?._id ? "bg-green-100" : ""
                      } w-full grid grid-flow-col hover:scale-[101%] transition-all duration-500 ease-in-out justify-between items-center border-b py-2 h-[3.4375rem]  text-center relative`}
                    >
                      <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[20px]  text-[#6E28D4]">
                        <span className="text-[.8125rem] font-[500] px-[.125rem] text-[#D9D9D9]">
                          {index + 1}.
                        </span>{" "}
                      </td>
                      <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#6E28D4]">
                        <span className="truncate text-[13px] capitalize font-[500] text-[#6E28D4] w-[120px]">
                          {item.name}
                        </span>
                      </td>
                      <Link
                        className=" cursor-pointer"
                        to={`/seller/${item._id}`}
                      >
                        <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#6E28D4]">
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
                      <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#6E28D4]">
                        {item?.client?.length > 0 ? (
                          <span>{item?.client?.length}</span>
                        ) : (
                          <span>0</span>
                        )}
                      </td>
                      <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#6E28D4]">
                        {item?.projects?.length > 0 ? (
                          <span>{item?.projects?.length}</span>
                        ) : (
                          <span>0</span>
                        )}
                      </td>
                      <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#6E28D4]">
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
                              }${
                                item?.role == "super_admin" &&
                                "text-[#FFF] border-[.0187rem] bg-[#8787ff] rounded-[2.8125rem] text-[.625rem] h-[1.425rem] w-[3.75rem]   "
                              }  `}
                              name="projectType"
                              id=""
                              value={item?.role}
                              onChange={(e) =>
                                handleRoleUpdate(item._id, e.target.value)
                              }
                            >
                              <option className="text-gray-500 " value="user">
                                User
                              </option>
                              <option
                                className="text-gray-500 "
                                value="super_admin"
                              >
                                Super admin
                              </option>
                              <option className="text-gray-500 " value="admin">
                                Admin
                              </option>
                            </select>
                          </button>
                        </td>
                      )}

                      {loginInSeller?.role === "super_admin" && (
                        <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[400] w-[100px] text-[#3A3A49]">
                          <input
                            onChange={() =>
                              handleStatusUpdate(item._id, item.status)
                            }
                            type="checkbox"
                            checked={item?.status}
                            value={item?.status}
                          />
                        </td>
                      )}

                      <td className="  relative z-0 text-[.8125rem] flex items-center justify-end gap-2 truncate text-center pr-4 font-[400] w-[50px] h-full text-[#3A3A49]">
                        <button
                          className="cursor-pointer w-full h-full hover:border rounded-md transition-all ease-in-out duration-500 flex justify-center items-center"
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
                          <Link to={`/seller/${item?._id}`}>View</Link>
                          <button onClick={() => handleEdit(item._id)}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(item?._id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </motion.tr>
                  );
                })
            ) : (
              <span className="text-[12px] font-[600] text-center w-full inline-block py-5">
                No Seller!
              </span>
            )
          ) : [...loginInSeller.salesPerson, loginInSeller]?.length > 0 ? (
            [...loginInSeller.salesPerson, loginInSeller]
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
                    className="w-full hover:scale-[101%] transition-all duration-500 ease-in-out grid grid-flow-col justify-between items-center border-b py-2 h-[3.4375rem]  text-center relative"
                  >
                    <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[20px]  text-[#6E28D4]">
                      <span className="text-[.8125rem] font-[500] px-[.125rem] text-[#D9D9D9]">
                        {index + 1}.
                      </span>
                    </td>
                    <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#6E28D4]">
                      <span className="truncate text-[13px] capitalize font-[500] text-[#6E28D4] w-[120px]">
                        {item.name}
                      </span>
                    </td>
                    <Link
                      className=" cursor-pointer"
                      to={`/seller/${item._id}`}
                    >
                      <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#6E28D4]">
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
                    <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#6E28D4]">
                      {item?.client?.length > 0 ? (
                        <span>{item?.client?.length}</span>
                      ) : (
                        <span>0</span>
                      )}
                    </td>
                    <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#6E28D4]">
                      {item?.projects?.length > 0 ? (
                        <span>{item?.projects?.length}</span>
                      ) : (
                        <span>0</span>
                      )}
                    </td>
                    <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#6E28D4]">
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
                            }  `}
                            name="projectType"
                            id=""
                            value={item?.role}
                            onChange={(e) =>
                              handleRoleUpdate(item._id, e.target.value)
                            }
                          >
                            <option className="text-gray-500 " value="user">
                              ...select...
                            </option>
                            <option className="text-gray-500 " value="user">
                              User
                            </option>
                            <option className="text-gray-500 " value="admin">
                              Admin
                            </option>
                            <option
                              className="text-gray-500 "
                              value="super_admin"
                            >
                              Super admin
                            </option>
                          </select>
                        </button>
                      </td>
                    )}

                    {loginInSeller?.role === "super_admin" && (
                      <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[400] w-[100px] text-[#3A3A49]">
                        <input
                          onChange={() =>
                            handleStatusUpdate(item._id, item.status)
                          }
                          type="checkbox"
                          checked={item?.status}
                          value={item?.status}
                        />
                      </td>
                    )}

                    <td className="  relative z-0 text-[.8125rem] flex items-center justify-center gap-2 truncate text-center pr-4 font-[400] w-[50px] h-full text-[#3A3A49]">
                      <button
                        className="cursor-pointer w-full h-full hover:border rounded-md transition-all ease-in-out duration-500 flex justify-center items-center"
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
                        <Link to={`/seller/${item?._id}`}>View</Link>
                        <button onClick={() => handleEdit(item._id)}>
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
              No Sales Person!
            </span>
          )}
        </tbody>
        {/* //=================================================== footer  */}
        {(seller?.length >= 1 ||
          [...loginInSeller.salesPerson, loginInSeller]?.length >= 1) && (
          <tfoot>
            <div className="flex justify-center items-center gap-2 py-5">
              <button
                className="text-[14px] w-[25px] hover:scale-105  h-[25px] flex rounded-md hover:bg-darkBlue justify-center items-center font-[400] text-[#A6A8B1] border capitalize  hover:text-white transition-all ease-in-out duration-500"
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
                  currentPage === 1 ? "bg-darkBlue text-white" : ""
                } text-[14px] w-[25px] h-[25px] flex rounded-md hover:bg-darkBlue justify-center items-center font-[400] text-[#A6A8B1] border capitalize hover:text-white transition-all ease-in-out duration-500`}
              >
                1
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className={`${
                  currentPage === 2 ? "bg-darkBlue text-white" : ""
                } text-[14px] w-[25px] h-[25px] flex rounded-md hover:bg-darkBlue justify-center items-center font-[400] text-[#A6A8B1] border capitalize hover:text-white transition-all ease-in-out duration-500`}
              >
                2
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`${
                  currentPage === 3 ? "bg-darkBlue text-white" : ""
                } text-[14px] w-[25px] h-[25px] flex rounded-md hover:bg-darkBlue justify-center items-center font-[400] text-[#A6A8B1] border capitalize hover:text-white transition-all ease-in-out duration-500`}
              >
                3
              </button>
              <button
                onClick={() => setCurrentPage(4)}
                className={`${
                  currentPage === 4 ? "bg-darkBlue text-white" : ""
                } text-[14px] w-[25px] h-[25px] flex rounded-md hover:bg-darkBlue justify-center items-center font-[400] text-[#A6A8B1] border capitalize hover:text-white transition-all ease-in-out duration-500`}
              >
                4
              </button>
              <select
                onChange={handleLimit}
                className="w-[50px] text-[14px] rounded-md font-[400] text-[#A6A8B1] focus:outline-none border"
              >
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
              </select>
              <button
                className="text-[14px] hover:scale-105  w-[25px] h-[25px] flex rounded-md hover:bg-darkBlue justify-center items-center  font-[400] text-[#A6A8B1] border capitalize  hover:text-white transition-all ease-in-out duration-500"
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

export default SellerTableComponent;
