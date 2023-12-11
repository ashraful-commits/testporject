import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import SellerSlice from "../Features/Seller/SellerSlice";
import ClientSlice from "../Features/Client/ClientSlice";
import CompanySlice from "../Features/Company/CompanySlice";

const store = configureStore({
  reducer: {
    Seller: SellerSlice,
    Client: ClientSlice,
    Company: CompanySlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});
//===================================store export
export default store;
