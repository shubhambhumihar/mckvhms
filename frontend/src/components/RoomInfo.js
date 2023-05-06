import React, { useEffect, useState } from "react";

import AnchorLink from "react-anchor-link-smooth-scroll";
import { AiOutlineWifi } from "react-icons/ai";
import { FcServices } from "react-icons/fc";
import { MdOutlineCleaningServices } from "react-icons/md";
import { GiElectric } from "react-icons/gi";
import { Avatar, List } from "antd";
import { rules } from "../constants";
import img from "../assets/user-8.jpg";
import BedBookModel from "./BedBookModel";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentBedRequests,
  getTotalBedRequests,
} from "../features/bedBooking/bedBookingSlice";
import StudentLoginModal from "./StudentLoginModal";

const RoomInfo = ({ singleRoom }) => {
  // console.log(singleRoom);
  const dispatch = useDispatch();
  // const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const user = useSelector((state) => state?.auth?.user?.user);
  console.log(user);
  const studentBedBooking = useSelector(
    (state) => state?.bedBooking?.studentBedBooking
  );

  const status = studentBedBooking[0]?.status;
  console.log(status);

  console.log(studentBedBooking);

  useEffect(() => {
    if (user?.isStudent) {
      dispatch(getStudentBedRequests());
    }
  }, [user]);

  return (
    <div>
      <div>
        {/* <AnchorLink href="#things">Things</AnchorLink>
        <AnchorLink href="#stuff">Stuff</AnchorLink> */}

        <div className=" border-b-2 flex justify-center items-end  ">
          <AnchorLink href="#overview" className="border px-8  py-0">
            OVERVIEW
          </AnchorLink>
          <AnchorLink href="#amenties" className="border px-8   py-0">
            AMENTIES
          </AnchorLink>
          <AnchorLink href="#rules" className="border px-8   py-0">
            RULES AND POLICY
          </AnchorLink>
          <AnchorLink href="#review" className="border px-8   py-0">
            USER REVIEW
          </AnchorLink>
        </div>

        <section id="overview" className="w-[90vw] mx-auto  py-10 ">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl text-green-700 font-bold py-0 mx-20 w-[20vw] border-b-4 border-orange-700">
              ABOUT ROOM
            </h1>
            {user?.isStudent ? (
              <div className="flex ml-10 items-align my-8 mt-[3rem]">
                {status ? (
                  <button className="py-3 inline-block px-20 bg-yellow-600 text-white font-bold italic line-height-[24px] space-x-4  rounded-xl">
                    Your bed request is in {status} state
                  </button>
                ) : (
                  <button
                    onClick={showModal}
                    className="py-3 inline-block px-20 bg-orange-800 text-white font-bold italic line-height-[24px] space-x-4  rounded-xl"
                  >
                    Book a bed in this Room
                  </button>
                )}
              </div>
            ) : (
              <StudentLoginModal />
            )}
          </div>

          <div className="grid lg:grid-cols-2 justify-center  mx-auto gap-5 items-center ">
            <div className="flex flex-col items-center">
              <h3 className="flex justify-center items-center">
                <span>Room No-</span>
                <span className="text-purple-700 text-xl ml-2 italic">
                  {singleRoom?.room?.roomNumber}
                </span>{" "}
              </h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: singleRoom?.room?.description,
                }}
                className="text-justify text-sm text-gray-300 my-5 "
              ></p>
              <h3 className="flex justify-center  items-center">
                <span>Price-</span>
                <span className="text-purple-700 text-xl ml-2 italic">
                  RS/{singleRoom?.room?.price}
                </span>{" "}
              </h3>
            </div>

            <div className=" flex justify-center">
              <lottie-player
                src="https://assets10.lottiefiles.com/packages/lf20_iqzdbnft.json"
                background="transparent"
                speed="0.5"
                style={{ width: "500px", height: "500px" }}
                loop
                autoplay
              ></lottie-player>
            </div>
          </div>

          <div className="flex justify-center  mx-auto">
            <div className="flex justify-evenly  w-full  mx-auto flex-wrap gap-6">
              <div className="border bg-red-500 p-6 w-[30%] flex  flex-col items-center bg-gradient-to-b from-[#3A1C71] to-[#D76D77] rounded-lg">
                <p className="text-xl text-white-100 font-bold">Total Beds</p>
                <p className="text-sm text-red-300 font-bold">
                  {singleRoom?.room?.beds.length}
                  {/* {hostelData?.number_of_rooms}{" "} */}
                </p>
              </div>
              <div className="border bg-red-500 p-6 w-[30%] flex  flex-col items-center bg-gradient-to-b from-[#07a463] to-[#545152] rounded-lg">
                <p className="text-xl text-white-100 font-bold">
                  Total Students
                </p>
                <p className="text-sm text-red-300 font-bold">
                  {singleRoom?.room?.occupants.length}
                  {/* {hostelData?.capacity} */}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="amenties" className="w-[90vw] m-auto py-10 ">
          <h1 className="text-3xl text-green-700 font-bold py-0  w-[20vw] border-b-4 border-orange-700">
            AMENTIES
          </h1>
          <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 my-8 content-center justify-center  border">
            <div className="border py-4 px-20  flex flex-col items-center gap-2">
              <AiOutlineWifi className="text-purple-800 text-2xl" />
              <p>FREE WIFI</p>
            </div>
            <div className="border py-4 px-20  flex flex-col items-center gap-2">
              <FcServices className="text-orange-700 text-2xl" />
              <p>Room Service</p>
            </div>
            <div className="border py-4 px-20  flex flex-col items-center gap-2">
              <MdOutlineCleaningServices className="text-blue-700 text-2xl" />
              <p>Cleaning </p>
            </div>
            <div className="border py-4 px-20  flex flex-col items-center gap-2">
              <GiElectric className="text-yellow-700 text-2xl" />
              <p>Electricity </p>
            </div>
          </div>
        </section>
        <section id="rules" className="w-[90vw] mx-auto text-white py-10 ">
          <h1 className="text-3xl text-green-700 font-bold py-0 w-[20vw] border-b-4 border-orange-700">
            Common Rules
          </h1>
          <p className="my-[20px]">
            Any violation of hostel rules may result in the guest being asked to
            leave the hostel immediately.
          </p>
          <div
            className="bg-[#1a0c36] p-10 rounded-xl text-white
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
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </div>
        </section>
        <section id="review" className="w-[90vw] mx-auto  py-10 ">
          <h1 className="text-3xl text-green-700 font-bold py-0  w-[20vw] border-b-4 border-orange-700">
            REVIEWS
          </h1>
          <div className="grid md:grid-cols-2 items-center my-6 justify-center  mx-auto lg:grid-cols-4">
            <div className="flex flex-col border-r-2 border-gray-600 items-center p-3">
              <img
                className="rounded-full w-[50px] h-[50px]"
                src={img}
                alt=""
              />
              <p className="p-6 text-sm text-justify">
                your hospitality of your hotel is good. food is also good.
                ambiance of the inner rooms & cleanliness is superb. overall
                everything seems to be good. 👍. overall my stay was good.
                enjoyed the hospitality of your hostel reception & resturant in
                toto .🤝
              </p>
            </div>
            <div className="flex flex-col border-r-2 border-gray-600 items-center p-3">
              <img
                className="rounded-full w-[50px] h-[50px]"
                src={img}
                alt=""
              />
              <p className="p-6 text-sm text-justify">
                your hospitality of your hotel is good. food is also good.
                ambiance of the inner rooms & cleanliness is superb. overall
                everything seems to be good. 👍. overall my stay was good.
                enjoyed the hospitality of your hostel reception & resturant in
                toto .🤝
              </p>
            </div>
            <div className="flex flex-col border-r-2 border-gray-600 items-center p-3">
              <img
                className="rounded-full w-[50px] h-[50px]"
                src={img}
                alt=""
              />
              <p className="p-6 text-sm text-justify">
                your hospitality of your hotel is good. food is also good.
                ambiance of the inner rooms & cleanliness is superb. overall
                everything seems to be good. 👍. overall my stay was good.
                enjoyed the hospitality of your hostel reception & resturant in
                toto .🤝
              </p>
            </div>
            <div className="flex flex-col  items-center p-3">
              <img
                className="rounded-full w-[50px] h-[50px]"
                src={img}
                alt=""
              />
              <p className="p-6 text-sm text-justify">
                your hospitality of your hotel is good. food is also good.
                ambiance of the inner rooms & cleanliness is superb. overall
                everything seems to be good. 👍. overall my stay was good.
                enjoyed the hospitality of your hostel reception & resturant in
                toto .🤝
              </p>
            </div>
          </div>
        </section>
      </div>
      <BedBookModel
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        status={status}
        // setStatus={setStatus}
      />
    </div>
  );
};

export default RoomInfo;
