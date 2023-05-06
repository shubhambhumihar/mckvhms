import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaffs } from "../../features/staff/staffSlice";
const t1 = require("../../assets/team1.png");
const t2 = require("../../assets/team-6.jpg");
const t3 = require("../../assets/team3.png");
const t4 = require("../../assets/team-5.jpg");
const noStaffImg = require("../../assets/free-businessman-signing-contract-3613875-3021097.png");
const ContactInfo = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStaffs());
  }, []);

  const staffState = useSelector((state) => state.staff);

  const { isLoading, staff } = staffState;
  // console.log(staff);
  return (
    <div className="max-w-screen-3xl mx-auto mx my-20 py-6 t" id="contact">
      <h1 className="text-center text-xl md:text-4xl font-bold py-6 ">
        <span className="text-[#654E92] text-5xl">Contact</span> our Staffs.
      </h1>
      {!isLoading ? (
        staff?.staffs?.length > 0 ? (
          <div className="mx-auto w-[90%] grid md:grid-cols-2 lg:grid-cols-3    place-items-center  gap-2">
            {staff?.staffs?.map((staff, index) => (
              <div
                key={index}
                className=" border-emerald-500 rounded-2xl border w-[300px]     flex flex-col self-start justify-between items-center pt-4  shadow-sm shadow-violet-500 hover:scale-95 duration-500 "
              >
                <img
                  src={staff?.images[0]?.url}
                  alt=""
                  className="rounded-full w-[70px] object-cover"
                />

                <div className="py-3 violet-gradient rounded-2xl text-justify flex flex-col justify-center w-full mt-5 my-auto p-6 ">
                  <h1 className="text-lg md:text-xl text-white">
                    {staff?.name}{" "}
                  </h1>
                  <p className="text-white">
                    <span className="text-[#f3f2f7] font-bold ">Phone - </span>{" "}
                    {staff.contactNumber}
                  </p>

                  <p className="text-white">
                    <span className="text-[#f8f7fa] font-bold ">
                      Department -
                    </span>{" "}
                    {staff.department}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-1/2">
            <img className="h-full" src={noStaffImg} alt="" />
            <p>No staff...</p>
          </div>
        )
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default ContactInfo;
