import React, { useEffect } from "react";
import { Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Select, Space, Spin } from "antd";
import {
  deleteAHostel,
  getAllHostels,
  resetState,
} from "../../features/hostels/hostelSlice";
import { toast } from "react-toastify";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import CustomModal from "../CustomModal";
import {
  deleteABedRequest,
  getTotalBedRequests,
  updateBedRequest,
} from "../../features/bedBooking/bedBookingRequestSlice";

const BedRequest = () => {
  const [open, setOpen] = useState(false);
  const [bedRequestId, setBedRequestId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    // console.log(e);
    setBedRequestId(e);
    // console.log(hostelId);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },

    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Student ID",
      dataIndex: "student_id",
    },
    {
      title: "Hostel Name",
      dataIndex: "hostel_id",
    },
    {
      title: "Room Number",
      dataIndex: "room_id",
    },

    {
      title: "Select status",
      dataIndex: "actionStatus",
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    // dispatch(resetState());
    dispatch(getTotalBedRequests());
  }, [dispatch]);

  useEffect(() => {
    // Render component based on selectedOption value

    dispatch(getTotalBedRequests());
  }, [selectedOption]);
  const { isLoading, isSuccess, deletedBedRequest } = useSelector(
    (state) => state.bedBooking
  );
  const bedBookingState = useSelector(
    (state) => state.bedBooking?.bedRequest?.totalBedRequests
  );

  // console.log(bedBookingState);

  const handleChange = (value, id) => {
    setSelectedOption(value);
    const data = { value, id };
    dispatch(updateBedRequest(data));
    dispatch(getTotalBedRequests());
  };

  const data1 = [];
  for (let i = 0; i < bedBookingState?.length; i++) {
    data1.push({
      key: i + 1,
      name: bedBookingState[i].name,
      email: bedBookingState[i].email,

      phone: bedBookingState[i].mobile,
      student_id: bedBookingState[i].student_id,
      hostel_id: bedBookingState[i].hostel_id?.hostel_name,
      room_id: bedBookingState[i].room_id?.roomNumber,

      action: (
        <>
          <div className="flex gap-1 justify-center">
            <button
              className="text-red-500 text-lg bg-transparent  "
              onClick={() => showModal(bedBookingState[i]._id)}
            >
              <AiOutlineDelete />{" "}
            </button>
          </div>
        </>
      ),
      actionStatus: (
        <div>
          <Select
            defaultValue={bedBookingState[i]?.status}
            style={{
              width: 120,
            }}
            onChange={(value) => handleChange(value, bedBookingState[i]?._id)}
            options={[
              {
                value: "pending",
                label: "Pending",
              },
              {
                value: "approved",
                label: "Approved",
              },
              {
                value: "rejected",
                label: "Rejected",
              },
            ]}
          />
        </div>
      ),
      finalStatus: (
        <div>
          <button
            className={`px-12 py-2 rounded-lg text-[#333333] ${
              bedBookingState[i]?.status === "pending"
                ? "bg-yellow-300"
                : bedBookingState[i]?.status === "approved"
                ? "bg-green-400"
                : "bg-red-400"
            }`}
          >
            {bedBookingState[i]?.status}
          </button>
        </div>
      ),
    });
  }

  const deleteBedBooking = (id) => {
    dispatch(deleteABedRequest(id));

    setOpen(false);

    setTimeout(() => {
      dispatch(getTotalBedRequests());
    }, 800);
  };

  useEffect(() => {
    if (isSuccess && deletedBedRequest) {
      toast.success("Bed Request Deleted Successfully!");
    }
  }, [isSuccess, deletedBedRequest]);

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
          <div className="m-4">
            <h3 className="mb-4 title"> Recent Bed Requests List</h3>
            <div>
              <Table dataSource={data1} columns={columns} />
            </div>
            <CustomModal
              title="Hey! are u sure u want to delete this Bed Request?"
              hideModal={hideModal}
              open={open}
              performAction={() => deleteBedBooking(bedRequestId)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BedRequest;
