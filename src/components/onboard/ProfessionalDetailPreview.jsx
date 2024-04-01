import Image from "next/image";
import { Button, Progress } from "antd";
import { IoChevronBackOutline } from "react-icons/io5";
import Onboard from "@/../public/assets/onboarding/OnbordingImg.svg";
import Logout from "@/../public/assets/onboarding/Logout.svg";
import Company from "@/../public/assets/onboarding/company.svg";
import Profile from "@/../public/assets/onboarding/profile.svg";
import Link from "next/link";
import {useDispatch,useSelector} from "react-redux"
import { createUser } from "@/redux/slices/Onboardingpersdetails";
import { createCompany } from "@/redux/slices/Onboardingpersdetails";
import { removeAccessToken } from "@/utils/getAccessToken";


const PreviewCompany = ({ setInStep, setStep, step, inStep }) => {
  
  const personalData = useSelector((state) => state.Onboardingpersdetails.personalData);
  const companyData = useSelector((state) => state.Onboardingpersdetails.companyData);
  
  const dispatch = useDispatch()

  // const handleSubmit = async () => {
    //   // e.preventDefault();
    //   // console.log("company...", companyData);
    //   // const combinedData = {...companyData, };  
    //     dispatch(createCompany(companyData))
    //     dispatch(createUser(personalData))
    //      console.log("dispatch",personalData);
    
    // };
    
    
    const handleSubmit = async () => {
      const orgId = "482d8374-fca3-43ff-a638-02c8a425c492"; // Replace with your actual orgId value
      
      // Combine orgId with companyData
      const combinedData = { orgId, ...companyData };
      
      // Dispatch actions with the modified data
      dispatch(createUser(personalData));
      dispatch(createCompany(combinedData));
      
      // console.log(combinedData);
    };
    
    return (
      <div className="flex justify-center items-center gap-16 w-[100%] h-[100vh] p-10 ">
      <div className="md:w-[70vw] h-[88vh] rounded-2xl  p-4 bg-[#E6F7FF] flex justify-center items-center">
        <Image width={100} height={100} src={Onboard} className="w-[60%] " alt="onboard"/>
      </div>
      <div className="flex flex-col gap-1 items-center  w-[50vw] relative leading-8">
        <Link href="/login" onClick={()=>{
      removeAccessToken();

        }}>
          <div
            className="flex  items-center px-1 gap-1 border border-[#1890FF] text-black group btn hover:bg-white transition w-[100px] absolute rounded-sm
         right-2 -top-5 cursor-pointer"
          >
            <Image
              width={15}
              height={15}
              src={Logout}
              className="group-hover:bg-white"
              alt="logout"
            />
            <button className="">Logout</button>
          </div>
        </Link>
        <div className="w-full ">
          <div className="w-full  flex flex-col">
            <span
              className="flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
              onClick={() => {
                setStep(step - 1);
              }}
            >
              <IoChevronBackOutline />
              <p>Back</p>
            </span>
            <p className="text-sm text-gray-400">Onboarding</p>
            <Progress percent={86} showInfo={false} />
            <span className="text-[#4F7396] text-sm mb-2">step 3 of 3</span>
          </div>

          <h2 className="text-xl font-bold mb-2">Preview</h2>
          <div className="flex gap-8 ">
            <div
              className=" border-b-2 border-black font-medium cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setInStep(inStep - 1);
              }}
            >
              Personal Details
            </div>
            <div className="border-b-2  cursor-pointer border-[#1890FF] text-[#1890FF] font-medium hover:scale-105 transition-all ">
              Company Details
            </div>
          </div>
        </div>
        <div className="self-start rounded-md w-full p-2 h-full flex flex-col gap-2">
          <div className="w-[7vw] h-[8vh] bg-white rounded-md">
            <Image
              src={Company}
              width={100}
              height={100}
              className="w-[80%] h-[80%] border "
              alt="company"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex  justify-start gap-40 border-b  border-gray-200 w-full">
              <span className="  flex flex-col  ">
                <span className="text-gray-400 text-xs">
                  Legal Company Name
                </span>
                <span className="text-xs">{companyData.name}</span>
              </span>
              <span className="flex flex-col  pl-4">
                <span className="text-gray-400 text-xs">
                  Company Email Address
                </span>
                <span className="text-xs">{companyData.email}</span>
              </span>
            </div>
            <div className="flex flex-col   border-b border-gray-200 w-full">
              <span className="text-gray-400 text-xs">Phone Number</span>
              <span className="text-xs">91+{companyData.number}</span>
            </div>
            <div className="flex flex-col   border-b border-gray-200 w-full">
              <span className="text-gray-400 text-xs">Address Line 1</span>
              <span className="text-xs">{companyData.address_line_1}</span>
            </div>
            <div className="flex flex-col   border-b border-gray-200 w-full">
              <span className="text-gray-400 text-xs"> Address Line 2</span>
              <span className="text-xs">{companyData.address_line_2}</span>
            </div>
            <div className="flex  justify-start gap-48 border-b  border-gray-200 w-full">
              <span className="  flex flex-col  ">
                <span className="text-gray-400 text-xs">Country</span>
                <span className="text-xs">{companyData.country}</span>
              </span>
              <span className="flex flex-col  pl-2">
                <span className="text-gray-400 text-xs">State</span>
                <span className="text-xs">{companyData.state}</span>
              </span>
            </div>
            <div className="flex  justify-start gap-40  border-b border-gray-200 w-full">
              <span className="  flex flex-col  ">
                <span className="text-gray-400 text-xs">City</span>
                <span className="text-xs">{companyData.city}</span>
              </span>
              <span className="flex flex-col  pl-4">
                <span className="text-gray-400 text-xs">Zipcode</span>
                <span className="text-xs">{companyData.zipcode}</span>
              </span>
            </div>
          </div>
        </div>
        <button
          className="w-[70%] lg:mt-6 h-8 border bg-[#1890FF] hover:text-[#1890FF] hover:bg-white hover:border-[#1890FF] transition-all text-white items-end"
          onClick={() => {
            handleSubmit(),
            setStep(step + 1);
          }}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default PreviewCompany;