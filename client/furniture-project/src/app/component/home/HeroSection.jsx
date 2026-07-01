"use client"
import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "@/utils/axiosInstance";

export default function HeroSection() {
  const API = process.env.NEXT_PUBLIC_APIBASEURL;
  const [sliders, setSliders] = useState([]);
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await axios.get("home/slider");
        if (res.data._status) {
          setSliders(res.data.data || []);
          setPath(res.data.path || "");
        }
      } catch (err) {
        console.error("Error fetching sliders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSliders();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  // Hide section if no sliders added yet
  if (loading || sliders.length === 0) return null;

  return (
    <div className='overflow-hidden'>
      <Slider {...settings}>
        {sliders.map((item) => (
          <div key={item._id}>
            <img
              src={item.image && item.image.startsWith('http') ? item.image : `${path}${item.image}`}
              alt={item.title || "Slider Image"}
              className='w-full object-cover'
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}
