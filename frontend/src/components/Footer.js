import React from "react";
import { Link } from "react-router-dom";

const foo = require("../assets/home.png");
const Footer = () => {
  return (
    <div className="max-w-screen-3xl mx-auto py-7 mt-100   t footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <div className="mx-auto grid md:grid-cols-2 lg:grid-cols-5 justify-between place-items-center  gap-2">
        <div className="col-span-2 p-6">
          <div className="text-center flex justify-center align-middle">
            <img className="w-100" src={foo} alt="" />

            <h1 className="ml-5 md:text-7xl text-5xl text-purple-700 font-bold">
              MCKV
            </h1>
          </div>
          <p className="text-white pt-2 font-bold">
            A premium Institite for BTECH...
          </p>
        </div>
        <div className="p-10 mx-auto grid  justify-center place-items-center  gap-6 col-span-3  ">
          <div className="md:flex md:flex-row flex-col ">
            <div className="m-6 w-full">
              <ul className="text-gray-500 font-bold ">
                <li className="text-md text-[#454545] border-b-2  border-gray-600 mb-3">
                  USEFUL LINKS
                </li>

                <Link to="/home">
                  <li className="text-white text-sm my-1 font-normal">Home</li>
                </Link>
                <Link to="/hostels">
                  <li className="text-white text-sm my-1 font-normal">
                    HOSTEL
                  </li>
                </Link>
                <Link to="/rooms">
                  <li className="text-white text-sm my-1 font-normal">ROOMS</li>
                </Link>
                <Link to="/blog">
                  <li className="text-white text-sm my-1 font-normal">BLOGS</li>
                </Link>
              </ul>
            </div>
            <div className="m-6 w-full ">
              <ul className="text-gray-500 font-bold">
                <li className="text-md text-[#454545] border-b-2  border-gray-600 mb-3">
                  USEFUL LINKS
                </li>
                <Link to="/about">
                  <li className="text-white text-sm my-1 font-normal">
                    ABOUT US
                  </li>
                </Link>
                <Link to="/contact">
                  <li className="text-white text-sm my-1 font-normal">
                    CONTACT US
                  </li>
                </Link>

                <li className="text-white text-sm  my-1 font-normal">ECE</li>
                <li className="text-white text-sm font-normal">ME</li>
              </ul>
            </div>
          </div>

          <div className="w-full col-span-2 p-7">
            <h1 className="md:text-2xl text-md my-4">Signup our newsletter</h1>
            <form action="#">
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                <div className="relative w-full">
                  <label
                    for="email"
                    className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Email address
                  </label>
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <input
                    className="block p-3 pl-10 w-full text-sm outline-none bg-white-100 text-orange-900  rounded-lg border border-white sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter your email"
                    type="email"
                    id="email"
                    required=""
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="py-3 px-3 w-full text-sm font-medium text-center bg-[#454545] text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="mx-auto max-w-screen-sm text-sm text-left text-white newsletter-form-footer dark:text-gray-300">
                We care about the protection of your data.{" "}
                <Link
                  to="/terms-condition"
                  className=" text-primary-600 dark:text-primary-500 text-gray-800 font-bold hover:underline"
                >
                  Read our Privacy Policy
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
