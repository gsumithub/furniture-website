import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { FaFilter, FaPen, FaTrash } from "react-icons/fa";
import axios from 'axios';

export default function ViewUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_APIBASEURL || "http://localhost:7000/admin-api/";
      const res = await axios.get(`${apiBaseUrl}user/view`);
      if (res.data._status) {
        setUsers(res.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleAdmin = async (userId) => {
    try {
      const apiBaseUrl = import.meta.env.VITE_APIBASEURL || "http://localhost:7000/admin-api/";
      const res = await axios.post(`${apiBaseUrl}user/toggle-admin`, { userId });
      if (res.data._status) {
        alert(res.data.message);
        fetchUsers();
      } else {
        alert(res.data.message || "Failed to update privileges");
      }
    } catch (err) {
      alert("Error updating admin status");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const apiBaseUrl = import.meta.env.VITE_APIBASEURL || "http://localhost:7000/admin-api/";
      const res = await axios.post(`${apiBaseUrl}user/delete`, { userId });
      if (res.data._status) {
        alert(res.data.message);
        fetchUsers();
      } else {
        alert(res.data.message || "Failed to delete user");
      }
    } catch (err) {
      alert("Error deleting user");
    }
  };

  return (
    <div>
      <div className='w-full min-h-[610px]'>
        <p className='px-6 py-3 border-b-2 border-[#ccc] w-full font-semibold text-gray-700'>
          <Link to="/dashboard" className='hover:text-blue-500'>Home</Link>  /
          <Link to=" " className='hover:text-blue-500'> User</Link> /
          <span className='text-gray-600'> View</span>
        </p>

        <div className='max-w-[1220px] mx-auto py-5  '>
          <div className='w-full py-3 px-4 bg-slate-100 rounded-t-md border border-slate-400 flex justify-between items-center'>
            <h2 className='text-2xl font-semibold'>View User</h2>

            <div className='flex items-center gap-3'>
              <div className='w-[40px] h-[40px] rounded-[8px] bg-blue-600 hover:bg-blue-700 cursor-pointer text-white flex justify-center items-center'>
                <FaFilter />
              </div>
            </div>
          </div>

          {loading ? (
            <div className='bg-gray-800 text-white text-center py-10'>
              <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2'></div>
              <p>Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className='bg-gray-800 text-white text-center py-10'>
              <p>No registered users found.</p>
            </div>
          ) : (
            <table className='w-full'>
              <thead className='w-full bg-[#374151] text-left uppercase'>
                <tr className='text-sm font-normal text-gray-400'>
                  <th scope='col' className='px-6 py-4 w-[25%]'>Name</th>
                  <th scope='col' className='w-[30%] ps-2'>Email ID</th>
                  <th scope='col' className='w-[20%] ps-2'>Mobile Number</th>
                  <th scope='col' className='w-[15%] ps-2'>Role (Admin Status)</th>
                  <th scope='col' className='w-[10%] ps-2 text-center'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className='bg-gray-800 hover:bg-gray-600 text-left text-gray-400 border-b border-gray-700'>
                    <td className='px-6 py-4 text-white font-medium'>{u.name}</td>
                    <td className='ps-2 text-gray-300'>{u.email}</td>
                    <td className='ps-2 text-gray-300'>{u.phone}</td>
                    <td className='ps-2'>
                      <button
                        onClick={() => handleToggleAdmin(u._id)}
                        className={`text-white text-xs py-1 px-3 rounded font-semibold transition-colors cursor-pointer ${
                          u.isAdmin 
                            ? 'bg-purple-600 hover:bg-purple-700' 
                            : 'bg-gray-600 hover:bg-blue-600'
                        }`}
                        title="Click to toggle Admin permissions"
                      >
                        {u.isAdmin ? 'Revoke Admin' : 'Make Admin'}
                      </button>
                    </td>
                    <td className='ps-2 text-center'>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className='text-white p-2 rounded bg-red-600 hover:bg-red-700 cursor-pointer transition-colors'
                        title="Delete User"
                      >
                        <FaTrash size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
