import companyLogo from "../../../public/clientLogo.png";
import bgImg from "../../../public/bgImg.png";
import user from "../../../public/user.png";
import { Link, useParams } from "react-router-dom";
import Total from "../../Components/Total";
import ProjectDetails from "../../Components/ProjectDetails";
import SalesPeople from "../../Components/SalesPeople";
import { useEffect, useState } from "react";
import SalesModel from "../../Components/Model/SalesModel";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellerState } from "../../Features/Seller/SellerSlice";
import { getSingleSeller } from "../../Features/Seller/SellerApi";
import { calculateTotalCommissionForAllClients } from "../../Utils/CommissionCount";
import LoadingSpinner from "../../Components/LoadingSpin";
import ClientComponent from "../../Components/ClientComponent";
import ProjectComponent from "../../Components/ProjectComponent";
import StatisticComponent from "../../Components/StatisticComponent";
const Seller = () => {
  //===========================================all state
  const [model, setModel] = useState(false);
  const [menu, setMenu] = useState("Manage Sales People");
  const [input, setInput] = useState({
    text: "",
    startDate: "",
    endDate: "",
  });
  //===============================================================handle input change
  const handleOnChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //==================================================get all seller state
  const { singleSeller, loader } = useSelector(getAllSellerState);

  //==================================================login seller
  const { loginInSeller } = useSelector(getAllSellerState);
  //================================================= use params
  const { id } = useParams();
  const dispatch = useDispatch();
  //================================================get single seller
  useEffect(() => {
    if (id) {
      dispatch(getSingleSeller(id));
    }
  }, [dispatch, id]);
  //=====================================================return
  return (
    <>
      {/* //========================================loader  */}
      {loader && (
        <div className="w-screen bg-opacity-20 min-h-[1240px] h-screen z-[9999999999999] bg-cyan-200 flex justify-center items-center absolute top-0 left-0">
          <div className="top-[45%] absolute flex justify-center items-center w-full h-full">
            <LoadingSpinner />
          </div>
        </div>
      )}
      {/*=========================================== sales model  */}
      {model && <SalesModel setModel={setModel} sellerId={id} />}
      <div className="min-w-[1340px] relative rounded-[15px] pl-[48px]  pt-[30px] mb-[30px] bg-[#FFF] min-h-auto h-[1061px] overflow-hidden ">
        <div className="header bg-white min-w-full flex items-center w-[1300px] h-[68px]">
          <div className="w-[640px] h-full flex items-center gap-[20px] rounded-md overflow-hidden">
            {singleSeller?.companyAvatar ? (
              <img
                className="w-[86px] h-[70px]"
                src={singleSeller?.companyAvatar}
                alt=""
              />
            ) : (
              <img className="w-[86px] h-[70px]" src={companyLogo} alt="" />
            )}
            <h1 className="text-[26px] capitalize leading-[31px] font-[600] font-['Work_Sans] tracking-[.9px]">
              Admin Dashboard
            </h1>
          </div>
          <div className="w-[600px] h-[46px] flex justify-between items-center">
            <div className="h-[68px] w-[439px] relative">
              <img className="h-full w-full " src={bgImg} alt="" />
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
                    to={singleSeller?.website}
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

            <Link
              to="/"
              className="w-[140px]  gap-[14px] mt-[12px] h-[46px] flex justify-start items-center overflow-hidden "
            >
              {singleSeller?.avatar ? (
                <img
                  className=" w-[46px] h-[46px] shrink-0 mt-[0px] ml-[5px] border-[1px] rounded-full p-[2px] border-[rgb(14 116 144)]"
                  src={singleSeller?.avatar}
                  alt=""
                />
              ) : (
                <img
                  className=" w-[46px] h-[46px] mt-[0px] ml-[5px] border-[1px] rounded-full p-[2px] border-[rgb(14 116 144)]"
                  src={user}
                  alt=""
                />
              )}
              <div className="w-auto flex h-[46px] flex-col gap-[-5px]">
                <p className="text-[#3A3A49] truncate w-[100px] text-[13px] font-[700] font-['work_sans']">
                  {singleSeller?.name}
                </p>
                <span className="text-[#3A3A49] truncate w-[90px] text-[13px] font-[400] font-['work_sans']">
                  {singleSeller?.email}
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className="main-container pr-[36px] flex min-w-full flex-col  w-[1300px] mt-[30px]  tracking-[-.52px] h-[1072px] ">
          {/* //=================================================total  */}
          <div className="total flex justify-start gap-4">
            <Total
              number={
                singleSeller?.salesPerson.length > 0
                  ? singleSeller?.salesPerson.length
                  : 0
              }
              totalSalesGuy={
                singleSeller?.salesPerson ? singleSeller?.salesPerson : []
              }
              totalProjects=""
              totalClients=""
              TotalEarnings=""
              styles={`bg-cyan-200 border border-cyan-500`}
              title="Total Sales Guy"
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clipPath="url(#clip0_684_1773)">
                    <path
                      d="M10.0002 0.666504H2.66683C1.9335 0.666504 1.3335 1.2665 1.3335 1.99984V10.6665C1.3335 11.0332 1.6335 11.3332 2.00016 11.3332C2.36683 11.3332 2.66683 11.0332 2.66683 10.6665V2.6665C2.66683 2.29984 2.96683 1.99984 3.3335 1.99984H10.0002C10.3668 1.99984 10.6668 1.69984 10.6668 1.33317C10.6668 0.966504 10.3668 0.666504 10.0002 0.666504ZM10.3935 3.7265L13.6135 6.9465C13.8602 7.19317 14.0002 7.53317 14.0002 7.8865V13.9998C14.0002 14.7332 13.4002 15.3332 12.6668 15.3332H5.32683C4.5935 15.3332 4.00016 14.7332 4.00016 13.9998L4.00683 4.6665C4.00683 3.93317 4.60016 3.33317 5.3335 3.33317H9.44683C9.80016 3.33317 10.1402 3.47317 10.3935 3.7265ZM10.0002 7.99984H13.0002L9.3335 4.33317V7.33317C9.3335 7.69984 9.6335 7.99984 10.0002 7.99984Z"
                      fill="rgb(14 116 144)"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_684_1773">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
            />
            <Total
              number={
                singleSeller?.projects?.length > 0
                  ? singleSeller?.projects.length
                  : 0
              }
              totalProjects={singleSeller?.Projects}
              totalClients=""
              TotalEarnings=""
              styles={`bg-green-200 border border-green-500`}
              title="Total Projects"
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="11"
                  viewBox="0 0 18 11"
                  fill="none"
                >
                  <path
                    d="M11.0242 6.75003C10.579 6.50456 10.0685 6.36523 9.52581 6.36523H8.23599C7.67807 6.36523 7.15439 6.51259 6.70093 6.77063C5.74732 7.31256 5.10327 8.34439 5.10327 9.52776V10.5034H12.6585V9.52776C12.6585 8.32902 11.9979 7.28637 11.0242 6.75003Z"
                    fill="#3AAE54"
                  />
                  <path
                    d="M14.5862 5.49854H13.5139C12.8879 5.49854 12.3044 5.68535 11.8149 6.00729C12.0501 6.16303 12.2712 6.34495 12.4749 6.55061C13.2625 7.3457 13.6962 8.40301 13.6962 9.52772V9.98655H17.7096V8.65163C17.7096 6.91306 16.3084 5.49854 14.5862 5.49854Z"
                    fill="#3AAE54"
                  />
                  <path
                    d="M4.19563 5.49854H3.12338C1.4012 5.49854 0 6.91306 0 8.65163V9.98655H4.06558V9.52772C4.06558 8.40301 4.49967 7.3457 5.28726 6.55061C5.48338 6.35263 5.69541 6.17664 5.92093 6.02475C5.42631 5.69233 4.83311 5.49854 4.19563 5.49854Z"
                    fill="#3AAE54"
                  />
                  <path
                    d="M14.0484 0.756348C14.0429 0.756348 14.0372 0.756383 14.0317 0.756452C12.8709 0.766125 11.9348 1.77892 11.9449 3.01408C11.955 4.24336 12.8983 5.23668 14.0516 5.23668C14.0571 5.23668 14.0628 5.23664 14.0683 5.23657C14.6375 5.23182 15.1686 4.98977 15.5639 4.55494C15.95 4.13019 16.1599 3.57053 16.1551 2.97895C16.145 1.74966 15.2017 0.756348 14.0484 0.756348Z"
                    fill="#3AAE54"
                  />
                  <path
                    d="M3.65801 0.756348C3.65251 0.756348 3.64681 0.756383 3.64127 0.756452C2.48054 0.766125 1.54442 1.77892 1.55452 3.01408C1.56456 4.24336 2.50797 5.23668 3.6612 5.23668C3.66673 5.23668 3.6724 5.23664 3.67794 5.23657C4.24706 5.23182 4.77821 4.98977 5.17349 4.55494C5.55961 4.13019 5.76956 3.57053 5.76472 2.97895C5.75465 1.74966 4.81128 0.756348 3.65801 0.756348Z"
                    fill="#3AAE54"
                  />
                  <path
                    d="M8.8811 0.408203C7.54286 0.408203 6.45435 1.56923 6.45435 2.99667C6.45435 4.02815 7.02299 4.92066 7.84378 5.33618C8.15854 5.49576 8.51031 5.5848 8.8811 5.5848C9.2519 5.5848 9.60367 5.49576 9.91842 5.33618C10.7392 4.92066 11.3079 4.02815 11.3079 2.99667C11.3079 1.56923 10.2193 0.408203 8.8811 0.408203Z"
                    fill="#3AAE54"
                  />
                </svg>
              }
            />
            <Total
              number={
                singleSeller?.client?.length > 0
                  ? singleSeller?.client?.length
                  : 0
              }
              totalProjects=""
              TotalEarnings=""
              totalSalesGuy=""
              totalClients={singleSeller?.client ? singleSeller?.client : []}
              styles={`bg-blue-200 border border-blue-500`}
              title="Total Clients"
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clipPath="url(#clip0_685_2240)">
                    <path
                      d="M8 6.45703C9.50152 6.45703 10.7188 5.23981 10.7188 3.73828C10.7188 2.23676 9.50152 1.01953 8 1.01953C6.49848 1.01953 5.28125 2.23676 5.28125 3.73828C5.28125 5.23981 6.49848 6.45703 8 6.45703Z"
                      fill="#2F80ED"
                    />
                    <path
                      d="M13.5 6.45703C14.4492 6.45703 15.2188 5.68752 15.2188 4.73828C15.2188 3.78904 14.4492 3.01953 13.5 3.01953C12.5508 3.01953 11.7812 3.78904 11.7812 4.73828C11.7812 5.68752 12.5508 6.45703 13.5 6.45703Z"
                      fill="#2F80ED"
                    />
                    <path
                      d="M2.5 6.45703C3.44924 6.45703 4.21875 5.68752 4.21875 4.73828C4.21875 3.78904 3.44924 3.01953 2.5 3.01953C1.55076 3.01953 0.78125 3.78904 0.78125 4.73828C0.78125 5.68752 1.55076 6.45703 2.5 6.45703Z"
                      fill="#2F80ED"
                    />
                    <path
                      d="M4.19344 8.00027C3.51688 7.44595 2.90416 7.51933 2.12188 7.51933C0.951875 7.51933 0 8.46558 0 9.62839V13.0412C0 13.5462 0.412188 13.9568 0.919062 13.9568C3.10738 13.9568 2.84375 13.9964 2.84375 13.8625C2.84375 11.4441 2.55731 9.67067 4.19344 8.00027Z"
                      fill="#2F80ED"
                    />
                    <path
                      d="M8.74415 7.53199C7.37778 7.41802 6.19012 7.5333 5.16572 8.37887C3.45144 9.75199 3.78134 11.6008 3.78134 13.8626C3.78134 14.461 4.26822 14.957 4.87572 14.957C11.472 14.957 11.7346 15.1698 12.1257 14.3036C12.254 14.0106 12.2188 14.1037 12.2188 11.3014C12.2188 9.07555 10.2916 7.53199 8.74415 7.53199Z"
                      fill="#2F80ED"
                    />
                    <path
                      d="M13.8782 7.51974C13.0916 7.51974 12.4823 7.44711 11.8066 8.00068C13.4305 9.65868 13.1563 11.3111 13.1563 13.8629C13.1563 13.9977 12.9375 13.9572 15.0482 13.9572C15.5732 13.9572 16.0001 13.5319 16.0001 13.0091V9.6288C16.0001 8.46599 15.0482 7.51974 13.8782 7.51974Z"
                      fill="#2F80ED"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_685_2240">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
            />
            <Total
              number={calculateTotalCommissionForAllClients(
                singleSeller?.client
              )}
              totalSalesGuy=""
              totalProjects=""
              totalClients=""
              TotalEarnings=""
              styles={`bg-orange-200 border border-orange-500`}
              title="Total Earnings"
              svg={
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
              }
            />
          </div>
          {/* //===================================================== search field */}
          <div className="search mt-[20px] w-full h-[38px] flex items-center justify-between">
            <div className="flex">
              <div className="sales_client_project_statistics border  w-[375px] h-[38px] flex justify-between items-center rounded-md">
                <button
                  onClick={() => setMenu("Manage Sales People")}
                  className={`${
                    menu === "Manage Sales People" ? "shadow-md" : ""
                  } text-[12px] font-[400] text-[#878790] font-['work_sans'] active:shadow-md rounded-md w-[98px] h-[32px]`}
                >
                  Sales Guy
                </button>
                <button
                  onClick={() => setMenu("Manage Clients")}
                  className={`${
                    menu === "Manage Clients" ? "shadow-md" : ""
                  } text-[12px] font-[400] text-[#878790] font-['work_sans'] active:shadow-md rounded-md w-[98px] h-[32px]`}
                >
                  Clients
                </button>
                <button
                  onClick={() => setMenu("Manage Projects")}
                  className={`${
                    menu === "Manage Projects" ? "shadow-md" : ""
                  } text-[12px] font-[400] text-[#878790] font-['work_sans'] active:shadow-md rounded-md w-[98px] h-[32px]`}
                >
                  Projects
                </button>
                <button
                  onClick={() => setMenu("Manage Statistic")}
                  className={`${
                    menu === "Manage Statistic" ? "shadow-md" : ""
                  } text-[12px] font-[400] text-[#878790] font-['work_sans'] active:shadow-md rounded-md w-[98px] h-[32px]`}
                >
                  Statistics
                </button>
              </div>
              <div className="sales_client_project_statistics border  w-[225px] h-[38px] flex justify-between items-center rounded-md ml-[13px] gap-1 px-[10px]">
                <input
                  type="text"
                  name="startDate"
                  value={input.startDate}
                  onChange={handleOnChange}
                  placeholder="Mar 23, 2023"
                  className="w-[45%] focus:outline-none text-[12px] font-['work_sans']"
                />
                <input
                  type="text"
                  name="endDate"
                  value={input.endDate}
                  onChange={handleOnChange}
                  placeholder="Mar 23, 2023"
                  className="w-[45%] focus:outline-none text-[12px] font-['work_sans']"
                />
                <button className="w-[10%]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_684_1791)">
                      <path
                        d="M12.7502 1.87695H10.1252V0.876953C10.1252 0.808203 10.069 0.751953 10.0002 0.751953H9.12523C9.05648 0.751953 9.00023 0.808203 9.00023 0.876953V1.87695H5.00024V0.876953C5.00024 0.808203 4.94399 0.751953 4.87524 0.751953H4.00024C3.93149 0.751953 3.87524 0.808203 3.87524 0.876953V1.87695H1.25024C0.973681 1.87695 0.750244 2.10039 0.750244 2.37695V12.752C0.750244 13.0285 0.973681 13.252 1.25024 13.252H12.7502C13.0268 13.252 13.2502 13.0285 13.2502 12.752V2.37695C13.2502 2.10039 13.0268 1.87695 12.7502 1.87695ZM12.1252 12.127H1.87524V6.18945H12.1252V12.127ZM1.87524 5.12695V3.00195H3.87524V3.75195C3.87524 3.8207 3.93149 3.87695 4.00024 3.87695H4.87524C4.94399 3.87695 5.00024 3.8207 5.00024 3.75195V3.00195H9.00023V3.75195C9.00023 3.8207 9.05648 3.87695 9.12523 3.87695H10.0002C10.069 3.87695 10.1252 3.8207 10.1252 3.75195V3.00195H12.1252V5.12695H1.87524Z"
                        fill="#757575"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_684_1791">
                        <rect width="14" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
              <div className="sales_client_project_statistics border  w-[225px] h-[38px] flex justify-between items-center rounded-md ml-[13px] gap-1 px-[10px]">
                <button className="w-[10%]">
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
                </button>
                <input
                  type="text"
                  name="text"
                  value={input.text}
                  onChange={handleOnChange}
                  placeholder="Search"
                  className="w-[90%] focus:outline-none text-[12px] font-['work_sans']"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-[91px] rounded-md bg-gray-400 h-[38px] flex justify-center items-center hover:bg-gray-600 text-white transition-all duration-500 ease-in-out">
                Support
              </button>
              <button
                disabled={
                  loginInSeller?._id !== id && loginInSeller?.role !== "admin"
                }
                onClick={() => setModel(!model)}
                className={`w-[170px]   rounded-md h-[38px] bg-cyan-500 flex justify-center items-center gap-2 text-white hover:bg-cyan-600 transition-all duration-500 ease-in-out`}
              >
                Add Sales Person
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M8 13.9519C7.56844 13.9519 7.21875 13.6022 7.21875 13.1706V3.23438C7.21875 2.80281 7.56844 2.45312 8 2.45312C8.43156 2.45312 8.78125 2.80281 8.78125 3.23438V13.1706C8.78125 13.6022 8.43156 13.9519 8 13.9519Z"
                    fill="white"
                  />
                  <path
                    d="M12.9682 8.98389H3.03198C2.60042 8.98389 2.25073 8.6342 2.25073 8.20264C2.25073 7.77107 2.60042 7.42139 3.03198 7.42139H12.9682C13.3998 7.42139 13.7495 7.77107 13.7495 8.20264C13.7495 8.6342 13.3998 8.98389 12.9682 8.98389Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* //================================================ project datiels  */}
          <div className=" mt-[20px]  flex items-center justify-between">
            <ProjectDetails
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M7.50008 3.3335C5.65913 3.3335 4.16675 4.82588 4.16675 6.66683C4.16675 8.50775 5.65913 10.0002 7.50008 10.0002C9.341 10.0002 10.8334 8.50775 10.8334 6.66683C10.8334 4.82588 9.341 3.3335 7.50008 3.3335Z"
                    fill="rgb(14 116 144)"
                  />
                  <path
                    d="M15.8334 5.83333C15.8334 5.3731 15.4603 5 15.0001 5C14.5398 5 14.1667 5.3731 14.1667 5.83333V7.5H12.5001C12.0398 7.5 11.6667 7.8731 11.6667 8.33333C11.6667 8.79358 12.0398 9.16667 12.5001 9.16667H14.1667V10.8333C14.1667 11.2936 14.5398 11.6667 15.0001 11.6667C15.4603 11.6667 15.8334 11.2936 15.8334 10.8333V9.16667H17.5001C17.9603 9.16667 18.3334 8.79358 18.3334 8.33333C18.3334 7.8731 17.9603 7.5 17.5001 7.5H15.8334V5.83333Z"
                    fill="rgb(14 116 144)"
                  />
                  <path
                    d="M5.62508 10.8335C3.43896 10.8335 1.66675 12.6057 1.66675 14.7918C1.66675 15.8273 2.50621 16.6668 3.54175 16.6668H11.4584C12.4939 16.6668 13.3334 15.8273 13.3334 14.7918C13.3334 12.6057 11.5612 10.8335 9.37508 10.8335H5.62508Z"
                    fill="rgb(14 116 144)"
                  />
                </svg>
              }
              title="New Client Request"
              number={
                singleSeller?.projects
                  ? singleSeller?.projects.filter(
                      (item) => item.projectStatus === "pending"
                    )?.length
                  : 0
              }
            />
            <ProjectDetails
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.125 1.25C2.09 1.25 1.25 2.09 1.25 3.125V10.625C1.25 11.66 2.09 12.5 3.125 12.5H6.25C6.595 12.5 6.875 12.22 6.875 11.875C6.875 11.53 6.595 11.25 6.25 11.25H3.125C2.78 11.25 2.5 10.97 2.5 10.625V5.625H15V6.25C15 6.595 15.28 6.875 15.625 6.875C15.97 6.875 16.25 6.595 16.25 6.25V3.125C16.25 2.09 15.41 1.25 14.375 1.25H3.125ZM3.125 2.5H14.375C14.72 2.5 15 2.78 15 3.125V4.375H2.5V3.125C2.5 2.78 2.78 2.5 3.125 2.5ZM13.125 7.5C10.0394 7.5 7.5 10.0394 7.5 13.125C7.5 16.2106 10.0394 18.75 13.125 18.75C16.2106 18.75 18.75 16.2106 18.75 13.125C18.75 10.0394 16.2106 7.5 13.125 7.5ZM4.375 8.75C4.03 8.75 3.75 9.03 3.75 9.375C3.75 9.72 4.03 10 4.375 10H5.625C5.97 10 6.25 9.72 6.25 9.375C6.25 9.03 5.97 8.75 5.625 8.75H4.375ZM13.125 9.375C13.47 9.375 13.75 9.655 13.75 10V10.4163H14.1663C14.5113 10.4163 14.7913 10.6962 14.7913 11.0413C14.7913 11.3863 14.5113 11.6663 14.1663 11.6663H12.7087V12.5H14.1663C14.5119 12.5 14.7913 12.7794 14.7913 13.125V15.2087C14.7913 15.5538 14.5119 15.8337 14.1663 15.8337H13.75V16.25C13.75 16.595 13.47 16.875 13.125 16.875C12.78 16.875 12.5 16.595 12.5 16.25V15.8337H12.0837C11.7387 15.8337 11.4587 15.5538 11.4587 15.2087C11.4587 14.8637 11.7387 14.5837 12.0837 14.5837H13.0931C13.1037 14.5831 13.1144 14.5825 13.125 14.5825C13.1356 14.5825 13.1463 14.5831 13.1569 14.5837H13.5413V13.75H12.0837C11.7381 13.75 11.4587 13.4706 11.4587 13.125V11.0413C11.4587 10.6962 11.7381 10.4163 12.0837 10.4163H12.5V10C12.5 9.655 12.78 9.375 13.125 9.375Z"
                    fill="rgb(14 116 144)"
                  />
                </svg>
              }
              title="Commission Due"
              number={
                calculateTotalCommissionForAllClients(singleSeller?.client) -
                (singleSeller &&
                singleSeller.payment &&
                singleSeller.payment.length > 0
                  ? singleSeller.payment.reduce((acc, item) => {
                      const amount = parseFloat(item.amount) || 0;
                      return acc + amount;
                    }, 0)
                  : 0)
              }
              styles={`text-red-500`}
            />
            <ProjectDetails
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M7.50008 3.3335C5.65913 3.3335 4.16675 4.82588 4.16675 6.66683C4.16675 8.50775 5.65913 10.0002 7.50008 10.0002C9.341 10.0002 10.8334 8.50775 10.8334 6.66683C10.8334 4.82588 9.341 3.3335 7.50008 3.3335Z"
                    fill="rgb(14 116 144)"
                  />
                  <path
                    d="M15.8334 5.83333C15.8334 5.3731 15.4603 5 15.0001 5C14.5398 5 14.1667 5.3731 14.1667 5.83333V7.5H12.5001C12.0398 7.5 11.6667 7.8731 11.6667 8.33333C11.6667 8.79358 12.0398 9.16667 12.5001 9.16667H14.1667V10.8333C14.1667 11.2936 14.5398 11.6667 15.0001 11.6667C15.4603 11.6667 15.8334 11.2936 15.8334 10.8333V9.16667H17.5001C17.9603 9.16667 18.3334 8.79358 18.3334 8.33333C18.3334 7.8731 17.9603 7.5 17.5001 7.5H15.8334V5.83333Z"
                    fill="rgb(14 116 144)"
                  />
                  <path
                    d="M5.62508 10.8335C3.43896 10.8335 1.66675 12.6057 1.66675 14.7918C1.66675 15.8273 2.50621 16.6668 3.54175 16.6668H11.4584C12.4939 16.6668 13.3334 15.8273 13.3334 14.7918C13.3334 12.6057 11.5612 10.8335 9.37508 10.8335H5.62508Z"
                    fill="rgb(14 116 144)"
                  />
                </svg>
              }
              title="Payment Received"
              number={
                singleSeller?.payment && singleSeller?.payment.length > 0
                  ? singleSeller?.payment.reduce((acc, item) => {
                      const commission = parseFloat(item.amount) || 0;
                      return acc + commission;
                    }, 0)
                  : 0
              }
            />
            <ProjectDetails
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clipPath="url(#clip0_684_1767)">
                    <path
                      d="M12.5001 0.833496H3.33341C2.41675 0.833496 1.66675 1.5835 1.66675 2.50016V13.3335C1.66675 13.7918 2.04175 14.1668 2.50008 14.1668C2.95841 14.1668 3.33341 13.7918 3.33341 13.3335V3.3335C3.33341 2.87516 3.70841 2.50016 4.16675 2.50016H12.5001C12.9584 2.50016 13.3334 2.12516 13.3334 1.66683C13.3334 1.2085 12.9584 0.833496 12.5001 0.833496ZM12.9917 4.6585L17.0167 8.6835C17.3251 8.99183 17.5001 9.41683 17.5001 9.8585V17.5002C17.5001 18.4168 16.7501 19.1668 15.8334 19.1668H6.65841C5.74175 19.1668 5.00008 18.4168 5.00008 17.5002L5.00841 5.8335C5.00841 4.91683 5.75008 4.16683 6.66675 4.16683H11.8084C12.2501 4.16683 12.6751 4.34183 12.9917 4.6585ZM12.5001 10.0002H16.2501L11.6667 5.41683V9.16683C11.6667 9.62516 12.0417 10.0002 12.5001 10.0002Z"
                      fill="rgb(14 116 144)"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_684_1767">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
              title="Project Due"
              number={
                singleSeller?.projects?.length > 0
                  ? singleSeller?.projects?.filter(
                      (item) => item?.projectStatus !== "complete"
                    ).length
                  : 0
              }
              styles={`text-red-500`}
            />
            <ProjectDetails
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clipPath="url(#clip0_684_1767)">
                    <path
                      d="M12.5001 0.833496H3.33341C2.41675 0.833496 1.66675 1.5835 1.66675 2.50016V13.3335C1.66675 13.7918 2.04175 14.1668 2.50008 14.1668C2.95841 14.1668 3.33341 13.7918 3.33341 13.3335V3.3335C3.33341 2.87516 3.70841 2.50016 4.16675 2.50016H12.5001C12.9584 2.50016 13.3334 2.12516 13.3334 1.66683C13.3334 1.2085 12.9584 0.833496 12.5001 0.833496ZM12.9917 4.6585L17.0167 8.6835C17.3251 8.99183 17.5001 9.41683 17.5001 9.8585V17.5002C17.5001 18.4168 16.7501 19.1668 15.8334 19.1668H6.65841C5.74175 19.1668 5.00008 18.4168 5.00008 17.5002L5.00841 5.8335C5.00841 4.91683 5.75008 4.16683 6.66675 4.16683H11.8084C12.2501 4.16683 12.6751 4.34183 12.9917 4.6585ZM12.5001 10.0002H16.2501L11.6667 5.41683V9.16683C11.6667 9.62516 12.0417 10.0002 12.5001 10.0002Z"
                      fill="rgb(14 116 144)"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_684_1767">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
              title="Project Completed"
              number={
                singleSeller?.projects?.length > 0
                  ? singleSeller?.projects?.filter(
                      (item) => item.projectStatus === "complete"
                    ).length
                  : 0
              }
            />
          </div>
          <h1 className="mt-[25px] text-[22px] font-['work_sans'] tracking-[-.9px]">
            {menu}
          </h1>
          {/* //=================================================== all sales person  */}
          {menu === "Manage Sales People" && (
            <div className=" mt-[27px] w-full h-full pb-[150px] overflow-y-auto grid grid-cols-4 justify-between gap-y-[8px]">
              {singleSeller?.salesPerson?.length > 0 ? (
                singleSeller?.salesPerson
                  ?.filter((seller) => {
                    return (
                      (input?.text
                        ? seller?.name
                            ?.toLowerCase()
                            .includes(input?.text?.toLowerCase())
                        : true) &&
                      (input?.startDate
                        ? new Date(seller?.date) >= new Date(input?.startDate)
                        : true) &&
                      (input?.endDate
                        ? new Date(seller?.date) <= new Date(input?.endDate)
                        : true) &&
                      (input?.status ? seller?.status === input?.status : true)
                    );
                  })
                  ?.map((item, index) => {
                    return (
                      <SalesPeople
                        key={index}
                        avatar={item.avatar}
                        name={item.name}
                        title="Sales Executive"
                        project={
                          item?.projects?.length > 0
                            ? item?.projects?.length
                            : 0
                        }
                        clients={
                          item?.client?.length > 0 ? item?.client?.length : 0
                        }
                        earning={
                          item?.client?.length > 0
                            ? calculateTotalCommissionForAllClients(
                                item?.client
                              )
                            : 0
                        }
                        companyName={item.companyName}
                        ActiveClient={
                          item?.client?.length > 0 ? item?.client : []
                        }
                        companyLogo={item.companyAvatar}
                        styles=""
                      />
                    );
                  })
              ) : (
                <span>No sales Guy</span>
              )}
            </div>
          )}
          {menu === "Manage Clients" && (
            <div className=" mt-[27px] w-full h-full pb-[150px] overflow-y-auto grid grid-cols-4 justify-between gap-y-[8px]">
              {singleSeller?.client?.length > 0 ? (
                singleSeller?.client
                  ?.filter((client) => {
                    return (
                      (input?.text
                        ? client?.clientName
                            ?.toLowerCase()
                            .includes(input?.text?.toLowerCase())
                        : true) &&
                      (input?.startDate
                        ? new Date(client?.date) >= new Date(input?.startDate)
                        : true) &&
                      (input?.endDate
                        ? new Date(client?.date) <= new Date(input?.endDate)
                        : true) &&
                      (input?.status
                        ? client?.projectStatus === input?.status
                        : true)
                    );
                  })
                  ?.map((item, index) => {
                    return (
                      <ClientComponent
                        clientAvatar={item?.clientAvatar}
                        clientName={item?.clientName}
                        key={index}
                        amount={item?.amount}
                        date={item?.date}
                        timeFrame={item?.timeFrame}
                        companyName={item?.companyName}
                        projectStatus={item?.projectStatus}
                        projectName={item?.projectName}
                        team={item?.team}
                        email={item?.clientEmail}
                        mobile={item?.clientPhone}
                      />
                    );
                  })
              ) : (
                <span>No Client</span>
              )}
            </div>
          )}
          {menu === "Manage Projects" && (
            <div className=" mt-[27px] w-full h-full pb-[150px] overflow-y-auto grid grid-cols-4 justify-between gap-y-[8px]">
              {singleSeller?.client?.length > 0 ? (
                singleSeller?.client
                  ?.filter((client) => {
                    return (
                      (input?.text
                        ? client?.clientName
                            ?.toLowerCase()
                            .includes(input?.text?.toLowerCase())
                        : true) &&
                      (input?.startDate
                        ? new Date(client?.date) >= new Date(input?.startDate)
                        : true) &&
                      (input?.endDate
                        ? new Date(client?.date) <= new Date(input?.endDate)
                        : true) &&
                      (input?.status
                        ? client?.projectStatus === input?.status
                        : true)
                    );
                  })
                  ?.map((item, index) => {
                    return (
                      <ProjectComponent
                        clientAvatar={item?.clientAvatar}
                        clientName={item?.clientName}
                        key={index}
                        amount={item?.amount}
                        date={item?.date}
                        timeFrame={item?.timeFrame}
                        companyName={item?.companyName}
                        projectStatus={item?.projectStatus}
                        projectName={item?.projectName}
                        team={item?.team}
                        email={item?.clientEmail}
                        mobile={item?.clientPhone}
                      />
                    );
                  })
              ) : (
                <span>No Projects</span>
              )}
            </div>
          )}
          {menu === "Manage Statistic" && (
            <div className=" mt-[27px] w-full h-full pb-[150px] overflow-y-auto grid grid-cols-4 justify-between gap-y-[8px]">
              <StatisticComponent />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Seller;
