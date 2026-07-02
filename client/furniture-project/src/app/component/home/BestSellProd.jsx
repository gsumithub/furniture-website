"use client";
import React, { useEffect, useState, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import axios from "@/utils/axiosInstance"
import Link from "next/link";
import toast from "react-hot-toast";

export default function BestSellProd() {
  const [productData, setProductData] = useState([]);
  const [path, setPath] = useState("");
  const [mounted, setMounted] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    getProductData();
  }, []);

  const getProductData = () => {
    axios
      .get("home/products")
      .then((res) => res.data)
      .then((finalres) => {
        if (finalres._status) {
          // Filter to only show bestSelling products
          const bestSellers = (finalres.data || []).filter(p => p.bestSelling);
          setProductData(bestSellers);
          setPath(finalres.path);
        }
      })
      .catch((err) => console.log(err));
  };

  if (!mounted) return null;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Turn off default arrows so our custom styled ones work
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="py-20 border-b-2 border-[#ebebeb]">
      <div className="max-w-[1320px] mx-auto px-5">
        
        {/* Header with Navigation */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold font-serif text-gray-800">
            Bestselling Products
          </h2>
          
          <div className="flex gap-2">
            <button 
              onClick={() => sliderRef.current?.slickPrev()}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#C09578] hover:text-white hover:border-[#C09578] transition-all duration-200 cursor-pointer shadow-sm"
              aria-label="Previous Slide"
            >
              <FaAngleLeft size={18} />
            </button>
            <button 
              onClick={() => sliderRef.current?.slickNext()}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#C09578] hover:text-white hover:border-[#C09578] transition-all duration-200 cursor-pointer shadow-sm"
              aria-label="Next Slide"
            >
              <FaAngleRight size={18} />
            </button>
          </div>
        </div>

        {productData.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No bestselling products added yet.</p>
        ) : (
          <div className="mx-[-12px]">
            <Slider ref={sliderRef} {...settings}>
              {productData.map((obj) => (
                <div key={obj._id} className="px-3">
                  <ProductCard
                    productId={obj._id}
                    path={obj.image && obj.image.startsWith('http') ? obj.image : `${path}${obj.image}`}
                    title={obj.name}
                    price={obj.price}
                    discountPri={obj.actualPrice}
                    slug={obj.slug}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ path, title, price, discountPri, slug, productId }) {
  const API = process.env.NEXT_PUBLIC_APIBASEURL || "http://localhost:7000/api/";

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      await axios.post(
        `${API}cart/add`,
        {
          productId: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to cart");
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {
      toast.error("Error adding to cart");
    }
  };

  const discount = discountPri && price && discountPri > price
    ? Math.round(((discountPri - price) / discountPri) * 100)
    : 0;

  const addToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }
      await axios.post("wishlist/add", { productId });
      toast.success("Added to wishlist");
    } catch (err) {
      toast.error("Error adding to wishlist");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between h-[380px] transition-transform duration-300 hover:translate-y-[-4px]">
      
      {/* Product Image */}
      <div className="relative">
        <Link href={`/detail-Page/${slug}`}>
          <img 
            className="w-full h-[200px] object-cover" 
            src={path} 
            alt={title} 
          />
        </Link>
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">
            {discount}% Off
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between text-center">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Premium Furniture</p>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-[40px] flex items-center justify-center">
            {title}
          </h3>
        </div>

        <div>
          {/* Price details */}
          <div className="mt-2 flex items-center justify-center gap-2">
            {discountPri && discountPri > price && (
              <span className="line-through text-xs text-gray-400">Rs. {discountPri.toLocaleString()}</span>
            )}
            <span className="font-bold text-sm text-[#C09578]">Rs. {price.toLocaleString()}</span>
          </div>

          {/* Action buttons */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <button 
              onClick={addToWishlist}
              className="p-2 border border-gray-200 hover:border-[#C09578] hover:text-[#C09578] rounded transition-colors duration-200 cursor-pointer"
            >
              <FaRegHeart size={14} />
            </button>
            <button
              onClick={addToCart}
              className="px-4 py-1.5 bg-[#C09578] text-white text-xs font-semibold rounded hover:bg-black transition-colors duration-200 cursor-pointer"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
