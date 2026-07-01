import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { FaFilter } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import axios from 'axios'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';

export default function ViewProduct() {

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL

  let [data, setData] = useState([]);
  let [path, setPath] = useState('');
  let [selectedRecord, setSelectedRecord] = useState([]);

  // ✅ GET PRODUCTS
  let getProduct = () => {
    axios.get(`${apiBaseUrl}product/view`)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes);
        setData(finalRes.data || [])
        setPath(finalRes.path || "")
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // ✅ CHECKBOX SINGLE
  let getCheckValue = (e) => {
    let checkValue = e.target.value
    if (e.target.checked) {
      setSelectedRecord([...selectedRecord, checkValue])
    } else {
      setSelectedRecord(selectedRecord.filter((v) => v !== checkValue))
    }
  }

  // ✅ CHECKBOX ALL
  let allCheck = (e) => {
    if (e.target.checked) {
      setSelectedRecord(data.map((obj) => obj._id))
    } else {
      setSelectedRecord([])
    }
  }

  // ✅ DELETE
  let deleteRecords = () => {
    if (selectedRecord.length >= 1) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {

        if (result.isConfirmed) {
          axios.post(`${apiBaseUrl}product/delete`, { ids: selectedRecord })
            .then((res) => res.data)
            .then((finalres) => {
              toast.success(finalres._message || "Deleted")
              getProduct()
              setSelectedRecord([])
            })
        }
      })
    }
  }

  // ✅ CHANGE STATUS
  let changeStatus = () => {
    if (selectedRecord.length > 0) {
      axios.post(`${apiBaseUrl}product/change-status`, { ids: selectedRecord })
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes._status) {
            getProduct()
            toast.success('Status Changed')
            setSelectedRecord([])
          }
        })
    } else {
      toast.error("Select at least one record")
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div>
      <ToastContainer />

      <div className='w-full min-h-[610px]'>
        <p className='px-6 py-3 border-b-2 border-[#ccc] font-semibold text-gray-700'>
          <Link to="/dashboard">Home</Link> / Product / Product Items
        </p>

        <div className='max-w-[1220px] mx-auto py-5'>

          {/* HEADER */}
          <div className='flex justify-between items-center bg-slate-100 p-4 rounded-t-md border'>
            <h2 className='text-2xl font-semibold'>Product Items</h2>

            <div className='flex gap-3'>
              <div className='bg-blue-600 p-3 rounded text-white'>
                <FaFilter />
              </div>

              <button onClick={changeStatus} className='bg-green-600 px-4 py-2 text-white rounded'>
                Change Status
              </button>

              <button onClick={deleteRecords} className='bg-red-600 px-4 py-2 text-white rounded'>
                Delete
              </button>
            </div>
          </div>

          {/* TABLE */}
          <table className='w-full border'>
            <thead className='bg-gray-700 text-white'>
              <tr>
                <th className='p-3'>
                  <input
                    type='checkbox'
                    onChange={allCheck}
                    checked={data.length > 0 && data.length === selectedRecord.length}
                  />
                </th>
                <th>S.No</th>
                <th>Product</th>
                <th>Parent</th>
                <th>Sub</th>
                <th>SubSub</th>
                <th>Image</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Detail</th>
              </tr>
            </thead>

            <tbody>
              {
                data.length === 0
                  ? (
                    <tr>
                      <td colSpan={10} className='text-center p-5'>No Data Found</td>
                    </tr>
                  )
                  : (
                    data.map((obj, index) => (
                      <tr key={obj._id} className='border text-center'>

                        <td>
                          <input
                            type='checkbox'
                            value={obj._id}
                            onChange={getCheckValue}
                            checked={selectedRecord.includes(obj._id)}
                          />
                        </td>

                        <td>{index + 1}</td>

                        <td>{obj.name}</td>

                        {/* ✅ SAFE FIX HERE */}
                        <td>{obj.parentCategory?.name || "N/A"}</td>
                        <td>{obj.subCategory?.name || "N/A"}</td>
                        <td>{obj.subSubCategory?.name || "N/A"}</td>

                        <td>
                          <img src={path + obj.image} width="60" />
                        </td>

                        <td>
                          {obj.status ? "Active" : "Inactive"}
                        </td>

                        <td>
                          <Link to={`/product/add/${obj._id}`}>
                            <FaPen />
                          </Link>
                        </td>

                        <td>
                          <Link to={`/product/view/${obj.slug}`}>
                            View
                          </Link>
                        </td>

                      </tr>
                    ))
                  )
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}