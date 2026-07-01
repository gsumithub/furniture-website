import React from 'react'
import Banner from '../component/About-us/Banner'
import Testimonial from '../component/common/Testimonial'
import WhyChoseUs from '../component/About-us/WhyChoseUs'
import OurCustumers from '../component/common/OurCustumers'

export default function page() {
  return (
    <div>
      <Testimonial title="About-US"/>
      <Banner/>
      <WhyChoseUs/>
      <OurCustumers/>
    </div>
  )
}
