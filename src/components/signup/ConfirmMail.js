"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Form, Input } from "antd";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";

import emailHero from "@/../public/assets/photos/signup/emailhero.svg";

const ConfirmMail = () => {
  const router = useRouter();
  const email = router?.query?.email;
  // console.log(email);
  // const email = "farazasif159@gmail.com";
  return (
    <div className="flex justify-center items-center p-10 gap-16">
      <div className="md:w-[70vw] md:h-[88vh] bg-[#E6F7FF] rounded-3xl flex justify-center items-center">
        <Image src={emailHero} alt="signup" className="w-[80%]" />
      </div>
      <div className="md:w-[50vw] flex flex-col justify-start items-start gap-8">
        <div>
          <h1 className="text-2xl font-semibold w-[70%] mb-3">
            Check your inbox and Confirm your email address
          </h1>
          <h2 className="text-[#A2A1A8] text-sm">
            We’ve sent a confirmation email{" "}
            <span className="text-[#1890FF]">{email}</span>
          </h2>
        </div>
        <div className="w-[382px] h-[200px]  shadow-lg rounded-sm px-10 py-8 flex flex-col gap-3">
          <span className="flex items-center gap-2">
            <IoAlertCircleOutline color="#1890FF" />
            <p
              className="font-semibold text-md
            "
            >
              Didn’t receive an email?
            </p>
          </span>
          <p className="font-normal text-sm self-end">
            Some if you can’t find the email in your inbox or spam folder,
            please click below and we will send you a new one...
          </p>
          <Button
            type=""
            color=""
            className="self-end bg-[#1890FF] hover:bg-blue-500 text-white"
          >
            Resend Email
          </Button>
        </div>

        <p className="text-[#A2A1A8] text-sm">
          Have an account ?
          <Link href="/login" className="text-[#1890FF]">
            {" "}
            Sign in
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default ConfirmMail;
