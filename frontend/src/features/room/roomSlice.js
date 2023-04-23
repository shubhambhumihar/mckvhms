import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import roomService from "./roomService";

export const getAllRooms = createAsyncThunk(
  "room/getroom",
  async (thunkAPI) => {
    try {
      return await roomService.getAllRooms();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSingleRoom = createAsyncThunk(
  "hostel/getARoom",
  async (id, thunkAPI) => {
    console.log(id);
    try {
      return await roomService.getSingleRoom(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  rooms: [],
  createdRoom: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  singleRoom: "",
};

export const resetState = createAction("Reset_all_state");

export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.rooms = action.payload;
      })
      .addCase(getAllRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getSingleRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleRoom = action.payload;
      })
      .addCase(getSingleRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default roomSlice.reducer;
