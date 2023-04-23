import React from "react";
import GeneraInput from "../components/GeneraInput";

const ForgotPassword = () => {
  return (
    <div className="py-5 bg-[#F5EBEB] min-h-[100vh] ">
      <br />
      <br />
      <br />
      <br />

      <div className="my-5 w-[30vw] bg-[#BFACE2] rounded-xl mx-auto p-5">
        <h1 className="text-[1.5rem] text-center mb-1 font-semibold text-gray-700 ">
          Forgot Password!
        </h1>
        <p className="text-sm text-gray-900 text-center mb-6">
          Please Enter your registered email
        </p>
        <form action="">
          <GeneraInput
            type="email"
            placeholder="Your Email"
            id="email"
            label="Email"
          />

          <button
            type="submit"
            class="px-[20px] w-full bg-orange-400 text-white  py-[5px] text-center  rounded-xl"
          >
            Get Reset Password Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
