"use client";
import { Table } from "antd";
import React from "react";

import Link from "next/link";
import Image from "next/image";

// import Plus from "../../../public/assets/homeicons/Union.svg";

import AccountImg from "../../../public/assets/homeicons/EmployeesImg/AccountImg.svg";
import Person from "../../../public/assets/homeicons/EmployeesImg/Account.svg";
import Circle from "../../../public/assets/homeicons/EmployeesImg/circle.svg";
import { FiPlus } from "react-icons/fi";
const page = () => {
  const columns = [
    {
      title: "Employee Name",
      dataIndex: "name",
    },
    {
      title: "Employee ID",
      dataIndex: "empId",
      sorter: {
        compare: (a, b) => a.empId - b.empId,
        multiple: 3,
      },
    },
    {
      title: "Email Address",
      dataIndex: "email",
      sorter: {
        compare: (a, b) => a.email - b.email,
        multiple: 2,
      },
    },
    {
      title: "Designation",
      dataIndex: "english",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: "Employee type",
      dataIndex: "english",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: "Start Date",
      dataIndex: "english",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      empId: 60,
      email: "email@gmail.com",
      english: 70,
    },
    {
      key: "2",
      name: "Jim Green",
      empId: 55,
      email: "email@gmail.com",
      english: 89,
    },
    {
      key: "3",
      name: "Joe Black",
      empId: "1545454",
      email: "email@gmail.com",
      english: 70,
    },
    {
      key: "4",
      name: "Jim Red",
      empId: 123526,
      email: "email@gmail.com",
      english: 89,
    },

    {
      key: "1",
      name: "John Brown",
      empId: 143414,
      email: "email@gmail.com",
      english: 70,
    },
    {
      key: "2",
      name: "Jim Green",
      empId: 2421432,
      email: "email@gmail.com",
      english: 89,
    },
    {
      key: "3",
      name: "Joe Black",
      empId: 3242,
      email: "email@gmail.com",
      english: 70,
    },
    {
      key: "4",
      name: "Jim Red",
      empId: 233244,
      email: "email@gmail.com",
      english: 89,
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="">
      {/* <header className='text-black w-full flex justify-center items-start'>
        Dashboard
       </header> */}
      <div className="w-full  px-4 py-3 bg-[#E6F7FF] pb-5 ">
        <h2>Dashboard</h2>

        <div className="flex gap-4 justify-center items-center">
          <div className="flex w-full py-6">
            <Image src={AccountImg} className="" alt="acount image" />
            <div className=" flex flex-col pl-4">
              <h1 className="text-2xl"> Welcome Ajay! </h1>
              <h1 className="text-2xl">Have a nice day!</h1>
            </div>
          </div>

          <div className="flex w-full bg-white p-6 gap-4 border rounded-xl ">
            <Image src={Person} alt="person"/>
            <div>
              <h2>Total Employees</h2>
              <h3 className="text-2xl">82</h3>
            </div>
          </div>

          <div className="flex w-full bg-white p-6 gap-4  border rounded-2xl ">
            <Image src={Circle} alt="circle"/>
            <div>
              <h2>Total Projects</h2>
              <h3 className="text-2xl">07</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between p-4">
        <h2>Employees</h2>
        <Link href={"/hrms/employees/addemp"}>
          <button className="bg-[#1890FF] text-white border hover:text-[#1890FF] hover:bg-white hover:border-[#1890FF] flex p-4 gap-3 justify-center items-center">
             <FiPlus />
             Add New Employees
          </button>
        </Link>
      </div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default page;
