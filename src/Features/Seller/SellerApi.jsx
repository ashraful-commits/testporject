import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://wordshpere.onrender.com";
// const BASE_URL = "http://localhost:5050";
export const SellerRegistration = createAsyncThunk(
  "seller/SellerRegistration",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/seller`, data, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const AddSalePerson = createAsyncThunk(
  "seller/AddSalePerson",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/seller`, data, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateSeller = createAsyncThunk(
  "seller/updateSeller",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/seller/sellerUpdate/${data.id}`,
        data.formData,
        {
          withCredentials: true,
        }
      );

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
        `${BASE_URL}/api/v1/seller/login`,
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
      const response = await axios.get(`${BASE_URL}/api/v1/seller/me`, {
        withCredentials: true,
      });

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
      const response = await axios.get(`${BASE_URL}/api/v1/seller/logout`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getAllSeller = createAsyncThunk(
  "seller/getAllSeller",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/seller?page=${data.page}&limit=${data.limit}&role=${data.role}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateSellerRole = createAsyncThunk(
  "seller/updateSellerRole",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/seller/${data.id}`,
        { role: data.role },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateSellerStatus = createAsyncThunk(
  "seller/updateSellerStatus",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/v1/seller/${data.id}`,
        { status: !data.status },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteSeller = createAsyncThunk(
  "seller/deleteSeller",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/seller/${data.id}/${data.sellerId}`,

        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getSingleSeller = createAsyncThunk(
  "seller/getSingleSeller",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/seller/${id}`,

        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
