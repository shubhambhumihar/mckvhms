import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import hostelReducer from "./features/hostel/hostelSlice";
import roomReducer from "./features/room/roomSlice";
import staffReducer from "./features/staff/staffSlice";
// import uploadSingleImgReducer from "./features/uploadImgBlog/uploadImgSlice";
import postReducer from "./features/post/postSlice";
import uploadImgReducer from "./features/uploadImg/uploadImgSlice";

//! create the store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    hostel: hostelReducer,
    room: roomReducer,
    staff: staffReducer,

    post: postReducer,
    uploadImg: uploadImgReducer,
  },
});
