import { Link, useNavigate } from "react-router-dom";
import FormInput from "../Components/FormInput/FormInput";
import useFormHook from "../Hooks/useFormHook";
import { useDispatch, useSelector } from "react-redux";
import { SellerRegistration } from "../Features/Seller/SellerApi";
import { useEffect, useState } from "react";

import { Toastify } from "../Utils/Tostify";
import {
  getAllSellerState,
  setMessageEmpty,
} from "../Features/Seller/SellerSlice";
import LoadingSpinner from "../Components/LoadingSpin";
const Register = () => {
  const { input, setInput, handleInputChange } = useFormHook({
    name: "",
    email: "",
    password: "",
    employment: "",
    website: "",
  });
  //======================get message
  const { message, error, loader } = useSelector(getAllSellerState);
  console.log(message, error);
  //========================== preview state
  const [avatar, setAvatar] = useState(null);
  //========================dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //======================== handle submit
  //========================== preview img
  const handleAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (avatar) {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("website", input.website);
      formData.append("employment", input.employment);
      formData.append("sellerAvatar", avatar);
      dispatch(SellerRegistration(formData));

      setInput({
        name: "",
        email: "",
        password: "",
        employment: "",
        website: "",
      });
      setAvatar(null);
    } else {
      Toastify("Select an avatar", "error");
      dispatch(setMessageEmpty());
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
      navigate("/login");
    }
  }, [error, message, dispatch]);
  return (
    <>
      {loader && (
        <div className="absolute w-screen h-screen z-[999999999] top-0 left-0 bg-cyan-600 bg-opacity-20">
          <div className="w-full h-full flex absolute justify-center items-center top-[50%]">
            <LoadingSpinner />
          </div>
        </div>
      )}
      <div className="min-w-full relative z-0 min-h-screen flex justify-center items-center overflow-hidden">
        <div className="login w-[400px] flex justify-start items-center flex-col h-auto rounded-lg shadow-md  bg-white">
          <h1 className="text-[24px] font-['Lato'] mt-[25px] text-darkBlue font-[900] uppercase">
            Register
          </h1>
          <form
            onSubmit={handleSubmitRegister}
            action=""
            className="mt-4 flex flex-col gap-5 py-5 border-t-[2px]"
          >
            <FormInput
              label="Name"
              type="text"
              placeholder="Name"
              name="name"
              value={input.name}
              required="required"
              handleInputChange={handleInputChange}
            />
            <FormInput
              label="Email"
              placeholder="Email"
              name="email"
              type="email"
              value={input.email}
              required="required"
              handleInputChange={handleInputChange}
            />
            <FormInput
              label="Password"
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              required="required"
              handleInputChange={handleInputChange}
            />
            <FormInput
              label="Employment"
              type="required"
              placeholder="employment"
              name="employment"
              value={input.employment}
              required="required"
              handleInputChange={handleInputChange}
            />
            <FormInput
              label="Website Link"
              type="text"
              placeholder="Website link"
              name="website"
              required="required"
              value={input.website}
              handleInputChange={handleInputChange}
            />
            <div className="imgPrev w-[235px] grid grid-cols-2">
              <label
                htmlFor="sellerAvatar"
                className="w-[100px] h-[100px] border rounded-full overflow-hidden p-[5px]"
              >
                {" "}
                {avatar ? (
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={URL.createObjectURL(avatar)}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                    alt=""
                  />
                )}
              </label>
            </div>
            <input
              type="file"
              onChange={handleAvatar}
              className="hidden"
              id="sellerAvatar"
            />
            <button
              type="submit"
              className="text-[18px] uppercase bg-purple-500 text-white flex justify-center items-center py-[4px] font-[500] w-[235px] mt-3 rounded-[50px] hover:bg-purple-800 transition-all duration-500 ease-in-out"
            >
              Register
            </button>
            <p className="text-[12px] text-center text-gray-500">
              Already have an account
              <Link
                className="text-purple-500 px-[5px] font-[600] hover:text-purple-700 transition-all duration-500 ease-out"
                to="/Login"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
