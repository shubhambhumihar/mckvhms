import React, { useState, useRef, useEffect } from "react";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
// import { uploadImg } from "../features/uploadImgBlog/uploadImgSlice";
import { createPost, getAllPosts } from "../features/post/postSlice";
import { uploadImg } from "../features/uploadImg/uploadImgSlice";

import StudentLoginModal from "./StudentLoginModal";
// import uploadImgSlice from "../features/uploadImgBlog/uploadImgSlice";
const imgg = require("../assets/team3.png");

const PostShare = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth?.user);
  const { isLoading } = useSelector((state) => state.post);
  // console.log(user);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
      console.log(image);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };
  // useEffect(() => {

  // }, []);
  const handleSubmit = (e) => {
    // console.log("Clicked");
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    // console.log(newPost);

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      // console.log(newPost);
      try {
        dispatch(uploadImg(data));
      } catch (error) {
        console.log(error.message);
      }
    }
    dispatch(createPost(newPost));
    // console.log("dis");
    setTimeout(() => {
      dispatch(getAllPosts());
    }, [1000]);

    reset();
  };

  // useEffect(() => {

  // }, []);
  return (
    <>
      <div className="flex gap-3  p-4 rounded-xl    ">
        <img className="rounded-full w-12 h-12 " src={imgg} alt="" />
        <div className="flex w-[90%] flex-col gap-4 p-2 rounded-xl shadow-sm shadow-gray-300">
          <input
            ref={desc}
            required
            className="rounded-xl p-2 border border-white bg-[rgba(40,52,62,0.07)] outline-none"
            type="text"
            placeholder="Whats in your mind?"
          />
          <div className="options flex justify-around  p-1 pl-2 pr-2 align-middle">
            <div
              className="option flex align-middle justify-center text-[12px] hover:cursor-pointer"
              onClick={() => imageRef.current.click()}
            >
              <UilScenery className="text-[#4cb256]  mr-[1px]" />
              Photo
            </div>
            <div className="option flex align-middle justify-center text-[12px] hover:cursor-pointer">
              <UilPlayCircle className="text-[#4a4eb7]  mr-[1px]" />
              Video
            </div>
            <div className="option flex align-middle justify-center text-[12px] hover:cursor-pointer">
              <UilLocationPoint className="text-[#ef5757]  mr-[1px]" />
              Location
            </div>
            <div className="option flex align-middle justify-center text-[12px] hover:cursor-pointer">
              <UilSchedule className="text-[#e1ae4a] mr-[1px]" />
              Schedule
            </div>
            {user?.isStudent ? (
              <button
                disabled={isLoading}
                onClick={handleSubmit}
                className="px-[20px] rounded-2xl py-[5px] border bg-[#4a4eb7] text-white text-[12px] "
              >
                {isLoading ? "upLoading..." : "Share"}
              </button>
            ) : (
              <div className="logoSide ">
                <button
                  onClick={showModal}
                  className="px-[20px] py-[5px] bg-orange-700 text-white rounded-3xl"
                >
                  Login
                </button>
              </div>
            )}

            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
          </div>

          {image && (
            <div className="previewImage relative">
              <UilTimes
                className="cursor-pointer absolute right-4 top-2 text-white"
                onClick={() => setImage(null)}
              />
              <img
                className="w-[100%] max-h-[20rem] object-cover rounded-md"
                src={URL.createObjectURL(image)}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
      <StudentLoginModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default PostShare;
