"use client";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowUp } from "react-icons/io";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "@/app/redox/loginSlice";
import { redirect, useRouter } from "next/navigation";
import axios from "@/utils/axiosInstance"

export default function Header() {
  let [scroll, setScroll] = useState(false);
  let [menu, setMenu] = useState(false);
  let [faq, setFaq] = useState(0);
  let [cartOpen, setCartOpen] = useState(false);
  let [cartItems, setCartItems] = useState([]);
  let [cartCount, setCartCount] = useState(0);
  let [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const API = process.env.NEXT_PUBLIC_APIBASEURL;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY >= 200);
    });

    fetchCart();
    fetchCategories();

    window.addEventListener("cartUpdated", fetchCart);

    return () => {
      window.removeEventListener("cartUpdated", fetchCart);
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("home/categories");
      if (res.data._status) setCategories(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get("cart", {
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

  let token = useSelector((state) => state.authStore.token);
  let dispatch = useDispatch();

  let logOutUser = () => {
    dispatch(logOut());
    redirect("/");
  };
  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API}cart/remove`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchCart();

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.log(err);
    }
  };
  const updateQty = async (productId, qty) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API}cart/update`,
        { productId, quantity: qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchCart();

      //  sync everywhere
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* -------- CART SIDEBAR -------- */}
      <div
        className={`fixed top-0 ${cartOpen ? "right-0" : "right-[-2500px]"} w-full h-screen z-50 bg-[rgba(0,0,0,0.55)]`}
      >
        <div
          className={`w-[355px] h-screen fixed top-0 ${cartOpen ? "right-0" : "right-[-1000px]"} duration-500 bg-white`}
        >
          <div className="py-5 px-5 border-b relative">
            <h3 className="font-serif font-semibold text-xl">Cart</h3>
            <button
              onClick={() => setCartOpen(false)}
              className="absolute right-6 top-1/2 -translate-y-1/2"
            >
              <RxCross1 />
            </button>
          </div>

          <div className="px-5">
            {cartItems.length === 0 ? (
              <p className="py-5 text-center">No items</p>
            ) : (
              cartItems.map((item) => (
                <Cartitem
                  key={item._id}
                  img={`${API.replace("/api/", "")}uploads/product/${item.product.image}`}
                  title={item.product.name}
                  price={item.product.price}
                  qty={item.quantity}
                  onDelete={() => removeItem(item.product._id)}
                  onUpdate={(newQty) =>
                    updateQty(item.product._id, newQty > 0 ? newQty : 1)
                  }
                />
              ))
            )}

            <div className="py-6 flex justify-between">
              <h3>Subtotal:</h3>
              <span>
                Rs.{" "}
                {cartItems.reduce(
                  (acc, i) => acc + i.product.price * i.quantity,
                  0,
                )}
              </span>
            </div>

            <div className="p-5 bg-[#242424]">
              <Link href="/cart">
                <button className="bg-[#3a3737] py-2 w-full text-white mb-3 hover:bg-[#C09578]">
                  VIEW CART
                </button>
              </Link>

              <button className="py-2 w-full text-white bg-[#C09578]">
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* -------- HEADER TOP -------- */}
      <div className="border-b hidden md:block">
        <div className="max-w-[1320px] mx-auto flex justify-between p-3 text-sm">
          <h3>Contact us 24/7 : +91-98745612330 / furnitureinfo@gmail.com</h3>

          {token ? (
            <button
              onClick={logOutUser}
              className="px-5 py-1 bg-[#c09578] text-white rounded"
            >
              Log Out
            </button>
          ) : (
            <Link href={"login-register"}>Login / Register</Link>
          )}
        </div>
      </div>

      {/* -------- HEADER MID -------- */}
      <div className="py-5 border-b">
        <div className="max-w-[1320px] mx-auto flex justify-between items-center px-5">
          <img
            width={140}
            src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"
          />

          <div className="flex gap-4 items-center">
            <form onSubmit={handleSearchSubmit} className="flex items-center hidden md:flex border border-gray-200 rounded-full bg-gray-50 focus-within:border-[#C09578] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#C09578] transition-all duration-200 w-[240px] shadow-sm">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-1.5 w-full bg-transparent text-sm focus:outline-none placeholder-gray-400 font-normal rounded-l-full" 
                placeholder="Search Product..." 
              />
              <button type="submit" className="p-2 text-gray-500 hover:text-[#C09578] cursor-pointer mr-1 bg-transparent border-0 outline-none">
                <IoSearch size={16} />
              </button>
            </form>

            <Link href="/wishlist" className="hover:text-[#C09578] transition-colors cursor-pointer" title="View Wishlist">
              <FaHeart />
            </Link>

            <div
              onClick={() => {
                const token = localStorage.getItem("token");

                if (!token) {
                  alert("Login required");
                  window.location.href = "/login-register";
                  return;
                }

                setCartOpen(true);
              }}
              className="relative cursor-pointer hover:text-[#C09578]"
            >
              <IoMdCart size={22} />

              <span className="absolute -top-2 -left-2 bg-[#C09578] text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            </div>

            <button onClick={() => setMenu(true)} className="md:hidden text-xl">
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      {/* -------- HEADER BOTTOM (RESTORED EXACTLY) -------- */}
      <div
        className={`border-b bg-white ${scroll ? "fixed top-0 w-full z-50" : ""}`}
      >
        <ul className="flex justify-center font-semibold">
          <li className="p-5 text-[#c09578]">
            <Link href="/">Home</Link>
          </li>

          {categories.length > 0 && (
            <li className="p-5 relative group flex items-center gap-1 cursor-pointer select-none hover:text-[#c09578] transition-colors duration-150">
              Categories <IoIosArrowDown />
              <div className="absolute min-w-[200px] top-full left-0 hidden group-hover:block bg-white border border-gray-100 shadow-xl rounded-b-md z-50 py-2 text-gray-800">
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/`}
                    className="block px-5 py-2 hover:text-[#c09578] hover:bg-gray-50 text-sm font-normal"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </li>
          )}

          {/*  PAGES */}
          <li className="p-5 relative group flex items-center gap-1 cursor-pointer select-none hover:text-[#c09578] transition-colors duration-150">
            Pages <IoIosArrowDown />
            <div className="absolute w-[220px] top-full left-0 hidden group-hover:block bg-white border border-gray-100 shadow-xl rounded-b-md z-50 p-4 text-gray-800">
              <Link href="about-us" className="block py-2 border-b border-gray-50 hover:text-[#c09578] text-sm font-normal transition-colors">
                About Us
              </Link>

              <Link href="cart" className="block py-2 border-b border-gray-50 hover:text-[#c09578] text-sm font-normal transition-colors">
                Cart
              </Link>

              <Link href="checkout" className="block py-2 border-b border-gray-50 hover:text-[#c09578] text-sm font-normal transition-colors">
                Checkout
              </Link>

              <Link href="faq" className="block py-2 hover:text-[#c09578] text-sm font-normal transition-colors">
                Frequently Questions
              </Link>
            </div>
          </li>

          <li className="p-5">
            <Link href="contect-us">Contact</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

function Cartitem({ img, title, price, qty, onDelete, onUpdate }) {
  return (
    <div className="grid grid-cols-[40%_auto] gap-2 py-5 border-b relative">
      <img src={img} />

      <div>
        <h5 className="text-xs font-semibold">{title}</h5>

        {/* 🔥 QUANTITY CONTROL */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdate(qty - 1)}
            className="px-2 bg-gray-200 cursor-pointer"
          >
            -
          </button>

          <span>{qty}</span>

          <button
            onClick={() => onUpdate(qty + 1)}
            className="px-2 bg-gray-200 cursor-pointer"
          >
            +
          </button>
        </div>

        <span className="text-[#C09578] font-bold block mt-2">Rs. {price}</span>
      </div>

      {/* DELETE */}
      <div
        onClick={onDelete}
        className="absolute right-0 top-3 cursor-pointer hover:text-red-500"
      >
        <RxCross1 />
      </div>
    </div>
  );
}
