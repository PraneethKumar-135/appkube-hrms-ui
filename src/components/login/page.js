"use client";
// import { useRouter } from "next/router";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";

import Image from "next/image";
import LoginImage from "../../../public/assets/login/login2.svg";
import synectiksImage from "../../../public/assets/login/synectiks.svg";
import welcomeImage from "../../../public/assets/login/hand.jpg";
import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";

import axios from "@/api/axios";
// import unionImage from "../../../public/assets/login/Union.svg";

const Page = () => {
  const router = useRouter();
  const [valid, setValid] = useState(true);
  const [emailVerified, setEmailVerified] = useState(true);

  // const reset = useSelector((state) => state.resetPassword);
  // console.log(reset);

  const setCookie = (name, value, expiresInDays) => {
    const date = new Date();
    date.setTime(date.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  const signinCheck = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
      // {
      //   "email": "user@example.com",
      //   "password": "string@S123"
      // }
    };
    try {
      console.log("data", data.emp_type);
      const response = await axios.post("/signin", data);
      console.log("response", response);
      if (response.status == 200) {
        //getting accesstoken from response
        const accessToken = response.data.AccessToken;
        // Set the access token in a cookie
        setCookie("accessToken", accessToken, 1);
        if (
          response.data.Result.email == "" ||
          response.data.Result.work_email == ""
        ) {
          router.push("/onboarding");
        } else {
          router.push("/hrms");
        }
      } else {
        setValid(false);
      }
    } catch (error) {
      console.log("error", error);
      console.log(error.response?.data?.message);
      console.log(error.request.status);
      if (error.request.status == 403) {
        setEmailVerified(false);
        setValid(true);
      } else {
        setValid(false);
        setEmailVerified(true);
      }
    }
  };

  const [onBoarded, setOnBoarded] = useState(false);
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  // const router = useRouter();

  return (
    <>
      <div className="flex justify-center items-center p-10 h-screen gap-16">
        <div className="md:w-[60vw] md:h-[88vh]  bg-[#E6f7ff]  flex justify-center items-center rounded-3xl overflow-hidden">
          <Image
            src={LoginImage}
            className="bg-[#E6F7FF] w-[50%] h-[80%] scale-150"
            alt="login image"
          />
        </div>
        <div className="w-[50%]">
          <div className="ml-5 mb-14">
            <p className="font-semibold text-2xl">HR Portal</p>
            <Image
              src={synectiksImage}
              className="w-[100px]"
              alt="company logo"
            />
          </div>

          <div className="ml-5">
            <div>
              <div className="flex items-center">
                <p className="font-bold m-0 p-0 text-xl">Welcome</p>
                <Image
                  src={welcomeImage}
                  className="w-[25px] h-[25px] ml-2 mb-2"
                  alt="welcome"
                />
              </div>
              <p className="text-gray-400 mb-4 -mt-1 text-sm">
                please login here
              </p>
            </div>
          </div>
          <Form
            name="normal_login"
            className="login-form w-[50%] ml-5"
            initialValues={{
              remember: true,
            }}
            onFinish={signinCheck}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please Enter your username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please Enter your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Link
                    href="/login/forgot"
                    className="login-form-forgot text-blue-500"
                  >
                    Forgot password
                  </Link>
                </div>
                {!valid && (
                  <p className="text-red-700">Invalid email or Password</p>
                )}
                {!emailVerified && (
                  <p className="text-red-700">Please Verify your Email First</p>
                )}
              </div>
            </Form.Item>

            <Form.Item>
              {/* <Link href={`${onBoarded ? "/dashboard" : "/onboarding"}`}> */}
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button bg-blue-500 w-[100%]"
              >
                Log in
              </Button>
              {/* </Link> */}
            </Form.Item>
            <p>
              Dont have any account{" "}
              <Link href="/signup" className="text-blue-500 cursor-pointer">
                ?sign up
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Page;
