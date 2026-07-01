"use client";

import React, { useEffect, useState } from "react";
import axios from "@/utils/axiosInstance"

export default function CheckoutPage() {
  const API = process.env.NEXT_PUBLIC_APIBASEURL;

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [form, setForm] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  // ================= GET CART =================
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const items = res.data.cart?.items || [];
      setCart(items);

      let t = 0;
      items.forEach((item) => {
        t += item.product.price * item.quantity;
      });

      setTotal(t);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= PLACE ORDER =================
  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "order/create",
        {
          shippingAddress: form,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert("✅ Order placed successfully!");

        // 🔥 clear UI
        setCart([]);
        setTotal(0);

        // 🔥 update header cart
        window.dispatchEvent(new Event("cartUpdated"));

      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-[1320px] mx-auto py-10 px-5 grid md:grid-cols-2 gap-10">

      {/* ================= LEFT: SHIPPING ================= */}
      <div>
        <h2 className="text-2xl font-semibold mb-5">Shipping Details</h2>

        <input
          name="address"
          placeholder="Address"
          className="w-full border p-3 mb-3"
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City"
          className="w-full border p-3 mb-3"
          onChange={handleChange}
        />

        <input
          name="pincode"
          placeholder="Pincode"
          className="w-full border p-3 mb-3"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          className="w-full border p-3 mb-3"
          onChange={handleChange}
        />

        <button
          onClick={placeOrder}
          className="w-full bg-[#C09578] text-white py-3 mt-5 hover:bg-black"
        >
          PLACE ORDER
        </button>
      </div>

      {/* ================= RIGHT: ORDER SUMMARY ================= */}
      <div>
        <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>

        {cart.length === 0 && (
          <p className="text-gray-500">Cart is empty</p>
        )}

        {cart.map((item) => (
          <div key={item._id} className="flex justify-between border-b py-3">

            <div>
              <h4 className="font-semibold">{item.product.name}</h4>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity}
              </p>
            </div>

            <div className="font-semibold">
              ₹{item.product.price * item.quantity}
            </div>

          </div>
        ))}

        <div className="flex justify-between mt-5 text-xl font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

      </div>
    </div>
  );
}