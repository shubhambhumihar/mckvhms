import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import hostelReducer from "./features/hostels/hostelSlice";
import bedReducer from "./features/bed/bedSlice";
import staffReducer from "./features/staff/staffSlice";
import roomReducer from "./features/room/roomSlice";
import blogReducer from "./features/staff/staffSlice";
import blogCatReducer from "./features/blogCat/blogCatSlice";
import studentReducer from "./features/student/studentSlice";
import enquiryReducer from "./features/enquiry/enquirySlice";
import uploadReducer from "./features/upload/uploadSlice";
import studentIdReducer from "./features/studentId/studentIdSlice";
// import productCategoryReducer from "./features/productCat/productCatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hostel: hostelReducer,
    bed: bedReducer,
    staff: staffReducer,
    room: roomReducer,
    blog: blogReducer,
    blogCategory: blogCatReducer,
    student: studentReducer,
    enquiry: enquiryReducer,
    studentId: studentIdReducer,
    upload: uploadReducer,

    // productCategory: productCategoryReducer,
  },
});
