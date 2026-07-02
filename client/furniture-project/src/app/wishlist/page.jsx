"use client";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axiosInstance";
import Testimonial from "../component/common/Testimonial";
import Link from "next/link";
import { RiDeleteBin5Line } from "react-icons/ri";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await axios.get("wishlist");
      if (res.data.success) {
        setWishlistItems(res.data.wishlist?.products || []);
      }
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await axios.post("wishlist/remove", { productId });
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post("cart/add", {
        productId,
        quantity: 1,
      });
      toast.success("Added to cart");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      toast.error("Failed to add item to cart. Please log in first.");
    }
  };

  return (
    <div>
      <Testimonial title="My Wishlist" />

      <div className="max-w-[1320px] mx-auto py-14 px-5">
        {loading ? (
          <div className="text-center py-10">
            <div className="w-10 h-10 border-4 border-[#C09578] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-500">Loading your wishlist...</p>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-6 text-lg">Your wishlist is empty.</p>
            <Link href="/">
              <button className="px-6 py-2.5 bg-[#C09578] text-white font-semibold rounded hover:bg-black transition-colors duration-200">
                Go to Shop
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {wishlistItems.map((product) => {
              const API = process.env.NEXT_PUBLIC_APIBASEURL || "http://localhost:7000/api/";
              const baseUploadUrl = API.replace("/api/", "").replace("api/", "");
              const imgSrc = product.image && product.image.startsWith("http")
                ? product.image
                : `${baseUploadUrl}uploads/product/${product.image}`;

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between h-[380px] transition-transform duration-300 hover:translate-y-[-4px]"
                >
                  {/* Product Image */}
                  <div className="relative">
                    <Link href={`/detail-Page/${product.slug}`}>
                      <img
                        className="w-full h-[200px] object-cover"
                        src={imgSrc}
                        alt={product.name}
                      />
                    </Link>
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="absolute top-3 right-3 p-2 bg-white text-[#c09578] hover:text-red-500 rounded-full shadow-sm cursor-pointer transition-colors"
                      title="Remove from Wishlist"
                    >
                      <RiDeleteBin5Line size={16} />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between text-center">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
                        Premium Furniture
                      </p>
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-[40px] flex items-center justify-center">
                        {product.name}
                      </h3>
                    </div>

                    <div>
                      {/* Price details */}
                      <div className="mt-2 flex items-center justify-center gap-2">
                        {product.actualPrice && product.actualPrice > product.price && (
                          <span className="line-through text-xs text-gray-400">
                            Rs. {product.actualPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="font-bold text-sm text-[#C09578]">
                          Rs. {product.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Action button */}
                      <div className="mt-3 flex items-center justify-center">
                        <button
                          onClick={() => handleAddToCart(product._id)}
                          className="w-full py-2 bg-[#C09578] text-white text-xs font-semibold rounded hover:bg-black transition-colors duration-200 cursor-pointer"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
