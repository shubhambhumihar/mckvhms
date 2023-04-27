import React, { useEffect } from "react";
import PostSide from "../../components/PostSide";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="blog  mb-40">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

      <div className="grid lg:grid-cols-4 gap-3">
        <div className="logoSide flex flex-col  gap-4 p-10  bg-[#0e0e0e] ">
          <h3 className="font-semibold text-xl text-yellow-600 ">#POST</h3>
          <h3 className="font-semibold text-xl text-yellow-600 ">#BLOG</h3>
          <h3 className="font-semibold text-xl text-yellow-600 ">#HMS</h3>
          <h3 className="font-semibold text-xl text-yellow-600 ">#REC</h3>
          <div className="w-[50%] bg-orange-500 h-[2px]"></div>
        </div>
        <div className="postSide col-span-2">
          <PostSide />
        </div>
        <div className="showSide h-[40vh] flex flex-col justify-center p-5">
          <h1 className="font-semibold text-xl text-yellow-600 text-justify ">
            Dont Post anything other <br /> than college activity
          </h1>
          <h1 className="font-semibold text-xl text-yellow-600 ">
            Follow the Rule <br /> and Regulation{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Blog;
