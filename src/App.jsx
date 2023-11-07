import { RouterProvider } from "react-router-dom";
import "./App.css";
import PageRouter from "./Routers/PageRouter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInSeller } from "./Features/Seller/SellerApi";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoggedInSeller());
  }, [dispatch]);
  return (
    <>
      <RouterProvider router={PageRouter} />
      <ToastContainer />
    </>
  );
}

export default App;
