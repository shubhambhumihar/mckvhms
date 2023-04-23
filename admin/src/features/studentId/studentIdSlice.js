import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import studentIdService from "./studentIdService";

export const createStudentId = createAsyncThunk(
  "studentId/createStudentId",
  async (studentIdData, thunkAPI) => {
    try {
      return await studentIdService.createStudentId(studentIdData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getStudentIds = createAsyncThunk(
  "studentId/getStudentId",
  async (thunkAPI) => {
    try {
      return await studentIdService.getStudentIds();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  studentId: [],
  createStudentId: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const studentIdSlice = createSlice({
  name: "studentId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStudentId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStudentId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createStudentId = action.payload;
      })
      .addCase(createStudentId.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getStudentIds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentIds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.studentId = action.payload;
      })
      .addCase(getStudentIds.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default studentIdSlice.reducer;
