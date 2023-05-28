import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";

const { Panel } = Collapse;

const text7 = `
Sandwich 🥪
RICE , DAL , SABJI , SALAD 
CHICKEN / VEG  BIRYANI`;
const Food = () => {
  const { token } = theme.useToken();

  const panelStyle = {
    marginBottom: 24,
    background: "#DDF7E3",
    borderRadius: token.borderRadiusLG,
    border: "none",
    padding: "10px",
  };

  return (
    <div className="max-w-screen-3xl mx-auto  " id="food">
      <div className="mx-auto grid lg:grid-cols-2 justify-center place-items-center  gap-2">
        <div className="py-8  grid sm:grid-cols-2 md:grid-cols-2 place-items-center   lg:grid-cols-3 p-7 mx-auto  gap-5">
          <lottie-player
            className="flex justify-center border"
            src="https://assets2.lottiefiles.com/packages/lf20_6efbhc0k.json"
            background="transparent"
            speed="1"
            style={{ width: "150px", height: "150px" }}
            loop
            autoplay
          ></lottie-player>

          <div className="flex justify-center   animate-pulse  ">
            <img
              src="https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png"
              alt=""
              className="w-1/2 rounded-full hover:scale-105 duration-500  shadow-md shadow-violet-600"
            />
          </div>
          <div className="flex justify-center  animate-pulse duration-600 motion-reduce   ">
            <img
              src="https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png"
              className="w-1/2  hover:scale-105 shadow-md shadow-orange-600 rounded-full duration-500 "
              alt=""
            />
          </div>
          <div className="flex justify-center  animate-pulse duration-600">
            <img
              src="https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png"
              alt=""
              className="w-1/2    hover:scale-105 duration-500   shadow-md shadow-green-600 rounded-full"
            />
          </div>
          <div className="flex justify-center   animate-spin ">
            <img
              src="https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png"
              alt=""
              className="w-1/2   shadow-md shadow-red-600 duration-500  rounded-full hover:scale-105"
            />
          </div>
          <div className="flex justify-center   animate-pulse ">
            <img
              src="https://b.zmtcdn.com/data/dish_images/e44c42ff4b60b025225c8691ef9735b11635781903.png"
              alt=""
              className="w-1/2  shadow-md shadow-pink-600 duration-500  rounded-full  hover:scale-105"
            />
          </div>
          <div className="flex justify-center animate-pulse">
            <img
              src="https://b.zmtcdn.com/data/dish_images/d5ab931c8c239271de45e1c159af94311634805744.png"
              alt=""
              className="w-1/2  shadow-md shadow-orange-600 duration-500  rounded-full hover:scale-105"
            />
          </div>
          <div className="flex justify-center  animate-pulse ">
            <img
              src="https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png"
              alt=""
              className="w-1/2  shadow-md shadow-violet-600 duration-500  rounded-full hover:scale-105"
            />
          </div>

          <div className="flex justify-center  animate-pulse">
            <img
              src="https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png"
              className="w-1/2  shadow-md shadow-white duration-500  rounded-full hover:scale-105"
              alt=""
            />
          </div>
        </div>
        <div className="shadow-inner p-5">
          <h1 className="text-center text-4xl md:text-6xl py-2 my-5 text-[#7556e5] font-bold first-letter:text[orange]">
            <span className="text-[orange]">F</span>ood Info
          </h1>
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{ background: "#1212121" }}
          >
            <Panel header="Sunday Plan" key="1" style={panelStyle}>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg">Breakfast</p>
                <p className="text-xs">IDLI</p>
              </div>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg ">Lunch</p>
                <p className="text-xs">
                  RICE , FISH OR RICE MIX VEG , AALU BHUJIA , SALAD .
                </p>
              </div>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg">Dinner</p>
                <p className="text-xs">ROTI , AALU SOYABEEN</p>
              </div>
            </Panel>
            <Panel header="Monday Plan" key="2" style={panelStyle}>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg">Breakfast</p>
                <p className="text-xs">IDLI</p>
              </div>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg ">Lunch</p>
                <p className="text-xs">
                  RICE , DAL , BHUJIA ,SABJI , CHUTNEY , SALAD
                </p>
              </div>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg">Dinner</p>
                <p className="text-xs">
                  CHAPATI , CHICKEN CHILLI / PANEER CHILLI`
                </p>
              </div>
            </Panel>
            <Panel header="Tuesday Plan" key="3" style={panelStyle}>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg">Breakfast</p>
                <p className="text-xs">KACHORI , AALU MATAR </p>
              </div>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg ">Lunch</p>
                <p className="text-xs">RICE,DAL, SABJI,BHUJIA, PAPAD,SALAD</p>
              </div>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg">Dinner</p>
                <p className="text-xs">JEERA RICE, TADKA , CHAPATI, BHUJIA`</p>
              </div>
            </Panel>
            <Panel header="Wednesday Plan" key="4" style={panelStyle}>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg">Breakfast</p>
                <p className="text-xs">PARATHA , ALU CHANA </p>
              </div>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg ">Lunch</p>
                <p className="text-xs">RICE , DAL , BHUJIA , SABJI , SALAD </p>
              </div>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg">Dinner</p>
                <p className="text-xs">KHEER PURI AALUDAM`;</p>
              </div>
            </Panel>
            <Panel header="Thursday Plan" key="5" style={panelStyle}>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg">Breakfast</p>
                <p className="text-xs">SATU PURI , SABJI </p>
              </div>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg ">Lunch</p>
                <p className="text-xs">
                  RICE , DAL ,SABJI ,PYAAZ PAKORA , CHUTNEY{" "}
                </p>
              </div>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg">Dinner</p>
                <p className="text-xs">CHAPATI , EGG CURRY / MANCHURIAN`;</p>
              </div>
            </Panel>
            <Panel header="Friday Plan" key="6" style={panelStyle}>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg">Breakfast</p>
                <p className="text-xs">AALU PARATHA , SABJI </p>
              </div>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg ">Lunch</p>
                <p className="text-xs">
                  RICE , DAL , CHOKHA , SABJI , PAPAD ,SALAD
                </p>
              </div>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg">Dinner</p>
                <p className="text-xs">CHAPATI , MIX-VEG`;</p>
              </div>
            </Panel>
            <Panel header="Saturday Plan" key="7" style={panelStyle}>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg">Breakfast</p>
                <p className="text-xs">Sandwich 🥪 </p>
              </div>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg ">Lunch</p>
                <p className="text-xs">RICE , DAL , SABJI , SALAD</p>
              </div>
              <div className="bg-[#d5c9c9] p-5 my-6 rounded-xl">
                <p className="text-black font-bold text-lg">Dinner</p>
                <p className="text-xs">CHICKEN / VEG BIRYANI`;</p>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default Food;
