import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import hostelService from "./hostelService";

import { toast } from "react-toastify";

export const getAllHostels = createAsyncThunk(
  "hostel/getHostels",
  async (thunkAPI) => {
    try {
      return await hostelService.getHostels();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSingleHostel = createAsyncThunk(
  "hostel/getAHostel",
  async (id, thunkAPI) => {
    // console.log(id);
    try {
      return await hostelService.getSingleHostel(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getRoomsOfHostel = createAsyncThunk(
  "hostel/getRoomsOfHostel",
  async (id, thunkAPI) => {
    // console.log(id);
    try {
      return await hostelService.getRoomsOfHostel(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const hostelState = {
  hostel: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  singleHostel: "",
  roomsOfHostel: "",
};

export const hostelSlice = createSlice({
  name: "hostel",
  initialState: hostelState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllHostels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllHostels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.hostel = action.payload;
      })
      .addCase(getAllHostels.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        state.user = null;
        if (state.isError === true) {
          toast.error(action.error.message);
        }
      })
      .addCase(getSingleHostel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleHostel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleHostel = action.payload;
      })
      .addCase(getSingleHostel.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getRoomsOfHostel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoomsOfHostel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.roomsOfHostel = action.payload;
      })
      .addCase(getRoomsOfHostel.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default hostelSlice.reducer;
