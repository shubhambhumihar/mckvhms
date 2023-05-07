import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleStudent } from "../../features/student/studentSlice";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
const StudentDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const studentId = location.pathname.split("/")[3];

  const { isLoading, singleStudent } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getSingleStudent(studentId));
  }, []);
  return (
    <div className="my-6 w-[80%] mx-auto">
      <h1 className="text-center text-3xl font-bold text-purple-700 my-6">
        Student Info
      </h1>

      {isLoading ? (
        <div className="flex justify-center my-10 ">
          <div class="loader">
            <span class="loader-text">loading</span>
            <span class="load"></span>
          </div>
        </div>
      ) : (
        <div className="shadow-lg p-7 shadow-white">
          <div className="green-text-gradient h-[50vh] rounded-xl  flex justify-around py-7">
            <div className=" w-full border-r-2 flex items-center justify-center h-[20px] p-7">
              <h2 className="text-white font-semibold pb-4">
                Hostel - {singleStudent?.student?.hostel_id?.hostel_name}{" "}
              </h2>
            </div>
            <div className=" w-full border-r-2 flex items-center justify-center h-[20px] p-7 ">
              <h2 className="text-white text-center font-semibold pb-4">
                Room No - {singleStudent?.student?.room_id?.roomNumber}{" "}
              </h2>
            </div>
            <div className=" w-full flex items-center justify-center h-[20px] p-7">
              <h2 className="text-white font-semibold pb-4">
                Bed No - {singleStudent?.student?.bed_id?.bed_number}{" "}
              </h2>
            </div>
          </div>
          <div className="flex shadow-lg shadow-purple-400 relative  justify-around py-14 p-10 mt-[-20vh] w-[80%] mx-auto rounded-3xl black-gradient ">
            <div className="avatar absolute top-[0px]">
              <Avatar
                className=" border-white border-4 text-white flex justify-center items-center"
                size={74}
                icon={<UserOutlined className="text-white" />}
              />
            </div>
            <div className="flex justify-center ">
              <div className="p-6 ">
                <h3 className="text-white font-semibold pb-4">
                  Name -{" "}
                  <span className="text-xs">
                    {singleStudent?.student?.name}
                  </span>
                </h3>
                <h3 className="text-white font-semibold pb-4">
                  Email -{" "}
                  <span className="text-xs">
                    {singleStudent?.student?.email}
                  </span>
                </h3>
                <h3 className="text-white font-semibold pb-4">
                  Branch -{" "}
                  <span className="text-xs">
                    {singleStudent?.student?.department}
                  </span>
                </h3>
                <h3 className="text-white font-semibold pb-4">
                  Batch-{" "}
                  <span className="text-xs">
                    {singleStudent?.student?.batch}{" "}
                  </span>
                </h3>
                <h3 className="text-white font-semibold pb-4">
                  Student Id -{" "}
                  <span className="text-xs">
                    {singleStudent?.student?.student_id}{" "}
                  </span>
                </h3>
                <h3 className="text-white font-semibold pb-4">
                  <span className="text-xs">
                    {" "}
                    Gender - {singleStudent?.student?.gender}{" "}
                  </span>
                </h3>
              </div>

              <div className="h-[80%] my-auto w-[1px] bg-gray-200"></div>
              <div className="p-6  flex   flex-col ">
                <h2 className="text-white font-semibold pb-4">
                  Course -{" "}
                  <span className="text-xs">
                    {singleStudent?.student?.course}{" "}
                  </span>
                </h2>
                <h2 className="text-white font-semibold pb-4">
                  Semester -{" "}
                  <span className="text-xs">
                    {singleStudent?.student?.semester}{" "}
                  </span>
                </h2>
                <h2 className="text-white font-semibold pb-4">
                  Phone -{" "}
                  <span className="text-xs">
                    {singleStudent?.student?.mobile}
                  </span>
                </h2>
                <h2 className="text-white font-semibold pb-4">
                  Parents No -{" "}
                  <span className="text-xs">
                    {singleStudent?.student?.parentContactNumber}{" "}
                  </span>
                </h2>
                <h2 className="text-white font-semibold pb-4">
                  Address -{" "}
                  <span className="text-xs">
                    {singleStudent?.student?.address}{" "}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
