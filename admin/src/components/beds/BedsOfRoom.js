import React from "react";
import { Link } from "react-router-dom";

const BedsOfRoom = ({ bed }) => {
  //   console.log(bed);
  return (
    <>
      <Link
        to={`/admin/hostel/room/bed/${bed._id}`}
        style={{ color: "inherit", textDecoration: "none" }}
        className="max-w-[70.33%] w-[90%] flex flex-col items-center justify-center border rounded-b-none mx-auto rounded-xl "
      >
        <div className="rounded-xl rounded-b-none border w-full border-purple-400">
          <div>
            <lottie-player
              src="https://assets5.lottiefiles.com/packages/lf20_sg3gnsmo.json"
              background="transparent"
              speed="0.4"
              style={{ width: "300px", height: "300px" }}
              loop
              autoplay
            ></lottie-player>
          </div>

          <div className="p-7 bg-purple-300 ">
            <div className="py-4">
              <p className="text-lg  font-bold text-purple-800 text-clip ">
                Bed Number -{" "}
                <span className="bg-gray-500 p-2 h-[20px] w-[20px] text-white rounded-full">
                  {bed?.bed_number}
                </span>
              </p>
            </div>

            <div className="flex justify-center items-center py-3 border-orange-600 border-t-2">
              <div className=" items-center flex w-full justify-between">
                <p className="text-bold text-left text-sm px-4 py-1 rounded-md text-orange-600 border-b-2 border-gray-600 ">
                  Explore More
                </p>
                {bed?.isAvailable ? (
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
        </div>
      </Link>
    </>
  );
};

export default BedsOfRoom;
