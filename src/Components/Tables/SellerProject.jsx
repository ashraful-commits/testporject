import React, { useState } from "react";

const SellerProject = ({ projects }) => {
  console.log(projects);
  //======================================all state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [MaxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [MinPageNumberLimit, setMinPageNumberLimit] = useState(0);
  //========================pages
  const pages = [];
  for (let i = 1; i <= Math.ceil(projects?.length / itemsPerPage); i++) {
    console.log(i);
    pages.push(i);
  }
  //===================================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projects?.slice(indexOfFirstItem, indexOfLastItem);
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
    <div className="w-full ">
      <table className="  w-full min-h-[450px] h-[500px] border">
        <thead>
          <tr className="flex justify-between w-full py-2 bg-gray-100 border-b ">
            <th className=" flex justify-start items-center  w-[50px]"></th>
            <th className=" flex justify-start items-center  w-[120px]">
              ClientName
            </th>
            <th className=" flex justify-start items-center  w-[120px]">
              ClientAvatar
            </th>
            <th className=" flex justify-start items-center  w-[120px]">
              Company
            </th>
            <th className=" flex justify-start items-center  w-[120px]">
              Assigned data
            </th>
            <th className=" flex justify-start items-center  w-[120px]">
              Deadline
            </th>
            <th className=" flex justify-start items-center  w-[120px]">
              Budget
            </th>
            <th className=" flex justify-start items-center  w-[150px]"></th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((item, index) => {
            return (
              <tr key={index} className="flex justify-between py-2 border-b">
                <td className="  flex justify-start w-[50px] px-2">
                  {index + 1}
                </td>
                <td className="  flex justify-start w-[120px]">
                  {item?.clientId?.clientName}
                </td>
                <td className="  flex justify-start w-[120px]">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={item?.clientId?.clientAvatar}
                    alt=""
                  />
                </td>
                <td className="  flex justify-start w-[120px]">
                  {item?.company?.companyName}
                </td>
                <td className="  flex justify-start w-[120px]">{item?.date}</td>
                <td className="  flex justify-start w-[120px]">
                  {item?.timeFrame}
                </td>
                <td className="  flex justify-start w-[120px]">
                  {item?.amount}
                </td>

                <td className="  flex justify-start gap-x-3 w-[150px] px-2">
                  <button className="px-2 transition-all duration-500 ease-in-out border rounded-md hover:bg-gray-200">
                    Edit
                  </button>
                  <button className="px-2 transition-all duration-500 ease-in-out border rounded-md hover:bg-gray-200">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <ul className="flex items-center justify-center gap-4 py-2 mt-5 ">
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
                  disabled={
                    currentPage == pages[pages.length - 1] ? true : false
                  }
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
        </tfoot>
      </table>
    </div>
  );
};

export default SellerProject;
