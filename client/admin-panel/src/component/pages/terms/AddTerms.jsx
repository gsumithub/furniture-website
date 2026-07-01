import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'

const API = import.meta.env.VITE_API_URL

export default function AddTerms() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const navigate = useNavigate()

  // Load existing terms if any
  useEffect(() => {
    const fetchExisting = async () => {
      try {
        const res = await axios.get(`${API}admin-api/terms/view`)
        if (res.data._status && res.data.data) {
          setContent(res.data.data.content || '')
        }
      } catch (err) {
        // no existing terms yet
      } finally {
        setFetching(false)
      }
    }
    fetchExisting()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return toast.warn("Please enter terms content")
    setLoading(true)
    try {
      const res = await axios.post(`${API}admin-api/terms/save`, { content })
      if (res.data._status) {
        toast.success(res.data._message)
        navigate('/terms/view')
      } else {
        toast.error(res.data._message)
      }
    } catch (err) {
      toast.error("Failed to save terms")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='w-full min-h-[610px]'>
        <p className='px-6 py-3 border-b-2 border-[#ccc] w-full font-semibold text-gray-700'>
          <Link to="/dashboard" className='hover:text-blue-500'>Home</Link> /
          <Link to="/terms/view" className='hover:text-blue-500'> Terms & Conditions</Link> /
          <span className='text-gray-600'> Add / Edit</span>
        </p>

        <div className='max-w-[900px] mx-auto py-8 px-4'>
          <div className='w-full py-3 px-4 bg-slate-100 rounded-t-md border border-slate-300 mb-1'>
            <h2 className='text-2xl font-semibold'>Terms & Conditions</h2>
            <p className='text-sm text-gray-500 mt-1'>This content will be displayed on the /terms page of your website</p>
          </div>

          {fetching ? (
            <p className='p-6 text-gray-500'>Loading existing terms...</p>
          ) : (
            <form onSubmit={handleSubmit} className='p-4 border border-slate-300 bg-white'>
              <label className='block text-sm font-semibold mb-2'>Terms Content <span className='text-red-500'>*</span></label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                placeholder="Enter your Terms & Conditions content here..."
                className='w-full border border-gray-300 rounded p-3 text-sm font-mono focus:outline-none focus:border-blue-400 resize-y'
              />
              <div className='mt-4 flex gap-3'>
                <button
                  type='submit'
                  disabled={loading}
                  className='bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded font-semibold disabled:opacity-50'
                >
                  {loading ? 'Saving...' : content ? 'Update Terms' : 'Save Terms'}
                </button>
                <Link to="/terms/view" className='bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded font-semibold'>
                  Cancel
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
