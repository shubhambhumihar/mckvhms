import React from "react";
import { Button, Modal } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginAsStudent } from "../features/auth/authSlice";

const StudentLoginModal = ({ isModalOpen, handleOk, handleCancel }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      student_id: "",
      password: "",
    },
    // validationSchema: bedBookSchema,
    onSubmit: (values) => {
      //  formik.resetForm();
      dispatch(loginAsStudent(values));

      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 items-center p-10 bg-gray-100"
        >
          <h3 className="text-[1.7rem] text-purple-700  font-semibold">
            Log <span className="text-gray-600 text-[1.4rem]">In</span>
          </h3>

          <div className="w-full">
            <input
              type="text"
              placeholder="Student ID"
              className=" bg-[#ddd] py-3 w-full px-10 rounded-3xl outline-none"
              name="student_id"
              value={formik.values.student_id}
              onChange={formik.handleChange("student_id")}
              onBlur={formik.handleBlur("student_id")}
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Password"
              className=" bg-[#ddd] py-3 w-full px-10 rounded-3xl outline-none"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
            />
          </div>

          <button
            type="submit"
            className="px-[20px] w-1/2  mt-3  py-2 bg-orange-400 text-white rounded-3xl"
          >
            Login
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default StudentLoginModal;
