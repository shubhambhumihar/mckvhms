import React, { useState } from "react";
import img from "../assets/header-bg.png";
import { useMemo } from "react";
import { Input } from "antd";
import L from "leaflet";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
const { TextArea } = Input;

const markerIcon = new L.icon({
  iconUrl:
    "https://png.pngtree.com/element_our/sm/20180515/sm_5afb0cf7bd445.jpg",
  iconSize: [35, 45],
  iconAnchor: [17, 46],
  popupAnchor: [3, -46],
});

const Contact = () => {
  const [center, setCenter] = useState([23.6691, 85.5688]);
  //  const ramgarhEngineeringCollegePosition = []; // latitude and longitude of Ramgarh Engineering College
  const ZOOM_LEVEL = 9;

  function handleMove(e) {
    setCenter(e.target.getCenter()); // update center state with the new center of the map
  }
  function MapCenterMarkerHandler({ onMove }) {
    useMapEvent("move", onMove); // listen for the 'move' event on the map and call the onMove callback
    return null; // no additional UI components needed
  }

  return (
    <div className="max-w-screen-2xl mb-40">
      <div className="my-11">
        <div className="md:flex w-[90vw] mx-auto lg:flex items-center justify-end">
          <div className="mx-auto">
            <lottie-player
              src="https://assets3.lottiefiles.com/packages/lf20_u25cckyh.json"
              background="transparent"
              speed="1"
              style={{ width: "400px", height: "400px" }}
              loop
              autoplay
            ></lottie-player>
          </div>
          <form className="border formc w-[90vw] md:w-[42vw] mx-auto p-6 shadow-md shadow-orange-600 rounded-2xl  ">
            <div class="grid md:grid-cols-1  md:gap-6">
              <div class="relative w-[70vw] md:w-1/2  mx-auto mb-6 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-orange-600  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-orange-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div>
            </div>

            <div className="relative w-[70vw]  md:w-1/2 mx-auto mb-6 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm  text-orange-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-orange-600  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>

            <div className="relative w-[70vw] md:w-1/2 mx-auto mb-6 group">
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-orange-600  bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-orange-400 dark:text-orange-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="text-white mx-auto block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-around items-center">
        {/* <MapContainer center={center} zoom={ZOOM_LEVEL}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors'
          />
          <Marker position={center} icon={markerIcon}>
            <Popup>
              Ramgarh Engineering College <br />
              23.6691&deg; N, 85.5688&deg; E
            </Popup>
          </Marker>
          <MapCenterMarkerHandler onMove={handleMove} />
        </MapContainer> */}
        <div>
          <h1
            className="text-[4rem] text-purple-500 font-bold  "
            style={{ lineHeight: 0.8 }}
          >
            Find us <br />
            using the MAP{" "}
          </h1>
        </div>

        <div class="col-md-5 w-1/2  h-[80vh] ">
          {/* <i class="bi bi-telephone"></i>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d49146.06136549554!2d85.63423966268378!3d23.568968860144498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1677240221889!5m2!1sen!2sin"
            width="600"
            title="map"
            height="350"
            style={{ width: "100%" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe> */}
          <div style={{ width: "960px" }}>
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319"
              width="100%"
              title="map"
              height="200"
              frameborder="0"
              // style="border:0"
            ></iframe> */}
          </div>
          {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.7257806211883!2d85.62739847432023!3d23.578290195363994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f458e93cb14f4f%3A0xb22c7b3b8ffb020f!2sRamgarh%20Engineering%20College!5e0!3m2!1sen!2sin!4v1681891093730!5m2!1sen!2sin"
            width="600"
            height="450"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe> */}
          <div style={{ width: "100%", marginTop: "50px" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.7257806211883!2d85.62739847432023!3d23.578290195363994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f458e93cb14f4f%3A0xb22c7b3b8ffb020f!2sRamgarh%20Engineering%20College!5e0!3m2!1sen!2sin!4v1681891093730!5m2!1sen!2sin"
              width="100%"
              title="map"
              height="200"
              frameborder="0"
              // style={{border:"0"}}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
