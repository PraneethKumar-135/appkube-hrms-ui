"use client";

import React from "react";
import { Button } from "antd";
import { BsPersonAdd } from "react-icons/bs";
import { RiContractRightFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Onboardemp = () => {
  const router = useRouter();
  return (
    <div className=" !w-full min-h-full h-dvh relative flex flex-col justify-center items-center gap-3 bg-gray-100 border ">
      <div className="absolute right-4 top-3 ">
        <button className="bg-[#1890FF] text-white hover:bg-white hover:text-[#1890FF] border hover:border-[#1890FF] p-2 px-3 rounded-md">
          Bulk import
        </button>
      </div>

      <div className="flex flex-col justify-center items-center -mt-24 gap-3">
        <h2 className="w-auto text-xl font-semibold">Add Employee</h2>
        <p>Start Creating your agreement by selecting the type of worker</p>
      </div>
      <div className=" flex gap-5 items-center  justify-center w-[100%] p-5">
        <div className="h-[100%] bg-white flex flex-col justify-between items-center gap-4 p-4 w-[25%] rounded-sm shadow-sm">
          <div className="w-10 h-10 bg-[#E6F7FF]  text-black rounded-full flex  justify-center items-center">
            <BsPersonAdd className="text-2xl" />
          </div>
          <h5 className="text-lg font-bold">Employee</h5>
          <p className="text-wrap text-center">
            A person who is employed by an organization for wages or Salary
          </p>

          <button
            onClick={() => {
              router.push("/hrms/employees/addemp/details");
            }}
            className=" bg-[#1890FF] text-white hover:bg-white hover:text-[#1890FF] border hover:border-[#1890FF] text-xs group rounded-md p-2 flex gap-1 justify-between items-center shadow-sm "
          >
            Add Employee
            <RiContractRightFill className="text-lg group-hover:text-[#1890FF]" />
          </button>
        </div>
        <div className="h-[100%] bg-white flex flex-col justify-between items-center gap-4 p-4 w-[25%] rounded-sm shadow-sm">
          <div className="w-10 h-10 bg-[#E6F7FF]  text-black rounded-full flex  justify-center items-center">
            <BsPersonAdd className="text-2xl" />
          </div>
          <h5 className="text-lg font-bold">Consultant</h5>
          <p className="text-wrap text-center">
            Consultant provide services to a company on a flexible, short-term,
            or per-project basis.
          </p>
          <button className=" bg-[#1890FF] text-white hover:bg-white hover:text-[#1890FF] border hover:border-[#1890FF] text-xs group rounded-md p-2 flex gap-1 justify-between items-center shadow-sm">
            Add Consultant
            <RiContractRightFill className="text-lg group-hover:text-[#1890FF]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboardemp;
