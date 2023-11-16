import { motion } from "framer-motion";
const ProjectComponent = ({
  clientAvatar,
  clientName,
  amount,
  date,
  timeFrame,
  companyName,
  projectStatus,
  projectName,
  team,
  email,
  mobile,
}) => {
  return (
    <motion.div
      initial={{ y: -15, opacity: 0.1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1,

        ease: [0.17, 0.67, 0.83, 0.67],
        delay: 0.1,
      }}
      className="rounded-md transition-all ease-in-out duration-500 hover:scale-105 p-[22px]  w-[304px] h-[340px] border"
    >
      <div className="people w-full gap-[18px] flex items-center">
        {/* //============================================avatar  */}
        <div className="avatar w-[51px] h-[51px] rounded-full overflow-hidden">
          {clientAvatar ? (
            <img src={clientAvatar} className="w-full h-full" alt="" />
          ) : (
            <img src={clientAvatar} className="w-full h-full" alt="" />
          )}
        </div>
        {/* //=============================================== datials  */}
        <div className="detials">
          <h5 className="text-[18px]  font-[500] leading-[22px] font-['work_sans'] text-[#230B34]">
            {clientName}
          </h5>
          <h5 className="text-[14px]  font-[500] leading-[22px] font-['work_sans'] text-[#230B34]">
            {companyName}
          </h5>
        </div>
      </div>
      <div className="mt-5 w-full gap-[18px] flex items-center justify-between">
        <div className="flex justify-center items-center flex-col">
          <h4 className="text-[12px] text-[#230B34] font-['work_sans'] font-[600]">
            {date}
          </h4>
          <h6 className="text-[#878790] text-[13px] font-['work_sans']">
            Assigned date
          </h6>
        </div>
        <div className="flex justify-center items-center flex-col">
          <h4 className="text-[12px] text-[#230B34] font-['work_sans'] font-[600]">
            {timeFrame}
          </h4>
          <h6 className="text-[#878790] text-[13px] font-['work_sans']">
            Deadline
          </h6>
        </div>
        <div className="flex justify-center items-center flex-col">
          <h4 className="text-[12px] text-[#230B34] font-['work_sans'] font-[600]">
            {amount}
          </h4>
          <h6 className="text-[#878790] text-[13px] font-['work_sans']">
            Budget
          </h6>
        </div>
      </div>
      <div className="mt-5 flex-col  w-full gap-[18px] flex items-start justify-between">
        <h4 className="text-[16px] capitalize flex gap-2 items-center text-[#230B34] font-['work_sans'] font-[500]">
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.5 1h13l.5.5v13l-.5.5h-13l-.5-.5v-13l.5-.5zM2 14h12V2H2v12zM3 3h2v10H3V3zm6 0H7v6h2V3zm2 0h2v8h-2V3z"
              />
            </svg>
          </span>
          {projectName}{" "}
          <span
            className={`border px-2 text-[10px] rounded-xl ${
              projectStatus == "pending" && "bg-orange-300"
            } ${projectStatus == "on going" && "bg-green-300"} ${
              projectStatus == "on hold" && "bg-red-300"
            } ${projectStatus == "complete" && "bg-gray-600 text-white"}`}
          >
            {projectStatus}
          </span>
        </h4>
        <h4 className="text-[16px] flex items-center gap-2 text-[#230B34] font-['work_sans'] font-[500]">
          <span>
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 52 52"
              enableBackground="new 0 0 52 52"
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M24.9,30.1c0.6,0.6,1.5,0.6,2.1,0l22.6-21C50,8.3,49.9,7,48.3,7L3.6,7.1c-1.2,0-2.2,1.1-1.3,2.1L24.9,30.1z
          "
                />
                <path
                  d="M50,17.3c0-1-1.2-1.6-2-0.9L30.3,32.7c-1.2,1.1-2.7,1.7-4.3,1.7s-3.1-0.6-4.3-1.6L4.1,16.4
          c-0.8-0.7-2-0.2-2,0.9C2,17,2,40,2,40c0,2.2,1.8,4,4,4h40c2.2,0,4-1.8,4-4C50,34,50,21.8,50,17.3z"
                />
              </g>
            </svg>
          </span>
          {email}
        </h4>
        <h4 className="text-[16px] flex items-center gap-2 text-[#230B34] font-['work_sans'] font-[500]">
          <span>
            <svg
              fill="#000000"
              height="20"
              width="20"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              enableBackground="new 0 0 512 512"
              xmlSpace="preserve"
            >
              <path
                d="M426.7,453.8l-38.1-79.1c-8.2-16.9-18.8-29.2-37.1-21.7l-36.1,13.4c-28.9,13.4-43.3,0-57.8-20.2l-65-147.9
      c-8.2-16.9-3.9-32.8,14.4-40.3l50.5-20.2c18.3-7.6,15.4-23.4,7.2-40.3l-43.3-80.6c-8.2-16.9-25-21-43.3-13.5
      c-36.6,15.1-66.9,38.8-86.6,73.9c-24,42.9-12,102.6-7.2,127.7c4.8,25.1,21.6,69.1,43.3,114.2c21.7,45.2,40.7,80.7,57.8,100.8
      c17,20.1,57.8,75.1,108.3,87.4c41.4,10,86.1,1.6,122.7-13.5C434.8,486.7,434.8,470.8,426.7,453.8z"
              />
            </svg>
          </span>
          {mobile}
        </h4>
      </div>

      <div className="flex w-full mt-3">
        <div className="clients flex w-full">
          {team?.length > 0
            ? team?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="clientAvatar w-[40px] h-[40px] rounded-full overflow-hidden mr-[-10px]"
                  >
                    {item?.avatar ? (
                      <img
                        className="w-full h-full rounded-full  border-[2px] border-white"
                        src={item?.avatar}
                        alt=""
                      />
                    ) : (
                      <img
                        className="w-full h-full rounded-full  border-[2px] border-white"
                        src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                        alt=""
                      />
                    )}
                  </div>
                );
              })
            : ""}

          <button className="clientAvatar w-[40px] h-[40px] rounded-full overflow-hidden mr-[-10px] bg-gray-200 flex justify-center items-center text-[12px] hover:bg-gray-300 font-[500] transition-all duration-500 ease-in-out cursor-pointer">
            {team > 0 ? team?.slice(3, team?.length) : 0}
          </button>
        </div>
        <button className="w-[117px] h-[40px] flex justify-center items-center bg-cyan-100 text-cyan-600 hover:text-white rounded-md hover:bg-cyan-700 transition-all">
          Team
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectComponent;
