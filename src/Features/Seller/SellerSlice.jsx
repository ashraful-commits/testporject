import { createSlice } from "@reduxjs/toolkit";
import {
  LoggedInSeller,
  LogoutSeller,
  SellerLogin,
  SellerRegistration,
} from "./SellerApi";

const SellerSlice = createSlice({
  name: "seller",
  initialState: {
    seller: null,
    error: null,
    loader: false,
    message: null,
    loginInSeller: localStorage.getItem("Seller")
      ? JSON.parse(localStorage.getItem("Seller"))
      : null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SellerRegistration.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(SellerRegistration.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(SellerRegistration.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      .addCase(SellerLogin.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(SellerLogin.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        localStorage.setItem("Seller", JSON.stringify(action.payload.seller));
      })
      .addCase(SellerLogin.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
        console.log(action);
      })
      .addCase(LoggedInSeller.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(LoggedInSeller.fulfilled, (state, action) => {
        state.loader = false;
        state.loginInSeller = action.payload.seller;
        state.message = action.payload.message;
      })
      .addCase(LoggedInSeller.rejected, (state, action) => {
        state.loader = false;
      })
      .addCase(LogoutSeller.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(LogoutSeller.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(LogoutSeller.rejected, (state, action) => {
        state.loader = false;
      });
  },
});

export const getAllSellerState = (state) => state.Seller;
export const { setMessageEmpty } = SellerSlice.actions;
export default SellerSlice.reducer;
