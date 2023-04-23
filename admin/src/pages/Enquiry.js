import React, { useEffect } from "react";
import { Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEnquiries } from "../features/enquiry/enquirySlice";
import { Select, Space } from "antd";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

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
    title: "Comment",
    dataIndex: "comment",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiry = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEnquiries());
  }, [dispatch]);
  const enquiryState = useSelector(
    (state) => state.enquiry.enquiries.enquiries
  );
  // console.log(enquiryState);

  const data1 = [];
  for (let i = 0; i < enquiryState?.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      comment: enquiryState[i].comment,
      mobile: enquiryState[i].mobile,
      createdAt: enquiryState[i].createdAt,
      status: (
        <Space wrap>
          <Select
            defaultValue="deleivered"
            style={{
              width: 100,
            }}
            onChange={handleChange}
            options={[
              {
                value: "deleivered",
                label: "Deleivered",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "Yiminghe",
                label: "yiminghe",
              },
              {
                value: "disabled",
                label: "Disabled",
                disabled: true,
              },
            ]}
          />
        </Space>
      ),

      action: (
        <div className="flex gap-1">
          <Link to="/" className="text-green-500 text-lg ">
            <CiEdit />
          </Link>
          <Link to="/" className="text-red-500 text-lg ">
            <AiOutlineDelete />{" "}
          </Link>
        </div>
      ),
    });
  }
  return (
    <div>
      <div className="m-4 title">
        <h3 className="mb-4">Recent Enquiries</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
