import { createSlice } from "@reduxjs/toolkit";

import { createClient, getAllClient } from "./ClientApi";

const ClientSlice = createSlice({
  name: "client",
  initialState: {
    client: [],
    error: null,
    loader: false,
    message: null,
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
      });
  },
});

export const getAllClientState = (state) => state.Client;
export const { setMessageEmpty } = ClientSlice.actions;
export default ClientSlice.reducer;
