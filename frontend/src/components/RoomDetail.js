import React, { useEffect, useState } from "react";
import { Image } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import RoomInfo from "./RoomInfo";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRoom } from "../features/room/roomSlice";
import BedBookModel from "./BedBookModel";
import { getStudentBedRequests } from "../features/bedBooking/bedBookingSlice";
import StudentLoginModal from "./StudentLoginModal";

const contentStyle = {
  height: "53vh",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  width: "100%",
  objectFit: "cover",
  background: "black",
};

const RoomDetail = () => {
  // const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showloginModal = () => {
    setIsLoginModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsLoginModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsLoginModalOpen(false);
  };
  const studentBedBooking = useSelector(
    (state) => state?.bedBooking?.studentBedBooking
  );

  const status = studentBedBooking[0]?.status;
  // console.log(status);

  // console.log(studentBedBooking);
  const user = useSelector((state) => state?.auth?.user?.user);
  useEffect(() => {
    if (user?.isStudent) {
      dispatch(getStudentBedRequests());
    }
  }, [user]);

  const getRoomId = location.pathname.split("/")[2];
  useEffect(() => {
    dispatch(getSingleRoom(getRoomId));
  }, [getRoomId]);

  const { isLoading, singleRoom } = useSelector((state) => state.room);
  console.log(singleRoom);
  const roomData = singleRoom.room;

  return (
    <>
      <div className="max-w-screen-3xl mx-auto">
        <div className="flex h-[15vh] items-center justify-around p-[2rem]">
          <Link
            to="/"
            className="flex items-center gap-2 border-b-2 border-red-500 p-2"
          >
            {" "}
            <img
              src={logo}
              alt="logo"
              className="w-20 h-9 object-contain animate-pulse"
            />
            <p className="text-white text-[18px] sm:flex hidden font-bold cursor-pointer  ">
              Ramgarh &nbsp;
              <span className="sm:block hidden"> | Engineering College</span>
            </p>
          </Link>

          <p className="relative text-center sm:py-1 py-0  border sm:px-20 px-4 cursor-pointer border-orange-600 flex justify-center items-center rounded-xl">
            <Link to="/" className=" ">
              {" "}
              Back to home
            </Link>
          </p>
        </div>

        <div className="sm:h-[50vh] h-fit">
          <Carousel
            infiniteLoop
            autoPlay={true}
            useKeyboardArrows={true}
            className="max-w-full sm:h-[50vh] h-fit "
            showThumbs={false}
          >
            {singleRoom?.room?.images?.map((imgs, index) => (
              <div
                key={index}
                className="sm:h-[50vh] h-fit flex justify-center items-center"
                style={{
                  background: "linear-gradient(to bottom, #000000, #000000)",
                }}
              >
                <img
                  style={{
                    background: "linear-gradient(to bottom, #000000, #000000)",
                  }}
                  className="bg-cover bg-center bg-blend-soft-light object-cover"
                  src={imgs.url}
                  alt=""
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="roomInfo my-4">
          <RoomInfo singleRoom={singleRoom} />
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 mx-[3rem]">
          {singleRoom?.room?.images?.map((imgs, index) => (
            <div key={index} className="border-red-600 h-full">
              <Image
                width={"100%"}
                // height={"550px"}
                style={contentStyle}
                src={imgs.url}
                alt=""
              />
            </div>
          ))}

          <Carousel
            infiniteLoop
            autoPlay={true}
            useKeyboardArrows={true}
            className="max-w-full "
            showThumbs={false}
            style={contentStyle}
          >
            {singleRoom?.room?.images?.map((imgs, index) => (
              <div key={index} style={contentStyle}>
                <img style={contentStyle} src={imgs.url} alt="" />
              </div>
            ))}
          </Carousel>
        </div>

        {user?.isStudent ? (
          <div className="flex justify-center sm:ml-10 ml-0 items-align my-8 mt-[3rem] mx-auto sm:mb-[10rem] mb-[9rem]">
            {status ? (
              <button className="sm:py-3 sm:text-lg text-xs py-2 inline-block sm:px-20 px-10 bg-yellow-600 text-white font-bold italic line-height-[24px] space-x-4 sm:ml-10 ml-0  rounded-xl">
                Your bed request is in {status} state
              </button>
            ) : (
              <button
                onClick={showModal}
                className="sm:py-3 py-0 inline-block px-20 bg-orange-800 text-white font-bold italic line-height-[24px] space-x-4  rounded-xl"
              >
                Book a bed in this Room
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={showloginModal}
            className="py-3 my-7 ml-10 inline-block px-20 bg-orange-800 text-white font-bold italic line-height-[24px] space-x-4  rounded-xl"
          >
            Login as student
          </button>
        )}
      </div>
      <BedBookModel
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        status={status}
        // setStatus={setStatus}
      />

      <StudentLoginModal
        isModalOpen={isLoginModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default RoomDetail;
