"use client";

import React, { useState } from "react";
import axios from "@/utils/axiosInstance"

export default function ForgotForm() {
  let [msg, setMsg] = useState("");
  let [error, setError] = useState("");
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;

  let submit = (e) => {
    e.preventDefault();

    axios.post("user/forgot-password", {
      email: e.target.email.value,
    })
    .then(res => res.data)
    .then(data => {
      if (data._status) setMsg(data._message);
      else setError(data._message);
    });
  };

  return (
    <div className="max-w-[500px] mx-auto py-10 px-3">
      <div className="p-6 border rounded shadow-sm bg-white">
        <p className="text-sm text-gray-500 mb-5 text-center">
          Enter your email address and we will send you a password reset link.
        </p>

        <form onSubmit={submit}>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full p-3 mb-4 border rounded focus:border-[#C09578] focus:outline-none bg-white text-sm"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#c09578] text-white py-3 hover:bg-black transition-colors rounded font-semibold text-sm cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>

        {msg && (
          <p className="mt-4 text-green-600 text-sm font-semibold text-center bg-green-50 p-2.5 rounded border border-green-200 animate-fade-in">
            {msg}
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-500 text-sm font-semibold text-center bg-red-50 p-2.5 rounded border border-red-200 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}