import { createSlice } from "@reduxjs/toolkit";

import {
  createClient,
  deleteClient,
  getAllClient,
  getSingleClient,
  permissionUpdate,
  projectStatusUpdate,
  updateClient,
  updateCommissionRate,
} from "./ClientApi";

const ClientSlice = createSlice({
  name: "client",
  initialState: {
    client: [],
    error: null,
    loader: false,
    message: null,
    singleClient: null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClient.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loader = false;
        state.client.push(action.payload.client);
        state.message = action.payload.message;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      .addCase(getAllClient.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllClient.fulfilled, (state, action) => {
        state.loader = false;
        state.client = action.payload.client;
        state.message = action.payload.message;
      })
      .addCase(getAllClient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      .addCase(updateClient.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loader = false;
        state.client[
          state.client.findIndex(
            (item) => item._id === action.payload.client._id
          )
        ] = action.payload.client;
        state.message = action.payload.message;
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      .addCase(deleteClient.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loader = false;
        state.client = state.client.filter(
          (item) => item._id !== action.payload.client._id
        );
        state.message = action.payload.message;
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      .addCase(permissionUpdate.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(permissionUpdate.fulfilled, (state, action) => {
        state.loader = false;
        state.client[
          state.client.findIndex(
            (item) => item._id === action.payload.client._id
          )
        ] = action.payload.client;
        state.message = action.payload.message;
      })
      .addCase(permissionUpdate.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      .addCase(projectStatusUpdate.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(projectStatusUpdate.fulfilled, (state, action) => {
        state.loader = false;
        state.client[
          state.client.findIndex(
            (item) => item._id === action.payload.client._id
          )
        ] = action.payload.client;
        state.message = action.payload.message;
      })
      .addCase(projectStatusUpdate.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      .addCase(getSingleClient.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getSingleClient.fulfilled, (state, action) => {
        state.loader = false;
        state.singleClient = action.payload.client;

        state.message = action.payload.message;
      })
      .addCase(getSingleClient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      .addCase(updateCommissionRate.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateCommissionRate.fulfilled, (state, action) => {
        state.loader = false;
        state.client[
          state.client.findIndex(
            (item) => item._id === action.payload.client._id
          )
        ] = action.payload.client;

        state.message = action.payload.message;
      })
      .addCase(updateCommissionRate.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      });
  },
});

export const getAllClientState = (state) => state.Client;
export const { setMessageEmpty } = ClientSlice.actions;
export default ClientSlice.reducer;
