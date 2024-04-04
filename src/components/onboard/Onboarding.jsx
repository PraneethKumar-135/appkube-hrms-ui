
import Image from "next/image";
import UploadImg from "./UploadImg";
import { useRouter } from "next/navigation";
import OnBoardingImg from '@/../public/assets/onboarding/OnbordingImg.svg'
import Logout from '@/../public/assets/onboarding/Logout.svg'
import { removeAccessToken } from "@/utils/getAccessToken";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import axios from 'axios'
import {
  Flex,
  Form,
  Progress,
  Segmented,
  Select,
  notification,
  message,
  Upload
} from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


// import { UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { createUser } from "@/redux/slices/personalDetails";
import { setPersonalData } from '@/redux/slices/Onboardingpersdetails';


// // for the image upload
// const getBase64 = (img, callback) => {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// };

// const beforeUpload = (file) => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must be smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// };



const Onboarding = ({ step, setStep }) => {

  // for the image upload
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const personalData = useSelector((state) => state.Onboardingpersdetails.personalData);
  

  const { Option } = Select;
  const router = useRouter();

  const [personal, setPersonal] = useState(personalData || {})
  const dispatch = useDispatch()

  const getUserData = (e) => {
    const { name, value } = e.target;
    // Trim the value to 10 digits if it's the phone number field
    if (name === "number") {
      const trimmedValue = value.slice(0, 10);
      setPersonal({ ...personal, [name]: trimmedValue });
    } else {
      setPersonal({ ...personal, [name]: value });
    }
  };

  const handleGenderChange = (selectedValue) => {
    setPersonal({ ...personal, gender: selectedValue });
  };

  const openNotification = () => {
    notification.open({
      message: 'Please fill in all the required fields',
    });
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    console.log("Current state:", personal);
    if (!personal.first_name || !personal.last_name || !personal.gender || !personal.dob || !personal.number || personal.number.length !== 10) {
      console.log("Please fill in all the required fields");
      // alert("fill All the input fields")
      openNotification();
      return;
    }
    console.log("personal...", personal);

    dispatch(setPersonalData(personal));

    setStep(step + 1);

  };


  // for the image upload

  // const handleChange = async (info) => {
  //   console.log(info);
  //   if (info.file.status === 'uploading') {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get base64 representation of the image
  //     getBase64(info.file.originFileObj, async (url) => {
  //       setLoading(false);
  //       setImageUrl(url);
  //       // Upload the image to the server
  //       console.log(url,'url');
  //       try {
  //         const response = await axios.post(
  //           'https://i3mdnxvgrf.execute-api.us-east-1.amazonaws.com/dev/docUpload',
  //           { fileName: info.file.name, data: url }
  //         );
  //         console.log(response.data);
  //         alert('Image uploaded successfully!');
  //         // dispatch(setPersonalData(response.data.link))
  //         // console.log(response.data.link,"this is for image url");

  //         // dispatch(uploadData(response.data.link ));
  //         console.log(dispatch(setonboardingImg({image:response.data.link} )));

  //       } catch (error) {
  //         console.error(error);
  //         alert('Error uploading image. Please try again.');
  //       }
  //     });
  //   }
  // };


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
    { fileName: '', data: '' }
  );
  const accessToken = getAccessTokenFromCookie();

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
        if (!fileuploaded) {
          setfileuploaded(true); // Set to true only if it wasn't true already
        }
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(req)



  const [Attachments, setAttachments] = useState([])
  console.log(Attachments,)


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
      setPersonal({ ...personal, image: response.data.link });
    } catch (error) {
      console.error(error);
      alert('Error uploading image. Please try again.');
    }
  };


  if (fileuploaded) {
    // useEffect(()=>{
    uploadFile(),
      setfileuploaded(false)
    // },[fileuploaded])
  }
  console.log(Attachments)
  console.log("image state", personal);

  return (
    // <form onSubmit={} >
    <div className="flex justify-center items-center gap-16 w-[100%] h-[100vh] p-10 ">
      <div className="md:w-[70vw] h-[88vh] rounded-2xl bg-[#E6F7FF] flex justify-center items-center">
        <Image
          width={100}
          height={100}
          src={OnBoardingImg}
          className="w-[60%]  "
          alt="onboarding img"
        />
      </div>

      <div className="w-[50vw] h-[96vh] flex flex-col relative">
        <div className="flex  items-center p-1  border border-[#1890FF] hover:bg-white hover:text-[#1890FF] transition-all btn btn-primary w-[100px] absolute right-2 top-10 cursor-pointer">
          <Image width={15} height={15} src={Logout} alt="logout" />
          <button className="" onClick={() => {
            removeAccessToken();
            router.push("/login")
          }}>Logout</button>
        </div>

        <div className="pt-16 flex flex-col">
          <p>Onboarding</p>
          <Progress percent={36} showInfo={false} />

          <span className="text-[#4F7396] text-sm mb">step 1 of 3</span>

          <h2 className="text-2xl mb-4 font-bold"> Personal Details</h2>

          <p className="text-md mb-4">
            Please provide your personal details, they will be used to complete
            your profile on Workflow App
          </p>

          <input
            name="first_name"
            placeholder="First name"
            className="p-1 mb-3 border border-gray-300 outline-[#1890FF] w-[70%] "
            onChange={getUserData}
            // value={personal.first_name !== undefined ? personal.first_name : "" || personalData.first_name }
            value={personal.first_name || ''}
          />
          <input
            name="last_name"
            placeholder="Last name"
            className="p-1 mb-3 border border-gray-300 outline-[#1890FF] w-[70%]"
            onChange={getUserData}
            // value={personal.last_name !== undefined ? personal.last_name : "" || personalData.last_name }
            value={personal.last_name || ''}
          />

          <div className="mb-3">
            <Flex gap="small" align="flex-start" vertical>
              <Segmented
                name="gender"

                options={[
                  {
                    label: (
                      <div
                        style={{
                          padding: 4,
                          // color:"blue"
                        }}
                      >
                        <div>Male</div>
                      </div>
                    ),
                    value: "Male",
                  },
                  {
                    label: (
                      <div
                        style={{
                          padding: 4,
                        }}
                      >
                        <div>Female</div>
                      </div>
                    ),
                    value: "Female",
                  },
                  {
                    label: (
                      <div
                        style={{
                          padding: 4,
                        }}
                      >
                        <div>Other</div>
                      </div>
                    ),
                    value: "Other",
                  },
                ]}
                onChange={handleGenderChange}
                // value={ personal.gender ?? personalData.gender ?? ""}
                // value={personal.gender || personalData.gender || "male"}
                value={personal.gender || ''}

              />
            </Flex>
          </div>

          <input
            name="dob"
            type="date"
            placeholder="Date of birth"
            className="p-1 mb-2 border border-gray-300 outline-[#1890FF] w-[70%]"
            onChange={getUserData}
            // value={personal.dob !== undefined ? personal.dob : "" || personalData.dob }
            value={personal.dob || ''}
          />

          <div>
            <Form className="flex border w-[70%]">
              <select className="w-20 h-9 ml-3">
                <option>+91</option>
                <option>+86</option>
              </select>
              <input
                name="number"
                type="number"
                className="w-full h-9 p-2 border-gray-300 outline-[#1890FF]"
                maxLength="10"
                onChange={getUserData}
                pattern="\d{10}"
                // value={personal.number !== undefined ? personal.number : "" || personalData.number }
                value={personal.number || ''}
              />
            </Form>
          </div>

          {/* this is from the uploadin the image  */}
          <div className="flex items-center gap-5 h-20 mt-4">
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
                  {Attachments ? (
                    <Image
                      src={Attachments}
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
              <p className="font-sm font-light">upload your profile picture</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-[70%] lg:mt-6 h-8 border bg-[#1890FF] hover:text-[#1890FF] hover:bg-white hover:border-[#1890FF] transition-all text-white items-end"
            onClick={() => { handleSubmit(), console.log('hello') }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    // </form>
  );
};

export default Onboarding;