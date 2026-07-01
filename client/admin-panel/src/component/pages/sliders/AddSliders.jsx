import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'

const apiBaseUrl = import.meta.env.VITE_APIBASEURL

export default function AddSliders() {
  const imgDefault = 'https://placehold.co/800x400?text=Click+to+Upload+Banner+Image'
  const [imgPreview, setImgPreview] = useState(imgDefault)
  const [singledata, setSingleData] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) {
      setImgPreview(imgDefault)
      return
    }
    axios.get(`${apiBaseUrl}slider/single-data/${id}`)
      .then(res => {
        setSingleData(res.data._data || {})
        setImgPreview(res.data.path + (res.data._data?.image || ''))
      })
      .catch(() => toast.error("Failed to load slider data"))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const myData = new FormData(e.target)
    const url = id ? `slider/update/${id}` : 'slider/add'
    const method = id ? 'put' : 'post'

    try {
      const res = await axios[method](`${apiBaseUrl}${url}`, myData)
      if (res.data._status) {
        toast.success(id ? 'Banner updated successfully!' : 'Banner added successfully!')
        setTimeout(() => navigate('/slider/view'), 1500)
      } else {
        const errMsg = res.data._message || (res.data.error && res.data.error.map(e => Object.values(e)[0]).join(', '))
        toast.error(errMsg || 'Something went wrong')
      }
    } catch (err) {
      toast.error("Failed to save banner")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='w-full min-h-[610px]'>
        <p className='px-6 py-3 border-b-2 border-[#ccc] w-full font-semibold text-gray-700'>
          <Link to="/dashboard" className='hover:text-blue-500'>Home</Link> /
          <Link to="/slider/view" className='hover:text-blue-500'> Hero Banners</Link> /
          <span className='text-gray-600'> {id ? 'Edit' : 'Add'}</span>
        </p>

        <div className='max-w-[900px] mx-auto py-6 px-4'>
          <div className='w-full py-3 px-4 bg-slate-100 rounded-t-md border border-slate-300 mb-1'>
            <h2 className='text-2xl font-semibold'>{id ? 'Edit Hero Banner' : 'Add Hero Banner'}</h2>
            <p className='text-sm text-gray-500 mt-1'>These images appear in the full-width slideshow at the top of your website homepage</p>
          </div>

          <form onSubmit={handleSubmit} className='p-5 border border-slate-300 bg-white border-t-0'>

            {/* Image Upload */}
            <div className='mb-6'>
              <label className='block font-semibold mb-2'>
                Banner Image <span className='text-red-500'>*</span>
                <span className='text-xs font-normal text-gray-500 ml-2'>(Recommended: 1400×500px wide landscape image)</span>
              </label>
              <div className='relative w-full h-[220px] border-2 border-dashed border-[#ccc] rounded overflow-hidden bg-gray-50 cursor-pointer hover:border-blue-400 transition-colors'>
                <input
                  name='image'
                  type="file"
                  accept="image/*"
                  className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10'
                  onChange={(e) => {
                    if (e.target.files[0]) setImgPreview(URL.createObjectURL(e.target.files[0]))
                  }}
                />
                <img src={imgPreview} alt="Preview" className='w-full h-full object-cover' />
                <div className='absolute bottom-2 right-2 z-20 bg-black bg-opacity-60 text-white text-xs px-3 py-1 rounded'>
                  Click to change image
                </div>
              </div>
            </div>

            {/* Title */}
            <div className='mb-5'>
              <label className='block font-semibold mb-2'>
                Banner Title <span className='text-red-500'>*</span>
                <span className='text-xs font-normal text-gray-500 ml-2'>(e.g. "Summer Collection", "New Arrivals")</span>
              </label>
              <input
                type="text"
                name='title'
                defaultValue={singledata.title || ''}
                placeholder='Enter banner title...'
                required
                className='w-full border-2 border-[#ccc] py-2 px-4 rounded-[8px] focus:outline-none focus:border-blue-400'
              />
            </div>

            {/* Order */}
            <div className='mb-6'>
              <label className='block font-semibold mb-2'>
                Display Order
                <span className='text-xs font-normal text-gray-500 ml-2'>(1 = first slide, 2 = second, etc.)</span>
              </label>
              <input
                type="number"
                name='order'
                defaultValue={singledata.order || 1}
                placeholder='1'
                min="1"
                className='w-[120px] border-2 border-[#ccc] py-2 px-4 rounded-[8px] focus:outline-none focus:border-blue-400'
              />
            </div>

            <div className='flex gap-3'>
              <button
                type='submit'
                disabled={loading}
                className='py-2 px-6 text-white bg-purple-600 hover:bg-purple-700 rounded-[8px] font-semibold disabled:opacity-50'
              >
                {loading ? 'Saving...' : id ? 'Update Banner' : 'Add Banner'}
              </button>
              <Link to="/slider/view" className='py-2 px-6 text-white bg-gray-500 hover:bg-gray-600 rounded-[8px] font-semibold'>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
