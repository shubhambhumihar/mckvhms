import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bedBookingRequestService from "./bedBookingRequestService";

export const getTotalBedRequests = createAsyncThunk(
  "bedRequest/totalBedRequest",
  async (thunkAPI) => {
    try {
      return await bedBookingRequestService.getAllBedBookings();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateBedRequest = createAsyncThunk(
  "bedRequest/updateBedRequest",
  async (data, thunkAPI) => {
    console.log(data.value);
    console.log(data.id);
    try {
      return await bedBookingRequestService.updateBedBooking(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteABedRequest = createAsyncThunk(
  "bedRequest/deleteBedRequest",
  async (id, thunkAPI) => {
    try {
      return await bedBookingRequestService.deleteBedBooking(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all_state");

const initialState = {
  bedRequest: [],

  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  updatedBedRequest: "",
  deletedBedRequest: "",
};

export const bedBookingSlice = createSlice({
  name: "bedRequest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(updateBedRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBedRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedBedRequest = action.payload;
      })
      .addCase(updateBedRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteABedRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABedRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedBedRequest = action.payload;
      })
      .addCase(deleteABedRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default bedBookingSlice.reducer;
