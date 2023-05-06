import React, { useEffect } from "react";
import ContactInfo from "./ContactInfo";
import Experience from "./Experience";
import Feedback from "./Feedback";
import Food from "./Food";
// import Tech from "./Food";

import Hero from "./Hero";
import HostelInfo from "./HostelInfo";
import Maintain from "./Maintain";
import Overview from "./Overview";
import Team from "./Team";
import { useDispatch, useSelector } from "react-redux";
import { getAllHostels } from "../../features/hostel/hostelSlice";
import { getAllRooms } from "../../features/room/roomSlice";
import Brand from "./Brand";

// import Tech from "./Tech";

const Home = () => {
  const dispatch = useDispatch();
  const totalRooms = useSelector((state) => state?.room?.rooms?.count);
  console.log(totalRooms);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllRooms());
  }, []);

  return (
    <div>
      <Hero />
      <Overview />
      <Experience />
      {/* <Tech /> */}
      <HostelInfo totalRooms={totalRooms} />

      <Food />
      <Brand />
      <Maintain />
      <Team />
      <ContactInfo />
      <Feedback />
    </div>
  );
};

export default Home;
