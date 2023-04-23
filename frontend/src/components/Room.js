import React from "react";
import { Link } from "react-router-dom";

const Room = ({ room }) => {
  return (
    <>
      <Link to={`/room/${room._id}`}>
        <div className="max-w-screen-2xl my-6 border-b border-gray-600 p-10">
          <div className="mx-auto grid lg:grid-cols-2 justify-center place-items-center  gap-2">
            <div className="shadow-lg shadow-violet-500">
              <img
                className="rounded-xl object-cover hover:scale-105 duration-700 w-[300px] h-[300px]"
                src={room.images[0]?.url}
                alt=""
              />
              <div className="p-4">
                <p className="py-5">{room.price} </p>
                <button className="border px-20 py-2 bg-orange-500 text-white rounded-3xl">
                  Explore more
                </button>
              </div>
            </div>
            <div className=" p-5">
              <p
                dangerouslySetInnerHTML={{ __html: room?.description }}
                className="py-3 text-stone-400"
              ></p>
              <div className="flex items-center gap-5">
                <img
                  className="w-[30px] h-[30px]"
                  src="https://cdn.iconscout.com/icon/free/png-512/wifi-network-signal-wireless-16-28629.png?f=avif&w=512"
                  alt=""
                />{" "}
                <p className="text-orange-400 border-b-2  w-1/3 my-3 flex items-center">
                  FREE WIFI
                </p>
              </div>

              <div className="flex items-center gap-5">
                <img
                  className="w-[30px] h-[30px]"
                  src="https://cdn.iconscout.com/icon/premium/png-512-thumb/rooms-available-1473726-1249590.png?f=avif&w=512"
                  alt=""
                />
                <p className="text-purple-400 border-b-2 w-1/3 ">24*7</p>
              </div>
              <div className="flex justify-end mr-7 ">
                <button className="border px-[22px] py-[4px] rounded-xl border-orange-400 hover:scale-105 duration-700 shadow-2xl shadow-red-500">
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Room;
