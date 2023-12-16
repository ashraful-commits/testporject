import React, { useState } from "react";

const SellerSales = ({ salesPerson }) => {
  //======================================all state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [MaxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [MinPageNumberLimit, setMinPageNumberLimit] = useState(0);
  //========================pages
  const pages = [];
  for (let i = 1; i <= Math.ceil(salesPerson?.length / itemsPerPage); i++) {
    console.log(i);
    pages.push(i);
  }
  //===================================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = salesPerson?.slice(indexOfFirstItem, indexOfLastItem);
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
      <table className="w-full min-h-[490px] h-[480px] border">
        <thead className="flex justify-between w-full py-2 bg-gray-200 border-b">
          <th className=" flex justify-start w-[50px]"></th>
          <th className=" flex justify-start w-[120px]">Name</th>
          <th className=" flex justify-start w-[120px]">Avatar</th>
          <th className=" flex justify-start w-[150px]">Email</th>
          <th className=" flex justify-start w-[120px]">Company</th>
          <th className=" flex justify-start w-[120px]">Project</th>
          <th className=" flex justify-start w-[120px]">Client</th>
          <th className=" flex justify-start w-[120px]">Sales Person</th>
          <th className=" flex justify-start w-[120px]"></th>
        </thead>
        <tbody className="w-full h-full">
          {currentItems?.map((item, index) => {
            return (
              <tr
                className="flex justify-between w-full py-2 border-b"
                key={index}
              >
                <td className="px-2 w-[50px]">{index + 1}</td>
                <td className="w-[120px] flex justify-start">{item?.name}</td>
                <td className="w-[120px] flex justify-start">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={item?.avatar}
                    alt=""
                  />
                </td>
                <td className="w-[150px] flex justify-start truncate">
                  {item?.email}
                </td>
                <td className="w-[120px] flex justify-start">
                  {item?.companyName}
                </td>
                <td className="w-[120px] flex justify-start">
                  {item?.projects?.length ? item?.projects?.length : 0}
                </td>
                <td className="w-[120px] flex justify-start">
                  {item?.client?.length ? item?.client?.length : 0}
                </td>
                <td className="w-[120px] flex justify-start">
                  {item?.salesPerson.length ? item?.salesPerson?.length : 0}
                </td>
                <td className="w-[120px] flex justify-start gap-x-2">
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
        <tfoot className="w-full">
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

export default SellerSales;
