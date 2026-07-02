"use client";

import React, { useEffect, useState } from "react";
import axios from "@/utils/axiosInstance"
import { RiDeleteBin5Line } from "react-icons/ri";
import Link from "next/link";

export default function CartTable() {
  const [cart, setCart] = useState([]);
  const API = process.env.NEXT_PUBLIC_APIBASEURL;

  // ================= FETCH CART =================
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCartItems([]);
        return;
      }

      const res = await axios.get("cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data.cart?.items || []);
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

  // ================= REMOVE =================
  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "cart/remove",
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= UPDATE QTY =================
  const updateQty = async (productId, qty) => {
    try {
      const token = localStorage.getItem("token");

      //  prevent 0 or negative quantity
      const safeQty = qty > 0 ? qty : 1;

      await axios.post(
        "cart/update",
        { productId, quantity: safeQty },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      //  sync across app (header + cart page)
      window.dispatchEvent(new Event("cartUpdated"));

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= TOTAL =================
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="border-t-2 border-[#ebebeb]">
      <div className="max-w-[1320px] mx-auto py-10 px-5">
        <table className="w-full text-center">
          <thead className="bg-[#F8F9F9]">
            <tr className="border-b-2 border-[#c09578]">
              <th className="p-3">Delete</th>
              <th className="p-3">Image</th>
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item._id} className="border-b">
                {/* DELETE */}
                <td
                  className="p-3 text-2xl text-[#c09578] cursor-pointer hover:text-red-500"
                  onClick={() => removeItem(item.product._id)}
                >
                  <RiDeleteBin5Line />
                </td>

                {/* IMAGE */}
                <td className="p-3">
                  <img
                    src={item.product.image && item.product.image.startsWith('http')
                      ? item.product.image
                      : `${(process.env.NEXT_PUBLIC_APIBASEURL || "http://localhost:7000/api/").replace("api/", "")}uploads/product/${item.product.image}`
                    }
                    className="w-20 mx-auto"
                  />
                </td>

                {/* NAME */}
                <td className="p-3">{item.product.name}</td>

                {/* PRICE */}
                <td className="p-3">₹{item.product.price}</td>

                {/* QUANTITY */}
                <td className="p-3">
                  <div className="flex justify-center gap-2 items-center">
                    <button
                      onClick={() =>
                        updateQty(item.product._id, item.quantity - 1)
                      }
                      className="px-3 py-1 bg-gray-200 cursor-pointer"
                    >
                      -
                    </button>

                    <span className="font-semibold">{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQty(item.product._id, item.quantity + 1)
                      }
                      className="px-3 py-1 bg-gray-200 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </td>

                {/* TOTAL */}
                <td className="p-3">₹{item.product.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTAL SECTION */}
        <div className="flex flex-col items-end mt-5">
          <div className="text-right text-xl font-semibold mb-4">
            Total: ₹{totalAmount}
          </div>
          {cart.length > 0 && (
            <Link href="/checkout">
              <button className="bg-[#C09578] text-white px-8 py-3 rounded font-semibold hover:bg-black transition-colors shadow-md cursor-pointer">
                PROCEED TO CHECKOUT
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
