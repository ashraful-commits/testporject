import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import swal from "sweetalert";
import LoadingSpinner from "../LoadingSpin";
import { getAllSellerState } from "../../Features/Seller/SellerSlice";
import {
  LoggedInSeller,
  deleteSeller,
  getAllSeller,
  updateSellerRole,
  updateSellerStatus,
} from "../../Features/Seller/SellerApi";
import { Link } from "react-router-dom";
import { Toastify } from "../../Utils/Tostify";
import SalesModel from "../Model/SalesModel";
import { motion } from "framer-motion";
import {
  getAllClientState,
  setMessageEmpty,
} from "../../Features/Client/ClientSlice";
import LoginUserSeller from "../Pagination/LoginUserSeller";
import AdminSeller from "../Pagination/AdminSeller";

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
          title="Edit sales"
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
              className="absolute left-0 w-full h-full bg-cyan-700 bg-opacity-20 top"
            >
              <div className="w-full absolute h-full top-[45%]">
                <LoadingSpinner />
              </div>
            </motion.div>
          )}
          {/* //========================================admin seller */}
          {loginInSeller?.role === "super_admin" ? (
            <AdminSeller
              input={input}
              handleRoleUpdate={handleRoleUpdate}
              loginInSeller={loginInSeller}
              handleStatusUpdate={handleStatusUpdate}
              handleDropdown={handleDropdown}
              dropdown={dropdown}
              dropId={dropId}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              seller={seller}
            />
          ) : (
            /*========================================any user  seller */
            <LoginUserSeller
              loginInSeller={loginInSeller}
              input={input}
              handleRoleUpdate={handleRoleUpdate}
              handleDropdown={handleDropdown}
              dropdown={dropdown}
              dropId={dropId}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleStatusUpdate={handleStatusUpdate}
            />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SellerTableComponent;
