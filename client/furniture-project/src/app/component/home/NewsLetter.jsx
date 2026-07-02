"use client"
import React, { useState } from 'react'
import axios from '@/utils/axiosInstance'

export default function NewsLetter() {
  const API = process.env.NEXT_PUBLIC_APIBASEURL
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState({ text: '', type: '' })

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return setMsg({ text: 'Please enter your email', type: 'error' })
    setLoading(true)
    setMsg({ text: '', type: '' })
    try {
      const res = await axios.post(`${API}admin-api/newsletter/subscribe`, { email })
      if (res.data._status) {
        setMsg({ text: '🎉 Subscribed successfully!', type: 'success' })
        setEmail('')
      } else {
        setMsg({ text: res.data._message || 'Something went wrong', type: 'error' })
      }
    } catch (err) {
      setMsg({ text: 'Failed to subscribe. Try again.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='py-14 bg-[#F8F9F9] border-b-2 border-[#ebebeb]'>
      <div className='max-w-[1320px] mx-auto text-center px-3'>
        <h2 className='font-semibold text-2xl font-serif mb-3'>Our Newsletter</h2>
        <p className='text-sm text-[#5A5A5A] font-semibold mb-5'>Get E-mail updates about our latest shop and special offers.</p>
        <form onSubmit={handleSubscribe} className='flex flex-col sm:flex-row gap-2 justify-center items-center px-4'>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email address..'
            className='max-w-[300px] w-full py-2 px-3 border-2 border-[#ebebeb] box-border bg-white focus:outline-none focus:border-[#C09578]'
          />
          <button
            type='submit'
            disabled={loading}
            className='text-white w-full sm:w-auto py-2 px-8 bg-[#C09578] border-2 border-[#C09578] hover:bg-black hover:border-black duration-200 disabled:opacity-50 cursor-pointer'
          >
            {loading ? '...' : 'Subscribe'}
          </button>
        </form>
        {msg.text && (
          <p className={`mt-3 text-sm font-semibold ${msg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
            {msg.text}
          </p>
        )}
      </div>
    </div>
  )
}
