import React, { useState, useEffect } from "react";
import axios from "@/api/axios";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import { useSelector } from "react-redux";

const PersonalInfo = () => {
  // const [empId,setEmpId] = useState('')
  const accessToken = getAccessTokenFromCookie();
  const [fetchedData, setFetchData] = useState({});
  const id = useSelector((state) => state.Details.id) 
  const idTabs = useSelector((state) => state.Details.tab) 


  // const [data, setData] = useState({})
  // setData(useSelector(state => state.DetailSlice.personalDetails))
  // const data =  useSelector(state => state.DetailSlice?.personalDetails)
  // console.log("data of personal details from redux",data)

  useEffect(() => {
    console.log("in useeffect");
    const fetchData = async () => {
      // getting employee id from local storage
      
      // setEmpId(id)
      try {
        console.log("employee id ", id);
        // fetching data by employee id in case of data not found in redux
        const config = {
          headers: {
            'Accept': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get(`/employee/${id}`, config);
        console.log(
          "response of employee id",
          response.data.personal_information
          );
          // storing  data intto usestate
          
          setFetchData(response.data.personal_information);
          // console.log("data",employees)
        } catch (error) {
          console.log("error fetching employee", error);
        }
      };
      
      fetchData();
  }, [accessToken, idTabs]);

  // getting data from redux using useselector

  const reduxData = useSelector((state) => state.Details?.personalDetails);
  const objLength = Object.keys(reduxData).length;
  console.log(
    "redux data for personal info",
    JSON.stringify(reduxData),
    "Length",
    objLength
  );
  console.log("fetched data by id for personal info", fetchedData);
  // setData(reduxData)

  // condittionally trendering the data eitther from redux or from fetched  data by id

  const data = reduxData.length > 0 ? reduxData : fetchedData;
  console.log("data of personal details", data);

  // {
  //   "id": "7a015bd2-58d0-4a48-8849-e2dadb70c8fb",
  //   "email": "johdddr@example.com",
  //   "work_email": "joh@woddfrk.example.com",
  //   "first_name": "namename",
  //   "last_name": "lastname",
  //   "gender": "Male",
  //   "dob": "1990-01-01",
  //   "number": "1890",
  //   "emergency_number": "9876210",
  //   "highest_qualification": "Bachelor's Degree",
  //   "description": "",
  //   "created_at": "2024-02-22T05:57:18.141Z",
  //   "updated_at": "2024-02-22T05:57:18.141Z",
  //   "created_by": "7a015bd2-58d0-4a48-8849-e2dadb70c8fb",
  //   "updated_by": "98a0321c-a2ea-4d22-b7cf-6a459d6a8bc0",
  //   "image": "https://example.com/image1.jpg",
  //   "email_verified": "",
  //   "address_line_1": "123 Main St",
  //   "address_line_2": "Apt 101",
  //   "landmark": "Near the park",
  //   "country": "USA",
  //   "state": "California",
  //   "city": "San Francisco",
  //   "zipcode": "1233445",
  //   "pf": "12345",
  //   "uan": "54321",
  //   "department_id": 1,
  //   "emp_type_id": 1,
  //   "work_location": "Hyderabad",
  //   "start_date": "2024-02-21T18:30:00.000Z",
  //   "emp_type_name": "Permanent"
  // }

  // condition Object.keys(fetchData).length > 0
  return (
    <div className="grid grid-cols-2 grid-rows-9 ">
      <span className="mb-4">
        <h2 className="text-gray-400">First Name</h2>
        <p className="font-semibold text-base">{data?.first_name}</p>
      </span>
      <span>
        <h2 className="text-gray-400">Last Name</h2>
        <p className="font-semibold text-base">{data?.last_name}</p>
      </span>

      {/* second row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">Date of Birth </h2>
        <p className="font-semibold text-base">{data?.dob}</p>
      </span>
      <span>
        <h2 className="text-gray-400">Gender</h2>
        <p className="font-semibold text-base">{data?.gender}</p>
      </span>

      {/* third row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">Contact No.</h2>
        <p className="font-semibold text-base">{data?.number}</p>
      </span>
      <span>
        <h2 className="text-gray-400">Emergency Contact No.</h2>
        <p className="font-semibold text-base">{data?.emergency_number}</p>
      </span>

      {/* fourth row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">Work Email</h2>
        <p className="font-semibold text-base">{data?.work_email}</p>
      </span>
      <span>
        <h2 className="text-gray-400">Personal Email</h2>
        <p className="font-semibold text-base">{data?.email}</p>
      </span>

      {/* fifth row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">Employee ID</h2>
        <p className="font-semibold text-base">{data?.id}</p>
      </span>
      <span>
        <h2 className="text-gray-400">Qualification</h2>
        <p className="font-semibold text-base">{data?.highest_qualification}</p>
      </span>

      {/* sixth row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">Address Line 1</h2>
        <p className="font-semibold text-base">{data?.address_line_1}</p>
      </span>
      <span>
        <h2 className="text-gray-400">Address Line 2</h2>
        <p className="font-semibold text-base">{data?.address_line_2}</p>
      </span>

      {/* seventh row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">Landmark</h2>
        <p className="font-semibold text-base">{data?.landmark}</p>
      </span>
      <span>
        <h2 className="text-gray-400">City </h2>
        <p className="font-semibold text-base">{data?.city}</p>
      </span>

      {/* eighth row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">State</h2>
        <p className="font-semibold text-base">{data?.state}</p>
      </span>
      <span>
        <h2 className="text-gray-400">Counrty</h2>
        <p className="font-semibold text-base">{data?.country}</p>
      </span>

      {/* ninth row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">Zip code</h2>
        <p className="font-semibold text-base">{data?.zipcode}</p>
      </span>
    </div>
  );
};

export default PersonalInfo;
