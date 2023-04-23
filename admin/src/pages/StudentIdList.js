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
} from "../features/hostels/hostelSlice";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import CustomModal from "../components/CustomModal";
import { getStudentIds } from "../features/studentId/studentIdSlice";

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

const StudentIdList = () => {
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
      title: "Student Id",
      dataIndex: "student_id",
      key: "student_id",
      width: "10%",
      ...getColumnSearchProps("student_id"),
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(getStudentIds());
  }, [dispatch]);

  const studentIdState = useSelector(
    (state) => state.studentId.studentId.studentIds
  );
  // console.log(studentIdState);
  // const studentId= useSelector((state) => state.hostel);
  // console.log(hostelState);
  const { isLoading } = useSelector((state) => state.studentId);

  const data1 = [];
  for (let i = 0; i < studentIdState?.length; i++) {
    data1.push({
      key: i + 1,
      student_id: studentIdState[i].student_id,

      action: (
        <div className="flex gap-1">
          {/* <Link
            to={`/admin/hostel/${studentIdState[i]._id}`}
            className="text-green-500 text-lg "
          > */}
          <CiEdit />
          {/* </Link> */}
          <button
            to="/"
            className="text-red-500 text-lg bg-transparent  "
            // onClick={() => showModal(hostelState[i]._id)}
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
    }, 500);
  };

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
            <h3 className="mb-4 title"> Student Id Lists</h3>
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

export default StudentIdList;
