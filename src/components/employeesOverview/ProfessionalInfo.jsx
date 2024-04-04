import React, { useEffect, useState } from "react";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import { useSelector } from "react-redux";

const ProfessionalInfo = () => {
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
          response.data.professional_information
          );
          // storing  data intto usestate
          
          setFetchData(response.data.professional_information);
          // console.log("data",employees)
        } catch (error) {
          console.log("error fetching employee", error);
        }
      };
      
      fetchData();
  }, [accessToken, idTabs]);

  // getting data from redux using useselector

  const reduxData = useSelector((state) => state.Details?.professional_information);
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

  // const professionalDetails = useSelector(
  //   (state) => state.professionalDetails
  // );

  return (
    <div className="grid grid-cols-2 grid-rows-3">
      {/* first row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">Designation</h2>
        <p className="font-semibold text-base">
          {data.designation}
        </p>
      </span>
      <span>
        <h2 className="text-gray-400">Department</h2>
        <p className="font-semibold text-base">
          {data.department}
        </p>
      </span>

      {/* second row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">PF Number</h2>
        <p className="font-semibold text-base">
          {data.pfNumber}
        </p>
      </span>
      <span>
        <h2 className="text-gray-400">UAN Number</h2>
        <p className="font-semibold text-base">
          {data.uanNumber}
        </p>
      </span>

      {/* third row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">Direct Reporting Manager</h2>
        <p className="font-semibold text-base">
          {data.reportingManager}
        </p>
      </span>
      <span>
        <h2 className="text-gray-400">Work location</h2>
        <p className="font-semibold text-base">
          {data.workLocation}
        </p>
      </span>
    </div>
  );
};

export default ProfessionalInfo;