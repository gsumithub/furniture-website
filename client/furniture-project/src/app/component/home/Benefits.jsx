"use client"
import React, { useEffect, useState } from 'react'
import { IoEarthSharp } from "react-icons/io5";
import { GiBrightExplosion } from "react-icons/gi";
import { FaRegClock, FaStar, FaShieldAlt, FaTruck } from "react-icons/fa";
import axios from "@/utils/axiosInstance";

const defaultIcons = [
  <IoEarthSharp key="earth" />,
  <GiBrightExplosion key="explosion" />,
  <FaRegClock key="clock" />,
  <FaStar key="star" />,
  <FaShieldAlt key="shield" />,
  <FaTruck key="truck" />,
]

const staticBenefits = [
  { _id: 's1', title: 'Free Shipping', description: 'Free shipping on all orders' },
  { _id: 's2', title: 'Money Return', description: 'Back guarantee under 7 days' },
  { _id: 's3', title: 'Online Support', description: 'Support online 24 hours a day' },
]

export default function Benefits() {
  const [items, setItems] = useState([])
  const [path, setPath] = useState('')
  const API = process.env.NEXT_PUBLIC_APIBASEURL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("home/why-choose-us")
        if (res.data._status && res.data.data?.length > 0) {
          setItems(res.data.data)
          setPath(res.data.path || '')
        } else {
          setItems(staticBenefits)
        }
      } catch (err) {
        setItems(staticBenefits)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='py-[50px] bg-[#F8F9F9] border-[#ebebeb] border-b-2'>
      <div className='max-w-[1320px] mx-auto px-3'>
        <div className={`grid gap-6 ${items.length > 3 ? 'sm:grid-cols-3 grid-cols-2' : 'sm:grid-cols-3 grid-cols-1'}`}>
          {items.map((item, index) => (
            <div key={item._id} className='flex items-center flex-col group sm:mb-0 mb-6 text-center'>
              {item.image && path ? (
                <img
                  src={item.image.startsWith('http') ? item.image : `${path}${item.image}`}
                  alt={item.title}
                  className='w-[70px] h-[70px] object-cover rounded-full mb-4 duration-200 group-hover:scale-110'
                />
              ) : (
                <div className='w-[70px] h-[70px] flex justify-center items-center text-[#5A5A5A] border-[2px] border-[#5A5A5A] text-2xl rounded-[50%] mb-4 duration-200 group-hover:text-[#C09578] group-hover:border-[#C09578]'>
                  {defaultIcons[index % defaultIcons.length]}
                </div>
              )}
              <h2 className='font-semibold font-serif mb-3'>{item.title}</h2>
              <p className='text-[#5A5A5A] text-sm'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
