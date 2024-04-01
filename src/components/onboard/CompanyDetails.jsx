"use client";
import React from "react";
import Image from "next/image";
import { IoChevronBackOutline } from "react-icons/io5";
import ImageUp from "@/../public/assets/onboarding/OnbordingImg.svg";
import Logout from "@/../public/assets/onboarding/Logout.svg";
import { removeAccessToken } from "@/utils/getAccessToken";
import UploadImg from "./UploadImg";
import { setCompanyData } from '@/redux/slices/Onboardingpersdetails';
// import { createUser } from "@/redux/slices/personalDetails";
import { useState  } from "react"
import {useDispatch,useSelector} from "react-redux"
import { notification } from 'antd';

// import {personalDetails} from '@/redux/slices/Onboardingpersdetails'


import {
  Form,
  Progress
} from "antd";
import Link from "next/link";
const CompanyDetails = ({ step, setStep }) => {

// const personalData = useSelector((state) => state.personalDetails.personalData);
const companyData = useSelector((state) => state.Onboardingpersdetails.companyData);

// console.log(personalData);
  const [company , setCompany] = useState(companyData || {})
  const dispatch = useDispatch()

  const getCompanyData = (e) =>{
    setCompany({...company, [e.target.name]: e.target.value})
    // console.log(company);
  }

  const openNotification = () => {
    notification.open({
      message: 'Please fill in all the required fields',
    });
  };
  
 const handleCompanySubmit = async () => {
  // e.preventDefault();

  if (!company.name || !company.email || !company.number || !company.address_line_1  || !company.address_line_2 || !company.country || !company.state || !company.city || !company.zipcode) {
    console.log("Please fill in all the required fields");
    openNotification()
    return;
  }
  console.log("company...", company);
  
     dispatch(setCompanyData(company));

     setStep(step+1)

    //  const combinedData = {...company, ...personalData };

    //  dispatch(createUser(combinedData))

};


  return (
    <div className="flex justify-center items-center gap-16 w-[100%] h-[100vh] p-10">
      <div className="w-[70vw] h-[88vh] rounded-2xl bg-[#E6F7FF] flex justify-center items-center">
        <Image width={100} height={100} src={ImageUp} className="w-[60%]" alt="image above" />
      </div>

      <div className="w-[50vw] h-[96vh] -mt-7 flex flex-col relative">
        <Link href="/login" onClick={
          ()=>{
            removeAccessToken();

          }
        }>
          <div className="flex  items-center p-1 gap-1 border border-[#1890FF] hover:bg-blue-100 transition-all btn btn-primary w-[100px] absolute right-2 top-8 cursor-pointer">
            <Image width={15} height={15} src={Logout}  alt="logout"/>
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
            value={company.name || ''}
          />
          <input
            name="email"
            onChange={getCompanyData}
            placeholder="Company Email Address"
            className="p-2 mb-2 border border-gray-300 outline-[#1890FF] w-[70%] "
            // value={companyData.email !== undefined ? companyData.email : "" || companyData.email }
            value={company.email || ''}
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
                // value={companyData.number !== undefined ? companyData.number : "" || companyData.number }
                value={company.number || ''}
              />
            </Form>
          </div>
          <input
            name="address_line_1"
            onChange={getCompanyData}
            placeholder="Address Line 1"
            className="p-1 mb-2 border border-gray-300 outline-[#1890FF] w-[70%] "
            // value={companyData.address_line_1 !== undefined ? companyData.address_line_1 : "" || companyData.address_line_1 }
            value={company.address_line_1 || ''}
          />
          <input
            name="address_line_2"
            onChange={getCompanyData}
            placeholder="Address Line 2"
            className="p-1 mb-2 border border-gray-300 outline-[#1890FF] w-[70%] "
            // value={companyData.address_line_2 !== undefined ? companyData.address_line_2 : "" || companyData.address_line_2 }
            value={company.address_line_2 || ''}
          />

          <div>
            <div className="w-full mb-1">
              <select
                name="country"
                onChange={getCompanyData}
                placeholder="Country"
                className="w-[33.5%] mr-4 p-1 border border-gray-300 outline-[#1890FF]"
                // value={companyData.country !== undefined ? companyData.country : "" || companyData.country 
                value={company.country || ''}
              >
                <option value="">select Country</option>
                <option value="India">India</option>
                <option value="Austrila">Austrila</option>
                <option value="Usa">Usa</option>
              </select>
              <select
                name="state"
                onChange={getCompanyData}
                placeholder="State"
                className="w-[33.5%] p-1 border border-gray-300 outline-[#1890FF]"
                // value={companyData.state !== undefined ? companyData.state : "" || companyData.state }
                value={company.state || ''}
              >
                <option value="">select State</option>
                <option value="Telangana">Telangana</option>
                <option value="Kerala">Kerala</option>
                <option value="Goa">Goa</option>
              </select>
            </div>
            <div>
              <select
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
              </select>
              <input
                name="zipcode"
                onChange={getCompanyData}
                type="number"
                placeholder="Zip Code"
                className="w-[33.5%] p-1 border border-gray-300 outline-[#1890FF]"
                // value={companyData.zipcode !== undefined ? companyData.zipcode : "" || companyData.zipcode }
                value={company.zipcode || ''}
              />
            </div>
          </div>

          <div className="flex items-center h-20">
            <div className="">
              <UploadImg />
            </div>
            <div>
              <h2 className="border border-gray-300 p-1 pl-3">
                Upload Profile
              </h2>
              <p className="text-sm font-light">upload your profile picture</p>
            </div>
          </div>

          <button className="w-[70%] h-8 border bg-[#1890FF] text-white hover:text-[#1890FF] hover:border-[#1890FF] hover:bg-white" onClick={()=>{console.log("world"),handleCompanySubmit()}}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;  