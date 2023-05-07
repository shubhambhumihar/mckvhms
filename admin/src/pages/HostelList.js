import React, { useEffect } from "react";
import { Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Space, Spin } from "antd";
import {
  deleteAHostel,
  getAllHostels,
  resetState,
} from "../features/hostels/hostelSlice";
import { toast } from "react-toastify";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import CustomModal from "../components/CustomModal";

const HostelList = () => {
  const [open, setOpen] = useState(false);
  const [hostelId, setHostelId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    // console.log(e);
    setHostelId(e);
    // console.log(hostelId);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
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
      width: "10%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Hostel Type",
      dataIndex: "hostel_type",
      key: "type",
      ...getColumnSearchProps("hostel_type"),
    },
    {
      title: "Capacity",
      dataIndex: "capacity",

      sorter: (a, b) => a.capacity - b.capacity,
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Total Rooms",
      dataIndex: "totalRooms",
    },
    {
      title: "Total Beds",
      dataIndex: "totalBeds",
    },
    {
      title: "Availability",
      dataIndex: "availability",
      render: (text) => String(text),
    },

    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllHostels());
  }, [dispatch]);

  const hostelState = useSelector((state) => state.hostel.hostels.hostels);
  const {
    isLoading,
    isSuccess,

    deletedHostel,
  } = useSelector((state) => state.hostel);

  // console.log(hostelState);

  const data1 = [];
  for (let i = 0; i < hostelState?.length; i++) {
    data1.push({
      key: i + 1,
      name: hostelState[i].hostel_name,
      hostel_type: hostelState[i].hostel_type,
      capacity: hostelState[i].capacity,
      phone: hostelState[i].phone,
      availability: hostelState[i].availability,
      totalRooms: hostelState[i]?.rooms?.length,
      totalBeds: hostelState[i]?.beds?.length,

      action: (
        <div className="flex gap-1">
          <Link
            to={`/admin/hostel/${hostelState[i]._id}`}
            className="text-green-500 text-lg "
          >
            <CiEdit />
          </Link>
          <button
            className="text-red-500 text-lg bg-transparent  "
            onClick={() => showModal(hostelState[i]._id)}
          >
            <AiOutlineDelete />{" "}
          </button>
        </div>
      ),
    });
  }

  const deleteHostel = (id) => {
    dispatch(deleteAHostel(id));

    setOpen(false);

    setTimeout(() => {
      dispatch(getAllHostels());
    }, 800);
  };

  useEffect(() => {
    if (isSuccess && deletedHostel) {
      toast.success("Hostel Deleted Successfully!");
    }
  }, [isSuccess, deletedHostel]);

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
            <h3 className="mb-4 title"> Hostel Lists</h3>
            <div>
              <Table dataSource={data1} columns={columns} />
            </div>
            <CustomModal
              title="Hey are u sure u want to delete  this hostel"
              hideModal={hideModal}
              open={open}
              performAction={() => deleteHostel(hostelId)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HostelList;
