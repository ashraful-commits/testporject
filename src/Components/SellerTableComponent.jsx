import React, { useEffect, useState } from "react";
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
  console.log(message);
  console.log(error);
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
  console.log(input);
  return (
    <div>
      {/* //===================================edit model  */}
      {editModel && (
        <SalesModel
          setModel={setEditModel}
          singleData={singleData}
          title="Edit"
        />
      )}
      {/* //=============================================table  */}
      <table className="w-full border min-h-[490px] h-full">
        {/* //============================================table header  */}
        <thead>
          <tr className="w-full h-[1.875rem] bg-[#E7E7E7] grid  grid-flow-col justify-between border-b py-2 px-2 text-center">
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

            {loginInSeller?.role === "admin" && (
              <th className="text-[.8125rem] font-['work_sans'] w-[120px]  text-start font-[400]">
                Seller Role
              </th>
            )}
            {loginInSeller?.role === "admin" && (
              <th className="text-[.8125rem] font-['work_sans'] w-[120px]  text-start font-[400]">
                Permission status
              </th>
            )}

            <th className="text-[.8125rem] w-[80px] font-['work_sans'] flex items-center justify-end text-start font-[400]">
              Action
            </th>
          </tr>
        </thead>
        {/* //================================================table body  */}
        <tbody className="relative">
          {(loader || sellerLoader) && (
            <div className="w-full h-full bg-cyan-600 bg-opacity-20 absolute top left-0">
              <div className="w-full absolute h-full top-[45%]">
                <LoadingSpinner />
              </div>
            </div>
          )}
          {loginInSeller?.role === "admin" ? (
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
                      } w-full grid grid-flow-col hover:scale-[101%] transition-all duration-500 ease-in-out justify-between items-center border-b py-2 h-[3.4375rem]  text-center`}
                    >
                      <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#267596]">
                        <span className="text-[.8125rem] font-[500] px-[.125rem] text-[#D9D9D9]">
                          {index + 1}.
                        </span>{" "}
                        <span className="truncate text-[13px] capitalize font-[500] text-[#267596] w-[120px]">
                          {item.name}
                        </span>
                      </td>
                      <Link
                        className=" cursor-pointer"
                        to={`/seller/${item._id}`}
                      >
                        <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#267596]">
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
                      <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#267596]">
                        {item?.client?.length > 0 ? (
                          <span>{item?.client?.length}</span>
                        ) : (
                          <span>0</span>
                        )}
                      </td>
                      <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#267596]">
                        {item?.projects?.length > 0 ? (
                          <span>{item?.projects?.length}</span>
                        ) : (
                          <span>0</span>
                        )}
                      </td>
                      <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#267596]">
                        {item?.salesPerson?.length > 0 ? (
                          <span>{item?.salesPerson?.length}</span>
                        ) : (
                          <span>0</span>
                        )}
                      </td>
                      {loginInSeller?.role === "admin" && (
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
                                User
                              </option>
                              <option className="text-gray-500 " value="admin">
                                Admin
                              </option>
                            </select>
                          </button>
                        </td>
                      )}

                      {loginInSeller?.role === "admin" && (
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

                      <td className="  relative z-0 text-[.8125rem] flex items-center justify-end gap-2 truncate text-center pr-4 font-[400] w-[120px] h-full text-[#3A3A49]">
                        <Link to={`/seller/${item?._id}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
                            <path d="M12 13a1 1 0 100-2 1 1 0 000 2z" />
                            <path d="M21 8V5a2 2 0 00-2-2H5a2 2 0 00-2 2v3m18 8v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3" />
                          </svg>
                        </Link>
                        <button onClick={() => handleEdit(item._id)}>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.4445 6.88859C18.7779 7.4441 16.5559 5.22205 17.1114 3.55551"
                              stroke="#0095FF"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M16.9766 3.6903L13.3862 7.28073C11.8253 8.84163 10.718 10.7974 10.1826 12.9389L10.0091 13.6329C9.95503 13.8491 10.1509 14.045 10.3671 13.9909L11.0611 13.8174C13.2026 13.282 15.1584 12.1747 16.7193 10.6138L20.3097 7.02338C20.7517 6.58139 21 5.98192 21 5.35684C21 4.05519 19.9448 3 18.6432 3C18.0181 3 17.4186 3.24831 16.9766 3.6903Z"
                              stroke="#0095FF"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M12 3C10.9767 3 9.95334 3.11763 8.95043 3.35288C6.17301 4.00437 4.00437 6.17301 3.35288 8.95043C2.88237 10.9563 2.88237 13.0437 3.35288 15.0496C4.00437 17.827 6.17301 19.9956 8.95044 20.6471C10.9563 21.1176 13.0437 21.1176 15.0496 20.6471C17.827 19.9956 19.9956 17.827 20.6471 15.0496C20.8824 14.0466 21 13.0233 21 12"
                              stroke="#363853"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                        <button onClick={() => handleDelete(item?._id)}>
                          <svg
                            fill="#000000"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            id="delete"
                            data-name="Line Color"
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon line-color"
                          >
                            <path
                              id="secondary"
                              d="M16,7V4a1,1,0,0,0-1-1H9A1,1,0,0,0,8,4V7"
                              style={{
                                fill: "none",
                                stroke: "rgb(44, 169, 188)",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                              }}
                            ></path>
                            <path
                              id="primary"
                              d="M18,20V7H6V20a1,1,0,0,0,1,1H17A1,1,0,0,0,18,20ZM4,7H20"
                              style={{
                                fill: "none",
                                stroke: "rgb(0, 0, 0)",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                              }}
                            ></path>
                          </svg>
                        </button>
                      </td>
                    </motion.tr>
                  );
                })
            ) : (
              <span className="text-[12px] font-[600] text-center w-full inline-block py-5">
                No Seller!
              </span>
            )
          ) : [loginInSeller, ...loginInSeller.salesPerson]?.length > 0 ? (
            [loginInSeller, ...loginInSeller.salesPerson]
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
                    className="w-full hover:scale-[101%] transition-all duration-500 ease-in-out grid grid-flow-col justify-between items-center border-b py-2 h-[3.4375rem]  text-center"
                  >
                    <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#267596]">
                      <span className="text-[.8125rem] font-[500] px-[.125rem] text-[#D9D9D9]">
                        {index + 1}.
                      </span>
                      <span className="truncate text-[13px] capitalize font-[500] text-[#267596] w-[120px]">
                        {item.name}
                      </span>
                    </td>
                    <Link
                      className=" cursor-pointer"
                      to={`/seller/${item._id}`}
                    >
                      <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#267596]">
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
                    <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#267596]">
                      {item?.client?.length > 0 ? (
                        <span>{item?.client?.length}</span>
                      ) : (
                        <span>0</span>
                      )}
                    </td>
                    <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#267596]">
                      {item?.projects?.length > 0 ? (
                        <span>{item?.projects?.length}</span>
                      ) : (
                        <span>0</span>
                      )}
                    </td>
                    <td className=" items-center justify-center flex text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#267596]">
                      {item?.salesPerson?.length > 0 ? (
                        <span>{item?.salesPerson?.length}</span>
                      ) : (
                        <span>0</span>
                      )}
                    </td>
                    {loginInSeller?.role === "admin" && (
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
                          </select>
                        </button>
                      </td>
                    )}

                    {loginInSeller?.role === "admin" && (
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

                    <td className="  relative z-0 text-[.8125rem] flex items-center justify-center gap-2 truncate text-center pr-4 font-[400] w-[120px] h-full text-[#3A3A49]">
                      <Link to={`/seller/${item?._id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
                          <path d="M12 13a1 1 0 100-2 1 1 0 000 2z" />
                          <path d="M21 8V5a2 2 0 00-2-2H5a2 2 0 00-2 2v3m18 8v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3" />
                        </svg>
                      </Link>
                      <button onClick={() => handleEdit(item._id)}>
                        <svg
                          fill="#000000"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4h6a1,1,0,0,0,0-2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM6,12.76V17a1,1,0,0,0,1,1h4.24a1,1,0,0,0,.71-.29l6.92-6.93h0L21.71,8a1,1,0,0,0,0-1.42L17.47,2.29a1,1,0,0,0-1.42,0L13.23,5.12h0L6.29,12.05A1,1,0,0,0,6,12.76ZM16.76,4.41l2.83,2.83L18.17,8.66,15.34,5.83ZM8,13.17l5.93-5.93,2.83,2.83L10.83,16H8Z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(item._id)}>
                        <svg
                          fill="#000000"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          id="delete"
                          data-name="Line Color"
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon line-color"
                        >
                          <path
                            id="secondary"
                            d="M16,7V4a1,1,0,0,0-1-1H9A1,1,0,0,0,8,4V7"
                            style={{
                              fill: "none",
                              stroke: "rgb(44, 169, 188)",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                            }}
                          ></path>
                          <path
                            id="primary"
                            d="M18,20V7H6V20a1,1,0,0,0,1,1H17A1,1,0,0,0,18,20ZM4,7H20"
                            style={{
                              fill: "none",
                              stroke: "rgb(0, 0, 0)",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                            }}
                          ></path>
                        </svg>
                      </button>
                    </td>
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
          [loginInSeller, ...loginInSeller.salesPerson]?.length >= 1) && (
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
              {Array.from({
                length: Math.ceil(loginInSeller?.salesPerson?.length / limit),
              }).map((_, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`${
                      currentPage === index + 1 ? "bg-darkBlue text-white" : ""
                    } text-[14px] w-[25px] h-[25px] hover:scale-105  flex rounded-md hover:bg-darkBlue justify-center items-center font-[400] text-[#A6A8B1] border capitalize hover:text-white transition-all ease-in-out duration-500`}
                  >
                    {index + 1}
                  </button>
                );
              })}
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
