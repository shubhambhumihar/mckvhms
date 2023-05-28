import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import Room from "../../components/Room";
// import { rooms } from "../../constants";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineWifi } from "react-icons/ai";
import { FcServices } from "react-icons/fc";
import { MdOutlineCleaningServices } from "react-icons/md";
import { GiElectric } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "../../features/room/roomSlice";
import { getAllHostels } from "../../features/hostel/hostelSlice";

const Rooms = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRooms());
    dispatch(getAllHostels());
  }, [dispatch]);

  const roomState = useSelector((state) => state.room.rooms.rooms);
  const hostelState = useSelector((state) => state.hostel?.hostel?.hostels);
  // console.log(roomState);
  // console.log(hostelState);

  const { isLoading, isError, isSuccess } = useSelector((state) => state.room);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Link
        to="../"
        className="shadow-sm m-10 p-10 shadow-green-500  inline-block bg-[#065f46] px-4 py-1 text-white rounded-2xl"
      >
        <AiOutlineArrowLeft />
      </Link>
      {isLoading ? (
        <div className="flex justify-center pt-5 mt-7">
          <div class="loader">
            <span class="loader-text">loading</span>
            <span class="load"></span>
          </div>
        </div>
      ) : (
        <div className="max-w-screen-3xl mx-auto  mb-50  w-[100%]  h-fit ">
          <div className=" flex flex-col items-center">
            <h1 className="md:text-3xl text-xl font-bold text-purple-600 underline text-center">
              Welcome to Our Rooms{" "}
            </h1>
            <div className="my-4">
              <div className="flex gap-3 mb-2">
                <div className="h-[15px] w-[15px] flex justify-center items-center rounded-full bg-green-500">
                  <p className="text-center"></p>
                </div>
                <p className="text-xs">available</p>
              </div>
              <div className="flex gap-3">
                <div className="h-[15px] w-[15px] flex justify-center items-center rounded-full bg-rose-600">
                  <p className="text-center"></p>
                </div>
                <p className="text-xs">Booked</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 justify-center place-items-center gap-6 my-10 mb-[9rem]">
            {hostelState?.map((hostel, index) => {
              return (
                <Link
                  key={index}
                  to={`/hostel/${hostel._id}/rooms `}
                  className="border ch bg-red-500 p-6 w-[90%] col-span-1  flex flex-col items-center bg-gradient-to-b from-[#3A1C71] to-[#D76D77] rounded-lg"
                >
                  <p className="text-[1.4rem] text-orange-500 font-bold">
                    Visit Rooms of
                  </p>
                  <p className="text-xs text-purple-500 font-bold">
                    {hostel?.hostel_name}{" "}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Rooms;

// <div className="flex flex-col items-center">
//       <h1 className="text-white font-bold text-3xl pt-6">
//         No Rooms to Show
//       </h1>
//       <lottie-player
//         src="https://assets6.lottiefiles.com/private_files/lf30_3X1oGR.json"
//         background="transparent"
//         speed="1"
//         style={{ width: "300px", height: "300px" }}
//         loop
//         autoplay
//       ></lottie-player>
//     </div>
