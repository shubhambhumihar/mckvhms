import React, { useEffect } from "react";
import { Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteAStaff,
  getAllStaffs,
  resetState,
} from "../features/staff/staffSlice";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

import { Select, Space } from "antd";

import { Spin } from "antd";
import CustomModal from "../components/CustomModal";

const StaffList = () => {
  const [open, setOpen] = useState(false);
  const [staffId, setStaffId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    // console.log(e);
    setStaffId(e);
    console.log(staffId);
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
    onFilter: (value, record) => {
      if (record[dataIndex])
        return record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
    },

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
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name?.length - b.name?.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Department",
      dataIndex: "department",
      ...getColumnSearchProps("department"),
    },
    {
      title: "Mobile number",
      dataIndex: "contact",
    },

    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllStaffs());
  }, [dispatch]);

  const staffState = useSelector((state) => state.staff.staffs.staffs);
  const {
    isLoading,
    isSuccess,

    deletedStaff,
  } = useSelector((state) => state.staff);

  const data1 = [];
  for (let i = 0; i < staffState?.length; i++) {
    // console.log(roomState[i]?.student?.name);
    data1.push({
      key: i + 1,
      name: staffState[i].name,
      email: staffState[i]?.email,
      gender: staffState[i].gender,
      department: staffState[i].department,
      contact: staffState[i]?.contactNumber,

      action: (
        <div className="flex gap-1">
          <Link
            to={`/admin/staff/${staffState[i]._id}`}
            className="text-green-500 text-lg "
          >
            <CiEdit />
          </Link>
          <button
            to="/"
            className="text-red-500 text-lg bg-transparent  "
            onClick={() => showModal(staffState[i]._id)}
          >
            <AiOutlineDelete />{" "}
          </button>
        </div>
      ),
    });
  }

  const deleteStaff = (id) => {
    dispatch(deleteAStaff(id));
    dispatch(resetState());
    setOpen(false);

    setTimeout(() => {
      dispatch(getAllStaffs());
    }, 1000);
  };
  useEffect(() => {
    if (isSuccess && deletedStaff) {
      toast.success("Staff Deleted Successfully!");
    }
  }, [isSuccess, deletedStaff]);
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
            <h3 className="mb-4">Our Staffs</h3>
            <div>
              <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
              title="Hey are u sure u want to delete  this Staff"
              hideModal={hideModal}
              open={open}
              performAction={() => deleteStaff(staffId)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StaffList;
