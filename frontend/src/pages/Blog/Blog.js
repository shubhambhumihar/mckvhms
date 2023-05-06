import React, { useEffect } from "react";
import PostSide from "../../components/PostSide";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="blog  mb-40">
        <div className="blur" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

        <div className="grid lg:grid-cols-4 justify-center gap-3">
          <div className="flex justify-center my-8   ">
            <lottie-player
              src="https://assets7.lottiefiles.com/packages/lf20_x9puwsf6.json"
              background="transparent"
              speed="0.3"
              style={{
                width: "300px",
                height: "300px",
                position: "sticky",
                top: 50,
                left: 0,
              }}
              loop
              autoplay
            ></lottie-player>
          </div>
          <div className="postSide col-span-2">
            <PostSide />
          </div>
          {/* <div className="showSide flex flex-col justify-center mt-10 p-5 pt-10"> */}
          <div className="flex justify-center  position-sticky top-10 right-0 my-17">
            <lottie-player
              src="https://assets2.lottiefiles.com/packages/lf20_zwwwgco2.json"
              background="transparent"
              speed="0.5"
              style={{
                width: "300px",
                height: "300px",
                position: "sticky",
                top: 50,
                right: 0,
              }}
              loop
              autoplay
            ></lottie-player>
          </div>
          {/* </div> */}
        </div>
      </div>

      {/* <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form className="flex flex-col gap-4 items-center p-10 bg-gray-100">
          <h3 className="text-[1.7rem] text-purple-700  font-semibold">
            Log <span className="text-gray-600 text-[1.4rem]">In</span>
          </h3>
          <div className="w-full">
            <input
              type="email"
              placeholder="Email"
              className=" bg-[#ddd] py-3 w-full px-10 rounded-3xl outline-none"
              name="email"
              // value={formik.values.email}
              // onChange={formik.handleChange("email")}
              // onBlur={formik.handleBlur("email")}
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Student ID"
              className=" bg-[#ddd] py-3 w-full px-10 rounded-3xl outline-none"
              name="student_id"
              // value={formik.values.email}
              // onChange={formik.handleChange("email")}
              // onBlur={formik.handleBlur("email")}
            />
          </div>

          <button className="px-[20px] w-1/2  mt-3  py-2 bg-orange-400 text-white rounded-3xl">
            Login
          </button>
        </form>
      </Modal> */}
    </>
  );
};

export default Blog;
