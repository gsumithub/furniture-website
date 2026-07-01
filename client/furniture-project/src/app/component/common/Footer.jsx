"use client"
import React, { useEffect, useState } from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { SiTelegram } from "react-icons/si";
import Link from 'next/link';
import axios from '@/utils/axiosInstance';

export default function Footer() {
  const [topRated, setTopRated] = useState([])
  const [path, setPath] = useState('')
  const API = process.env.NEXT_PUBLIC_APIBASEURL

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const res = await axios.get("home/top-rated")
        if (res.data._status && res.data.data?.length > 0) {
          setTopRated(res.data.data)
          setPath(res.data.path || '')
        }
      } catch (err) {
        console.error('Footer top-rated fetch error:', err)
      }
    }
    fetchTopRated()
  }, [])

  return (
    <>
      <div className='max-w-[1320px] mx-auto py-10 '>
        <div className='px-3 grid md:grid-cols-3 sm:grid-cols-2 border-b-[2px] border-[#ebebeb] gap-10 pb-5'>
          {/* Contact */}
          <div className='mb-5'>
            <h3 className='font-semibold text-xl font-serif mb-5'>Contact Us</h3>
            <p className='text-sm font-semibold text-[#5A5A5A] mb-3'>Address: Claritas est etiam processus dynamicus</p>
            <p className='text-sm font-semibold text-[#5A5A5A] mb-3'>Phone: 98745612330</p>
            <p className='text-sm font-semibold text-[#5A5A5A] mb-4'>Email: furnitureinfo@gmail.com</p>

            <div className='flex gap-3'>
              {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, SiTelegram].map((Icon, i) => (
                <button key={i} className='w-[40px] h-[40px] border-[1px] border-gray-400 rounded-[50%] flex items-center justify-center text-gray-400 cursor-pointer hover:text-[#C09578] hover:border-[#C09578]'>
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className='grid grid-cols-2 mb-5'>
            <div>
              <h3 className='font-semibold text-xl font-serif mb-5'>Information</h3>
              <ul className='text-[#5A5A5A] font-semibold text-sm'>
                <li className='mb-3 hover:text-[#C09578]'><Link href={"/about-us"}>About Us</Link></li>
                <li className='mb-3 hover:text-[#C09578]'><Link href={"/contect-us"}>Contact Us</Link></li>
                <li className='mb-3 hover:text-[#C09578]'><Link href={"/faqs"}>Frequently Questions</Link></li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold text-xl font-serif mb-5'>My Account</h3>
              <ul className='text-[#5A5A5A] font-semibold text-sm'>
                <li className='mb-3 hover:text-[#C09578]'><Link href={"/my-dashboard"}>My Dashboard</Link></li>
                <li className='mb-3 hover:text-[#C09578]'><Link href={"/cart"}>Cart</Link></li>
                <li className='mb-3 hover:text-[#C09578]'><Link href={"/checkout"}>Checkout</Link></li>
              </ul>
            </div>
          </div>

          {/* Top Rated Products — only shown when added via admin panel */}
          {topRated.length > 0 && (
            <div>
              <h3 className='font-semibold text-xl font-serif mb-2'>Top Rated Products</h3>
              <div>
                {topRated.map((p) => (
                  <Link
                    key={p._id}
                    href={p.slug ? `/detail-Page/${p.slug}` : '#'}
                    className='flex gap-4 border-b-[1px] border-[#ebebeb] py-3 hover:opacity-80'
                  >
                    <div>
                      <img
                        src={p.image && p.image.startsWith('http') ? p.image : `${path}${p.image}`}
                        alt={p.name}
                        width={100}
                        className='object-cover h-[70px] w-[100px]'
                      />
                    </div>
                    <div>
                      <p className='text-sm text-[#5A5A5A]'>{p.parentCategory?.name || ''}</p>
                      <h4 className='font-serif my-2 text-sm'>{p.name}</h4>
                      <div>
                        {p.actualPrice && (
                          <span className='line-through text-sm'>₹{p.actualPrice?.toLocaleString()}</span>
                        )}
                        <span className='ms-2 font-bold text-sm text-[#C09578]'>₹{p.price?.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className='py-5 border-b-[2px] border-[#ebebeb] px-3'>
          <ul className='flex gap-5 justify-center xs:text-[18px] text-sm xs:font-normal font-semibold text-[#5A5A5A]'>
            <li className='hover:text-[#C09578]'><Link href={"/"}>Home</Link></li>
            <li className='hover:text-[#C09578]'><Link href={"/about-us"}>About Us</Link></li>
            <li className='hover:text-[#C09578]'><Link href={"/contect-us"}>Contact</Link></li>
            <li className='hover:text-[#C09578]'><Link href={"/faqs"}>FAQs</Link></li>
          </ul>
        </div>

        <div className='pt-[40px] text-center'>
          <p className='text-sm'>All Rights Reserved By Furniture | © 2026</p>
          <div className='flex justify-center pt-5'>
            <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/papyel2.png" alt="payment methods" />
          </div>
        </div>
      </div>
    </>
  )
}
