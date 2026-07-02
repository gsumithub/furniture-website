"use client";
import axios from "@/utils/axiosInstance";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProductCard({
  path,
  title,
  price,
  discountPri,
  slug,
  productId,
}) {
  const API = process.env.NEXT_PUBLIC_APIBASEURL;
  const router = useRouter();

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first to manage your cart");
        router.push("/login-register");
        return;
      }
      await axios.post("cart/add", {
        productId,
        quantity: 1,
      });

      toast.success("Added to cart");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  const addToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first to manage your wishlist");
        router.push("/login-register");
        return;
      }
      await axios.post("wishlist/add", { productId });
      toast.success("Added to wishlist");
    } catch (err) {
      toast.error("Error adding to wishlist");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-3">
      <Link href={`/detail-Page/${slug}`}>
        <img src={path} className="w-full h-[200px] object-cover" />
      </Link>

      <div className="text-center mt-3">
        <h3 className="text-sm font-semibold">{title}</h3>

        <div className="mt-2">
          <span className="line-through text-gray-400">₹{price}</span>
          <span className="ml-2 text-[#C09578] font-bold">₹{discountPri}</span>
        </div>

        <div className="flex justify-center gap-3 mt-3">
          <button 
            onClick={addToWishlist}
            className="p-2 bg-gray-200 cursor-pointer hover:text-red-500 hover:bg-gray-100 transition-colors rounded"
          >
            <FaRegHeart />
          </button>

          <button
            onClick={addToCart}
            className="px-3 py-1 bg-[#C09578] text-white text-xs cursor-pointer hover:bg-black"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
