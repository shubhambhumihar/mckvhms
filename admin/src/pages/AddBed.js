import React, { useEffect, useState } from "react";
import GeneraInput from "../components/GeneraInput";
import { Select, Space } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { createBeds, resetState } from "../features/bed/bedSlice";
import { getAllHostels } from "../features/hostels/hostelSlice";

const AddBed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  const bedState = useSelector((state) => state.bed.beds.beds);
  const { isLoading, isError, isSuccess, createdBed } = useSelector(
    (state) => state.bed
  );
  // console.log(bedState);
  const hostelState = useSelector((state) => state.hostel?.hostels?.hostels);
  console.log(hostelState);

  useEffect(() => {
    dispatch(getAllHostels());
  }, [dispatch]);

  // useEffect(()=>{

  // })

  let bedSchema = Yup.object().shape({
    bed_number: Yup.number()
      .typeError("Invalid Bed number")
      .positive("Bed number must be positive")
      .integer("Bed number must be an integer")
      .required("Bed number is Required..."),
  });
  const formik = useFormik({
    initialValues: {
      bed_number: "",
      isAvailable: "",
    },
    validationSchema: bedSchema,
    onSubmit: (values) => {
      dispatch(createBeds(values, values.room));
      formik.resetForm();

      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/bed-list");
      }, 3000);

      alert(JSON.stringify(values, null, 2));
    },
  });
  useEffect(() => {
    if (isSuccess && createdBed) {
      toast.success("Bed Added Successfully!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isLoading, isError, createdBed]);
  return (
    <div>
      <h3 className="text-3xl text-orange-400 mb-5 font-semibold ">Add Bed</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <GeneraInput
            type="number"
            label="Bed number"
            name="bed_number"
            val={formik.values.bed_number}
            onCh={formik.handleChange("bed_number")}
            onBl={formik.handleBlur("bed_number")}
            placeholder="Enter Bed Number "
          />

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
                name="hostel"
                placeholder="Select hostel"
                onChange={(value) => {
                  formik.setFieldValue("hostel", value);
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
                name="room"
                placeholder="Which Room"
                onChange={(value) => formik.setFieldValue("room_id", value)}
                options={rooms?.map((room, id) => {
                  // console.log(room);
                  return {
                    value: room._id,
                    label: room.roomNumber,
                  };
                })}
              />
            </Space>
          </div>

          <div className="flex justify-start ml-4">
            <Space wrap className="w-100">
              <Select
                defaultValue="Availabilty"
                style={{
                  width: 400,
                  padding: "0.9rem 0",
                  marginLeft: "0 auto",
                  marginRight: "5rem",
                  color: "red",
                }}
                name="isAvailable"
                placeholder="Availability"
                onChange={(value) => formik.setFieldValue("isAvailable", value)}
                options={[
                  {
                    value: true,
                    label: "Yes",
                  },
                  {
                    value: false,
                    label: "No",
                  },
                ]}
              />
            </Space>
          </div>

          <div className="flex justify-center my-5">
            <button
              type="submit"
              className="px-[22px] py-[6px] bg-blend-overlay bg-red-400 mx-auto inline-block  text-green shadow-lg shadow-orange-500 rounded-[20px]"
            >
              Add Bed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBed;
