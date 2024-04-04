"use client";
import { Table, Pagination, Input, Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { DownOutlined } from '@ant-design/icons';


import Link from "next/link";
import Image from "next/image";
import axios from "@/api/axios"
// import Plus from "../../../public/assets/homeicons/Union.svg";

import AccountImg from "../../../public/assets/homeicons/EmployeesImg/AccountImg.svg";
import Person from "../../../public/assets/homeicons/EmployeesImg/Account.svg";
import Circle from "../../../public/assets/homeicons/EmployeesImg/circle.svg";
import { FiPlus } from "react-icons/fi";
import getAccessTokenFromCookie from "@/utils/getAccessToken";

const { Search } = Input;

const Page = () => {
  const accessToken = getAccessTokenFromCookie();
  const [currentPage, setCurrentPage] = useState(1);
  const [data , setData] = useState([])
  const [info,setInfo] = useState([])
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchText, setSearchText] = useState("");



  const columns = [
    {
      title: "Employee Name",
      dataIndex: "employee_name",
    },
    {
      title: "Employee ID",
      dataIndex: "id",
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
      dataIndex: "designation",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: "Employee type",
      dataIndex: "employee_type",
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
  // const data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     empId: 60,
  //     email: "email@gmail.com",
  //     english: 70,
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     empId: 55,
  //     email: "email@gmail.com",
  //     english: 89,
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     empId: "1545454",
  //     email: "email@gmail.com",
  //     english: 70,
  //   },
  //   {
  //     key: "4",
  //     name: "Jim Red",
  //     empId: 123526,
  //     email: "email@gmail.com",
  //     english: 89,
  //   },

  //   {
  //     key: "1",
  //     name: "John Brown",
  //     empId: 143414,
  //     email: "email@gmail.com",
  //     english: 70,
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     empId: 2421432,
  //     email: "email@gmail.com",
  //     english: 89,
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     empId: 3242,
  //     email: "email@gmail.com",
  //     english: 70,
  //   },
  //   {
  //     key: "4",
  //     name: "Jim Red",
  //     empId: 233244,
  //     email: "email@gmail.com",
  //     english: 89,
  //   },
  // ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const response1 = await axios.get('/dashboard/dashboardStats', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('response of dashboard',response1.data)
        setInfo(response1.data)
        console.log('')
        const response2 = await axios.get("/employee?page=1", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("data of employees",response2.data.employees)
        setData(response2.data.employees)
      } 
      catch(error){
        console.log('error of dashboard',error)
      }
    }
    fetchData()
  },[accessToken])

  const statusMenu = (
    <Menu>
      <Menu.Item key="All">All</Menu.Item>
      <Menu.Item key="Active">Permanent</Menu.Item>
      <Menu.Item key="Scheduled">Consultant</Menu.Item>
    </Menu>
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setCurrentPage(1);
    setSearchText(value);
  };

  
  const filteredData = data.filter((employee) =>
  employee.employee_name.toLowerCase().includes(searchText.toLowerCase())
);

  return (
    <div className="">
      {/* <header className='text-black w-full flex justify-center items-start'>
        Dashboard
       </header> */}
      <div className="w-full px-4 py-3 bg-[#E6F7FF] pb-5 ">
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
              <h3 className="text-2xl">{info?.Totalemployees}</h3>
            </div>
          </div>

          <div className="flex w-full bg-white p-6 gap-4  border rounded-2xl ">
            <Image src={Circle} alt="circle"/>
            <div>
              <h2>Total Projects</h2>
              <h3 className="text-2xl">{info?.Totalprojects}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between p-4">
        {/* <h2>Employees</h2> */}
      </div>
      <div className="bg-white w-full px-8 py-4 ml-4">
      <div className="mb-5 flex gap-4 items-center justify-between">
      <Search
          className="w-52 rounded-none"
          placeholder="Search Employee"
          onSearch={handleSearch}
        /> 
        <div className="flex items-center gap-4">
          <Dropdown overlay={statusMenu} trigger={['click']} className='mr-2 text-sm'>
            <a onClick={(e) => e.preventDefault()}>
              {selectedStatus || 'All'} <DownOutlined />
            </a>
          </Dropdown>
          <Link href={"/hrms/employees/addemp"}>
          <button className="bg-[#1890FF] text-white border w-44 hover:text-[#1890FF] hover:bg-white hover:border-[#1890FF] p-2 flex gap-3 justify-center items-center">
             <FiPlus />
             Add New Employees
          </button>
        </Link>
        </div>
        </div>
      <Table columns={columns} dataSource={filteredData} onChange={onChange} pagination={false} />
<div className="flex justify-end mt-5">
  <Pagination
    size="large"
    total={100}
    current={currentPage}
    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
    onChange={handlePageChange}
  />
</div>
    </div>
    </div>
  );
};

export default Page;