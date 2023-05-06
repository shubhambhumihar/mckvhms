import React, { useEffect } from "react";
import GeneraInput from "../components/GeneraInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../features/auth/authSlice";
import { Space, Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let userSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please Enter a valid Email")
      .required("Email is Required"),
    password: Yup.string().required("Password is required!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values));
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const authState = useSelector((state) => state);

  const { user, isLoading, isError, isSuccess, message } = authState?.auth;

  useEffect(() => {
    if (user?.token) {
      // toast("Wow so easy!");
      navigate("admin");
    } else {
      navigate("/");
    }
    // console.log(user);
  }, [user, isLoading, isError, isSuccess, navigate]);
  // console.log(user);
  return (
    <div className="py-5 bg-[#F5EBEB] min-h-[100vh] grid lg:grid-cols-2 items-center justify-center  border-red-500">
      <div className=" mx-auto">
        <lottie-player
          src="https://assets2.lottiefiles.com/packages/lf20_hy4txm7l.json"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay
        ></lottie-player>
      </div>
      {isLoading ? (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      ) : (
        <div className="my-5 border lg:w-[30vw] bg-[#BFACE2] rounded-xl mx-auto p-5 lg:ml-10 pb-8 shadow-xl shadow-orange-200">
          <h1 className="text-[2rem] mb- font-bold text-[#121212]">Login</h1>

          <div className="text-center">
            {message.message === "Rejected"
              ? "You are not allowed to Access this as You are not an Admin"
              : ""}
          </div>

          <form onSubmit={formik.handleSubmit}>
            <GeneraInput
              type="text"
              placeholder="Your Email"
              id="email"
              name="email"
              label="Email"
              val={formik.values.email}
              onCh={formik.handleChange("email")}
            />

            <div className="text-red-500 mb-0 p-0 text-sm">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>

            <GeneraInput
              type="password"
              placeholder="Your Password"
              id="pass"
              name="password"
              label="Password"
              val={formik.values.password}
              onCh={formik.handleChange("password")}
            />
            <div className="text-red-500 mb-0 p-0 text-sm">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="text-end">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 my-6 hover:text-purple-600  border-b-2 border-white"
              >
                Forgot Password
              </Link>
            </div>
            <button
              type="submit"
              className="px-[20px] w-full bg-orange-400 text-white  py-[5px] text-center  rounded-xl my-4  "
            >
              Login
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;
