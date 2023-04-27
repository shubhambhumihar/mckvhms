import React, { useEffect, useState } from "react";
import GeneraInput from "../components/GeneraInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select, Space } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAllHostels } from "../features/hostels/hostelSlice";
import { getBedsOfRoom } from "../features/room/roomSlice";
import { createStudent } from "../features/student/studentSlice";

const option = [
  {
    value: "",
    label: "Gender",
  },
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
    label: "Other",
  },
];

const AddStudent = () => {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);
  // const [beds, setBeds] = useState([]);

  const hostelState = useSelector((state) => state.hostel.hostels.hostels);
  const { bedsOfRoom } = useSelector((state) => state.room);
  const beds = bedsOfRoom?.beds;
  // console.log(bedsOfRoom.beds);

  useEffect(() => {
    dispatch(getAllHostels());
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      gender: "",
      course: "",
      batch: "",
      department: "",
      semester: "",
      contactNumber: "",
      parentContactNumber: "",
      address: "",
      student_id: "",
    },
    // validationSchema: ,
    onSubmit: (values) => {
      dispatch(createStudent(values));
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <h3 className="text-3xl text-orange-400 mb-5 font-semibold">
        Add Student
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex">
            <GeneraInput
              type="text"
              label="Name"
              placeholder="Enter Name of Student..."
              name="name"
              val={formik.values.name}
              onCh={formik.handleChange("name")}
              onBl={formik.handleBlur("name")}
            />
            <GeneraInput
              type="email"
              label="Email."
              placeholder="Enter email.. "
              name="email"
              val={formik.values.email}
              onCh={formik.handleChange("email")}
              onBl={formik.handleBlur("email")}
            />
          </div>
          <div className="flex">
            <GeneraInput
              type="text"
              label="Course"
              placeholder="Enter course of student.."
              name="course"
              val={formik.values.course}
              onCh={formik.handleChange("course")}
              onBl={formik.handleBlur("course")}
            />
            <GeneraInput
              type="text"
              label="Batch "
              placeholder="Enter Batch of Student"
              name="batch"
              val={formik.values.batch}
              onCh={formik.handleChange("batch")}
              onBl={formik.handleBlur("batch")}
            />
          </div>

          <div className="flex">
            <GeneraInput
              type="number"
              label="Semester"
              placeholder="Enter Semester of student.."
              name="semester"
              val={formik.values.semester}
              onCh={formik.handleChange("semester")}
              onBl={formik.handleBlur("semester")}
            />
            <GeneraInput
              type="number"
              label="Contact Number "
              placeholder="Enter Contact of Student"
              name="contactNumber"
              val={formik.values.contactNumber}
              onCh={formik.handleChange("contactNumber")}
              onBl={formik.handleBlur("contactNumber")}
            />
          </div>

          <div className="flex">
            <GeneraInput
              type="text"
              label="Address"
              placeholder="Enter Address of student.."
              name="address"
              val={formik.values.address}
              onCh={formik.handleChange("address")}
              onBl={formik.handleBlur("address")}
            />
            <GeneraInput
              type="number"
              label="Parents Contact  "
              placeholder="Enter Parent's contact number of Student"
              name="parentContactNumber"
              val={formik.values.parentContactNumber}
              onCh={formik.handleChange("parentContactNumber")}
              onBl={formik.handleBlur(" parentContactNumber")}
            />
          </div>
          <div className="flex">
            <GeneraInput
              type="number"
              label="Student Id"
              placeholder="Enter student id.."
              name="student_id"
              val={formik.values.student_id}
              onCh={formik.handleChange("student_id")}
              onBl={formik.handleBlur("student_id")}
            />
            <GeneraInput
              type="text"
              label="Department  "
              placeholder="Enter Department"
              name="department"
              val={formik.values.department}
              onCh={formik.handleChange("department")}
              onBl={formik.handleBlur("department")}
            />
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
                onChange={(value) => {
                  formik.setFieldValue("gender", value);
                }}
                value={formik.values.gender}
                options={option}
              />
            </Space>
          </div>

          <div className="flex justify-start ml-4">
            <Space wrap className="w-100">
              <Select
                defaultValue="Which Hostel"
                style={{
                  width: 400,
                  padding: "0.9rem 0",
                  marginLeft: "0 auto",
                  marginRight: "5rem",
                }}
                name="hostel_id"
                placeholder="Select hostel"
                onChange={(value) => {
                  formik.setFieldValue("hostel_id", value);
                  const room = hostelState?.find(
                    (hostel) => hostel._id === value
                  ).rooms;

                  // console.log(room);
                  setRooms(room);
                }}
                options={hostelState?.map((hostel) => {
                  // console.log(hostel);
                  return {
                    value: hostel._id,
                    label: hostel.hostel_name,
                  };
                })}
              />
            </Space>
          </div>

          <div className="flex justify-start ml-4">
            <Space wrap className="w-100">
              <Select
                defaultValue="Which Room"
                style={{
                  width: 400,
                  padding: "0.9rem 0",
                  marginLeft: "0 auto",
                  marginRight: "5rem",
                }}
                name="room_id"
                placeholder="Which Room"
                onChange={(value) => {
                  formik.setFieldValue("room_id", value);
                  // console.log(value);
                  dispatch(getBedsOfRoom(value));
                }}
                options={rooms?.map((room, id) => {
                  // console.log(room);
                  return {
                    value: room?._id,
                    label: room?.roomNumber,
                  };
                })}
              />
            </Space>
          </div>
          <div className="flex justify-start ml-4">
            <Space wrap className="w-100">
              <Select
                defaultValue="Which Bed"
                style={{
                  width: 400,
                  padding: "0.9rem 0",
                  marginLeft: "0 auto",
                  marginRight: "5rem",
                }}
                name="bed_id"
                placeholder="Which Bed"
                onChange={(value) => {
                  formik.setFieldValue("bed_id", value);
                  // console.log(value);
                }}
                options={beds?.map((bed, id) => {
                  // console.log(room);
                  return {
                    value: bed?._id,
                    label: bed?.bed_number,
                  };
                })}
              />
            </Space>
          </div>

          <button
            type="submit"
            className="px-[22px] py-[6px] mt-4 bg-blend-overlay bg-red-400 mx-auto block  text-green shadow-lg shadow-orange-500 rounded-[20px]"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
