import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicGard = () => {
  const { loginInSeller } = useSelector((state) => state.Seller);
  if (!localStorage.getItem("Seller")) {
    return <Outlet />;
  }
  return loginInSeller ? <Navigate to="/" /> : <Outlet />;
};

export default PublicGard;
