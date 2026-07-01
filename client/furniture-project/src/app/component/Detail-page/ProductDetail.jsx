import React from 'react'

export default function ProductDetail() {
  return (
    <div className='border-y-2 border-[#ebebeb]'>
      <div className='max-w-[1320px] mx-auto py-10 '>
          <div className='grid md:grid-cols-2 gap-10 px-3 mb-10'>
              <div className='flex justify-center'>
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="" />
              </div>
              <div>
                <h3 className='font-semibold font-serif text-2xl'>Caroline Study Tables</h3>
                <h6 className='py-5'>
                  <span className='line-through text-[#A4A4A4]'>Rs. 3000</span>
                  <span className='font-bold text-[18px] text-[#C09578] ps-3'>Rs. 2,500</span>
                </h6>
                <p className='text-sm md:pe-[80px] sm:pe-10 pe-[60px] text-[#5A5A5A] pb-5 border-b-2 border-[#ebebeb]'>The Drawer is for your storage needs and camouflages perfectly with the tables carved front. The use of Sheesham ensures its longevity.</p>
                <button className='my-5 py-2 px-10 font-semibold text-white bg-[#C09578] hover:bg-black duration-200 rounded-[5px]'>Add To Cart</button>

                <ul className='text-sm '>
                  <li className='mb-3'>Code: jodST0011</li>
                  <li className='mb-3'>Dimension: 72L * 32H * 30W</li>
                  <li className='mb-3'>Estimate Delivery Days: "40-45" Days</li>
                  <li className='mb-3'>Category: Nest Of Tables</li>
                  <li className='mb-3'>Color: Cobalt Blue</li>
                  <li className='mb-3'>Material:</li>
                </ul>
              </div>
          </div>

          <div className='px-3'>
            <h3 className='  font-bold text-2xl text-[#C09578]  pb-5 border-b-2 border-[#ebebeb]'>Description</h3>
            <p className='text-[#5A5A5A] py-5'>The caroline table is sure to make you travel back in time, aesthetics that have a royal and periodic feel will enhance the look and feel of any space. The Drawer is for your storage needs and camouflages perfectly with the tables carved front. The use of Sheesham ensures its longevity.</p>
          </div>

      </div>
    </div>
  )
}
