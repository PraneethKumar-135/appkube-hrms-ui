"use client";
import React, { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
// import Image from "next/image";
// import Link from "next/link";
// import Plus from "../../../../public/assets/homeicons/Union.svg";
import { useRouter } from "next/navigation";
// import Avatar from "@/../public/assets/empDetails/Avatar1.svg";
// import axios from 'axios'
import axios from "@/api/axios";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import { FiPlus } from "react-icons/fi";

export const SendEmp = (emp) => {
  if(emp===undefined){
    console.log('')
  }
    console.log(emp);
  
};
const Page = () => {

  const router = useRouter();
  const AddEmployees = ()=>{

    router.push('/hrms/employees/addemp')
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    router.push("/hrms/employees/employeesOverView");
  };

  const [employees, setEmployees] = useState([]);
  
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
        // console.log("data",employees)
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const stylestable = {
    width: "100%",
    borderCollapse: "collapse",
    padding: "0",
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
        
          <button onClick={AddEmployees} className="bg-[#1890FF] hover:text-[#1890FF] border hover:bg-white hover:border-[#1890FF] text-white flex p-4 gap-3 justify-center items-center">
            <FiPlus /> Add New Employees
          </button>
       
      </div>
      {employees.length > 0 ? (
        <table className="leading-10 gap-5">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee Id</th>
              <th>Project</th>
              <th>Email Address</th>
              <th>Designation</th>
              <th>Employee Type</th>
              <th>Department</th>
              <th>Start Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.employee_id}
                onClick={() => {
                  SendEmp(emp);
                }}
                className="!p-10 "
              >
                <td>{emp.employee_name}</td>
                <td>{emp.employee_id}</td>
                <td>appkube</td>
                <td>{emp.email}</td>
                <td>{emp.designation}</td>
                <td>{emp.employee_type}</td>
                <td>{emp.department}</td>
                <td>{emp.start_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>...Loading or Empty State Message</h2>
      )}
    </div>
  );
};

export default Page;
