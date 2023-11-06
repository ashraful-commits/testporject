import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const createClient = createAsyncThunk(
  "seller/createClient",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://wordshpere.onrender.com/api/v1/client",
        data,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getAllClient = createAsyncThunk(
  "seller/getAllClient",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://wordshpere.onrender.com/api/v1/client",

        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
