import React from 'react'
import Testimonial from '../component/common/Testimonial'
import LoginForm from '../component/Login/LoginForm'

export default function page() {
  return (
    <div>
      <Testimonial title="My Account"/>
      <LoginForm/>
    </div>
  )
}
