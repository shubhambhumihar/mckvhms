import React, { useEffect, useState } from "react";
import { logo } from "../../assets";
import { useFormik, setFieldValue } from "formik";
import * as Yup from "yup";
import zxcvbn from "zxcvbn";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";

import Dropzone from "react-dropzone";
import { HiOutlineUpload } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

let userSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid name")
    .required("Name is required"),
  email: Yup.string()
    .email("Please Enter a valid Email")
    .required("Email is Required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid mobile number")
    .required("Mobile number is required"),
  password: Yup.string()
    .test(
      "password-strength",
      "Password is weak, please make a stronger one",
      function (value) {
        return zxcvbn(value).score >= 3;
      }
    )
    .required("Password is required!"),
});

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [isSignUp, setIsSignuP] = useState(true);

  const userState = useSelector((state) => state.auth);

  const { user, isLoading, isSuccess, isError } = userState;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
      picture: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("picturePath", values.picture.name);

      dispatch(registerUser(formData));
      formik.resetForm();
      alert(JSON.stringify(values, null, 2));
    },
  });

  // const passwordStrength = zxcvbn(password);

  useEffect(() => {
    if (user && isSuccess) {
      navigate("/");
    }
  }, [user, isSuccess]);
  return (
    <section class=" dark:bg-gray-900 ">
      <div class="flex  items-center justify-center px-6 py-8 gap-5 mx-auto md:h-screen lg:py-0">
        <div className="authLeft md:flex hidden md:my-0 my-4  justify-center gap-2 ">
          <img
            className=" md:w-14 md:h-10 w-11 h-11 object-contain"
            src={logo}
            alt=""
          />
          <div>
            <h1 className="text-bold md:text-2xl text-lg text-purple-600 font-bold">
              Ramgarh Engineering College
            </h1>
            <h5 className="text-gray-300 text-[0.8rem]">
              A premium Institite for BTECH...
            </h5>
          </div>
        </div>

        <div class="w-full  rounded-lg shadow-md shadow-purple-400 dark:border md:mt-10 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
              <span class="text-purple-600 italic">Create</span> Account
            </h1>
            <form class="space-y-2 md:space-y-3" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Name"
                    className="infoInput "
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                  />
                  <div className="text-red-500 mb-0 p-0 text-sm ">
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-left">{formik.errors.name}</div>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-col">
                  <input
                    type="number"
                    placeholder="Phone Number"
                    className="infoInput"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                  />
                  <div className="text-red-500 mb-0 p-0 text-sm">
                    {formik.touched.mobile && formik.errors.mobile ? (
                      <div>{formik.errors.mobile}</div>
                    ) : null}
                  </div>
                </div>

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

                <div className="my-0 w-[100%] mx-auto rounded-3xl  text-center bg-teal-800 cursor-pointer p-1">
                  <Dropzone
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      formik.setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          {!formik.values.picture ? (
                            <p className="text-gray-200 text-[0.9rem] w-full flex justify-center items-center gap-1 ">
                              {" "}
                              Upload picture
                              <span>
                                <HiOutlineUpload className="font-bold text-xl" />
                              </span>
                            </p>
                          ) : (
                            <p>{formik.values.picture.name}</p>
                          )}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="terms"
                      class="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <Link
                        to="/terms-condition"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-purple-600"
                      >
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
                </div>
                <div>
                  <Link to="../login">
                    <p className="text-[12px] font-light text-gray-400 text-center cursor-pointer">
                      Already have an account? Log in
                    </p>
                  </Link>
                </div>
                <button
                  type="submit"
                  className="px-[60px] py-[6px] border text-[0.9rem] text-white rounded-2xl hover:scale-90 duration-700 bg-purple-800 hover:text-white hover:border-orange-500 shadow-2xl shadow-red-400"
                >
                  {isLoading ? "loading..." : "Sign Up"}
                </button>
              </div>
            </form>

            <div className="grid grid-cols-3 items-center text-gray-300 m-0">
              <hr className="border-gray-500" />
              <p className="text-center">OR</p>
              <hr className="border-gray-500" />
            </div>
            <button className="bg-white border py-2 w-full rounded-lg  text-black-200 flex justify-center items-center gap-2 ">
              <span>
                <FcGoogle className="text-2xl" />
              </span>
              Signup With Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;

// <div className="flex flex-wrap md:my-0 sm:my-9  justify-center items-center h-[100vh]  md:gap-8 ">
//   <div className="authLeft md:my-0 my-4 flex justify-center gap-6 ">
//     <img
//       className=" md:w-16 md:h-10 w-12 h-12 object-contain"
//       src={logo}
//       alt=""
//     />
//     <div>
//       <h1 className="text-bold md:text-2xl text-lg text-purple-600 font-bold">
//         Ramgarh Engineering College
//       </h1>
//       <h5 className="text-gray-300 text-[0.8rem]">
//         A premium Institite for BTECH...
//       </h5>
//     </div>
//   </div>
//   <div className="authRight bg-[#0f0f116c] ">
//     <form
//       onSubmit={formik.handleSubmit}
//       className="infoForm shadow-sm  shadow-orange-800 authForm flex flex-col justify-center items-center gap-8"
//     >
//       <h3 className="text-[1.4rem] text-purple-600 font-semibold underline">
//         Sign Up
//       </h3>

//       <div>
//         <div className="flex flex-col">
//           <input
//             type="text"
//             placeholder="Name"
//             className="infoInput"
//             name="name"
//             value={formik.values.name}
//             onChange={formik.handleChange("name")}
//             onBlur={formik.handleBlur("name")}
//           />
//           <div className="text-red-500 mb-0 p-0 text-sm ">
//             {formik.touched.name && formik.errors.name ? (
//               <div className="text-left">{formik.errors.name}</div>
//             ) : null}
//           </div>
//         </div>
//         <div className="flex flex-col">
//           <input
//             type="number"
//             placeholder="Phone Number"
//             className="infoInput"
//             name="mobile"
//             value={formik.values.mobile}
//             onChange={formik.handleChange("mobile")}
//             onBlur={formik.handleBlur("mobile")}
//           />
//           <div className="text-red-500 mb-0 p-0 text-sm">
//             {formik.touched.mobile && formik.errors.mobile ? (
//               <div>{formik.errors.mobile}</div>
//             ) : null}
//           </div>
//         </div>
//       </div>

//       <div>
//         <input
//           type="email"
//           placeholder="Email"
//           className="infoInput"
//           name="email"
//           value={formik.values.email}
//           onChange={formik.handleChange("email")}
//           onBlur={formik.handleBlur("email")}
//         />
//       </div>
//       <div className="text-red-500 mb-0 p-0 text-sm">
//         {formik.touched.email && formik.errors.email ? (
//           <div>{formik.errors.email}</div>
//         ) : null}
//       </div>
//       <div>
//         <input
//           type="password"
//           placeholder="Password "
//           className="infoInput"
//           name="password"
//           value={formik.values.password}
//           onChange={formik.handleChange("password")}
//           onBlur={formik.handleBlur("password")}
//         />
//       </div>
//       <div className="text-red-500 mb-0 p-0 text-sm">
//         {formik.touched.password && formik.errors.password ? (
//           <div>{formik.errors.password}</div>
//         ) : null}
//       </div>

//       <div className="my-0 w-[100%] mx-auto rounded-3xl  text-center bg-purple-600 cursor-pointer p-2">
//         <Dropzone
//           multiple={false}
//           onDrop={(acceptedFiles) =>
//             formik.setFieldValue("picture", acceptedFiles[0])
//           }
//         >
//           {({ getRootProps, getInputProps }) => (
//             <section>
//               <div {...getRootProps()}>
//                 <input {...getInputProps()} />
//                 {!formik.values.picture ? (
//                   <p className="text-gray-200 w-full flex items-center gap-1 ">
//                     {" "}
//                     Upload picture
//                     <span>
//                       <HiOutlineUpload className="font-bold text-xl" />
//                     </span>
//                   </p>
//                 ) : (
//                   <p>{formik.values.picture.name}</p>
//                 )}
//               </div>
//             </section>
//           )}
//         </Dropzone>
//       </div>
//       <div>
//         <Link to="../login">
//           <span className="text-[12px] font-light text-gray-400 cursor-pointer">
//             Already have an account? Log in
//           </span>
//         </Link>
//       </div>
//       <button
//         type="submit"
//         className="px-[60px] py-[6px] border text-[0.9rem] text-green-400 rounded-2xl hover:scale-90 duration-700 hover:text-white hover:border-orange-500 shadow-2xl shadow-red-400"
//       >
//         Sign Up
//       </button>
//     </form>
//   </div>
// </div>
