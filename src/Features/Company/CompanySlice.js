import { createSlice } from "@reduxjs/toolkit";

import {
  companyStatus,
  createCompany,
  deleteCompany,
  getAllCompany,
  updateCompany,
} from "./CompanyApi";

const CompanySlice = createSlice({
  name: "company",
  initialState: {
    company: [],
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
    //=========================================create Client
    builder
      .addCase(createCompany.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loader = false;
        state.company.push(action.payload.company);
        state.message = action.payload.message;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //==================================================get all client
      .addCase(getAllCompany.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllCompany.fulfilled, (state, action) => {
        state.loader = false;
        state.company = action.payload.company;
      })
      .addCase(getAllCompany.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //===================================================== update client
      .addCase(updateCompany.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loader = false;
        state.company[
          state.company.findIndex(
            (item) => item._id === action.payload.company._id
          )
        ] = action.payload.company;
        state.message = action.payload.message;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //=======================================================delete client
      .addCase(deleteCompany.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.loader = false;
        state.company = state.company.filter(
          (item) => item._id !== action.payload.company._id
        );
        state.message = action.payload.message;
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //===================================================== permission update
      .addCase(companyStatus.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(companyStatus.fulfilled, (state, action) => {
        state.loader = false;
        state.company[
          state.company.findIndex(
            (item) => item._id === action.payload.company._id
          )
        ] = action.payload.company;
        state.message = action.payload.message;
      })
      .addCase(companyStatus.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      });
  },
});
//===============================================================export
export const getAllCompanyState = (state) => state.Company;
export const { setMessageEmpty } = CompanySlice.actions;
export default CompanySlice.reducer;
