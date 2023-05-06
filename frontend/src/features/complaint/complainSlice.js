import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import complainService from "./complaintService";

export const createComplain = createAsyncThunk(
  "complain/createComplain",
  async (complainData, thunkAPI) => {
    try {
      return await complainService.createComplain(complainData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all_state");

const initialState = {
  complaint: [],
  createdComplaint: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const complainSlice = createSlice({
  name: "complaint",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComplain.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComplain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdComplaint = action.payload;
      })
      .addCase(createComplain.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});
export default complainSlice.reducer;
