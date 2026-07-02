"use client";

import { useParams } from "next/navigation";
import axios from "@/utils/axiosInstance";
import toast from "react-hot-toast";

export default function ResetPassword() {
  let params = useParams();
  let userid = params?.userid || params?.userId;

  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;

  let submit = (e) => {
    e.preventDefault();

    axios.put(`user/reset-password/${userid}`, {
      newPassword: e.target.newPassword.value,
      confirmPassword: e.target.confirmPassword.value,
    })
    .then(res => res.data)
    .then(data => {
      if (data._status) {
        toast.success(data._message || "Password reset successfully!");
      } else {
        toast.error(data._message || "Failed to reset password");
      }
    })
    .catch(err => {
      toast.error("An error occurred");
    });
  };

  return (
    <div className="max-w-[500px] mx-auto py-10 px-3">
      <div className="p-6 border rounded shadow-sm bg-white">
        <p className="text-sm text-gray-500 mb-5 text-center">
          Enter your new password below.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <input
            name="newPassword"
            type="password"
            placeholder="New Password"
            className="w-full p-3 border rounded focus:border-[#C09578] focus:outline-none bg-white text-sm"
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded focus:border-[#C09578] focus:outline-none bg-white text-sm"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#c09578] text-white py-3 hover:bg-black transition-colors rounded font-semibold text-sm cursor-pointer"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}