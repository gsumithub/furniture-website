"use client";
import { setToken } from "@/app/redox/loginSlice";
import axios from "@/utils/axiosInstance"
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;

  let dispatch = useDispatch();

  // ✅ REGISTER
  let createUser = (e) => {
    e.preventDefault();

    let userObj = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phone: e.target.phone.value,
    };

    axios
      .post("user/create", userObj) // ✅ FIXED
      .then((res) => res.data)
      .then((finalres) => {
        if (finalres._status) {
          e.target.reset();
          toast.success(finalres._message);
        } else {
          toast.error(finalres._message);
        }
      })
      .catch(() => toast.error("Something went wrong"));
  };

  // ✅ LOGIN
  let loginUser = (e) => {
    e.preventDefault();

    let userObj = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios
      .post("user/login", userObj) // ✅ FIXED
      .then((res) => res.data)
      .then((finalres) => {
        if (finalres._status) {
          e.target.reset();
          toast.success(finalres._message);

          // ✅ SAVE TOKEN (CRITICAL)
          localStorage.setItem("token", finalres.token);

          dispatch(setToken(finalres.token));

          window.location.href = "/";
        } else {
          toast.error(finalres._message);
        }
      })
      .catch(() => toast.error("Login failed"));
  };

  return (
    <div>
      <Toaster position="top-right" />

      <div className="max-w-[1320px] mx-auto py-10 border-t-2 border-[#ebebeb]">
        <div className="grid sm:grid-cols-2 gap-5 px-3">
          {/* LOGIN */}
          <div>
            <h3 className="text-3xl font-serif mb-5">Login</h3>

            <form onSubmit={loginUser} className="p-5 border rounded">
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-4 border"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full p-3 mb-4 border"
              />

              <div className="flex justify-between">
                <Link href="forgot-password">Forgot?</Link>
                <button className="bg-[#c09578] text-white px-5 py-2">
                  Login
                </button>
              </div>
            </form>
          </div>

          {/* REGISTER */}
          <div>
            <h3 className="text-3xl font-serif mb-5">Register</h3>

            <form onSubmit={createUser} className="p-5 border rounded">
              <input
                name="name"
                placeholder="Name"
                className="w-full p-3 mb-3 border"
              />
              <input
                name="email"
                placeholder="Email"
                className="w-full p-3 mb-3 border"
              />
              <input
                name="password"
                placeholder="Password"
                className="w-full p-3 mb-3 border"
              />
              <input
                name="phone"
                placeholder="Phone"
                className="w-full p-3 mb-3 border"
              />

              <button className="bg-[#c09578] text-white px-5 py-2">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
