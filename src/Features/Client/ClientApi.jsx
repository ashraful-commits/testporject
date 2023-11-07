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
    console.log(data);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/client/${data.sellerId}?page=${data.page}&limit=${data.limit}`,

        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateClient = createAsyncThunk(
  "seller/updateClient",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const response = await axios.put(
        `${BASE_URL}/api/v1/client/${data.id}`,
        data.formData,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteClient = createAsyncThunk(
  "seller/deleteClient",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/client/${id}`,

        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getSingleClient = createAsyncThunk(
  "seller/getSingleClient",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/client/clientId/${id}`,

        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const permissionUpdate = createAsyncThunk(
  "seller/permissionUpdate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/v1/client/${data.id}`,
        { status: !data.status },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const projectStatusUpdate = createAsyncThunk(
  "seller/projectStatusUpdate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/v1/client/projectStatusUpdate/${data.id}`,
        { projectStatus: data.projectStatus },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
