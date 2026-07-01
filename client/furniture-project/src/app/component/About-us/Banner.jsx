import React from 'react'

export default function Banner() {
  return (
    <div className='border-t-2 border-[#ebebeb]'>
      <div className='max-w-[1320px] mx-auto sm:py-10'>
          <div className='flex justify-center mb-5'>
            <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/983cc349-1718-4290-b7cd-c8eb20459536-1671213069.jpg" alt="" />
          </div>
          <div className='text-center'>
              <h3 className='font-semibold font-serif text-2xl mb-5'>Welcome to Monsta!</h3>
              <p className='text-sm md:px-[80px] px-10 mb-5'>
                Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam, est usus legentis in iis qui facit eorum claritatem.
              </p>
              <p className='text-sm text-[#c09578] md:px-5 px-4'>“There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.”</p>
          </div>
      </div>
    </div>
  )
}
