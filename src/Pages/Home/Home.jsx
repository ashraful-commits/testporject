import { useEffect, useState } from "react";
import logo from "../../../public/logo.png";
import avatar from "../../../public/user.png";

import Model from "../../Components/Model/Model";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoggedInSeller, LogoutSeller } from "../../Features/Seller/SellerApi";
import { Toastify } from "../../Utils/Tostify";
import {
  getAllSellerState,
  setMessageEmpty,
} from "../../Features/Seller/SellerSlice";

import { calculateTotalCommissionForAllClients } from "../../Utils/CommissionCount";

import useFormHook from "../../Hooks/useFormHook";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { getAllCompany } from "../../Features/Company/CompanyApi";
import Header from "../../Components/Header";
import ClientModel from "../../Components/Model/ClientModel";
import TableComponent from "./../../Components/Tables/TableComponent";
import SellerTableComponent from "../../Components/Tables/SellerTableComponent";
import { getAllCompanyState } from "../../Features/Company/CompanySlice";
const Home = () => {
  //==============================================TODO:all state

  const [clientModel, setClientModel] = useState(false);
  const [sellerTable, setSellerTable] = useState(false);
  const [currentTime, setCurrentTime] = useState(false);
  const [Form, setForm] = useState(false);
  //====================================================TODO:use form hook
  const { input, setInput, handleInputChange } = useFormHook({
    text: "",
    endDate: "",
    startDate: "",
    status: "",
    email: "",
    rol: "",
    companyName: "",
  });
  //====================================================== TODO:percentage state
  const [percentage, setPercentage] = useState(0);
  //=========================================== TODO:redux data
  const { error, message, loginInSeller, seller } =
    useSelector(getAllSellerState);
  //=========================================== TODO:redux data
  const { company } = useSelector(getAllCompanyState);
  //===================================================== TODO:dispatch/navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //===========================================================TODO:handle logout

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
  }, [error, message, dispatch, navigate]);
  //=============================================================== TODO:logged in seller data
  useEffect(() => {
    dispatch(LoggedInSeller());
    dispatch(getAllCompany());
  }, [dispatch]);
  //================================================================== TODO:date format
  useEffect(() => {
    const currentDate = new Date();
    setCurrentTime(
      currentDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);
  //===================================================== TODO:percentage
  useEffect(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const oneWeekAgo = new Date(startOfWeek);
    oneWeekAgo.setDate(startOfWeek.getDate() - 7);

    const currentWeekData = loginInSeller?.client.filter(
      (item) =>
        new Date(item.createdAt) >= startOfWeek &&
        new Date(item.createdAt) <= today
    );

    const lastWeekData = loginInSeller?.client.filter(
      (item) =>
        new Date(item.createdAt) >= oneWeekAgo &&
        new Date(item.createdAt) < startOfWeek
    );
    if (lastWeekData > 0) {
      const percentageChange =
        ((currentWeekData - lastWeekData) / lastWeekData) * 100;
      setPercentage(percentageChange);
    } else {
      // Handle the case where lastWeekData has zero length (to avoid division by zero)
      setPercentage(0);
    }
  }, [loginInSeller?.client]);

  //======================================================== TODO:return
  return (
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
        {/* //================================================ TODO:model  */}
        {clientModel && (
          <div>
            {Form ? (
              <Model
                setForm={setForm}
                title="Add Client"
                setClient={setClientModel}
              />
            ) : (
              <ClientModel
                setForm={setForm}
                title="Add project"
                setClient={setClientModel}
              />
            )}
          </div>
        )}

        {/**======================================================TODO:dashboard */}
        <div className="dashboard px-[35px] w-[1400px] mt-[58px] h-full">
          <Header loginInSeller={loginInSeller} />
          <div className="calculation mt-[30px] flex justify-between">
            <motion.div
              initial={{ y: -15, opacity: 0.1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,

                ease: [0.17, 0.67, 0.83, 0.67],
                delay: 0.2,
              }}
              className="total_customer w-[305px] h-[150px] rounded-[8px] bg-cyan-700  grid grid-rows-2 hover:scale-105 transition-all duration-500 ease-in-out "
            >
              <div className="customer flex justify-start items-start mt-[10px] ml-[15px] gap-[9px]">
                <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="10"
                    viewBox="0 0 18 10"
                    fill="none"
                  >
                    <path
                      d="M11.0242 6.28205C10.579 6.03889 10.0685 5.90088 9.52581 5.90088H8.23599C7.67807 5.90088 7.15439 6.04684 6.70093 6.30246C5.74732 6.83928 5.10327 7.86138 5.10327 9.0336V10H12.6585V9.0336C12.6585 7.84616 11.9979 6.81333 11.0242 6.28205Z"
                      fill="#3AAE54"
                    />
                    <path
                      d="M14.5861 5.04248H13.5139C12.8878 5.04248 12.3043 5.22753 11.8149 5.54644C12.0501 5.70071 12.2711 5.88092 12.4748 6.08464C13.2624 6.87223 13.6962 7.91958 13.6962 9.03369V9.48819H17.7095V8.16586C17.7095 6.44368 16.3083 5.04248 14.5861 5.04248Z"
                      fill="#3AAE54"
                    />
                    <path
                      d="M4.19563 5.04248H3.12338C1.4012 5.04248 0 6.44368 0 8.16586V9.48819H4.06558V9.03369C4.06558 7.91958 4.49967 6.87223 5.28726 6.08464C5.48338 5.88853 5.69541 5.7142 5.92093 5.56374C5.42631 5.23445 4.83311 5.04248 4.19563 5.04248Z"
                      fill="#3AAE54"
                    />
                    <path
                      d="M14.0484 0.344727C14.0429 0.344727 14.0372 0.344761 14.0317 0.34483C12.8709 0.354411 11.9348 1.35766 11.9449 2.58118C11.955 3.79888 12.8983 4.78283 14.0516 4.78283C14.0571 4.78283 14.0628 4.78279 14.0683 4.78272C14.6375 4.77802 15.1686 4.53825 15.5639 4.10751C15.95 3.68677 16.1599 3.13238 16.1551 2.54638C16.145 1.32868 15.2017 0.344727 14.0484 0.344727Z"
                      fill="#3AAE54"
                    />
                    <path
                      d="M3.65789 0.344727C3.65239 0.344727 3.64668 0.344761 3.64115 0.34483C2.48042 0.354411 1.5443 1.35766 1.5544 2.58118C1.56443 3.79888 2.50785 4.78283 3.66107 4.78283C3.66661 4.78283 3.67228 4.78279 3.67782 4.78272C4.24694 4.77802 4.77809 4.53825 5.17337 4.10751C5.55949 3.68677 5.76944 3.13238 5.7646 2.54638C5.75453 1.32868 4.81116 0.344727 3.65789 0.344727Z"
                      fill="#3AAE54"
                    />
                    <path
                      d="M8.88104 0C7.5428 0 6.45428 1.15008 6.45428 2.56408C6.45428 3.58583 7.02293 4.46992 7.84372 4.88153C8.15848 5.0396 8.51025 5.1278 8.88104 5.1278C9.25184 5.1278 9.6036 5.0396 9.91836 4.88153C10.7392 4.46992 11.3078 3.58583 11.3078 2.56408C11.3078 1.15008 10.2193 0 8.88104 0Z"
                      fill="#3AAE54"
                    />
                  </svg>
                </div>
                <p className="text-[12px] text-white font-['Work_Sans'] mt-[8px] tracking-[.2px]">
                  Total Customers
                </p>
              </div>
              <div className="percentage flex justify-start px-4 gap-[10px] items-center">
                <h2 className="text-[35px] text-white mb-[10px] font-['Work_Sans']">
                  {loginInSeller?.client?.length > 0
                    ? loginInSeller?.client.length
                    : 0}
                </h2>
                <span className="text-[#3AAE54] border-[0.3px solid bg-[#5CCE75] text-[12px] flex justify-between px-[7px] items-center gap-[5px] w-[49px] h-[19px] bg-opacity-[.1] text-[#5CCE75] rounded-md">
                  {percentage.toFixed(1)}%
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="7"
                      height="9"
                      viewBox="0 0 7 9"
                      fill="none"
                    >
                      <path
                        d="M3.25824 4.55843e-05C3.12788 0.00210757 3.00349 0.0550043 2.91156 0.147453L0.412534 2.64651C0.362764 2.69204 0.32272 2.74716 0.294811 2.80857C0.266902 2.86997 0.251705 2.93641 0.250135 3.00384C0.248566 3.07127 0.260655 3.13832 0.285677 3.20096C0.310698 3.2636 0.348134 3.32053 0.395732 3.36832C0.443329 3.41612 0.500104 3.45377 0.56264 3.47905C0.625176 3.50433 0.692181 3.51673 0.759621 3.51544C0.827061 3.51415 0.893543 3.49921 0.955066 3.47155C1.01659 3.4439 1.07188 3.40406 1.11761 3.35448L2.76019 1.71189L2.7642 8.49317C2.7671 8.62386 2.82105 8.7482 2.9145 8.8396C3.00796 8.931 3.13348 8.98222 3.2642 8.98222C3.39492 8.98222 3.52044 8.931 3.6139 8.8396C3.70735 8.7482 3.7613 8.62386 3.7642 8.49317L3.76019 1.70215L5.40961 3.35448C5.50419 3.44511 5.63049 3.49511 5.76148 3.49376C5.89246 3.49241 6.01771 3.43983 6.1104 3.34727C6.20309 3.25471 6.25585 3.12952 6.25738 2.99853C6.25891 2.86755 6.20909 2.74121 6.11859 2.64651L3.61957 0.147453C3.5723 0.0999169 3.51595 0.0623926 3.45388 0.0370704C3.3918 0.0117482 3.32527 -0.00086043 3.25824 4.55843e-05Z"
                        fill="#5CCE75"
                      />
                    </svg>
                  </span>
                </span>

                <p className="text-white font-[400]  text-[13px]">This Week</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -15, opacity: 0.1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,

                ease: [0.17, 0.67, 0.83, 0.67],
                delay: 0.4,
              }}
              className="rate border w-[305px] h-[150px] rounded-[8px] bg-white  grid grid-rows-2 hover:scale-105 transition-all duration-500 ease-in-out "
            >
              <div className="customer flex justify-start items-start w-full mt-[10px] pl-[15px]  border-b gap-[7px]">
                <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center mt-[5px] bg-opacity-[.1] bg-[#5D5FEF] ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_530_382)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.99531 1.32683L6.23865 2.32216C6.17265 2.4095 6.05398 2.44083 5.94731 2.4075L4.72331 2.0275C4.34731 1.91083 3.93665 1.97416 3.61731 2.19616C3.28598 2.42616 3.09331 2.7955 3.09331 3.18683V4.4175C3.09331 4.51283 3.02198 4.59216 2.92731 4.62216L1.70331 5.00216C1.31931 5.1215 1.02131 5.41216 0.896646 5.7795C0.769313 6.15483 0.83598 6.56616 1.07865 6.8855L1.83465 7.8815C1.88865 7.95216 1.88865 8.04816 1.83465 8.11883L1.07865 9.11483C0.83598 9.43416 0.769313 9.8455 0.896646 10.2208C1.02131 10.5882 1.31931 10.8788 1.70331 10.9982L2.92731 11.3782C3.02198 11.4082 3.09331 11.4875 3.09331 11.5828V12.8135C3.09331 13.2048 3.28598 13.5742 3.61731 13.8042C3.93665 14.0262 4.34731 14.0895 4.72331 13.9728L5.94731 13.5928C6.05398 13.5595 6.17265 13.5908 6.23865 13.6782L6.99531 14.6735C7.22931 14.9815 7.60198 15.1668 7.99998 15.1668C8.39798 15.1668 8.77065 14.9815 9.00465 14.6735L9.76131 13.6782C9.82731 13.5908 9.94598 13.5595 10.0526 13.5928L11.2766 13.9728C11.6526 14.0895 12.0633 14.0262 12.3826 13.8042C12.714 13.5742 12.9066 13.2048 12.9066 12.8135V11.5828C12.9066 11.4875 12.978 11.4082 13.0726 11.3782L14.2966 10.9982C14.6806 10.8788 14.9786 10.5882 15.1033 10.2208C15.2306 9.8455 15.164 9.43416 14.9213 9.11483L14.1653 8.11883C14.1113 8.04816 14.1113 7.95216 14.1653 7.8815L14.9213 6.8855C15.164 6.56616 15.2306 6.15483 15.1033 5.7795C14.9786 5.41216 14.6806 5.1215 14.2966 5.00216L13.0726 4.62216C12.978 4.59216 12.9066 4.51283 12.9066 4.4175V3.18683C12.9066 2.7955 12.714 2.42616 12.3826 2.19616C12.0633 1.97416 11.6526 1.91083 11.2766 2.0275L10.0526 2.4075C9.94598 2.44083 9.82731 2.4095 9.76131 2.32216L9.00465 1.32683C8.77065 1.01883 8.39798 0.833496 7.99998 0.833496C7.60198 0.833496 7.22931 1.01883 6.99531 1.32683ZM10.512 9.2595C10.1213 8.8695 9.48798 8.8695 9.09731 9.2595C8.70731 9.6495 8.70731 10.2835 9.09731 10.6735C9.48798 11.0642 10.1213 11.0642 10.512 10.6735C10.902 10.2835 10.902 9.6495 10.512 9.2595ZM10.0033 5.2895L5.28931 10.0035C5.09398 10.1988 5.09398 10.5155 5.28931 10.7108C5.48465 10.9062 5.80131 10.9062 5.99665 10.7108L10.7106 5.99683C10.906 5.8015 10.906 5.48483 10.7106 5.2895C10.5153 5.09416 10.1986 5.09416 10.0033 5.2895ZM6.90265 5.32683C6.51198 4.93616 5.87865 4.93616 5.48798 5.32683C5.09798 5.71683 5.09798 6.35083 5.48798 6.74083C5.87865 7.13083 6.51198 7.13083 6.90265 6.74083C7.29265 6.35083 7.29265 5.71683 6.90265 5.32683Z"
                        fill="#5D5FEF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_530_382">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p className="text-[12px] text-[#230B34] font-['Work_Sans'] mt-[11px] tracking-[.2px]">
                  Commission Rate
                </p>
              </div>
              <div className="rate mt-[12px]  px-[20px] flex justify-between gap-[5px] items-center">
                <h2 className="text-[30px] font-[500] text-[#230B34] mb-[10px] tracking-[.2px] font-['Work_Sans']">
                  {loginInSeller &&
                  loginInSeller?.client &&
                  loginInSeller?.client?.length > 0
                    ? loginInSeller?.client?.reduce((acc, item) => {
                        const commission =
                          parseFloat(item?.commissionRate) || 0;
                        return acc + commission;
                      }, 0) / loginInSeller?.client?.length
                    : 0}
                  %
                </h2>

                <button className="text-gray-500 font-[400] w-[98px] h-[19px] tracking-[0.7px]  text-[13px] border bg-[#F5F5F5] rounded-[4px] mr-[22px] mb-[10px] hover:scale-105 duration-500 ease-in-out transition-all flex justify-center items-center">
                  view contract
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -15, opacity: 0.1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,

                ease: [0.17, 0.67, 0.83, 0.67],
                delay: 0.6,
              }}
              className="total_commission w-[305px] border h-[150px] rounded-[8px] bg-white  grid grid-rows-2 hover:scale-105 transition-all duration-500 ease-in-out"
            >
              <div className="total_earned flex justify-start items-start mt-[10px]  border-b pl-[12px] gap-[10px]">
                <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-opacity-[.1] mt-[4px] bg-[#2F80ED] ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M5.69004 3.99988H10.31L11.445 1.72488C11.4975 1.61969 11.5112 1.49938 11.4838 1.38509C11.4563 1.27079 11.3895 1.16981 11.295 1.09988C11.2002 1.02915 11.0833 0.994354 10.9652 1.00168C10.8471 1.009 10.7354 1.05797 10.65 1.13988C10.3229 1.39504 9.9143 1.52294 9.50004 1.49988C9.08815 1.52269 8.68178 1.39669 8.35504 1.14488C8.26136 1.05176 8.13463 0.999487 8.00254 0.999487C7.87044 0.999487 7.74372 1.05176 7.65004 1.14488C7.32218 1.39826 6.91367 1.52436 6.50004 1.49988C6.08815 1.52269 5.68178 1.39669 5.35504 1.14488C5.27101 1.0602 5.15947 1.00836 5.04057 0.998709C4.92166 0.98906 4.80322 1.02224 4.70664 1.09227C4.61006 1.16229 4.54169 1.26454 4.51389 1.38055C4.48609 1.49656 4.50068 1.61869 4.55504 1.72488L5.69004 3.99988Z"
                      fill="#2F80ED"
                    />
                    <path
                      d="M10.62 5H5.38C4.31 6.295 2.5 8.865 2.5 11.5C2.5 13.785 4.24 15 5.5 15H10.5C11.76 15 13.5 13.785 13.5 11.5C13.5 8.865 11.69 6.295 10.62 5ZM8.5 12V12.5C8.5 12.6326 8.44732 12.7598 8.35355 12.8536C8.25979 12.9473 8.13261 13 8 13C7.86739 13 7.74021 12.9473 7.64645 12.8536C7.55268 12.7598 7.5 12.6326 7.5 12.5V12C7.23738 11.9993 6.97955 11.9296 6.75229 11.798C6.52503 11.6664 6.33631 11.4774 6.205 11.25C6.16385 11.1934 6.13503 11.1288 6.12041 11.0604C6.10579 10.992 6.10569 10.9213 6.12012 10.8528C6.13454 10.7844 6.16318 10.7197 6.20416 10.663C6.24515 10.6063 6.29758 10.5588 6.35806 10.5237C6.41854 10.4885 6.48573 10.4664 6.55528 10.4589C6.62483 10.4513 6.6952 10.4584 6.76183 10.4797C6.82846 10.5011 6.88987 10.5361 6.94209 10.5827C6.99432 10.6293 7.03619 10.6862 7.065 10.75C7.10905 10.8263 7.17248 10.8896 7.24887 10.9335C7.32526 10.9774 7.41189 11.0003 7.5 11H8.5C8.63261 11 8.75979 10.9473 8.85355 10.8536C8.94732 10.7598 9 10.6326 9 10.5C9 10.3674 8.94732 10.2402 8.85355 10.1464C8.75979 10.0527 8.63261 10 8.5 10H7.5C7.10218 10 6.72064 9.84196 6.43934 9.56066C6.15804 9.27936 6 8.89782 6 8.5C6 8.10218 6.15804 7.72064 6.43934 7.43934C6.72064 7.15804 7.10218 7 7.5 7V6.5C7.5 6.36739 7.55268 6.24021 7.64645 6.14645C7.74021 6.05268 7.86739 6 8 6C8.13261 6 8.25979 6.05268 8.35355 6.14645C8.44732 6.24021 8.5 6.36739 8.5 6.5V7C8.76262 7.00071 9.02045 7.07035 9.24771 7.20197C9.47497 7.33359 9.66369 7.52256 9.795 7.75C9.83615 7.80658 9.86497 7.87117 9.87959 7.93958C9.89421 8.008 9.89431 8.07872 9.87988 8.14718C9.86546 8.21564 9.83683 8.28031 9.79584 8.33701C9.75485 8.39371 9.70242 8.44117 9.64194 8.47633C9.58146 8.5115 9.51427 8.53358 9.44472 8.54115C9.37517 8.54872 9.3048 8.5416 9.23817 8.52027C9.17154 8.49894 9.11013 8.46386 9.05791 8.4173C9.00568 8.37075 8.96381 8.31375 8.935 8.25C8.89095 8.1737 8.82752 8.11039 8.75113 8.06649C8.67474 8.02259 8.58811 7.99965 8.5 8H7.5C7.36739 8 7.24021 8.05268 7.14645 8.14645C7.05268 8.24021 7 8.36739 7 8.5C7 8.63261 7.05268 8.75979 7.14645 8.85355C7.24021 8.94732 7.36739 9 7.5 9H8.5C8.89782 9 9.27936 9.15804 9.56066 9.43934C9.84196 9.72064 10 10.1022 10 10.5C10 10.8978 9.84196 11.2794 9.56066 11.5607C9.27936 11.842 8.89782 12 8.5 12Z"
                      fill="#2F80ED"
                    />
                  </svg>
                </div>
                <p className="text-[12px] text-[#230B34] font-['Work_Sans'] mt-[10px] tracking-[.2px]">
                  Total commissions Earned
                </p>
              </div>
              <div className="percentage flex justify-start gap-[10px] pl-[22px] items-end">
                <h2 className="text-[30px] text-[#230B34] mb-[10px] font-[500] font-['Work_Sans'] tracking-[.2px]">
                  ${" "}
                  {calculateTotalCommissionForAllClients(loginInSeller?.client)
                    ? calculateTotalCommissionForAllClients(
                        loginInSeller?.client
                      )
                    : 0}
                </h2>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -15, opacity: 0.1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,

                ease: [0.17, 0.67, 0.83, 0.67],
                delay: 0.8,
              }}
              className="withdrawn w-[305px] h-[150px] rounded-[8px] border bg-white  grid grid-rows-2 hover:scale-105 transition-all duration-500 ease-in-out"
            >
              <div className="customer flex justify-start items-start mt-[10px] pl-[14px] border-b gap-[9px]">
                <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center mt-[5px] bg-opacity-[.1] bg-[#F2994A] ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M1.98706 10.5C1.43456 10.5 0.987061 10.0525 0.987061 9.5V9C0.987061 8.4475 1.43456 8 1.98706 8H5.21306C5.07756 8.4775 5.00006 8.9795 5.00006 9.5C5.00006 9.842 5.03556 10.175 5.09556 10.5H1.98706ZM2.98706 4.5H8.22206C8.72906 4.268 9.27606 4.1095 9.85156 4.0415C9.95256 3.885 10.0131 3.7 10.0131 3.5V3C10.0131 2.4475 9.56556 2 9.01306 2H2.98706C2.43456 2 1.98706 2.4475 1.98706 3V3.5C1.98706 4.0525 2.43456 4.5 2.98706 4.5ZM2.98706 7.5H5.38206C5.78006 6.4855 6.46856 5.618 7.34756 5H2.98706C2.43456 5 1.98706 5.4475 1.98706 6V6.5C1.98706 7.0525 2.43456 7.5 2.98706 7.5ZM2.98706 11C2.43456 11 1.98706 11.4475 1.98706 12V12.5C1.98706 13.0525 2.43456 13.5 2.98706 13.5H6.73656C6.02256 12.8275 5.48856 11.969 5.21306 11H2.98706ZM15.0001 9.5C15.0001 11.981 12.9811 14 10.5001 14C8.01906 14 6.00006 11.981 6.00006 9.5C6.00006 7.019 8.01906 5 10.5001 5C12.9811 5 15.0001 7.019 15.0001 9.5ZM10.0001 8.75C10.0001 8.612 10.1121 8.5 10.2501 8.5H11.4706C11.7466 8.5 11.9706 8.276 11.9706 8C11.9706 7.724 11.7466 7.5 11.4706 7.5H11.0001V7C11.0001 6.724 10.7761 6.5 10.5001 6.5C10.2241 6.5 10.0001 6.724 10.0001 7V7.5C10.0001 7.509 10.0046 7.516 10.0051 7.525C9.43306 7.6395 9.00006 8.145 9.00006 8.75C9.00006 9.439 9.56106 10 10.2501 10H10.7206C10.8586 10 10.9706 10.112 10.9706 10.272C10.9706 10.41 10.8586 10.522 10.7206 10.522H9.50006C9.22406 10.522 9.00006 10.746 9.00006 11.022C9.00006 11.298 9.22406 11.522 9.50006 11.522H10.0001V12C10.0001 12.276 10.2241 12.5 10.5001 12.5C10.7761 12.5 11.0001 12.276 11.0001 12V11.5C11.0001 11.496 10.9981 11.4925 10.9976 11.4885C11.5536 11.3615 11.9706 10.8625 11.9706 10.25C11.9706 9.561 11.4096 9 10.7206 9H10.2501C10.1121 9 10.0001 8.888 10.0001 8.75Z"
                      fill="#F2994A"
                    />
                  </svg>
                </div>
                <p className="text-[14px] text-[#230B34] font-['Work_Sans'] mt-[10px] font-[500] tracking-[.2px]">
                  Total Withdrawn
                </p>
              </div>
              <div className="percentage flex justify-start gap-[10px] pl-[25px] items-end">
                <h2 className="text-[30px] font-[500] text-[#230B34] mb-[10px] font-['Work_Sans'] tracking-[.2px]">
                  $
                  {loginInSeller?.totalWithdrawn
                    ? loginInSeller?.totalWithdrawn
                    : 0}
                </h2>
              </div>
            </motion.div>
          </div>
          {/* =================================================TODO:table  */}
          <div className="table w-full h-full   mt-[20px]">
            {/*============================================= TODO:search  */}
            <div className="search  flex justify-between items-center w-full h-[40px]">
              <div className="flex w-full h-[40px] items-center">
                {!sellerTable && (
                  <motion.div
                    initial={{ y: -15, opacity: 0.3 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1,
                    }}
                    className="text_search w-[150px] border h-[40px]  shrink-0 flex items-center pl-[15px] mr-[8px] rounded-[8px]  transition-all duration-500 ease-in-out"
                  >
                    <select
                      onChange={handleInputChange}
                      name="companyName"
                      className="w-full px-2"
                      id=""
                    >
                      <option value="">company</option>
                      {company?.map((item, index) => {
                        return (
                          <option value={item?.companyName} key={index}>
                            {item?.companyName}
                          </option>
                        );
                      })}
                    </select>
                  </motion.div>
                )}
                <motion.div
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1,
                  }}
                  className="text_search w-[222px] border h-[40px]  shrink-0 flex items-center pl-[15px] mr-[8px] rounded-[8px] transition-all duration-500 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M15.5325 14.4675L12.9825 11.925C13.8052 10.8768 14.2517 9.58249 14.25 8.25C14.25 7.06332 13.8981 5.90328 13.2388 4.91658C12.5795 3.92989 11.6425 3.16085 10.5461 2.70673C9.44975 2.2526 8.24335 2.13378 7.07946 2.36529C5.91558 2.5968 4.84648 3.16825 4.00736 4.00736C3.16825 4.84648 2.5968 5.91558 2.36529 7.07946C2.13378 8.24335 2.2526 9.44975 2.70673 10.5461C3.16085 11.6425 3.92989 12.5795 4.91658 13.2388C5.90328 13.8981 7.06332 14.25 8.25 14.25C9.58249 14.2517 10.8768 13.8052 11.925 12.9825L14.4675 15.5325C14.5372 15.6028 14.6202 15.6586 14.7116 15.6967C14.803 15.7347 14.901 15.7544 15 15.7544C15.099 15.7544 15.197 15.7347 15.2884 15.6967C15.3798 15.6586 15.4628 15.6028 15.5325 15.5325C15.6028 15.4628 15.6586 15.3798 15.6967 15.2884C15.7347 15.197 15.7544 15.099 15.7544 15C15.7544 14.901 15.7347 14.803 15.6967 14.7116C15.6586 14.6202 15.6028 14.5372 15.5325 14.4675ZM3.75 8.25C3.75 7.35999 4.01392 6.48996 4.50839 5.74994C5.00286 5.00992 5.70566 4.43314 6.52793 4.09254C7.3502 3.75195 8.255 3.66284 9.12791 3.83647C10.0008 4.0101 10.8026 4.43869 11.432 5.06802C12.0613 5.69736 12.4899 6.49918 12.6635 7.3721C12.8372 8.24501 12.7481 9.14981 12.4075 9.97208C12.0669 10.7943 11.4901 11.4972 10.7501 11.9916C10.01 12.4861 9.14002 12.75 8.25 12.75C7.05653 12.75 5.91194 12.2759 5.06802 11.432C4.22411 10.5881 3.75 9.44348 3.75 8.25Z"
                      fill="#878790"
                    />
                  </svg>
                  <input
                    onChange={handleInputChange}
                    value={input.text}
                    name="text"
                    className="text-[12px] focus:outline-none text-[#878790] pl-[8px]"
                    type="text"
                    placeholder="Search"
                  />
                </motion.div>
                {sellerTable && (
                  <motion.div
                    initial={{ y: -15, opacity: 0.3 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.3,
                    }}
                    className="text_search h-[40px]  w-[222px] border flex items-center pl-[15px] mr-[8px] rounded-[8px]  transition-all duration-500 ease-in-out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M15.5325 14.4675L12.9825 11.925C13.8052 10.8768 14.2517 9.58249 14.25 8.25C14.25 7.06332 13.8981 5.90328 13.2388 4.91658C12.5795 3.92989 11.6425 3.16085 10.5461 2.70673C9.44975 2.2526 8.24335 2.13378 7.07946 2.36529C5.91558 2.5968 4.84648 3.16825 4.00736 4.00736C3.16825 4.84648 2.5968 5.91558 2.36529 7.07946C2.13378 8.24335 2.2526 9.44975 2.70673 10.5461C3.16085 11.6425 3.92989 12.5795 4.91658 13.2388C5.90328 13.8981 7.06332 14.25 8.25 14.25C9.58249 14.2517 10.8768 13.8052 11.925 12.9825L14.4675 15.5325C14.5372 15.6028 14.6202 15.6586 14.7116 15.6967C14.803 15.7347 14.901 15.7544 15 15.7544C15.099 15.7544 15.197 15.7347 15.2884 15.6967C15.3798 15.6586 15.4628 15.6028 15.5325 15.5325C15.6028 15.4628 15.6586 15.3798 15.6967 15.2884C15.7347 15.197 15.7544 15.099 15.7544 15C15.7544 14.901 15.7347 14.803 15.6967 14.7116C15.6586 14.6202 15.6028 14.5372 15.5325 14.4675ZM3.75 8.25C3.75 7.35999 4.01392 6.48996 4.50839 5.74994C5.00286 5.00992 5.70566 4.43314 6.52793 4.09254C7.3502 3.75195 8.255 3.66284 9.12791 3.83647C10.0008 4.0101 10.8026 4.43869 11.432 5.06802C12.0613 5.69736 12.4899 6.49918 12.6635 7.3721C12.8372 8.24501 12.7481 9.14981 12.4075 9.97208C12.0669 10.7943 11.4901 11.4972 10.7501 11.9916C10.01 12.4861 9.14002 12.75 8.25 12.75C7.05653 12.75 5.91194 12.2759 5.06802 11.432C4.22411 10.5881 3.75 9.44348 3.75 8.25Z"
                        fill="#878790"
                      />
                    </svg>
                    <input
                      onChange={handleInputChange}
                      value={input.email}
                      name="email"
                      className="text-[12px] focus:outline-none text-[#878790] pl-[8px]"
                      type="text"
                      placeholder="email"
                    />
                  </motion.div>
                )}
                {sellerTable && (
                  <motion.div className="selete_search h-[40px]  w-[117px] border overflow-hidden rounded-[8px] px-[4px] text-cyan-700 text-[12px] font-[500] transition-all duration-500 ease-in-out">
                    <motion.select
                      initial={{ y: -15, opacity: 0.3 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.6,
                      }}
                      className="w-full h-full focus:outline-none"
                      name="role"
                      onChange={handleInputChange}
                      value={input.role}
                      id=""
                    >
                      <option className="text-cyan-700 " value="">
                        select role
                      </option>
                      <option className="text-cyan-700 " value="admin">
                        admin
                      </option>
                      <option className="text-cyan-700 " value="user">
                        user
                      </option>
                      <option className="text-cyan-700 " value="super_admin">
                        Super admin
                      </option>
                    </motion.select>
                  </motion.div>
                )}
                {!sellerTable && (
                  <>
                    <motion.div
                      initial={{ y: -15, opacity: 0.3 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.3,
                      }}
                      className="date_search h-[40px]  rounded-[8px] flex items-center justify-between gap-[5px]  px-[15px] mr-[10px]  transition-all duration-500 ease-in-out"
                    >
                      <div className="flex w-[136px] items-center border rounded-md px-2">
                        <DatePicker
                          className="text-[12px]  h-[40px] w-[80%] px-2 font-['Roboto'] text-gray-400 placeholder:text-[12px] focus:outline-none placeholder:font-[400]   capitalize"
                          selected={input.startDate}
                          placeholderText="Start Time"
                          onChange={(date) =>
                            setInput((prev) => ({ ...prev, startDate: date }))
                          }
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="15"
                          viewBox="0 0 14 15"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_657_266)">
                            <path
                              d="M12.7502 2.37695H10.1252V1.37695C10.1252 1.3082 10.069 1.25195 10.0002 1.25195H9.12523C9.05648 1.25195 9.00023 1.3082 9.00023 1.37695V2.37695H5.00024V1.37695C5.00024 1.3082 4.94399 1.25195 4.87524 1.25195H4.00024C3.93149 1.25195 3.87524 1.3082 3.87524 1.37695V2.37695H1.25024C0.973681 2.37695 0.750244 2.60039 0.750244 2.87695V13.252C0.750244 13.5285 0.973681 13.752 1.25024 13.752H12.7502C13.0268 13.752 13.2502 13.5285 13.2502 13.252V2.87695C13.2502 2.60039 13.0268 2.37695 12.7502 2.37695ZM12.1252 12.627H1.87524V6.68945H12.1252V12.627ZM1.87524 5.62695V3.50195H3.87524V4.25195C3.87524 4.3207 3.93149 4.37695 4.00024 4.37695H4.87524C4.94399 4.37695 5.00024 4.3207 5.00024 4.25195V3.50195H9.00023V4.25195C9.00023 4.3207 9.05648 4.37695 9.12523 4.37695H10.0002C10.069 4.37695 10.1252 4.3207 10.1252 4.25195V3.50195H12.1252V5.62695H1.87524Z"
                              fill="#757575"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_657_266">
                              <rect
                                width="14"
                                height="14"
                                fill="white"
                                transform="translate(0 0.5)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20.4633 9.16094L16.6195 4.28594C16.5494 4.19694 16.4601 4.12498 16.3582 4.07546C16.2563 4.02594 16.1445 4.00014 16.0312 4H14.5125C14.3555 4 14.2688 4.18047 14.3648 4.30469L17.7469 8.59375H3.5625C3.45937 8.59375 3.375 8.67812 3.375 8.78125V10.1875C3.375 10.2906 3.45937 10.375 3.5625 10.375H19.8727C20.5008 10.375 20.85 9.65313 20.4633 9.16094Z"
                          fill="#757575"
                        />
                        <path
                          d="M3.5369 15.2141L7.38065 20.0891C7.45075 20.1781 7.54009 20.25 7.64198 20.2995C7.74387 20.3491 7.85565 20.3749 7.96893 20.375H9.48768C9.64471 20.375 9.73143 20.1945 9.63534 20.0703L6.25331 15.7812H20.4377C20.5408 15.7812 20.6252 15.6969 20.6252 15.5938V14.1875C20.6252 14.0844 20.5408 14 20.4377 14H4.12753C3.4994 14 3.15018 14.7219 3.5369 15.2141Z"
                          fill="#757575"
                        />
                      </svg>
                      <div className="flex w-[136px] items-center border rounded-md px-2">
                        <DatePicker
                          className="text-[12px] font-['Roboto'] text-gray-400 placeholder:text-[12px] focus:outline-none placeholder:font-[400]   rounded-md h-[40px]  px-2 w-[80%]  capitalize"
                          selected={input.endDate}
                          placeholderText="End Time"
                          onChange={(date) =>
                            setInput((prev) => ({ ...prev, endDate: date }))
                          }
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="15"
                          viewBox="0 0 14 15"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_657_266)">
                            <path
                              d="M12.7502 2.37695H10.1252V1.37695C10.1252 1.3082 10.069 1.25195 10.0002 1.25195H9.12523C9.05648 1.25195 9.00023 1.3082 9.00023 1.37695V2.37695H5.00024V1.37695C5.00024 1.3082 4.94399 1.25195 4.87524 1.25195H4.00024C3.93149 1.25195 3.87524 1.3082 3.87524 1.37695V2.37695H1.25024C0.973681 2.37695 0.750244 2.60039 0.750244 2.87695V13.252C0.750244 13.5285 0.973681 13.752 1.25024 13.752H12.7502C13.0268 13.752 13.2502 13.5285 13.2502 13.252V2.87695C13.2502 2.60039 13.0268 2.37695 12.7502 2.37695ZM12.1252 12.627H1.87524V6.68945H12.1252V12.627ZM1.87524 5.62695V3.50195H3.87524V4.25195C3.87524 4.3207 3.93149 4.37695 4.00024 4.37695H4.87524C4.94399 4.37695 5.00024 4.3207 5.00024 4.25195V3.50195H9.00023V4.25195C9.00023 4.3207 9.05648 4.37695 9.12523 4.37695H10.0002C10.069 4.37695 10.1252 4.3207 10.1252 4.25195V3.50195H12.1252V5.62695H1.87524Z"
                              fill="#757575"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_657_266">
                              <rect
                                width="14"
                                height="14"
                                fill="white"
                                transform="translate(0 0.5)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ y: -15, opacity: 0.3 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1,
                      }}
                      className="selete_search  h-[40px] w-[117px] border overflow-hidden rounded-[8px] px-[4px] text-cyan-700 text-[12px] font-[500] hover:scale-105 transition-all duration-500 ease-in-out"
                    >
                      <motion.select
                        initial={{ y: -15, opacity: 0.3 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.6,
                        }}
                        className="w-full h-full focus:outline-none"
                        name="status"
                        onChange={handleInputChange}
                        value={input.status}
                        id=""
                      >
                        <option className="text-cyan-700 " value="">
                          Status
                        </option>
                        <option className="text-cyan-700 " value="pending">
                          Pending
                        </option>
                        <option className="text-cyan-700 " value="on going">
                          On going
                        </option>
                        <option className="text-cyan-700 " value="on hold">
                          On hold
                        </option>
                        <option className="text-cyan-700 " value="complete">
                          Complete
                        </option>
                      </motion.select>
                    </motion.div>
                  </>
                )}
                <motion.button
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3,
                  }}
                  onClick={() =>
                    setInput({
                      text: "",
                      endDate: "",
                      startDate: "",
                      status: "",
                      email: "",
                      rol: "",
                    })
                  }
                  className="w-[40px] rounded-md h-[40px] flex justify-center items-center border ml-4 border-gray-300 hover:bg-gray-200 transition-all duration-500 ease-in-out hover:scale-105 group"
                >
                  <svg
                    fill="#7b7a7a"
                    width="20"
                    height="20"
                    viewBox="0 0 1920 1920"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`group-hover:rotate-[360deg]`}
                  >
                    <path
                      d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0"
                      fillRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </div>
              <div className="addClient gap-[10px] flex items-center justify-self-end right-0">
                <motion.button
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2,
                  }}
                  onClick={() => setSellerTable(!sellerTable)}
                  className="add-client pr-[4px] w-[121px] hover:bg-gray-700 h-[38px] flex items-center justify-center gap-[10px] bg-cyan-700  hover:text-white  transition-all duration-500 ease-in-out text-white font-['Roboto'] text-[12px] font-[500] rounded-[7px] hover:scale-105"
                >
                  {sellerTable ? "Client" : "Seller"}
                </motion.button>

                <motion.div
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1,
                  }}
                  className="help w-[40px] h-[38px] flex justify-center items-center bg-[#A4A4A61A] hover:scale-105 transition-all duration-500 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_658_358)">
                      <path
                        d="M10 0C4.47301 0 0 4.4725 0 10C0 15.5269 4.4725 20 10 20C15.527 20 20 15.5275 20 10C20 4.47301 15.5275 0 10 0ZM10 18.6046C5.25539 18.6046 1.39535 14.7446 1.39535 10C1.39535 5.25535 5.25539 1.39535 10 1.39535C14.7446 1.39535 18.6046 5.25535 18.6046 10C18.6046 14.7446 14.7446 18.6046 10 18.6046Z"
                        fill="#878791"
                      />
                      <path
                        d="M9.7041 12.6533C9.15125 12.6533 8.70371 13.114 8.70371 13.6668C8.70371 14.2066 9.13809 14.6804 9.7041 14.6804C10.2701 14.6804 10.7176 14.2066 10.7176 13.6668C10.7176 13.114 10.2569 12.6533 9.7041 12.6533Z"
                        fill="#878791"
                      />
                      <path
                        d="M9.87519 4.97949C8.09816 4.97949 7.28207 6.03258 7.28207 6.74336C7.28207 7.25672 7.71645 7.49367 8.07184 7.49367C8.78266 7.49367 8.49309 6.48008 9.8357 6.48008C10.4938 6.48008 11.0204 6.76969 11.0204 7.3752C11.0204 8.08598 10.2832 8.49402 9.84887 8.86258C9.46711 9.1916 8.96695 9.73133 8.96695 10.8634C8.96695 11.5478 9.15125 11.7453 9.6909 11.7453C10.3359 11.7453 10.4675 11.4557 10.4675 11.2055C10.4675 10.5211 10.4807 10.1262 11.2046 9.5602C11.56 9.28379 12.6789 8.38867 12.6789 7.15137C12.6789 5.91406 11.56 4.97949 9.87519 4.97949Z"
                        fill="#878791"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_658_358">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </motion.div>
                <motion.button
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1,
                  }}
                  onClick={() => setClientModel(true)}
                  className="add-client pr-[4px] w-[162px] hover:bg-gray-700 h-[38px] flex items-center justify-center gap-[10px] bg-cyan-700  hover:text-white  transition-all duration-500 ease-in-out text-white font-['Roboto'] text-[12px] font-[500] rounded-[7px] hover:scale-105"
                >
                  Add New Client
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8 13.7492C7.56844 13.7492 7.21875 13.3996 7.21875 12.968V3.03174C7.21875 2.60018 7.56844 2.25049 8 2.25049C8.43156 2.25049 8.78125 2.60018 8.78125 3.03174V12.968C8.78125 13.3996 8.43156 13.7492 8 13.7492Z"
                      fill="white"
                    />
                    <path
                      d="M12.9681 8.78125H3.03188C2.60031 8.78125 2.25063 8.43156 2.25063 8C2.25063 7.56844 2.60031 7.21875 3.03188 7.21875H12.9681C13.3997 7.21875 13.7494 7.56844 13.7494 8C13.7494 8.43156 13.3997 8.78125 12.9681 8.78125Z"
                      fill="white"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
            {/* ========================== TODO:table container  */}
            <div className="table_container overflow-auto mt-[20px]">
              {sellerTable ? (
                <SellerTableComponent
                  sellerId={loginInSeller?._id}
                  input={input}
                />
              ) : (
                <TableComponent sellerId={loginInSeller?._id} input={input} />
              )}
            </div>
          </div>
        </div>
      </>
    </motion.div>
  );
};

export default Home;
