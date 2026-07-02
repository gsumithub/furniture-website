"use client";
import React, { useEffect } from "react";
import Testimonial from "../component/common/Testimonial";
import CartTable from "../component/Cart/CartTable";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first to view your cart");
      router.push("/login-register");
    }
  }, [router]);

  return (
    <div>
      <Testimonial title="Shopping Cart" />
      <CartTable />
    </div>
  );
}  
