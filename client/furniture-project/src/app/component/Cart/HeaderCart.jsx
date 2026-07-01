"use client";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axiosInstance"

export default function HeaderCart() {
  const [cart, setCart] = useState([]);
  const API = process.env.NEXT_PUBLIC_APIBASEURL;

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${API}cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const items = res.data.cart?.items || [];

      setCartItems(items);

      const total = items.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(total);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();

    window.addEventListener("cartUpdated", fetchCart);

    return () => {
      window.removeEventListener("cartUpdated", fetchCart);
    };
  }, []);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="fixed right-0 top-0 w-[320px] h-full bg-black text-white p-5 z-50">
      <h2 className="text-xl mb-5">Cart</h2>

      {cart.map((item) => (
        <div key={item._id} className="flex gap-3 mb-4 border-b pb-3">
          <img
            src={`http://localhost:7000/uploads/product/${item.product.image}`}
            className="w-16 h-16 object-cover"
          />

          <div>
            <p>{item.product.name}</p>
            <p>Qty: {item.quantity}</p>
            <p className="text-[#c09578]">₹ {item.product.price}</p>
          </div>
        </div>
      ))}

      <div className="mt-5 border-t pt-4">
        <p className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{subtotal}</span>
        </p>

        <button className="w-full bg-gray-800 py-3 mt-4">VIEW CART</button>

        <button className="w-full bg-[#c09578] py-3 mt-2">CHECKOUT</button>
      </div>
    </div>
  );
}
