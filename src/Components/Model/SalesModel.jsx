import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpin";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellerState } from "../../Features/Seller/SellerSlice";
import FormInput from "../FormInput/FormInput";
import {
  SellerRegistration,
  updateSeller,
} from "../../Features/Seller/SellerApi";
import { Toastify } from "../../Utils/Tostify";
import { setMessageEmpty } from "../../Features/Client/ClientSlice";

const SalesModel = ({ setModel, sellerId, singleData, title }) => {
  const { loader, message, error, loginInSeller } =
    useSelector(getAllSellerState);
  const [input, setInput] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
    avatar: "",
    employment: "",
    website: "",
  });
  //================================state
  const [avatar, setAvatar] = useState(null);
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();

  //========================handle Avatar

  const handleSellerAvatar = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
    setPhoto(e.target.files[0]);
  };
  //===========================handle inputChange
  const handleInputChange = (e) => {
    console.log(e);
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //============================ form submit

  const handleSubmit = (e) => {
    e.preventDefault();
    if (singleData?._id) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("password", input.password);
      if (input.role) {
        formData.append("role", input.role);
      }
      formData.append("website", input.website);
      formData.append("employment", input.employment);
      if (photo) {
        formData.append("sellerAvatar", photo);
      }

      dispatch(updateSeller({ id: singleData?._id, formData })).then(() => {
        setModel(false);
        setInput({
          name: "",
          role: "",
          email: "",
          password: "",
          avatar: "",
          employment: "",
          website: "",
        });
      });
    } else {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("password", input.password);
      if (input.role) {
        formData.append("role", input.role);
      }
      formData.append("website", input.website);
      formData.append("employment", input.employment);
      formData.append("sellerAvatar", photo);
      formData.append("sellerId", sellerId);
      if (photo) {
        dispatch(SellerRegistration(formData)).then(() => {
          setModel(false);
          setInput({
            name: "",
            role: "",
            email: "",
            password: "",
            avatar: "",
            employment: "",
            website: "",
          });
        });
      }
    }
  };
  useEffect(() => {
    if (error) {
      Toastify(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      Toastify(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch]);
  useEffect(() => {
    setInput({ ...singleData });
    setAvatar(singleData?.avatar);
  }, [singleData]);
  return (
    <>
      <div className="w-screen min-h-[1240px] h-screen pt-[80px] pl-[66px] bg-gray-900 bg-opacity-90 absolute bottom-0  top-0 left-0  z-[99999] flex justify-center">
        <button
          onClick={() => setModel(false)}
          className="absolute right-16 top-10 z-[99999]"
        >
          <svg
            width="23px"
            height="23px"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <path
              style={{ fill: "#ffffff", stroke: "none", strokeWidth: 4 }}
              d="M 20,4 3,21 33,50 3,80 20,97 49,67 79,97 95,80 65,50 95,20 80,4 50,34 z"
            />
          </svg>
        </button>
        <div className="main_model z-[999999999] w-[380px] rounded-[10px] h-[80vh]  flex justify-start items-center flex-col bg-white border-2 pt-0 p-[42px] pb-0 scrollbar-custom relative">
          {loader && (
            <div className="w-full h-full absolute top-0 left-0 p-0 flex bg-opacity-25 justify-center items-center bg-cyan-600 z-[999999999999999999]">
              <div className="absolute top-[45%]">
                <LoadingSpinner />
              </div>
            </div>
          )}
          <div className="pt-[42px] bg-white w-full">
            <h1 className="text-gray-900 font-['Lato'] tracking-[.8px] text-[26px] font-[800]">
              {title === "Edit" ? "Edit" : "Add New"} Sales person
            </h1>
          </div>
          {/* //=========================form  */}
          <form
            onSubmit={handleSubmit}
            className="form_content grid relative justify-between mt-[43px] overflow-hidden"
          >
            <div className="right  flex flex-col">
              <div className="  flex gap-y-2 flex-col items-center">
                <FormInput
                  placeholder="Name"
                  label={"Name"}
                  name="name"
                  type="text"
                  value={input.name}
                  handleInputChange={handleInputChange}
                />
                <FormInput
                  placeholder="Email"
                  label={"Email"}
                  type="email"
                  name="email"
                  value={input.email}
                  handleInputChange={handleInputChange}
                />
                {title === "Edit" ? (
                  ""
                ) : (
                  <FormInput
                    placeholder="Password"
                    label={"Password"}
                    name="password"
                    value={input.password}
                    type="password"
                    handleInputChange={handleInputChange}
                  />
                )}

                <FormInput
                  placeholder="Website"
                  label={"Website"}
                  name="website"
                  value={input.website}
                  type="text"
                  handleInputChange={handleInputChange}
                />
                {loginInSeller?.role === "admin" && (
                  <>
                    <label
                      className="text-gray-900 text-start w-full my-3 font-[800] text-[12px] font-['Lato']"
                      htmlFor=""
                    >
                      Role
                    </label>
                    <select
                      className="border w-full focus:outline-none  text-gray-500 px-[12px] tracking-[.5px] h-[37px] my-2 font-['work_sans'] rounded-md mt-[-10px]"
                      name="role"
                      value={input.role}
                      onChange={handleInputChange}
                    >
                      <option
                        className="text-gray-500 border-none"
                        value="user"
                      >
                        User
                      </option>
                      <option
                        className="text-gray-500 border-none"
                        value="admin"
                      >
                        Admin
                      </option>
                    </select>
                  </>
                )}

                <label
                  htmlFor="uploadAvatar"
                  className="avatar border  flex justify-center items-center w-[150px] ml-[4px] overflow-hidden mt-[4px] rounded-md h-[140px]"
                >
                  {avatar ? (
                    <img className="w-full h-full object-cover" src={avatar} />
                  ) : (
                    "Select avatar"
                  )}
                </label>

                <input
                  type="file"
                  onChange={handleSellerAvatar}
                  className="hidden"
                  id="uploadAvatar"
                />
              </div>
              <div className="submit_section  flex justify-center flex-col items-center mt-5 bg-white ">
                <div className="agree flex w-full align-middle items-center gap-[20px]">
                  <input type="checkbox" className="w-4 h-4" />
                  <label
                    className="text-gray-900 font-[800] text-[12px] font-['Lato']"
                    htmlFor="i agree with all "
                  >
                    I agree with all
                    <a
                      className="text-purple-500 hover:text-purple-800 transition-all duration-500 pl-[5px]"
                      href=""
                    >
                      terms & condition
                    </a>
                  </label>
                </div>
                <button
                  type="submit"
                  className="text-white mt-[15px] bg-purple-500 w-[100%] h-[36px] rounded-lg font-['Lato'] flex justify-center items-center text-[14px] font-[500] hover:bg-purple-700 my-3 transition-all ease-in-out duration-500"
                >
                  Submit Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SalesModel;
