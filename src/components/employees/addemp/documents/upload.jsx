"use client"
import React from 'react';
import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import Image from 'next/image';

import { Upload } from "antd";

// import { InboxOutline  d } from '@ant-design/icons';
const { Dragger } = Upload;








// const UploadFile = () => {
// // import { InboxOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import Image from 'next/image';

// import { Upload } from "antd";

// import { InboxOutlined } from '@ant-design/icons';
// const { Dragger } = Upload;

const UploadFiles = () => {


  const [req, setReq] = useState(
    { fileName: '', data: '' }
  );


<<<<<<< HEAD
  // const [req, setReq] = useState(
  //   { fileName: '', data: '' }
  // );
=======

  
>>>>>>> ccb4f446e019a712fc7fa22e15197351cb13a8dc

  const [fileuploaded, setfileuploaded] = useState(false)

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

        req,

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


  if (fileuploaded) {
    // useEffect(()=>{
    uploadFile(),
      setfileuploaded(false)

  }
  console.log(Attachments)


  return (
    // <Dragger {...props}>
    //   <p className="ant-upload-drag-icon ">
    //     <InboxOutlined />
    //   </p>
    //   <p className="ant-upload-text">Click or drag file to this area to upload</p>
    //   <p className="ant-upload-hint">Support for a single or bulk upload.</p>
    // </Dragger>
    <>
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
      <div>{Attachments.map((e, index) => { return <Image  key={index} src={e} alt="Uploaded images" height={50} width={50} /> })}</div>

    </>
  );

  }

// export default UploadFile;
export default UploadFiles;

