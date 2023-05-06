import React from "react";
const t1 = require("../../assets/team1.png");
const t2 = require("../../assets/team-6.jpg");
const t3 = require("../../assets/team3.png");
const t4 = require("../../assets/team-5.jpg");
const Team = () => {
  return (
    <div
      className="max-w-screen-3xl black-gradient mx-auto py-7 my-20 t"
      id="team"
    >
      <h1 className="text-center text-xl md:text-4xl font-bold py-6">
        <span className="text-[#654E92] text-5xl">Meet</span> Our Team
      </h1>
      <div className="mx-auto  flex justify-center my-6  gap-7">
        <div className="border  blue-text-gradient  w-1/3 flex justify-center  p-4 rounded-2xl  shadow-sm shadow-green-600 border-violet-500 gap-5 hover:scale-105 duration-500">
          <img
            src={t2}
            alt=""
            className="rounded-full w-[100px] object-cover"
          />

          <div className="py-3 text-left">
            <h1 className="text-xl md:text-2xl text-white">Jyoti kumari</h1>
            <p className="text-white">Branch - ECE</p>
            <p className="text-white">Session - 2019-23</p>
          </div>
        </div>

        <div className="border pink-text-gradient  w-1/3 flex justify-center gap-5 p-4 shadow-sm shadow-orange-400 rounded-2xl hover:scale-105 duration-500 ">
          <img
            src={t4}
            alt=""
            className="rounded-full w-[100px] object-cover"
          />

          <div className="py-3 text-left">
            <h1 className="text-xl md:text-2xl text-white">
              Ishita Raj Sharma{" "}
            </h1>
            <p className="text-white">Branch - ECE</p>
            <p className="text-white">Session - 2019-23</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
