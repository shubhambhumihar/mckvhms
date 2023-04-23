import React, { useEffect, useState } from "react";
import { logo } from "../../assets";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../features/auth/authSlice";
import { FcGoogle } from "react-icons/fc";
let userSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please Enter a valid Email")
    .required("Email is Required"),
  password: Yup.string().required("Password is required!"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.auth);

  const { user, isLoading, isSuccess, isError } = userState;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (user && isSuccess) {
      navigate("/");
    }
  }, [user, isSuccess]);
  return (
    <div className="flex flex-wrap md:my-0 sm:my-9 my-2   justify-center items-center  sm:h-[100vh] xs:h-[70vh]  sm:gap-8 xs:gap-6 gap-6  ">
      <div className="authLeft md:my-0 sm:my-2  xs:my-3 my-4 flex justify-center md:gap-2 sm:gap-3  xs:gap-3 gap-2">
        <img
          className="md:w-16 md:h-10 sm:w-12 sm:h-12 w-9 h-9 object-contain"
          src={logo}
          alt=""
        />
        <div>
          <h1 className="text-bold md:text-2xl sm:text-lg text-md text-purple-600 font-bold">
            Ramgarh Engineering College
          </h1>
          <h5 className="text-gray-300 text-[0.8rem]">
            A premium Institite for BTECH...
          </h5>
        </div>
      </div>
      <div className="authRight shadow-sm shadow-orange-800 py-6">
        <form
          onSubmit={formik.handleSubmit}
          className="infoForm  sm:w-[500px] xs:w-[300px]  authForm flex flex-col justify-center items-center gap-3"
        >
          <h3 className="text-[1.7rem] text-purple-700  font-semibold">
            Log <span className="text-white text-[1.2rem]">In</span>
          </h3>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="infoInput"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
            />
          </div>
          <div className="text-red-500 mb-0 p-0 text-sm">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password "
              className="infoInput"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
            />
          </div>
          <div className="text-red-500 mb-0 p-0 text-sm">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>

          <div>
            <Link to="../auth">
              <span className="text-[12px] font-light text-gray-400 cursor-pointer">
                Don't have an account? Sign up
              </span>
            </Link>
          </div>
          <button
            type="submit"
            className="px-[60px] py-[6px] w-[80%] border text-[0.9rem] bg-purple-900 text-white rounded-2xl hover:scale-90 duration-700 hover:text-white hover:border-orange-500 shadow-2xl shadow-red-400"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "  Log In"}
          </button>
        </form>
        <div className="grid grid-cols-3 items-center text-gray-300 m-0">
          <hr className="border-gray-500" />
          <p className="text-center">OR</p>
          <hr className="border-gray-500" />
        </div>
        <button className="bg-white border py-2 w-[80%] mx-auto rounded-xl  my-5 text-black-200 flex justify-center items-center gap-2 ">
          <span>
            <FcGoogle className="text-2xl" />
          </span>
          Signup With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
