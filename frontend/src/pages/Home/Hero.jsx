import { motion } from "framer-motion";

import { styles } from "../../styles";
// import { ComputersCanvas } from "../../components/canvas";
import Typed from "react-typed";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const Hero = () => {
  // const headText =;
  return (
    <section className={`relative w-full h-screen hero  mx-auto hero-light`}>
      <div
        className={`absolute inset-0 top-[120px]   max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} head`}>
            Wel
            <Typed
              strings={[`come to <span className="text-[#915EFF]">REC</span>`]}
              typeSpeed={200}
              backSpeed={100}
              loop
            />
            {/* Welcome to <span className="text-[#915EFF]">REC</span> */}
          </h1>
          <h4
            style={{ lineHeight: "1.2" }}
            className={`${styles.heroSubText}  mt-2 text-[1rem] text-sm text-white-100`}
          >
            Creating a Home Away from Home <br className="sm:block hidden" />{" "}
            Providing Comfortable and Safe Living Spaces in
            <br />
          </h4>

          <a
            href="https://www.ramgarhengg.edu.in/"
            target="_blank"
            style={{ fontSize: "1.2rem" }}
            className={`${styles.heroSubText}  mt-0 underline pb-2 underline-offset-2 text-[0.8rem] text-sm text-orange-500`}
          >
            {" "}
            Ramgarh Engineering College...
          </a>

          <div className="flex items-center py-5 gap-1 cursor-pointer ">
            <Link
              to="/hostels"
              className="text-lg underline btn-light underline-offset-4 text-purple-700 font-bold"
            >
              Visit Hostels
            </Link>
            <span>
              <AiOutlineArrowRight className=" ic text-orange-400 text-xl" />
            </span>
          </div>
        </div>
      </div>

      {/* <ComputersCanvas /> */}

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl jump border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-purple-600 mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
