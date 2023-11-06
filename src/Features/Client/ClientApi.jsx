import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://wordshpere.onrender.com";
// const BASE_URL = "http://localhost:5050";
export const createClient = createAsyncThunk(
  "seller/createClient",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/client`, data, {
        withCredentials: true,
      });

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
        `${BASE_URL}/api/v1/client`,

        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
