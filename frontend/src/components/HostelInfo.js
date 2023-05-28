import React, { useEffect } from "react";

import AnchorLink from "react-anchor-link-smooth-scroll";
import { AiOutlineWifi } from "react-icons/ai";
import { FcServices } from "react-icons/fc";
import { MdOutlineCleaningServices } from "react-icons/md";
import { GiElectric } from "react-icons/gi";
import { Avatar, List } from "antd";
import { rules } from "../constants";
import img from "../assets/user-8.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineWhatsApp,
  AiOutlineLinkedin,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { getAllStaffs } from "../features/staff/staffSlice";

const HostelInfo = ({ hostelData }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllStaffs());
  // }, [hostelData]);

  return (
    <div className="max-w-[1200px] mx-auto">
      <div>
        <div className="  underline flex justify-center items-end  ">
          <AnchorLink
            href="#overview"
            className=" border amen sm:px-8 px-2  sm:text-lg text-xs   py-0"
          >
            OVERVIEW
          </AnchorLink>
          <AnchorLink
            href="#amenties"
            className=" border amen sm:px-8 px-2  sm:text-lg text-xs   py-0"
          >
            AMENTIES
          </AnchorLink>
          <AnchorLink
            href="#rules"
            className=" border amen sm:px-8 px-2  sm:text-lg text-xs   py-0"
          >
            RULES AND POLICY
          </AnchorLink>

          <AnchorLink
            href="#review"
            className=" border amen  anc sm:px-8 px-2  sm:text-lg text-xs   py-0  "
          >
            USER REVIEW
          </AnchorLink>
        </div>

        <section id="overview" className="w-[100%]  py-10 ">
          <h1 className="sm:text-3xl text-xl text-center  text-green-700 font-bold py-0 sm:mx-20 mx-5 sm:w-[20vw]  border-b-4 border-orange-700">
            ABOUT Hostel
          </h1>
          <div className="grid lg:grid-cols-2 justify-center sm:my-6 my-3 mx-auto gap-5 items-center ">
            <div className="flex justify-center">
              <p
                dangerouslySetInnerHTML={{ __html: hostelData?.desc }}
                className="text-justify text-sm text-gray-100 sm:my-5 my-3   "
              ></p>
            </div>

            <div className=" flex justify-center mb-5">
              <lottie-player
                src="https://assets8.lottiefiles.com/packages/lf20_ghunc0fe.json"
                background="transparent"
                speed="0.5"
                style={{ width: "400px", height: "400px" }}
                loop
                autoplay
              ></lottie-player>
            </div>
          </div>

          <div className="flex justify-evenly flex-wrap gap-6">
            <div className="border bg-red-500 p-6 sm:w-[30%] w-1/3 flex  flex-col items-center bg-gradient-to-b from-[#3A1C71] to-[#D76D77] rounded-lg">
              <p className="sm:text-xl text-xs text-white-100 text-center font-bold">
                Total Rooms
              </p>
              <p className="text-sm text-red-300 font-bold">
                {hostelData?.number_of_rooms}{" "}
              </p>
            </div>
            <div className="border bg-red-500 p-6 sm:w-[30%] w-1/3 flex  flex-col items-center bg-gradient-to-b from-[#07a463] to-[#545152] rounded-lg">
              <p className="sm:text-xl text-xs text-center text-white-100 font-bold">
                Total Capacity
              </p>
              <p className="text-sm text-red-100 font-bold">
                {hostelData?.capacity}
              </p>
            </div>
            <div className="border bg-red-500 p-6 sm:w-[30%] w-1/3 flex flex-col items-center bg-gradient-to-b from-[#ffaf7b] to-[#b88093] rounded-lg">
              <p className="sm:text-xl text-xs text-center text-white-100 font-bold">
                Total Canteen
              </p>
              <p className="text-lg text-red-100 font-bold">1</p>
            </div>
            <div className="border p-6 w-[30%] flex flex-col items-center bg-gradient-to-b from-[#ef3b36] to-[#D76D77] rounded-lg">
              <p className="sm:text-xl text-xs text-center text-white-100 font-bold">
                Total Mess
              </p>
              <p className="text-sm text-center text-red-300 font-bold">4</p>
            </div>
            <div className="border bg-red-500 p-6 sm:w-[30%] w-1/3 flex flex-col items-center bg-gradient-to-b from-[#3A1C71] to-[#2fe3c2] rounded-lg">
              <p className="sm:text-xl text-xs text-center text-white-100 font-bold">
                Total Staffs
              </p>
              <p className="text-sm text-red-300 font-bold">200</p>
            </div>
          </div>
        </section>
        <section id="amenties" className="w-[90vw] m-auto py-10 ">
          <h1 className="sm:text-3xl text-xl text-center  text-green-700 font-bold py-0 sm:mx-20 mx-5 sm:w-[20vw]  border-b-4 border-orange-700 ">
            AMENTIES
          </h1>
          <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 my-8 content-center justify-center  sm:border">
            <div className="border anc py-4 px-20  flex flex-col items-center gap-2">
              <AiOutlineWifi className="animate-pulse text-purple-800 text-2xl" />
              <p>FREE WIFI</p>
            </div>
            <div className="border anc py-4 px-20  flex flex-col items-center gap-2">
              <FcServices className="animate-pulse text-orange-700 text-2xl" />
              <p>Room Service</p>
            </div>

            <div className="border py-4 px-20 anc flex flex-col items-center gap-2">
              <MdOutlineCleaningServices className="text-blue-700 text-2xl" />
              <p>Cleaning </p>
            </div>
            <div className="border py-4 px-20 anc  flex flex-col items-center gap-2">
              <GiElectric className="text-yellow-700 text-2xl" />
              <p>Electricity </p>
            </div>
          </div>
        </section>
        <section id="rules" className="w-[90vw] mx-auto text-white py-10 ">
          <h1 className="sm:text-3xl text-xl text-center  text-green-700 font-bold py-0 sm:mx-20 mx-5 sm:w-[20vw]  border-b-4 border-orange-700 ">
            Common Rules
          </h1>
          <p className="my-[20px] sm:text-lg text-sm">
            Any violation of hostel rules may result in the guest being asked to
            leave the hostel immediately.
          </p>
          <div
            className="bg-[#0f0929]  p-10 rounded-xl text-white
          "
          >
            <List
              itemLayout="horizontal"
              dataSource={rules}
              renderItem={(item, index) => (
                <List.Item className="text-white">
                  <List.Item.Meta
                    className="text-red-600"
                    avatar={
                      <Avatar
                        src={`https://joesch.moe/api/v1/random?key=${index}`}
                      />
                    }
                    title={<p className="text-yellow-700">{item.title}</p>}
                    description={
                      <p className="sm:text-md text-xs">{item.description} </p>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </section>

        <section id="review" className="w-[90vw] mx-auto  py-10 ">
          <h1 className="sm:text-3xl text-xl text-green-700 font-bold py-0  sm:w-[20vw] w-[50vw] border-b-4 border-orange-700 ">
            REVIEWS
          </h1>
          <div className="grid md:grid-cols-2 gap-4  items-center my-6 justify-center  mx-auto lg:grid-cols-4">
            <div className="flex flex-col rounded-3xl shadow-md shadow-gray-700    items-center p-3">
              <div className="bg-gray-900 rounded-lg w-full flex  shadow-sm shadow-rose-200 justify-center items-center p-7">
                <img
                  className="rounded-full w-[50px] h-[50px]"
                  src={img}
                  alt=""
                />
              </div>
              <div className="">
                <p className="p-6 text-[0.7rem] font-light text-justify">
                  your hospitality of your hotel is good. food is also good.
                  ambiance of the inner rooms & cleanliness is superb. overall
                  everything seems to be good. 👍. overall my stay was good.
                  enjoyed the hospitality of your hostel reception & resturant
                  in toto .🤝
                </p>
                <p className="px-6 text-sm font-bold py-3 text-orange-600 shadow-md shadow-rose-500 text-justify">
                  Gourav kumar
                </p>
              </div>
            </div>
            <div className="flex flex-col rounded-3xl shadow-md shadow-gray-700    items-center p-3">
              <div className="bg-gray-900 rounded-lg w-full flex  shadow-sm shadow-rose-200 justify-center items-center p-7">
                <img
                  className="rounded-full w-[50px] h-[50px]"
                  src={img}
                  alt=""
                />
              </div>
              <div className="">
                <p className="p-6 text-[0.7rem] font-light text-justify">
                  your hospitality of your hotel is good. food is also good.
                  ambiance of the inner rooms & cleanliness is superb. overall
                  everything seems to be good. 👍. overall my stay was good.
                  enjoyed the hospitality of your hostel reception & resturant
                  in toto .🤝
                </p>
                <p className="px-6 text-sm font-bold py-3 text-orange-600 shadow-md shadow-rose-500 text-justify">
                  Gourav kumar
                </p>
              </div>
            </div>
            <div className="flex flex-col rounded-3xl shadow-md shadow-gray-700    items-center p-3">
              <div className="bg-gray-900 rounded-lg w-full flex  shadow-sm shadow-rose-200 justify-center items-center p-7">
                <img
                  className="rounded-full w-[50px] h-[50px]"
                  src={img}
                  alt=""
                />
              </div>
              <div className="">
                <p className="p-6 text-[0.7rem] font-light text-justify">
                  your hospitality of your hotel is good. food is also good.
                  ambiance of the inner rooms & cleanliness is superb. overall
                  everything seems to be good. 👍. overall my stay was good.
                  enjoyed the hospitality of your hostel reception & resturant
                  in toto .🤝
                </p>
                <p className="px-6 text-sm font-bold py-3 text-orange-600 shadow-md shadow-rose-500 text-justify">
                  Gourav kumar
                </p>
              </div>
            </div>
            <div className="flex flex-col rounded-3xl shadow-md shadow-gray-700    items-center p-3">
              <div className="bg-gray-900 rounded-lg w-full flex  shadow-sm shadow-rose-200 justify-center items-center p-7">
                <img
                  className="rounded-full w-[50px] h-[50px]"
                  src={img}
                  alt=""
                />
              </div>
              <div className="">
                <p className="p-6 text-[0.7rem] font-light text-justify">
                  your hospitality of your hotel is good. food is also good.
                  ambiance of the inner rooms & cleanliness is superb. overall
                  everything seems to be good. 👍. overall my stay was good.
                  enjoyed the hospitality of your hostel reception & resturant
                  in toto .🤝
                </p>
                <p className="px-6 text-sm font-bold py-3 text-orange-600 shadow-md shadow-rose-500 text-justify">
                  Gourav kumar
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HostelInfo;
