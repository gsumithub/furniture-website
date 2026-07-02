"use client"
import React, { useEffect, useState } from 'react'
import axios from "@/utils/axiosInstance";

export default function Collection() {
  const API = process.env.NEXT_PUBLIC_APIBASEURL;
  const [categories, setCategories] = useState([]);
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("home/categories");
        if (res.data._status) {
          setCategories(res.data.data || []);
          setPath(res.data.path || "");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Hide section if no categories added yet
  if (loading || categories.length === 0) return null;

  return (
    <div className='border-b-[2px] border-[#ebebeb] py-10'>
      <div className='max-w-[1320px] mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 px-5'>
        {categories.map((item) => (
          <CollectionItem
            key={item._id}
            path={item.image && item.image.startsWith('http') ? item.image : `${path}${item.image}`}
            title={item.name}
            subtitle={item.subtitle || "Design Creative"}
          />
        ))}
      </div>
    </div>
  )
}

function CollectionItem({ path, title, subtitle }) {
  const imgSrc = !path || path.includes('undefined') 
    ? 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop' 
    : path;

  return (
    <div className='relative group overflow-hidden rounded-lg shadow-sm border border-gray-100'>
      <img 
        src={imgSrc} 
        className='transition-transform duration-700 ease-out group-hover:scale-110 w-full h-[300px] object-cover' 
        alt={title} 
      />
      <div className='absolute top-8 left-8 z-10'>
        <p className='text-xs font-semibold uppercase tracking-wider text-gray-500'>{subtitle}</p>
        <h3 className='text-[24px] font-bold font-serif mt-1 text-black'>{title}</h3>
      </div>
      <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none' />
    </div>
  )
}
