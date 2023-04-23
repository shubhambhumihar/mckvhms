import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Space } from "antd";
import { logout } from "../features/auth/authSlice";
import { Switch } from "antd";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  const [theme, setTheme] = useState("light-theme");

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

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
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
  // console.log(userState.user.user);
  // const user = userState.user.user;
  // console.log(user);

  // const [user, setUser] = useState({});
  // const getUserFromLocalStorage = localStorage.getItem("user-frontend")
  //   ? JSON.parse(localStorage.getItem("user-frontend"))
  //   : null;

  // const [user, setUser] = useState(
  //   JSON.parse(localStorage.getItem("user-frontend"))
  // );

  // useEffect(() => {
  //   localStorage.setItem("user-frontend", JSON.stringify(user));
  // }, [user]);

  // useEffect(() => {
  //   const getUserFromLocalStorage = localStorage.getItem("user-frontend")
  //     ? JSON.parse(localStorage.getItem("user-frontend"))
  //     : null;
  //   if (getUserFromLocalStorage) {
  //     setUser(getUserFromLocalStorage.user);
  //   }
  //   window.addEventListener("storage", handleStorageChange);
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  // const handleStorageChange = (event) => {
  //   if (event.key === "user") {
  //     setUser(event.newValue);
  //   }
  // };

  // useEffect(() => {
  //   const getUserFromLocalStorage = localStorage.getItem("user-frontend")
  //     ? JSON.parse(localStorage.getItem("user-frontend"))
  //     : null;
  //   if (getUserFromLocalStorage) {
  //     setUser(getUserFromLocalStorage.user);
  //   }

  //   const handleStorageChange = (event) => {
  //     console.log("Storage event triggered", event);
  //     if (event.key === "user-frontend") {
  //       setUser(event.newValue);
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  // console.log(user);

  // useEffect(() => {

  //   setUser(getUserFromLocalStorage.user);
  // }, []);

  // const { user, isLoading, isSuccess, isError } = userState;

  // console.log(user);
  // useEffect(() => {
  //   setUser(getUserFromLocalStorage.user);
  // }, []);

  // console.log(getUserFromLocalStorage);
  return (
    <nav
      className={`w-full flex items-center justify-center py-2 sticky top-0 z-20 bg-primary  shadow-md shadow-violet-700 `}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <div className="border">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            {" "}
            <img
              src={logo}
              alt="logo"
              className="w-20 h-9 object-contain animate-pulse"
            />
            <h6 className="text-white text-[18px] font-bold cursor-pointer flex ">
              Ramgarh &nbsp;
              <span className="sm:block hidden text-white">
                {" "}
                | Engineering College
              </span>
            </h6>
          </Link>
        </div>
        <div className="border border-red-400 flex justify-center">
          <ul className="list-none menu hidden sm:flex flex-row gap-4 ">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(nav.title)}
              >
                <Link to={nav.id}>{nav.title} </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="submit hidden sm:flex flex-row">
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
                      <img
                        className="w-[35px] h-[35px] mr-1 rounded-full "
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                        alt=""
                      />
                    </div>
                    <div className="mb-0">
                      <p className="text-[14px] mb-0">
                        {userState?.user?.user?.name}{" "}
                      </p>
                      <p className="font-bold text-[12px] text-[#7AA874]">
                        {userState?.user?.user?.email}
                      </p>
                    </div>
                  </Space>
                </Dropdown>
              </div>
            ) : (
              <div>
                <Link to="/auth">
                  <button>Sign Up</button>
                </Link>
                <Link to="/auth">
                  <button>Log In</button>
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* <button className="border p-2" onClick={() => toggleTheme()}>
          Change theme
        </button> */}
        <div>
          <Switch defaultChecked onChange={onChange} />
        </div>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] mr-4 object-contain"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl flex-col `}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4 animate__animated animate__fadeInRight animate__delay-2s">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <Link to={nav.id}>{nav.title} </Link>
                </li>
              ))}
            </ul>
            <div className="submit flex flex-col ">
              <button>Signup</button>
              <button>Login</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

{
  /* <div className="flex items-center space-x-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src="/docs/images/people/profile-picture-5.jpg"
                  alt=""
                />
                <div class="font-medium dark:text-white">
                  <div>Jese Leos</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Joined in August 2014
                  </div>
                </div>
              </div> */
}
