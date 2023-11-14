import companyLogo from "../../../public/clientLogo.png";
import bgImg from "../../../public/bgImg.png";
import user from "../../../public/user.png";
import DetialsSections from "../../Components/DetialsSections";
import Team from "../../Components/Team";
import SoftWere from "../../Components/SoftWere";
import ProjectFile from "../../Components/ProjectFile";
import Invoices from "../../Components/Invoices";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientState } from "../../Features/Client/ClientSlice";
import { useEffect, useRef, useState } from "react";
import { getSingleClient, updateClient } from "../../Features/Client/ClientApi";
import { Link, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import LoadingSpinner from "../../Components/LoadingSpin";
import html2canvas from "html2canvas";
const Project = () => {
  //===================================== get all client state
  const { singleClient, loader } = useSelector(getAllClientState);
  //====================================================dispatch and all state
  const dispatch = useDispatch();
  const { id } = useParams();
  const [team, setTeam] = useState(false);
  const [pdf, setPdf] = useState(false);
  const pdfRef = useRef();
  const [selectedSalespersons, setSelectedSalespersons] = useState([]);
  //========================================================get all singleClient
  useEffect(() => {
    dispatch(getSingleClient(id));
  }, [dispatch, id]);
  //===========================================================handle file upload
  const handleFileUpload = (e) => {
    const formData = new FormData();
    [...e.target.files].forEach((item) => {
      formData.append("projectFile", item);
    });
    dispatch(updateClient({ id, formData })).then(() => {
      dispatch(getSingleClient(id));
    });
  };
  //=====================================download pdf
  const handlePdf = () => {
    setPdf(true);
    const capture = pdfRef.current;
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // Fix the MIME type here
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth(); // Fix the method name here
      const componentHeight = doc.internal.pageSize.getHeight(); // Fix the method name here
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save();
      setPdf(false);
    });
  };
  //=====================================team member checkbox
  const handleInputChange = (e) => {
    const selectedValue = String(e.target.value);

    if (selectedSalespersons.includes(selectedValue)) {
      setSelectedSalespersons(
        selectedSalespersons.filter((item) => item !== selectedValue)
      );
    } else {
      setSelectedSalespersons((prev) => [...prev, selectedValue]);
    }
  };
  //================================= handle team update
  const handleTeamUpdate = (e) => {
    e.preventDefault();

    dispatch(
      updateClient({ id, formData: { team: selectedSalespersons } })
    ).then(() => {
      dispatch(getSingleClient(id));
      setTeam(false);
    });
  };
  //============================================ edit team member data
  useEffect(() => {
    let allTeam = [];
    singleClient?.team?.forEach((item) => {
      allTeam?.push(item._id);
    });
    setSelectedSalespersons(allTeam);
  }, [singleClient]);
  //===================================================return
  return (
    <>
      {/* //================================================== loader  */}
      {loader && (
        <div className="w-screen bg-opacity-20  h-screen min-h-[1240px] z-[9999999999999] bg-cyan-600 flex justify-center items-center absolute top-0 left-0">
          <div className="top-[45%] absolute flex justify-center items-center w-full h-full">
            <LoadingSpinner />
          </div>
        </div>
      )}
      {/* //===================================================pdf download  */}
      {pdf && (
        <div
          ref={pdfRef}
          className="w-[50%] h-[60vh] absolute top-[10%] left-[25%] bg-white p-5"
          size="a4"
        >
          {singleClient?.projectDesc}
        </div>
      )}
      {/* //================================================ team  */}
      {team && (
        <div className=" top-0 group left-0 w-screen flex flex-col gap-5  justify-center items-center h-screen fixed z-[999999999] bg-white p-5">
          <button
            className="group-hover:opacity-100 opacity-0 w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center hover:bg-gray-400 transition-all duration-500 ease-in-out "
            onClick={() => setTeam(false)}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 8 8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.41 0l-1.41 1.41.72.72 1.78 1.81-1.78 1.78-.72.69 1.41 1.44.72-.72 1.81-1.81 1.78 1.81.69.72 1.44-1.44-.72-.69-1.81-1.78 1.81-1.81.72-.72-1.44-1.41-.69.72-1.78 1.78-1.81-1.78-.72-.72z" />
            </svg>
          </button>
          {/* //======================================================form  */}
          <form
            onSubmit={handleTeamUpdate}
            className="w-[50vw]  rounded-md h-auto border gap-3 bg-gray-50 grid grid-cols-4 grid-flow-row overflow-y-scroll p-2"
          >
            {singleClient?.sellerId?.salesPerson?.length > 0 ? (
              singleClient?.sellerId?.salesPerson?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="h-[100px] p-3 shrink-0 border bg-white w-full flex flex-col items-center relative justify-center"
                  >
                    <input
                      type="checkbox"
                      className="absolute top-3 left-3"
                      checked={selectedSalespersons?.includes(item?._id)}
                      value={item?._id}
                      onChange={handleInputChange}
                    />
                    <div className="w-full h-full flex-col flex justify-start items-center">
                      <img
                        className="w-[50px] h-[50px] rounded-full"
                        src={item?.avatar}
                        alt=""
                      />
                      <span className="text-[10px] font-['work_sans']">
                        {item.name}
                      </span>
                      <span className="text-[8px] font-['work_sans']">
                        {item.email}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <span>No Team member</span>
            )}

            <button
              type="submit"
              className="h-[30px] justify-end col-span-4 bg-darkBlue text-white"
            >
              Add Team Member
            </button>
          </form>
        </div>
      )}
      <div className="min-w-[1340px] relative rounded-[15px]  pl-[48px]  pt-[30px]   min-h-[1140px] h-[1140px] grid grid-flow-row overflow-hidden mb-[30px] bg-white">
        {/* //============================================================ header  */}
        <div className="header bg-white min-w-full flex items-center w-[1300px] h-[68px]">
          <div className="w-[640px] h-full flex items-center gap-[20px] ">
            {singleClient?.sellerId?.companyAvatar ? (
              <img
                className="w-[86px] h-[70px]"
                src={singleClient?.sellerId?.companyAvatar}
                alt=""
              />
            ) : (
              <img className="w-[86px] h-[70px]" src={companyLogo} alt="" />
            )}
            <h1 className="text-[26px] capitalize leading-[31px] font-[600] font-['Work_Sans] tracking-[.9px]">
              Sales Portal / {singleClient?.sellerId?.name}
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
                    target="blank"
                    to={singleClient?.website}
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
              {singleClient?.sellerId?.avatar ? (
                <img
                  className=" w-[46px] h-[46px] mt-[0px] ml-[5px] border-[1px] rounded-full p-[2px] border-cyan-600"
                  src={singleClient?.sellerId?.avatar}
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
                  {singleClient?.sellerId?.name}
                </p>
                <span className="text-[#3A3A49] truncate w-[90px] text-[13px] font-[400] font-['work_sans']">
                  {singleClient?.sellerId?.email}
                </span>
              </div>
            </Link>
          </div>
        </div>
        {/* //==========================================================main container  */}
        <div className="main-container flex min-w-full gap-[43px] w-[1300px] mt-[52px] tracking-[-.52px] h-[1072px] ">
          {/* //========================================================left section  */}
          <div className="left w-[938px] h-full">
            <h1 className="text-[26px] font-[600] text-[#3a3a49] font-['work_sans']">
              Real-Time Video Processing using Chromakey (Greenscreen) Effect{" "}
            </h1>
            <p className="text-[12px] font-[400px] font-['work_sans'] text-[#878790] mt-[4px]">
              Visual UI / UX Design & Branding
            </p>

            {/* //===================================== client datiels section  */}
            <div className="flex gap-[px] mt-[16px]">
              <DetialsSections
                name={singleClient?.clientName}
                title="client Name"
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_696_5100)">
                      <path
                        d="M8.75 6.45703C10.2515 6.45703 11.4688 5.23981 11.4688 3.73828C11.4688 2.23676 10.2515 1.01953 8.75 1.01953C7.24848 1.01953 6.03125 2.23676 6.03125 3.73828C6.03125 5.23981 7.24848 6.45703 8.75 6.45703Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M14.25 6.45703C15.1992 6.45703 15.9688 5.68752 15.9688 4.73828C15.9688 3.78904 15.1992 3.01953 14.25 3.01953C13.3008 3.01953 12.5312 3.78904 12.5312 4.73828C12.5312 5.68752 13.3008 6.45703 14.25 6.45703Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M3.25 6.45703C4.19924 6.45703 4.96875 5.68752 4.96875 4.73828C4.96875 3.78904 4.19924 3.01953 3.25 3.01953C2.30076 3.01953 1.53125 3.78904 1.53125 4.73828C1.53125 5.68752 2.30076 6.45703 3.25 6.45703Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M4.94344 8.00027C4.26688 7.44595 3.65416 7.51933 2.87188 7.51933C1.70188 7.51933 0.75 8.46558 0.75 9.62839V13.0412C0.75 13.5462 1.16219 13.9568 1.66906 13.9568C3.85738 13.9568 3.59375 13.9964 3.59375 13.8625C3.59375 11.4441 3.30731 9.67067 4.94344 8.00027Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M9.49403 7.53199C8.12766 7.41802 6.94 7.5333 5.91559 8.37887C4.20131 9.75199 4.53122 11.6008 4.53122 13.8626C4.53122 14.461 5.01809 14.957 5.62559 14.957C12.2219 14.957 12.4844 15.1698 12.8756 14.3036C13.0039 14.0106 12.9687 14.1037 12.9687 11.3014C12.9687 9.07555 11.0414 7.53199 9.49403 7.53199Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M14.6281 7.51974C13.8416 7.51974 13.2322 7.44711 12.5566 8.00068C14.1805 9.65868 13.9063 11.3111 13.9063 13.8629C13.9063 13.9977 13.6874 13.9572 15.7981 13.9572C16.3231 13.9572 16.75 13.5319 16.75 13.0091V9.6288C16.75 8.46599 15.7981 7.51974 14.6281 7.51974Z"
                        fill="#2F80ED"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_696_5100">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(0.75)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                }
              />
              <DetialsSections
                name={singleClient?.companyName}
                title="Company Name"
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_696_5100)">
                      <path
                        d="M8.75 6.45703C10.2515 6.45703 11.4688 5.23981 11.4688 3.73828C11.4688 2.23676 10.2515 1.01953 8.75 1.01953C7.24848 1.01953 6.03125 2.23676 6.03125 3.73828C6.03125 5.23981 7.24848 6.45703 8.75 6.45703Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M14.25 6.45703C15.1992 6.45703 15.9688 5.68752 15.9688 4.73828C15.9688 3.78904 15.1992 3.01953 14.25 3.01953C13.3008 3.01953 12.5312 3.78904 12.5312 4.73828C12.5312 5.68752 13.3008 6.45703 14.25 6.45703Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M3.25 6.45703C4.19924 6.45703 4.96875 5.68752 4.96875 4.73828C4.96875 3.78904 4.19924 3.01953 3.25 3.01953C2.30076 3.01953 1.53125 3.78904 1.53125 4.73828C1.53125 5.68752 2.30076 6.45703 3.25 6.45703Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M4.94344 8.00027C4.26688 7.44595 3.65416 7.51933 2.87188 7.51933C1.70188 7.51933 0.75 8.46558 0.75 9.62839V13.0412C0.75 13.5462 1.16219 13.9568 1.66906 13.9568C3.85738 13.9568 3.59375 13.9964 3.59375 13.8625C3.59375 11.4441 3.30731 9.67067 4.94344 8.00027Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M9.49403 7.53199C8.12766 7.41802 6.94 7.5333 5.91559 8.37887C4.20131 9.75199 4.53122 11.6008 4.53122 13.8626C4.53122 14.461 5.01809 14.957 5.62559 14.957C12.2219 14.957 12.4844 15.1698 12.8756 14.3036C13.0039 14.0106 12.9687 14.1037 12.9687 11.3014C12.9687 9.07555 11.0414 7.53199 9.49403 7.53199Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M14.6281 7.51974C13.8416 7.51974 13.2322 7.44711 12.5566 8.00068C14.1805 9.65868 13.9063 11.3111 13.9063 13.8629C13.9063 13.9977 13.6874 13.9572 15.7981 13.9572C16.3231 13.9572 16.75 13.5319 16.75 13.0091V9.6288C16.75 8.46599 15.7981 7.51974 14.6281 7.51974Z"
                        fill="#2F80ED"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_696_5100">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(0.75)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                }
              />
              <DetialsSections
                name={singleClient?.date}
                title="Assigned Date"
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_696_5100)">
                      <path
                        d="M8.75 6.45703C10.2515 6.45703 11.4688 5.23981 11.4688 3.73828C11.4688 2.23676 10.2515 1.01953 8.75 1.01953C7.24848 1.01953 6.03125 2.23676 6.03125 3.73828C6.03125 5.23981 7.24848 6.45703 8.75 6.45703Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M14.25 6.45703C15.1992 6.45703 15.9688 5.68752 15.9688 4.73828C15.9688 3.78904 15.1992 3.01953 14.25 3.01953C13.3008 3.01953 12.5312 3.78904 12.5312 4.73828C12.5312 5.68752 13.3008 6.45703 14.25 6.45703Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M3.25 6.45703C4.19924 6.45703 4.96875 5.68752 4.96875 4.73828C4.96875 3.78904 4.19924 3.01953 3.25 3.01953C2.30076 3.01953 1.53125 3.78904 1.53125 4.73828C1.53125 5.68752 2.30076 6.45703 3.25 6.45703Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M4.94344 8.00027C4.26688 7.44595 3.65416 7.51933 2.87188 7.51933C1.70188 7.51933 0.75 8.46558 0.75 9.62839V13.0412C0.75 13.5462 1.16219 13.9568 1.66906 13.9568C3.85738 13.9568 3.59375 13.9964 3.59375 13.8625C3.59375 11.4441 3.30731 9.67067 4.94344 8.00027Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M9.49403 7.53199C8.12766 7.41802 6.94 7.5333 5.91559 8.37887C4.20131 9.75199 4.53122 11.6008 4.53122 13.8626C4.53122 14.461 5.01809 14.957 5.62559 14.957C12.2219 14.957 12.4844 15.1698 12.8756 14.3036C13.0039 14.0106 12.9687 14.1037 12.9687 11.3014C12.9687 9.07555 11.0414 7.53199 9.49403 7.53199Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M14.6281 7.51974C13.8416 7.51974 13.2322 7.44711 12.5566 8.00068C14.1805 9.65868 13.9063 11.3111 13.9063 13.8629C13.9063 13.9977 13.6874 13.9572 15.7981 13.9572C16.3231 13.9572 16.75 13.5319 16.75 13.0091V9.6288C16.75 8.46599 15.7981 7.51974 14.6281 7.51974Z"
                        fill="#2F80ED"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_696_5100">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(0.75)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                }
              />
              <DetialsSections
                name={singleClient?.timeFrame}
                title="Deadline"
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_696_5100)">
                      <path
                        d="M8.75 6.45703C10.2515 6.45703 11.4688 5.23981 11.4688 3.73828C11.4688 2.23676 10.2515 1.01953 8.75 1.01953C7.24848 1.01953 6.03125 2.23676 6.03125 3.73828C6.03125 5.23981 7.24848 6.45703 8.75 6.45703Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M14.25 6.45703C15.1992 6.45703 15.9688 5.68752 15.9688 4.73828C15.9688 3.78904 15.1992 3.01953 14.25 3.01953C13.3008 3.01953 12.5312 3.78904 12.5312 4.73828C12.5312 5.68752 13.3008 6.45703 14.25 6.45703Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M3.25 6.45703C4.19924 6.45703 4.96875 5.68752 4.96875 4.73828C4.96875 3.78904 4.19924 3.01953 3.25 3.01953C2.30076 3.01953 1.53125 3.78904 1.53125 4.73828C1.53125 5.68752 2.30076 6.45703 3.25 6.45703Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M4.94344 8.00027C4.26688 7.44595 3.65416 7.51933 2.87188 7.51933C1.70188 7.51933 0.75 8.46558 0.75 9.62839V13.0412C0.75 13.5462 1.16219 13.9568 1.66906 13.9568C3.85738 13.9568 3.59375 13.9964 3.59375 13.8625C3.59375 11.4441 3.30731 9.67067 4.94344 8.00027Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M9.49403 7.53199C8.12766 7.41802 6.94 7.5333 5.91559 8.37887C4.20131 9.75199 4.53122 11.6008 4.53122 13.8626C4.53122 14.461 5.01809 14.957 5.62559 14.957C12.2219 14.957 12.4844 15.1698 12.8756 14.3036C13.0039 14.0106 12.9687 14.1037 12.9687 11.3014C12.9687 9.07555 11.0414 7.53199 9.49403 7.53199Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M14.6281 7.51974C13.8416 7.51974 13.2322 7.44711 12.5566 8.00068C14.1805 9.65868 13.9063 11.3111 13.9063 13.8629C13.9063 13.9977 13.6874 13.9572 15.7981 13.9572C16.3231 13.9572 16.75 13.5319 16.75 13.0091V9.6288C16.75 8.46599 15.7981 7.51974 14.6281 7.51974Z"
                        fill="#2F80ED"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_696_5100">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(0.75)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                }
              />
              <DetialsSections
                name={singleClient?.budget}
                title="Budget"
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_696_5100)">
                      <path
                        d="M8.75 6.45703C10.2515 6.45703 11.4688 5.23981 11.4688 3.73828C11.4688 2.23676 10.2515 1.01953 8.75 1.01953C7.24848 1.01953 6.03125 2.23676 6.03125 3.73828C6.03125 5.23981 7.24848 6.45703 8.75 6.45703Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M14.25 6.45703C15.1992 6.45703 15.9688 5.68752 15.9688 4.73828C15.9688 3.78904 15.1992 3.01953 14.25 3.01953C13.3008 3.01953 12.5312 3.78904 12.5312 4.73828C12.5312 5.68752 13.3008 6.45703 14.25 6.45703Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M3.25 6.45703C4.19924 6.45703 4.96875 5.68752 4.96875 4.73828C4.96875 3.78904 4.19924 3.01953 3.25 3.01953C2.30076 3.01953 1.53125 3.78904 1.53125 4.73828C1.53125 5.68752 2.30076 6.45703 3.25 6.45703Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M4.94344 8.00027C4.26688 7.44595 3.65416 7.51933 2.87188 7.51933C1.70188 7.51933 0.75 8.46558 0.75 9.62839V13.0412C0.75 13.5462 1.16219 13.9568 1.66906 13.9568C3.85738 13.9568 3.59375 13.9964 3.59375 13.8625C3.59375 11.4441 3.30731 9.67067 4.94344 8.00027Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M9.49403 7.53199C8.12766 7.41802 6.94 7.5333 5.91559 8.37887C4.20131 9.75199 4.53122 11.6008 4.53122 13.8626C4.53122 14.461 5.01809 14.957 5.62559 14.957C12.2219 14.957 12.4844 15.1698 12.8756 14.3036C13.0039 14.0106 12.9687 14.1037 12.9687 11.3014C12.9687 9.07555 11.0414 7.53199 9.49403 7.53199Z"
                        fill="#2F80ED"
                      />
                      <path
                        d="M14.6281 7.51974C13.8416 7.51974 13.2322 7.44711 12.5566 8.00068C14.1805 9.65868 13.9063 11.3111 13.9063 13.8629C13.9063 13.9977 13.6874 13.9572 15.7981 13.9572C16.3231 13.9572 16.75 13.5319 16.75 13.0091V9.6288C16.75 8.46599 15.7981 7.51974 14.6281 7.51974Z"
                        fill="#2F80ED"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_696_5100">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(0.75)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                }
              />
            </div>
            {/* //========================================== manage project  */}
            <div className="manageProject flex justify-between items-center ">
              <div className="comment w-[375px] mt-[42px] rounded-[7px] h-[38px] border-[1px] border-[#DFDFDF] grid grid-cols-3">
                <button className="active:bg-white active:shadow-lg text-[12px] font-[500] font-['work_sans']  rounded-[7px]  text-[#878790]">
                  Project Details
                </button>
                <button className=" active:bg-white active:shadow-lg text-[12px] font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out  rounded-[7px] text-[#878790]">
                  Client Feedback
                </button>
                <button className="active:bg-white active:shadow-lg text-[12px] font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out  rounded-[7px] text-[#878790]">
                  Client Feedback
                </button>
              </div>
              <div className="button h-full flex justify-center items-center">
                <button className="bg-cyan-600 text-[14px] font-[500] text-white hover:bg-cyan-900 transition-all duration-500 w-[134px] h-[38px] rounded-md mt-[39px]">
                  Manage Project
                </button>
              </div>
            </div>
            {/* //====================================================== project datiels  */}
            <div className="projectDatials overflow-hidden rounded-[8px] border w-full mt-[18px] h-[150px] px-[20px] py-[15px]">
              <div className="flex justify-between">
                <h1 className="text-[#230B34] font-[500] text-[20px] tracking-[.4px] font-['work_sans'] ">
                  Project Details
                </h1>
                <button
                  onClick={handlePdf}
                  className="w-[120px] h-[26px] flex justify-center items-center text-[12px] font-['work_sans'] bg-gray-100 px-[6px] py-[2px] border rounded-md font-[400] gap-[5px] hover:bg-gray-300 transition-all duration-500 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="14"
                    viewBox="0 0 11 14"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.82258 0H6.50324L10.4703 4.13494V12.1774C10.4703 13.1849 9.65517 14 8.65116 14H1.82258C0.81509 14 2.87907e-10 13.1849 2.87907e-10 12.1774V1.82258C-1.76887e-05 0.81509 0.815072 0 1.82258 0Z"
                      fill="#E5252A"
                    />
                    <path
                      opacity="0.302"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.49963 0V4.10345H10.4702L6.49963 0Z"
                      fill="white"
                    />
                    <path
                      d="M2.02539 10.4459V7.88867H3.11335C3.38272 7.88867 3.59612 7.96213 3.75703 8.11256C3.91795 8.25949 3.99842 8.45889 3.99842 8.70726C3.99842 8.95563 3.91795 9.15504 3.75703 9.30197C3.59612 9.45239 3.38272 9.52586 3.11335 9.52586H2.67956V10.4459H2.02539ZM2.67956 8.96964H3.03989C3.13783 8.96964 3.2148 8.94865 3.26728 8.89968C3.31974 8.85421 3.34775 8.79123 3.34775 8.70728C3.34775 8.62333 3.31976 8.56036 3.26728 8.51488C3.21481 8.4659 3.13785 8.44492 3.03989 8.44492H2.67956V8.96964ZM4.26777 10.4459V7.88867H5.17381C5.35222 7.88867 5.52015 7.91315 5.67756 7.96564C5.83497 8.0181 5.97841 8.09158 6.10434 8.19303C6.23029 8.29097 6.33173 8.4239 6.4052 8.59183C6.47515 8.75975 6.51365 8.95215 6.51365 9.16903C6.51365 9.38243 6.47517 9.57484 6.4052 9.74274C6.33173 9.91066 6.23029 10.0436 6.10434 10.1415C5.9784 10.243 5.83497 10.3164 5.67756 10.3689C5.52015 10.4214 5.35222 10.4459 5.17381 10.4459H4.26777ZM4.90795 9.88968H5.09685C5.1983 9.88968 5.29275 9.87919 5.38021 9.85469C5.46416 9.83021 5.54463 9.79172 5.62159 9.73926C5.69505 9.68679 5.75452 9.61331 5.7965 9.51537C5.83848 9.41742 5.85947 9.30197 5.85947 9.16903C5.85947 9.0326 5.83848 8.91716 5.7965 8.81922C5.75452 8.72127 5.69505 8.64781 5.62159 8.59533C5.54463 8.54286 5.46418 8.50437 5.38021 8.47989C5.29275 8.45541 5.1983 8.4449 5.09685 8.4449H4.90795V9.88968ZM6.84248 10.4459V7.88867H8.66158V8.4449H7.49666V8.85419H8.42719V9.40692H7.49666V10.4459H6.84248Z"
                      fill="white"
                    />
                  </svg>{" "}
                  Download PDF
                </button>
              </div>
              <div className=" overflow-y-scroll h-full">
                <p className="text-['work_sans'] font-[14px] mt-[20px] pb-10 leading-[18px]">
                  {singleClient?.projectDesc}
                </p>
              </div>
            </div>
            {/* //============================================== team member  */}
            <div className="teamMember overflow-hidden rounded-[8px] border w-full mt-[18px] h-[217px] px-[16px] py-[15px]">
              <div className="flex justify-between">
                <h1 className="text-[#230B34] font-[500] text-[20px] tracking-[.4px] font-['work_sans'] ">
                  Team
                </h1>
                <button className="w-[106px] h-[26px] flex justify-center items-center text-[12px] font-['work_sans'] bg-gray-100 px-[6px] py-[2px] border rounded-md font-[400]  hover:bg-gray-300 transition-all duration-500 ease-in-out">
                  Manage Team
                </button>
              </div>
              <div className="grid grid-cols-4 h-full overflow-y-auto mt-5 pb-5">
                {singleClient?.team?.length > 0 ? (
                  singleClient?.team?.map((item, index) => {
                    return (
                      <Team
                        key={index}
                        avatar={item?.avatar}
                        name={item?.name}
                        title={item?.employment}
                      />
                    );
                  })
                ) : (
                  <span>No team member</span>
                )}
                <button
                  onClick={() => setTeam(!team)}
                  className="flex p-[4px] items-center h-[42px] gap-[10px]"
                >
                  <div className="w-[42px] h-[42px] border rounded-full flex justify-center items-center bg-gray-100">
                    +
                  </div>
                  <div className="text-[16px] font-[500] font-['work_sans']">
                    Add Member
                  </div>
                </button>
              </div>
            </div>
            {/* //================================================== softwere tools  */}
            <div className="softwareTools overflow-hidden rounded-[8px] border w-full mt-[18px] h-[117px] px-[20px] py-[18px]">
              <div className="flex justify-between">
                <h1 className="text-[#230B34] font-[500] text-[20px] tracking-[.4px] font-['work_sans'] ">
                  Software & Tools
                </h1>
                <button className="w-[106px] h-[26px] flex justify-center items-center text-[12px] font-['work_sans'] bg-gray-100 px-[6px] py-[2px] border rounded-md font-[400]  hover:bg-gray-300 transition-all duration-500 ease-in-out">
                  Manage Tools
                </button>
              </div>
              <div className="flex flex-wrap  h-full overflow-y-auto gap-[15px] mt-5 pb-10">
                {singleClient?.tools.map((item, index) => {
                  return (
                    <SoftWere
                      key={index}
                      svg={item?.slice(
                        ((filename.lastIndexOf(".") - 1) >>> 0) + 2 ==
                          "psd" && (
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 12.1333C2 8.58633 2 6.81283 2.69029 5.45806C3.29749 4.26637 4.26637 3.29749 5.45806 2.69029C6.81283 2 8.58633 2 12.1333 2H19.8667C23.4137 2 25.1872 2 26.5419 2.69029C27.7336 3.29749 28.7025 4.26637 29.3097 5.45806C30 6.81283 30 8.58633 30 12.1333V19.8667C30 23.4137 30 25.1872 29.3097 26.5419C28.7025 27.7336 27.7336 28.7025 26.5419 29.3097C25.1872 30 23.4137 30 19.8667 30H12.1333C8.58633 30 6.81283 30 5.45806 29.3097C4.26637 28.7025 3.29749 27.7336 2.69029 26.5419C2 25.1872 2 23.4137 2 19.8667V12.1333Z"
                              fill="#001E36"
                            />
                            <path
                              d="M8 22.5162V10.2034C8 10.1197 8.035 10.0718 8.11667 10.0718C9.3223 10.0718 10.5274 10 11.7333 10C13.6902 10 15.809 10.6691 16.5517 12.7162C16.7267 13.2188 16.82 13.7333 16.82 14.2718C16.82 15.3009 16.5867 16.1504 16.12 16.8205C14.8164 18.6923 12.557 18.6632 10.5317 18.6632V22.5043C10.5475 22.618 10.4506 22.6718 10.3567 22.6718H8.14C8.04667 22.6718 8 22.6239 8 22.5162ZM10.5433 12.3812V16.4017C11.3464 16.4605 12.1867 16.4669 12.9583 16.2103C13.8102 15.9645 14.2767 15.2272 14.2767 14.3436C14.3003 13.5907 13.8901 12.8683 13.1917 12.5966C12.4294 12.2796 11.3662 12.2606 10.5433 12.3812Z"
                              fill="#31A8FF"
                            />
                            <path
                              d="M24.0967 15.6074C23.7437 15.4213 23.3677 15.2852 22.979 15.2028C22.4796 15.0853 20.5098 14.6737 20.509 15.7037C20.5265 16.2787 21.4393 16.5604 21.8426 16.7247C23.2585 17.2108 24.8607 18.0797 24.8292 19.8264C24.8725 22.0008 22.7657 22.8701 20.9598 22.8703C20.0197 22.88 19.0403 22.7344 18.1799 22.3308C18.0977 22.2873 18.0449 22.1944 18.0484 22.0996V20.019C18.0391 19.9356 18.1287 19.8627 18.1987 19.9227C19.0417 20.4325 20.0409 20.6801 21.0162 20.6933C21.4467 20.6933 22.2999 20.6516 22.2935 20.019C22.2935 19.412 21.2728 19.1329 20.8659 18.9787C20.2761 18.7682 19.7169 18.4765 19.2036 18.1118C18.4862 17.6001 18.0362 16.7797 18.0484 15.8771C18.0442 13.8297 19.9835 12.9107 21.73 12.9103C22.5464 12.9035 23.4232 12.964 24.1832 13.2956C24.2925 13.3277 24.3151 13.4429 24.3147 13.546V15.4918C24.3216 15.6126 24.1875 15.6537 24.0967 15.6074Z"
                              fill="#31A8FF"
                            />
                          </svg>
                        )
                      )}
                      name="Photoshop"
                    />
                  );
                })}
                <SoftWere
                  svg={
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 12.1333C2 8.58633 2 6.81283 2.69029 5.45806C3.29749 4.26637 4.26637 3.29749 5.45806 2.69029C6.81283 2 8.58633 2 12.1333 2H19.8667C23.4137 2 25.1872 2 26.5419 2.69029C27.7336 3.29749 28.7025 4.26637 29.3097 5.45806C30 6.81283 30 8.58633 30 12.1333V19.8667C30 23.4137 30 25.1872 29.3097 26.5419C28.7025 27.7336 27.7336 28.7025 26.5419 29.3097C25.1872 30 23.4137 30 19.8667 30H12.1333C8.58633 30 6.81283 30 5.45806 29.3097C4.26637 28.7025 3.29749 27.7336 2.69029 26.5419C2 25.1872 2 23.4137 2 19.8667V12.1333Z"
                        fill="#001E36"
                      />
                      <path
                        d="M8 22.5162V10.2034C8 10.1197 8.035 10.0718 8.11667 10.0718C9.3223 10.0718 10.5274 10 11.7333 10C13.6902 10 15.809 10.6691 16.5517 12.7162C16.7267 13.2188 16.82 13.7333 16.82 14.2718C16.82 15.3009 16.5867 16.1504 16.12 16.8205C14.8164 18.6923 12.557 18.6632 10.5317 18.6632V22.5043C10.5475 22.618 10.4506 22.6718 10.3567 22.6718H8.14C8.04667 22.6718 8 22.6239 8 22.5162ZM10.5433 12.3812V16.4017C11.3464 16.4605 12.1867 16.4669 12.9583 16.2103C13.8102 15.9645 14.2767 15.2272 14.2767 14.3436C14.3003 13.5907 13.8901 12.8683 13.1917 12.5966C12.4294 12.2796 11.3662 12.2606 10.5433 12.3812Z"
                        fill="#31A8FF"
                      />
                      <path
                        d="M24.0967 15.6074C23.7437 15.4213 23.3677 15.2852 22.979 15.2028C22.4796 15.0853 20.5098 14.6737 20.509 15.7037C20.5265 16.2787 21.4393 16.5604 21.8426 16.7247C23.2585 17.2108 24.8607 18.0797 24.8292 19.8264C24.8725 22.0008 22.7657 22.8701 20.9598 22.8703C20.0197 22.88 19.0403 22.7344 18.1799 22.3308C18.0977 22.2873 18.0449 22.1944 18.0484 22.0996V20.019C18.0391 19.9356 18.1287 19.8627 18.1987 19.9227C19.0417 20.4325 20.0409 20.6801 21.0162 20.6933C21.4467 20.6933 22.2999 20.6516 22.2935 20.019C22.2935 19.412 21.2728 19.1329 20.8659 18.9787C20.2761 18.7682 19.7169 18.4765 19.2036 18.1118C18.4862 17.6001 18.0362 16.7797 18.0484 15.8771C18.0442 13.8297 19.9835 12.9107 21.73 12.9103C22.5464 12.9035 23.4232 12.964 24.1832 13.2956C24.2925 13.3277 24.3151 13.4429 24.3147 13.546V15.4918C24.3216 15.6126 24.1875 15.6537 24.0967 15.6074Z"
                        fill="#31A8FF"
                      />
                    </svg>
                  }
                  name="Photoshop"
                />
                <SoftWere
                  svg={
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>file_type_ai</title>
                      <path
                        d="M3.169,3.517H28.835V28.483H3.169Z"
                        style={{ fill: "#1c0a00" }}
                      />
                      <path
                        d="M3.169,3.517H28.835V28.483H3.169ZM2,29.65H30V2.35H2Z"
                        style={{ fill: "#1c0a00" }}
                      />
                      <path
                        d="M18.34,9.43c0-.093,.035-.14,.14-.14h1.832c.093,0,.14,.035,.14,.14v9.205c0,.093,-.023,.14,-.14,.14H20.505c-.117,0,-.152,-.058,-.152,-.152V12.08h-.012Z"
                        style={{ fill: "#ff7f18" }}
                      />
                      <path
                        d="M18.212,6.782a1.19,1.19,0,0,1,2.38,0,1.115,1.115,0,0,1-1.213,1.19A1.1,1.1,0,0,1,18.212,6.782Z"
                        style={{ fill: "#ff7f18" }}
                      />
                      <path
                        d="M13.962,13.269c-.327,-1.3,-1.1,-4.118,-1.388,-5.483h-.023c-.245,1.365,-.863,3.675,-1.353,5.483Z"
                        style={{ fill: "#ff7f18" }}
                      />
                      <path
                        d="M10.719,15.159l-.922,3.5c-.023,.093,-.058,.117,-.175,.117H8.909c-.117,0,-.14,-.035,-.117,-.175l3.313,-11.6a3.779,3.779,0,0,0,.117,-.968c0,-.082,.035,-.117,.093,-.117h2.45c,.082,0,.117,.023,.14,.117l3.71,12.588c.023,.093,0,.152,-.093,.152H16.585c-.093,0,-.152,-.023,-.175,-.1l-.957,-3.512H11.72Z"
                        style={{ fill: "#ff7f18" }}
                      />
                    </svg>
                  }
                  name="Ilastrator"
                />
                <SoftWere
                  svg={
                    <svg
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                      style={{ enableBackground: "new 0 0 512 512" }}
                      xmlSpace="preserve"
                      width={19}
                      height={19}
                    >
                      <path
                        style={{ fill: "#FFC61B" }}
                        d="M438.558,512H19.786c-8.214,0-14.876-6.66-14.876-14.876V256.916c0-8.216,6.661-14.876,14.876-14.876s14.876,6.66,14.876,14.876v225.332h389.021v-32.833c0-8.216,6.661-14.876,14.876-14.876c8.214,0,14.876,6.66,14.876,14.876v47.709C453.434,505.34,446.773,512,438.558,512z"
                      />
                      <g>
                        <polygon
                          style={{ fill: "#FEE187" }}
                          points="19.786,177.122 19.786,172.332 175.581,14.876 175.581,177.122"
                        />
                        <rect
                          x="196.155"
                          y="219.435"
                          style={{ fill: "#FEE187" }}
                          width="296.061"
                          height="163.65"
                        />
                      </g>
                      <g>
                        <path
                          style={{ fill: "#FFC61B" }}
                          d="M492.216,204.559h-38.782V14.876C453.434,6.66,446.773,0,438.558,0H175.581c-0.18,0-0.359,0.021-0.538,0.027c-0.171,0.006-0.341,0.013-0.51,0.025c-0.641,0.046-1.278,0.118-1.903,0.244c-0.015,0.003-0.03,0.007-0.045,0.012c-0.617,0.126-1.22,0.305-1.813,0.507c-0.155,0.054-0.308,0.109-0.46,0.167c-0.589,0.223-1.166,0.472-1.723,0.768c-0.016,0.009-0.033,0.015-0.048,0.022c-0.57,0.306-1.113,0.663-1.641,1.043c-0.134,0.095-0.263,0.193-0.394,0.295c-0.522,0.403-1.029,0.829-1.499,1.303L9.21,161.868c-0.35,0.353-0.678,0.721-0.988,1.104c-0.207,0.254-0.388,0.521-0.576,0.784c-0.092,0.131-0.195,0.256-0.283,0.388c-0.213,0.323-0.403,0.656-0.588,0.991c-0.048,0.085-0.103,0.167-0.147,0.253c-0.181,0.344-0.339,0.695-0.491,1.047c-0.039,0.089-0.085,0.174-0.12,0.263c-0.138,0.338-0.253,0.68-0.364,1.025c-0.037,0.116-0.083,0.229-0.119,0.345c-0.094,0.315-0.165,0.634-0.238,0.954c-0.036,0.155-0.079,0.305-0.11,0.461c-0.057,0.292-0.091,0.586-0.131,0.881c-0.025,0.186-0.06,0.37-0.077,0.558c-0.027,0.286-0.031,0.573-0.043,0.86c-0.007,0.183-0.027,0.364-0.027,0.547v4.792c0,8.216,6.661,14.876,14.876,14.876H175.58c8.214,0,14.876-6.66,14.876-14.876V29.752h233.226v174.807H196.156c-8.214,0-14.876,6.66-14.876,14.876v163.644c0,8.216,6.661,14.876,14.876,14.876h296.059c8.215,0,14.876-6.66,14.876-14.876V219.435C507.092,211.219,500.43,204.559,492.216,204.559z M160.705,162.246H50.692l56.297-56.896l53.718-54.29v111.186H160.705z M477.34,368.203H211.032V234.311H477.34V368.203z"
                        />
                        <path
                          style={{ fill: "#FFC61B" }}
                          d="M248.835,259.784c0-3.124,2.874-5.873,7.248-5.873h25.866c16.494,0,29.489,7.747,29.489,28.74v0.625c0,20.993-13.494,28.99-30.738,28.99h-12.371v26.991c0,3.999-4.873,5.998-9.747,5.998c-4.873,0-9.747-1.999-9.747-5.998V259.784z M268.328,270.906v26.366h12.371c6.996,0,11.246-3.999,11.246-12.496v-1.375c0-8.497-4.249-12.496-11.246-12.496L268.328,270.906L268.328,270.906z"
                        />
                        <path
                          style={{ fill: "#FFC61B" }}
                          d="M319.935,259.784c0-3.124,2.874-5.873,7.248-5.873h25.866c16.494,0,29.489,7.747,29.489,28.74v0.625c0,20.993-13.494,28.99-30.738,28.99h-12.371v26.991c0,3.999-4.873,5.998-9.747,5.998s-9.747-1.999-9.747-5.998L319.935,259.784L319.935,259.784z M339.428,270.906v26.366h12.371c6.996,0,11.246-3.999,11.246-12.496v-1.375c0-8.497-4.249-12.496-11.246-12.496L339.428,270.906L339.428,270.906z"
                        />
                        <path
                          style={{ fill: "#FFC61B" }}
                          d="M445.139,253.911c4.122,0,5.873,4.498,5.873,8.622c0,4.748-2.126,8.872-5.873,8.872h-17.244v67.852c0,3.999-4.873,5.998-9.748,5.998c-4.872,0-9.747-1.999-9.747-5.998v-67.852h-17.244c-3.749,0-5.873-4.124-5.873-8.872c0-4.124,1.751-8.622,5.873-8.622H445.139z"
                        />
                      </g>
                    </svg>
                  }
                  name="Adobe photoshop"
                />
                <div className="flex  items-center  rounded-2xl w-[87px] h-[31px] gap-[10px]">
                  <button className="rounded-2xl border text-[12px] px-[10px] w-full h-full hover:bg-gray-300 transition-all ease-in-out duration-500 font-[400] font-['work_sans']">
                    + Add Tool
                  </button>
                </div>
              </div>
            </div>
            {/* //==================================================== project files  */}
            <div className="ProjectFiles overflow-hidden rounded-[8px] border w-full mt-[18px] h-[230px] px-[22px] py-[11px]">
              <div className="flex justify-between">
                <h1 className="text-[#230B34] font-[500] text-[20px] tracking-[.4px]  mt-[10px]font-['work_sans'] ">
                  Project Files
                </h1>
                <button className="w-[106px] h-[26px] flex justify-center items-center text-[12px] font-['work_sans'] bg-gray-100 px-[6px] py-[2px] border rounded-md font-[400]  hover:bg-gray-300 transition-all duration-500 ease-in-out">
                  Manage Files
                </button>
              </div>
              <div className="grid gap-[15px] h-full overflow-y-auto grid-cols-4 mt-5 pb-10">
                {singleClient?.projectFile?.length > 0 ? (
                  singleClient?.projectFile?.map((item, index) => {
                    return (
                      <ProjectFile
                        key={index}
                        svg={
                          (item.split(".").pop() === "psd" && (
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.167,3.517H28.833V28.483H3.167Z"
                                style={{ fill: "#0c0824" }}
                              />
                              <path
                                d="M3.167,3.517H28.833V28.483H3.167ZM2,29.65H30V2.35H2Zm18.877-16.1c-.922,0-1.237.467-1.237.852,0,.42.21.712,1.447,1.353,1.832.887,2.4,1.738,2.4,2.987,0,1.867-1.423,2.87-3.348,2.87a5.076,5.076,0,0,1-2.392-.5c-.082-.035-.093-.093-.093-.187V19.208c0-.117.058-.152.14-.093a4.33,4.33,0,0,0,2.345.688c.922,0,1.307-.385,1.307-.91,0-.42-.268-.793-1.447-1.4-1.657-.793-2.345-1.6-2.345-2.94,0-1.505,1.178-2.753,3.22-2.753a5.365,5.365,0,0,1,2.088.327.258.258,0,0,1,.117.233v1.6c0,.093-.058.152-.175.117a3.941,3.941,0,0,0-2.03-.525ZM10.843,14.938c.268.023.478.023.945.023,1.365,0,2.648-.478,2.648-2.333,0-1.482-.922-2.228-2.473-2.228-.467,0-.91.023-1.12.035Zm-2.077-6.2c0-.082.163-.14.257-.14.747-.035,1.855-.058,3.01-.058,3.232,0,4.492,1.773,4.492,4.037,0,2.963-2.147,4.235-4.783,4.235-.443,0-.595-.023-.91-.023v4.48c0,.093-.035.14-.14.14H8.907c-.093,0-.14-.035-.14-.14V8.743Z"
                                style={{ fill: "#31c5f0" }}
                              />
                            </svg>
                          )) ||
                          (item.split(".").pop() === "ai" && (
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>file_type_ai</title>
                              <path
                                d="M3.169,3.517H28.835V28.483H3.169Z"
                                style={{ fill: "#1c0a00" }}
                              />
                              <path
                                d="M3.169,3.517H28.835V28.483H3.169ZM2,29.65H30V2.35H2Zm18.34-17.57c0-.093.035-.14.14-.14h1.832c.093,0,.14.035.14.14v9.205c0,.093-.023.14-.14.14H20.505c-.117,0-.152-.058-.152-.152V12.08h-.012Zm-.128-2.648a1.19,1.19,0,0,1,2.38,0,1.115,1.115,0,0,1-1.213,1.19A1.1,1.1,0,0,1,20.214,9.432Zm-5.25,6.487c-.327-1.3-1.1-4.118-1.388-5.483h-.023c-.245,1.365-.863,3.675-1.353,5.483Zm-3.243,1.89-.922,3.5c-.023.093-.058.117-.175.117H8.909c-.117,0-.14-.035-.117-.175l3.313-11.6a3.779,3.779,0,0,0,.117-.968c0-.082.035-.117.093-.117h2.45c.082,0,.117.023.14.117l3.71,12.588c.023.093,0,.152-.093.152H16.585c-.093,0-.152-.023-.175-.1l-.957-3.512H11.72Z"
                                style={{ fill: "#ff7f18" }}
                              />
                            </svg>
                          )) ||
                          (item.split(".").pop() === "jpg" && (
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_1358_2896"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                              >
                                <path
                                  d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z"
                                  fill="#273B4A"
                                />
                              </mask>
                              <g mask="url(#mask0_1358_2896)">
                                <path
                                  d="M5.40989 12.5901L5.25713 12.7429C4.27646 13.7235 3.78613 14.2139 3.49264 14.8158C3.39066 15.025 3.30712 15.2427 3.24299 15.4664C3.05843 16.1102 3.09488 16.8027 3.16777 18.1877L3.5 24.5H21V19.7573C21 18.3059 21 17.5802 20.7614 16.9207C20.6962 16.7404 20.6181 16.565 20.5277 16.3959C20.1971 15.7774 19.6577 15.2919 18.5789 14.321L18.3643 14.1279C17.4682 13.3214 17.0202 12.9182 16.5078 12.8039C16.1864 12.7322 15.8523 12.741 15.5352 12.8295C15.0295 12.9705 14.6033 13.3967 13.7508 14.2492C13.1184 14.8816 12.8023 15.1977 12.4625 15.2406C12.2519 15.2672 12.0383 15.226 11.8526 15.1231C11.5531 14.9572 11.3742 14.5399 11.0166 13.7053C10.2559 11.9304 9.87554 11.0429 9.22167 10.7151C8.89249 10.5501 8.52413 10.4792 8.1572 10.5101C7.42836 10.5716 6.75554 11.2445 5.40989 12.5901L5.40989 12.5901Z"
                                  fill="#2A4157"
                                  fillOpacity="0.24"
                                  stroke="#222222"
                                />
                              </g>
                              <path
                                d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z"
                                stroke="#222222"
                                strokeWidth="1.2"
                              />
                              <circle
                                cx="16.5"
                                cy="7.5"
                                r="1.5"
                                fill="#222222"
                              />
                            </svg>
                          ))
                        }
                        name={
                          (item.split(".").pop() === "psd" && "Photoshop") ||
                          (item.split(".").pop() === "ai" && "Illustrator") ||
                          (item.split(".").pop() === "fig " && "Figma") ||
                          (item.split(".").pop() === "jpg" && "JPEG Image") ||
                          (item.split(".").pop() === "png" && "PNG Image") ||
                          (item.split(".").pop() === "doc" && "Word") ||
                          (item.split(".").pop() === "xls" && "Excel") ||
                          (item.split(".").pop() === "pdf" && "PDF Document") ||
                          (item.split(".").pop() === "txt" && "Text") ||
                          (item.split(".").pop() === "mp4" && "MP4 Video") ||
                          (item.split(".").pop() === "mp3" && "MP3 Audio") ||
                          (item.split(".").pop() === "zip" && "ZIP Archive") ||
                          (item.split(".").pop() === "html" && "HTML") ||
                          (item.split(".").pop() === "css" && "CSS") ||
                          (item.split(".").pop() === "js" && "JavaScript") ||
                          (item.split(".").pop() === "xlsx" &&
                            "Excel Spreadsheet") ||
                          (item.split(".").pop() === "pptx" && "PowerPoint") ||
                          "Unknown"
                        }
                        title="Figma Link"
                        file={item}
                      />
                    );
                  })
                ) : (
                  <span>No Project files</span>
                )}

                <div className="flex  items-center  rounded-2xl w-[150px] h-[57px] overflow-hidden gap-[10px]">
                  <label
                    htmlFor="ProjectFillUpload"
                    className="rounded-2xl cursor-pointer border  text-[14px]  w-full h-full hover:bg-gray-300 transition-all ease-in-out duration-500 font-[400] font-['work_sans']  flex justify-center items-center gap-2 border-dotted"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_700_5392)">
                        <path
                          d="M14.6666 8.6665C14.4898 8.6665 14.3202 8.73674 14.1952 8.86177C14.0702 8.98679 14 9.15636 14 9.33317V12.1418C13.9994 12.6344 13.8035 13.1067 13.4552 13.4551C13.1069 13.8034 12.6346 13.9993 12.142 13.9998H3.85796C3.36535 13.9993 2.89307 13.8034 2.54474 13.4551C2.19641 13.1067 2.00049 12.6344 1.99996 12.1418V9.33317C1.99996 9.15636 1.92972 8.98679 1.8047 8.86177C1.67967 8.73674 1.5101 8.6665 1.33329 8.6665C1.15648 8.6665 0.986912 8.73674 0.861888 8.86177C0.736864 8.98679 0.666626 9.15636 0.666626 9.33317V12.1418C0.667508 12.988 1.00402 13.7992 1.60232 14.3975C2.20062 14.9958 3.01184 15.3323 3.85796 15.3332H12.142C12.9881 15.3323 13.7993 14.9958 14.3976 14.3975C14.9959 13.7992 15.3324 12.988 15.3333 12.1418V9.33317C15.3333 9.15636 15.2631 8.98679 15.138 8.86177C15.013 8.73674 14.8434 8.6665 14.6666 8.6665Z"
                          fill="#878790"
                        />
                        <path
                          d="M4.47136 5.80485L7.33336 2.94285V11.3335C7.33336 11.5103 7.4036 11.6799 7.52862 11.8049C7.65365 11.9299 7.82322 12.0002 8.00003 12.0002C8.17684 12.0002 8.34641 11.9299 8.47143 11.8049C8.59646 11.6799 8.66669 11.5103 8.66669 11.3335V2.94285L11.5287 5.80485C11.6544 5.92629 11.8228 5.99348 11.9976 5.99197C12.1724 5.99045 12.3396 5.92033 12.4632 5.79673C12.5868 5.67312 12.657 5.50592 12.6585 5.33112C12.66 5.15632 12.5928 4.98792 12.4714 4.86218L8.47136 0.862183C8.34634 0.737202 8.1768 0.666992 8.00003 0.666992C7.82325 0.666992 7.65371 0.737202 7.52869 0.862183L3.52869 4.86218C3.40726 4.98792 3.34006 5.15632 3.34158 5.33112C3.3431 5.50592 3.41321 5.67312 3.53682 5.79673C3.66042 5.92033 3.82763 5.99045 4.00243 5.99197C4.17722 5.99348 4.34563 5.92629 4.47136 5.80485Z"
                          fill="#878790"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_700_5392">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Upload File
                  </label>
                  <input
                    id="ProjectFillUpload"
                    className="hidden"
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* //====================================================== right section  */}
          <div className="right border w-[315px] overflow-hidden rounded-[8px] mt-1 flex justify-center">
            <div className=" w-full h-full flex flex-col items-center">
              <div className="payment mt-3 flex justify-center items-center gap-2">
                <div className="w-[135px] h-[78px] flex flex-col   rounded-md justify-center items-center border pt-[10px]">
                  <h5 className="font-[400] font-['work_sans'] text-[12px]">
                    Payment Received
                  </h5>
                  <h4 className="text-[18px] font-bold font-['work_sans']">
                    45900$
                  </h4>
                </div>
                <div className="w-[135px] flex flex-col pt-[20px] rounded-md gap-[15px]justify-center h-[78px] items-center border">
                  <h5 className="text-[#878790] font-[400] font-['work_sans'] text-[12px]">
                    Payment Due
                  </h5>
                  <h4 className="font-bold font-['work_sans'] text-[18px]">
                    45900$
                  </h4>
                </div>
              </div>
              <div className="comissions border w-[277px] mt-3 h-[55px] rounded-md ">
                <p className="text-[14px] ml-3 mt-1 tracking-[.6px] text-[#878790]">
                  Generative Commissions
                </p>
                <div className="flex items-center gap-[5px]">
                  <input
                    type="range"
                    max={100}
                    value={
                      ((
                        singleClient?.amount -
                        (singleClient?.amount * 15) / 100
                      ).toFixed(0) *
                        100) /
                      singleClient?.amount
                    }
                    readOnly={true}
                    className="w-[75%] ml-3"
                  />
                  <span className="text-[14px] text-[#878769] font-[500]">
                    $
                    {(
                      singleClient?.amount -
                      (singleClient?.amount * 15) / 100
                    ).toFixed(0)}
                  </span>
                </div>
              </div>
              <div className="label w-full mt-4 px-[21px] text-[14px] font-[500] font-['work_sans'] text-[#230B34]">
                <label
                  className="text-[14px] font-[500] font-['work_sans']"
                  htmlFor=""
                >
                  Label
                </label>
                <div className="mt-2 flex h-[56px] overflow-y-auto justify-start flex-wrap gap-[10px]">
                  <button className="bg-gray-200 text-[9px] px-[10px] py-[5px] rounded-sm flex items-center justify-center">
                    Branding & Logo
                  </button>
                  <button className="bg-gray-200 text-[9px] px-[10px] py-[5px] rounded-sm flex items-center justify-center">
                    UI Design
                  </button>
                  <button className="bg-gray-200 text-[9px] px-[10px] py-[5px] rounded-sm flex items-center justify-center">
                    Ux Design
                  </button>
                  <button className="bg-gray-200 text-[9px] px-[5px] py-[5px] rounded-sm">
                    Prototype
                  </button>
                  <button className="bg-gray-200 text-[9px] px-[5px] py-[5px] rounded-sm">
                    Front-end
                  </button>
                </div>
              </div>
              <div className="invoice overflow-hidden w-full h-[335px] mt-4 px-[21px] text-[14px] font-[500] font-['work_sans'] text-[#230B34]">
                <label
                  className="text-[14px] font-[500] font-['work_sans']"
                  htmlFor=""
                >
                  Invoices
                </label>
                <div className="mt-2 flex flex-col justify-start  h-full overflow-y-auto gap-[10px]">
                  <Invoices />
                  <Invoices />
                  <Invoices />
                  <Invoices />
                  <Invoices />
                  <Invoices />
                </div>
              </div>
              <div className="comments overflow-hidden w-full mt-[56px] px-[21px] text-[14px] font-[500] font-['work_sans'] text-[#230B34]">
                <label
                  className="text-[14px] font-[500] font-['work_sans']"
                  htmlFor=""
                >
                  Comments about project
                </label>
                <div className="mt-2 flex flex-col justify-start border h-[270px] overflow-y-auto rounded-md flex-wrap gap-[10px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
