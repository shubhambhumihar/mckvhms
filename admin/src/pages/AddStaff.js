import React, { useEffect } from "react";
import GeneraInput from "../components/GeneraInput";

import "react-quill/dist/quill.snow.css";
import { Select, Space } from "antd";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import {
  createStaffs,
  getAStaff,
  resetState,
  updateAStaff,
} from "../features/staff/staffSlice";

const AddStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getStaffId = location.pathname.split("/")[3];
  // console.log(getStaffId);

  // const imgState = useSelector((state) => state.upload.images.urls);
  const staffState = useSelector((state) => state.staff);
  const {
    isSuccess,
    isLoading,
    isError,
    staffCreated,
    staffName,
    staffEmail,
    staffGender,
    staffDepartment,
    staffContactNumber,

    updatedStaff,
  } = staffState;

  let staffSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        "Invalid staff name"
      )
      .required("Staff name is Required..."),
    email: Yup.string()
      .email("Please Enter a valid Email")
      .required("Staff Email is Required..."),
    gender: Yup.string()
      .matches(
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        "Invalid staff gender"
      )
      .required("Staff Gender is Required..."),
    department: Yup.string()
      .matches(
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        "Invalid Department name"
      )
      .required("Staff Department is Required..."),
    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number")
      .required("Contact number is Required..."),
  });

  const formik = useFormik({
    initialValues: {
      name: staffName || "",
      email: staffEmail || "",
      gender: staffGender || "",
      department: staffDepartment || "",
      contactNumber: staffContactNumber || "",

      images: "",
    },
    enableReinitialize: true,
    validationSchema: staffSchema,
    onSubmit: (values) => {
      if (getStaffId !== undefined) {
        const data = { id: getStaffId, staffdata: values };
        dispatch(updateAStaff(data));
        dispatch(resetState());
      } else {
        dispatch(createStaffs(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/staff-list");
        }, 300);
      }

      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (getStaffId !== undefined) {
      dispatch(getAStaff(getStaffId));
      // img.push(staffImg);
      // console.log(img);
    } else {
      dispatch(resetState());
    }
  }, [getStaffId, dispatch]);

  const imgStateforloading = useSelector((state) => state.upload);
  const imgState = useSelector((state) => state.upload.images.urls);
  const img = [];

  useEffect(() => {
    imgState?.forEach((i) => {
      img.push({
        public_id: i.public_id,
        url: i.url,
      });
    });

    formik.values.images = img;
    console.log(formik.values.images);
  }, [imgState]);

  useEffect(() => {
    if (isSuccess && staffCreated) {
      toast.success("Staff Added Successfully!");
    }
    if (isSuccess && updatedStaff) {
      toast.success("Staff Updated Successfully!");
      navigate("/admin/staff-list");
    }
    if (isError) {
      toast.error("Something gone wrong!");
    }
  }, [isSuccess, isLoading, isError, staffCreated, updatedStaff, navigate]);
  return (
    <div>
      <h3 className="text-3xl text-orange-400 mb-5 font-semibold">
        {getStaffId !== undefined ? "Update " : "Add "}
        Staff
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex">
            <div className="flex flex-col w-full">
              <GeneraInput
                type="text"
                label="Name"
                name="name"
                val={formik.values.name}
                onCh={formik.handleChange("name")}
                onBl={formik.handleBlur("name")}
                placeholder="Enter Name of Staff.."
              />
              <div className="text-red-500 mb-0 p-0 text-sm">
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col w-full">
              <GeneraInput
                type="text"
                label="Email"
                name="email"
                val={formik.values.email}
                onCh={formik.handleChange("email")}
                onBl={formik.handleBlur("email")}
                placeholder="Enter Email of Staff.."
              />
              <div className="text-red-500 mb-0 p-0 text-sm">
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col w-full">
              <GeneraInput
                type="number"
                label="Number"
                name="contactNumber"
                val={formik.values.contactNumber}
                onCh={formik.handleChange("contactNumber")}
                onBl={formik.handleBlur("contactNumber")}
                placeholder="Enter Number of Staff.."
              />
              <div className="text-red-500 mb-0 p-0 text-sm">
                {formik.touched.contactNumber && formik.errors.contactNumber ? (
                  <div>{formik.errors.contactNumber}</div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <GeneraInput
                type="text"
                label="Department"
                name="department"
                val={formik.values.department}
                onCh={formik.handleChange("department")}
                onBl={formik.handleBlur("department")}
                placeholder="Enter Department of Staff.."
              />
              <div className="text-red-500 mb-0 p-0 text-sm">
                {formik.touched.department && formik.errors.department ? (
                  <div>{formik.errors.department}</div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex justify-start ml-4">
            <Space wrap className="w-100">
              <Select
                defaultValue="Gender"
                style={{
                  width: 400,
                  padding: "0.9rem 0",
                  marginLeft: "0 auto",
                  marginRight: "5rem",
                }}
                name="gender"
                placeholder="Gender"
                onChange={(value) => formik.setFieldValue("gender", value)}
                options={[
                  {
                    value: "male",
                    label: "Male",
                  },
                  {
                    value: "female",
                    label: "Female",
                  },
                  {
                    value: "other",
                    label: "Others",
                  },
                ]}
              />
            </Space>
          </div>

          <div className="my-4 w-[100%] mx-auto rounded-3xl  text-center bg-gray-400 cursor-pointer p-14">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className="text-white ">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          {imgStateforloading.isLoading ? (
            <div className="flex justify-center ">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="showImgs flex flex-wrap gap-3">
              {imgState?.map((imgs, j) => (
                <div key={j} className="relative">
                  <button
                    type="button"
                    className="absolute top-2 right-3 text-lg text-black font-bold "
                    onClick={() => dispatch(deleteImg(imgs.public_id))}
                  >
                    {<AiOutlineClose />}{" "}
                  </button>
                  <img height={230} width={230} src={imgs.url} alt="" />
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="px-[22px] py-[6px] mt-4 bg-blend-overlay bg-red-400 mx-auto block  text-green shadow-lg shadow-orange-500 rounded-[20px]"
          >
            {getStaffId !== undefined ? "Update " : "Add "}
            Staff
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
