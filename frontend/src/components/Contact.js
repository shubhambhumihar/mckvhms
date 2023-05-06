import React, { useEffect } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { createContact, resetState } from "../features/contact/contactSlice";

import Complain from "./Complain";
let contactSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid name")
    .required("Name is Required..."),
  email: Yup.string().email("Invalid email id").required("Email is required"),

  desc: Yup.string()
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid Decription")
    .required("Description is Required..."),
});
const Contact = () => {
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError, createdContact } = useSelector(
    (state) => state.contact
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      desc: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createContact(values));

      formik.resetForm();
      alert(JSON.stringify(values, null, 2));

      setTimeout(() => {
        dispatch(resetState());
        // navigate("/admin/room-list");
      }, 1000);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isSuccess && createdContact) {
      toast.success("Thanku for contacting Us, We will soon reach out to You!");
    }

    if (isError) {
      toast.error("Something gone wrong!");
    }
  }, [isSuccess, isLoading, isError, createdContact]);

  return (
    <div className="max-w-screen-3xl mx-auto  mb-40">
      <div className="my-11">
        <Complain />
      </div>

      {/* <div className="mx-20 my-20">
        <button
          onClick={showModal}
          className="py-3 inline-block px-20 bg-green-600 text-white font-bold italic line-height-[24px] space-x-4  rounded-xl"
        >
          Write your Complain or Query here
        </button>

        <ComplainModel
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </div> */}
      <div className=" flex flex-col sm:flex-row justify-around items-center">
        <div>
          <h1
            className="text-[2rem] md:text-[4rem] text-purple-500 font-bold  "
            style={{ lineHeight: 0.8 }}
          >
            Find us <br />
            using the MAP{" "}
          </h1>
          <p className="my-5  text-sm p-10">
            Address : Chhotki Lari, <br /> Murubanda,
            <br /> Jharkhand 825101
          </p>
        </div>

        <div class="col-md-5 w-1/2  h-[80vh] ">
          <div style={{ width: "960px" }}></div>

          <div className="w-[100%] mt-[50px] md:h-[400px] h-[200px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.7257806211883!2d85.62739847432023!3d23.578290195363994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f458e93cb14f4f%3A0xb22c7b3b8ffb020f!2sRamgarh%20Engineering%20College!5e0!3m2!1sen!2sin!4v1681891093730!5m2!1sen!2sin"
              width="100%"
              height="100%"
              title="map"
              frameborder="0"
              // style={{border:"0"}}
            ></iframe>
          </div>
        </div>
      </div>
      <div className="my-1 md:my-11">
        <div className="md:flex w-[90vw]  mx-auto lg:flex items-center justify-around">
          <div className=" md:my-10">
            <h3 className="text-[1.7rem] mb-6 text-center text-purple-700  font-semibold">
              Contact <span className="text-gray-200 text-[1.4rem]">US</span>
            </h3>
            <form
              onSubmit={formik.handleSubmit}
              className="border formc w-[90vw] md:w-[36vw] mx-auto p-6 shadow-md shadow-orange-600 rounded-2xl  "
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
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm  text-orange-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  for="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-orange-600  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
                <div className="text-red-500 mb-0 p-0 text-sm">
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
              </div>

              <div className="relative w-[70vw] md:w-1/2 mx-auto mb-6 group">
                <textarea
                  id="message"
                  rows="4"
                  name="desc"
                  value={formik.values.desc}
                  onChange={formik.handleChange("desc")}
                  onBlur={formik.handleBlur("desc")}
                  class="block p-2.5 w-full text-sm text-orange-600  bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-orange-400 dark:text-orange-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
                {formik.touched.desc && formik.errors.desc ? (
                  <div>{formik.errors.desc}</div>
                ) : null}
              </div>

              <button
                type="submit"
                className="text-white mx-auto block bg-purple-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="flex md:justify-end justify-center md:w-[400px] md:h-[400px] w-[300px] h-[300px] ">
            <lottie-player
              src="https://assets3.lottiefiles.com/packages/lf20_u25cckyh.json"
              background="transparent"
              speed="1"
              style={{ width: "100%", height: "100%" }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </div>

      <h1 className="text-center text-3xl underline underline-offset-4 text-bold text-[#f4f3f5] my-6">
        Our Management Team
      </h1>
      <div className="flex flex-col justify-around items-center md:flex-row flex-wrap">
        <div className="mx-w-[100%]  md:mx-w-[20%] violet-gradient rounded-2xl  p-10 flex flex-col items-center justify-center gap-4 about-card ">
          <img
            className="w-[150px] rounded-full"
            src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
            alt=""
          />
          <div>
            <h3 className="text-2xl text-slate-500">Nilesh Kumar</h3>
            <p className="text-sm text-center font-light">Hostel Incharge</p>
          </div>
        </div>
        <div className="mx-w-[100%]  md:mx-w-[20%] violet-gradient rounded-2xl  p-10 flex flex-col items-center justify-center gap-4 about-card ">
          <img
            className="w-[150px] rounded-full"
            src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
            alt=""
          />
          <div className="flex flex-col items-center">
            <h3 className="text-2xl text-slate-500">Nilesh Kumar</h3>
            <p className="text-sm text-center font-light">Hostel Incharge</p>
          </div>
        </div>
        <div className="mx-w-[100%]  md:mx-w-[20%] violet-gradient rounded-2xl  p-10 flex flex-col items-center justify-center gap-4 about-card ">
          <img
            className="w-[150px] rounded-full"
            src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
            alt=""
          />
          <div>
            <h3 className="text-2xl text-slate-500">Nilesh Kumar</h3>
            <p className="text-sm text-center font-light">Hostel Incharge</p>
          </div>
        </div>
        <div className="mx-w-[100%]  md:mx-w-[20%] violet-gradient rounded-2xl  p-10 flex flex-col items-center justify-center gap-4 about-card ">
          <img
            className="w-[150px] rounded-full"
            src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
            alt=""
          />
          <div>
            <h3 className="text-2xl text-slate-500">Nilesh Kumar</h3>
            <p className="text-sm text-center font-light">Hostel Incharge</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
