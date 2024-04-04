"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined, LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";

import forgotImage from "@/../../public/assets/login/forgot/forgot.svg";
import { useDispatch, useSelector } from "react-redux";
import { setNewPass } from "@/redux/slices/resetPasswordSlice";

const Page = () => {
  const router = useRouter();
  const [valid, setValid] = useState(true);
  const [passMatch, setPassMatch] = useState();
  const [password,setPassword] = useState('')

  const dispatch = useDispatch();
  const reset = useSelector((state) => state.resetPassword);

  const signupDetails = async (values) => {
    console.log("in finish");
    const data = {
      email: reset.email,
      otp: reset.otp,
      newPassword:
        (values.password === values.confirmpassword &&
        values.password != "" &&
        values.confirmpassword != "")?password:""
    };
    // //       {
    // //   "email": "<email>",
    // //   "otp": "<string>",
    // //   "newPassword": "<string>"
    // // }
    //     };

    if (
      values.password === values.confirmpassword &&
      values.password != "" &&
      values.confirmpassword != ""
    ) {
      setPassMatch(true);
      try {
        console.log(values.password);
        dispatch(setNewPass(password));
        console.log(reset);
        console.log(password);
        //     console.log("data", data.emp_type);
        console.log(data);
        const response = await axios.post("/resetPassword", data);
        console.log("response", response);
        console.log(response.message);
        //     if (response.status == 200) {
        router.push("/login/reset");
        // setTimeout(() => {
        //   console.log(reset);
        // }, 5000);
        //     } else {
        setValid(false);
        //       console.log(response);
        //   }
      } catch (error) {
        //     // console.log("error", error.response.data.message);
        console.log(error);
        setValid(false);
      }
    } else {
      setPassMatch(false);
      console.log(
        "Password do not match p1",
        values.password,
        "p2",
        values.confirmpassword,
        "?"
      );
    }
  };
  return (
    <>
      <div className="flex justify-between items-center p-10 md:mr-[200px] ">
        <div className="md:w-[50vw] md:h-[88vh] bg-[#E6F7FF] rounded-3xl flex justify-center items-center">
          <Image
            src={forgotImage}
            className="bg-[#E6F7FF] w-[100%] scale-90 h-[100%] rounded-3xl "
            alt="forgot image"
          />
        </div>
        <div className="-ml-10 leading-10">
          <p
            className="cursor-pointer hover:scale-105 transition-all "
            onClick={() => {
              router.push("/login/otp");
            }}
          >
            <span>
              <LeftOutlined />
            </span>{" "}
            Back
          </p>
          <p className="font-bold text-xl ">Re-set Password</p>
          <p className="text-[#A2A1A8] text-sm mb-6">
            Create a new password that is different from the old one.
          </p>
          {/* <input type='text' placeholder='Enter Email  Address'/><br/> */}
          {/* <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}> */}
          {/* <div className="flex flex-col ">
            <Input
              prefix={<UserOutlined className="site-form-item-icon " />}
              placeholder="Enter Email Address"
              className="w-[70%] my-5"
              size="large"
            />
            <button
              className="w-[50%] bg-blue-500 hover:bg-blue-400 rounded-sm text-white text-base p-2 cursor-pointer self-center"
              onClick={() => {
                router.push("/login/otp");
              }}
            >
              Send otp
            </button>
          </div> */}
          {/* </Link> */}

          <Form
            className="flex flex-col"
            style={{ width: "50vh", fontSize: "1.1rem" }}
            // onFinish={() => {
            //   console.log("form submitted");
            //   router.push("/signup/confirm-mail");
            // }}
            onFinish={signupDetails}
            // onValuesChange={handleFormValuesChange}
          >
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please create your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Password(6 digits at least, case sensitive)"
                style={{ fontSize: "1.1rem", borderRadius: "3px" }}
                size="large"
                required={true}
                onChange={(e)=>{setPassword(e.target.value)}}
              />
            </Form.Item>

            {/* <Form.Item
              name="confirmpassword"
              rules={[
                {
                  required: true,
                  message: `${!passMatch && "Password does not match!"}`,
                },
              ]}
            > */}
            <Form.Item
              name="confirmpassword"
              dependencies={["password"]} // Make the validation dependent on the password field
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve(); // Passwords match, resolve the promise
                    }
                    return Promise.reject("The two passwords do not match!"); // Passwords don't match, reject the promise
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Comfirm password"
                style={{ fontSize: "1.1rem", borderRadius: "3px" }}
                size="large"
                required={true}
              />
            </Form.Item>
            {/* <Link href="/signup/confirm-mail"> */}
            <button
              className="w-full "
              // type="primary"
              // type="submit"
              style={{
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "5px",
                paddingTop: "5px",
                backgroundColor: "#1890FF",
                color: "white",
                borderRadius: "3px",
              }}
              size="large"
              // disabled={ !passMatch}
              // onClick={() => {
              //   handleOnSubmit();
              // }}
            >
              Change Password
            </button>
            {/* </Link> */}
          </Form>
        </div>
      </div>
    </>
  );
};

export default Page;
