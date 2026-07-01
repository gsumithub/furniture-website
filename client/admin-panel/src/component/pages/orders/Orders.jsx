import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { FaPen } from "react-icons/fa";
import axios from 'axios'
import { toast } from 'react-toastify'

const API = import.meta.env.VITE_API_URL

const STATUS_OPTIONS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchOrders() }, [])

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}api/order/admin/view`)
      if (res.data._status) setOrders(res.data.data || [])
    } catch (err) {
      toast.error("Failed to load orders")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(`${API}api/order/admin/update-status/${orderId}`, { status })
      toast.success("Order status updated")
      fetchOrders()
    } catch { toast.error("Status update failed") }
  }

  return (
    <div>
      <div className='w-full min-h-[610px]'>
        <p className='px-6 py-3 border-b-2 border-[#ccc] w-full font-semibold text-gray-700'>
          <Link to="/dashboard" className='hover:text-blue-500'>Home</Link> /
          <span className='text-gray-600'> Orders</span>
        </p>

        <div className='max-w-[1220px] mx-auto py-5'>
          <div className='w-full py-3 px-4 bg-slate-100 rounded-t-md border border-slate-400 flex justify-between items-center'>
            <h2 className='text-2xl font-semibold'>Order&apos;s List <span className='text-base text-gray-500 font-normal'>({orders.length} total)</span></h2>
          </div>

          {loading ? (
            <p className='p-6 text-gray-500'>Loading...</p>
          ) : orders.length === 0 ? (
            <p className='p-6 text-gray-500 text-center'>No orders placed yet. Orders appear here when customers checkout.</p>
          ) : (
            <table className='w-full border border-slate-400'>
              <thead className='text-left uppercase bg-[#374151] text-gray-400'>
                <tr className='text-sm'>
                  <th className='px-4 py-3'>S.No</th>
                  <th className='px-4 py-3'>Order ID</th>
                  <th className='px-4 py-3'>Customer</th>
                  <th className='px-4 py-3'>Email</th>
                  <th className='px-4 py-3'>Items</th>
                  <th className='px-4 py-3'>Amount</th>
                  <th className='px-4 py-3'>Date</th>
                  <th className='px-4 py-3'>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id} className='bg-gray-800 hover:bg-gray-700 text-gray-300 border-b border-gray-600'>
                    <td className='px-4 py-3'>{index + 1}</td>
                    <td className='px-4 py-3 text-xs text-gray-400'>{order._id.slice(-8).toUpperCase()}</td>
                    <td className='px-4 py-3 text-white font-semibold'>{order.user?.name || '—'}</td>
                    <td className='px-4 py-3 text-sm'>{order.user?.email || '—'}</td>
                    <td className='px-4 py-3'>{order.items?.length || 0} item(s)</td>
                    <td className='px-4 py-3 text-[#C09578] font-bold'>₹{order.totalAmount?.toLocaleString()}</td>
                    <td className='px-4 py-3 text-xs'>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className='px-4 py-3'>
                      <select
                        value={order.status || 'Pending'}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className='bg-gray-700 text-white text-xs rounded px-2 py-1 border border-gray-500'
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
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
