import React, { useEffect } from "react";
import { Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../features/blog/blogSlice";

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
    title: "Category",
    dataIndex: "cat",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.cat.length - b.cat.length,
  },
  {
    title: "Author",
    dataIndex: "author",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);
  const blogState = useSelector((state) => state.blog.blogs.blogs);
  // console.log(blogState);

  const data1 = [];
  for (let i = 0; i < blogState?.length; i++) {
    data1.push({
      key: i + 1,
      title: blogState[i].title,
      cat: blogState[i].category,
      author: blogState[i].author,

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
      <div className="m-4 title">
        <h3 className="mb-4">Recent Blogs</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default BlogList;
