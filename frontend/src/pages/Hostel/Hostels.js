import React, { useEffect } from "react";

import Hostel from "../../components/Hostel";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllHostels } from "../../features/hostel/hostelSlice";

const Hostels = () => {
  const dispatch = useDispatch();

  const getHostels = () => {
    dispatch(getAllHostels());
  };

  useEffect(() => {
    getHostels();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const hostelState = useSelector((state) => state.hostel);

  const { isLoading, isSuccess } = hostelState;

  const hostels = hostelState.hostel.hostels;
  console.log(hostels?.length);

  // console.log(hostelState);
  return (
    <>
      <div className="max-w-screen-2xl ">
        <div className="hostel">
          <div className="hostelTop ">
            <Link
              to="/"
              className="relative top-7 left-0 bg-red border cursor-pointer border-orange-600  w-[150px] flex justify-center rounded-3xl lg:px-30 lg:py-2"
            >
              <h6>Back to home</h6>
            </Link>
            <div className="flex flex-col items-center">
              <h1 className="pt-10 lg:text-[3rem]">
                Welcome to{" "}
                <span className="text-purple-700 font-bold underline mr-2">
                  REC{" "}
                </span>
                Hostel
              </h1>
              <h6 className="text-sm border-b-2 border-red-500">
                Where Budget Meets Adventure
              </h6>
              <div className="hostelMid">
                <h3 className="">Total 4 hostel</h3>
                <h6>2 Girls & 2 Boys</h6>
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center pt-5 mt-7">
              <div className="spinner"></div>
            </div>
          ) : hostels?.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-2 justify-center mx-auto  mb-[-200px] relative z-40 h">
              {hostels?.map((hostel) => (
                <Hostel key={hostel._id} hostel={hostel} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h1 className="text-white font-bold text-3xl pt-6">
                No Hostel to Show
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
      </div>
    </>
  );
};

export default Hostels;
