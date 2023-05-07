import React, { useEffect } from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { BsFillBuildingsFill } from "react-icons/bs";
import { TbBuildingBank } from "react-icons/tb";
import { GiBunkBeds } from "react-icons/gi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiBed } from "react-icons/bi";
import { RingProgress } from "@ant-design/plots";
import { Bar } from "@ant-design/plots";
import CountUp from "react-countup";
import Typed from "react-typed";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "../features/room/roomSlice";
import { getAllBeds } from "../features/bed/bedSlice";
import { getAllHostels } from "../features/hostels/hostelSlice";
import { Link } from "react-router-dom";
import { getAllStudents } from "../features/student/studentSlice";

const data = [
  { type: "Total Complaints", value: 201 },
  { type: "Total Solved", value: 100 },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const hostelState = useSelector((state) => state.hostel);
  const roomState = useSelector((state) => state.room);
  const bedState = useSelector((state) => state.bed);
  const studentState = useSelector((state) => state.student);
  const { count } = hostelState.hostels;
  const countOfStudents = studentState?.students?.count;
  const countRoom = roomState?.rooms?.count;
  const countBed = bedState?.beds?.count;

  const hostels = hostelState?.hostels?.hostels;
  // console.log(hostelState.hostels.hostels);
  useEffect(() => {
    dispatch(getAllRooms());
    dispatch(getAllBeds());
    dispatch(getAllHostels());
    dispatch(getAllStudents());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // (totalroom*3 /total capacity) *100
  const config = {
    height: 150,
    width: 150,
    autoFit: false,
    // percent: ,
    color: ["#fc6767", "#804dee"],
  };

  return (
    <div>
      <h1 className="mb-4 text-[1.8rem] text-purple-500 font-bold">
        <span className="mr-2">Welcome</span>

        <Typed
          strings={[" REC ADMIN"]}
          typeSpeed={200}
          backSpeed={100}
          loop
          // backDelay={2}
        />
      </h1>

      <div className="flex justify-between items-center gap-3">
        <div className="flex black-gradient p-5 border rounded-xl flex-grow justify-between items-center shadow-md shadow-gray-600">
          <div className="">
            <BsFillBuildingsFill className="text-teal-600 text-[2rem]" />
          </div>

          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to="/admin/hostels"
            className="flex flex-1 flex-col gap-2   items-center justify-center"
          >
            <h2
              className="text-[1.2rem] text-[#fc6767]  font-bold text-center"
              style={{ lineHeight: "1" }}
            >
              Total Hostels
            </h2>
            <p className="text-[1.4rem] font-bold text-green-400 ">
              {" "}
              <CountUp delay={1} end={count} />
            </p>
          </Link>
        </div>
        <div className="flex blue-text-gradient p-5 border rounded-xl flex-grow justify-between items-center shadow-md shadow-purple-400">
          <div className="">
            <TbBuildingBank className="text-[#f9f6f6] text-[2rem]" />
          </div>
          <div className="flex flex-1 flex-col gap-2  items-center justify-center">
            <h2
              className="text-[1.2rem] text-white  font-bold text-center"
              style={{ lineHeight: "1" }}
            >
              Total Rooms
            </h2>
            <p className="text-[1.4rem] font-bold text-gray-600 ">
              {" "}
              <CountUp end={countRoom} />
            </p>
          </div>
        </div>
        <div className="flex pink-text-gradient p-5 border rounded-xl flex-grow justify-between items-center shadow-md shadow-red-300">
          <div className="">
            <BiBed className="text-[#ecebeb] font-bold text-[2rem]" />
          </div>
          <div className="flex flex-1 flex-col gap-2  items-center justify-center">
            <h2
              className="text-[1.2rem] text-slate-800  font-bold text-center"
              style={{ lineHeight: "1" }}
            >
              Total Beds
            </h2>
            <p className="text-[1.4rem] font-bold text-[#eee] ">
              {" "}
              <CountUp delay={2} end={countBed} />
            </p>
          </div>
        </div>
        <div className="flex green-text-gradient p-5 border rounded-xl flex-grow justify-between items-center shadow-md shadow-green-300">
          <div className="">
            <AiOutlineUsergroupAdd className="text-[#ddd] text-[2rem]" />
          </div>
          <div className="flex flex-1 flex-col gap-2  items-center justify-center">
            <h2
              className="text-[1.2rem] text-[#eee]  font-bold text-center"
              style={{ lineHeight: "1" }}
            >
              Total Students
            </h2>
            <p className="text-[1.4rem] font-bold text-white ">
              {" "}
              <CountUp delay={3} end={countOfStudents} />
            </p>
          </div>
        </div>
      </div>

      <div className="m-4 my-10 p-5 pb-10 shadow-xl rounded-2xl black-gradient shadow-red-200">
        <h3 className="  mb-4 text-[#ddd] text-justify p-5 font-semibold text-2xl">
          Occupacy
        </h3>
        <div className="flex justify-around items-center flex-wrap">
          {hostels?.map((hostel, index) => (
            <div key={index}>
              <h1 className="text-center text-white mb-2">
                {hostel?.hostel_name}{" "}
              </h1>

              <RingProgress
                strokeColor="#00ff00"
                percent={(countRoom * 3) / hostel.capacity}
                {...config}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="m-4 p-5 shadow-xl black-gradient rounded-2xl  shadow-red-200">
        <h3 className="mb-4 text-[#eee] text-justify p-5 font-semibold text-2xl">
          Total Complaints
        </h3>
        <div>
          <Bar
            height={300}
            data={data}
            xField="type"
            yField="value"
            label={{
              position: "middle",
              style: { fill: "#eee" },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
