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

export const createRoom = createAsyncThunk(
  "room/createRoom",
  async (roomData, thunkAPI) => {
    try {
      console.log(roomData);

      return await roomService.createRoom(roomData, roomData.hostel);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateARoom = createAsyncThunk(
  "room/updateRoom",
  async (room, thunkAPI) => {
    // console.log(hostel);
    try {
      return await roomService.updateRoom(room);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getARoom = createAsyncThunk(
  "room/getRoom",
  async (id, thunkAPI) => {
    try {
      return await roomService.getRoom(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getBedsOfRoom = createAsyncThunk(
  "room/getBeds",
  async (id, thunkAPI) => {
    try {
      return await roomService.getBedOfRoom(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteARoom = createAsyncThunk(
  "room/deleteRoom",
  async (id, thunkAPI) => {
    try {
      return await roomService.deleteRoom(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all_state");

const initialState = {
  rooms: [],
  createdRoom: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  getSingleRoom: "",
  bedsOfRoom: "",
  title: "",
  roomNumber: "",
  numberOfBeds: "",
  description: "",
  price: "",
  capacity: "",
  hostelId: "",
  updatedRoom: "",
  deletedRoom: "",
};

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
      .addCase(createRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdRoom = action.payload;
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getARoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getARoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.getSingleRoom = action.payload;
        state.title = action.payload.room.title;
        state.roomNumber = action.payload.room.roomNumber;
        state.numberOfBeds = action.payload.room.numberOfBeds;
        state.description = action.payload.room.description;
        state.price = action.payload.room.price;
        state.capacity = action.payload.room.capacity;
        state.hostelId = action.payload.room.hostel_id;

        state.roomImages = action.payload.room.images;
      })
      .addCase(getARoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getBedsOfRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBedsOfRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.bedsOfRoom = action.payload;
      })
      .addCase(getBedsOfRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateARoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateARoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedRoom = action.payload;
      })
      .addCase(updateARoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteARoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteARoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedRoom = action.payload;
      })
      .addCase(deleteARoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default roomSlice.reducer;
