import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import Auth from "./pages/Auth/Auth";
import Login from "./pages/Auth/Login";
import Blog from "./pages/Blog/Blog";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Rooms from "./pages/Room/Rooms";
import RoomDetail from "./components/RoomDetail";
import Contact from "./components/Contact";
import About from "./pages/About/About";

import Hostels from "./pages/Hostel/Hostels";
import HostelDetail from "./components/hostelDetail";
import ErrorPage from "./components/ErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile/Profile";
import Nav from "./components/Nav";
import { FloatButton } from "antd";
import TermsCondn from "./components/TermsCondn";
import HostelRooms from "./components/HostelRooms";
import { useDispatch } from "react-redux";
import { getProfileOfMine } from "./features/auth/authSlice";
// import Fourtofour from "./components/Fourtofour";

const App = () => {
  // const userState = useSelector((state) => state.auth);

  const token = localStorage.getItem("tkn");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileOfMine());
  }, []);

  // console.log(token);

  // console.log(token);

  // const { user, isLoading, isSuccess, isError } = userState;
  const location = useLocation();
  const showNavbar =
    location.pathname !== "/auth" &&
    location.pathname !== "/login" &&
    location.pathname !== "/rooms" &&
    location.pathname !== "*" &&
    !location.pathname.startsWith("/room/") &&
    !location.pathname.startsWith("/hostel/") &&
    location.pathname !== "/hostels" &&
    location.pathname !== "/terms-condition";
  // location.pathname !== "/blog";
  const showFooter =
    location.pathname !== "/auth" &&
    location.pathname !== "/login" &&
    location.pathname !== "/hostels" &&
    location.pathname !== "/terms-condition";
  return (
    <>
      {showNavbar && <Nav />}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route
          path="/hostels"
          element={
            <PrivateRoute>
              <Hostels />
            </PrivateRoute>
          }
        />
        <Route path="/hostel/:id" element={<HostelDetail />} />
        <Route path="/hostel/:id/rooms" element={<HostelRooms />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room/:id" element={<RoomDetail />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/login"
          element={token ? <Navigate to="../" /> : <Login />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<About />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/terms-condition" element={<TermsCondn />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {showFooter && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />

      <FloatButton.BackTop className="bg-red-700 text-red-800 hover:bg-purple-400" />
    </>
  );
};

// export default App;

function MainRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default MainRouter;
