import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import hostelReducer from "./features/hostel/hostelSlice";
import roomReducer from "./features/room/roomSlice";
import staffReducer from "./features/staff/staffSlice";
// import uploadSingleImgReducer from "./features/uploadImgBlog/uploadImgSlice";
import postReducer from "./features/post/postSlice";
import uploadImgReducer from "./features/uploadImg/uploadImgSlice";
import bedRequestReducer from "./features/bedBooking/bedBookingSlice";
import contactReducer from "./features/contact/contactSlice";
import complainReducer from "./features/complaint/complainSlice";

//! create the store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    hostel: hostelReducer,
    room: roomReducer,
    staff: staffReducer,
    post: postReducer,
    bedBooking: bedRequestReducer,
    contact: contactReducer,
    complain: complainReducer,
    uploadImg: uploadImgReducer,
  },
});
