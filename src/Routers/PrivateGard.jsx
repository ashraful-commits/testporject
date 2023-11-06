import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";

const PrivateGard = () => {
  const { loinInSeller } = useSelector((state) => state.Seller);
  if (localStorage.getItem("Seller")) {
    return <Outlet />;
  } else {
    return loinInSeller ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default PrivateGard;
