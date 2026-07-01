import React from 'react'
import Testimonial from '../component/common/Testimonial'
import Map from '../component/Contect-us/Map'
import EnquiryForm from '../component/Contect-us/EnquiryForm'

export default function page() {
  return (
    <div>
      <Testimonial title="Contect-Us"/>
      <Map/>
      <EnquiryForm/>
    </div>
  )
}
