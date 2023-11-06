import { Link, useNavigate } from "react-router-dom";
import FormInput from "./../Components/FormInput/FormInput";
import useFormHook from "./../Hooks/useFormHook";
import { useDispatch, useSelector } from "react-redux";
import { SellerLogin } from "../Features/Seller/SellerApi";

import { useEffect } from "react";
import {
  getAllSellerState,
  setMessageEmpty,
} from "../Features/Seller/SellerSlice";
import { Toastify } from "../Utils/Tostify";
import LoadingSpinner from "../Components/LoadingSpin";

const Login = () => {
  const { input, setInput, handleInputChange } = useFormHook({
    email: "",
    password: "",
  });
  //===================================state
  const { message, error, loginInSeller, loader } =
    useSelector(getAllSellerState);

  //================== dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //========================= handle login submit

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(SellerLogin(input));
    setInput({ email: "", password: "" });
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

    if (localStorage.getItem("Seller")) {
      navigate("/");
    }
  }, [message, error, navigate, dispatch]);
  return (
    <div className="min-w-full relative z-0 min-h-screen flex justify-center items-center overflow-hidden">
      {loader && (
        <div className="absolute top-52 right-40 z-[99999]">
          <LoadingSpinner />
        </div>
      )}
      <div className="login w-[400px] flex justify-start items-center flex-col h-[400px] rounded-lg shadow-md  bg-white">
        <h1 className="text-[24px] font-['Lato'] mt-[25px] text-darkBlue font-[900] uppercase">
          Login
        </h1>
        <form
          onSubmit={handleLoginSubmit}
          action=""
          className="mt-4 flex flex-col gap-5 py-5 border-t-[2px]"
        >
          <FormInput
            label="Email"
            type="email"
            required="required"
            placeholder="Email"
            name="email"
            value={input.email}
            handleInputChange={handleInputChange}
          />
          <FormInput
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={input.password}
            required="required"
            handleInputChange={handleInputChange}
          />
          <button
            type="submit"
            className="text-[18px] uppercase bg-purple-500 text-white flex justify-center items-center py-[4px] font-[500] w-[235px] mt-3 rounded-[50px] hover:bg-purple-800 transition-all duration-500 ease-in-out"
          >
            Login
          </button>
          <p className="text-[12px] text-center text-gray-500">
            Don&apos;t have an account{" "}
            <Link
              className="text-purple-500 font-[600] hover:text-purple-700 transition-all duration-500 ease-out"
              to="/register"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
