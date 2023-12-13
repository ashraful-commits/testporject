import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ClientModel from "../Model/ClientModel";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientState } from "../../Features/Client/ClientSlice";
import { deleteClient, getSingleClient } from "../../Features/Client/ClientApi";
import swal from "sweetalert";

const ClientComponent = ({
  clientAvatar,
  clientName,
  company,
  email,
  mobile,
  delay,
  id,
  projects,
}) => {
  //=========================================== TODO: all state
  const [manage, setManage] = useState(false);
  const [dropId, setDropId] = useState(null);
  const [dropDown, setDropDrown] = useState(false);
  const dropdownRef = useRef();
  const dropMenu = useRef();
  const dispatch = useDispatch();
  const { singleClient } = useSelector(getAllClientState);
  //===================================TODO:handle dropdwon

  const dropdownMenu = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setManage(false);
    }
  };

  // ==================================================TODO: useEffect
  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener("click", dropdownMenu);

    // Remove event listener when the component is unmounted
    return () => {
      window.removeEventListener("click", dropdownMenu);
    };
  }, []);
  //====================================================== TODO:get data
  useEffect(() => {
    if (dropId) {
      dispatch(getSingleClient(dropId));
    }
  }, [dispatch, id, dropId]);

  //====================================================== TODO DELETE
  const handleDelete = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteClient(id));
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    }
  };
  return (
    <>
      {/* =========================================dropdown menu  */}
      {dropDown && (
        <ClientModel
          setClient={setDropDrown}
          title="Edit Client"
          singleData={singleClient}
        />
      )}
      {/* ======================================= main container  */}
      <motion.div
        initial={{ y: -15, opacity: 0.1 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.1,

          ease: [0.17, 0.67, 0.83, 0.67],
          delay: 0.1 * Math.random() * 10,
        }}
        ref={dropdownRef}
        className="rounded-md p-[22px] transition-all ease-in-out duration-500 hover:scale-105  w-[304px] h-[340px] border"
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
              {company?.companyName}
            </h5>
          </div>
        </div>
        <div className="people w-full gap-[18px] flex items-center">
          {/* //============================================avatar  */}
          <div className="avatar w-[51px] mt-4 h-[51px] rounded-lg overflow-hidden">
            {company?.companyLogo ? (
              <img
                src={company?.companyLogo}
                className="w-full h-full"
                alt=""
              />
            ) : (
              <img src={clientAvatar} className="w-full h-full" alt="" />
            )}
          </div>
          {/* //=============================================== datials  */}
          <div className="detials">
            <h5 className="text-[14px]  font-[500] leading-[22px] font-['work_sans'] text-[#230B34]">
              Company
            </h5>
            <h5 className="text-[15px]  font-[500] leading-[22px] font-['work_sans'] text-[#230B34]">
              {company?.companyName}
            </h5>
          </div>
        </div>
        <div className="mt-1 w-full gap-[18px] flex items-center justify-between"></div>
        <div className="mt-5 flex-col  w-full gap-[18px] flex items-start justify-between">
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
        <div className="flex items-end justify-between mt-4">
          <div className="flex flex-col w-full mt-3 gap-y-1">
            <span className="items-center justify-center block text-purple-600 rounded-md">
              Active projects
            </span>
            <div className="flex w-full clients">
              {projects?.length > 0
                ? projects?.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        className="transition-all duration-500 ease-in-out hover:scale-105"
                        to={`/seller/${item?._id}`}
                      >
                        <div className="clientAvatar w-[40px] h-[40px] rounded-full overflow-hidden mr-[-15px]">
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
                      </Link>
                    );
                  })
                : ""}

              <button className="clientAvatar w-[40px] h-[40px] rounded-full overflow-hidden mr-[-10px] bg-gray-200 flex justify-center items-center text-[12px] hover:bg-gray-300 font-[500] transition-all duration-500 ease-in-out cursor-pointer">
                {projects > 0 ? projects?.slice(3, projects?.length) : 0}
              </button>
            </div>
          </div>
          <div className="relative z-0 flex flex-col w-full mt-3">
            {manage && dropId === id && (
              <div
                ref={dropMenu}
                className="w-[100px] z-[999] flex flex-col gap-3 py-3 justify-center items-center bg-white h-[130px] absolute bottom-12 rounded-md right-0 border shadow-lg"
              >
                <button
                  onClick={() => setDropDrown(!dropDown)}
                  className="w-full p-1 font-bold capitalize hover:text-gray-500 "
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="w-full p-1 font-bold capitalize hover:text-gray-500 "
                >
                  Delete
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setManage(!manage), setDropId(id);
              }}
              className="w-[117px] h-[40px] flex justify-center items-center bg-purple-100 text-purple-600 hover:text-white rounded-md hover:bg-purple-700 transition-all"
            >
              Manage
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ClientComponent;
