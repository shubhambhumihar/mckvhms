import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogCatService from "./blogCatService";

export const getAllBlogCategory = createAsyncThunk(
  "blog/getAllBlogsCat",
  async (thunkAPI) => {
    try {
      return await blogCatService.getBlogsCat();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  blogCategory: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogCatSlice = createSlice({
  name: "blogCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogCategory = action.payload;
      })
      .addCase(getAllBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default blogCatSlice.reducer;
