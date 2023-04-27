import React from "react";
import { Link } from "react-router-dom";

const Rooms = ({ room }) => {
  return (
    <Link
      style={{ color: "inherit", textDecoration: "none" }}
      to={`/admin/hostel/room/${room._id} `}
      className="max-w-[80.33%] w-[90%] flex justify-center border rounded-b-none mx-auto rounded-xl "
    >
      <div className="border rounded-xl rounded-b-none border-purple-400">
        <img
          className="h-300px w-full rounded-b-none rounded-xl "
          src="https://cdn.pixabay.com/photo/2023/04/18/20/08/mountain-7935913_640.jpg"
          alt=""
        />
        <div className="p-7  bg-purple-300 ">
          <div className="py-4">
            <p className="text-lg  font-bold text-purple-800 text-clip ">
              Room Number -{" "}
              <span className="bg-gray-500 p-2 h-[20px] w-[20px] text-white rounded-full">
                {room?.roomNumber}
              </span>
            </p>
          </div>
          <div className="flex justify-center items-center py-3 border-orange-600 border-t-2">
            <div className="px-4 py-1 rounded-md flex flex-col items-center justify-center">
              <p>Beds </p>
              <p className="text-bold text-lg text-red-500">
                {room?.beds?.length}{" "}
              </p>
            </div>
            <div className=" px-4 py-1 rounded-md flex flex-col items-center justify-center">
              <p>Students </p>
              <p className="text-bold text-lg text-red-500">
                {room?.occupants?.length}{" "}
              </p>
            </div>

            {room.capacity !== room?.occupants?.length &&
            room?.isBooked === false ? (
              <p className="border border-purple-600 bg-green-500 px-2 py-1 rounded-2xl text-white">
                {" "}
                Available{" "}
              </p>
            ) : (
              <p className="border border-purple-600 bg-red-500 px-2 py-1 rounded-2xl text-white">
                {" "}
                Booked{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Rooms;
