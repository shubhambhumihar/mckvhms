import React, { useEffect } from "react";

import Hostel from "../../components/Hostel";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllHostels } from "../../features/hostel/hostelSlice";
import { motion } from "framer-motion";

import { styles } from "../../styles";
import { fadeIn, textVariant } from "../../utils/motion";

const Hostels = () => {
  const dispatch = useDispatch();

  const getHostels = () => {
    dispatch(getAllHostels());
  };

  useEffect(() => {
    getHostels();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const hostelState = useSelector((state) => state.hostel);

  const { isLoading, isSuccess } = hostelState;

  const hostels = hostelState?.hostel?.hostels;
  // console.log(hostels?.length);

  // console.log(hostelState);
  return (
    <>
      <div className="max-w-screen-3xl  mx-auto  ">
        <div className="hostel">
          <div className="hostelTop ">
            <Link
              to="/"
              className="relative top-7 left-3 animate__animated animate__jackInTheBox   cursor-pointer  "
            >
              <button className="button-85">Back to home</button>
            </Link>{" "}
            <div className="flex flex-col items-center">
              <motion.div
                variants={textVariant()}
                className="animate__animated animate__bounce"
              >
                <p className={styles.sectionSubText}> Welcome to</p>
                <h2
                  style={{ color: "#eee" }}
                  className={styles.sectionHeadText}
                  variants={fadeIn("", "", 0.1, 1)}
                >
                  REC HOSTEL.
                </h2>
              </motion.div>

              <h6 className="text-sm border-b-2 border-red-500 ">
                Where Budget Meets Adventure
              </h6>
              <div className="hostelMid my-0">
                <h3 className="mb-0 p-0 line-height-1">Total 4 hostel</h3>
                <p className="mb-0 p-0 line-height-1">2 Girls & 2 Boys</p>
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center pt-5 mt-7">
              <div class="loader">
                <span class="loader-text">loading</span>
                <span class="load"></span>
              </div>
            </div>
          ) : hostels?.length > 0 ? (
            <div className="grid animate__animated animate__flash lg:grid-cols-2 gap-2 justify-center mx-auto  mb-[-200px] relative z-40 h">
              {hostels?.map((hostel) => (
                <Hostel key={hostel._id} hostel={hostel} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h1 className="text-white font-bold text-3xl pt-6">
                No Hostel to Show
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
          )}
        </div>
      </div>
    </>
  );
};

export default Hostels;
