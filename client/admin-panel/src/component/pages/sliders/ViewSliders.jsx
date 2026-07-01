import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { FaPen, FaPlus } from "react-icons/fa";
import axios from 'axios'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const apiBaseUrl = import.meta.env.VITE_APIBASEURL

export default function ViewSliders() {
  const [data, setData] = useState([])
  const [path, setPath] = useState('')
  const [selectedRecord, setSelectedRecord] = useState([])
  const [loading, setLoading] = useState(true)

  const getSliders = () => {
    axios.get(`${apiBaseUrl}slider/view`)
      .then(res => {
        setData(res.data.data || [])
        setPath(res.data.path || '')
      })
      .catch(() => toast.error("Failed to load banners"))
      .finally(() => setLoading(false))
  }

  useEffect(() => { getSliders() }, [])

  const toggleCheck = (e) => {
    const val = e.target.value
    setSelectedRecord(prev =>
      e.target.checked ? [...prev, val] : prev.filter(v => v !== val)
    )
  }

  const allCheck = (e) => {
    setSelectedRecord(e.target.checked ? data.map(obj => obj._id) : [])
  }

  const deleteRecords = () => {
    if (!selectedRecord.length) return toast.error("Select at least one banner to delete.")
    Swal.fire({
      title: "Delete selected banners?",
      text: "They will be removed from the hero slideshow.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete!"
    }).then(result => {
      if (result.isConfirmed) {
        axios.post(`${apiBaseUrl}slider/delete`, { ids: selectedRecord })
          .then(() => {
            toast.success("Banners deleted")
            setSelectedRecord([])
            getSliders()
          })
      }
    })
  }

  const changeStatus = () => {
    if (!selectedRecord.length) return toast.error("Select at least one banner.")
    axios.post(`${apiBaseUrl}slider/change-status`, { ids: selectedRecord })
      .then(res => {
        if (res.data._status) {
          toast.success("Status changed")
          setSelectedRecord([])
          getSliders()
        }
      })
  }

  return (
    <div>
      <div className='w-full min-h-[610px]'>
        <p className='px-6 py-3 border-b-2 border-[#ccc] w-full font-semibold text-gray-700'>
          <Link to="/dashboard" className='hover:text-blue-500'>Home</Link> /
          <span className='text-gray-600'> Hero Banners (Sliders)</span>
        </p>

        <div className='max-w-[1220px] mx-auto py-5 px-4'>
          <div className='w-full py-3 px-4 bg-slate-100 rounded-t-md border border-slate-400 flex justify-between items-center'>
            <div>
              <h2 className='text-2xl font-semibold'>Hero Banners</h2>
              <p className='text-xs text-gray-500 mt-1'>These images appear in the full-width slideshow at the top of the homepage</p>
            </div>
            <div className='flex items-center gap-3'>
              <Link to="/slider/add" className='flex items-center gap-2 text-white rounded-[8px] py-2 px-4 bg-purple-600 hover:bg-purple-700 font-semibold'>
                <FaPlus /> Add Banner
              </Link>
              <button onClick={changeStatus} className='text-white rounded-[8px] py-2 px-4 bg-green-600 hover:bg-green-700'>Change Status</button>
              <button onClick={deleteRecords} className='text-white rounded-[8px] py-2 px-4 bg-red-600 hover:bg-red-700'>Delete</button>
            </div>
          </div>

          {loading ? (
            <p className='p-6 text-gray-500'>Loading...</p>
          ) : data.length === 0 ? (
            <div className='p-10 text-center border border-slate-300 border-t-0 bg-white'>
              <p className='text-gray-500 mb-2 text-lg font-semibold'>No hero banners yet</p>
              <p className='text-gray-400 text-sm mb-5'>Add banner images to display in the full-width slideshow at the top of your homepage</p>
              <Link to="/slider/add" className='bg-purple-600 text-white py-2 px-6 rounded font-semibold hover:bg-purple-700 inline-flex items-center gap-2'>
                <FaPlus /> Add Your First Banner
              </Link>
            </div>
          ) : (
            <table className='w-full'>
              <thead className='w-full bg-[#374151] text-left uppercase'>
                <tr className='text-sm font-normal text-gray-400'>
                  <th className='p-4 flex gap-3 items-center'>
                    <input type='checkbox' onChange={allCheck}
                      checked={data.length > 0 && data.length === selectedRecord.length}
                      className='w-4 h-4' />
                    Select
                  </th>
                  <th className='px-4 py-3'>S.No.</th>
                  <th className='px-4 py-3'>Banner Preview</th>
                  <th className='px-4 py-3'>Title</th>
                  <th className='px-4 py-3 text-center'>Order</th>
                  <th className='px-4 py-3 text-center'>Status</th>
                  <th className='px-4 py-3 text-center'>Edit</th>
                </tr>
              </thead>
              <tbody>
                {data.map((obj, index) => (
                  <tr key={obj._id} className='bg-gray-800 hover:bg-gray-700 text-left text-gray-300 border-b border-gray-600'>
                    <td className='p-4'>
                      <input type='checkbox' value={obj._id}
                        onChange={toggleCheck}
                        checked={selectedRecord.includes(obj._id)}
                        className='w-4 h-4' />
                    </td>
                    <td className='px-4 py-3'>{index + 1}</td>
                    <td className='px-4 py-3'>
                      <img src={path + obj.image} alt={obj.title} className='h-[70px] w-[140px] object-cover rounded' />
                    </td>
                    <td className='px-4 py-3 text-white font-semibold'>{obj.title}</td>
                    <td className='px-4 py-3 text-center'>{obj.order}</td>
                    <td className='px-4 py-3 text-center'>
                      <span className={`py-1 px-3 rounded text-white text-xs font-semibold ${obj.status ? 'bg-green-600' : 'bg-red-600'}`}>
                        {obj.status ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className='px-4 py-3 text-center'>
                      <Link to={`/slider/add/${obj._id}`} className='text-white p-2 rounded-full bg-blue-500 hover:bg-blue-600 inline-block'>
                        <FaPen />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
