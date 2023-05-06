import React, { useEffect } from "react";
import { Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteARoom, getAllRooms } from "../features/room/roomSlice";

import { useRef, useState } from "react";
import { toast } from "react-toastify";

import { Space, Spin } from "antd";
import CustomModal from "../components/CustomModal";

const RoomList = () => {
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    // console.log(e);
    setRoomId(e);
    // console.log(hostelId);
  };
  const hideModal = () => {
    setOpen(false);
  };

  // const [searchText, setSearchText] = useState("");
  // const [searchedColumn, setSearchedColumn] = useState("");
  // const searchInput = useRef(null);
  // const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };
  // const handleReset = (clearFilters) => {
  //   clearFilters();
  //   setSearchText("");
  // };
  // const getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({
  //     setSelectedKeys,
  //     selectedKeys,
  //     confirm,
  //     clearFilters,
  //     close,
  //   }) => (
  //     <div
  //       style={{
  //         padding: 8,
  //       }}
  //       onKeyDown={(e) => e.stopPropagation()}
  //     >
  //       <Input
  //         ref={searchInput}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={(e) =>
  //           setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{
  //           marginBottom: 8,
  //           display: "block",
  //         }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{
  //             width: 90,
  //           }}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() => clearFilters && handleReset(clearFilters)}
  //           size="small"
  //           style={{
  //             width: 90,
  //           }}
  //         >
  //           Reset
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             confirm({
  //               closeDropdown: false,
  //             });
  //             setSearchText(selectedKeys[0]);
  //             setSearchedColumn(dataIndex);
  //           }}
  //         >
  //           Filter
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             close();
  //           }}
  //         >
  //           close
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <SearchOutlined
  //       style={{
  //         color: filtered ? "#1890ff" : undefined,
  //       }}
  //     />
  //   ),
  //   onFilter: (value, record) => {
  //     if (record[dataIndex])
  //       return record[dataIndex]
  //         .toString()
  //         .toLowerCase()
  //         .includes(value.toLowerCase());
  //   },

  //   onFilterDropdownOpenChange: (visible) => {
  //     if (visible) {
  //       setTimeout(() => searchInput.current?.select(), 100);
  //     }
  //   },

  //   render: (text) =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{
  //           backgroundColor: "#ffc069",
  //           padding: 0,
  //         }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ""}
  //       />
  //     ) : (
  //       text
  //     ),
  // });

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "key",
    },
    {
      title: "Room Number",
      dataIndex: "number",
      sorter: (a, b) => a.number - b.number,
    },

    {
      title: "Number of beds",
      dataIndex: "number_of_beds",
      sorter: (a, b) => a.number_of_beds - b.number_of_beds,
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      sorter: (a, b) => a.capacity - b.capacity,
    },
    {
      title: "Hostel Name",
      dataIndex: "hostelName",
      sorter: (a, b) => a.capacity - b.capacity,
    },
    {
      title: "Total Students",
      dataIndex: "totalStudents",
      sorter: (a, b) => a.capacity - b.capacity,
    },

    {
      title: "Is Booked",
      dataIndex: "booked",
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
    dispatch(getAllRooms());
  }, [dispatch]);

  const roomState = useSelector((state) => state.room?.rooms?.rooms);
  // console.log(roomState);
  const { isLoading, isError, isSuccess, deletedRoom } = useSelector(
    (state) => state.room
  );

  useEffect(() => {
    if (isSuccess && deletedRoom) {
      toast.success("Room Deleted  Successfully!");
    }

    if (isError) {
      toast.error("Something gone wrong!");
    }
  }, [isSuccess, isLoading, isError, deletedRoom]);
  // console.log(imgState);
  const data1 = [];
  for (let i = 0; i < roomState?.length; i++) {
    // console.log(roomState[i]?.student?.name);
    data1.push({
      key: i + 1,
      number: roomState[i]?.roomNumber,

      number_of_beds: roomState[i]?.numberOfBeds,
      capacity: roomState[i]?.capacity,
      booked: roomState[i]?.isBooked,
      hostelName: roomState[i]?.hostel_id?.hostel_name,
      totalStudents: roomState[i]?.occupants?.length,

      action: (
        <div className="flex gap-1">
          <Link
            to={`/admin/room/${roomState[i]._id}`}
            className="text-green-500 text-lg "
          >
            <CiEdit />
          </Link>
          <button
            className="text-red-500 text-lg bg-transparent  "
            onClick={() => showModal(roomState[i]._id)}
          >
            <AiOutlineDelete />{" "}
          </button>
        </div>
      ),
    });
  }
  const deleteRoom = (id) => {
    dispatch(deleteARoom(id));

    setOpen(false);

    setTimeout(() => {
      dispatch(getAllRooms());
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
            <h3 className="mb-4">Rooms</h3>
            <div>
              <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
              title="Hey are u sure u want to delete this Room"
              hideModal={hideModal}
              open={open}
              performAction={() => deleteRoom(roomId)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RoomList;
