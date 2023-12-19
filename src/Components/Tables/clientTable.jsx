import React from "react";

const clientTable = ({ loginInSeller }) => {
  return (
    <div>
      <table className="w-full  min-h-[490px] rounded-md ">
        {/* //======================================table header  */}
        <thead>
          <tr className="w-full min-h-[1.875rem] h-full  grid pr-6 grid-flow-col justify-between border-b py-2 text-center">
            <th className="text-sm  font-['work_sans'] w-[30px]  text-start font-[400]"></th>
            <th className="text-sm  font-['work_sans'] -ml-[3rem] w-[150px]  text-start font-[400]">
              Company Name
            </th>
            <th className="text-sm  font-['work_sans'] -ml-[4rem] w-[150px]  text-start font-[400]">
              Client Name
            </th>
            <th className="text-sm  w-[100px] font-['work_sans'] text-start font-[400]">
              Data Signed
            </th>
            <th className="text-sm  font-['work_sans'] w-[120px]  text-start font-[400]">
              Contact Amount
            </th>
            {loginInSeller?.role === "user" && (
              <th className="text-sm  font-['work_sans'] w-[100px]  text-start font-[400]">
                Commission
              </th>
            )}
            {loginInSeller?.role === "super_admin" && (
              <th className="text-sm  font-['work_sans'] w-[100px]  text-start font-[400]">
                Project status
              </th>
            )}
            {loginInSeller?.role === "admin" && (
              <th className="text-sm  font-['work_sans'] w-[120px]  text-start font-[400]">
                commission rate
              </th>
            )}
            {loginInSeller?.role === "super_admin" && (
              <th className="text-sm  font-['work_sans'] w-[120px]  text-start font-[400]">
                commission rate
              </th>
            )}

            {loginInSeller?.role === "super_admin" && (
              <th className="text-sm  font-['work_sans'] w-[80px]  text-start font-[400]">
                Permission
              </th>
            )}
            <th className="text-sm  font-['work_sans'] w-[100px]  text-start font-[400]">
              Client source
            </th>
            <th className="text-sm  w-[50px] font-['work_sans'] flex justify-end items-start  font-[400]"></th>
          </tr>
        </thead>
        {/* //==========================================table body  */}
        <tbody className="relative w-full h-full border"></tbody>
        {/* //=======================================table footer  */}
      </table>
    </div>
  );
};

export default clientTable;
