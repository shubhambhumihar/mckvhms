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
  console.log(staff);
  return (
    <div className="max-w-screen-2xl my-20 py-6 t" id="contact">
      <h1 className="text-center text-xl md:text-4xl font-bold py-6 text-cyan-700">
        Contact our Staffs...
      </h1>
      {staff?.staffs?.length > 0 ? (
        <div className="mx-auto grid md:grid-cols-2 lg:grid-cols-3 w-[100%] justify-center place-items-center  gap-2">
          {staff?.staffs?.map((staff) => (
            <div className="border border-emerald-500 rounded-2xl w-[90%] max-h-[500px] h-[450px] flex flex-col items-center p-4 shadow-sm shadow-violet-500 hover:scale-95 duration-500 ">
              <img
                src={staff.images[0].url}
                alt=""
                className="rounded-full w-[200px] object-cover"
              />

              <div className="py-3 text-justify mt-6 ">
                <h1 className="text-xl md:text-2xl text-gray-400">
                  {staff?.name}{" "}
                </h1>
                <p className="text-violet-400">
                  <span className="text-teal-600 font-bold ">Phone</span>{" "}
                  {staff.contactNumber}
                </p>
                <p className="text-violet-400 w-max ">
                  <span className="text-teal-600 font-bold ">Email</span>{" "}
                  {staff.email}
                </p>

                <p className="text-violet-400">
                  <span className="text-teal-600 font-bold ">Department</span>{" "}
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
      )}
    </div>
  );
};

export default ContactInfo;
