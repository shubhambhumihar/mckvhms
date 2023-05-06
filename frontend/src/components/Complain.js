import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Select, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllHostels } from "../features/hostel/hostelSlice";
import {
  createComplain,
  resetState,
} from "../features/complaint/complainSlice";

const Complain = () => {
  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();
  const hostelState = useSelector((state) => state.hostel?.hostel?.hostels);
  console.log(hostelState);

  const { isLoading, isSuccess, isError, createdComplaint } = useSelector(
    (state) => state.complain
  );

  useEffect(() => {
    dispatch(getAllHostels());
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      hostel_id: "",
      room_id: "",
      desc: "",
    },
    //    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createComplain(values));

      formik.resetForm();
      alert(JSON.stringify(values, null, 2));

      setTimeout(() => {
        dispatch(resetState());
        // navigate("/admin/room-list");
      }, 1000);
    },
  });

  useEffect(() => {
    if (isSuccess && createdComplaint) {
      toast.success(
        "Your complaint is sent to admin.  We will get back to you in  no time🙂. Thanku you!"
      );
    }

    if (isError) {
      toast.error("Something gone wrong!");
    }
  }, [isSuccess, isLoading, isError, createdComplaint]);
  return (
    <div className="md:flex gap-10 w-[90vw] mx-auto lg:flex items-center justify-around">
      <div className="flex justify-start">
        <lottie-player
          src="https://assets5.lottiefiles.com/packages/lf20_htGEnnUdTG.json"
          background="transparent"
          speed="1"
          style={{ width: "400px", height: "400px" }}
          loop
          autoplay
        ></lottie-player>
      </div>
      <div>
        <h3 className="text-[1.7rem] mb-6 text-center text-purple-700  font-semibold">
          Complaint <span className="text-gray-200 text-[1.4rem]">Box</span>
        </h3>
        <form
          onSubmit={formik.handleSubmit}
          className="border formc w-[80vw] md:w-[36vw] mx-auto p-6 shadow-md shadow-orange-600 rounded-2xl  "
        >
          <div class="grid md:grid-cols-1   md:gap-6">
            <div class="relative w-[70vw] md:w-1/2  mx-auto mb-6 group">
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-orange-600  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-orange-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>

              <div className="text-red-500 mb-0 p-0 text-sm">
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="relative w-[70vw]  md:w-1/2 mx-auto mb-6 group">
            <input
              type="text"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange("mobile")}
              onBlur={formik.handleBlur("mobile")}
              id="floating_mobile"
              className="block py-2.5 px-0 w-full text-sm  text-orange-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="floating_mobile"
              className="peer-focus:font-medium absolute text-sm text-orange-600  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone Number
            </label>
            <div className="text-red-500 mb-0 p-0 text-sm">
              {formik.touched.mobile && formik.errors.mobile ? (
                <div>{formik.errors.mobile}</div>
              ) : null}
            </div>
          </div>

          <div className="flex justify-center ">
            <Space wrap className="w-100 ">
              <Select
                defaultValue="Which Hostel"
                style={{
                  width: 220,
                  padding: "0.8rem 0",
                  marginLeft: "0 auto",

                  // marginRight: "5rem",
                }}
                name="hostel"
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

          <div className="flex justify-center ">
            <Space wrap className="w-100">
              <Select
                defaultValue="Which Room"
                style={{
                  width: 220,
                  padding: "0.8rem 0",
                  marginLeft: "0 auto",
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

          <div className="relative w-[70vw] md:w-1/2 mx-auto mb-6 group">
            <textarea
              id="message"
              rows="4"
              name="desc"
              value={formik.values.desc}
              onChange={formik.handleChange("desc")}
              onBlur={formik.handleBlur("desc")}
              class="block p-2.5 my-4 w-full text-sm text-orange-600  bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-orange-400 dark:text-orange-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
            {formik.touched.desc && formik.errors.desc ? (
              <div>{formik.errors.desc}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="text-white my-6 mx-auto block bg-purple-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Complain;
