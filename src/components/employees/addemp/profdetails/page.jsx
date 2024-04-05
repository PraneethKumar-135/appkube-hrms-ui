"use client";

// ProfessionalForm.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Button, Select, Col, Row, DatePicker, Space } from "antd";
import { useForm } from "antd/lib/form/Form";

import { useRouter } from "next/navigation";
import axios from "@/api/axios";
import axiosW from "@/api/workflow";
import getAccessTokenFromCookie from "@/utils/getAccessToken";


import {
  updateProfessionalDetails,
  selectProfessionalDetails,
  setDropdownOption,
  setDropdownOptionDesig,
  setDropdownOptionwork,
  setDropdownOptionReport,
  setSelectedDate,
} from "../../../../redux/slices/profDetails";

const numberRegex = /^[0-9]{5,}$/; // Ensure at least 5 digits

const ProfessionalInfo = ({ tab, setTab }) => {
  const id = useSelector((state) => state.Details.id)
  const selectedDate = useSelector((state) => state.selectedDate);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [selectedDesignations, setSelectedDesignations] = useState("");
  const [departmentData, setDepartmentData] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState("");


  const handleSelectChange = (value) => {
    console.log(value)
    dispatch(setDropdownOption(value));
    setSelectedDepartments(value)
  };
  const handlework = (value) => {
    dispatch(setDropdownOptionwork(value));
  };
  const handleDesig = (value) => {
    console.log("value", value)
    dispatch(setDropdownOptionDesig(value));
    setSelectedDesignations(value);
  };
  const handlReportk = (value) => {
    dispatch(setDropdownOptionReport(value));
  };
  const handleDateChange = (date, dateString) => {
    dispatch(setSelectedDate(dateString));
  };
  const dispatch = useDispatch();
  const professionalDetails = useSelector(selectProfessionalDetails);
  console.log(professionalDetails)
  const [form] = useForm();

  const handleChange = (name, value) => {
    // console.log(name,value)
    dispatch(updateProfessionalDetails({ [name]: value }));
  };

  const handleSubmit = () => {

    console.log(professionalDetails);
    putting(professionalDetails);
  };
  const router = useRouter();
  const prof1 = ["option1", "option2", "option3"];
  const prof = ["option1", "option2", "option3"];

  const accessToken = getAccessTokenFromCookie();

  const putting = async (values) => {
    let data = {
      // designation_id: values.selectedDesignation,
      designation_id: values.selectedDesignation,
      pf: values.pfNumber,
      uan: values.uanNumber,
      department_id: 5,
      // reporting_manager_id: values.selectedReportingMngr,
      reporting_manager_id: "9c9291d7-b202-429d-b5b7-b04a9efc1ab9",
      work_location: values.selectedworkLocation,
      start_date: values.selectedDate,
      emp_id: id,
    };
    console.log(data)

    try {
      console.log("stored data", JSON.stringify(data));
      const response = await axios.put("/employee/professionalInfo", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("success", response);
      setTab(tab + 1)
    } catch (error) {
      console.log("error", error);
    }
  };

  const selectedDepartment = useSelector((state) => state.selectedDepartment);
  const selectedDesignation = useSelector((state) => state.selectedDesignation);
  const selectedReportingMngr = useSelector(
    (state) => state.selectedReportingMngr
  );
  const selectedworkLocation = useSelector(
    (state) => state.selectedworkLocation
  );


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://i3mdnxvgrf.execute-api.us-east-1.amazonaws.com/dev/designation",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setDesignationOptions(response.data); // Set fetched data to state

      } catch (error) {
        console.error("Error fetching designation data:", error);
      }
    };

    fetchData(); // Call fetchData function
  }, [accessToken]);

  useEffect(() => {
    const fetchData = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://i3mdnxvgrf.execute-api.us-east-1.amazonaws.com/dev/department',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      };

      try {
        const response = await axios.request(config);
        setDepartmentData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, [accessToken]);

  const [projectManager, setprojectManager] = useState([])

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axiosW.get("/get_resource_by_role", {
          params: {
            designation: "Project Manager",
          },
        });
        console.log(response.data);
        const data = response.data;
        setprojectManager(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(projectManager)

  return (
    <div>
      <Form
        requiredMark={false}
        style={{
          padding: "50px",
          width: "auto",
          text: "start",
          backgroundColor: "white",
        }}
        initialValues={professionalDetails}
        labelAlign="left"
        labelCol={{
          span: 5,
        }}
        labelWrap
        className="m-20 w-[90%] rounded-none"
        onFinish={handleSubmit}
      >
        <Col span="3xl">
          <Form.Item
            className="rounded-none "
            label="Designation"
            name="designation"
            labelWrap
            rules={[
              { required: true, message: "Please select a designation." },
            ]}
          >
            <Select
              showSearch
              className="rounded-none"
              onChange={handleDesig}
              value={setSelectedDesignations}
              placeholder="Select Designation"
              optionFilterProp="children"
            // filterOption={(input, option) =>
            //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
            >
              {designationOptions.map(
                (
                  option // Map over fetched options
                ) => (
                  <Select.Option
                    key={option.id} // Assuming each option has a unique id
                    value={option.id} // Use the designation property as the option value
                    className="rounded-none"

                  >
                    {option.designation} {/* Render the designation property */}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>
        </Col>

        <Row gutter={30}>
          <Col span={12}>
            <Form.Item
              label="PF No (Optional)"
              name="pfNumber"
              rules={[
                { message: "Enter Your PF Number" },
                {
                  pattern: numberRegex,
                  message: "Please enter at least 5 digits for PF number.",
                },
              ]}
              labelCol={{ span: 10 }}
            >
              <Input
                placeholder="Enter your PF number"
                type="text"
                value={professionalDetails.pfNumber}
                style={{ width: "100%", marginLeft: "3%" }}
                onChange={(e) => handleChange("pfNumber", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="UAN No (Optional)"
              name="uanNumber"
              // className="ml-20"
              style={{ marginLeft: "30px" }}
              rules={[
                { message: "Enter Your UAN Number" },
                {
                  pattern: numberRegex,
                  message: "Please enter at least 5 digits for UAN number.",
                },
              ]}
              labelCol={{ span: 8 }}
            >
              <Input
                placeholder="Enter Your UAN Number"
                type="text"
                value={professionalDetails.uanNumber}
                onChange={(e) => handleChange("uanNumber", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Col span="3xl">
          <Form.Item
            label="Employee ID (Optional)"
            name="employeeId"
            rules={[
              { message: "Enter Your Employee ID" },
              {
                // pattern: numberRegex,
                message: "Please enter at least 5 digits for UAN number.",
              },
            ]}
          >
            <Input
              placeholder="Enter Your Employee ID"
              type="text"
              value={professionalDetails.employeeId}
              onChange={(e) => handleChange("employeeId", e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span="3xl">
          <Form.Item
            className="rounded-none"
            label="Department"
            name="department"
            rules={[{ required: true, message: "Please select a department." }]}
          >
            <Select
              showSearch
              style={{ borderRadius: 0 }}
              className="rounded-none"
              onChange={handleSelectChange}
              value={setSelectedDepartments}
              placeholder="Select Department "
              optionFilterProp="children"
            // filterOption={(input, option) =>
            //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
            >
              {prof.map((option) => (
                <Select.Option
                  key={option.id} // Assuming each option has a unique id
                  value={option.id} // Use the designation property as the option value
                  className="rounded-none"
                >
                  {option.department}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span="3xl">
          {" "}
          <Form.Item
            label=" Direct Reporting Manager"
            name="reportingManager"
            rules={[
              { required: true, message: "Please select a reporting manager." },
            ]}
          >
            <Select
              showSearch
              style={{ borderRadius: 0 }}
              className="rounded-none"
              onChange={handlReportk}
              value={selectedReportingMngr}
              placeholder="Select Reporting Manager "
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {projectManager.map((option) => (
                <Select.Option key={option} value={option.emp_id}>
                  {option.resource_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span="3xl">
          <Form.Item
            label="Work Location"
            name="WorkLocation"
            rules={[
              { message: "Enter Your Work Location" },
              {
                // pattern: numberRegex,
                message: "Please enter Work Location.",
              },
            ]}
          >
            <Input
              placeholder="Enter Your Work Location"
              type="text"
              value={professionalDetails.WorkLocation}
              onChange={(e) => handlework("WorkLocation", e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span="3xl">
          <Form.Item
            label="Started Date"
            name="Date"
            rules={[{ message: "Please select a  Date" }]}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <DatePicker
                style={{ width: "100%" }}
                onChange={handleDateChange}
                value={selectedDate}
              />
            </Space>
          </Form.Item>
        </Col>

        {/* <Form.Item
        style={{display:"flex" , justifyContent:"center"}}>
          <Col span={24}>
          <Button
            type="primary"
            htmlType="submit"
            className=" bg-[#1890ff]"
            style={{borderRadius:"0" , height:"40px", width:"500%",marginLeft:"20%"}}
          >
            Next
          </Button>
          </Col>
         
        </Form.Item> */}
        <Row gutter={16}>
          {/* Other columns */}
          <Col span={18}>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#1890ff]"
              style={{
                borderRadius: "0",
                height: "40px",
                width: "80%",
                display: "flex",
                justifyContent: "center",
                marginLeft: "40%",
              }}
              onClick={() => {
                dispatch(updateProfessionalDetails(professionalDetails));
                putting(professionalDetails)
              }}
            >
              Next
            </Button>
          </Col>
        </Row>

        {/* <Form.Item>
          <Button
            type="primary"
            htmlType="button"
            className="rounded-md w-20 h-8 bg-blue-600"
          >
            <Link href="/ProfReview">Review</Link>
          </Button>
        </Form.Item> */}
      </Form>
    </div>
  );
};

export default ProfessionalInfo;