"use client"
import React, { useEffect, useState } from 'react'
import axios from '@/utils/axiosInstance'
import Link from 'next/link'

export default function TrendingColl() {
  const [productCount, setProductCount] = useState(0)
  const API = process.env.NEXT_PUBLIC_APIBASEURL

  useEffect(() => {
    // Fetch total best-selling count to make the banner feel dynamic
    const fetchCount = async () => {
      try {
        const res = await axios.get(`${API}home/products`)
        if (res.data._status) setProductCount(res.data.data?.length || 0)
      } catch (err) {
        // fail silently — it's just a banner
      }
    }
    fetchCount()
  }, [API])

  return (
    <div>
      <div className='overflow-hidden relative'>
        <img
          src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/e9234fa4-3ff6-4a6e-a00e-0c9ff26e7b20-1670180400.jpg"
          className='scale-125 h-[500px] w-full object-cover'
          alt="Trending collection banner"
        />
        <div className='absolute top-[50%] left-[80px] translate-y-[-50%] z-20'>
          <h2 className='text-5xl font-bold font-serif'>New Trending Collection</h2>
          <p className='text-[#5a5a5a] mt-4 font-semibold'>We Believe That Good Design is Always in Season</p>
          {productCount > 0 && (
            <p className='text-[#C09578] font-semibold mt-2'>{productCount}+ Products Available</p>
          )}
          <Link href='/'>
            <button className='px-4 py-3 font-bold text-md uppercase text-[#c09578] border-[#c09578] border-2 mt-12 hover:bg-[#c09578] hover:text-white duration-200'>
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
