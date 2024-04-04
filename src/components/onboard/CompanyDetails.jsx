"use client";
import React from "react";
import Image from "next/image";
import { IoChevronBackOutline } from "react-icons/io5";
import ImageUp from "@/../public/assets/onboarding/OnbordingImg.svg";
import Logout from "@/../public/assets/onboarding/Logout.svg";
import { setCompanyData } from "@/redux/slices/Onboardingpersdetails";
// import { createUser } from "@/redux/slices/personalDetails";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification, Select,Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import axios from "axios";

// import StateComponent from "./countrys";
import StateComponent from "../location/States";
import CityComponent from "../location/city";
import CountryComponent from "../location/Countrys";

// import {personalDetails} from '@/redux/slices/Onboardingpersdetails'

import { Form, Progress } from "antd";
import Link from "next/link";
const CompanyDetails = ({ step, setStep  }) => {
  // const Countrydata = Country.getAllCountries().map((country) => ({
  //   value: country.name,
  //   displayValue: `${country.name} - ${country.isoCode}`,
  // }));

  const companyData = useSelector(
    (state) => state.Onboardingpersdetails.companyData
  );
  // const [Country, setCountry] = useState([]);
  const [company, setCompany] = useState(companyData || {});
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setselectedState] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);



  // useEffect(() => {
  //   if (company.countryCode) {
  //     const states = State.getStatesOfCountry(company.country).map(state => ({
  //       value: state.name,
  //       displayValue: `${state.name} - ${state.isoCode}`
  //     }));
  //     console.log("States for selected country:", states);
  //     setStartData(states);
  //     // Also reset the selected state when the country changes
  //     setCompany(prevState => ({ ...prevState, state: undefined }));
  //   }
  // }, [company.country]);

  // const personalData = useSelector((state) => state.personalDetails.personalData);

  // console.log(personalData);
  const dispatch = useDispatch();

  // const getCompanyData = (e) => {
  //   setCompany({ ...company, [e.target.name]: e.target.value });
  //   // console.log(company);
  // };

  const getCompanyData = (e) => {
    const { name, value } = e.target;
    // Trim the value to 10 digits if it's the phone number field
    if (name === "number") {
      const trimmedValue = value.slice(0, 10);
      setCompany({ ...company, [name]: trimmedValue });
    } else {
      setCompany({ ...company, [name]: value });
    }
  };

  const openNotification = () => {
    notification.open({
      message: "Please fill in all the required fields",
    });
  };

  const handleCompanySubmit = async () => {
    // e.preventDefault();

    if (
      !company.name ||
      !company.email ||
      !company.number ||
      company.number.length !== 10 ||
      !company.address_line_1 ||
      !company.address_line_2 ||
      !company.country ||
      !company.state ||
      !company.city ||
      !company.zipcode ||
      company.zipcode.length !==6
    ) {
      console.log("Please fill in all the required fields");
      openNotification();
      return;
    }
    console.log("company...", company);

    dispatch(setCompanyData(company));

    setStep(step + 1);

    //  const combinedData = {...company, ...personalData };

    //  dispatch(createUser(combinedData))
  };

  // useEffect(() => {
    
  // }, [selectedState]);
  
  // console.log("log of the state compontnt",selectedState);

  ///////////////////////////////////////////////////////

  
const uploadButton = (
  <button
    style={{
      border: 0,
      background: 'none',
    }}
    type="button"
  >
    {loading ? <LoadingOutlined /> : <PlusOutlined />}
    <div
      style={{
        marginTop: 6,
      }}
    >
      Upload
    </div>
  </button>
);


const [req, setReq] = useState(
  {fileName:'' , data: '' }
);
const accessToken = getAccessTokenFromCookie();

const [fileuploaded, setfileuploaded] = useState(false)

const handleFileChange = (info) => {
  const file = info.file.originFileObj; // Access the selected file object
  console.log("THis is file",file)
  console.log("This is info file",info.file)
console.log(info.file, info.fileList, 'these are lists of files ');
console.log(info.fileList,'THis is inof multiple ')

  if (file){
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setReq({ fileName: file.name, data: base64 });
      if (!fileuploaded) {
        setfileuploaded(true); // Set to true only if it wasn't true already
      }
    };
    reader.readAsDataURL(file);
  }
};

console.log(req)



  const [Attachments, setAttachments] = useState([])


  const uploadFile = async () => {
    if (!req.data) return; // Add a check to ensure there's something to upload
  
    try {
      const response = await axios.post(
        'https://i3mdnxvgrf.execute-api.us-east-1.amazonaws.com/dev/docUpload',
        req,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      console.log(response.data);
      // alert('Image uploaded successfully!');
      setAttachments(response.data.link);
      setImageUrl(response.data.link);
      setfileuploaded(false); // Reset to false after successful upload
      setCompany({ ...company, logo: response.data.link });
    } catch (error) {
      console.error(error);
      alert('Error uploading image. Please try again.');
    }
  };


if(fileuploaded){
  // useEffect(()=>{
    uploadFile(),
    setfileuploaded(false)
  // },[fileuploaded])
    }
console.log(Attachments)
console.log("image state",company );



  return (
    <div className="flex justify-center items-center gap-16 w-[100%] h-[100vh] p-10">
      <div className="w-[70vw] h-[88vh] rounded-2xl bg-[#E6F7FF] flex justify-center items-center">
        <Image
          width={100}
          height={100}
          src={ImageUp}
          className="w-[60%]"
          alt="image above"
        />
      </div>

      <div className="w-[50vw] h-[96vh] -mt-7 flex flex-col relative">
        <Link href="/login">
          <div className="flex  items-center p-1 gap-1 border border-[#1890FF] hover:bg-blue-100 transition-all btn btn-primary w-[100px] absolute right-2 top-8 cursor-pointer">
            <Image width={15} height={15} src={Logout} alt="logout" />
            <button className="">Logout</button>
          </div>
        </Link>
        <div className="pt-14 flex flex-col">
          <div
            className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setStep(step - 1);
            }}
          >
            <IoChevronBackOutline />
            <p>Back</p>
          </div>
          <p className="font-sm">Onboarding</p>
          <Progress percent={62} showInfo={false} />

          <span className="text-[#4F7396] text-sm mb-3">step 2 of 3</span>

          <h2 className="text-xl mb-2 font-bold"> Add company details</h2>

          <p className="text-sm mb-2">
            Please provide your personal details, they will be used to complete
            your profile on Workflow App
          </p>
          <input
            name="name"
            onChange={getCompanyData}
            placeholder="Legal Company Name"
            className="p-2 mb-2 border border-gray-300 outline-[#1890FF] w-[70%] "
            // value={companyData.name !== undefined ? companyData.name : "" || companyData.name }
            value={company.name || ""}
          />
          <input
            name="email"
            onChange={getCompanyData}
            placeholder="Company Email Address"
            className="p-2 mb-2 border border-gray-300 outline-[#1890FF] w-[70%] "
            // value={companyData.email !== undefined ? companyData.email : "" || companyData.email }
            value={company.email || ""}
          />

          <div className="mb-2">
            <Form className="flex border w-[70%]">
              <select className="w-20 h-9 ml-3">
                <option>+91</option>
                <option>+86</option>
              </select>
              <input
                name="number"
                onChange={getCompanyData}
                type="number"
                placeholder="Phone Number"
                className="w-full h-9 p-2 border-gray-300 outline-[#1890FF]"
                maxLength="10"
                // value={companyData.number !== undefined ? companyData.number : "" || companyData.number }
                value={company.number || ""}
              />
            </Form>
          </div>
          <input
            name="address_line_1"
            onChange={getCompanyData}
            placeholder="Address Line 1"
            className="p-1 mb-2 border border-gray-300 outline-[#1890FF] w-[70%] "
            // value={companyData.address_line_1 !== undefined ? companyData.address_line_1 : "" || companyData.address_line_1 }
            value={company.address_line_1 || ""}
          />
          <input
            name="address_line_2"
            onChange={getCompanyData}
            placeholder="Address Line 2"
            className="p-1 mb-2 border border-gray-300 outline-[#1890FF] w-[70%] "
            // value={companyData.address_line_2 !== undefined ? companyData.address_line_2 : "" || companyData.address_line_2 }
            value={company.address_line_2 || ""}
          />

          <div>
            <div className="w-full mb-1">
              {/* <Select
                showSearch
                // selected={selectedCountry}
                placeholder="Select a country"
                optionFilterProp="children"
                onChange={(value) => {
                  setCompany({ ...company, country: value })
                  setSelectedCountry(value)
                  // console.log("value in the country", value);
                  }} 
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                value={company.country || undefined} 
                className="w-[33.5%] mr-4 p-1 border border-gray-300 outline-[#1890FF]"
              >
                {Countrydata.map((country) => (
                  <Select.Option  key={country.value} value={country.value} >
                    {country.displayValue}
                  </Select.Option>
                ))}
              </Select> */}
              <CountryComponent
                value={company.country || undefined}
                onChange={(value) => {
                  setCompany({ ...company, country: value });
                  setSelectedCountry(value);
                }}
                // data={Countrydata}
              />
              {/* <Select
                name="state"
                onChange={getCompanyData}
                placeholder="Select a State"
                className="w-[33.5%] p-1 border border-gray-300 outline-[#1890FF]"
                // value={companyData.state !== undefined ? companyData.state : "" || companyData.state }
                value={company.state || ''}
              >
                {startdata.map((state) => (
                  <Select.Option key={state.value} value={state.value}>
                    {state.displayValue}
                  </Select.Option>
                ))}
              </Select> */}
              {/* <Select
                showSearch
                placeholder="Select a State"
                optionFilterProp="children"
                onChange={(value) => setCompany({ ...company, state: value })}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                value={company.state || undefined}
                className="w-[33.5%] p-1 border border-gray-300 outline-[#1890FF]"
              >
                {startdata.map((state) => (
                  <Select.Option key={state.value} value={state.value}>
                    {state.displayValue}
                  </Select.Option>
                ))}
              </Select> */}
              <StateComponent countryCode={selectedCountry}
              //  changeState={setselectedState}
                value={company.state || undefined}
                onChange={(value) => {
                setCompany({ ...company, state: value });
                setselectedState(value)
              }}/>
            </div>
            <div>
              {/* <select
                name="city"
                onChange={getCompanyData}
                placeholder="City"
                className="w-[33.5%] mr-4 p-1 border border-gray-300 outline-[#1890FF]"
                // value={companyData.city !== undefined ? companyData.city : "" || companyData.city }
                value={company.city || ''}
              >
                <option value="">select city</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Varangel">Varangel</option>
                <option value="Mahaboob Nager">Mahaboob Nager</option>
              </select> */}
                <CityComponent
                  countryCode={selectedCountry}
                  stateCode={selectedState} // Pass selectedState to CityComponent
                  onChange={ (value) =>{
                setCompany({ ...company, city: value })
                  }
                  }
                  name="city"
                  placeholder="City"
                  className="w-[33.5%] mr-4 p-1 border border-gray-300 outline-[#1890FF]"
                  value={
                    companyData.city !== undefined
                      ? companyData.city
                      : "" || companyData.city
                  }
                />

              <input
                name="zipcode"
                onChange={getCompanyData}
                type="number"
                placeholder="Zip Code"
                className="w-[33.5%] p-1 border border-gray-300 outline-[#1890FF]"
                // value={companyData.zipcode !== undefined ? companyData.zipcode : "" || companyData.zipcode }
                value={company.zipcode || ""}
              />
            </div>
          </div>

          <div className="flex items-center h-20">
            <div className="">
              {/* <UploadImg /> */}

              <div className='scale-[60%]'>
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader w-10"
                  showUploadList={false}
                  // beforeUpload={beforeUpload}
                  onChange={handleFileChange}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="avatar"
                      width={100}
                      height={100}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>

              
            </div>
            <div>
              <h2 className="border border-gray-300 p-1 pl-3">
                Upload Profile
              </h2>
              <p className="text-sm font-light">upload your profile picture</p>
            </div>
          </div>

          <button
            className="w-[70%] h-8 border bg-[#1890FF] text-white hover:text-[#1890FF] hover:border-[#1890FF] hover:bg-white"
            onClick={() => {
              console.log("world"), handleCompanySubmit();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
