import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'

const API = import.meta.env.VITE_API_URL

export default function ViewTerms() {
  const [terms, setTerms] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await axios.get(`${API}admin-api/terms/view`)
        if (res.data._status) setTerms(res.data.data)
      } catch (err) {
        toast.error("Failed to load terms")
      } finally {
        setLoading(false)
      }
    }
    fetchTerms()
  }, [])

  return (
    <div>
      <div className='w-full min-h-[610px]'>
        <p className='px-6 py-3 border-b-2 border-[#ccc] w-full font-semibold text-gray-700'>
          <Link to="/dashboard" className='hover:text-blue-500'>Home</Link> /
          <span className='text-gray-600'> Terms & Conditions</span>
        </p>

        <div className='max-w-[900px] mx-auto py-8 px-4'>
          <div className='w-full py-3 px-4 bg-slate-100 rounded-t-md border border-slate-300 flex justify-between items-center mb-1'>
            <div>
              <h2 className='text-2xl font-semibold'>Terms & Conditions</h2>
              {terms && <p className='text-xs text-gray-500 mt-1'>Last updated: {new Date(terms.updated_at).toLocaleString()}</p>}
            </div>
            <Link to="/terms/add" className='bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded font-semibold text-sm'>
              {terms ? 'Edit Terms' : '+ Add Terms'}
            </Link>
          </div>

          {loading ? (
            <p className='p-6 text-gray-500'>Loading...</p>
          ) : !terms ? (
            <div className='p-8 text-center border border-slate-300 bg-white'>
              <p className='text-gray-500 mb-4'>No Terms & Conditions added yet.</p>
              <Link to="/terms/add" className='bg-purple-600 text-white py-2 px-6 rounded font-semibold'>
                Add Terms Now
              </Link>
            </div>
          ) : (
            <div className='p-6 border border-slate-300 bg-white rounded-b'>
              <pre className='whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed'>
                {terms.content}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
