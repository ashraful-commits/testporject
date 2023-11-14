import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import SellerSlice from "../Features/Seller/SellerSlice";
import ClientSlice from "../Features/Client/ClientSlice";

const store = configureStore({
  reducer: {
    Seller: SellerSlice,
    Client: ClientSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});
//===================================store export
export default store;
