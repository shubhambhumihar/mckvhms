import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

import { toast } from "react-toastify";

const getUserFromLocalStorage = localStorage.getItem("user-frontend")
  ? JSON.parse(localStorage.getItem("user-frontend"))
  : null;
// create action
// console.log(getUserFromLocalStorage);
export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateUserProfile = createAsyncThunk(
  "auth/update-profile",
  async (user, thunkAPI) => {
    // console.log(user);
    try {
      return await authService.updateProfile(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  // console.log(user);
  try {
    return await authService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
const initialState = {
  mode: "light",
  user: getUserFromLocalStorage,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  // updatedUser: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;

        if (state.isSuccess === true) {
          localStorage.setItem("tkn", action.payload.token);
          toast.success("User Created Successfully");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        state.user = null;
        if (state.isError === true) {
          toast.error(action.error.message);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;

        if (state.isSuccess === true) {
          localStorage.setItem("tkn", action.payload.token);
          // localStorage.setItem("user-frontend", state.user);
          // localStorage.setItem("user-frontend", action.payload.user);
          toast.success("User Logged in Successfully");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        state.user = null;
        if (state.isError === true) {
          toast.error(action.error.message);
        }
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;

        if (state.isSuccess === true) {
          // Get the user data from local storage
          const userData = JSON.parse(localStorage.getItem("user-frontend"));

          // Update the user data
          userData.user.name = action.payload.user.name;
          userData.user.email = action.payload.user.email;
          userData.user.mobile = action.payload.user.mobile;

          // Store the updated user data in local storage
          localStorage.setItem("user-frontend", JSON.stringify(userData));

          toast.success("User Updated Successfully");
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        state.updatedUser = null;
        if (state.isError === true) {
          toast.error(action.error.message);
        }
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = null;
        localStorage.removeItem("user-frontend");
        localStorage.removeItem("tkn");

        if (state.isSuccess === true) {
          toast.success("Logout Successfully");
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;

        if (state.isError === true) {
          toast.error(action.error.message);
        }
      });
  },
});

export const { setMode } = authSlice.actions;

export default authSlice.reducer;
