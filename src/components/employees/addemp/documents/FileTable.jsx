// "use client";
// import React from "react";
// import {    Space, Table, Tag, Button } from "antd";
// import { AiFillDelete } from "react-icons/ai";
// import { FaRegFileAlt } from "react-icons/fa";
// const { Column, ColumnGroup } = Table;

// const FileTable = ()=>{

//     const data = [
//         {
//           key: "1",
//           FileName: "Pancard.pdf",
//           Dateuploaded: "13/02/2024",
//           age: 32,
//           Uploadedby: "John",
//         },
//         {
//           key: "2",
//           FileName: "Education.pdf",
//           Dateuploaded: "13/02/2024",
//           age: 42,
//           Uploadedby: "Jim",
//         },
//         {
//           key: "3",
//           FileName: "Education.pdf",
//           Dateuploaded: "13/02/2024",
//           age: 32,
//           Uploadedby: "Joe",
//         },
//       ];

//     (

//   <Table dataSource={data}>
//     <ColumnGroup title="">
//       <Column
//         title="File Name"
//         dataIndex="FileName"
//         key="FileName"
//         render={(_,data) => (
//           <Space size="middle">
//             <div className="bg-[#E6F7FF] w-10 h-10 flex items-center justify-center rounded-full">
//               <FaRegFileAlt />
//             </div>
//             <p>{data.FileName}</p>
//           </Space>
//         )}
//       />
//       <Column
//         title="Date uploaded"
//         dataIndex="Dateuploaded"
//         key="Dateuploaded"
//       />
//       <Column title="Uploaded by" dataIndex="Uploadedby" key="Uploadedby" />
//     </ColumnGroup>

//     <Column
//       title=""
//       key="action"
//       render={(_, record) => (
//         <Space size="middle">
//           <Button className="w-24 flex items-center gap-2 justify-center bg-[#FF4D4F] text-white ">
//             <AiFillDelete />
//             Delete
//           </Button>
//         </Space>
//       )}
//     />
//   </Table>
// );
//       }
// export default FileTable;

"use client";
import React from "react";
import { Space, Table, Tag, Button } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
const { Column, ColumnGroup } = Table;

const FileTable = () => {
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
    <Table dataSource={data}>
      <ColumnGroup title="">
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
      </ColumnGroup>

      <Column
        title=""
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <button className="flex items-center gap-2 justify-between border bg-[#FF4D4F] text-white hover:text-[#FF4D4F] hover:bg-white hover:border-[#FF4D4F]       rounded-sm  py-2  px-4 group">
              <AiFillDelete className=""/>
              <span>Delete</span>
            </button>
          </Space>
        )}
      />
    </Table>
  );
};
export default FileTable;
