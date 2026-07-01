"use client"
import React, { useEffect, useState } from 'react'
import axios from '@/utils/axiosInstance'
import Testimonial from '../component/common/Testimonial'

export default function TermsPage() {
  const [terms, setTerms] = useState(null)
  const [loading, setLoading] = useState(true)
  const API = process.env.NEXT_PUBLIC_APIBASEURL

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await axios.get(`${API}home/terms`)
        if (res.data._status) setTerms(res.data.data)
      } catch (err) {
        console.error('Terms fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTerms()
  }, [API])

  return (
    <div>
      <Testimonial title="Terms & Conditions" />
      <div className='max-w-[900px] mx-auto py-14 px-5'>
        {loading && (
          <div className='text-center py-10'>
            <div className='w-10 h-10 border-4 border-[#C09578] border-t-transparent rounded-full animate-spin mx-auto mb-3'></div>
            <p className='text-gray-500'>Loading...</p>
          </div>
        )}

        {!loading && !terms && (
          <p className='text-center text-gray-500 py-10'>Terms & Conditions have not been added yet.</p>
        )}

        {!loading && terms && (
          <div>
            <p className='text-xs text-gray-400 mb-6'>Last updated: {new Date(terms.updated_at).toLocaleDateString()}</p>
            <div className='text-[#5A5A5A] leading-relaxed whitespace-pre-wrap text-sm'>
              {terms.content}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
