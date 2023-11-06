import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const SellerRegistration = createAsyncThunk(
  "seller/SellerRegistration",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://wordshpere.onrender.com/api/v1/seller",
        data,
        { withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const SellerLogin = createAsyncThunk(
  "seller/SellerLogin",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://wordshpere.onrender.com/api/v1/seller/login",
        data,
        { withCredentials: true }
      );

      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const LoggedInSeller = createAsyncThunk(
  "seller/LoggedInSeller",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        "https://wordshpere.onrender.com/api/v1/seller/me",
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const LogoutSeller = createAsyncThunk(
  "seller/LogoutSeller",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        "https://wordshpere.onrender.com/api/v1/seller/logout",
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
