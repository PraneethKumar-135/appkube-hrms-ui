
"use client";
import React from "react";
import { Space, Table, Tag, Button, notification } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";
import { deletedocumentFullDetails, setdocumentDetails } from "@/redux/slices/Details";
const { Column, ColumnGroup } = Table;
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import axios from "axios";

const FileTable = () => {
  const dispatch = useDispatch()
  const empId =  "0d466422-41b9-4150-a378-fb60f7296a3b"
  const documentDetails = useSelector((state) => state.Details.documentFullDetails)
  console.log("documentDetails", documentDetails)
  const handledelete = (value) => {
    console.log(value)
    dispatch(deletedocumentFullDetails(value))
  }
  return (
    <div className="bg-white mt-1">
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <td className="text-left text-sm font-medium text-black uppercase tracking-wider pt-10 px-2 pb-3 " style={{ width: "30%" }}>File Name</td>
            <td className="text-center text-xs font-medium text-black uppercase tracking-wider pt-10 px-2 pb-3 border border-y-0 border-r-0 border-l-2" style={{ width: "30%" }}>Date uploaded</td>
            <td className="text-center text-xs font-medium text-black uppercase tracking-wider pt-10 px-2 pb-3 border border-y-0 border-r-0 border-l-2" style={{ width: "30%" }}>Uploaded by</td>
          </tr>
        </thead>
        <tbody>
          {documentDetails.map((data, index) => (
            <tr key={index} className="">
              <td style={{ width: "30%" }} className="py-5 border border-x-0 ">
                <div className="flex items-center space-x-5 pl-3 ">
                  <Image src={data.url} width={50} height={50} className="rounded-full overflow-hidden" />
                  <span>{data.name}</span>
                </div>
              </td>
              <td className="text-sm text-center font-medium py-5 border border-x-0 " style={{ width: "30%" }}>{data.date}</td>
              <td className="text-sm text-center font-medium py-5 border border-x-0 " style={{ width: "30%" }}>John</td>
              <td style={{ width: "10%" }} className="py-5 border border-x-0 " >
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handledelete(data.url)}
                >Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default FileTable;
