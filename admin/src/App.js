import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import LayoutApp from "./components/LayoutApp";
import Dashboard from "./pages/Dashboard";
import Enquiry from "./pages/Enquiry";
import Contact from "./pages/Contact";
import AddRoom from "./pages/AddRoom";
import RoomList from "./pages/RoomList";
import AddBed from "./pages/AddBed";
import BedList from "./pages/BedList";
import AddStaff from "./pages/AddStaff";
import StaffList from "./pages/StaffList";
import AddStudent from "./pages/AddStudent";
import StudentList from "./pages/StudentList";
import AddHostel from "./pages/AddHostel";
import HostelList from "./pages/HostelList";
import FourtofourPage from "./components/FourtofourPage";
import { useDispatch } from "react-redux";
import { getAllHostels } from "./features/hostels/hostelSlice";
import AddStudentId from "./pages/AddStudentId";
import StudentIdList from "./pages/StudentIdList";
import Hostels from "./components/hostels/Hostels";
import HostelDetail from "./components/hostels/HostelDetail";
import RoomDetail from "./components/rooms/RoomDetail";
import BedDetail from "./components/beds/BedDetail";
import BedRequest from "./components/beds/BedRequest";
import Search from "./components/search/Search";
import StudentDetails from "./components/search/StudentDetails";
// import { getProfileOfMine } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllHostels());
    // dispatch(getProfileOfMine());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<LayoutApp />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiry" element={<Enquiry />} />
          <Route path="contact" element={<Contact />} />
          <Route path="room" element={<AddRoom />} />
          <Route path="room/:id" element={<AddRoom />} />
          <Route path="room-list" element={<RoomList />} />
          <Route path="bed" element={<AddBed />} />
          <Route path="bed-list" element={<BedList />} />
          <Route path="bed-request" element={<BedRequest />} />
          <Route path="staff" element={<AddStaff />} />
          <Route path="staff/:id" element={<AddStaff />} />
          <Route path="staff-list" element={<StaffList />} />
          <Route path="student" element={<AddStudent />} />
          <Route path="student/:id" element={<AddStudent />} />
          <Route path="student-list" element={<StudentList />} />
          <Route path="student_id" element={<AddStudentId />} />
          <Route path="student_id_list" element={<StudentIdList />} />
          <Route path="hostel" element={<AddHostel />} />
          <Route path="hostel/:id" element={<AddHostel />} />
          <Route path="hostel-list" element={<HostelList />} />
          <Route path="hostels" element={<Hostels />} />
          <Route path="search" element={<Search />} />
          <Route path="student/:id/details" element={<StudentDetails />} />
          <Route path="hostel/:id/details" element={<HostelDetail />} />
          <Route path="hostel/room/:id" element={<RoomDetail />} />
          <Route path="hostel/room/bed/:id" element={<BedDetail />} />
        </Route>
        <Route path="*" element={<FourtofourPage />} />
      </Routes>
    </Router>
  );
}

export default App;
