import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../../styles";
import { services } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn, textVariant } from "../../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 style={{ color: "#654E92" }} className={styles.sectionHeadText}>
          Overview.
        </h2>
      </motion.div>
      <motion.div className="flex items-start">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Looking for a hostel that can cater to all your needs? You've come to
          the right place! Our hostel management team is dedicated to providing
          a seamless living experience for students. Discover a new level of
          hostel living with our management services. We are committed to
          ensuring that our students feel secure, comfortable, and supported
          throughout their stay.
        </motion.p>
        <motion.div>
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_ofa3xwo7.json"
            background="transparent"
            speed="0.5"
            style={{ width: "300px", height: "300px" }}
            loop
            autoplay
          ></lottie-player>
        </motion.div>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
