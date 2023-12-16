import React, { useState } from "react";

const SellerClient = ({ client }) => {
  //======================================all state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [MaxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [MinPageNumberLimit, setMinPageNumberLimit] = useState(0);
  //========================pages
  const pages = [];
  for (let i = 1; i <= Math.ceil(client?.length / itemsPerPage); i++) {
    console.log(i);
    pages.push(i);
  }
  //===================================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = client?.slice(indexOfFirstItem, indexOfLastItem);
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
    <div className="w-full">
      <table className="w-full border min-h-[490px] h-[490px] ">
        <thead className="w-full bg-gray-200 border-b">
          <tr className="flex justify-between w-full py-2 gap-x-5">
            <th className="w-[50px] flex justify-start items-center"></th>
            <th className="w-[120px] flex justify-start items-center">
              ClientName
            </th>
            <th className="w-[120px] flex justify-start items-center">
              ClientAvatar
            </th>
            <th className="w-[120px] flex justify-start items-center">
              Company
            </th>
            <th className="w-[150px] flex justify-start items-center">Email</th>
            <th className="w-[120px] flex justify-start items-center">Phone</th>
            <th className="w-[120px] flex justify-start items-center"></th>
          </tr>
        </thead>
        <tbody className="w-full">
          {currentItems?.map((item, index) => {
            return (
              <tr
                key={index}
                className="flex justify-between w-full px-3 py-2 border-b gap-x-5"
              >
                <td className="w-[50px]">{index + 1}</td>
                <td className="w-[120px]">{item?.clientName}</td>
                <td className="w-[120px]">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={item?.clientAvatar}
                    alt=""
                  />
                </td>
                <td className="w-[120px]">{item?.company?.companyName}</td>
                <td className="w-[150px] truncate">{item?.clientEmail}</td>
                <td className="w-[120px]">{item?.clientPhone}</td>
                <td className="w-[120px] flex gap-x-2">
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
        <tfoot className="py-2">
          <ul className="flex items-center justify-center gap-4 py-1 mt-5">
            {currentItems.length > 0 && (
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
            {currentItems.length > 0 && (
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

export default SellerClient;
