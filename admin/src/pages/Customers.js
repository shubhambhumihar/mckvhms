import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../features/customers/customerSlice";

const columns = [
  {
    title: "Serial No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();

  const customerState = useSelector((state) => state.customer.customers.users);
  // console.log(state);

  // console.log(customerState?.length);
  // const { users } = customerState;

  // console.log(customerState);

  const data1 = [];
  for (let i = 0; i < customerState?.length; i++) {
    if (customerState[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: customerState[i].firstname + " " + customerState[i].lastname,

        email: customerState[i].email,
        mobile: customerState[i].mobile,
      });
    }
  }

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div>
      <div className="m-4">
        <h3 className="mb-4 title">Customers </h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Customers;
