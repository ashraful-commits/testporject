import { RouterProvider } from "react-router-dom";
import "./App.css";
import PageRouter from "./Routers/PageRouter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInSeller, getAllSeller } from "./Features/Seller/SellerApi";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import { LoggedInClient } from "./Features/Client/ClientApi";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoggedInSeller());
    dispatch(LoggedInClient());
  }, [dispatch]);
  return (
    <>
      <AnimatePresence initial={true} mode="wait">
        <RouterProvider router={PageRouter} />
        <ToastContainer />
      </AnimatePresence>
    </>
  );
}

export default App;
