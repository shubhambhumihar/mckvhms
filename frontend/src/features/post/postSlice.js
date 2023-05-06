import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import authService from "./authService";

import { toast } from "react-toastify";
import postService from "./postService";

export const createPost = createAsyncThunk(
  "post/create",
  async (postData, thunkAPI) => {
    console.log(postData);
    try {
      return await postService.createNewPost(postData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (thunkAPI) => {
    try {
      return await postService.getAllPost();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAPost = createAsyncThunk(
  "post/deleteAPosts",
  async (id, thunkAPI) => {
    try {
      return await postService.deletePost(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const likeDislikePost = createAsyncThunk(
  "post/likeDislikePosts",
  async (postId, thunkAPI) => {
    try {
      return await postService.likeDislikeAPost(postId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  posts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  deletedPost: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.posts = action.payload;

        if (state.isSuccess === true) {
          localStorage.setItem("posts", JSON.stringify(action.payload));

          toast.success("Post Created Successfully");
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        state.posts = null;
        if (state.isError === true) {
          toast.error(action.error.message);
        }
      })
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        state.posts = null;
        if (state.isError === true) {
          toast.error(action.error.message);
        }
      })
      .addCase(deleteAPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedPost = action.payload;
      })
      .addCase(deleteAPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        // state.deletedPost = "";
        if (state.isError === true) {
          toast.error(action.error.message);
        }
      });
  },
});

export default postSlice.reducer;
