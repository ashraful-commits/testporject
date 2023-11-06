import React from "react";

const TableComponent = ({ client }) => {
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="w-full h-[1.875rem] bg-[#E7E7E7] grid  grid-flow-col justify-between border-b py-2 px-2 text-center">
            <th className="text-[.8125rem] w-[130px] font-['work_sans'] text-start font-[400]">
              Company Name
            </th>

            <th className="text-[.8125rem] font-['work_sans'] w-[130px]  text-start font-[400]">
              Client Name
            </th>
            <th className="text-[.8125rem] w-[100px] font-['work_sans'] text-start font-[400]">
              Data Signed
            </th>
            <th className="text-[.8125rem] font-['work_sans'] w-[130px]  text-start font-[400]">
              Contact Amount
            </th>
            <th className="text-[.8125rem] font-['work_sans'] w-[100px]  text-start font-[400]">
              Commission
            </th>
            <th className="text-[.8125rem] font-['work_sans'] w-[130px]  text-start font-[400]">
              Project status
            </th>
            <th className="text-[.8125rem] font-['work_sans'] w-[130px]  text-start font-[400]">
              Client source
            </th>
            <th className="text-[.8125rem] w-[50px] font-['work_sans'] text-start font-[400]">
              <svg
                fill="#D0D7DDB9"
                width="1.25rem"
                height="1.25rem"
                viewBox="0 0 32 32"
                enableBackground="new 0 0 32 32"
                id="Glyph"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z"
                  id="XMLID_294_"
                />
                <path
                  d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z"
                  id="XMLID_295_"
                />
                <path
                  d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z"
                  id="XMLID_297_"
                />
              </svg>
            </th>
          </tr>
        </thead>
        <tbody>
          {client?.map((item, index) => {
            return (
              <tr
                key={index}
                className="w-full grid grid-flow-col justify-between items-center border-b py-2 h-[3.4375rem]  text-center"
              >
                <td className=" items-center text-[.8125rem] truncate text-start font-[500] w-[130px]  text-[#267596]">
                  <span className="text-[.8125rem] font-[500] px-[.125rem] text-[#D9D9D9]">
                    {index + 1}.
                  </span>{" "}
                  {item.companyName}
                </td>
                <td className="w-[130px]  items-center flex gap-[.3125rem] relative">
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

                  {item.clientName}
                </td>
                <td className=" items-center text-[.8125rem] truncate text-start font-[400] w-[100px] text-[#3A3A49]">
                  {item?.projects?.length > 0 && item?.projects[0]?.date}
                </td>
                <td className="w-[130px]  items-center flex text-[.8125rem] text-start font-[400] text-[#3A3A49] gap-[.3125rem]">
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
                        width: `${(
                          (100 * item?.projects?.length > 0 &&
                            item?.projects[0]?.amount) / 1000
                        ).toFixed(2)}%`,
                      }}
                    />
                  </div>
                  ${item?.projects?.length > 0 && item?.projects[0]?.amount}
                </td>
                <td className="w-[100px]  items-center text-[.8125rem] truncate text-start font-[600] text-[#3A3A49]">
                  $
                  {item?.projects?.length > 0 &&
                    ((item?.projects[0]?.amount * 100) / 15 / 100).toFixed(2)}
                </td>
                <td
                  className={`text-[.8125rem] w-[130px] flex justify-start items-center font-[400] text-[#3A3A49] `}
                >
                  <button
                    className={`${
                      item?.projects?.length > 0 &&
                      item?.projects[0]?.projectStatus == "pending" &&
                      "text-[#F2994A] border-[#F2994A] border-[.0187rem] bg-[#FFF8F2] rounded-[2.8125rem] text-[.625rem] h-[1.125rem] w-[3.75rem]   "
                    } ${
                      item?.projects?.length > 0 &&
                      item?.projects[0]?.projectStatus == "complete" &&
                      "text-[#FFF] border-[.0187rem] bg-[#878790] rounded-[2.8125rem] text-[.625rem] h-[1.125rem] w-[3.75rem]   "
                    }  ${
                      item?.projects?.length > 0 &&
                      item?.projects[0]?.projectStatus == "on holding" &&
                      "text-[#F95959] border-[#F95959] border-[.0187rem] bg-[#FEE] rounded-[2.8125rem] text-[.625rem] h-[1.125rem] w-[3.75rem]   "
                    }   ${
                      item?.projects?.length > 0 &&
                      item?.projects[0]?.projectStatus == "on going" &&
                      "text-[#3AAE54] border-[#3AAE54] border-[.0187rem] bg-[#E7FBF0] rounded-[2.8125rem] text-[.625rem] h-[1.125rem] w-[3.75rem]   "
                    }`}
                  >
                    {item?.projects?.length > 0 &&
                      item?.projects[0]?.projectStatus}
                  </button>
                </td>
                <td className=" items-center text-[.8125rem] truncate text-start font-[400] w-[130px] text-[#3A3A49]">
                  {item?.projects?.length > 0 &&
                    item?.projects[0]?.projectSource}
                </td>
                <td className=" items-center text-[.8125rem] truncate text-start font-[400] w-[50px] text-[#3A3A49]">
                  <button>
                    {" "}
                    <svg
                      fill="#D0D7DDB9"
                      width="1.25rem"
                      height="1.25rem"
                      viewBox="0 0 32 32"
                      enableBackground="new 0 0 32 32"
                      id="Glyph"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <path
                        d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z"
                        id="XMLID_294_"
                      />
                      <path
                        d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z"
                        id="XMLID_295_"
                      />
                      <path
                        d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z"
                        id="XMLID_297_"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
