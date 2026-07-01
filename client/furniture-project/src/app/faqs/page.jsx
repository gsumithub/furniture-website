"use client"
import React, { useEffect, useState } from 'react'
import axios from '@/utils/axiosInstance'
import Testimonial from '../component/common/Testimonial'

export default function FaqsPage() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [openIndex, setOpenIndex] = useState(null)
  const API = process.env.NEXT_PUBLIC_APIBASEURL

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get("home/faqs")
        if (res.data._status) setFaqs(res.data.data || [])
      } catch (err) {
        console.error('FAQ fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchFaqs()
  }, [])

  return (
    <div>
      <Testimonial title="Frequently Asked Questions" />

      <div className='max-w-[900px] mx-auto py-14 px-5'>
        {loading && (
          <div className='text-center py-10'>
            <div className='w-10 h-10 border-4 border-[#C09578] border-t-transparent rounded-full animate-spin mx-auto mb-3'></div>
            <p className='text-gray-500'>Loading FAQs...</p>
          </div>
        )}

        {!loading && faqs.length === 0 && (
          <p className='text-center text-gray-500 py-10'>No FAQs added yet. Check back soon!</p>
        )}

        {!loading && faqs.map((faq, index) => (
          <div key={faq._id} className='border border-[#ebebeb] mb-3 rounded'>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className='w-full flex justify-between items-center px-5 py-4 font-semibold text-left hover:text-[#C09578]'
            >
              <span>{faq.question}</span>
              <span className='text-xl ml-3'>{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className='px-5 pb-5 text-[#5A5A5A] text-sm leading-relaxed border-t border-[#ebebeb]'>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
