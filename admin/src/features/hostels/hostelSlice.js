import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import hostelService from "./hostelService";

export const getAllHostels = createAsyncThunk(
  "hostel/getAllHostels",
  async (thunkAPI) => {
    try {
      return await hostelService.getHostels();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createHostels = createAsyncThunk(
  "hostel/createHostel",
  async (hostelData, thunkAPI) => {
    try {
      return await hostelService.createHostel(hostelData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAHostel = createAsyncThunk(
  "hostel/updateHostel",
  async (hostel, thunkAPI) => {
    // console.log(hostel);
    try {
      return await hostelService.updateHostel(hostel);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAHostel = createAsyncThunk(
  "hostel/getHostel",
  async (id, thunkAPI) => {
    try {
      return await hostelService.getHostel(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getRoomsByHostel = createAsyncThunk(
  "hostel/getRoomsByHostel",
  async (id, thunkAPI) => {
    try {
      return await hostelService.getRoomsByHostelId(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getBedsByHostel = createAsyncThunk(
  "hostel/getBedsByHostel",
  async (id, thunkAPI) => {
    try {
      return await hostelService.getBedByHostelId(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAHostel = createAsyncThunk(
  "hostel/deleteHostel",
  async (id, thunkAPI) => {
    try {
      return await hostelService.deleteHostel(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all_state");

const initialState = {
  hostels: [],
  createHostel: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  singleHostel: "",

  message: "",
  hostelName: "",
  hostelType: "",
  description: "",
  capacity: "",
  NumberOfRooms: "",
  Availability: "",
  hostelImages: "",
  phone: "",
  updatedHostel: "",
  deletedHostel: "",
  roomsOfHostel: "",
  bedsOfHostel: "",
};

export const hostelSlice = createSlice({
  name: "hostels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllHostels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllHostels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.hostels = action.payload;
      })
      .addCase(getAllHostels.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createHostels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createHostels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createHostel = action.payload;
      })
      .addCase(createHostels.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAHostel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAHostel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.singleHostel = action.payload;
        state.hostelName = action.payload.hostel.hostel_name;
        state.hostelType = action.payload.hostel.hostel_type;
        state.description = action.payload.hostel.desc;
        state.phone = action.payload.hostel.phone;
        state.capacity = action.payload.hostel.capacity;
        state.NumberOfRooms = action.payload.hostel.number_of_rooms;
        state.Availability = action.payload.hostel.availability;
        state.hostelImages = action.payload.hostel.images;
      })
      .addCase(getAHostel.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getRoomsByHostel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoomsByHostel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.roomsOfHostel = action.payload;
      })
      .addCase(getRoomsByHostel.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getBedsByHostel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBedsByHostel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.bedsOfHostel = action.payload;
      })
      .addCase(getBedsByHostel.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAHostel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAHostel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedHostel = action.payload;
      })
      .addCase(updateAHostel.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAHostel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAHostel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedHostel = action.payload;
      })
      .addCase(deleteAHostel.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default hostelSlice.reducer;
