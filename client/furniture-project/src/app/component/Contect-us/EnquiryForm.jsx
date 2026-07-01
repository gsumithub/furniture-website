"use client"
import React, { useState } from 'react'
import { FaMapPin } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { AiTwotoneMail } from "react-icons/ai";
import axios from '@/utils/axiosInstance'

export default function EnquiryForm() {
  const API = process.env.NEXT_PUBLIC_APIBASEURL
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email) return setError("Name and Email are required")
    setLoading(true)
    try {
      const res = await axios.post(`${API}admin-api/contactEnquiry/submit`, form)
      if (res.data._status) {
        setSuccess(true)
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setError(res.data._message || "Something went wrong")
      }
    } catch (err) {
      setError("Failed to send. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='border-b-2 border-[#ebebeb]'>
      <div className='max-w-[1320px] mx-auto py-10 px-3'>
        <div className='grid md:grid-cols-2 gap-6'>
          {/* Contact Info */}
          <div>
            <h3 className='font-semibold font-serif text-xl mb-5'>Contact Us</h3>
            <p className='text-[#5A5A5A] py-3 border-t border-[#ebebeb] flex items-center gap-3'>
              <FaMapPin /> Address: Claritas est etiam processus dynamicus
            </p>
            <p className='text-[#5A5A5A] py-3 border-t border-[#ebebeb] flex items-center gap-3'>
              <IoCall /> 98745612330
            </p>
            <p className='text-[#5A5A5A] py-3 border-t border-[#ebebeb] flex items-center gap-3'>
              <AiTwotoneMail /> furnitureinfo@gmail.com
            </p>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className='font-semibold font-serif text-xl mb-5'>Tell us your question</h3>

            {success ? (
              <div className='bg-green-50 border border-green-300 text-green-700 px-5 py-4 rounded'>
                ✅ Your message has been sent! We&apos;ll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && <p className='text-red-500 text-sm mb-3'>{error}</p>}

                <label className='text-sm font-semibold'>Your Name (required)</label><br />
                <input
                  name="name" value={form.name} onChange={handleChange}
                  type="text" placeholder='Name*'
                  className='border border-[#ebebeb] w-full mt-2 mb-4 py-2 px-4'
                />

                <label className='text-sm font-semibold'>Your Email (required)</label><br />
                <input
                  name="email" value={form.email} onChange={handleChange}
                  type="email" placeholder='Email*'
                  className='border border-[#ebebeb] w-full mt-2 mb-4 py-2 px-4'
                />

                <label className='text-sm font-semibold'>Mobile Number</label><br />
                <input
                  name="phone" value={form.phone} onChange={handleChange}
                  type="text" placeholder='Mobile Number'
                  className='border border-[#ebebeb] w-full mt-2 mb-4 py-2 px-4'
                />

                <label className='text-sm font-semibold'>Subject</label><br />
                <input
                  name="subject" value={form.subject} onChange={handleChange}
                  type="text" placeholder='Subject'
                  className='border border-[#ebebeb] w-full mt-2 mb-4 py-2 px-4'
                />

                <label className='text-sm font-semibold'>Your Message</label><br />
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder='Message'
                  rows={5}
                  className='border border-[#ebebeb] w-full mt-2 mb-6 py-2 px-4 resize-none'
                />

                <button
                  type='submit'
                  disabled={loading}
                  className='py-2 px-6 bg-black text-white rounded font-semibold hover:bg-[#c09578] disabled:opacity-50 duration-200'
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
