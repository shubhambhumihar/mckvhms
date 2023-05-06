import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import contactService from "./contactService";

export const createContact = createAsyncThunk(
  "contact/createContact",
  async (contactData, thunkAPI) => {
    console.log(contactData);
    try {
      return await contactService.createContact(contactData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all_state");

const initialState = {
  contact: [],
  createdContact: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdContact = action.payload;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default contactSlice.reducer;
