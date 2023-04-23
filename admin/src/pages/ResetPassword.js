import React from "react";
import GeneraInput from "../components/GeneraInput";

const ResetPassword = () => {
  return (
    <div className="py-5 bg-[#F5EBEB] min-h-[100vh] ">
      <br />
      <br />
      <br />
      <br />

      <div className="my-5 w-[30vw] bg-[#BFACE2] rounded-xl mx-auto p-5">
        <h1 className="text-[1.8rem] text-center mb-1 font-semibold text-gray-700 ">
          Reset Password!
        </h1>

        <form action="">
          <GeneraInput
            type="password"
            placeholder="New Password"
            id="password"
            label="New Password"
          />
          <GeneraInput
            type="password"
            placeholder="Confirm Password"
            id="password"
            label="Confirm Password"
          />

          <button
            type="submit"
            class="px-[20px] w-full bg-orange-400 text-white  py-[5px] text-center  rounded-xl"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
