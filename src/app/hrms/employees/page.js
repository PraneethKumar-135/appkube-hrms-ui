'use client';
import React, { useState, useEffect } from "react";
import { Breadcrumb, Table, Input, Pagination, Dropdown, Menu } from "antd";
import { FiPlus } from "react-icons/fi";
import axios from "@/api/axios";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import { useRouter } from "next/navigation";
import { DownOutlined } from '@ant-design/icons';

export const SendEmp = (emp) => {
  if (emp === undefined) {
    console.log("");
  }
  console.log(emp);
};
const { Search } = Input;

const Page = () => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState(null);

  const AddEmployees = () => {
    router.push("/hrms/employees/addemp");
  };

  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const accessToken = getAccessTokenFromCookie();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const values = await axios.get("/employee?page=1", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("response", values.data.employees);
        setEmployees(values.data.employees);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [accessToken]);

  const filteredEmployees = employees.filter((employee) =>
    employee.employee_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "Employee Id",
      dataIndex: "id",
      key: "employee_id",
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      sorter: {
        compare: (a, b) => a.email - b.email,
        multiple: 2,}
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Employee Type",
      dataIndex: "employee_type",
      key: "employee_type",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const statusMenu = (
    <Menu>
      <Menu.Item key="All">All</Menu.Item>
      <Menu.Item key="Active">Permanent</Menu.Item>
      <Menu.Item key="Scheduled">Consultant</Menu.Item>
    </Menu>
  );

  const handleSearch = (value) => {
    setCurrentPage(1);
    setSearchText(value);
  };

  return (
    <div>
      <div className="flex justify-between p-4">
        <div className="flex flex-col gap-2">
          <Breadcrumb
            items={[
              {
                title: "Dashboard",
              },
              {
                title: <a href="">Employees</a>,
              },
            ]}
          />
          <h2 className="text-xl font-semibold">All Employees</h2>
        </div>
      </div>

      <div className="bg-white w-full px-8 py-4 ml-4 flex justify-between">
      <Search
          className="w-80 mt-4"
          placeholder="Search Employee"
          onSearch={handleSearch}
        />
        <div className="flex items-center">
          <Dropdown overlay={statusMenu} trigger={['click']} className='mr-2 text-sm'>
            <a onClick={(e) => e.preventDefault()}>
              {selectedStatus || 'All'} <DownOutlined />
            </a>
          </Dropdown>
          <button
            onClick={AddEmployees}
            className="bg-[#1890FF] hover:text-[#1890FF] border hover:bg-white hover:border-[#1890FF] text-white flex p-4 gap-3 justify-center items-center ml-4"
          >
            <FiPlus /> Add New Employees
          </button>
        </div>
      </div>

      <div className="bg-white w-full px-8 py-4 ml-4">
        <Table
          columns={columns}
          dataSource={filteredEmployees}
          onRow={(record) => {
            return {
              onClick: () => {
                SendEmp(record);
              },
            };
            
          }}
          pagination={false}
        />
        <div className="flex justify-end mt-6">
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