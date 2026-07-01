import Link from 'next/link'
import React from 'react'
import { GoChevronRight } from "react-icons/go";

export default function Testimonial({title}) {
  return (
    <div className='border-t-2 border-[#ebebeb] xs:py-10 py-7 text-center'>

        <h2 className='font-bold font-serif xs:text-4xl text-3xl mb-3'>{title}</h2>

        <p className='flex justify-center text-[16px] items-center gap-2'>
          <span className=' hover:text-[#c09578]'>
            <Link href={"/"}>
              Home
            </Link>
          </span>
          <span><GoChevronRight /></span>
          <span className='text-[#c09578]'>           
              {title}
          </span>
        </p>
        

    </div>
  )
}
