import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getARoom, getBedsOfRoom } from "../../features/room/roomSlice";
import BedsOfRoom from "../beds/BedsOfRoom";

const RoomDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getRoomId = location.pathname.split("/")[4];

  const { isLoading, getSingleRoom, bedsOfRoom } = useSelector(
    (state) => state.room
  );

  const goBack = () => {
    navigate(`/admin/hostels`);
  };
  // console.log(bedsOfRoom);

  useEffect(() => {
    dispatch(getARoom(getRoomId));
    dispatch(getBedsOfRoom(getRoomId));
  }, [getRoomId]);

  return (
    <>
      <button
        onClick={goBack}
        className="shadow-sm shadow-red-500  inline-block bg-yellow-400 px-4 py-1 text-white rounded-2xl"
      >
        <AiOutlineArrowLeft />
      </button>
      <div className="max-w-screen-2xl   border  w-[100%] mx-auto h-fit  ">
        <div className="hostelBac flex justify-center items-center">
          <h1 className="text-2xl font-bold text-purple-600 underline text-center">
            Welcome to Room Number {getSingleRoom?.room?.roomNumber}
          </h1>
        </div>

        <div className="my-6">
          <h1 className="text-center font-bold text-xl text-orange-500 py-5">
            Summary
          </h1>

          <div className="flex justify-around">
            <div className="border shadow-lg shadow-green-100 bg-red-400 flex justify-center items-center flex-col px-7 py-3 rounded-3xl text-white font-bold">
              <p>Total Beds</p>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <h3>{getSingleRoom?.room?.beds?.length}</h3>
              )}
            </div>

            <div className="border bg-purple-600  flex justify-center items-center flex-col px-7 py-3 rounded-3xl text-white font-bold">
              <p>Total Students Lives here</p>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <h3>{getSingleRoom?.room?.occupants?.length}</h3>
              )}
            </div>

            {isLoading ? (
              <p>Loading...</p>
            ) : getSingleRoom?.room?.isBooked ? (
              <div className="border bg-rose-500  flex justify-center items-center flex-col px-7 py-3 rounded-3xl text-white font-bold">
                {" "}
                <h3>Booked</h3>
              </div>
            ) : (
              <div className="border  bg-green-400  flex justify-center items-center flex-col px-7 py-3 rounded-3xl text-white font-bold">
                {" "}
                <h3>Available</h3>
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-7">
            <div className="spinner"></div>
          </div>
        ) : bedsOfRoom?.beds?.length > 0 ? (
          <div className="flex m-6 gap-2 justify-between my-10">
            {bedsOfRoom?.beds?.map((bed, index) => (
              <BedsOfRoom key={index} bed={bed} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h1 className="text-purple-600 font-bold text-3xl pt-6 my-6">
              No Bed to Show in Room Number {getSingleRoom?.room?.roomNumber}
            </h1>
            <lottie-player
              src="https://assets6.lottiefiles.com/private_files/lf30_3X1oGR.json"
              background="transparent"
              speed="1"
              style={{ width: "300px", height: "300px" }}
              loop
              autoplay
            ></lottie-player>
          </div>
        )}
      </div>
    </>
  );
};

export default RoomDetail;
