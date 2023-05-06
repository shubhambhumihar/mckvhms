import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Space, Avatar } from "antd";
import { logout } from "../features/auth/authSlice";
import { Switch } from "antd";

const Nav = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const [theme, setTheme] = useState("dark-theme");

  const toggleTheme = () => {
    console.log("clicked");
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const onChange = (checked) => {
    toggleTheme();
  };

  const handleClickMenu = () => {
    setToggle(!toggle);
  };
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  const handleListMenu = (nav) => {
    setActive(nav.title);
    setToggle(!toggle);
  };
  const items = [
    {
      label: <Link to="/profile">MY Profile</Link>,
      key: "0",
    },
    {
      label: (
        <Link to="" onClick={handleClick}>
          Signout
        </Link>
      ),
      key: "1",
    },
  ];

  const userState = useSelector((state) => state.auth);
  // console.log(userState);
  const user = useSelector((state) => state.auth?.user?.user);
  // console.log(user);

  return (
    <>
      {/* sticky top-0 */}
      <header
        className={`w-full flex items-center  sticky top-0 left-0    z-20 bg-primary  shadow-sm shadow-violet-600 `}
      >
        <nav className=" flex py-2 justify-between items-center w-full  md:px-10 px-7 ">
          {/* first child logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => {
                setActive("");
                window.scrollTo(0, 0);
              }}
            >
              <img
                src={logo}
                alt="logo"
                className="w-12 h-12 object-contain animate-pulse"
              />
              <h6 className="text-white hidden md:flex text-[15px] font-bold cursor-pointer  ">
                Ramgarh &nbsp;
                <span className="sm:block hidden text-white">
                  | Engineering College
                </span>
              </h6>
            </Link>
          </div>
          {/* secod child is links */}
          {/* <div
            className={` md:static  md:bg-inherit bg-white md:min-h-fit min-h-[60vh]  z-50  md:w-auto w-full flex items-center ${
              toggle ? "top-[-100%]" : "top-20"
            }`}
          > */}

          <ul
            className={`md:flex md:bg-inherit bg-[#393646] md:px-0 md:pb-0 pb-12 absolute md:static  md:min-h-fit min-h-[60vh] md:items-center md:gap-[15px]  md:mr-[0px] gap-8 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              toggle ? "top-[12vh]" : "top-[-490px]"
            } `}
          >
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer  md:my-0 my-7`}
                onClick={() => handleListMenu(nav)}
              >
                <Link to={nav.id}>{nav.title} </Link>
              </li>
            ))}
          </ul>
          {/* </div> */}
          {/* hidden sm:flex flex-row */}
          {/* third child is options */}
          <div className="submit flex ">
            <div>
              {userState?.user ? (
                <div className="flex items-center gap-2 cursor-pointer">
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                  >
                    <Space>
                      <div className=" ">
                        {user?.picturePath ? (
                          <img
                            className="w-[35px] h-[35px] mr-1 rounded-full "
                            src={
                              user?.picturePath
                                ? process.env.REACT_APP_PUBLIC_FOLDER +
                                  user?.picturePath
                                : ""
                            }
                            alt=""
                          />
                        ) : (
                          <Avatar
                            style={{
                              backgroundColor: "#fde3cf",
                              color: "#f56a00",
                            }}
                          >
                            {userState?.user?.user?.name?.substring(0, 1)}
                          </Avatar>
                        )}
                      </div>
                      <div className="mb-0 mr-0 hidden md:block ">
                        <h6 className="text-[14px] mb-0 ">
                          {userState?.user?.user?.name}{" "}
                        </h6>
                        <h6 className="font-bold text-[12px] ">
                          {userState?.user?.user?.email}
                        </h6>
                      </div>
                    </Space>
                  </Dropdown>
                  <img
                    src={toggle ? close : menu}
                    alt="menu"
                    className="w-[28px] h-[28px] mr-4 object-contain md:hidden"
                    onClick={() => handleClickMenu()}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-6">
                  <Link to="/auth">
                    <button>Sign Up</button>
                  </Link>
                  <Link to="/login">
                    <button>Log In</button>
                  </Link>
                  <img
                    src={toggle ? close : menu}
                    alt="menu"
                    className="w-[28px] h-[28px] mr-4 object-contain md:hidden"
                    onClick={() => handleClickMenu()}
                  />
                </div>
              )}
            </div>
          </div>
        </nav>
        <div className=" absolute top-20 right-8">
          <div class="checkbox-wrapper-54">
            <label class="switch">
              <input onChange={onChange} type="checkbox" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </header>
    </>
  );
};

export default Nav;
