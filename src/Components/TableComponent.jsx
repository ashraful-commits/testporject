import DataTable from "react-data-table-component";

const TableComponent = ({ client }) => {
  const columns = [
    {
      name: "Company Name",
      selector: (row) => (
        <div className="flex items-center justify-start gap-3">
          <span className="text-[13px] flex items-center justify-center text-[#230B34] font-[600] font-['Work_Sans']">
            <img
              className="w-[30px] h-[30px] rounded-full  z-10 "
              src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
              alt=""
            />
            {row?.companyName}
          </span>
        </div>
      ),
    },
    {
      name: "Client Name",
      selector: (row) => (
        <div className="flex items-center gap-3">
          <div className="company relative overflow-hidden z-0">
            <div className="avatar">
              {row?.avatar ? (
                <img
                  className="w-[14px] h-[14px] border-[2px] border-white absolute top-4 left-5 rounded-full overflow-hidden z-40"
                  src={row?.clientAvatar}
                  alt=""
                />
              ) : (
                <img
                  className="w-[14px] h-[14px] border-[2px] border-white absolute top-4 left-5 rounded-full overflow-hidden z-40"
                  src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                  alt=""
                />
              )}
              {row?.clientName}
            </div>
          </div>{" "}
          <span className="text-[13px] block text-[#230B34] font-[600] font-['Work_Sans']">
            {row?.client_name}
          </span>
        </div>
      ),
    },
    {
      name: "Data Signed",
      selector: (row) => row?.projects?.length > 0 && row?.projects[0]?.date,
      sortable: true,
    },
    {
      name: "Contract Amount",
      selector: (row) => (
        <div className="flex items-center justify-center gap-[.3125rem]">
          <div className="w-[5.9375rem] h-[.375rem] bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="66"
              height="6"
              viewBox="0 0 66 6"
              fill="none"
            >
              <mask
                id="mask0_668_415"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="66"
                height="6"
              >
                <rect width="66" height="6" fill="#256682" />
              </mask>
              <g mask="url(#mask0_668_415)">
                <rect
                  x="3.91757"
                  y="-7.06445"
                  width="3"
                  height="19"
                  transform="rotate(15 3.91757 -7.06445)"
                  fill="#367B98"
                />
                <rect
                  x="8.91757"
                  y="-7.06445"
                  width="3"
                  height="19"
                  transform="rotate(15 8.91757 -7.06445)"
                  fill="#367B98"
                />
                <rect
                  x="13.9176"
                  y="-7.06445"
                  width="3"
                  height="19"
                  transform="rotate(15 13.9176 -7.06445)"
                  fill="#367B98"
                />
                <rect
                  x="18.9176"
                  y="-7.06445"
                  width="3"
                  height="19"
                  transform="rotate(15 18.9176 -7.06445)"
                  fill="#367B98"
                />
                <rect
                  x="23.9176"
                  y="-7.06445"
                  width="3"
                  height="19"
                  transform="rotate(15 23.9176 -7.06445)"
                  fill="#367B98"
                />
                <rect
                  x="28.9176"
                  y="-7.06445"
                  width="3"
                  height="19"
                  transform="rotate(15 28.9176 -7.06445)"
                  fill="#367B98"
                />
                <rect
                  x="33.9176"
                  y="-7.06445"
                  width="3"
                  height="19"
                  transform="rotate(15 33.9176 -7.06445)"
                  fill="#367B98"
                />
                <rect
                  x="38.9176"
                  y="-7.06445"
                  width="3"
                  height="19"
                  transform="rotate(15 38.9176 -7.06445)"
                  fill="#367B98"
                />
                <rect
                  x="43.9176"
                  y="-7.06445"
                  width="3"
                  height="19"
                  transform="rotate(15 43.9176 -7.06445)"
                  fill="#367B98"
                />
                <rect
                  x="48.9176"
                  y="-7.06445"
                  width="3"
                  height="19"
                  transform="rotate(15 48.9176 -7.06445)"
                  fill="#367B98"
                />
                <rect
                  x="53.9176"
                  y="-7.06445"
                  width="3"
                  height="19"
                  transform="rotate(15 53.9176 -7.06445)"
                  fill="#367B98"
                />
                <rect
                  x="58.9176"
                  y="-7.06445"
                  width="3"
                  height="19"
                  transform="rotate(15 58.9176 -7.06445)"
                  fill="#367B98"
                />
                <rect
                  x="63.9175"
                  y="-7.06445"
                  width="3"
                  height="19"
                  transform="rotate(15 63.9175 -7.06445)"
                  fill="#367B98"
                />
                <rect
                  x="68.9175"
                  y="-7.06445"
                  width="3"
                  height="19"
                  transform="rotate(15 68.9175 -7.06445)"
                  fill="#367B98"
                />
              </g>
            </svg>
          </div>
          <p>${row?.projects?.length > 0 && row?.projects[0]?.amount}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Commission",
      selector: (row) => (
        <span className="text-[.8125rem] font-[600] text-gray-900">
          $
          {(row?.projects?.length > 0 && row?.projects[0]?.amount * 100) /
            15 /
            100}
        </span>
      ),
    },
    {
      name: "Project Status",
      selector: (row) => (
        <button
          className={`${
            row?.projects?.length > 0 &&
            row?.projects[0]?.projectStatus === "pending" &&
            "border-[.0187rem] border-[#F2994A] bg-[#FFF8F2] text-[#F2994A] rounded-xl"
          } ${
            row?.projects?.length > 0 &&
            row?.projects[0]?.projectStatus === "on going" &&
            "border-[.0187rem] border-[#3AAE54] bg-[#E7FBF0] text-[#3AAE54] rounded-xl"
          } ${
            row?.projects?.length > 0 &&
            row?.projects[0]?.projectStatus === "on hold" &&
            "border-[.0187rem] border-[#ae3333] bg-[#FEE] text-[#F95959] rounded-xl"
          } ${
            row?.projects?.length > 0 &&
            row?.projects[0]?.projectStatus === "complete" &&
            "border-[.0187rem] border-[#3AAE54] bg-[#3AAE54] text-white rounded-xl"
          } w-[3.75rem] h-[1.125rem] text-[.625rem] font-[400] flex justify-center items-center`}
        >
          {row?.projects?.length > 0 && row?.projects[0]?.projectStatus
            ? row?.projects[0]?.projectStatus
            : "pending"}
        </button>
      ),
    },
    {
      name: "Client Source",
      selector: (row) => (
        <span>
          {row?.projects?.length > 0 && row?.projects[0]?.projectSource}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full h-full">
      <DataTable
        sortIcon={
          <>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="3.5"
              viewBox="0 0 6 4"
              fill="none"
            >
              <path
                d="M1.08711 4L4.91289 4C5.34007 4 5.57052 3.49894 5.29252 3.1746L3.37963 0.942899C3.18008 0.710094 2.81992 0.710094 2.62037 0.942899L0.707482 3.1746C0.429479 3.49894 0.659934 4 1.08711 4Z"
                fill="#256682"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="3.5"
              viewBox="0 0 6 4"
              fill="none"
            >
              <path
                opacity="0.5"
                d="M4.91289 0H1.08711C0.659934 0 0.429479 0.501059 0.707482 0.825396L2.62037 3.0571C2.81992 3.28991 3.18008 3.28991 3.37963 3.0571L5.29252 0.825396C5.57052 0.501059 5.34007 0 4.91289 0Z"
                fill="#256682"
              />
            </svg>
          </>
        }
        columns={columns}
        data={client}
        pagination
        paginationPerPage={9}
      />
    </div>
  );
};

export default TableComponent;
