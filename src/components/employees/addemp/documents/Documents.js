// "use server"

"use client";
import React from "react";
// import Upload from "./upload";

import { FaRegFileAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Progress, Table } from "antd";
import axios from 'axios';
import FileTable from './FileTable';
import { useState } from 'react';
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import { Upload } from "antd";
import Image from 'next/image';
import { InboxOutlined } from '@ant-design/icons';
import { Space, Tag, Button } from "antd";
import { AiFillDelete } from "react-icons/ai";
const { Column, ColumnGroup } = Table;
const { Dragger } = Upload;
const Documents = ({ tab, setTab }) => {
  const [req, setReq] = useState(
    { fileName: '', data: '' }
  );

  const [fileuploaded, setfileuploaded] = useState(false)
  const accessToken = getAccessTokenFromCookie();
  const handleFileChange = (info) => {
    const file = info.file.originFileObj; // Access the selected file object
    console.log("THis is file", file)
    console.log("This is info file", info.file)
    console.log(info.file, info.fileList, 'these are lists of files ');
    console.log(info.fileList, 'THis is inof multiple ')

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setReq({ fileName: file.name, data: base64 });
        setfileuploaded(true)
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(req)



  const [Attachments, setAttachments] = useState([])


  const uploadFile = async () => {


    try {

      const response = await axios.post('https://i3mdnxvgrf.execute-api.us-east-1.amazonaws.com/dev/docUpload',

        req, {

        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }

      );

      console.log(response.data);
      alert('Image uploaded successfully!');
      // setAttachments(response.data.link);
      setAttachments([...Attachments, response.data.link])

    }

    catch (error) {
      console.error(error);
      console.log(error)
      alert('Error uploading image. Please try again.');
    }


  }


  console.log(Attachments)
  const data = [
    {
      key: "1",
      FileName: "Pancard.pdf",
      Dateuploaded: "13/02/2024",
      age: 32,
      Uploadedby: "John",
    },
    {
      key: "2",
      FileName: "Education.pdf",
      Dateuploaded: "13/02/2024",
      age: 42,
      Uploadedby: "Jim",
    },
    {
      key: "3",
      FileName: "Education.pdf",
      Dateuploaded: "13/02/2024",
      age: 32,
      Uploadedby: "Joe",
    },
  ];

  return (
    <div className="w-full h-full p-10 flex flex-col " >

      <div>
        <Dragger multiple onChange={(e) => { handleFileChange(e) }}  >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
            banned files.
          </p>
        </Dragger>
        <div  >
          <h2>Uploaded Files </h2>
          <div className='flex flex-row gap-4 p-4'>
            {Attachments.map((e, index) => { return <Image key={index} src={e} alt="Uploaded images" height={50} width={50} /> })}
          </div>
        </div>
      </div>

      <div className="mt-10 border border-gray-400 p-4 rounded-xl">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="bg-[#E6F7FF] w-10 h-10 flex items-center justify-center rounded-full">
              <FaRegFileAlt />
            </div>
            <spam>
              <p>Educational Certificates 01</p>
              <p>1.2 MB</p>
            </spam>
          </div>
          <RxCross2 />
        </div>

        <Progress percent={20} showInfo={true} className="ml-12 w-[96%] " />
      </div>
      <div>
        <p className="mt-6 py-5 font-semibold text-lg">Attach Files</p>
        <Table dataSource={data}>
          <Column
            title="File Name"
            dataIndex="FileName"
            key="FileName"
            render={(_, data) => (
              <Space size="middle">
                <div className="bg-[#E6F7FF] w-10 h-10 flex items-center justify-center rounded-full">
                  <FaRegFileAlt />
                </div>
                <p>{data.FileName}</p>
              </Space>
            )}
          />
          <Column
            title="Date uploaded"
            dataIndex="Dateuploaded"
            key="Dateuploaded"
          />
          <Column title="Uploaded by" dataIndex="Uploadedby" key="Uploadedby" />
          <Column
            title=""
            key="action"
            render={(_, record) => (
              <Button type="danger" icon={<AiFillDelete />} style={{ color: "white", background: "#FF4D4F", display: "flex", alignItems: "center" }} >
                Delete
              </Button>
            )}
          />

        </Table>
      </div>

      <button
        className="w-[30%]  bg-[#1890FF] text-white hover:text-[#1890FF] hover:bg-white  border hover:border-[#1890FF] m-auto h-9 "
        onClick={() => {
          setTab(tab + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Documents;
