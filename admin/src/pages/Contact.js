import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Space, Spin } from "antd";
import {
  deleteAContact,
  getAllContact,
  resetState,
} from "../features/contact/contactSlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";

const columns = [
  {
    title: "Serial No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },

  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Description",
    dataIndex: "desc",
  },

  {
    title: "Delete Contact",
    dataIndex: "action",
  },
];

const Contact = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [contactId, setContactId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    // console.log(e);
    setContactId(e);
    // console.log(hostelId);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllContact());
  }, [dispatch]);

  const { isLoading, isSuccess, deletedContact } = useSelector(
    (state) => state.contact
  );
  const contactState = useSelector(
    (state) => state.contact?.contacts?.contacts
  );

  const data1 = [];
  for (let i = 0; i < contactState?.length; i++) {
    data1.push({
      key: i + 1,
      name: contactState[i]?.name,

      email: contactState[i]?.email,
      desc: contactState[i].desc,

      action: (
        <div className="flex gap-1 justify-center">
          {/* <Link to="/" className="text-green-500 text-lg ">
            <CiEdit />
          </Link> */}
          <button
            onClick={() => showModal(contactState[i]?._id)}
            className="text-red-500 text-lg "
          >
            <AiOutlineDelete />{" "}
          </button>
        </div>
      ),
    });
  }
  const deleteContact = (id) => {
    dispatch(deleteAContact(id));

    setOpen(false);

    setTimeout(() => {
      dispatch(getAllContact());
      dispatch(resetState());
    }, 800);
  };
  useEffect(() => {
    if (isSuccess && deletedContact) {
      toast.success("Contact request Deleted Successfully!");
    }
  }, [isSuccess, deletedContact]);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center p-11 mb-5 text-red-600 h-[70vh] bg-gray-100">
          <Space size="large" className="text-center">
            <Spin size="large" tip="Loading..." style={{ color: "#1F8A70" }} />
          </Space>
        </div>
      ) : (
        <div>
          <div className="m-4 title">
            <h3 className="mb-4">Recent Contacts</h3>
            <div>
              <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
              title="Hey! Are you sure you want to delete this Contact Request?"
              hideModal={hideModal}
              open={open}
              performAction={() => deleteContact(contactId)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
