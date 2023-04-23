import React, { useState } from "react";
import GeneraInput from "../components/GeneraInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select, Space } from "antd";
import { message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const option = [
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
  const [desc, setDesc] = useState("");
  const handleDesc = (e) => {
    setDesc(e);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <h3 className="text-3xl text-orange-400 mb-5 font-semibold">
        Add Student
      </h3>
      <div>
        <form action="">
          <div className="flex">
            <GeneraInput
              type="text"
              label="Name"
              placeholder="Enter Name of Student..."
            />
            <GeneraInput
              type="email"
              label="Email."
              placeholder="Enter email.. "
            />
          </div>
          <div className="flex">
            <GeneraInput
              type="text"
              label="Course"
              placeholder="Enter course of student.."
            />
            <GeneraInput
              type="text"
              label="Batch "
              placeholder="Enter Batch of Student"
            />
          </div>

          <div className="flex">
            <GeneraInput
              type="number"
              label="Semester"
              placeholder="Enter Semester of student.."
            />
            <GeneraInput
              type="number"
              label="Contact Number "
              placeholder="Enter Contact of Student"
            />
          </div>

          <div className="flex">
            <GeneraInput
              type="text"
              label="Address"
              placeholder="Enter Address of student.."
            />
            <GeneraInput
              type="number"
              label="Parents Contact  "
              placeholder="Enter Parent's contact number of Student"
            />
          </div>

          <div className="flex justify-start ml-4">
            <Select
              showSearch
              style={{ width: 300, margin: "1rem 0" }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={option}
            />
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
