import React, { useState, useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { FaBars } from "react-icons/fa6";
import { IoMdSettings } from 'react-icons/io'
import { MdDashboard } from 'react-icons/md'
import { Link } from 'react-router';

export default function Header() {
  const [open, setopen] = useState(false)
  const [photo, setPhoto] = useState(
    localStorage.getItem("adminPhoto") || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
  )

  useEffect(() => {
    const updatePhoto = () => {
      setPhoto(localStorage.getItem("adminPhoto") || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg")
    }
    window.addEventListener("adminPhotoUpdated", updatePhoto)
    return () => {
      window.removeEventListener("adminPhotoUpdated", updatePhoto)
    }
  }, [])

  return (
    <>
      <div className='py-3 px-6 w-full border-b-2 border-[#ccc] flex justify-between items-center bg-white shadow-sm'>
          <div className='flex items-center'>
              <span className='text-xl text-gray-400'><FaBars /></span>
              <h2 className='text-xl font-semibold ms-4 text-gray-500'>Dashboard</h2>
          </div>
          <div className="relative">
            <div className='w-[50px] h-[50px] rounded-[50%] overflow-hidden border border-gray-200 shadow-sm'>
              <img className='hover:cursor-pointer object-cover w-full h-full' onClick={() => setopen(!open)} src={photo} alt="Admin Profile"  />
            </div>
            
            {open && (
              <div className='absolute right-0 mt-2 z-50 bg-white border border-gray-100 shadow-xl px-5 py-4 w-[180px] rounded-lg text-sm font-medium leading-7 text-gray-700' onClick={()=>setopen(false)}>
                <ul>
                  <li className='flex items-center hover:text-blue-600 gap-2 cursor-pointer pb-2 border-b border-gray-50'>  
                    <MdDashboard /> 
                    <Link to={'/profile'} className="w-full">Profile</Link> 
                  </li>
                  <li className='flex items-center hover:text-blue-600 gap-2 cursor-pointer py-2 border-b border-gray-50'> 
                    <IoMdSettings /> 
                    <Link to={'/componyprofile'} className="w-full">Company</Link> 
                  </li>
                  <li className='flex items-center hover:text-red-500 gap-2 cursor-pointer pt-2'> 
                    <FaUserCircle/> 
                    <Link 
                      to={'/'} 
                      onClick={() => {
                        localStorage.removeItem("adminToken");
                      }}
                      className="w-full text-left"
                    >
                      Logout
                    </Link> 
                  </li>
                </ul>
              </div>
            )}
          </div>
      </div>
    </>
  )
}
