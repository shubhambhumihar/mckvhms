import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bedService from "./bedService";

export const getAllBeds = createAsyncThunk(
  "bed/getAllBeds",
  async (thunkAPI) => {
    try {
      return await bedService.getBeds();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBeds = createAsyncThunk(
  "bed/createBed",
  async (bedData, thunkAPI) => {
    try {
      // console.log(bedData);

      return await bedService.createBed(bedData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteABed = createAsyncThunk(
  "bed/deleteBed",
  async (id, thunkAPI) => {
    try {
      return await bedService.deleteBed(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleBedofRoom = createAsyncThunk(
  "bed/getABed",
  async (id, thunkAPI) => {
    try {
      return await bedService.getSingleBed(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getStudentOfABed = createAsyncThunk(
  "bed/getStudent",
  async (id, thunkAPI) => {
    try {
      return await bedService.getStudentOfSingleBed(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all_state");
const initialState = {
  beds: [],
  createdBed: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  student: "",
  singleBed: "",
  deletedBed: "",
};

export const bedSlice = createSlice({
  name: "beds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.beds = action.payload;
      })
      .addCase(getAllBeds.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createBeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdBed = action.payload;
      })
      .addCase(createBeds.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getSingleBedofRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleBedofRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.singleBed = action.payload;
      })
      .addCase(getSingleBedofRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getStudentOfABed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentOfABed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.student = action.payload;
      })
      .addCase(getStudentOfABed.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteABed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedBed = action.payload;
      })
      .addCase(deleteABed.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default bedSlice.reducer;
