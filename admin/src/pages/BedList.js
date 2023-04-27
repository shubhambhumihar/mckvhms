import React, { useEffect } from "react";
import { Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteABed, getAllBeds } from "../features/bed/bedSlice";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";
import { Spin, Space } from "antd";
import CustomModal from "../components/CustomModal";

const BedList = () => {
  // !For deleting bed
  const [open, setOpen] = useState(false);
  const [bedId, setBedId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    // console.log(e);
    setBedId(e);
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
      title: "Bed Number",
      dataIndex: "number",
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: "Name of student",
      dataIndex: "name",
      // key: "name",
      // width: "10%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name?.length - b.name?.length,
      render: (text) => String(text),
    },

    {
      title: "Is Available",
      dataIndex: "availability",
      key: "availability",
      render: (text) => String(text),
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
    dispatch(getAllBeds());
  }, [dispatch]);

  const bedState = useSelector((state) => state.bed.beds.beds);
  const { isLoading, isError, isSuccess, deletedBed } = useSelector(
    (state) => state.bed
  );

  console.log(bedState);

  useEffect(() => {
    if (isSuccess && deletedBed) {
      toast.success("Bed Deleted  Successfully!");
    }

    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isLoading, isError, deletedBed]);

  const data1 = [];
  for (let i = 0; i < bedState?.length; i++) {
    console.log(bedState[i]?.student?.name);
    data1.push({
      key: i + 1,
      number: bedState[i].bed_number,
      name: bedState[i]?.student?.name,
      availability: bedState[i]?.isAvailable,

      action: (
        <div className="flex gap-1">
          <Link
            to={`/admin/bed/${bedState[i]._id}`}
            className="text-green-500 text-lg "
          >
            <CiEdit />
          </Link>
          <button
            onClick={() => showModal(bedState[i]._id)}
            className="text-red-500 text-lg "
          >
            <AiOutlineDelete />{" "}
          </button>
        </div>
      ),
    });
  }

  const deleteBed = (id) => {
    dispatch(deleteABed(id));
    setOpen(false);

    setTimeout(() => {
      dispatch(getAllBeds());
    }, 1000);
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
          <div className="m-4 title">
            <h3 className="mb-4">Beds</h3>
            <div>
              <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
              title="Hey are u sure u want to delete this Room"
              hideModal={hideModal}
              open={open}
              performAction={() => deleteBed(bedId)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BedList;
