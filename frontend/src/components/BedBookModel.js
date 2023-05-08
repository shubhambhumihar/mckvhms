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
  getStudentBedRequests,
  resetState,
} from "../features/bedBooking/bedBookingSlice";

const BedBookModel = ({
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
      hostel_id: "",
      room_id: "",

      allotmentLetter: null,
    },
    // validationSchema: bedBookSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("student_id", values.student_id);
      formData.append("hostel_id", values.hostel_id);
      formData.append("room_id", values.room_id);
      formData.append("allotmentLetter", values.allotmentLetter);

      dispatch(createBedRequest(formData));

      setStatus("pending");

      formik.resetForm();

      alert(JSON.stringify(values, null, 2));

      // setTimeout(() => {
      //   dispatch(resetState());

      //   // navigate("/admin/room-list");
      // }, 1000);
    },
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    // console.log(event.target.files[0]);
    const file = event.target.files[0];
    formik.setFieldValue("allotmentLetter", file);
  };

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
            Book <span className="text-gray-600 text-[1.4rem]">Ing</span>
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
          <div className="flex justify-center ">
            <Space wrap className="w-100 mx-auto flex justify-center">
              <Select
                className="mySelect"
                defaultValue="Which Hostel"
                style={{
                  width: 385,
                  borderRadius: "1.5rem",
                  outline: "none",
                  marginLeft: "0 auto",
                  backgroundColor: "#ddd",
                  //   marginRight: "5rem",
                }}
                name="hostel"
                placeholder="Select hostel"
                onChange={(value) => {
                  formik.setFieldValue("hostel_id", value);
                  const room = hostelState?.find(
                    (hostel) => hostel._id === value
                  ).rooms;

                  setRooms(room);
                }}
                options={hostelState?.map((hostel) => {
                  return {
                    value: hostel._id,
                    label: hostel.hostel_name,
                  };
                })}
              />
            </Space>
          </div>
          <div className="flex justify-center ">
            <Space wrap className="w-100 mx-auto flex justify-center">
              <Select
                className="mySelect"
                defaultValue="Which Room"
                style={{
                  width: 385,
                  borderRadius: "1.5rem",
                  outline: "none",
                  marginLeft: "0 auto",
                  backgroundColor: "#ddd",
                  //   marginRight: "5rem",
                }}
                name="room"
                placeholder="Select Room"
                onChange={(value) => formik.setFieldValue("room_id", value)}
                options={rooms?.map((room) => {
                  return {
                    value: room._id,
                    label: room.roomNumber,
                  };
                })}
              />
            </Space>
          </div>
          <div className="flex justify-center  w-full">
            <div className="custom-file-upload-container">
              <div className="custom-file-upload">
                <input
                  id="allotmentLetter"
                  name="allotmentLetter"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleCancel}
            type="submit"
            className="px-[20px] w-1/2  mt-3  py-2 bg-purple-600 text-white rounded-3xl"
          >
            Book Bed
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default BedBookModel;

// <Space direction="vertical" style={{}} size="large">
//   <Upload {...uploadProps}>
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         // border: "2px solid orange",
//         padding: "0.5rem 3rem",
//         borderRadius: "1.2rem",
//         margin: "2rem 0 0 0 ",
//         background: "#121212",
//         color: "white",
//       }}
//     >
//       {renderUploadIcon()}
//       <span style={{ marginLeft: 8 }}>Upload Allotement Leter</span>
//     </div>
//   </Upload>
// </Space>;
