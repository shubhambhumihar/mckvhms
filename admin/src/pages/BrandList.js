import React, { useEffect } from "react";
import { Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../features/brand/brandSlice";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Serial No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "title",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BrandList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);
  const brandState = useSelector((state) => state.brand.brands.brands);
  console.log(brandState);

  const data1 = [];
  for (let i = 0; i < brandState?.length; i++) {
    data1.push({
      key: i + 1,
      title: brandState[i].title,

      action: (
        <div className="flex gap-5">
          <Link to="/" className="text-green-500 text-lg ">
            <CiEdit />
          </Link>
          <Link to="/" className="text-red-500 text-lg ">
            <AiOutlineDelete />{" "}
          </Link>
        </div>
      ),
    });
  }
  return (
    <div>
      <div className="m-4">
        <h3 className="mb-4 title"> Brands</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default BrandList;
