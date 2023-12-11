import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//======================================================== base url
const BASE_URL = "https://wordshpere.onrender.com";
// const BASE_URL = "http://localhost:5050";

//=========================================================createClient
export const createClient = createAsyncThunk(
  "client/createClient",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/client`, data, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//=========================================================client Login
export const clientLogin = createAsyncThunk(
  "client/clientLogin",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/client/login`,
        data,
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
//=============================================================get all client
export const getAllClient = createAsyncThunk(
  "client/getAllClient",
  async (data, thunkAPI) => {
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
//============================================================== update client
export const updateClient = createAsyncThunk(
  "client/updateClient",
  async (data, thunkAPI) => {
    try {
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
//==============================================================delete client
export const deleteClient = createAsyncThunk(
  "client/deleteClient",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/client/${id}`,

        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//============================================================get single client
export const getSingleClient = createAsyncThunk(
  "client/getSingleClient",
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
//============================================================= client permission update
export const permissionUpdate = createAsyncThunk(
  "client/permissionUpdate",
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
//===============================================================project status update
export const projectStatusUpdate = createAsyncThunk(
  "client/projectStatusUpdate",
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
//=============================================================== client commission update
export const updateCommissionRate = createAsyncThunk(
  "client/updateCommissionRate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/v1/client/commissionRate/${data.id}`,
        { commissionRate: data.commissionRate },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//=============================================================== client commission update
export const updateSalesCommissionRate = createAsyncThunk(
  "client/updateSalesCommissionRate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/v1/client/salescommissionRate/${data.id}`,
        { salesCommissionRate: data.salesCommissionRate },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//==================================================================file download
export const fileDownloadFunc = createAsyncThunk(
  "client/fileDownload",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/client/file/${data.file}/${data.fileFormat}`,
        { withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const LoggedInClient = createAsyncThunk(
  "client/LoggedInClient",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/client/me`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//=============================================================logout seller
export const LogoutClient = createAsyncThunk(
  "client/LogoutClient",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/client/logout`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//=============================================================logout seller
export const deleteFiles = createAsyncThunk(
  "client/deleteFiles",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/client/deletefile`,
        data,
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
