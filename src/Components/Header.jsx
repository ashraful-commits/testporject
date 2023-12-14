import React, { useEffect, useRef, useState } from "react";
import bgImg from "../../public/bgImg.png";
import user from "../../public/user.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutSeller } from "../Features/Seller/SellerApi";
const Header = ({ loginInSeller }) => {
  const [dropdown, setDropdown] = useState(false);
  const [notification, setNotification] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const handleLogout = () => {
    dispatch(LogoutSeller());
    localStorage.clear("Seller");
    navigate("/login");
  };

  const handleDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleDropdown);
    return () => window.removeEventListener("click", handleDropdown);
  }, []);
  return (
    <div className="" ref={dropdownRef}>
      <div className="header bg-white min-w-full flex items-center w-[1300px] h-[68px]">
        <div className="w-[640px] h-full flex items-center gap-[20px] rounded-md overflow-hidden ">
          {loginInSeller?.companyAvatar ? (
            <img
              className="w-[86px] h-[70px] object-cover"
              src={loginInSeller?.companyAvatar}
              alt=""
            />
          ) : (
            <img
              className="w-[86px] h-[70px] object-cover"
              src="https://www.pngitem.com/pimgs/m/78-788231_icon-blue-company-icon-png-transparent-png.png"
              alt=""
            />
          )}
          <h1 className="text-[26px] capitalize leading-[31px] font-[600] font-['Work_Sans] tracking-[.9px]">
            Sales Portal / {loginInSeller?.name}
          </h1>
        </div>
        <div className="w-[660px] h-[46px] flex justify-between items-center">
          <div className="h-[68px] w-[439px] relative">
            <img className="w-full h-full " src={bgImg} alt="" />
            <div className="w-full h-full  absolute top-0 left-0 pl-[16px] pt-[7px]">
              <p className="text-[12px] font-[400] font-['work_sans'] p-[2px] text-[#878790]">
                Sales Toolkit
              </p>
              <div className="buttonGroup flex items-center mt-[5px] justify-between ml-[5px] mr-[8px]">
                <button className="text-[12px] font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-[#878790] flex items-center gap-[5px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M12.6666 13.6668H3.33329C2.62628 13.6661 1.94844 13.3849 1.44851 12.8849C0.948573 12.385 0.66738 11.7072 0.666626 11.0002V5.00016C0.66738 4.29315 0.948573 3.61531 1.44851 3.11538C1.94844 2.61544 2.62628 2.33425 3.33329 2.3335H12.6666C13.3736 2.33425 14.0515 2.61544 14.5514 3.11538C15.0513 3.61531 15.3325 4.29315 15.3333 5.00016V11.0002C15.3325 11.7072 15.0513 12.385 14.5514 12.8849C14.0515 13.3849 13.3736 13.6661 12.6666 13.6668ZM3.33329 3.66683C2.97979 3.66723 2.64089 3.80784 2.39093 4.0578C2.14097 4.30776 2.00036 4.64666 1.99996 5.00016V11.0002C2.00036 11.3537 2.14097 11.6926 2.39093 11.9425C2.64089 12.1925 2.97979 12.3331 3.33329 12.3335H12.6666C13.0201 12.3331 13.359 12.1925 13.609 11.9425C13.8589 11.6926 13.9996 11.3537 14 11.0002V5.00016C13.9996 4.64666 13.8589 4.30776 13.609 4.0578C13.359 3.80784 13.0201 3.66723 12.6666 3.66683H3.33329Z"
                      fill="#878790"
                    />
                    <path
                      d="M7.99995 8.9558C7.25842 8.95607 6.53803 8.70873 5.95307 8.253L1.59041 4.85977C1.4508 4.75117 1.36006 4.59155 1.33815 4.41604C1.31623 4.24053 1.36494 4.0635 1.47355 3.9239C1.58215 3.7843 1.74177 3.69356 1.91728 3.67165C2.09279 3.64973 2.26982 3.69843 2.40942 3.80704L6.77205 7.20027C7.12288 7.47382 7.55503 7.62239 7.99991 7.62239C8.4448 7.62239 8.87694 7.47382 9.22778 7.20027L13.5904 3.80704C13.73 3.69843 13.907 3.64973 14.0825 3.67165C14.2581 3.69356 14.4177 3.7843 14.5263 3.9239C14.6349 4.0635 14.6836 4.24053 14.6617 4.41604C14.6398 4.59155 14.549 4.75117 14.4094 4.85977L10.0468 8.253C9.46174 8.70857 8.74142 8.9559 7.99995 8.9558Z"
                      fill="#878790"
                    />
                  </svg>
                  Email signature
                </button>
                <button className="text-[12px] font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-[#878790]">
                  Email setup
                </button>
                <button className="text-[12px] font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-[#878790]">
                  pricing
                </button>
                <Link
                  target="blank"
                  to={loginInSeller?.website}
                  className="text-[12px] font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-[#878790]"
                >
                  website
                </Link>
                <button className="text-[12px] font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-[#878790]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                  >
                    <path
                      d="M16.8889 0C17.1246 0 17.3508 0.0936534 17.5174 0.260347C17.6841 0.427049 17.7778 0.653138 17.7778 0.888889V15.1111C17.7778 15.3468 17.6841 15.573 17.5174 15.7396C17.3508 15.9063 17.1246 16 16.8889 16H0.888889C0.653138 16 0.427049 15.9063 0.260347 15.7396C0.0936534 15.573 0 15.3468 0 15.1111V0.888889C0 0.653138 0.0936534 0.427049 0.260347 0.260347C0.427049 0.0936534 0.653138 0 0.888889 0H16.8889ZM6.57689 4.44444H4.79911L1.95467 11.5556H3.86933L4.22489 10.6667H7.14933L7.50489 11.5556H9.42044L6.57689 4.44444ZM15.1111 4.44444H13.3333V6.22222H12.4444C11.7503 6.22156 11.0833 6.49156 10.5851 6.97493C10.0868 7.45822 9.79671 8.1168 9.77636 8.81067C9.756 9.50444 10.0069 10.1789 10.476 10.6907C10.945 11.2024 11.595 11.511 12.288 11.5511L12.4444 11.5556H15.1111V4.44444ZM13.3333 8V9.77778H12.4444L12.3404 9.77156C12.1244 9.74587 11.9252 9.64178 11.7808 9.47911C11.6364 9.31644 11.5565 9.10649 11.5565 8.88889C11.5565 8.67129 11.6364 8.46133 11.7808 8.29867C11.9252 8.136 12.1244 8.03191 12.3404 8.00622L12.4444 8H13.3333ZM5.688 7.00889L6.43911 8.88889H4.93511L5.688 7.00889Z"
                      fill="url(#paint0_linear_696_5087)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_696_5087"
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
                <button className="text-[12px] font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-[#878790]">
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
                <button className="text-[12px] font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-[#878790]">
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
                      d="M7.4281 0V4.68966H11.9658L7.4281 0Z"
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
          </div>
          <div className="relative">
            {dropdown && (
              <div className="absolute rounded-md shadow-md p-3 flex flex-col gap-2 top-16 left-0 bg-white border-2 border-cyan-300 w-[140px] h-[auto]">
                <span
                  className="absolute block w-8 h-8 bg-cyan-300 border shadow-2xl -top-8 "
                  style={{ clipPath: "polygon(49% 37%, 0% 100%, 100% 100%)" }}
                ></span>
                <button className="flex justify-between gap-2 font-['work_sans'] font-[500] items-center">
                  <svg
                    fill="#000000"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                  >
                    <path d="M19.9,12.66a1,1,0,0,1,0-1.32L21.18,9.9a1,1,0,0,0,.12-1.17l-2-3.46a1,1,0,0,0-1.07-.48l-1.88.38a1,1,0,0,1-1.15-.66l-.61-1.83A1,1,0,0,0,13.64,2h-4a1,1,0,0,0-1,.68L8.08,4.51a1,1,0,0,1-1.15.66L5,4.79A1,1,0,0,0,4,5.27L2,8.73A1,1,0,0,0,2.1,9.9l1.27,1.44a1,1,0,0,1,0,1.32L2.1,14.1A1,1,0,0,0,2,15.27l2,3.46a1,1,0,0,0,1.07.48l1.88-.38a1,1,0,0,1,1.15.66l.61,1.83a1,1,0,0,0,1,.68h4a1,1,0,0,0,.95-.68l.61-1.83a1,1,0,0,1,1.15-.66l1.88.38a1,1,0,0,0,1.07-.48l2-3.46a1,1,0,0,0-.12-1.17ZM18.41,14l.8.9-1.28,2.22-1.18-.24a3,3,0,0,0-3.45,2L12.92,20H10.36L10,18.86a3,3,0,0,0-3.45-2l-1.18.24L4.07,14.89l.8-.9a3,3,0,0,0,0-4l-.8-.9L5.35,6.89l1.18.24a3,3,0,0,0,3.45-2L10.36,4h2.56l.38,1.14a3,3,0,0,0,3.45,2l1.18-.24,1.28,2.22-.8.9A3,3,0,0,0,18.41,14ZM11.64,8a4,4,0,1,0,4,4A4,4,0,0,0,11.64,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,11.64,14Z" />
                  </svg>
                  Setting
                </button>
                <button
                  className="flex justify-between gap-2 font-['work_sans'] font-[500] items-center"
                  onClick={handleLogout}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5 7.5L10.5 10.75M13.5 7.5L10.5 4.5M13.5 7.5L4 7.5M8 13.5H1.5L1.5 1.5L8 1.5"
                      stroke="#000000"
                    />
                  </svg>
                  Log out
                </button>
                <Link
                  to="/company"
                  className="flex justify-between gap-2 font-['work_sans'] font-[500] items-center"
                >
                  <svg
                    fill="#000000"
                    width="15"
                    height="15"
                    viewBox="-2 0 16 16"
                    id="company-16px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Path_133"
                      data-name="Path 133"
                      d="M323.5-192h-9a1.5,1.5,0,0,0-1.5,1.5V-176h12v-14.5A1.5,1.5,0,0,0,323.5-192ZM318-177v-3h2v3Zm6,0h-3v-3.5a.5.5,0,0,0-.5-.5h-3a.5.5,0,0,0-.5.5v3.5h-3v-13.5a.5.5,0,0,1,.5-.5h9a.5.5,0,0,1,.5.5Zm-8-12h2v2h-2Zm4,0h2v2h-2Zm-4,4h2v2h-2Zm4,0h2v2h-2Z"
                      transform="translate(-313 192)"
                    />
                  </svg>
                  Companies
                </Link>
              </div>
            )}
            {localStorage.getItem("Seller") ? (
              loginInSeller?.avatar ? (
                <div className="flex items-end justify-end gap-3">
                  <img
                    onClick={() => setDropdown(!dropdown)}
                    className=" w-[46px] h-[46px] mt-[0px] cursor-pointer ml-[5px] border-[1px] rounded-full p-[2px] border-cyan"
                    src={loginInSeller?.avatar}
                    alt=""
                  />
                  <div className="w-auto flex h-[46px] flex-col gap-[-5px]">
                    <p className="text-[#3A3A49] truncate w-[100px] text-[13px] font-[700] font-['work_sans']">
                      {loginInSeller?.name}
                    </p>
                    <span className="text-[#3A3A49] truncate w-[90px] text-[13px] font-[400] font-['work_sans']">
                      {loginInSeller?.email}
                    </span>
                  </div>
                  <div className="flex justify-center items-center w-full h-[50px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="9"
                      viewBox="0 0 10 9"
                      fill="none"
                    >
                      <path
                        d="M4.56699 8.25C4.75944 8.58333 5.24056 8.58333 5.43301 8.25L9.76314 0.75C9.95559 0.416666 9.71503 0 9.33013 0H0.669873C0.284973 0 0.0444103 0.416667 0.236861 0.75L4.56699 8.25Z"
                        fill="#CCCACA"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="flex items-end justify-end gap-3">
                  <img
                    onClick={() => setDropdown(!dropdown)}
                    className=" w-[46px] cursor-pointer h-[46px] mt-[0px] ml-[5px] border-[1px] rounded-full p-[2px] border-cyan-600"
                    src={user}
                    alt=""
                  />
                  <div className="w-auto flex h-[46px] flex-col gap-[-5px]">
                    <p className="text-[#3A3A49] truncate w-[100px] text-[13px] font-[700] font-['work_sans']">
                      {loginInSeller?.name}
                    </p>
                    <span className="text-[#3A3A49] truncate w-[90px] text-[13px] font-[400] font-['work_sans']">
                      {loginInSeller?.email}
                    </span>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="9"
                      viewBox="0 0 10 9"
                      fill="none"
                    >
                      <path
                        d="M4.56699 8.25C4.75944 8.58333 5.24056 8.58333 5.43301 8.25L9.76314 0.75C9.95559 0.416666 9.71503 0 9.33013 0H0.669873C0.284973 0 0.0444103 0.416667 0.236861 0.75L4.56699 8.25Z"
                        fill="#CCCACA"
                      />
                    </svg>
                  </div>
                </div>
              )
            ) : (
              <Link
                to="/"
                className="w-[140px]  gap-[14px] mt-[12px] h-[46px] flex justify-start items-center overflow-hidden "
              >
                {loginInSeller?.avatar ? (
                  <img
                    className=" w-[46px] h-[46px] mt-[0px] ml-[5px] border-[1px] rounded-full p-[2px] border-cyan-600"
                    src={loginInSeller?.avatar}
                    alt=""
                  />
                ) : (
                  <img
                    className=" w-[46px] h-[46px] mt-[0px] ml-[5px] border-[1px] rounded-full p-[2px] border-cyan-600"
                    src={user}
                    alt=""
                  />
                )}
                <div className="w-auto flex h-[46px] flex-col gap-[-5px]">
                  <p className="text-[#3A3A49] truncate w-[100px] text-[13px] font-[700] font-['work_sans']">
                    {loginInSeller?.name}
                  </p>
                  <span className="text-[#3A3A49] truncate w-[90px] text-[13px] font-[400] font-['work_sans']">
                    {loginInSeller?.email}
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
