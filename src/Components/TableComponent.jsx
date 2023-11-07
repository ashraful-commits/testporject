import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteClient,
  getAllClient,
  permissionUpdate,
  projectStatusUpdate,
} from "../Features/Client/ClientApi";
import { getAllClientState } from "../Features/Client/ClientSlice";
import Model from "./Model/Model";
import swal from "sweetalert";
import LoadingSpinner from "./LoadingSpin";
import { getAllSellerState } from "../Features/Seller/SellerSlice";
import { LoggedInSeller } from "../Features/Seller/SellerApi";
import { Link } from "react-router-dom";

const TableComponent = ({ sellerId }) => {
  const { client, loader } = useSelector(getAllClientState);
  const { loginInSeller } = useSelector(getAllSellerState);
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
    setSingleData(client.find((item) => item._id == id));
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
        dispatch(deleteClient(id));
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
  //===============handle prmmision
  const handlePermission = (id, status) => {
    dispatch(permissionUpdate({ id, status }));
  };
  //===============handle prmmision
  const handleProjectStatus = (id, projectStatus) => {
    dispatch(projectStatusUpdate({ id, projectStatus }));
  };
  //=================get user client
  useEffect(() => {
    dispatch(getAllClient({ sellerId, page: currentPage, limit }));
  }, [dispatch, sellerId, currentPage, limit]);
  //==========================next page
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  //============prev page
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  return (
    <div>
      {editModel && <Model setClient={setEditModel} singleData={singleData} />}
      <table className="w-full">
        <thead>
          <tr className="w-full h-[1.875rem] bg-[#E7E7E7] grid  grid-flow-col justify-between border-b py-2 px-2 text-center">
            <th className="text-[.8125rem] w-[120px] font-['work_sans'] text-start font-[400]">
              Company Name
            </th>

            <th className="text-[.8125rem] font-['work_sans'] w-[120px]  text-start font-[400]">
              Client Name
            </th>
            <th className="text-[.8125rem] w-[100px] font-['work_sans'] text-start font-[400]">
              Data Signed
            </th>
            <th className="text-[.8125rem] font-['work_sans'] w-[120px]  text-start font-[400]">
              Contact Amount
            </th>
            {loginInSeller?.role == "user" && (
              <th className="text-[.8125rem] font-['work_sans'] w-[100px]  text-start font-[400]">
                Commission
              </th>
            )}
            {loginInSeller?.role === "user" && (
              <th className="text-[.8125rem] font-['work_sans'] w-[120px]  text-start font-[400]">
                Project status
              </th>
            )}
            {loginInSeller?.role === "admin" && (
              <th className="text-[.8125rem] font-['work_sans'] w-[120px]  text-start font-[400]">
                Permission status
              </th>
            )}
            <th className="text-[.8125rem] font-['work_sans'] w-[100px]  text-start font-[400]">
              Client source
            </th>
            <th className="text-[.8125rem] w-[80px] font-['work_sans'] text-start font-[400]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {loader && <LoadingSpinner />}
          {client.length > 0 ? (
            client?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="w-full grid grid-flow-col justify-between items-center border-b py-2 h-[3.4375rem]  text-center"
                >
                  <td className=" items-center text-[.8125rem] truncate text-start font-[500] w-[120px]  text-[#267596]">
                    <span className="text-[.8125rem] font-[500] px-[.125rem] text-[#D9D9D9]">
                      {index + 1}.
                    </span>{" "}
                    <span className="truncate text-[13px] font-[500] text-[#267596] w-[120px]">
                      {item.companyName}
                    </span>
                  </td>
                  <td className="w-[120px] overflow-hidden items-center flex gap-[.3125rem] relative">
                    <Link to={`/${item._id}`}>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="26"
                        viewBox="0 0 32 26"
                        fill="none"
                      >
                        <path
                          d="M17.3825 4.33948L14.3154 1.00804C13.7253 0.368794 12.8894 0 12.0165 0H3.12246C1.39527 0 0 1.40142 0 3.12246V22.8775C0 24.5986 1.39527 26 3.12246 26H28.348C30.069 26 31.4704 24.6047 31.4704 22.8775V7.46194C31.4704 5.7409 30.0752 4.33948 28.348 4.33948H17.3825Z"
                          fill="#78B3CC"
                        />
                      </svg>
                    </Link>
                    {item?.clientAvatar ? (
                      <img
                        className="w-[1.25rem] absolute left-3 top-2 h-[1.25rem] border-[.125rem] border-white rounded-full"
                        src={item?.clientAvatar}
                      />
                    ) : (
                      <img
                        className="w-[1.25rem] absolute left-3 top-2 h-[1.25rem] border-[.125rem] border-white rounded-full"
                        src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                      />
                    )}

                    <span className=" truncate text-[13px] font-[500] text-[#267596] w-[70px]">
                      {" "}
                      {item.clientName}
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
                        className="bg-[#267596] h-full "
                        style={{
                          width: `${((100 * item?.amount) / 100000).toFixed(
                            2
                          )}%`,
                        }}
                      />
                    </div>
                    ${item?.amount && item?.amount}
                  </td>
                  {LoggedInSeller?.role == "user" && (
                    <td className="w-[100px]  items-center text-[.8125rem] truncate text-start font-[600] text-[#3A3A49]">
                      $
                      {item?.amount &&
                        ((item?.amount * 100) / 15 / 100).toFixed(2)}
                    </td>
                  )}
                  {loginInSeller?.role === "user" && (
                    <td
                      className={`text-[.8125rem] w-[120px] flex justify-start items-center font-[400] text-[#3A3A49] `}
                    >
                      <button>
                        <select
                          className={` focus:outline-none ${
                            item?.projectStatus == "pending" &&
                            "text-[#F2994A] border-[#F2994A] border-[.0187rem] bg-[#FFF8F2] rounded-[2.8125rem] text-[.625rem] h-[1.125rem] w-[3.75rem]   "
                          } ${
                            item?.projectStatus == "complete" &&
                            "text-[#FFF] border-[.0187rem] bg-[#878790] rounded-[2.8125rem] text-[.625rem] h-[1.125rem] w-[3.75rem]   "
                          }  ${
                            item?.projectStatus == "on Hold" &&
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
                          <option className="text-gray-500 " value="pending">
                            pending
                          </option>
                          <option className="text-gray-500 " value="on going">
                            on going
                          </option>
                          <option className="text-gray-500 " value="on Hold">
                            on Hold
                          </option>
                          <option className="text-gray-500 " value="complete">
                            complete
                          </option>
                        </select>
                      </button>
                    </td>
                  )}
                  {loginInSeller?.role == "admin" && (
                    <td className=" items-center text-[.8125rem] truncate text-start font-[400] w-[100px] text-[#3A3A49]">
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
                  <td className="  relative z-0 text-[.8125rem] flex items-center justify-center gap-2 truncate text-center pr-4 font-[400] w-[80px] h-full text-[#3A3A49]">
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
              No Client!
            </span>
          )}
        </tbody>
        {client.length > 7 && (
          <tfoot>
            <div className="flex justify-center items-center gap-5 py-5">
              <button
                className="text-[14px] font-[400] text-[#A6A8B1] border px-2 capitalize hover:bg-blue-500 hover:text-white transition-all ease-in-out duration-500"
                onClick={prevPage}
              >
                prev
              </button>
              <select
                onChange={handleLimit}
                className="w-[70px] text-[14px] font-[400] text-[#A6A8B1] focus:outline-none border"
              >
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
              </select>
              <button
                className="text-[14px] font-[400] text-[#A6A8B1] border px-2 capitalize hover:bg-blue-500 hover:text-white transition-all ease-in-out duration-500"
                onClick={nextPage}
              >
                next
              </button>
            </div>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default TableComponent;
