"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined, LeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "@/redux/slices/resetPasswordSlice";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";

import forgotImage from "@/../../public/assets/login/forgot/forgot.svg";
import { CiLight } from "react-icons/ci";

const page = () => {
  const router = useRouter();
  const [email, setemail] = useState("");
  const dispatch = useDispatch();
  const reset = useSelector((state) => state.resetPassword);

  return (
    <>
      <div className="flex justify-between items-center p-10 md:mr-[150px]">
        <div className="md:w-[50vw] md:h-[88vh] bg-[#E6F7FF] rounded-3xl flex justify-center items-center">
          <Image
            src={forgotImage}
            className="bg-[#E6F7FF] w-[100%] scale-90 h-[100%] rounded-3xl "
            alt="forgot image"
          />
        </div>
        <div className="ml-5 leading-10">
          <p
            className="cursor-pointer hover:scale-105 transition-all "
            onClick={() => {
              router.push("/login");
            }}
          >
            <span>
              <LeftOutlined />
            </span>{" "}
            Back
          </p>
          <p className="font-bold text-xl mb-3">Forgot Password</p>
          <p className="text-[#A2A1A8] text-sm mb-6">
            Enter your registered email address. we’ll send you a code to reset
            your
            <br /> password
          </p>
          {/* <input type='text' placeholder='Enter Email  Address'/><br/> */}
          {/* <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}> */}
          <div className="flex flex-col ">
            <Form>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter valid email",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon " />}
                  placeholder="Enter Email Address"
                  className="w-[70%] mt-5"
                  // ref={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                    // console.log(e.target.value);
                    // console.log(email.current.value);
                  }}
                  value={email}
                  size="large"
                />
              </Form.Item>
            </Form>
            {/* <Link href="/login/otp"> */}
            <button
              className="w-[50%] bg-blue-500 hover:bg-blue-400 rounded-sm text-white text-base p-2 cursor-pointer self-center mt-5"
              onClick={async () => {
                console.log(reset);
                dispatch(setEmail(email));
                try {
                  const response = await axios.post("/forgotpassword", {
                    email: email,
                  });
                  console.log(response);
                  if (email) router.push("/login/otp");
                  else alert("Enter email first");
                } catch (e) {
                  console.log(e);
                  alert("some error occured");
                }
              }}
            >
              Send otp
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
