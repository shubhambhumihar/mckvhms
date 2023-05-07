import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import contactService from "./contactService";

export const getAllContact = createAsyncThunk(
  "contact/getAllContact",
  async (thunkAPI) => {
    try {
      return await contactService.getContacts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAContact = createAsyncThunk(
  "contact/deleteContact",
  async (id, thunkAPI) => {
    try {
      return await contactService.deleteContact(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const updateEnquiry = createAsyncThunk(
//   "enquiry/updateEnquiry",
//   async (data, thunkAPI) => {
//     console.log(data.value);
//     console.log(data.id);
//     try {
//       return await enquiryService.updateEnquiry(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
export const resetState = createAction("Reset_all_state");

const initialState = {
  contacts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  deletedContact: "",
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.contacts = action.payload;
      })
      .addCase(getAllContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedContact = action.payload;
      })
      .addCase(deleteAContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default contactSlice.reducer;
