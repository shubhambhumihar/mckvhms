import React from "react";
import { Link } from "react-router-dom";

const Hostel = ({ hostel }) => {
  console.log(hostel);
  return (
    <>
      <Link to={`/hostel/${hostel._id}`}>
        <div className="max-w-screen-2xl my-6 border-gray-600 border flex justify-center w-[90%] mx-auto shadow-sm h-fit shadow-purple-700 rounded-lg">
          <div className="w-[50vw] p-3">
            <img
              className="w-[500px] h-[300px] rounded-lg"
              src={hostel?.images[0]?.url}
              alt=""
            />
            <div className="p-4">
              <p className="py-5">{hostel?.capacity} </p>
              <button className="border px-12 py-1 bg-orange-500 text-white rounded-3xl">
                Explore
              </button>
            </div>
          </div>
          <div className="w-[50vw] p-5">
            <p className="border border-dashed border-green-400 text-center text-purple-700 bg-white rounded-xl ">
              {hostel?.hostel_name}'s hostel
            </p>
            <p className="border border-dashed border-green-400 text-center text-purple-700 bg-white rounded-xl ">
              {hostel?.hostel_type}'s hostel
            </p>
            <p
              dangerouslySetInnerHTML={{ __html: hostel?.desc }}
              className="py-3 text-white text-sm text-sm-center text-justify font-extralight"
            ></p>
            <div className="flex items-center gap-5">
              <img
                className="w-[30px] h-[30px]"
                src="https://cdn.iconscout.com/icon/free/png-512/wifi-network-signal-wireless-16-28629.png?f=avif&w=512"
                alt=""
              />{" "}
              <h4 className="text-orange-400 border-b-2  w-1/3 my-3 flex items-center">
                Free Wifi
              </h4>
            </div>

            <div className="flex items-center gap-5">
              <img
                className="w-[30px] h-[30px]"
                src="https://cdn.iconscout.com/icon/premium/png-512-thumb/rooms-available-1473726-1249590.png?f=avif&w=512"
                alt=""
              />

              <p className="text-purple-400 border-b-2 w-1/3 ">
                {/* {hostel?.availability}{" "} */}
                24*7
              </p>
            </div>
            <div className="flex justify-end mr-7 mt-6 ">
              <Link
                to={`/hostel/${hostel._id}/rooms`}
                className="border text-white px-[22px] py-[4px] rounded-xl border-orange-400 hover:scale-105 duration-700 shadow-2xl shadow-red-500"
              >
                Visit Rooms
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Hostel;
