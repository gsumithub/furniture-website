"use client";

import { useParams } from "next/navigation";
import axios from "@/utils/axiosInstance"

export default function ResetPassword() {
  let { userId } = useParams(); // 

  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;

  let submit = (e) => {
    e.preventDefault();

    axios.put(`user/reset-password/${userId}`, {
      newPassword: e.target.newPassword.value,
      confirmPassword: e.target.confirmPassword.value,
    })
    .then(res => res.data)
    .then(data => {
      alert(data._message);
    });
  };

  return (
    <form onSubmit={submit}>
      <input name="newPassword" placeholder="New Password" />
      <input name="confirmPassword" placeholder="Confirm Password" />
      <button>Reset</button>
    </form>
  );
}