import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bedBookingService from "./bedBookingService";

export const createBedRequest = createAsyncThunk(
  "bedRequest/createBedRequest",
  async (bedRequestData, thunkAPI) => {
    try {
      return await bedBookingService.createBedBooking(bedRequestData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getTotalBedRequests = createAsyncThunk(
  "bedRequest/totalBedRequest",
  async (thunkAPI) => {
    try {
      return await bedBookingService.getAllBedBookings();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getStudentBedRequests = createAsyncThunk(
  "bedRequest/studentBedRequest",
  async (thunkAPI) => {
    try {
      return await bedBookingService.getStudentBedBooking();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all_state");

const initialState = {
  bedRequest: [],
  studentBedBooking: "",
  createdBedRequest: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const bedBookingSlice = createSlice({
  name: "bedRequest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBedRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBedRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdBedRequest = action.payload;
      })
      .addCase(createBedRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getTotalBedRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalBedRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.bedRequest = action.payload;
      })
      .addCase(getTotalBedRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getStudentBedRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentBedRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.studentBedBooking = action.payload;
      })
      .addCase(getStudentBedRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default bedBookingSlice.reducer;
