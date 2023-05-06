import React from "react";
import { Link } from "react-router-dom";

const Hostel = ({ hostel }) => {
  // console.log(hostel);
  return (
    <>
      <Link to={`/hostel/${hostel._id}`}>
        <div className="max-w-screen-3xl bg-[#0f0929]  my-6 border-gray-600 border sm:flex justify-center  w-[90%] mx-auto shadow-sm shadow-purple-700 rounded-lg">
          <div className="flex-1  p-3">
            <img
              className="w-[500px] h-[300px] rounded-lg hImg"
              src={hostel?.images[0]?.url}
              alt=""
            />
            <div className="p-4">
              <p className="py-5">{hostel?.capacity} </p>
              <button className="button-82-pushable">
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text animate__animated animate__rollIn ">
                  Explore
                </span>
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between rep p-5">
            <div>
              <p className=" text-end p-1 mb-1 text-yellow-700 underline   rounded-xl ">
                {hostel?.hostel_type}'s hostel
              </p>
              <p className="text-lg bg-[#272626] p-2 mb-6 text-center text-white  rounded-xl ">
                {hostel?.hostel_name}
              </p>

              <p
                dangerouslySetInnerHTML={{ __html: hostel?.desc }}
                className="py-3 clamp-text text-white text-sm text-sm-center text-justify font-extralight"
              ></p>
            </div>

            <div>
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
                  className="w-[30px] h-[30px] "
                  src="https://cdn.iconscout.com/icon/premium/png-512-thumb/rooms-available-1473726-1249590.png?f=avif&w=512"
                  alt=""
                />

                <p className="text-purple-400 border-b-2 w-1/3 ">
                  {/* {hostel?.availability}{" "} */}
                  24*7
                </p>
              </div>
            </div>

            <div className="flex justify-end align-bottom self-end ">
              <Link
                to={`/hostel/${hostel._id}/rooms`}
                className="border  self-end  text-white px-[22px] py-[4px] rounded-xl border-orange-400 hover:scale-105 duration-700 shadow-2xl shadow-red-500"
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
