import React, { useState } from "react";
import GeneraInput from "../components/GeneraInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select, Space } from "antd";

import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const BlogAdd = () => {
  const [desc, setDesc] = useState("");
  const handleDesc = (e) => {
    setDesc(e);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

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

  return (
    <div>
      <h3 className="text-3xl text-orange-400 mb-5">Add Room</h3>

      <div>
        <form action="">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>

          <div className="mt-5">
            <GeneraInput type="text" placeholder="Enter Blog Title" />
          </div>

          <Space wrap>
            <Select
              defaultValue="Select Blog Category"
              style={{
                width: 400,
                padding: "0.9rem 0",
                marginBottom: "1rem",
              }}
              onChange={handleChange}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
                {
                  value: "disabled",
                  label: "Disabled",
                  disabled: true,
                },
              ]}
            />
          </Space>

          <ReactQuill
            theme="snow"
            value={desc}
            onChange={(e) => handleDesc(e)}
          />
          <div className="flex justify-center my-5">
            <button
              type="submit"
              className="px-[22px] py-[6px] bg-blend-overlay bg-red-400 mx-auto inline-block  text-green shadow-lg shadow-orange-500 rounded-[20px]"
            >
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogAdd;
