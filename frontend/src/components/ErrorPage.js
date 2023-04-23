import React from "react";

const ErrorPage = () => {
  return (
    <div className="h-[70vh] flex justify-center items-center ">
      <div>
        <lottie-player
          src="https://assets3.lottiefiles.com/packages/lf20_xiebbQE7S1.json"
          background="transparent"
          speed="1"
          style={{ width: "400px", height: "400px" }}
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
  );
};

export default ErrorPage;
