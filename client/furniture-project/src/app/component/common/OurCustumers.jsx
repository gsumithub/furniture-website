"use client"
import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { RiStarSFill } from "react-icons/ri";
import axios from "@/utils/axiosInstance";

export default function OurCustumers() {
  const API = process.env.NEXT_PUBLIC_APIBASEURL;
  const [testimonials, setTestimonials] = useState([]);
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("home/testimonials");
        if (res.data._status) {
          setTestimonials(res.data.data || []);
          setPath(res.data.path || "");
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Hide entire section if no testimonials
  if (loading || testimonials.length === 0) return null;

  return (
    <div className='py-14'>
      <div className='max-w-[1320px] mx-auto text-center px-3'>
        <h2 className='font-semibold text-2xl font-serif mb-5'>What Our Customers Say ?</h2>
        <div className='overflow-hidden pb-5' id='OurCustumer'>
          <Slider {...settings}>
            {testimonials.map((item) => (
              <div key={item._id}>
                <Customer
                  path={item.image && item.image.startsWith('http') ? item.image : `${path}${item.image}`}
                  name={item.name}
                  designation={item.designation}
                  message={item.message}
                  rating={item.rating || 5}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

function Customer({ path, name, designation, message, rating }) {
  return (
    <div>
      <p className='md:px-[145px] xs:px-[35px] mb-5'>{message}</p>
      <div className='flex justify-center mb-5'>
        <img src={path} alt={name} className='w-[80px] h-[80px] rounded-full object-cover' />
      </div>
      <h3 className='font-semibold font-serif mb-3'>{name}</h3>
      <p className='text-[#5A5A5A] text-sm font-semibold mb-5'>{designation}</p>
      <div className='flex items-center justify-center text-[#C09578] text-xl'>
        {Array.from({ length: rating }).map((_, i) => (
          <RiStarSFill key={i} />
        ))}
      </div>
    </div>
  )
}