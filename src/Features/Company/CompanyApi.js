import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//======================================================== base url
const BASE_URL = "https://wordshpere.onrender.com";
// const BASE_URL = "http://localhost:5050";

//=========================================================createCompany
export const createCompany = createAsyncThunk(
  "company/createCompany",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/company`, data, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//=============================================================get all client
export const getAllCompany = createAsyncThunk(
  "company/getAllCompany",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/company`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//============================================================== update client
export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/company/${data.id}`,
        data.formData,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//==============================================================delete client
export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/company/${id}`,

        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//===============================================================project status update
export const companyStatus = createAsyncThunk(
  "company/companyStatus",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/v1/company/${data.id}`,
        { projectStatus: data.projectStatus },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
