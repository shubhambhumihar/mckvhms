import React, { useEffect } from "react";
import { MdRoundaboutRight } from "react-icons/md";
import { aboutUs } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { getAllHostels } from "../../features/hostel/hostelSlice";
import { getAllRooms } from "../../features/room/roomSlice";

const About = () => {
  const dispatch = useDispatch();

  const hostelCount = useSelector((state) => state.hostel?.hostel?.count);
  const roomCount = useSelector((state) => state.room?.rooms?.count);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllHostels());
    dispatch(getAllRooms());
  }, []);
  return (
    <div className="max-w-screen-2xl flex flex-col items-center py-6 mb-40 justify-center ">
      <h1 className="text-4xl mt-6 text-center  text-[#654E92] font-bold">
        About Us
      </h1>
      <div className="w-[100px] bg-[#0b916d] h-[2px] "></div>

      <div className="flex justify-between  flex-wrap w-[90vw] my-8 gap-6 about ">
        {aboutUs?.map((data, index) => {
          return (
            <div
              key={index}
              className="w-[30%] violet-gradient rounded-2xl  p-10 flex flex-col items-center justify-center gap-4 about-card "
            >
              <p className="text-[4rem]">{data.icon}</p>
              <h3 className="text-lg text-[#CE5959] text-bold">
                {data.heading}{" "}
              </h3>
              <p className="text-[0.7rem] text-justify font-extralight">
                {data.desc}{" "}
              </p>
              <p className="text-[0.7rem]">{data.desc1} </p>
            </div>
          );
        })}
      </div>

      {/* <hr className="text-red-800 bg-red-600" /> */}
      <div className="flex justify-evenly flex-wrap my-10 pt-6 border-t-2   gap-6">
        <div className="border bg-red-500 p-6 w-[30%] flex flex-col items-center bg-gradient-to-b from-[#3A1C71] to-[#D76D77] rounded-lg">
          <p className="text-xl text-white-100 font-bold">Total Hostels</p>
          <p className="text-sm text-red-300 font-bold">{hostelCount}</p>
        </div>
        <div className="border bg-red-500 p-6 w-[30%] flex flex-col items-center bg-gradient-to-b from-[#07a463] to-[#545152] rounded-lg">
          <p className="text-xl text-white-100 font-bold">Total Rooms</p>
          <p className="text-sm text-red-300 font-bold">{roomCount}</p>
        </div>
        <div className="border bg-red-500 p-6 w-[30%] flex flex-col items-center bg-gradient-to-b from-[#ffaf7b] to-[#b88093] rounded-lg">
          <p className="text-xl text-white-100 font-bold">Total Canteen</p>
          <p className="text-sm text-red-300 font-bold">1</p>
        </div>
        <div className="border p-6 w-[30%] flex flex-col items-center bg-gradient-to-b from-[#ef3b36] to-[#D76D77] rounded-lg">
          <p className="text-xl text-white-100 font-bold">Total Mess</p>
          <p className="text-sm text-red-300 font-bold">2</p>
        </div>
        <div className="border bg-red-500 p-6 w-[30%] flex flex-col items-center bg-gradient-to-b from-[#3A1C71] to-[#2fe3c2] rounded-lg">
          <p className="text-xl text-white-100 font-bold">Total Staffs</p>
          <p className="text-sm text-red-300 font-bold">50+</p>
        </div>
      </div>
      <h1 className="text-3xl text-[#654E92] font-bold underline text-center mt-12 underline-offset-4 italic">
        OUR ALUMINI
      </h1>
      <div className="grid  md:grid-cols-3 my-10  w-[90vw]  justify-between p-2 px-[20px]  ">
        <div className="p-5 flex max-h-fit gap-4 align-self-auto   col-span-2">
          <div className="   shadow-md rounded-2xl  shadow-blue-300 flex flex-col self-start p-4 justify-center  items-center w-[25%]   ">
            <div className="w-[80px] rounded-full border ">
              <img
                className="rounded-full w-[100%] object-cover"
                src="https://images.unsplash.com/photo-1622281631389-59e63d92760d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmVhdXRpZnVsJTIwbGFkeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                alt=""
              />
            </div>

            <h4 className="mt-5 text-bold text-[#654E92] font-bold text-xl">
              Our Principal
            </h4>

            <p className="text-justify text-white font-semibold text-sm">
              Shravani Roy
            </p>
          </div>
          <div className="  shadow-md  rounded-2xl shadow-blue-300 flex flex-col p-4 justify-center self-start  items-center w-[25%]   ">
            <div className="w-[80px] rounded-full border ">
              <img
                className="rounded-full w-[100%] object-cover"
                src="https://images.unsplash.com/photo-1622281631389-59e63d92760d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmVhdXRpZnVsJTIwbGFkeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                alt=""
              />
            </div>

            <h4 className="mt-5 text-boldtext-[#654E92] font-bold text-xl">
              Our Principal
            </h4>

            <p className="text-justify text-white font-semibold text-sm">
              Shravani Roy
            </p>
          </div>
          <div className="  shadow-md rounded-2xl shadow-blue-300 flex flex-col p-4 justify-center self-start  items-center w-[25%]   ">
            <div className="w-[80px] rounded-full border ">
              <img
                className="rounded-full w-[100%] object-cover"
                src="https://images.unsplash.com/photo-1622281631389-59e63d92760d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmVhdXRpZnVsJTIwbGFkeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                alt=""
              />
            </div>

            <h4 className="mt-5 text-bold text-[#654E92] font-bold text-xl">
              Our Principal
            </h4>

            <p className="text-justify text-white font-semibold text-sm">
              Shravani Roy
            </p>
          </div>
        </div>
        <div className="  md:grid col-span-1  justify-start items-start  ">
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_xh83pj1c.json"
            background="transparent"
            speed="0.5"
            style={{ width: "100%", height: "100%" }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
};

export default About;
