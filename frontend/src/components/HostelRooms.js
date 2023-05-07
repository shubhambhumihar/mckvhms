import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Room from "../components/Room";
// import { rooms } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineWifi } from "react-icons/ai";
import { FcServices } from "react-icons/fc";
import { MdOutlineCleaningServices } from "react-icons/md";
import { GiElectric } from "react-icons/gi";
import {
  getRoomsOfHostel,
  getSingleHostel,
} from "../features/hostel/hostelSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

// import { getAllRooms } from "../../features/room/roomSlice";

const HostelRooms = () => {
  const location = useLocation();
  const getHostelId = location.pathname.split("/")[2];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRoomsOfHostel(getHostelId));
    dispatch(getSingleHostel(getHostelId));
  }, [getHostelId]);

  const { roomsOfHostel, singleHostel, isLoading } = useSelector(
    (state) => state.hostel
  );

  // const { isLoading, isError, isSuccess } = useSelector((state) => state.room);
  console.log(roomsOfHostel);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Link
        to="/rooms"
        className="shadow-sm m-10 p-10 shadow-green-500  inline-block bg-[#065f46] px-4 py-1 text-white rounded-2xl"
      >
        <AiOutlineArrowLeft />
      </Link>

      {isLoading ? (
        <div className="flex justify-center pt-5 mt-7">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-screen-2xl    w-[100%] mx-auto h-fit ">
          <div className=" flex flex-col items-center">
            <h1 className="text-2xl font-bold text-purple-600 underline text-center">
              Welcome to {singleHostel?.hostel?.hostel_name}{" "}
            </h1>
            <div className="my-4">
              <div className="flex gap-3 mb-2">
                <div className="h-[15px] w-[15px] flex justify-center items-center rounded-full bg-green-500">
                  <p className="text-center"></p>
                </div>
                <p className="text-xs">available</p>
              </div>
              <div className="flex gap-3 mb-2">
                <div className="h-[15px] w-[15px] flex justify-center items-center rounded-full bg-rose-600">
                  <p className="text-center"></p>
                </div>
                <p className="text-xs">Booked</p>
              </div>
              <div className="flex gap-3 ">
                <div className="h-[15px] w-[15px] flex justify-center items-center rounded-full bg-[#C07F00]">
                  <p className="text-center"></p>
                </div>
                <p className="text-xs">Partially Booked</p>
              </div>
            </div>
          </div>

          <div className="my-10 p-10 gap-5  grid grid-cols-3 ">
            {roomsOfHostel?.rooms?.length > 0 ? (
              <div className="flex col-span-2 p-6 flex-wrap gap-2  ">
                {roomsOfHostel?.rooms?.map((room, index) => {
                  const isFullyBooked =
                    room?.occupants?.length === room?.capacity;

                  const isPratiallyBooked =
                    room?.occupants?.length < room?.capacity &&
                    room?.occupants?.length > 0;

                  const linkStyle = {
                    background: isFullyBooked
                      ? "#ef4444"
                      : isPratiallyBooked
                      ? "#C07F00"
                      : "#22c55e",
                    // Add any other CSS styles you want to apply dynamically
                  };
                  return (
                    <Link
                      className=" amentiesf  h-[60px] w-[60px] flex justify-center items-center rounded-full"
                      to={`/room/${room._id}`}
                      key={index}
                      style={linkStyle}
                    >
                      <p className="text-center">{room?.roomNumber}</p>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col col-span-2 p-6  mr-auto ">
                <h1 className="text-white font-bold text-3xl pt-6">
                  No Room to Show
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

            <div className="flex roomInfo p-5 rounded-lg  flex-col gap-5 items-center justify-center ">
              <div className=" mx-w-[100%] w-[100%]">
                <img
                  className="w-full amentiesfimg "
                  src="https://cdn.pixabay.com/photo/2023/03/19/07/34/car-7862030_640.jpg"
                  alt=""
                />
              </div>

              <section id="amenties" className="   m-auto py-10 ">
                <h1 className="text-xl text-green-700 font-bold py-0  w-[10vw] border-b-4 border-orange-700">
                  AMENTIES
                </h1>
                <div className="grid   lg:grid-cols-2 my-8 content-center justify-center  border">
                  <div className="border py-2 px-12  flex flex-col items-center gap-2">
                    <AiOutlineWifi className="text-purple-800 text-2xl" />
                    <p className="text-xs">FREE WIFI</p>
                  </div>
                  <div className="border py-2 px-12  flex flex-col items-center gap-2">
                    <FcServices className="text-orange-700 text-2xl" />
                    <p className="text-xs">Room Service</p>
                  </div>
                  <div className="border py-2 px-12 flex flex-col items-center gap-2">
                    <MdOutlineCleaningServices className="text-blue-700 text-2xl" />
                    <p className="text-xs">Cleaning </p>
                  </div>
                  <div className="border py-2 px-12 flex flex-col items-center gap-2">
                    <GiElectric className="text-yellow-700 text-2xl" />
                    <p className="text-xs">Electricity </p>
                  </div>
                </div>
                <button className="button-86">Room Demo</button>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HostelRooms;
