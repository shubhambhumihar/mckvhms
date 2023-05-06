import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { Select, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllHostels } from "../features/hostel/hostelSlice";
import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";
import {
  createBedRequest,
  resetState,
} from "../features/bedBooking/bedBookingSlice";

const ComplainModel = ({
  isModalOpen,
  handleOk,
  handleCancel,
  status,
  setStatus,
}) => {
  const [rooms, setRooms] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  // let bedBookSchema = Yup.object({
  //   name: Yup.string().required("Name is required"),
  //   email: Yup.string()
  //     .email("Invalid email address")
  //     .required("Email is required"),
  //   mobile: Yup.string().required("Mobile is required"),
  //   hostel_id: Yup.string().required("Hostel ID is required"),
  //   room_id: Yup.string().required("Room ID is required"),
  //   student_id: Yup.string().required("Student ID is required"),
  //   allotmentLetter: Yup.mixed().required("Allotment file is required"),
  // });

  const hostelState = useSelector((state) => state?.hostel?.hostel?.hostels);
  const { isLoading, isSuccess, isError, createdBedRequest } = useSelector(
    (state) => state.bedBooking
  );
  // console.log(hostelState);

  useEffect(() => {
    dispatch(getAllHostels());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && createdBedRequest) {
      toast.success("Email sent to Admin Successfully for Bed request!");
    }

    if (isError) {
      toast.error("Something gone wrong!");
    }
  }, [isSuccess, isLoading, isError, createdBedRequest]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      student_id: "",
      department: "",
      semester: "",
      desc: "",
    },
    // validationSchema: bedBookSchema,
    onSubmit: (values) => {
      formik.resetForm();

      alert(JSON.stringify(values, null, 2));

      setTimeout(() => {
        dispatch(resetState());
        // navigate("/admin/room-list");
      }, 1000);
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
          // onFinish={formik.handleSubmit}
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 items-center p-10 bg-gray-100"
        >
          <h3 className="text-[1.7rem] text-purple-700  font-semibold">
            Complain <span className="text-gray-600 text-[1.4rem]">Box</span>
          </h3>
          <div className="w-full">
            <input
              type="text"
              placeholder="Name"
              className=" bg-[#ddd] py-3 w-full px-10 rounded-3xl outline-none"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
            />
          </div>
          <div className="w-full">
            <input
              type="email"
              placeholder="Email"
              className=" bg-[#ddd] py-3 w-full px-10 rounded-3xl outline-none"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Mobile"
              className=" bg-[#ddd] py-3 w-full px-10 rounded-3xl outline-none"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange("mobile")}
              onBlur={formik.handleBlur("mobile")}
            />
          </div>
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
              type="text"
              placeholder="Department"
              className=" bg-[#ddd] py-3 w-full px-10 rounded-3xl outline-none"
              name="department"
              value={formik.values.department}
              onChange={formik.handleChange("department")}
              onBlur={formik.handleBlur("department")}
            />
          </div>
          <div className="w-full">
            <input
              type="number"
              placeholder="Semester"
              className=" bg-[#ddd] py-3 w-full px-10 rounded-3xl outline-none"
              name="semester"
              value={formik.values.semester}
              onChange={formik.handleChange("semester")}
              onBlur={formik.handleBlur("semester")}
            />
          </div>
          <div className="w-full">
            <div class="col-span-full">
              <div class="mt-2">
                <textarea
                  placeholder="Write your Query here.."
                  id="about"
                  name="about"
                  rows="3"
                  class="block bg-transparent w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>
          </div>

          <button
            onClick={handleCancel}
            type="submit"
            className="px-[20px] w-1/2  mt-3  py-2 bg-purple-600 text-white rounded-3xl"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ComplainModel;
