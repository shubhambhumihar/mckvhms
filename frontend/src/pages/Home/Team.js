import React from "react";

const shubham = require("../../assets/shubhamPic.jpg");

const Team = () => {
  return (
    <div
      className="max-w-screen-3xl black-gradient mx-auto py-7 my-20 t"
      id="team"
    >
      <h1 className="text-center text-xl md:text-4xl font-bold py-6">
        <span className="text-[#654E92] md:text-5xl text-2xl">Meet</span> Our
        Team
      </h1>
      <div className="mx-auto  flex md:flex-row flex-col  md:justify-center  items-center   my-6 gap-7  ">
        <div className="border w-[600px]  blue-text-gradient  md:my-0 my-4 flex justify-center items-center gap-5  md:p-4 p-1 rounded-2xl  shadow-sm shadow-green-600 border-violet-500  hover:scale-105 duration-500">
          <img
            src={shubham}
            alt=""
            className="rounded-full md:w-[100px] md:h-[100px] w-[70px] h-[70px] object-cover"
          />

          <div className="py-3 text-left">
            <h1 className="text-xl md:text-2xl text-white">
              Shubham kumar Singh
            </h1>
            <p className="text-white">Branch - CSE</p>
            <p className="text-white">Session - 2019-23</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
