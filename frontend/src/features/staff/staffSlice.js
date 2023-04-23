import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import staffService from "./staffService";

export const getAllStaffs = createAsyncThunk(
  "hostel/getHostels",
  async (thunkAPI) => {
    try {
      return await staffService.getStaffs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const staffState = {
  staff: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const staffSlice = createSlice({
  name: "staff",
  initialState: staffState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStaffs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStaffs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.staff = action.payload;
      })
      .addCase(getAllStaffs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default staffSlice.reducer;
