import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import staffService from "./staffService";

export const getAllStaffs = createAsyncThunk(
  "staff/getAllStaffs",
  async (thunkAPI) => {
    try {
      return await staffService.getStaffs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createStaffs = createAsyncThunk(
  "staff/createStaff",
  async (staffData, thunkAPI) => {
    try {
      return await staffService.createStaff(staffData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAStaff = createAsyncThunk(
  "staff/updateStaff",
  async (staff, thunkAPI) => {
    console.log(staff);
    try {
      return await staffService.updateStaff(staff);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAStaff = createAsyncThunk(
  "staff/getStaff",
  async (id, thunkAPI) => {
    try {
      return await staffService.getStaff(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAStaff = createAsyncThunk(
  "staff/deleteStaff",
  async (id, thunkAPI) => {
    try {
      return await staffService.deleteStaff(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all_state");

const initialState = {
  staffs: [],
  staffCreated: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  // getStaff: "",
};

export const staffSlice = createSlice({
  name: "staffs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStaffs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStaffs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.staffs = action.payload;
      })
      .addCase(getAllStaffs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createStaffs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStaffs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.staffCreated = action.payload;
      })
      .addCase(createStaffs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.staffName = action.payload.staff.name;
        state.staffEmail = action.payload.staff.email;
        state.staffGender = action.payload.staff.gender;
        state.staffDepartment = action.payload.staff.department;
        state.staffContactNumber = action.payload.staff.contactNumber;
        state.staffImg = action.payload.staff.images;
      })
      .addCase(getAStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedStaff = action.payload;
      })
      .addCase(updateAStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedStaff = action.payload;
      })
      .addCase(deleteAStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default staffSlice.reducer;
