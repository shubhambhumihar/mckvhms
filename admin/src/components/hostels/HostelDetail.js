import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAHostel,
  getRoomsByHostel,
  getBedsByHostel,
} from "../../features/hostels/hostelSlice";
import Rooms from "../rooms/Rooms";
import { Pagination } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";

const page_size = 3;

const HostelDetail = () => {
  const [page, setPage] = useState(1);

  const [totalBookedRooms, setTotalBookedRooms] = useState(0);
  const dispatch = useDispatch();

  const location = useLocation();

  const getHostelId = location.pathname.split("/")[3];

  const { isLoading, singleHostel, roomsOfHostel, bedsOfHostel } = useSelector(
    (state) => state.hostel
  );

  console.log(roomsOfHostel);

  useEffect(() => {
    dispatch(getAHostel(getHostelId));
  }, [getHostelId]);

  useEffect(() => {
    dispatch(getRoomsByHostel(getHostelId));
    dispatch(getBedsByHostel(getHostelId));
  }, [getHostelId, page]);

  useEffect(() => {
    const bookedRooms = roomsOfHostel?.rooms?.filter((room) => room.isBooked);
    // console.log(bookedRooms);
    const totalBookedRoom = bookedRooms?.length;
    setTotalBookedRooms(totalBookedRoom);
    // console.log(totalBookedRooms);
  }, [roomsOfHostel]);

  // console.log(roomsOfHostel);

  return (
    <>
      <Link
        to="../hostels"
        className="shadow-sm shadow-red-500  inline-block bg-yellow-400 px-4 py-1 text-white rounded-2xl"
      >
        <AiOutlineArrowLeft />
      </Link>

      <div className="max-w-screen-2xl   border  w-[100%] mx-auto h-fit  ">
        <div className="hostelBac flex justify-center items-center">
          <h1 className="text-2xl font-bold text-purple-600 underline text-center">
            Welcome to {singleHostel?.hostel?.hostel_name}{" "}
          </h1>
        </div>

        <div className="my-6">
          <h1 className="text-center font-bold text-xl text-orange-500 py-5">
            Rooms
          </h1>

          <div className="flex justify-around">
            <div className="border shadow-lg shadow-green-100 bg-red-300 flex justify-center items-center flex-col px-7 py-3 rounded-3xl text-white font-bold">
              <p>Total Rooms</p>
              {isLoading ? (
                <div className="flex justify-center">
                  <div class="loader">
                    <span class="loader-text">loading</span>
                    <span class="load"></span>
                  </div>
                </div>
              ) : (
                <h3>{roomsOfHostel?.rooms?.length}</h3>
              )}
            </div>
            <div className="border bg-purple-600  flex justify-center items-center flex-col px-7 py-3 rounded-3xl text-white font-bold">
              <p>Booked Room</p>
              {isLoading ? (
                <div class="loader">
                  <span class="loader-text">loading</span>
                  <span class="load"></span>
                </div>
              ) : (
                <h3>{totalBookedRooms}</h3>
              )}
            </div>
            <div className="border bg-teal-500  flex justify-center items-center flex-col px-7 py-3 rounded-3xl text-white font-bold">
              <p>Total Beds</p>
              {isLoading ? (
                <div class="loader">
                  <span class="loader-text">loading</span>
                  <span class="load"></span>
                </div>
              ) : (
                <h3>{bedsOfHostel?.beds?.length}</h3>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center my-7">
              <div class="loader">
                <span class="loader-text">loading</span>
                <span class="load"></span>
              </div>
            </div>
          ) : roomsOfHostel?.rooms?.length > 0 ? (
            <>
              <div className="flex m-6 gap-2 justify-between my-10">
                {roomsOfHostel?.rooms?.map((room, index) => (
                  <div
                    key={index}
                    style={{
                      display:
                        index >= (page - 1) * page_size &&
                        index < page * page_size
                          ? "block"
                          : "none",
                    }}
                  >
                    <Rooms room={room} />
                  </div>
                ))}
              </div>
              <div className="flex justify-center bg-purple-400 rounded-2xl py-4">
                {roomsOfHostel?.rooms?.length / page_size > 1 && (
                  <Pagination
                    defaultCurrent={1}
                    showSizeChanger
                    total={roomsOfHostel?.rooms?.length}
                    showTotal={(total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`
                    }
                    current={page}
                    pageSize={page_size}
                    onChange={(page) => setPage(page)}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <h1 className="text-purple-600 font-bold text-3xl pt-6 my-6">
                No Room to Show in {singleHostel?.hostel?.hostel_name}
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

export default HostelDetail;
