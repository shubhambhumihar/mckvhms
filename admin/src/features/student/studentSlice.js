import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "./studentService";

export const createStudent = createAsyncThunk(
  "student/createStudent",
  async (studentData, thunkAPI) => {
    try {
      return await studentService.createStudent(studentData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllStudents = createAsyncThunk(
  "student/getAllStudent",
  async (thunkAPI) => {
    try {
      return await studentService.getAllStudents();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  students: [],
  createdStudent: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdStudent = action.payload;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAllStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.students = action.payload;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default studentSlice.reducer;
