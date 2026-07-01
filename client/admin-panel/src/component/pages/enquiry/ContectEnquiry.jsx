import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { FaFilter, FaTrash } from "react-icons/fa";
import axios from 'axios'
import { toast } from 'react-toastify'

const API = import.meta.env.VITE_API_URL

export default function ContectEnquiry() {
  const [enquiries, setEnquiries] = useState([])
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}admin-api/contactEnquiry/view`)
      if (res.data._status) setEnquiries(res.data.data || [])
    } catch (err) {
      toast.error("Failed to load enquiries")
    } finally {
      setLoading(false)
    }
  }

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const selectAll = (e) => {
    setSelected(e.target.checked ? enquiries.map(e => e._id) : [])
  }

  const handleDelete = async () => {
    if (!selected.length) return toast.warn("Select at least one item")
    try {
      await axios.post(`${API}admin-api/contactEnquiry/delete`, { ids: selected })
      toast.success("Deleted successfully")
      setSelected([])
      fetchData()
    } catch { toast.error("Delete failed") }
  }

  const handleChangeStatus = async () => {
    if (!selected.length) return toast.warn("Select at least one item")
    try {
      await axios.post(`${API}admin-api/contactEnquiry/change-status`, { ids: selected })
      toast.success("Status updated")
      setSelected([])
      fetchData()
    } catch { toast.error("Status change failed") }
  }

  return (
    <div>
      <div className='w-full min-h-[610px]'>
        <p className='px-6 py-3 border-b-2 border-[#ccc] w-full font-semibold text-gray-700'>
          <Link to="/dashboard" className='hover:text-blue-500'>Home</Link> /
          <span className='text-gray-600'> Contact Enquiries</span>
        </p>

        <div className='max-w-[1220px] mx-auto py-5'>
          <div className='w-full py-3 px-4 bg-slate-100 rounded-t-md border border-slate-400 flex justify-between items-center'>
            <h2 className='text-2xl font-semibold'>Contact Enquiry Management</h2>
            <div className='flex items-center gap-3'>
              <button onClick={handleChangeStatus} className='text-white rounded-[8px] py-2 px-4 bg-green-600 hover:bg-green-700'>Change Status</button>
              <button onClick={handleDelete} className='text-white rounded-[8px] py-2 px-4 bg-red-600 hover:bg-red-700 flex items-center gap-2'><FaTrash /> Delete</button>
            </div>
          </div>

          {loading ? (
            <p className='p-6 text-gray-500'>Loading...</p>
          ) : enquiries.length === 0 ? (
            <p className='p-6 text-gray-500 text-center'>No enquiries yet. They will appear here when someone fills out the Contact Us form.</p>
          ) : (
            <table className='w-full'>
              <thead className='w-full bg-[#374151] text-left uppercase'>
                <tr className='text-sm font-normal text-gray-400'>
                  <th className='p-4'><input type='checkbox' onChange={selectAll} checked={selected.length === enquiries.length && enquiries.length > 0} className='w-4 h-4' /></th>
                  <th className='px-4 py-3'>Name</th>
                  <th className='px-4 py-3'>Email</th>
                  <th className='px-4 py-3'>Phone</th>
                  <th className='px-4 py-3'>Subject</th>
                  <th className='px-4 py-3'>Message</th>
                  <th className='px-4 py-3'>Status</th>
                  <th className='px-4 py-3'>Date</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e) => (
                  <tr key={e._id} className='bg-gray-800 hover:bg-gray-700 text-gray-300 border-b border-gray-600'>
                    <td className='p-4'><input type='checkbox' checked={selected.includes(e._id)} onChange={() => toggleSelect(e._id)} className='w-4 h-4' /></td>
                    <td className='px-4 py-3 text-white font-semibold'>{e.name}</td>
                    <td className='px-4 py-3'>{e.email}</td>
                    <td className='px-4 py-3'>{e.phone || '—'}</td>
                    <td className='px-4 py-3'>{e.subject || '—'}</td>
                    <td className='px-4 py-3 max-w-[200px] truncate'>{e.message || '—'}</td>
                    <td className='px-4 py-3'>
                      <span className={`py-1 px-3 rounded text-white text-xs font-semibold ${e.status ? 'bg-green-600' : 'bg-red-500'}`}>
                        {e.status ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className='px-4 py-3 text-xs'>{new Date(e.created_at).toLocaleDateString()}</td>
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
