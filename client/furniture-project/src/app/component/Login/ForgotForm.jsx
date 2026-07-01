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
    <form onSubmit={submit}>
      <input name="email" placeholder="Email" />
      <button type="submit">Send</button>

      {msg && <p>{msg}</p>}
      {error && <p>{error}</p>}
    </form>
  );
}