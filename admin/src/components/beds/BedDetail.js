import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  getSingleBedofRoom,
  getStudentOfABed,
} from "../../features/bed/bedSlice";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const BedDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const navigate = useNavigate();

  const getBedId = location.pathname.split("/")[5];

  const { isLoading, singleBed, student } = useSelector((state) => state.bed);

  // console.log(student);

  useEffect(() => {
    dispatch(getSingleBedofRoom(getBedId));
    dispatch(getStudentOfABed(getBedId));
  }, [getBedId]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center pt-5 mt-7">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-screen-2xl   border  w-[100%] mx-auto h-fit  ">
          <div className="hostelBac flex justify-center items-center">
            <h1 className="text-2xl font-bold green-pink-gradient underline text-center">
              Welcome to Bed Number {singleBed?.bed?.bed_number}
            </h1>
          </div>

          <div className="my-6 w-[80%] mx-auto">
            <h1 className="text-center text-3xl text-purple-700 my-6">
              Student Info
            </h1>

            <div className="shadow-lg p-7 shadow-white">
              <div className="green-text-gradient h-[50vh] rounded-xl  flex justify-around py-7">
                <div className=" w-full border-r-2 flex items-center justify-center h-[20px] p-7">
                  <h2 className="text-white font-semibold pb-4">
                    Hostel - {student?.student?.hostel_id?.hostel_name}{" "}
                  </h2>
                </div>
                <div className=" w-full border-r-2 flex items-center justify-center h-[20px] p-7 ">
                  <h2 className="text-white text-center font-semibold pb-4">
                    Room No - {student?.student?.room_id?.roomNumber}{" "}
                  </h2>
                </div>
                <div className=" w-full flex items-center justify-center h-[20px] p-7">
                  <h2 className="text-white font-semibold pb-4">
                    Bed No - {student?.student?.bed_id?.bed_number}{" "}
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
                      Name - {student?.student?.name}{" "}
                    </h3>
                    <h3 className="text-white font-semibold pb-4">
                      Email - {student?.student?.email}{" "}
                    </h3>
                    <h3 className="text-white font-semibold pb-4">
                      Branch - {student?.student?.department}{" "}
                    </h3>
                    <h3 className="text-white font-semibold pb-4">
                      Batch- {student?.student?.batch}{" "}
                    </h3>
                    <h3 className="text-white font-semibold pb-4">
                      Student Id - {student?.student?.student_id}{" "}
                    </h3>
                    <h3 className="text-white font-semibold pb-4">
                      Gender - {student?.student?.gender}{" "}
                    </h3>
                  </div>

                  <div className="h-[80%] my-auto w-[1px] bg-gray-200"></div>
                  <div className="p-6  flex   flex-col ">
                    <h2 className="text-white font-semibold pb-4">
                      Course - {student?.student?.course}{" "}
                    </h2>
                    <h2 className="text-white font-semibold pb-4">
                      Semester - {student?.student?.semester}{" "}
                    </h2>
                    <h2 className="text-white font-semibold pb-4">
                      Contact No. - {student?.student?.mobile}{" "}
                    </h2>
                    <h2 className="text-white font-semibold pb-4">
                      Parents Contact No. -{" "}
                      {student?.student?.parentContactNumber}{" "}
                    </h2>
                    <h2 className="text-white font-semibold pb-4">
                      Address - {student?.student?.address}{" "}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BedDetail;
