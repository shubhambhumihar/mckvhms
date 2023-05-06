import React, { useEffect } from "react";
import { Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";
import { Select, Space } from "antd";

import { Spin } from "antd";
import {
  deleteStudent,
  getAllStudents,
  resetState,
} from "../features/student/studentSlice";
import CustomModal from "../components/CustomModal";

const StudentList = () => {
  const [open, setOpen] = useState(false);
  const [studentId, setStudentId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    // console.log(e);
    setStudentId(e);
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
      title: "Student ID",
      dataIndex: "student_id",
      ...getColumnSearchProps("student_id"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Course",
      dataIndex: "course",
    },
    {
      title: "Department",
      dataIndex: "department",
      render: (text) => String(text),
    },
    {
      title: "Batch",
      dataIndex: "batch",
    },
    {
      title: "Hostel",
      dataIndex: "hostel",
    },
    {
      title: "Room",
      dataIndex: "room",
    },
    {
      title: "Bed",
      dataIndex: "bed",
    },

    {
      title: "Mobile number",
      dataIndex: "contact",
    },
    {
      title: "Parents Mobile",
      dataIndex: "parent_contact",
    },
    {
      title: "Address",
      dataIndex: "address",
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
    dispatch(getAllStudents());
  }, [dispatch]);

  const studentState = useSelector((state) => state.student.students.students);
  const { isLoading, isError, isSuccess, deletedStudent } = useSelector(
    (state) => state.student
  );

  console.log(studentState);
  const data1 = [];
  for (let i = 0; i < studentState?.length; i++) {
    // console.log(roomState[i]?.student?.name);
    data1.push({
      key: i + 1,
      name: studentState[i].name,
      email: studentState[i]?.email,
      student_id: studentState[i]?.student_id,
      gender: studentState[i].gender,
      course: studentState[i].course,
      batch: studentState[i].batch,
      hostel: studentState[i]?.hostel_id?.hostel_name,
      room: studentState[i]?.room_id?.roomNumber,
      bed: studentState[i]?.bed_id?.bed_number,
      department: studentState[i].department,
      semester: studentState[i]?.semester,
      contact: studentState[i]?.mobile,
      parent_contact: studentState[i]?.parentContactNumber,
      address: studentState[i]?.address,

      action: (
        <div className="flex gap-1">
          <Link
            to={`/admin/student/${studentState[i]._id}`}
            className="text-green-500 text-lg "
          >
            <CiEdit />
          </Link>
          <button
            onClick={() => showModal(studentState[i]._id)}
            className="text-red-500 text-lg "
          >
            <AiOutlineDelete />{" "}
          </button>
        </div>
      ),
    });
  }

  const deletetheStudent = (id) => {
    dispatch(deleteStudent(id));

    dispatch(resetState());

    setOpen(false);

    setTimeout(() => {
      dispatch(getAllStudents());
    }, 800);
  };

  useEffect(() => {
    if (isSuccess && deletedStudent) {
      toast.success("Student Deleted Successfully!");
    }
  }, [isSuccess, deletedStudent]);
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
            <h3 className="mb-4">Our Students</h3>
            <div>
              <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
              title="Hey are u sure u want to delete this Student"
              hideModal={hideModal}
              open={open}
              performAction={() => deletetheStudent(studentId)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StudentList;
