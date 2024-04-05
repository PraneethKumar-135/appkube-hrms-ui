import React from "react";
// import Upload from "./upload";
import axios from "@/api/axios";
import { FaRegFileAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Button, Progress, Table, notification } from "antd";
import FileTable from "./FileTable";
import { useState, useEffect } from "react";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
// import { Upload } from "antd";
import { Upload as AntUpload } from "antd"
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = AntUpload;
import { deletedocumentFullDetails, setDocumentDetails, setdocumentFullDetails } from "@/redux/slices/Details";
import { useDispatch, useSelector } from "react-redux";

const Documents = ({ tab, setTab }) => {
  // getting employee id from local storage
  // const empId = localStorage.getItem("empId");
  // updated usestate as required for backend
  const [req, setReq] = useState({ fileName: "", data: "" });
  const [docs, setDocs] = useState({ name: '', url: '' })
  const dispatch = useDispatch();
  const [fileuploaded, setfileuploaded] = useState(false);
  const accessToken = getAccessTokenFromCookie();
  const [Attachments, setAttachments] = useState([]);
  const [isClient, setIsClient] = useState(false);



  // Wrap the client-only code inside this conditional

  const handleFileChange = (info) => {
    const file = info.file.originFileObj; // Access the selected file object
    console.log("THis is file", file);
    console.log("This is info file", info.file, 'and', info.file.originFileObj);
    console.log(info.file, info.fileList, "these are lists of files ");
    console.log(info.fileList, "THis is inof multiple ");

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setReq({ fileName: file.name, data: base64 });
        setfileuploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log("req data", req);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-based, and padding with '0' if needed
  const day = String(currentDate.getDate()).padStart(2, '0'); // Padding with '0' if needed

  const dateString = `${year}-${month}-${day}`;

  console.log("attachmemnts data", Attachments);
  const uploadFile = async () => {
    // const data = {amar:req.url}
    try {
      console.log('uploadinf file', req)
      const response = await axios.post("/docUpload",
        // data,
        req,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("uploaded image response", response.data);
 
      setDocs({ name: req.fileName, url: response.data.link, date: dateString, })
      // alert("Image uploaded successfully!");
      imageTrueNotification()
      console.log('docs to push', docs)

      console.log("attachments", Attachments);

    } catch (error) {
      console.error("error uploading image", error);
      imageFalseNotification()
    }
  };
  console.log(Attachments);
  if (Attachments) {
    dispatch(setdocumentFullDetails(Attachments));
  }

  if (fileuploaded) {
    // useEffect(()=>{
    uploadFile()
    setfileuploaded(false);
  }


  useEffect(() => {
    // Check if both name and url are truthy
    setIsClient(true);
    if (docs.name && docs.url) {
      // Push the docs object into Attachments
      setAttachments(prevAttachments => [...prevAttachments, docs]);
    }
  }, [docs, isClient]);

  const MyUploads = () => {
    return (
      <>
        <Dragger
          multiple
          onChange={(e) => {
            handleFileChange(e);
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </>
    );
  };
  
  const HandleDocuments = async () => {
    // creating variable data for hitting api as per format with empid and documents
    if (isClient) {
      // Access localStorage only in the client-side context
      // const empId = localStorage.getItem("empId");
      const empId = localStorage.getItem("empId");
      console.log("id from localstorage", empId);
      // Your remaining client-side code here...

      const data = {
        emp_id: empId,
        documents: Attachments,
      };
      try {
        console.log("data to put", data);
        const response = await axios.put("/employee/document", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("response of documemnst", response);
        if (response.status === 200) {
          // storing the response in redux
          dispatch(setDocumentDetails(response.data));
          // changing the tab
          trueNotification()
          setTab(tab + 1);
        }
      } catch (error) {
        console.log("error uploading document", error);
        falseNotification()
      }


    }
  };
  const falseNotification = () => {
    notification.open(
      { message: 'please review the details and fill all fields with correct details', }
    );
  };
  const trueNotification = () => {
    notification.open(
      { message: 'documents information stored,redirected to Review screen', }
    );
  };
  const imageTrueNotification = () => {
    notification.open(
      { message: 'Image uploaded successfully!', }
    );
  };
  const imageFalseNotification = () => {
    notification.open(
      { message: 'Error uploading image. Please try again.', }
    );
  };

  return (
    <div className="w-full h-full p-10 flex flex-col ">
      <div>
        <MyUploads />
      </div>
      <p className="mt-6 font-semibold text-lg">Attach Files</p>
      <FileTable />
      <button
        className="w-[30%]  bg-[#1890FF] text-white hover:text-[#1890FF] hover:bg-white  border hover:border-[#1890FF] m-auto h-9 mt-10 "
        onClick={HandleDocuments}
      >
        Next
      </button>
    </div>
  );
};

export default Documents;