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

const Page = () => {
  const router = useRouter();
  const [otp, setotp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const reset = useSelector((state) => state.resetPassword);
  

  // useEffect(() => {
  //   // Create refs for each OTP input
  //   for (let i = 0; i < otp.length; i++) {
  //     inputRefs.current.push(React.createRef());
  //   }
  // }, []);

  // useEffect(() => {
  //   // Create refs for each OTP input
  // }, [otp]); // eslint-disable-next-line react-hooks/exhaustive-deps
  for (let i = 0; i < otp.length; i++) {
    inputRefs.current.push(React.createRef());
  }
  

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setotp(newOtp);

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
    setotp(newOtp);
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
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 w-[250px] ">
              {otp.map((value, index) => (
                <Input
                  key={index}
                  placeholder="0"
                  className="w-[3vw] my-5 text-center"
                  size="large"
                  value={otp[index]}
                  maxLength={1}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={inputRefs.current[index]} // Assign ref to each input
                />
              ))}
            </div>
            <button
              className="w-[200px] ml-7 bg-blue-500 rounded-sm text-white text-base p-1 cursor-pointer"
              onClick={() => {
                if (otp.some((item) => item === "" || item === undefined)) {
                  alert("Invalid Otp");
                } else {
                  dispatch(setOtp(otp.join("")));
                  router.push("/login/new-password");
                }
              }}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
