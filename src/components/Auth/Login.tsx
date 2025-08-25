/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import preview from "@/assets/preview.png";

import logo from "@/assets/logo.png";

import { useLoginMutation } from "@/redux/api/authApi";
import { Spin } from "antd";
import { toast } from "sonner";
import { LoadingOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { setUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

const customIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
  const route = useRouter();

  const validateForm = () => {
    let isValid = true;
    
    // Email validation
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      isValid = false;
    } else {
      setEmailError("");
    }
    
    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }
    
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    console.log("Email:", email);
    console.log("Password:", password);
    
    const body = {
      email: email,
      password: password,
    };

    try {
      const response = await login({ body }).unwrap();
      if (response.success) {
        toast.success(response.message);
        Cookies.set("token", response?.result?.accessToken);
        Cookies.set("role", response.result?.adminInfo?.role);
        dispatch(setUser(response.result));
        console.log(response);
        console.log(response?.result?.accessToken);
        console.log(response.result.adminInfo.role);
        console.log(response.result);
        route.push("/");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      console.log("Execution completed.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Ocean Background */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src={preview}
          alt="Fishing boat in blue ocean waters"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div className="w-full max-w-lg ">
          {/* Logo and Brand */}
          <div className="flex items-center justify-start mb-4 px-6 pt-6 xl:px-0">
            <Image
              src={logo}
              height={100}
              width={100}
              alt="Logo"
              className=""
              priority
            />
          </div>

          <div className="flex-grow"></div>

          {/* Login Form */}
          <div className="lg:space-y-10 space-y-6 lg:my-20 my-4 lg:px-0 px-4">
            <div className="text-start">
              <h2 className="text-3xl font-bold text-[#1C2634]">Hey! Welcome Back</h2>
              <p className="lg:mt-5 mt-2 text-[#6C7278] font-medium">
                {"Sign in to your account first"}
              </p>
            </div>

            <form onSubmit={handleLogin} className="lg:space-y-10 space-y-6">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FE0659] focus:bg-white transition-colors"
                />
                {emailError && (
                  <p className="text-red-500 text-xs mt-1 ml-2">{emailError}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FE0659] focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1 ml-2">{passwordError}</p>
                )}
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FE0659] focus:ring-offset-2 ${
                      rememberMe ? "bg-[#FE0659]" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        rememberMe ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="ml-3 text-sm text-gray-700">Remember Me</span>
                </div>
                <a href="#" className="text-sm text-[#FE0659] hover:text-[#FE0659] font-medium">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-[#FE0659] hover:bg-[#c40846] text-white font-semibold py-4 px-4 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#FE0659] focus:ring-offset-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    Logging <Spin indicator={customIcon} />
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </div>

          <div className="flex-grow"></div>

          {/* Footer */}
          <div className="flex flex-col justify-center items-center md:justify-between flex-wrap text-xs px-6 xl:px-0 pb-6 xl:mt-8">
            <p className="text-[#FE0659] hover:text-[#FE0659] font-medium text-sm">
              © 2025 HEAR FUTURE FIRST. All rights reserved.
            </p>
            <div className="flex text-[#FE0659] hover:text-[#FE0659] font-bold mt-1 ">
              <button className="border-r border-[#ACB5BB] px-2 mr-2">
                Terms & Condition
              </button>
              <button className="">Privacy & Policy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}