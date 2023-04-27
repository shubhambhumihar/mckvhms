import React from "react";
import { Link } from "react-router-dom";

const Hostel = ({ hostel }) => {
  return (
    <>
      <Link to={`../hostel/${hostel._id}/details`}>
        <div className="max-w-screen-2xl my-6 border-gray-600 border  w-[90%] mx-auto shadow-sm h-fit shadow-purple-700 cnt rounded-lg">
          <div className=" ">
            <div className="flex justify-center rounded-lg bg-purple-400 p-6 flex-col items-center">
              <h1 className="text-center glow">
                {hostel?.hostel_name} hostel{" "}
              </h1>
              <p className="text-xs font-bold tracking-wider text-white">
                {" "}
                {hostel?.hostel_type}'s hostel{" "}
              </p>
            </div>
            {/* <div className="seprator"></div> */}
            <div className="flex justify-between items-center p-6 ">
              <div className="flex flex-col items-center">
                <p>Rooms Count</p>
                <p className="text-xl font-bold text-orange-500 ">
                  {hostel?.rooms.length}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p>Total Beds</p>
                <p className="text-xl font-bold text-orange-500 ">
                  {hostel?.beds.length}
                </p>
              </div>
              <div>
                {hostel?.capacity !== hostel?.rooms.length * 3 ? (
                  <p className="py-2 px-7 bg-green-400 rounded-lg text-white">
                    Available
                  </p>
                ) : (
                  <p className="p-7 bg-red-400">Booked</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Hostel;
