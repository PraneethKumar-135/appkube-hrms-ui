"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import otpImage from "@/../../public/assets/login/otp/otp.svg";
import Image from "next/image";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined, LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setOtp } from "@/redux/slices/resetPasswordSlice";
import { CiLight } from "react-icons/ci";

const page = () => {
  useEffect(() => {
    inputRefs.current[0].current.focus();
  }, []);

  const router = useRouter();
  const [otp, setotp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const reset = useSelector((state) => state.resetPassword);

  for (let i = 0; i < otp.length; i++) {
    inputRefs.current.push(useRef(null));
  }

  const handleInputChange = (index, value) => {
    console.log(value);
    const newOtp = [...otp];
    newOtp[index] = value;
    console.log(newOtp);
    setotp(newOtp);
    console.log(otp);

    // Focus on the next input if the current one is full and not the last
    if (value.length === 1 && index < otp.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1].current.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].current.focus();
    } else if (e.key === "ArrowRight" && index === otp.length - 1) {
      // Focus on the first input if at the end and right arrow is pressed
      inputRefs.current[0].current.focus();
    } else if (e.key === "ArrowLeft" && index === 0) {
      // Focus on the last input if at the start and left arrow is pressed
      inputRefs.current[otp.length - 1].current.focus();
    }
  };

  const handleFocus = (index) => {
    // Clear the input value when it is focused
    const newOtp = [...otp];
    newOtp[index] = "";
    setOtp(newOtp);
  };

  return (
    <>
      <div className="flex justify-between items-center p-10 gap-10 md:mr-[200px]">
        <div className="md:w-[53vw] md:h-[88vh] bg-[#E6F7FF] rounded-3xl flex justify-center items-center overflow-hidden">
          <Image
            src={otpImage}
            className="bg-[#E6F7FF] w-full scale-75"
            alt="otp image"
          />
        </div>
        <div className="ml-5 leading-10 ">
          <p
            className="cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              router.push("/login/forgot");
            }}
          >
            <span>
              <LeftOutlined />
            </span>{" "}
            Back
          </p>
          <p className="font-bold text-xl ">Enter OTP</p>
          <p className="text-[#A2A1A8] text-sm mb-6">
            We have share a code of your registered email address
            <br />
            {reset.email}
          </p>
          {/* <input type='text' placeholder='Enter Email  Address'/><br/> */}
          {/* <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}> */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 w-[250px] ">
              {/* {fields.map((field, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  placeholder="0"
                  className="w-[3vw] my-5 text-center"
                  size="large"
                  value={field}
                  // type="number"
                  maxLength={1}
                  onChange={(event) => handleChange(index, event)}
                />
              ))} */}
              {otp.map((value, index) => (
                <Input
                  key={index}
                  placeholder="0"
                  className="w-[3vw] my-5 text-center"
                  size="large"
                  value={otp[index]}
                  // style={}
                  maxLength={1}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  // onFocus={() => handleFocus(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={inputRefs.current[index]} // Assign ref to each input
                />
              ))}
              {/* <Input
                placeholder="0"
                className="w-[3vw] my-5 text-center"
                size="large"
                maxLength={1}
              />
              <Input
                placeholder="0"
                className="w-[3vw] my-5 text-center"
                size="large"
                maxLength={1}
              />
              <Input
                placeholder="0"
                className="w-[3vw] my-5 text-center"
                size="large"
                maxLength={1}
              /> */}
            </div>

            <button
              className="w-[200px] ml-7 bg-blue-500 rounded-sm text-white text-base p-1 cursor-pointer"
              onClick={() => {
                console.log(otp);
                if (otp.some((item) => item === "" || item === undefined)) {
                  alert("Invalid Otp");
                } else {
                  dispatch(setOtp(otp.join("")));
                  console.log(reset);
                  router.push("/login/new-password");
                }
              }}
            >
              verify
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
