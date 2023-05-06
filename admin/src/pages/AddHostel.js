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

import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  createHostels,
  getAHostel,
  resetState,
  updateAHostel,
} from "../features/hostels/hostelSlice";
import { useState } from "react";

const AddHostel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const getHostelId = location.pathname.split("/")[3];
  // console.log(getHostelId);

  let hostelSchema = Yup.object().shape({
    hostel_name: Yup.string()
      .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid name")
      .required("Hostel name is Required..."),
    hostel_type: Yup.string()
      .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid type")
      .required("Hostel type is Required..."),
    desc: Yup.string()
      .matches(
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        "Invalid Decription"
      )
      .required("Description is Required..."),
    capacity: Yup.number()
      .typeError("Invalid Capacity")
      .positive("Capacity must be positive")
      .integer("Capacity must be an integer")
      .required("Capacity is Required..."),
    number_of_rooms: Yup.number()
      .typeError("Invalid Number of Rooms")
      .positive("Number of Rooms must be positive")
      .integer(" Number of Rooms must be an integer")
      .required("Number of rooms is Required..."),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number")
      .required("Phone Number is Required..."),
  });

  const hostelState = useSelector((state) => state.hostel);

  const onDrop = (acceptedFiles) => {
    // console.log("ondrop called");
    setLoading(true);
    // console.log(loading);

    dispatch(uploadImg(acceptedFiles));
    setLoading(false);
    // console.log(loading);
  };

  const {
    isSuccess,
    isLoading,
    isError,
    createHostel,
    hostelName,
    hostelType,
    description,
    capacity,
    NumberOfRooms,
    Availability,
    hostelImages,
    phone,
    updatedHostel,
  } = hostelState;

  useEffect(() => {
    if (getHostelId !== undefined) {
      dispatch(getAHostel(getHostelId));
    } else {
      dispatch(resetState());
    }
  }, [getHostelId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      hostel_name: hostelName || "",
      hostel_type: hostelType || "",
      desc: description || "",
      number_of_rooms: NumberOfRooms || "",
      phone: phone || "",
      availability: Availability || "",
      capacity: capacity || "",
      images: "",
    },

    validationSchema: hostelSchema,
    onSubmit: (values) => {
      // console.log(values);
      if (getHostelId !== undefined) {
        const data = { id: getHostelId, hosteldata: values };
        dispatch(updateAHostel(data));
        dispatch(resetState());
      } else {
        dispatch(createHostels(values));
        formik.resetForm();
        setTimeout(() => {
          // dispatch(resetState());
          navigate("/admin/hostel-list");
        }, 300);
      }

      alert(JSON.stringify(values, null, 2));
    },
  });

  const imgStateforloading = useSelector((state) => state.upload);

  const imgState = useSelector((state) => state.upload.images.urls);
  // console.log(imgState);
  // console.log(img);
  const img = [];

  useEffect(() => {
    // console.log(hostelImages, imgState);
    imgState?.forEach((i) => {
      img.push({
        public_id: i.public_id,
        url: i.url,
      });
    });

    // console.log(img);
    formik.values.images = img;
    // console.log(formik.values.images);
  }, [imgState]);

  useEffect(() => {
    if (isSuccess && createHostel) {
      toast.success("Hostel Added Successfully!");
    }
    if (isSuccess && updatedHostel) {
      toast.success("Hostel Updated Successfully!");
      navigate("/admin/hostel-list");
    }
    if (isError) {
      toast.error("Something gone wrong!");
    }
  }, [isSuccess, isLoading, isError, createHostel, navigate, updatedHostel]);
  // console.log(imgState);

  return (
    <div>
      <h3 className="text-3xl text-orange-400 mb-5 font-semibold">
        {getHostelId !== undefined ? "Edit Hostel" : "Add Hostel"}
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex">
            <div className="flex flex-col w-full">
              <GeneraInput
                className="w-full"
                type="text"
                label="Name"
                name="hostel_name"
                val={formik.values.hostel_name}
                onCh={formik.handleChange("hostel_name")}
                onBl={formik.handleBlur("hostel_name")}
                placeholder="Enter Name of hostel.."
              />
              <div className="text-red-500 mb-0 p-0 text-sm">
                {formik.touched.hostel_name && formik.errors.hostel_name ? (
                  <div>{formik.errors.hostel_name}</div>
                ) : null}
              </div>
            </div>

            <div className="w-full flex flex-col ">
              <GeneraInput
                type="text"
                label="Hostel type"
                name="hostel_name"
                val={formik.values.hostel_type}
                onCh={formik.handleChange("hostel_type")}
                onBl={formik.handleBlur("hostel_type")}
                placeholder="Enter Type of Hostel"
              />
              <div className="text-red-500 mb-0 p-0 text-sm">
                {formik.touched.hostel_type && formik.errors.hostel_type ? (
                  <div>{formik.errors.hostel_type}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-full flex flex-col ">
              <GeneraInput
                type="number"
                label="Number of Rooms"
                name="number_of_rooms"
                val={formik.values.number_of_rooms}
                onCh={formik.handleChange("number_of_rooms")}
                onBl={formik.handleBlur("number_of_rooms")}
                placeholder="Enter total Number of Rooms"
              />
              <div className="text-red-500 mb-0 p-0 text-sm">
                {formik.touched.number_of_rooms &&
                formik.errors.number_of_rooms ? (
                  <div>{formik.errors.number_of_rooms}</div>
                ) : null}
              </div>
            </div>

            <div className="w-full flex flex-col ">
              <GeneraInput
                type="number"
                label="Contact Number "
                name="phone"
                val={formik.values.phone}
                onCh={formik.handleChange("phone")}
                onBl={formik.handleBlur("phone")}
                placeholder="Enter Phone number of Hostel..."
              />
              <div className="text-red-500 mb-0 p-0 text-sm">
                {formik.touched.phone && formik.errors.phone ? (
                  <div>{formik.errors.phone}</div>
                ) : null}
              </div>
            </div>
          </div>

          <div>
            <h2 className="mt-4 ml-5 text-purple-400 text-[1rem] font-semibold">
              Description
            </h2>
            <ReactQuill
              className=""
              type="text"
              theme="snow"
              name="desc"
              // {...getFieldProps("desc")}
              value={formik.values.desc}
              // onChange={(value) => formik.setFieldValue("desc", value)}
              onChange={formik.handleChange("desc")}
              // onBlur={formik.handleBlur("desc")}
            />
          </div>
          <div className="text-red-500 mb-0 p-0 text-sm">
            {formik.touched.desc && formik.errors.desc ? (
              <div>{formik.errors.desc}</div>
            ) : null}
          </div>

          <GeneraInput
            type="number"
            label="Max Capacity"
            name="capacity"
            val={formik.values.capacity}
            onCh={formik.handleChange("capacity")}
            onBl={formik.handleBlur("capacity")}
            placeholder="Enter Capacity of Hostel"
          />
          <div className="text-red-500 mb-0 p-0 text-sm">
            {formik.touched.capacity && formik.errors.capacity ? (
              <div>{formik.errors.capacity}</div>
            ) : null}
          </div>

          <div className="flex justify-start ml-4">
            <Space wrap className="w-100  text-black-200">
              <Select
                // defaultValue={formik.values.availability}
                style={{
                  width: 400,
                  padding: "0.9rem 0",
                  marginLeft: "0 auto",
                  marginRight: "5rem",
                  color: "red",
                }}
                name="availability"
                placeholder="Availability"
                onChange={(value) =>
                  formik.setFieldValue("availability", value)
                }
                // onChange={handleChange}

                value={formik.values.availability}
                // onChange={formik.handleChange("availability")}
                onBlur={formik.handleBlur("availability")}
                options={[
                  {
                    value: "",
                    label: "Availablity",
                    render: (text) => String(text),
                  },
                  {
                    value: true,
                    label: "Yes",
                    render: (text) => String(text),
                  },
                  {
                    value: false,
                    label: "No",
                    render: (text) => String(text),
                  },
                ]}
              />
            </Space>
          </div>

          <div className="my-4 w-[100%] mx-auto rounded-3xl  text-center bg-gray-400 cursor-pointer p-14">
            <Dropzone onDrop={onDrop}>
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

          {/* <div className="showImgs flex flex-wrap gap-3">
            {console.log(formik.values.images)}
            {formik &&
              formik.values &&
              formik.values.images &&
              formik.values.images.map((imgs, j) => (
                <div key={j} className="relative">
                  {console.log(imgs)}
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
          </div> */}

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
            className="px-[22px] py-[6px] mt-4 bg-blend-overlay bg-red-400 mx-auto block  text-green shadow-lg shadow-orange-500 rounded-[20px]"
          >
            {getHostelId !== undefined ? "Edit Hostel" : "Add Hostel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHostel;
