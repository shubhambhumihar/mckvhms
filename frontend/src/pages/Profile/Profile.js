import React, { useEffect } from "react";
import { AiOutlineHolder } from "react-icons/ai";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { useState } from "react";

import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../features/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 10);
  }, []);

  const userState = useSelector((state) => state.auth);
  const { picturePath } = useSelector((state) => state.auth?.user?.user);

  // console.log(userState.user.user);

  // const getUserFromLocalStorage = localStorage.getItem("user-frontend")
  //   ? JSON.parse(localStorage.getItem("user-frontend"))
  //   : null;
  // const [user, setUser] = useState({});
  // console.log(user);
  // useEffect(() => {
  //   setUser(getUserFromLocalStorage.user);
  // }, []);
  // const user = useSelector((state) => state.auth);
  // console.log(user);
  const formik = useFormik({
    // enableReinitialize: true,
    //  enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      mobile: "",
    },

    // validationSchema: hostelSchema,
    onSubmit: (values) => {
      dispatch(updateUserProfile(values));
      // console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="relative w-full  my-5   mx-auto">
      <div className="grid lg:grid-cols-2 h-[80vh]  place-items-center my-auto ">
        <div className="profileLeft  w-[100%] mx-auto flex items-center justify-center">
          <lottie-player
            src="https://assets6.lottiefiles.com/packages/lf20_hvzjb7o5.json"
            background="transparent"
            speed="1"
            style={{ width: "400px", height: "400px" }}
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className=" profileright  w-[100%] flex items-center justify-center h-[100%]">
          <div className="card rounded-xl w-[350px] sh p-7 flex flex-col items-center gap-3 justify-center">
            <div className=" w-[100%]   flex justify-end">
              <AiOutlineHolder className="text-orange-400" />
            </div>

            <div className="border w-[150px] mt-[-100px] h-[150px] border-purple-500 rounded-full flex justify-center items-center mb-2 ">
              <img
                className="rounded-full h-[100%] w-[100%] object-cover"
                src={
                  picturePath
                    ? process.env.REACT_APP_PUBLIC_FOLDER + picturePath
                    : "https://cdn.pixabay.com/photo/2022/09/30/12/56/cat-7489398_640.jpg"
                }
                alt=""
              />
            </div>

            <div className="bg-[#39364636] w-[120%] px-15 py-6 flex flex-col iten-center justify-center">
              <h1 className="text-2xl font-bold text-center">
                {userState?.user?.user?.name}
              </h1>
              <h2 className="e text-center text-gray-400">
                {userState?.user?.user?.email}
              </h2>
              <h2 className="e text-slate-500 font-extralight text-sm mt-1 text-center">
                {userState?.user?.user?.mobile}
              </h2>
            </div>

            <div className="mt-4 e">
              {/* <Link to="/update-profile"> */}{" "}
              <button
                onClick={showDrawer}
                icon={<PlusOutlined />}
                className="shadow-sm rounded-lg shadow-orange-600 px-8 py-3"
              >
                Edit profile
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          New account
        </Button> */}
        <Drawer
          title="Update Your Account"
          width={520}
          onClose={onClose}
          open={open}
          bodyStyle={{
            paddingBottom: 80,
            backgroundColor: "#FDF4F5",
            color: "red",
          }}
          extra={
            <Space>
              <button
                className="px-[22px] py-[6px] bg-blend-overlay bg-purple-400 mx-auto block  text-green shadow-sm shadow-green-300 rounded-[20px]"
                onClick={onClose}
              >
                Cancel
              </button>
              {/* <button type="submit" onClick={onClose} className="bg-red-300">
                Submit
              </button> */}
            </Space>
          }
        >
          <form
            layout="vertical"
            // hideRequiredMark
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center justify-center  h-[100%] "
          >
            <Row gutter={16}>
              <Col span={12}>
                <input
                  className="infoInput w-[300px] text-orange-400 shadow-md shadow-purple-300"
                  type="text"
                  name="name"
                  // label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  placeholder="Please enter your name"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <input
                  className="infoInput my-5 w-[300px] text-orange-400 shadow-md  shadow-purple-300"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  placeholder="Please enter your Email"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <input
                  className="infoInput w-[300px] text-orange-400  shadow-md  shadow-purple-300"
                  name="mobile"
                  label="Phone Number"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                  placeholder="Please enter your Phone Number"
                />
              </Col>
            </Row>
            <button
              onClick={onClose}
              type="submit"
              className="px-[22px] py-[6px] mt-5 bg-blend-overlay bg-red-400 mx-auto block  text-green shadow-lg shadow-orange-500 rounded-[20px]"
            >
              UPdate
            </button>
          </form>
        </Drawer>
      </div>
    </div>
  );
};

export default Profile;
