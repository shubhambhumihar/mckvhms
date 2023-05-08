import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

import axios from "axios";
import { Link } from "react-router-dom";
const Search = () => {
  const [query, setQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.get(`${base_url}student/search`, {
        params: {
          query,
        },
        ...config(),
      });

      setStudents(res.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  // console.log(students);
  //  useEffect(()=>{

  //  })
  return (
    <div>
      <h1 className="text-3xl text-center font-bold text-[#424040]">
        Search Student
      </h1>
      <div className=" p-10">
        <form
          onSubmit={handleSearch}
          className="black-gradient rounded-3xl w-[90%] flex p-1 items-center"
        >
          <input
            className="w-[90%] p-5 outline-none rounded-3xl bg-transparent text-white"
            type="text"
            placeholder="Search here using student ID, name or Email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <AiOutlineSearch className="text-white font-bold text-3xl" />
        </form>
        <div className="flex justify-center items-center mt-5">
          <button className="pink-text-gradient text-white  px-20 py-4 rounded-2xl inline-block self-start">
            Search
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <div class="loader">
            <span class="loader-text">loading</span>
            <span class="load"></span>
          </div>
        </div>
      ) : students?.length === 0 ? (
        <div className="flex flex-col items-center">
          <h1 className="text-black font-bold text-3xl pt-6">
            No Student to Show
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
      ) : (
        <div className="bg-slate-900 rounded-2xl w-[90%] mx-auto flex flex-col gap-4 p-10">
          {students?.map((student, index) => {
            return (
              <Link
                to={`/admin/student/${student._id}/details`}
                key={index}
                className="bg-[#121212] text-white w-[70%] p-5 mx-auto rounded-2xl flex justify-between items-center gap-4"
              >
                <Avatar
                  className="flex justify-center items-center"
                  size={64}
                  icon={<UserOutlined />}
                />
                <div className=" flex w-[70%] p-1  self-start ">
                  <div>
                    <h1 className="text-white font-bold text-2xl">
                      {student?.name}{" "}
                    </h1>
                    <p className="text-xs">{student?.email} </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;

//  {
//    isLoading ? (
//      <div className="flex justify-center">
//        <div className="spinner"></div>
//      </div>
//    ) : (
//      <div className="bg-slate-900 rounded-2xl w-[90%] mx-auto flex flex-col gap-4 p-10">
//        {students?.length > 0 ? (
//          students?.map((student, index) => {
//            return (
//              <Link
//                to={`/admin/student/${student._id}`}
//                key={index}
//                className="bg-gray-100 w-1/2 p-5 mx-auto rounded-2xl flex justify-between items-center"
//              >
//                <Avatar
//                  className="flex justify-center items-center"
//                  size={64}
//                  icon={<UserOutlined />}
//                />
//                <div className="">
//                  <h1 className="text-[#121212] font-bold text-2xl">
//                    {student?.name}{" "}
//                  </h1>
//                  <p className="text-xs">{student?.email} </p>
//                </div>
//              </Link>
//            );
//          })
//        ) : (
//          <div className="flex flex-col items-center">
//            <h1 className="text-white font-bold text-3xl pt-6">
//              No Student to Show
//            </h1>
//            <lottie-player
//              src="https://assets6.lottiefiles.com/private_files/lf30_3X1oGR.json"
//              background="transparent"
//              speed="1"
//              style={{ width: "300px", height: "300px" }}
//              loop
//              autoplay
//            ></lottie-player>
//          </div>
//        )}
//      </div>
//    );
//  }
