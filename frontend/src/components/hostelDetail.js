import React, { useEffect } from "react";
// import { Carousel } from "antd";
import { Image } from "antd";
// import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import RoomInfo from "./RoomInfo";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import HostelInfo from "./HostelInfo";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleHostel } from "../features/hostel/hostelSlice";

const contentStyle = {
  height: "53vh",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  width: "100%",
  objectFit: "cover",
  background: "black",
};

const HostelDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getHostelId = location.pathname.split("/")[2];

  // console.log(getHostelId);
  useEffect(() => {
    dispatch(getSingleHostel(getHostelId));
  }, [getHostelId]);

  const { isLoading, singleHostel } = useSelector((state) => state.hostel);
  console.log(singleHostel);
  const hostelData = singleHostel.hostel;
  console.log(singleHostel?.hostel?.images.length);

  return (
    <>
      {isLoading ? (
        <div className="flex h-[100vh] justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-screen-2xl">
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
              <p className="text-white text-[18px] font-bold cursor-pointer flex ">
                Ramgarh &nbsp;
                <span className="sm:block hidden"> | Engineering College</span>
              </p>
            </Link>

            <p className="relative text-center py-1   border px-20 cursor-pointer border-orange-600 flex justify-center items-center rounded-xl">
              <Link to="/" className=" ">
                {" "}
                Back to home
              </Link>
            </p>
          </div>

          <div className="h-[50vh]">
            <Carousel
              infiniteLoop
              autoPlay={true}
              useKeyboardArrows={true}
              className="max-w-full h-[50vh] "
              showThumbs={false}
            >
              {/* <div className="h-[50vh]"> */}
              {singleHostel?.hostel?.images?.map((imgs) => (
                <div className="h-[50vh]">
                  <img src={imgs.url} alt="ima" />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="roomInfo my-4">
            <HostelInfo hostelData={hostelData} />
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 mx-[3rem]">
            {singleHostel?.hostel?.images?.map((imgs) => (
              <div className="h-[50vh]">
                <Image
                  width={"100%"}
                  className="rounded-lg"
                  // height={"550px"}
                  style={contentStyle}
                  src={imgs.url}
                  alt=""
                />
                {/* <img src={imgs.url} alt="ima" /> */}
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
              {singleHostel?.hostel?.images?.map((imgs) => (
                <div style={contentStyle}>
                  <img
                    className="rounded-lg"
                    style={contentStyle}
                    src={imgs.url}
                    alt=""
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
};

export default HostelDetail;
