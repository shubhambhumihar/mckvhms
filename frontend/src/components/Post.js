import React, { useState } from "react";
import Comment from "../assets/comment.png";
import Share from "../assets/share.png";
// import Heart from "https://cdn-icons-png.flaticon.com/512/2589/2589175.png";
import { useDispatch, useSelector } from "react-redux";
import NoLiked from "../assets/notlike.png";
import { AiOutlineComment } from "react-icons/ai";
import {
  deleteAPost,
  getAllPosts,
  likeDislikePost,
} from "../features/post/postSlice";
import { Modal, Tooltip } from "antd";
import { Button, Menu, Dropdown } from "antd";
import {
  DeleteOutlined,
  EllipsisOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import {
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  LinkedinIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";
// import { deletePost } from "../../../backend/controllers/postCntrlr";

const heart = "https://cdn-icons-png.flaticon.com/512/2589/2589175.png";

const Post = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postId, setPostId] = useState("");

  const showModal = () => {
    // console.log(e);
    setIsModalOpen(true);
    // setPostId(e);
  };
  const showDeleteModal = (e) => {
    console.log(e);
    setIsDeleteModalOpen(true);
    setPostId(e);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };
  const pageUrl = window.location.href;
  // console.log(pageUrl);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user?.user);
  console.log(user);
  const [liked, setLiked] = useState(
    data.likes.some((like) => like?.user?.toString() === user?._id?.toString())
  );

  const [likes, setLikes] = useState(data?.likes?.length);

  // console.log(liked);

  const handleLike = () => {
    setLiked((prev) => !prev);
    dispatch(likeDislikePost(data?._id));
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const deletePost = (id) => {
    dispatch(deleteAPost(id));

    setIsDeleteModalOpen(false);

    setTimeout(() => {
      dispatch(getAllPosts());
    }, 800);
  };

  return (
    <div className="flex flex-col gap-1 p-4 bg-[#DDDDDD] rounded-md">
      <img
        className="w-full max-h-[20rem] object-cover rounded-md"
        src={
          data?.image ? process.env.REACT_APP_PUBLIC_FOLDER + data?.image : ""
        }
        alt=""
      />

      <div className="postAction flex align-items-start gap-[1.5rem]">
        <img
          className="w-6 object-contain cursor-pointer"
          src={liked ? heart : NoLiked}
          alt=""
          onClick={handleLike}
        />
        <Tooltip title="Comment" color="purple">
          <span>
            <AiOutlineComment className="text-2xl cursor-pointer  text-[#1F8A70]" />
          </span>
        </Tooltip>

        <Tooltip title="Share" color="purple">
          <img
            onClick={showModal}
            className="w-5 object-contain cursor-pointer"
            src={Share}
            alt=""
          />
        </Tooltip>
      </div>
      <span className="text-purple-600">{likes} Likes</span>
      <div className="detail flex justify-between">
        <div>
          <span className="text-green-400">
            <b>{data?.userId?.name}</b>{" "}
          </span>
          <p className="text-orange-400"> {data?.desc}</p>
        </div>

        <Button
          type="link"
          icon={<DeleteOutlined />}
          danger
          onClick={() => showDeleteModal(data?._id)}
        ></Button>
      </div>

      <Modal
        open={isDeleteModalOpen}
        onOk={() => deletePost(postId)}
        onCancel={handleCancel}
        closeIcon={<CloseOutlined style={{ color: "red" }} />}
        bodyStyle={{
          padding: "3rem 3rem",
          background: "#ddd",
          borderRadius: "1rem",
        }}
        // footer={[
        //   <Button
        //     key="cancel"
        //     onClick={handleCancel}
        //     style={{ marginRight: "10px" }}
        //   >
        //     Cancel
        //   </Button>,
        //   <Button
        //     key="delete"
        //     type="primary"
        //     onClick={() => deletePost(postId)}
        //     style={{ backgroundColor: "red", borderColor: "red" }}
        //   >
        //     Delete
        //   </Button>,
        // ]}
        // onOk={() => deletePost(postId)}
      >
        <div className="flex justify-center items-center">
          <h3 className="text-purple-700">
            Are u sure u want to delete this post
          </h3>
        </div>
      </Modal>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        bodyStyle={{ padding: "3rem 2rem" }}
      >
        <div className="flex justify-center items-center gap-4">
          <WhatsappShareButton
            onClick={handleOk}
            className="shadow-md shadow-green-400 rounded-full"
            url={pageUrl}
            title="Post share from REC"
          >
            <WhatsappIcon size={30} round={true} />
          </WhatsappShareButton>
          <LinkedinShareButton
            onClick={handleOk}
            className="shadow-lg shadow-blue-600 rounded-full"
            url={pageUrl}
            title="Post share from REC"
            source="REC.com"
          >
            <LinkedinIcon size={30} round={true} />
          </LinkedinShareButton>
          <TelegramShareButton
            onClick={handleOk}
            className="shadow-lg shadow-blue-400 rounded-full"
            url={pageUrl}
            title="Post share from REC"
          >
            <TelegramIcon size={30} round={true} />
          </TelegramShareButton>
          <TwitterShareButton
            onClick={handleOk}
            className="shadow-lg shadow-teal-300 rounded-full"
            url={pageUrl}
            title="Post share from REC"
            // hashtags="viral_post"
          >
            <TwitterIcon size={30} round={true} />
          </TwitterShareButton>
        </div>
      </Modal>

      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
    </div>
  );
};

export default Post;
