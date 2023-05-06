import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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
export const updateAStudent = createAsyncThunk(
  "student/updateStudent",
  async (student, thunkAPI) => {
    console.log(student);
    try {
      return await studentService.updateStudent(student);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (id, thunkAPI) => {
    try {
      return await studentService.deleteAStudent(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleStudent = createAsyncThunk(
  "student/getAStudent",
  async (id, thunkAPI) => {
    try {
      return await studentService.getAStudent(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all_state");

const initialState = {
  students: [],
  createdStudent: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  singleStudent: "",
  studentName: "",
  studentEmail: "",
  studentGender: "",
  studentCourse: "",
  studentBatch: "",
  studentDepartment: "",
  studentSemester: "",
  studentMobile: "",
  studentparentContactNumber: "",
  studentAddress: "",
  studentId: "",
  studentRoomId: "",
  studentBedId: "",
  studentHostelId: "",
  deletedStudent: "",
  updatedStudent: "",
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
      })
      .addCase(getSingleStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.singleStudent = action.payload;
        state.studentName = action.payload.student.name;
        state.studentEmail = action.payload.student.email;
        state.studentGender = action.payload.student.gender;
        state.studentCourse = action.payload.student.course;
        state.studentBatch = action.payload.student.batch;
        state.studentDepartment = action.payload.student.department;
        state.studentSemester = action.payload.student.semester;
        state.studentMobile = action.payload.student.mobile;
        state.studentparentContactNumber =
          action.payload.student.parentContactNumber;
        state.studentAddress = action.payload.student.address;
        state.studentId = action.payload.student.student_id;
        state.studentRoomId = action.payload.student.room_id;
        state.studentBedId = action.payload.student.bed_id;
        state.studentHostelId = action.payload.student.hostel_id;
      })
      .addCase(getSingleStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedStudent = action.payload;
      })
      .addCase(updateAStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedStudent = action.payload;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default studentSlice.reducer;
