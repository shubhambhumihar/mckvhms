import React from "react";

const Feedback = () => {
  return (
    <div
      className="max-w-screen-3xl mx-auto my-6  bg-neutral-900 pb-16 "
      id="feedback"
    >
      <h1 className="text-center text-lg md:text-3xl my-5 font-bold p-7">
        If you have any feedback then please let us know ..
      </h1>

      <form className="flex justify-center align-middle">
        <textarea
          className="w-[90%] md:w-1/2 rounded-3xl  p-2 md:p-4 bg-white text-purple-700 border border-red-900  shadow-md shadow-violet-600 "
          name=""
          id=""
          cols="30"
          rows="3"
          placeholder="Write your Feedback..."
        ></textarea>
      </form>
      <div className="mx-auto text-center md:w-12 my-5 mb-8">
        <button className="border border-orange-700 text-yellow-50 px-6 py-2 rounded-2xl hover:scale-105 duration-50 shadow-md shadow-orange-600 ">
          {" "}
          Submit
        </button>
      </div>
    </div>
  );
};

export default Feedback;
