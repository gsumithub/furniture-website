"use client"
import React, { useState } from 'react'
import Featured from './Featured';
import Arrivals from './Arrivals';
import OnSale from './OnSale';

export default function Cart() {

  let [cart,setCart]=useState(1)


  return (
    <div className=''>
        <div className='max-w-[1320px] mx-auto pt-10'>
            <div className='flex justify-center py-5 px-4'>
                <button
                   onClick={()=>setCart(1)} 
                   className={`px-5 py-3 border-2  ${cart==1? "text-[#c09578] border-[#c09578]" : "border-[#ebebeb]"}   sm:text-xl font-semibold cursor-pointer`}>Featured
                </button>

                <button 
                   onClick={()=>setCart(2)} 
                   className={`px-5 py-3 border-2  ${cart==2? "text-[#c09578] border-[#c09578]" : "border-[#ebebeb]"}   sm:text-xl font-semibold cursor-pointer`}>New Arrivals
                </button>

                <button 
                   onClick={()=>setCart(3)} 
                   className={`px-5 py-3 border-2  ${cart==3? "text-[#c09578] border-[#c09578]" : "border-[#ebebeb]"}   sm:text-xl font-semibold cursor-pointer`}>Onsale
                </button>
            </div>

            <div>

              {
                cart==1 ? <Featured/> : ""
              }
              {
                cart==2 ? <Arrivals/> : ""
              }
              {
                cart==3 ? <OnSale/> : ""
              }
              
            </div>
        </div>
    </div>
  )
}
