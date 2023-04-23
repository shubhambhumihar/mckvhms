import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate, Link } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineQuestionCircle } from "react-icons/ai";
import { FcCustomerSupport, FcAddImage, FcLibrary } from "react-icons/fc";
import {
  MdProductionQuantityLimits,
  MdOutlineCreateNewFolder,
} from "react-icons/md";

import { MdOutlineBrandingWatermark, MdCategory } from "react-icons/md";
import { BiCategory, BiColor } from "react-icons/bi";
import { ImBlog } from "react-icons/im";
import { FaList } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const { Header, Sider, Content } = Layout;

const items = [
  {
    label: <Link to="/profile">MY Profile</Link>,
    key: "0",
  },
  {
    label: <Link to="/logout">Signout</Link>,
    key: "1",
  },
];

const LayoutApp = () => {
  const userState = useSelector((state) => state?.auth);
  const { user } = userState?.user;
  // console.log(user);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  return (
    <Layout onContextMenu={(e) => e.preventDefault()}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo flex justify-center items-center text-2xl text-pink-500 bg-red-300  font-bold">
          <h1 className="text-2xl">REC</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: (
                <AiOutlineDashboard
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                />
              ),
              label: "Dashboard",
            },

            {
              key: "rooms",
              icon: <ImBlog />,
              label: "Rooms",
              children: [
                {
                  key: "room",
                  icon: <MdOutlineCreateNewFolder />,
                  label: "Add Room",
                },
                {
                  key: "room-list",
                  icon: <FaList />,
                  label: "Room List",
                },
                {
                  key: "delete-room",
                  icon: <FcAddImage />,
                  label: "Delete Room",
                },
                {
                  key: "update-room",
                  icon: <FcAddImage />,
                  label: "Update Room",
                },
              ],
            },

            {
              key: "catalog",
              icon: (
                <FcLibrary
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                />
              ),

              label: "Catalog",
              children: [
                {
                  key: "hostel",
                  icon: (
                    <MdProductionQuantityLimits
                      style={{
                        color: "#655DBB",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    />
                  ),
                  label: "Add Hostel",
                },
                {
                  key: "hostel-list",
                  icon: (
                    <MdProductionQuantityLimits
                      style={{
                        color: "#655DBB",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    />
                  ),
                  label: "Hostel List",
                },
                {
                  key: "bed",
                  icon: (
                    <MdProductionQuantityLimits
                      style={{
                        color: "#655DBB",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    />
                  ),
                  label: "Add Bed",
                },
                {
                  key: "bed-list",
                  icon: (
                    <MdProductionQuantityLimits
                      style={{
                        color: "#655DBB",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    />
                  ),
                  label: "Bed List",
                },
                {
                  key: "staff",
                  icon: (
                    <MdOutlineBrandingWatermark
                      style={{
                        color: "#655DBB",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    />
                  ),
                  label: "Staff",
                },
                {
                  key: "staff-list",
                  icon: (
                    <MdOutlineBrandingWatermark
                      style={{
                        color: "#655DBB",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    />
                  ),
                  label: "Staff List",
                },
                {
                  key: "notice",
                  icon: (
                    <BiCategory
                      style={{
                        color: "#655DBB",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    />
                  ),
                  label: "Notice",
                },
                {
                  key: "notice-list",
                  icon: (
                    <BiCategory
                      style={{
                        color: "#655DBB",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    />
                  ),
                  label: "Notice List",
                },
              ],
            },

            {
              key: "students",
              icon: <ImBlog />,
              label: "Students",
              children: [
                {
                  key: "student",
                  icon: <MdOutlineCreateNewFolder />,
                  label: "Add Student",
                },
                {
                  key: "student-list",
                  icon: <FaList />,
                  label: "Student List",
                },
                {
                  key: "student_id",
                  icon: <FcAddImage />,
                  label: "Add Student Id",
                },
                {
                  key: "student_id_list",
                  icon: <FcAddImage />,
                  label: " Student Id List",
                },
              ],
            },
            {
              key: "enquiry",
              icon: (
                <AiOutlineQuestionCircle
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                />
              ),
              label: "Enquiry",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="flex justify-between px-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}

          <div className="px-5 flex items-center gap-4">
            <div className="relative">
              <IoMdNotificationsOutline className="text-[1.7rem]" />
              <div className="absolute border-red-200 rounded-full top-[-35px] right-[0px] left-[5px]  p-2  text-center">
                <span className="badge bg-orange-400 p-1 text-sm h-[26px] text-center w-[26px] inline-block rounded-full ">
                  5
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 cursor-pointer">
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <Space>
                  <div className=" ">
                    <img
                      className="w-[35px] h-[35px] rounded-full"
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                      alt=""
                    />
                  </div>
                  <div className="mb-0">
                    <p className="text-[14px]">{user?.name} </p>
                    <p className="font-bold text-[12px] text-[#121212]">
                      {user?.email}
                    </p>
                  </div>
                </Space>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutApp;
