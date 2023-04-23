import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Room from "../components/Room";
// import { rooms } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "../features/room/roomSlice";
// import { getAllRooms } from "../../features/room/roomSlice";

const HostelRooms = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);

  const roomState = useSelector((state) => state.room.rooms.rooms);
  console.log(roomState);

  const { isLoading, isError, isSuccess } = useSelector((state) => state.room);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Link
        to="/"
        className="relative top-7 left-10 bg-red border cursor-pointer border-orange-600 w-[200px] flex justify-center rounded-3xl px-30 py-2"
      >
        <p>Back to home</p>
      </Link>
      <h1 className="text-center text-4xl text-orange-500 py-9">Our Rooms</h1>
      {/* <div className="relative"> */}

      {/* </div> */}
      {isLoading ? (
        <div className="flex justify-center pt-5 mt-7">
          <div className="spinner"></div>
        </div>
      ) : roomState?.length > 0 ? (
        roomState?.map((room) => <Room key={room._id} room={room} />)
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-white font-bold text-3xl pt-6">
            No Rooms to Show
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
    </>
  );
};

export default HostelRooms;
