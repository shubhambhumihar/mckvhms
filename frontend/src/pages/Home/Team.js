import React from "react";
const t1 = require("../../assets/team1.png");
const t2 = require("../../assets/team-6.jpg");
const t3 = require("../../assets/team3.png");
const t4 = require("../../assets/team-5.jpg");
const Team = () => {
  return (
    <div className="max-w-screen-2xl py-7 my-20 t" id="team">
      <h1 className="text-center text-xl md:text-4xl font-bold py-6">
        Meet Our Team
      </h1>
      <div className="mx-auto grid md:grid-cols-2 lg:grid-cols-4 justify-center place-items-center  gap-2">
        <div className="border border-emerald-500 rounded-2xl p-4 shadow-lg shadow-violet-500 hover:scale-105 duration-500 ">
          <img
            src={t1}
            alt=""
            className="rounded-full w-[200px] object-cover"
          />

          <div className="py-3 text-center ">
            <h1 className="text-xl md:text-2xl text-gray-400">Shubham Singh</h1>
            <p className="text-violet-400">Full Stack Developer</p>
          </div>
        </div>
        <div className="border p-4 rounded-2xl  shadow-lg shadow-green-600 border-violet-500 hover:scale-105 duration-500">
          <img
            src={t2}
            alt=""
            className="rounded-full w-[200px] object-cover"
          />

          <div className="py-3 text-center">
            <h1 className="text-xl md:text-2xl text-gray-400">
              Jyoti kumari chouhan
            </h1>
            <p className="text-violet-400">Frontend Developer</p>
          </div>
        </div>
        <div className="border p-4 shadow-lg rounded-2xl shadow-slate-50 border-orange-500 hover:scale-105 duration-500">
          <img
            src={t3}
            alt=""
            className="rounded-full w-[200px] object-cover"
          />

          <div className="py-3 text-center">
            <h1 className="text-xl md:text-2xl text-gray-400">
              Dhirendra Sharma
            </h1>
            <p className="text-violet-400">Ui/Ux Developer</p>
          </div>
        </div>
        <div className="border p-4 shadow-lg shadow-orange-400 rounded-2xl hover:scale-105 duration-500 ">
          <img
            src={t4}
            alt=""
            className="rounded-full w-[200px] object-cover"
          />

          <div className="py-3 text-center">
            <h1 className="text-xl md:text-2xl text-gray-400">Ishita </h1>
            <p className="text-violet-400">Backend Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
