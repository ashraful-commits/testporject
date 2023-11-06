import React from "react";

const TableComponent = ({ client }) => {
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="w-full flex justify-between border-b py-2 text-center">
            <th className="text-[13px] font-['work_sans'] font-[400]">
              Company Name
            </th>

            <th className="text-[13px] font-['work_sans'] font-[400]">
              Client Name
            </th>
            <th className="text-[13px] font-['work_sans'] font-[400]">
              Data Signed
            </th>
            <th className="text-[13px] font-['work_sans'] font-[400]">
              Contact Amount
            </th>
            <th className="text-[13px] font-['work_sans'] font-[400]">
              Commission
            </th>
            <th className="text-[13px] font-['work_sans'] font-[400]">
              Project status
            </th>
            <th className="text-[13px] font-['work_sans'] font-[400]">
              Client source
            </th>
          </tr>
        </thead>
        <tbody>
          {client?.map((item, index) => {
            return (
              <tr
                key={index}
                className="w-full flex justify-between border-b py-2 text-center"
              >
                <td className="text-[13px] font-[500] text-[#267596]">
                  {item.companyName}
                </td>
                <td className="flex gap-[5px]">
                  {item.clientName}
                  <img className="w-[30px]" src={item.clientAvatar} />
                </td>
                <td className="text-[13px] font-[400] text-[#3A3A49]">
                  {item.projects.length > 0 && item?.projects[0]?.date}
                </td>
                <td className="text-[13px] font-[400] text-[#3A3A49]">
                  {item.projects.length > 0 && item?.projects[0]?.amount}
                </td>
                <td className="text-[13px] font-[600] text-[#3A3A49]">
                  {item.projects.length > 0 &&
                    (item?.projects[0]?.amount * 100) / 15 / 100}
                </td>
                <td className="text-[13px] font-[400] text-[#3A3A49]">
                  {item.projects.length > 0 && item?.projects[0]?.projectStatus}
                </td>
                <td className="text-[13px] font-[400] text-[#3A3A49]">
                  {item.projects.length > 0 && item?.projects[0]?.projectSource}
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
