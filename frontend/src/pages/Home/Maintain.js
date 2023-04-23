import React from "react";
import { useDispatch, useSelector } from "react-redux";
const img = require("../../assets/header-bg.png");
const user1 = require("../../assets/user-8.jpg");
const user2 = require("../../assets/user-6.jpg");
const noStaffImg = require("../../assets/free-businessman-signing-contract-3613875-3021097.png");
const Maintain = () => {
  const staffState = useSelector((state) => state.staff);

  const { isLoading, staff } = staffState;

  const staffImages = staff.staffs;

  // console.log(staff);
  // console.log(staffImages);
  return (
    <div className="max-w-screen-2xl my-6" id="maintain">
      <div className="mx-auto grid lg:grid-cols-2 justify-center place-items-center  gap-2">
        <div className="p-7 border-r-[1px] h-[50%] border-gray-400">
          <h1 className="text-2xl lg:text-4xl text-orange-600 font-bold  px-3 text-center border-b-4 border-red-400 max-w-[450px] mx-auto">
            Maintainance Service
          </h1>
          <p className="text-[12px] md:text-sm font-light p-7 text-gray-400 py-4">
            Our Workers are always ready for providing the best Maintainance of
            the hostel you live such as the electricity, water and the room
            claning ,all are taken care by our staffs on the daily basis on
            regular interval once a weak.. and the campus of the hostel is
            always keep clean and dry as no one should complain about that...
          </p>
          <h4 className="text-2xl text-center md:text-3xl mb-5 text-violet-600 border-b-2 border-purple-600 max-w-[200px] mx-auto">
            Our staffs
          </h4>
          {staff?.staffs?.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-1">
              {staff?.staffs?.map((staff) => (
                <div>
                  <img
                    src={staff.images[0]?.url}
                    alt=""
                    className="rounded-full w-[200px] animate-pulse"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-1/2">
              <img className="h-full" src={noStaffImg} alt="" />
              <p>No staff...</p>
            </div>
          )}
        </div>
        <div className="flex justify-start align-top">
          <lottie-player
            src="https://assets8.lottiefiles.com/packages/lf20_B2qAl3/data.json"
            background="transparent"
            speed="1"
            style={{ width: "400px", height: "400px" }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
};

export default Maintain;
