import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteEnquiry,
  getAllEnquiries,
  resetState,
  updateEnquiry,
} from "../features/enquiry/enquirySlice";
import { Select, Space, Spin } from "antd";
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
    title: "Comment",
    dataIndex: "comment",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Select Status",
    dataIndex: "status",
  },
  {
    title: "Status",
    dataIndex: "finalStatus",
  },

  {
    title: "Delete",
    dataIndex: "action",
  },
];

const Enquiry = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    // console.log(e);
    setEnquiryId(e);
    // console.log(hostelId);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    dispatch(getAllEnquiries());
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    // Render component based on selectedOption value
    // console.log("called");
    dispatch(getAllEnquiries());
  }, [selectedOption]);

  const { isSuccess, isLoading, deletedEnquiry } = useSelector(
    (state) => state.enquiry
  );
  const enquiryState = useSelector(
    (state) => state.enquiry?.enquiries?.enquiries
  );
  console.log(enquiryState);

  const handleChange = (value, id) => {
    // console.log(`selected ${value}`);
    // console.log(id);
    setSelectedOption(value);
    const data = { value, id };
    dispatch(updateEnquiry(data));
    dispatch(getAllEnquiries());
  };

  const data1 = [];
  for (let i = 0; i < enquiryState?.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,

      comment: enquiryState[i].desc,
      mobile: enquiryState[i].mobile,

      status: (
        <Space wrap>
          <Select
            defaultValue={enquiryState[i]?.status}
            style={{
              width: 120,
            }}
            onChange={(value) => handleChange(value, enquiryState[i]?._id)}
            options={[
              {
                value: "pending",
                label: "Pending",
              },
              {
                value: "resolved",
                label: "Resolved",
              },
              {
                value: "rejected",
                label: "Rejected",
              },
            ]}
          />
        </Space>
      ),

      action: (
        <div className="flex gap-1 justify-center">
          <button
            onClick={() => showModal(enquiryState[i]?._id)}
            className="text-red-500 text-lg "
          >
            <AiOutlineDelete />{" "}
          </button>
        </div>
      ),
      finalStatus: (
        <div>
          <button
            className={`px-12 py-2 rounded-lg text-[#333333] ${
              enquiryState[i]?.status === "pending"
                ? "bg-yellow-300"
                : enquiryState[i]?.status === "resolved"
                ? "bg-green-400"
                : "bg-red-400"
            }`}
          >
            {enquiryState[i]?.status}
          </button>
        </div>
      ),
    });
  }

  const deleteaEnquiry = (id) => {
    dispatch(deleteEnquiry(id));

    setOpen(false);

    setTimeout(() => {
      dispatch(getAllEnquiries());
      dispatch(resetState());
    }, 800);
  };
  useEffect(() => {
    if (isSuccess && deletedEnquiry) {
      toast.success("Complain Deleted Successfully!");
    }
  }, [isSuccess, deletedEnquiry]);
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
            <h3 className="mb-4">Recent Complaints</h3>
            <div>
              <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
              title="Hey! Are you sure you want to delete this Complain"
              hideModal={hideModal}
              open={open}
              performAction={() => deleteaEnquiry(enquiryId)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Enquiry;
