import React, { useEffect } from "react";
import ContactInfo from "./ContactInfo";
import Experience from "./Experience";
import Feedback from "./Feedback";
import Food from "./Food";

import Hero from "./Hero";
import HostelInfo from "./HostelInfo";
import Maintain from "./Maintain";
import Overview from "./Overview";
import Team from "./Team";
import Tech from "./Tech";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Hero />
      <Overview />
      <Experience />
      <Tech />
      <HostelInfo />
      <Food />
      <Maintain />
      <Team />
      <ContactInfo />
      <Feedback />
    </div>
  );
};

export default Home;
