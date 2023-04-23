import React, { useEffect } from "react";
import GeneraInput from "../components/GeneraInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select, Space } from "antd";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createStudentId } from "../features/studentId/studentIdSlice";

const AddStudentId = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    // enableReinitialize: true,
    enableReinitialize: true,
    initialValues: {
      student_id: "",
      password: "",
    },

    // validationSchema: hostelSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(createStudentId(values));
    },
  });
  return (
    <div>
      <h3 className="text-3xl text-orange-400 mb-5 font-semibold">
        Add Student Id
        {/* {getHostelId !== undefined ? "Edit Hostel" : "Add Hostel"} */}
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex">
            <GeneraInput
              type="number"
              label="Student Id"
              name="student_id"
              val={formik.values.student_id}
              onCh={formik.handleChange("student_id")}
              onBl={formik.handleBlur("student_id")}
              placeholder="Enter student_id of Student.."
            />

            <GeneraInput
              type="text"
              label="Password"
              name="password"
              val={formik.values.password}
              onCh={formik.handleChange("password")}
              onBl={formik.handleBlur("password")}
              placeholder="Enter Password "
            />
          </div>

          <button
            type="submit"
            className="px-[22px] py-[6px] mt-4 bg-blend-overlay bg-red-400 mx-auto block  text-green shadow-lg shadow-orange-500 rounded-[20px]"
          >
            Add Student ID
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudentId;
