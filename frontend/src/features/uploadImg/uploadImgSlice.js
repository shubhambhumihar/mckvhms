import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import uploadService from "./uploadImgService";

export const uploadImg = createAsyncThunk(
  "image/upload",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      return await uploadService.uploadImg(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const uploadImage = createAsyncThunk(
  "upload/image",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      console.log(data[0]);

      const formData = new FormData();
      // console.log(data.length);
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        // formData.append("images", 10);
        formData.append("images", data[i]);

        // formData.append("images", data[i]);
      }

      return await uploadService.uploadImgs(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteImg = createAsyncThunk(
  "delete/image",
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteImg(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const uploadImgSlice = createSlice({
  name: "images",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        state.images = null;
        if (state.isError === true) {
          toast.error(action.error.message);
        }
      })
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        state.images = null;
        if (state.isError === true) {
          toast.error(action.error.message);
        }
      })
      .addCase(deleteImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.images = "";
      })
      .addCase(deleteImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default uploadImgSlice.reducer;
