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

import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  createRoom,
  getARoom,
  resetState,
  updateARoom,
} from "../features/room/roomSlice";
import { getAllHostels } from "../features/hostels/hostelSlice";

const AddRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getRoomId = location.pathname.split("/")[3];
  // console.log(getRoomId);

  const imgStateforloading = useSelector((state) => state.upload);
  const hostelState = useSelector((state) => state.hostel?.hostels?.hostels);
  const roomState = useSelector((state) => state.room);
  const {
    isSuccess,
    isLoading,
    isError,
    createdRoom,
    title,
    roomNumber,
    numberOfBeds,
    description,
    price,
    capacity,
    hostelId,
    updatedRoom,
  } = roomState;
  // console.log(hostelState);

  useEffect(() => {
    dispatch(getAllHostels());
  }, [dispatch]);

  let roomSchema = Yup.object().shape({
    title: Yup.string()
      .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid name")
      .required("Please enter room title..."),
    price: Yup.number()
      .typeError("Invalid Capacity")
      .positive("Price must be positive")
      .integer("Price must be an integer")
      .required("Please enter room Price..."),

    description: Yup.string()
      // .matches(
      //   /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      //   "Invalid Description"
      // )
      .required("Please enter room Description..."),

    capacity: Yup.number()
      .typeError("Invalid Capacity")
      .positive("Capacity must be positive")
      .integer("Capacity must be an integer")
      .required("Capacity is Required..."),
    roomNumber: Yup.number()
      .typeError("Invalid Rooms Number")
      .positive("Room Number must be positive")
      .integer("Rooms Number must be an integer")
      .required("Room Number is Required..."),
    numberOfBeds: Yup.number()
      .typeError("Invalid Number Of beds")
      .positive("Number Of bed must be positive")
      .integer("Number Of bed must be an integer")
      .required("Number Of bed is Required..."),
  });

  useEffect(() => {
    if (getRoomId !== undefined) {
      dispatch(getARoom(getRoomId));
    } else {
      dispatch(resetState());
    }
  }, [getRoomId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title || "",
      price: price || "",
      roomNumber: roomNumber || "",
      numberOfBeds: numberOfBeds || "",
      description: description || "",
      capacity: capacity || "",
      hostel_id: hostelId || "",
      images: "",
    },
    validationSchema: roomSchema,
    onSubmit: (values) => {
      if (getRoomId !== undefined) {
        const data = { id: getRoomId, roomdata: values };

        dispatch(updateARoom(data));
        dispatch(resetState());
        //  setTimeout(() => {
        //    dispatch(resetState());
        //    navigate("/admin/room-list");
        //  }, 1000);
      } else {
        dispatch(createRoom(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/room-list");
        }, 1000);
      }

      alert(JSON.stringify(values, null, 2));
    },
  });
  const imgState = useSelector((state) => state.upload.images.urls);

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
    console.log(formik.values.images);
  }, [imgState]);

  useEffect(() => {
    if (isSuccess && createdRoom) {
      toast.success("Room Added Successfully!");
    }

    if (isSuccess && updatedRoom) {
      toast.success("Room Updated Successfully!");
      // navigate("/admin/room-list");
    }

    if (isError) {
      toast.error("Something gone wrong!");
    }
  }, [isSuccess, isLoading, isError, createdRoom, updatedRoom, navigate]);
  return (
    <div>
      <h3 className="text-3xl text-orange-400 mb-5 font-semibold">
        {getRoomId !== undefined ? "Edit Room" : "Add Room"}
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex">
            <div className="w-full flex flex-col ">
              <GeneraInput
                type="text"
                label="title"
                placeholder="Enter Title of room"
                name="title"
                val={formik.values?.title}
                onCh={formik.handleChange("title")}
                onBl={formik.handleBlur("title")}
              />
              <div className="text-red-500 mb-0 p-0 text-sm">
                {formik.touched.title && formik.errors.title ? (
                  <div>{formik.errors.title}</div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex flex-col ">
              <GeneraInput
                type="number"
                label="Enter room price"
                placeholder="Enter Room Price"
                name="price"
                val={formik.values.price}
                onCh={formik.handleChange("price")}
                onBl={formik.handleBlur("price")}
              />
              <div className="text-red-500 mb-0 p-0 text-sm">
                {formik.touched.price && formik.errors.price ? (
                  <div>{formik.errors.price}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-full flex flex-col ">
              <GeneraInput
                type="number"
                label="Room Number"
                placeholder="Enter room Number"
                name="roomNumber"
                val={formik.values.roomNumber}
                onCh={formik.handleChange("roomNumber")}
                onBl={formik.handleBlur("roomNumber")}
              />
              <div className="text-red-500 mb-0 p-0 text-sm">
                {formik.touched.roomNumber && formik.errors.roomNumber ? (
                  <div>{formik.errors.roomNumber}</div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex flex-col ">
              <GeneraInput
                type="number"
                label="Enter number of beds "
                placeholder="Enter Number of beds"
                name="numberOfBeds"
                val={formik.values.numberOfBeds}
                onCh={formik.handleChange("numberOfBeds")}
                onBl={formik.handleBlur("numberOfBeds")}
              />
              <div className="text-red-500 mb-0 p-0 text-sm">
                {formik.touched.numberOfBeds && formik.errors.numberOfBeds ? (
                  <div>{formik.errors.numberOfBeds}</div>
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
              theme="snow"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange("description")}
            />
            <div className="text-red-500 mb-0 p-0 text-sm">
              {formik.touched.description && formik.errors.description ? (
                <div>{formik.errors.description}</div>
              ) : null}
            </div>
          </div>

          <GeneraInput
            type="number"
            label="Max Capacity"
            placeholder="Enter Capacity"
            name="capacity"
            val={formik.values?.capacity}
            onCh={formik.handleChange("capacity")}
            onBl={formik.handleBlur("capacity")}
          />
          <div className="text-red-500 mb-0 p-0 text-sm">
            {formik.touched.capacity && formik.errors.capacity ? (
              <div>{formik.errors.capacity}</div>
            ) : null}
          </div>
          <div className="flex justify-start ml-4">
            <h1>Which hostel</h1>
            <Space wrap className="w-100">
              <Select
                defaultValue="Which Hostel"
                style={{
                  width: 400,
                  padding: "0.9rem 0",
                  marginLeft: "0 auto",
                  marginRight: "5rem",
                }}
                name="hostel"
                placeholder="Select hostel"
                onChange={(value) => {
                  formik.setFieldValue("hostel_id", value);
                }}
                value={formik.values.hostel_id}
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

          {imgStateforloading?.isLoading ? (
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
            {getRoomId !== undefined ? "Edit Room" : "Add Room"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
