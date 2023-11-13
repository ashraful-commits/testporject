import { useEffect, useState } from "react";
import logo from "../../../public/logo.png";
import avatar from "../../../public/user.png";
import TableComponent from "../../Components/TableComponent";
import Model from "../../Components/Model/Model";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  LoggedInSeller,
  LogoutSeller,
  getAllSeller,
} from "../../Features/Seller/SellerApi";
import { Toastify } from "../../Utils/Tostify";
import {
  getAllSellerState,
  setMessageEmpty,
} from "../../Features/Seller/SellerSlice";
import { getAllClientState } from "../../Features/Client/ClientSlice";
import { calculateTotalCommissionForAllClients } from "../../Utils/CommissionCount";
import LoadingSpinner from "../../Components/LoadingSpin";
import SellerTableComponent from "../../Components/SellerTableComponent";
import useFormHook from "../../Hooks/useFormHook";

const Home = () => {
  const [notification, setNotification] = useState(false);
  const [clientModel, setClientModel] = useState(false);
  const [sellerTable, setSellerTable] = useState(false);
  const [currentTime, setCurrentTime] = useState(false);

  const { input, setInput, handleInputChange } = useFormHook({
    text: "",
    endDate: "",
    startDate: "",
    status: "",
    email: "",
    rol: "",
  });
  const { error, message, loader, loginInSeller, seller } =
    useSelector(getAllSellerState);
  const { client } = useSelector(getAllClientState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(LogoutSeller());
    localStorage.clear("Seller");
    navigate("/login");
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

    if (!localStorage.getItem("Seller")) {
      navigate("/login");
    }
  }, [error, message, dispatch, navigate]);

  useEffect(() => {
    dispatch(LoggedInSeller());
  }, [dispatch]);

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

  return (
    <div className="min-w-[1340px]  bg-[#fff] rounded-[15px] min-h-[909px] grid grid-flow-col overflow-hidden">
      <>
        {clientModel && <Model setClient={setClientModel} />}
        {/*=================================================== sidebar  */}
        <div className="sidebar flex flex-col items-center w-[295px]  bg-mediumBlack overflow-hidden">
          <div className="logo   w-full flex justify-center items-start ">
            <img className="w-[205px] mt-[52px] h-auto" src={logo} alt="" />
          </div>
          <div className="user mt-[85px] flex flex-col  items-center">
            <div className="avatar border-[1px] rounded-full overflow-hidden p-[9px] border-[#267596]">
              {loginInSeller?.avatar ? (
                <img
                  className="w-[84px] h-[84px] rounded-full"
                  src={loginInSeller?.avatar}
                  alt=""
                />
              ) : (
                <img
                  className="w-[84px] h-[84px] rounded-full"
                  src={avatar}
                  alt=""
                />
              )}
            </div>
            <h4 className="text-gray-100 text-[24px] font-[500] tracking-[-.2px]  mt-[10px] font-['Lato'] capitalize">
              {loginInSeller?.name}
            </h4>
            <span className="text-white text-[13px] font-['Lato']">
              {loginInSeller?.email}
            </span>
          </div>
          <div className="withdrawn mt-[50px] text-center flex flex-col items-center">
            <p className="text-white leading-[18px] tracking-[.2px] mt-[3px] font-[500] font-['Lato'] mr-[7px] text-[14px]">
              Total Withdrawn
            </p>
            <h2 className="text-white font-['Lato'] text-[32px]  tracking-[.5008px] font-[500] mt-[10px]">
              $
              {loginInSeller?.totalWithdrawn
                ? loginInSeller?.totalWithdrawn
                : 0}
            </h2>
          </div>
          <div className="salesToolkit mt-[25px]  gap-[13px] flex flex-col w-[192px] items-center h-[256px] justify-center rounded-[8px] bg-darkBlack">
            <p className=" transition-all duration-500 ease-in-out text-[#878790] font-['Work_Sans'] text-[16px] tracking-[-1px] mr-[1px]">
              Sales Toolkit
            </p>
            <button className="hover:bg-darkBlue transition-all duration-500 ease-in-out text-[#878790] font-['Work_Sans'] text-[12px] tracking-[-.2px] w-[154px] mt-[8px] h-[26px] bg-mediumBlack rounded-[4px] text-center">
              Email Signature
            </button>
            <button className="hover:bg-darkBlue transition-all duration-500 ease-in-out text-[#878790] font-['Work_Sans'] text-[12px] tracking-[-.2px] w-[154px] h-[26px] bg-mediumBlack rounded-[4px] text-center">
              Email Setup
            </button>
            <button className="hover:bg-darkBlue transition-all duration-500 ease-in-out text-[#878790] font-['Work_Sans'] text-[12px] tracking-[-.2px] w-[154px] h-[26px] bg-mediumBlack rounded-[4px] text-center">
              Pricing
            </button>
            <Link
              target="blank"
              to={loginInSeller?.website}
              className="hover:bg-darkBlue transition-all duration-500 ease-in-out text-[#878790] font-['Work_Sans'] text-[12px] tracking-[-.2px] w-[154px] h-[26px] bg-mediumBlack rounded-[4px] text-center"
            >
              Website
            </Link>
            <div className="flex justify-center items-center gap-3">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                >
                  <path
                    d="M16.8889 0C17.1246 0 17.3508 0.0936534 17.5174 0.260347C17.6841 0.427049 17.7778 0.653138 17.7778 0.888889V15.1111C17.7778 15.3468 17.6841 15.573 17.5174 15.7396C17.3508 15.9063 17.1246 16 16.8889 16H0.888889C0.653138 16 0.427049 15.9063 0.260347 15.7396C0.0936534 15.573 0 15.3468 0 15.1111V0.888889C0 0.653138 0.0936534 0.427049 0.260347 0.260347C0.427049 0.0936534 0.653138 0 0.888889 0H16.8889ZM6.57689 4.44444H4.79911L1.95467 11.5556H3.86933L4.22489 10.6667H7.14933L7.50489 11.5556H9.42044L6.57689 4.44444ZM15.1111 4.44444H13.3333V6.22222H12.4444C11.7503 6.22156 11.0833 6.49156 10.5851 6.97493C10.0868 7.45822 9.79671 8.1168 9.77636 8.81067C9.756 9.50444 10.0069 10.1789 10.476 10.6907C10.945 11.2024 11.595 11.511 12.288 11.5511L12.4444 11.5556H15.1111V4.44444ZM13.3333 8V9.77778H12.4444L12.3404 9.77156C12.1244 9.74587 11.9252 9.64178 11.7808 9.47911C11.6364 9.31644 11.5565 9.10649 11.5565 8.88889C11.5565 8.67129 11.6364 8.46133 11.7808 8.29867C11.9252 8.136 12.1244 8.03191 12.3404 8.00622L12.4444 8H13.3333ZM5.688 7.00889L6.43911 8.88889H4.93511L5.688 7.00889Z"
                    fill="url(#paint0_linear_650_808)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_650_808"
                      x1="8.88889"
                      y1="-1.6"
                      x2="8.88889"
                      y2="17.6"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#CE9FFC" />
                      <stop offset="0.979167" stopColor="#7367F0" />
                    </linearGradient>
                  </defs>
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                >
                  <path
                    d="M17.4375 14.626H9.5625C9.252 14.626 9 14.374 9 14.0635C9 13.753 9 3.12398 9 2.81348C9 2.50298 9.252 2.25098 9.5625 2.25098H17.4375C17.748 2.25098 18 2.50298 18 2.81348V14.0635C18 14.374 17.748 14.626 17.4375 14.626Z"
                    fill="#ECEFF1"
                  />
                  <path
                    d="M11.8125 5.62598H9.5625C9.252 5.62598 9 5.37398 9 5.06348C9 4.75298 9.252 4.50098 9.5625 4.50098H11.8125C12.123 4.50098 12.375 4.75298 12.375 5.06348C12.375 5.37398 12.123 5.62598 11.8125 5.62598Z"
                    fill="#388E3C"
                  />
                  <path
                    d="M11.8125 7.87598H9.5625C9.252 7.87598 9 7.62398 9 7.31348C9 7.00298 9.252 6.75098 9.5625 6.75098H11.8125C12.123 6.75098 12.375 7.00298 12.375 7.31348C12.375 7.62398 12.123 7.87598 11.8125 7.87598Z"
                    fill="#388E3C"
                  />
                  <path
                    d="M11.8125 10.126H9.5625C9.252 10.126 9 9.87398 9 9.56348C9 9.25298 9.252 9.00098 9.5625 9.00098H11.8125C12.123 9.00098 12.375 9.25298 12.375 9.56348C12.375 9.87398 12.123 10.126 11.8125 10.126Z"
                    fill="#388E3C"
                  />
                  <path
                    d="M11.8125 12.376H9.5625C9.252 12.376 9 12.124 9 11.8135C9 11.503 9.252 11.251 9.5625 11.251H11.8125C12.123 11.251 12.375 11.503 12.375 11.8135C12.375 12.124 12.123 12.376 11.8125 12.376Z"
                    fill="#388E3C"
                  />
                  <path
                    d="M15.1875 5.62598H14.0625C13.752 5.62598 13.5 5.37398 13.5 5.06348C13.5 4.75298 13.752 4.50098 14.0625 4.50098H15.1875C15.498 4.50098 15.75 4.75298 15.75 5.06348C15.75 5.37398 15.498 5.62598 15.1875 5.62598Z"
                    fill="#388E3C"
                  />
                  <path
                    d="M15.1875 7.87598H14.0625C13.752 7.87598 13.5 7.62398 13.5 7.31348C13.5 7.00298 13.752 6.75098 14.0625 6.75098H15.1875C15.498 6.75098 15.75 7.00298 15.75 7.31348C15.75 7.62398 15.498 7.87598 15.1875 7.87598Z"
                    fill="#388E3C"
                  />
                  <path
                    d="M15.1875 10.126H14.0625C13.752 10.126 13.5 9.87398 13.5 9.56348C13.5 9.25298 13.752 9.00098 14.0625 9.00098H15.1875C15.498 9.00098 15.75 9.25298 15.75 9.56348C15.75 9.87398 15.498 10.126 15.1875 10.126Z"
                    fill="#388E3C"
                  />
                  <path
                    d="M15.1875 12.376H14.0625C13.752 12.376 13.5 12.124 13.5 11.8135C13.5 11.503 13.752 11.251 14.0625 11.251H15.1875C15.498 11.251 15.75 11.503 15.75 11.8135C15.75 12.124 15.498 12.376 15.1875 12.376Z"
                    fill="#388E3C"
                  />
                  <path
                    d="M9.92138 0.130133C9.79313 0.023258 9.621 -0.022867 9.459 0.010883L0.459 1.69838C0.192375 1.74788 0 1.97963 0 2.25076V14.6258C0 14.8958 0.192375 15.1286 0.459 15.1781L9.459 16.8656C9.49275 16.8724 9.52763 16.8758 9.5625 16.8758C9.693 16.8758 9.82013 16.8308 9.92138 16.7464C10.0508 16.6395 10.125 16.4798 10.125 16.3133V0.563258C10.125 0.395633 10.0508 0.237008 9.92138 0.130133Z"
                    fill="#2E7D32"
                  />
                  <path
                    d="M7.73547 10.3183L5.95684 8.28542L7.75572 5.97242C7.94697 5.72717 7.90197 5.37392 7.65784 5.18267C7.41372 4.99142 7.06047 5.03642 6.86809 5.28054L5.20197 7.42254L3.79797 5.81829C3.59209 5.58204 3.23659 5.56067 3.00484 5.76542C2.77084 5.97017 2.74722 6.32567 2.95197 6.55854L4.49884 8.32704L2.93059 10.343C2.73934 10.5883 2.78434 10.9415 3.02847 11.1328C3.13197 11.2127 3.25459 11.2509 3.37497 11.2509C3.54259 11.2509 3.70797 11.1767 3.81934 11.0338L5.25372 9.18879L6.88947 11.0574C7.00084 11.1857 7.15609 11.2509 7.31247 11.2509C7.44409 11.2509 7.57572 11.2048 7.68259 11.1114C7.91659 10.9067 7.94022 10.5512 7.73547 10.3183Z"
                    fill="#FAFAFA"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.08295 0H7.43228L11.966 4.72564V13.9171C11.966 15.0685 11.0345 16 9.88704 16H2.08295C0.931531 16 3.29037e-10 15.0685 3.29037e-10 13.9171V2.08295C-2.02156e-05 0.931531 0.931511 0 2.08295 0Z"
                    fill="#E5252A"
                  />
                  <path
                    opacity="0.302"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.42816 0V4.68966H11.9659L7.42816 0Z"
                    fill="white"
                  />
                  <path
                    d="M2.3147 11.9382V9.01562H3.55808C3.86593 9.01562 4.10981 9.09958 4.29372 9.2715C4.47762 9.43941 4.56958 9.66731 4.56958 9.95116C4.56958 10.235 4.47762 10.4629 4.29372 10.6308C4.10981 10.8027 3.86593 10.8867 3.55808 10.8867H3.06232V11.9382H2.3147ZM3.06232 10.251H3.47412C3.58606 10.251 3.67402 10.227 3.734 10.1711C3.79396 10.1191 3.82596 10.0471 3.82596 9.95118C3.82596 9.85523 3.79398 9.78326 3.734 9.73129C3.67404 9.67531 3.58608 9.65134 3.47412 9.65134H3.06232V10.251ZM4.87741 11.9382V9.01562H5.91289C6.11679 9.01562 6.3087 9.0436 6.4886 9.10358C6.66851 9.16354 6.83244 9.24752 6.97636 9.36346C7.12029 9.4754 7.23623 9.62732 7.32019 9.81923C7.40014 10.0111 7.44413 10.231 7.44413 10.4789C7.44413 10.7228 7.40016 10.9427 7.32019 11.1346C7.23623 11.3265 7.12029 11.4784 6.97636 11.5903C6.83242 11.7063 6.66851 11.7902 6.4886 11.8502C6.3087 11.9102 6.11679 11.9382 5.91289 11.9382H4.87741ZM5.60905 11.3025H5.82494C5.94087 11.3025 6.04883 11.2905 6.14877 11.2625C6.24472 11.2345 6.33668 11.1905 6.42464 11.1306C6.5086 11.0706 6.57656 10.9866 6.62454 10.8747C6.67251 10.7628 6.69651 10.6308 6.69651 10.4789C6.69651 10.323 6.67251 10.191 6.62454 10.0791C6.57656 9.96717 6.5086 9.88321 6.42464 9.82323C6.33668 9.76327 6.24474 9.71928 6.14877 9.6913C6.04883 9.66332 5.94087 9.65132 5.82494 9.65132H5.60905V11.3025ZM7.81995 11.9382V9.01562H9.89891V9.65132H8.56757V10.1191H9.63103V10.7508H8.56757V11.9382H7.81995Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="logout w-full flex justify-center items-center mt-[100px]">
            <button className="flex gap-[10px] mr-3 items-center text-[14px] text-white font-['Lato']">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clipPath="url(#clip0_668_528)">
                  <path
                    d="M7.97344 14.6443H1.99334C1.62656 14.6443 1.32891 14.3466 1.32891 13.9799V2.01974C1.32891 1.65296 1.62659 1.3553 1.99334 1.3553H7.97344C8.34087 1.3553 8.63787 1.0583 8.63787 0.690867C8.63787 0.32343 8.34087 0.0263672 7.97344 0.0263672H1.99334C0.894344 0.0263672 0 0.920742 0 2.01974V13.9799C0 15.0789 0.894344 15.9732 1.99334 15.9732H7.97344C8.34087 15.9732 8.63787 15.6762 8.63787 15.3088C8.63787 14.9413 8.34087 14.6443 7.97344 14.6443Z"
                    fill="#878790"
                  />
                  <path
                    d="M15.802 7.52713L11.7621 3.54041C11.5016 3.2826 11.0804 3.28594 10.8226 3.54707C10.5648 3.80819 10.5674 4.22879 10.8292 4.4866L13.7163 7.33576H5.98005C5.61261 7.33576 5.31561 7.63276 5.31561 8.00019C5.31561 8.36763 5.61261 8.66466 5.98005 8.66466H13.7163L10.8292 11.5138C10.5675 11.7716 10.5655 12.1922 10.8226 12.4534C10.9528 12.5849 11.1242 12.6514 11.2957 12.6514C11.4645 12.6514 11.6332 12.5876 11.7621 12.46L15.802 8.47326C15.9282 8.34835 16 8.17823 16 8.00016C16 7.82216 15.9289 7.65272 15.802 7.52713Z"
                    fill="#878790"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_668_528">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <button
                onClick={handleLogout}
                className="hover:text-darkBlue ease-in-out transition-all"
              >
                Logout
              </button>
            </button>
          </div>
        </div>
        {/**======================================================dashboard */}
        <div className="dashboard px-[35px] w-[1045px] h-full">
          {/* ===========================================header  */}
          <div className="header items-center mt-[30px] w-full h-[37px]  flex justify-between">
            <h5 className="text-[14px] font-['Lato']  font-[400] leading-[18px] tracking-[.2px] text-[#05222E]">
              Sales / Dashboard
            </h5>
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
                  className="noti hover:bg-gray-400 transition-all relative duration-500 ease-in-out  w-[37px] h-[37px] justify-center items-center flex rounded-full bg-gray-200"
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
                  {/* //====================================== Notification dropdown menu */}
                  {notification && (
                    <div className="absolute border overflow-hidden p-[18px] w-[325px] h-[580px] bg-white z-[99999] shadow-lg right-[10px] top-[35px] rounded-[10px]">
                      <div className="header flex items-center justify-between">
                        <p className="font-[500]">Notifications</p>
                        <a
                          className="text-[10px] inline-block underline-2"
                          href=""
                        >
                          Mark all as read
                        </a>
                      </div>
                      <div className="Navbar border-b flex justify-between items-end  w-full h-[44px]">
                        <div className="group_button flex items-center ">
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
                            <div className="avatar w-6 h-6 overflow-hidden rounded-sm">
                              <img
                                className="w-full h-full"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="message_datials flex flex-col justify-center items-start">
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
                            <div className="avatar w-6 h-6 overflow-hidden rounded-sm">
                              <img
                                className="w-full h-full"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="message_datials flex flex-col justify-center items-start">
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
                            <div className="avatar w-6 h-6 overflow-hidden rounded-sm">
                              <img
                                className="w-full h-full"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="message_datials flex flex-col justify-center items-start">
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
                            <div className="avatar w-6 h-6 overflow-hidden rounded-sm">
                              <img
                                className="w-full h-full"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="message_datials flex flex-col justify-center items-start">
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
                            <div className="avatar w-6 h-6 overflow-hidden rounded-sm">
                              <img
                                className="w-full h-full"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="message_datials flex flex-col justify-center items-start">
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
                            <div className="avatar w-6 h-6 overflow-hidden rounded-sm">
                              <img
                                className="w-full h-full"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="message_datials flex flex-col justify-center items-start">
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
                            <div className="avatar w-6 h-6 overflow-hidden rounded-sm">
                              <img
                                className="w-full h-full"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="message_datials flex flex-col justify-center items-start">
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
                            <div className="avatar w-6 h-6 overflow-hidden rounded-sm">
                              <img
                                className="w-full h-full"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="message_datials flex flex-col justify-center items-start">
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
                            <div className="avatar w-6 h-6 overflow-hidden rounded-sm">
                              <img
                                className="w-full h-full"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="message_datials flex flex-col justify-center items-start">
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
                            <div className="avatar w-6 h-6 overflow-hidden rounded-sm">
                              <img
                                className="w-full h-full"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="message_datials flex flex-col justify-center items-start">
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
                            <div className="avatar w-6 h-6 overflow-hidden rounded-sm">
                              <img
                                className="w-full h-full"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="message_datials flex flex-col justify-center items-start">
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
                            <div className="avatar w-6 h-6 overflow-hidden rounded-sm">
                              <img
                                className="w-full h-full"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="message_datials flex flex-col justify-center items-start">
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
                            <div className="avatar w-6 h-6 overflow-hidden rounded-sm">
                              <img
                                className="w-full h-full"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="message_datials flex flex-col justify-center items-start">
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
                            <div className="avatar w-6 h-6 overflow-hidden rounded-sm">
                              <img
                                className="w-full h-full"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="message_datials flex flex-col justify-center items-start">
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
                            <div className="avatar w-6 h-6 overflow-hidden rounded-sm">
                              <img
                                className="w-full h-full"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="message_datials flex flex-col justify-center items-start">
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
                            <div className="avatar w-6 h-6 overflow-hidden rounded-sm">
                              <img
                                className="w-full h-full"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="message_datials flex flex-col justify-center items-start">
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
                    </div>
                  )}
                </button>
                <button className="setting hover:bg-gray-400 transition-all duration-500 ease-in-out w-[37px] h-[37px] justify-center items-center flex rounded-full bg-gray-200">
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
          {/* =============================================welcome  */}
          <div className="welcome mt-[11px] ml-[2px] flex justify-between items-center">
            <h1 className="text-[26px] font-[400] tracking-[-.52px]">
              Welcome Back{" "}
              <span className="font-[600] capitalize">
                , {loginInSeller?.name}
              </span>
            </h1>
            <p className="text-[14px] tracking-[1px] mt-[10px]">
              {currentTime}
            </p>
          </div>
          {/*================================================ message  */}
          <div className="message rounded-[4px] flex items-center overflow-hidden justify-between mt-[15px] w-[974px] h-[43px] bg-darkBlue">
            <div className="text flex items-center justify-center">
              <div className="icon border-r ml-[4px] h-[20px] w-[40px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="28"
                  viewBox="0 0 29 28"
                  fill="none"
                >
                  <g opacity="0.7" clipPath="url(#clip0_650_831)">
                    <path
                      d="M21.0006 8.38525L19.8793 9.01025C19.7306 9.09313 19.6221 9.22965 19.5776 9.38976C19.5332 9.54987 19.5565 9.72047 19.6423 9.86402C19.7282 10.0076 19.8696 10.1123 20.0354 10.1552C20.2013 10.1981 20.378 10.1757 20.5267 10.0928L21.648 9.46779C21.7967 9.38491 21.9052 9.24839 21.9497 9.08828C21.9941 8.92817 21.9709 8.75757 21.885 8.61402C21.7992 8.47047 21.6578 8.36572 21.4919 8.32282C21.326 8.27991 21.1493 8.30237 21.0006 8.38525Z"
                      fill="white"
                    />
                    <path
                      d="M18.8133 7.22813C18.8871 7.18727 18.9518 7.13269 19.0035 7.06754C19.0553 7.00239 19.0931 6.92798 19.1149 6.84861L19.45 5.64138C19.4737 5.5616 19.4807 5.47807 19.4705 5.39566C19.4604 5.31324 19.4334 5.2336 19.3911 5.16137C19.3488 5.08914 19.2919 5.02577 19.224 4.97496C19.156 4.92416 19.0782 4.88693 18.9952 4.86545C18.9121 4.84397 18.8255 4.83867 18.7403 4.84986C18.6551 4.86105 18.5731 4.8885 18.4991 4.93062C18.425 4.97274 18.3603 5.02868 18.3089 5.09517C18.2575 5.16167 18.2203 5.23738 18.1995 5.31791L17.8644 6.52513C17.8313 6.64452 17.8356 6.7707 17.8767 6.88774C17.9179 7.00477 17.9941 7.10739 18.0956 7.18264C18.1972 7.25788 18.3196 7.30236 18.4473 7.31046C18.5751 7.31856 18.7025 7.28991 18.8133 7.22813Z"
                      fill="white"
                    />
                    <path
                      d="M22.0839 11.8128C21.9192 11.7731 21.7449 11.7975 21.5987 11.8807C21.4524 11.9638 21.3458 12.0991 21.3019 12.2574C21.2579 12.4157 21.2802 12.5843 21.3638 12.727C21.4474 12.8696 21.5856 12.9748 21.7488 13.02L22.9993 13.3435C23.164 13.3831 23.3383 13.3587 23.4846 13.2756C23.6308 13.1924 23.7374 13.0571 23.7814 12.8988C23.8253 12.7405 23.8031 12.5719 23.7195 12.4293C23.6359 12.2866 23.4976 12.1814 23.3344 12.1362L22.0839 11.8128Z"
                      fill="white"
                    />
                    <path
                      d="M15.7244 9.5632L17.9525 13.2887C18.181 12.9113 18.302 12.4823 18.3032 12.0451C18.3044 11.608 18.1858 11.1783 17.9594 10.7997C17.733 10.4212 17.4069 10.1072 17.0141 9.88961C16.6214 9.67205 16.176 9.55869 15.7231 9.56104L15.7244 9.5632Z"
                      fill="white"
                    />
                    <path
                      d="M13.1471 7.09736C13.037 7.0942 12.9278 7.11826 12.8299 7.16724C12.732 7.21623 12.6487 7.28854 12.5879 7.3773L9.48134 11.9191L7.37096 13.0953C6.62745 13.5097 6.08493 14.1923 5.86273 14.9928C5.64052 15.7934 5.75685 16.6464 6.18611 17.3641C6.61537 18.0819 7.3224 18.6056 8.15167 18.8201C8.98094 19.0347 9.86451 18.9224 10.608 18.508L12.7184 17.3317L18.3463 17.0059C18.4565 16.9995 18.5631 16.966 18.6561 16.9086C18.7491 16.8512 18.8254 16.7718 18.8776 16.678C18.9299 16.5841 18.9564 16.4789 18.9547 16.3724C18.953 16.2658 18.9231 16.1615 18.8679 16.0693L13.6886 7.409C13.6333 7.31682 13.5546 7.2398 13.4598 7.18526C13.3651 7.13072 13.2574 7.10046 13.1471 7.09736Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_650_831">
                      <rect
                        width="20.5402"
                        height="20.1817"
                        fill="white"
                        transform="matrix(0.873486 -0.486849 0.513267 0.858229 0.286865 10)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className="ml-[18px] mt-[5px] text-[12px] font-[400] text-white font-['Lato'] tracking-[1px]capitalize">
                Don&apos;t Miss Wordsphere October Mega event on 21 October ,
                2023
              </p>
            </div>
            <div className="logowatermark h- overflow-hidden w-[347px]  rotate-[-26deg] ">
              <h1 className="text-[70px] text-gray-200 opacity-10 uppercase font-[900] font-['Lato'] w-full">
                wordsphere
              </h1>
            </div>
            <div className="cancle w-[40px] flex justify-center items-center">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="10"
                  viewBox="0 0 12 10"
                  fill="none"
                >
                  <g clipPath="url(#clip0_650_839)">
                    <path
                      d="M1.4522 10.0001C1.35216 10.0001 1.25435 9.97146 1.17115 9.9178C1.08796 9.86415 1.02312 9.78789 0.984826 9.69865C0.946536 9.60942 0.93652 9.51123 0.956044 9.4165C0.975567 9.32177 1.02375 9.23476 1.09451 9.16647L10.4415 0.143033C10.5364 0.0514506 10.6651 0 10.7992 0C10.9334 0 11.062 0.0514506 11.1569 0.143033C11.2518 0.234616 11.3051 0.358828 11.3051 0.488346C11.3051 0.617863 11.2518 0.742076 11.1569 0.833658L1.8099 9.8571C1.76297 9.90249 1.70721 9.9385 1.64583 9.96303C1.58444 9.98757 1.51864 10.0002 1.4522 10.0001Z"
                      fill="white"
                    />
                    <path
                      d="M10.7992 10.0001C10.7328 10.0002 10.667 9.98757 10.6056 9.96303C10.5442 9.9385 10.4885 9.90249 10.4415 9.8571L1.09453 0.833658C0.999661 0.742076 0.946365 0.617863 0.946365 0.488346C0.946365 0.358828 0.999661 0.234616 1.09453 0.143033C1.18939 0.0514506 1.31806 0 1.45222 0C1.58638 0 1.71505 0.0514506 1.80992 0.143033L11.1569 9.16647C11.2277 9.23476 11.2759 9.32177 11.2954 9.4165C11.3149 9.51123 11.3049 9.60942 11.2666 9.69865C11.2283 9.78789 11.1635 9.86415 11.0803 9.9178C10.9971 9.97146 10.8993 10.0001 10.7992 10.0001Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_650_839">
                      <rect
                        width="10.3586"
                        height="10"
                        fill="white"
                        transform="translate(0.946472)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
          {/*================================================ calculation  */}
          <div className="calculation mt-[20px] flex justify-between">
            <div className="total_customer w-[236px] h-[136px] rounded-[8px] bg-darkBlue  grid grid-rows-2 ">
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
                      d="M11.2742 6.28205C10.829 6.03889 10.3185 5.90088 9.77581 5.90088H8.48599C7.92807 5.90088 7.40439 6.04684 6.95093 6.30246C5.99732 6.83928 5.35327 7.86138 5.35327 9.0336V10H12.9085V9.0336C12.9085 7.84616 12.2479 6.81333 11.2742 6.28205Z"
                      fill="#256682"
                    />
                    <path
                      d="M14.8361 5.04248H13.7639C13.1378 5.04248 12.5543 5.22753 12.0649 5.54644C12.3001 5.70071 12.5211 5.88092 12.7248 6.08464C13.5124 6.87223 13.9462 7.91958 13.9462 9.03369V9.48819H17.9595V8.16586C17.9595 6.44368 16.5583 5.04248 14.8361 5.04248Z"
                      fill="#256682"
                    />
                    <path
                      d="M4.44563 5.04248H3.37338C1.6512 5.04248 0.25 6.44368 0.25 8.16586V9.48819H4.31558V9.03369C4.31558 7.91958 4.74967 6.87223 5.53726 6.08464C5.73338 5.88853 5.94541 5.7142 6.17093 5.56374C5.67631 5.23445 5.08311 5.04248 4.44563 5.04248Z"
                      fill="#256682"
                    />
                    <path
                      d="M14.2984 0.344727C14.2929 0.344727 14.2872 0.344761 14.2817 0.34483C13.1209 0.354411 12.1848 1.35766 12.1949 2.58118C12.205 3.79888 13.1483 4.78283 14.3016 4.78283C14.3071 4.78283 14.3128 4.78279 14.3183 4.78272C14.8875 4.77802 15.4186 4.53825 15.8139 4.10751C16.2 3.68677 16.4099 3.13238 16.4051 2.54638C16.395 1.32868 15.4517 0.344727 14.2984 0.344727Z"
                      fill="#256682"
                    />
                    <path
                      d="M3.90789 0.344727C3.90239 0.344727 3.89668 0.344761 3.89115 0.34483C2.73042 0.354411 1.7943 1.35766 1.8044 2.58118C1.81443 3.79888 2.75785 4.78283 3.91107 4.78283C3.91661 4.78283 3.92228 4.78279 3.92782 4.78272C4.49694 4.77802 5.02809 4.53825 5.42337 4.10751C5.80949 3.68677 6.01944 3.13238 6.0146 2.54638C6.00453 1.32868 5.06116 0.344727 3.90789 0.344727Z"
                      fill="#256682"
                    />
                    <path
                      d="M9.13104 0C7.7928 0 6.70428 1.15008 6.70428 2.56408C6.70428 3.58583 7.27293 4.46992 8.09372 4.88153C8.40848 5.0396 8.76025 5.1278 9.13104 5.1278C9.50184 5.1278 9.8536 5.0396 10.1684 4.88153C10.9892 4.46992 11.5578 3.58583 11.5578 2.56408C11.5578 1.15008 10.4693 0 9.13104 0Z"
                      fill="#256682"
                    />
                  </svg>
                </div>
                <p className="text-[12px] text-white font-['Work_Sans'] mt-[8px] tracking-[.2px]">
                  Total Customers
                </p>
              </div>
              <div className="percentage flex justify-center gap-[10px] items-center">
                <h2 className="text-[35px] text-white mb-[10px] font-['Work_Sans']">
                  {loginInSeller?.client?.length > 0
                    ? loginInSeller?.client.length
                    : 0}
                </h2>
                <span className="text-[#3AAE54] border-[0.3px solid bg-[#5CCE75] text-[12px] flex justify-between px-[7px] items-center gap-[5px] w-[49px] h-[19px] bg-opacity-[.1] text-[#5CCE75] rounded-md">
                  3.9%
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
            </div>
            <div className="rate border w-[236px] h-[136px] rounded-[8px] bg-white  grid grid-rows-2 ">
              <div className="customer flex justify-start items-start w-full mt-[10px] pl-[15px]  border-b gap-[7px]">
                <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center mt-[5px] bg-opacity-[.1] bg-[#267596]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_657_91)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.99534 1.32683L6.23868 2.32216C6.17268 2.4095 6.05401 2.44083 5.94734 2.4075L4.72334 2.0275C4.34734 1.91083 3.93668 1.97416 3.61734 2.19616C3.28601 2.42616 3.09334 2.7955 3.09334 3.18683V4.4175C3.09334 4.51283 3.02201 4.59216 2.92734 4.62216L1.70334 5.00216C1.31934 5.1215 1.02134 5.41216 0.896677 5.7795C0.769344 6.15483 0.83601 6.56616 1.07868 6.8855L1.83468 7.8815C1.88868 7.95216 1.88868 8.04816 1.83468 8.11883L1.07868 9.11483C0.83601 9.43416 0.769344 9.8455 0.896677 10.2208C1.02134 10.5882 1.31934 10.8788 1.70334 10.9982L2.92734 11.3782C3.02201 11.4082 3.09334 11.4875 3.09334 11.5828V12.8135C3.09334 13.2048 3.28601 13.5742 3.61734 13.8042C3.93668 14.0262 4.34734 14.0895 4.72334 13.9728L5.94734 13.5928C6.05401 13.5595 6.17268 13.5908 6.23868 13.6782L6.99534 14.6735C7.22934 14.9815 7.60201 15.1668 8.00001 15.1668C8.39801 15.1668 8.77068 14.9815 9.00468 14.6735L9.76134 13.6782C9.82734 13.5908 9.94601 13.5595 10.0527 13.5928L11.2767 13.9728C11.6527 14.0895 12.0633 14.0262 12.3827 13.8042C12.714 13.5742 12.9067 13.2048 12.9067 12.8135V11.5828C12.9067 11.4875 12.978 11.4082 13.0727 11.3782L14.2967 10.9982C14.6807 10.8788 14.9787 10.5882 15.1033 10.2208C15.2307 9.8455 15.164 9.43416 14.9213 9.11483L14.1653 8.11883C14.1113 8.04816 14.1113 7.95216 14.1653 7.8815L14.9213 6.8855C15.164 6.56616 15.2307 6.15483 15.1033 5.7795C14.9787 5.41216 14.6807 5.1215 14.2967 5.00216L13.0727 4.62216C12.978 4.59216 12.9067 4.51283 12.9067 4.4175V3.18683C12.9067 2.7955 12.714 2.42616 12.3827 2.19616C12.0633 1.97416 11.6527 1.91083 11.2767 2.0275L10.0527 2.4075C9.94601 2.44083 9.82734 2.4095 9.76134 2.32216L9.00468 1.32683C8.77068 1.01883 8.39801 0.833496 8.00001 0.833496C7.60201 0.833496 7.22934 1.01883 6.99534 1.32683ZM10.512 9.2595C10.1213 8.8695 9.48801 8.8695 9.09734 9.2595C8.70734 9.6495 8.70734 10.2835 9.09734 10.6735C9.48801 11.0642 10.1213 11.0642 10.512 10.6735C10.902 10.2835 10.902 9.6495 10.512 9.2595ZM10.0033 5.2895L5.28934 10.0035C5.09401 10.1988 5.09401 10.5155 5.28934 10.7108C5.48468 10.9062 5.80134 10.9062 5.99668 10.7108L10.7107 5.99683C10.906 5.8015 10.906 5.48483 10.7107 5.2895C10.5153 5.09416 10.1987 5.09416 10.0033 5.2895ZM6.90268 5.32683C6.51201 4.93616 5.87868 4.93616 5.48801 5.32683C5.09801 5.71683 5.09801 6.35083 5.48801 6.74083C5.87868 7.13083 6.51201 7.13083 6.90268 6.74083C7.29268 6.35083 7.29268 5.71683 6.90268 5.32683Z"
                        fill="#267596"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_657_91">
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

                <button className="text-gray-500 font-[400] w-[98px] h-[19px] tracking-[0.7px]  text-[13px] border bg-[#F5F5F5] rounded-[4px] mr-[22px] mb-[10px] flex justify-center items-center">
                  view contract
                </button>
              </div>
            </div>
            <div className="total_commission w-[236px] border h-[136px] rounded-[8px] bg-white  grid grid-rows-2 ">
              <div className="total_earned flex justify-start items-start mt-[10px]  border-b pl-[12px] gap-[10px]">
                <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-opacity-[.1] mt-[4px] bg-[#267596]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M5.69001 3.99988H10.31L11.445 1.72488C11.4975 1.61969 11.5112 1.49938 11.4837 1.38509C11.4563 1.27079 11.3895 1.16981 11.295 1.09988C11.2001 1.02915 11.0833 0.994354 10.9652 1.00168C10.8471 1.009 10.7354 1.05797 10.65 1.13988C10.3228 1.39504 9.91427 1.52294 9.50001 1.49988C9.08812 1.52269 8.68175 1.39669 8.35501 1.14488C8.26132 1.05176 8.1346 0.999487 8.00251 0.999487C7.87041 0.999487 7.74369 1.05176 7.65001 1.14488C7.32215 1.39826 6.91364 1.52436 6.50001 1.49988C6.08812 1.52269 5.68175 1.39669 5.35501 1.14488C5.27098 1.0602 5.15944 1.00836 5.04053 0.998709C4.92163 0.98906 4.80319 1.02224 4.70661 1.09227C4.61003 1.16229 4.54166 1.26454 4.51386 1.38055C4.48606 1.49656 4.50065 1.61869 4.55501 1.72488L5.69001 3.99988Z"
                      fill="#267596"
                    />
                    <path
                      d="M10.62 5H5.38C4.31 6.295 2.5 8.865 2.5 11.5C2.5 13.785 4.24 15 5.5 15H10.5C11.76 15 13.5 13.785 13.5 11.5C13.5 8.865 11.69 6.295 10.62 5ZM8.5 12V12.5C8.5 12.6326 8.44732 12.7598 8.35355 12.8536C8.25979 12.9473 8.13261 13 8 13C7.86739 13 7.74021 12.9473 7.64645 12.8536C7.55268 12.7598 7.5 12.6326 7.5 12.5V12C7.23738 11.9993 6.97955 11.9296 6.75229 11.798C6.52503 11.6664 6.33631 11.4774 6.205 11.25C6.16385 11.1934 6.13503 11.1288 6.12041 11.0604C6.10579 10.992 6.10569 10.9213 6.12012 10.8528C6.13454 10.7844 6.16318 10.7197 6.20416 10.663C6.24515 10.6063 6.29758 10.5588 6.35806 10.5237C6.41854 10.4885 6.48573 10.4664 6.55528 10.4589C6.62483 10.4513 6.6952 10.4584 6.76183 10.4797C6.82846 10.5011 6.88987 10.5361 6.94209 10.5827C6.99432 10.6293 7.03619 10.6862 7.065 10.75C7.10905 10.8263 7.17248 10.8896 7.24887 10.9335C7.32526 10.9774 7.41189 11.0003 7.5 11H8.5C8.63261 11 8.75979 10.9473 8.85355 10.8536C8.94732 10.7598 9 10.6326 9 10.5C9 10.3674 8.94732 10.2402 8.85355 10.1464C8.75979 10.0527 8.63261 10 8.5 10H7.5C7.10218 10 6.72064 9.84196 6.43934 9.56066C6.15804 9.27936 6 8.89782 6 8.5C6 8.10218 6.15804 7.72064 6.43934 7.43934C6.72064 7.15804 7.10218 7 7.5 7V6.5C7.5 6.36739 7.55268 6.24021 7.64645 6.14645C7.74021 6.05268 7.86739 6 8 6C8.13261 6 8.25979 6.05268 8.35355 6.14645C8.44732 6.24021 8.5 6.36739 8.5 6.5V7C8.76262 7.00071 9.02045 7.07035 9.24771 7.20197C9.47497 7.33359 9.66369 7.52256 9.795 7.75C9.83615 7.80658 9.86497 7.87117 9.87959 7.93958C9.89421 8.008 9.89431 8.07872 9.87988 8.14718C9.86546 8.21564 9.83683 8.28031 9.79584 8.33701C9.75485 8.39371 9.70242 8.44117 9.64194 8.47633C9.58146 8.5115 9.51427 8.53358 9.44472 8.54115C9.37517 8.54872 9.3048 8.5416 9.23817 8.52027C9.17154 8.49894 9.11013 8.46386 9.05791 8.4173C9.00568 8.37075 8.96381 8.31375 8.935 8.25C8.89095 8.1737 8.82752 8.11039 8.75113 8.06649C8.67474 8.02259 8.58811 7.99965 8.5 8H7.5C7.36739 8 7.24021 8.05268 7.14645 8.14645C7.05268 8.24021 7 8.36739 7 8.5C7 8.63261 7.05268 8.75979 7.14645 8.85355C7.24021 8.94732 7.36739 9 7.5 9H8.5C8.89782 9 9.27936 9.15804 9.56066 9.43934C9.84196 9.72064 10 10.1022 10 10.5C10 10.8978 9.84196 11.2794 9.56066 11.5607C9.27936 11.842 8.89782 12 8.5 12Z"
                      fill="#267596"
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
            </div>
            <div className="withdrawn w-[236px] h-[136px] rounded-[8px] border bg-white  grid grid-rows-2 ">
              <div className="customer flex justify-start items-start mt-[10px] pl-[14px] border-b gap-[9px]">
                <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center mt-[5px] bg-opacity-[.1] bg-[#267596]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M1.987 10.5C1.4345 10.5 0.987 10.0525 0.987 9.5V9C0.987 8.4475 1.4345 8 1.987 8H5.213C5.0775 8.4775 5 8.9795 5 9.5C5 9.842 5.0355 10.175 5.0955 10.5H1.987ZM2.987 4.5H8.222C8.729 4.268 9.276 4.1095 9.8515 4.0415C9.9525 3.885 10.013 3.7 10.013 3.5V3C10.013 2.4475 9.5655 2 9.013 2H2.987C2.4345 2 1.987 2.4475 1.987 3V3.5C1.987 4.0525 2.4345 4.5 2.987 4.5ZM2.987 7.5H5.382C5.78 6.4855 6.4685 5.618 7.3475 5H2.987C2.4345 5 1.987 5.4475 1.987 6V6.5C1.987 7.0525 2.4345 7.5 2.987 7.5ZM2.987 11C2.4345 11 1.987 11.4475 1.987 12V12.5C1.987 13.0525 2.4345 13.5 2.987 13.5H6.7365C6.0225 12.8275 5.4885 11.969 5.213 11H2.987ZM15 9.5C15 11.981 12.981 14 10.5 14C8.019 14 6 11.981 6 9.5C6 7.019 8.019 5 10.5 5C12.981 5 15 7.019 15 9.5ZM10 8.75C10 8.612 10.112 8.5 10.25 8.5H11.4705C11.7465 8.5 11.9705 8.276 11.9705 8C11.9705 7.724 11.7465 7.5 11.4705 7.5H11V7C11 6.724 10.776 6.5 10.5 6.5C10.224 6.5 10 6.724 10 7V7.5C10 7.509 10.0045 7.516 10.005 7.525C9.433 7.6395 9 8.145 9 8.75C9 9.439 9.561 10 10.25 10H10.7205C10.8585 10 10.9705 10.112 10.9705 10.272C10.9705 10.41 10.8585 10.522 10.7205 10.522H9.5C9.224 10.522 9 10.746 9 11.022C9 11.298 9.224 11.522 9.5 11.522H10V12C10 12.276 10.224 12.5 10.5 12.5C10.776 12.5 11 12.276 11 12V11.5C11 11.496 10.998 11.4925 10.9975 11.4885C11.5535 11.3615 11.9705 10.8625 11.9705 10.25C11.9705 9.561 11.4095 9 10.7205 9H10.25C10.112 9 10 8.888 10 8.75Z"
                      fill="#267596"
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
            </div>
          </div>
          {/* =================================================table  */}
          <div className="table w-full h-full   mt-[20px]">
            {/*============================================= search  */}
            <div className="search  flex justify-between items-center w-full h-[40px]">
              <div className="flex w-full h-[40px] items-center">
                <div className="text_search w-[222px] border h-[40px]  shrink-0 flex items-center pl-[15px] mr-[8px] rounded-[8px]">
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
                </div>
                {sellerTable && (
                  <div className="text_search h-[40px]  w-[222px] border flex items-center pl-[15px] mr-[8px] rounded-[8px]">
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
                  </div>
                )}
                {sellerTable && (
                  <div className="selete_search h-[40px]  w-[117px] border overflow-hidden rounded-[8px] px-[4px] text-[#256682] text-[12px] font-[500]">
                    <select
                      className="w-full focus:outline-none h-full"
                      name="role"
                      onChange={handleInputChange}
                      value={input.role}
                      id=""
                    >
                      <option className="text-[#256682]" value="">
                        ....
                      </option>
                      <option className="text-[#256682]" value="admin">
                        admin
                      </option>
                      <option className="text-[#256682]" value="user">
                        user
                      </option>
                    </select>
                  </div>
                )}
                {!sellerTable && (
                  <>
                    <div className="date_search h-[40px]  w-[224px] border rounded-[8px] flex items-center justify-between gap-[5px]  px-[15px] mr-[10px]">
                      <input
                        onChange={handleInputChange}
                        value={input.endDate}
                        name="endDate"
                        type="text"
                        className="text-[12px] focus:outline-none font-['Roboto'] w-[60px]  capitalize placeholder:text-[12px] placeholder:font-[400] "
                        placeholder="End Time"
                      />
                      -
                      <input
                        type="text"
                        onChange={handleInputChange}
                        name="startDate"
                        value={input.startDate}
                        className="text-[12px] font-['Roboto'] placeholder:text-[12px] focus:outline-none placeholder:font-[400]  w-[70px]  capitalize"
                        placeholder="Start Time"
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
                    <div className="selete_search  h-[40px] w-[117px] border overflow-hidden rounded-[8px] px-[4px] text-[#256682] text-[12px] font-[500]">
                      <select
                        className="w-full focus:outline-none h-full"
                        name="status"
                        onChange={handleInputChange}
                        value={input.status}
                        id=""
                      >
                        <option className="text-[#256682]" value="">
                          ...
                        </option>
                        <option className="text-[#256682]" value="pending">
                          Pending
                        </option>
                        <option className="text-[#256682]" value="on going">
                          On going
                        </option>
                        <option className="text-[#256682]" value="on hold">
                          On hold
                        </option>
                        <option className="text-[#256682]" value="completed">
                          Completed
                        </option>
                      </select>
                    </div>
                  </>
                )}
                <button
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
                  className="w-[40px] rounded-md h-[40px] flex justify-center items-center border ml-4 border-gray-300 hover:bg-gray-200 transition-all duration-500 ease-in-out"
                >
                  <svg
                    fill="#7b7a7a"
                    width="20"
                    height="20"
                    viewBox="0 0 1920 1920"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0"
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="addClient gap-[10px] flex items-center justify-self-end right-0">
                <button
                  onClick={() => setSellerTable(!sellerTable)}
                  className="add-client pr-[4px] w-[121px] h-[38px] flex items-center justify-center gap-[10px] bg-[#267596] hover:bg-[#1b5269] transition-all duration-500 ease-in-out text-white font-['Roboto'] text-[12px] font-[500] rounded-[7px]"
                >
                  {sellerTable ? "Client" : "Seller"}
                </button>

                <div className="help w-[40px] h-[38px] flex justify-center items-center bg-[#A4A4A61A]">
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
                </div>
                <button
                  onClick={() => setClientModel(true)}
                  className="add-client pr-[4px] w-[121px] h-[38px] flex items-center justify-center gap-[10px] bg-[#267596] hover:bg-[#1b5269] transition-all duration-500 ease-in-out text-white font-['Roboto'] text-[12px] font-[500] rounded-[7px]"
                >
                  Add Client
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
                </button>
              </div>
            </div>
            {/* ========================== table container  */}
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
    </div>
  );
};

export default Home;
