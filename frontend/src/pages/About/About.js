import React from "react";
import { MdRoundaboutRight } from "react-icons/md";

const About = () => {
  return (
    <div className="max-w-screen-2xl flex flex-col items-center py-6 mb-40 justify-center ">
      <h1 className="text-4xl ml-5 text-[#ca8a04] font-bold">About Us</h1>
      <div className="w-[100px] bg-[#fb7185] h-[2px] ml-5"></div>
      <div className="grid  md:grid-cols-3  w-[90vw]  justify-between p-2 px-[20px]  ">
        <div className="p-5 flex flex-col gap-4    col-span-2">
          <div className="aboutBorder  shadow-md shadow-blue-300 flex p-4 justify-center items-center w-[500px] h-[250px]  ">
            <p className="text-justify text-gray-900 font-semibold text-[1.5rem">
              College hostel management websites are designed to streamline the
              management of hostel facilities for college students. These
              websites provide an online platform for students to apply for
              hostel accommodations, view their room allocations, make payments,
              and request maintenance services.
            </p>
          </div>
          <div className="aboutBorder p-4 flex justify-center items-center w-[500px] h-[250px]  ">
            <p className="text-justify text-gray-900 font-semibold text-[1.5rem">
              Ramgarh Engineering College (Estd. by Govt. of Jharkhand & run by
              Techno India under PPP) previously known as Techno India Ramgarh
              and Government Engineering College, Ramgarh, established with the
              prior approval of All India Council For Technical Education
            </p>
          </div>
        </div>
        <div className="  md:grid col-span-1  justify-start items-start  ">
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_fifomona.json"
            background="transparent"
            speed="1"
            style={{ width: "100%", height: "100%" }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>

      {/* <hr className="text-red-800 bg-red-600" /> */}
      <div className="flex justify-evenly flex-wrap my-6 pt-6 border-t-2   gap-6">
        <div className="border bg-red-500 p-6 w-[30%] flex flex-col items-center bg-gradient-to-b from-[#3A1C71] to-[#D76D77] rounded-lg">
          <p className="text-xl text-white-100 font-bold">Total Rooms</p>
          <p className="text-sm text-red-300 font-bold">
            {"hostelData?.number_of_rooms"}{" "}
          </p>
        </div>
        <div className="border bg-red-500 p-6 w-[30%] flex flex-col items-center bg-gradient-to-b from-[#07a463] to-[#545152] rounded-lg">
          <p className="text-xl text-white-100 font-bold">Total Capacity</p>
          <p className="text-sm text-red-300 font-bold">
            {"hostelData?.capacity"}
          </p>
        </div>
        <div className="border bg-red-500 p-6 w-[30%] flex flex-col items-center bg-gradient-to-b from-[#ffaf7b] to-[#b88093] rounded-lg">
          <p className="text-xl text-white-100 font-bold">Total Canteen</p>
          <p className="text-sm text-red-300 font-bold">1</p>
        </div>
        <div className="border p-6 w-[30%] flex flex-col items-center bg-gradient-to-b from-[#ef3b36] to-[#D76D77] rounded-lg">
          <p className="text-xl text-white-100 font-bold">Total Mess</p>
          <p className="text-sm text-red-300 font-bold">4</p>
        </div>
        <div className="border bg-red-500 p-6 w-[30%] flex flex-col items-center bg-gradient-to-b from-[#3A1C71] to-[#2fe3c2] rounded-lg">
          <p className="text-xl text-white-100 font-bold">Total Staffs</p>
          <p className="text-sm text-red-300 font-bold">200</p>
        </div>
      </div>
    </div>
  );
};

export default About;
