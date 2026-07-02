import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";

export default function WhyChoseUs() {
  return (
    <div>
      <div className='max-w-[1320px] mx-auto py-10 px-3'>
          <h3 className='font-semibold font-serif text-2xl text-center mb-5'>Why Chose Us ?</h3>
          <div className='grid sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-6'>

             <div className='text-center'>
                <div className='flex justify-center text-5xl text-[#B7B786] mb-5'>
                    <IoHomeOutline />
                </div>
                <div>
                  <h3 className='font-serif font-semibold text-sm mb-3'>100% Money Back Guarantee</h3>
                  <p className='text-sm md:px-10 xs:px-5 px-10'>Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
                </div>
             </div>

             <div className='text-center'>
                <div className='flex justify-center text-5xl text-[#B7B786] mb-5'>
                    <HiOutlineUsers />
                </div>
                <div>
                  <h3 className='font-serif font-semibold text-sm mb-3'>Online Support 24/7</h3>
                  <p className='text-sm md:px-10 xs:px-5 px-10'>Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
                </div>
             </div>

             <div className='text-center'>
                <div className='flex justify-center mb-5 overflow-hidden rounded-lg shadow-sm border border-gray-100 group'>
                    <img 
                      src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/why_choose_us/d86a55b7-bbd1-4565-86ad-b3463e728fdc-1760712425.jpg" 
                      className='transition-transform duration-700 ease-out group-hover:scale-105' 
                      alt="Creative Design" 
                    />
                </div>
                <div>
                  <h3 className='font-serif font-semibold text-sm mb-3'>Creative-Design</h3>
                  <p className='text-sm md:px-10 xs:px-5 px-10'>Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim God has created everything like air,water,tree and metal</p>
                </div>
             </div>

             <div className='text-center'>
                <div className='flex justify-center mb-5 overflow-hidden rounded-lg shadow-sm border border-gray-100 group'>
                    <img 
                      src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/dbfbc372-1550-40ef-a372-19566e1776b2-1671213170.jpg" 
                      className='transition-transform duration-700 ease-out group-hover:scale-105' 
                      alt="What Do We Do?" 
                    />
                </div>
                <div>
                  <h3 className='font-serif font-semibold text-sm mb-3'>What Do We Do?</h3>
                  <p className='text-sm md:px-10 xs:px-5 px-10'>Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.</p>
                </div>
             </div>

             <div className='text-center'>
                <div className='flex justify-center mb-5 overflow-hidden rounded-lg shadow-sm border border-gray-100 group'>
                    <img 
                      src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/0eb1dffc-23c4-4a66-bb02-f5028e3658d3-1671213170.jpg" 
                      className='transition-transform duration-700 ease-out group-hover:scale-105' 
                      alt="Our Mission" 
                    />
                </div>
                <div>
                  <h3 className='font-serif font-semibold text-sm mb-3'>Our Mission</h3>
                  <p className='text-sm md:px-10 xs:px-5 px-10'>Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.</p>
                </div>
             </div>

             <div className='text-center'>
                <div className='flex justify-center mb-5 overflow-hidden rounded-lg shadow-sm border border-gray-100 group'>
                    <img 
                      src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/028a3c98-0fb9-4fc0-8e7c-0076d254de41-1671213170.jpg" 
                      className='transition-transform duration-700 ease-out group-hover:scale-105' 
                      alt="History Of Us" 
                    />
                </div>
                <div>
                  <h3 className='font-serif font-semibold text-sm mb-3'>History Of Us</h3>
                  <p className='text-sm md:px-10 xs:px-5 px-10'>Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim God has created everything like air,water,tree and metal</p>
                </div>
             </div>
          </div>
      </div>
    </div>
  )
}
