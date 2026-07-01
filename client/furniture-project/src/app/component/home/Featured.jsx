"use client"
import React, { useEffect, useState } from 'react'
import axios from "@/utils/axiosInstance"
import ProductCard from './ProductCard'

export default function Featured() {

  const [products, setProducts] = useState([])
  const [path, setPath] = useState("")
  const API = process.env.NEXT_PUBLIC_APIBASEURL

  const fetchData = async () => {
    try {
      const res = await axios.get("home/best-selling")
      if (res.data._status) {
        setProducts(res.data.data)
        setPath(res.data.path)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='flex justify-center'>
      <div className='grid xl:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-6 py-10 px-5'>

        {products.map((obj) => (
          <ProductCard
            key={obj._id}
            productId={obj._id}
            path={obj.image && obj.image.startsWith('http') ? obj.image : `${path}${obj.image}`}
            title={obj.name}
            price={obj.price}
            discountPri={obj.actualPrice}
            slug={obj.slug}
          />
        ))}

      </div>
    </div>
  )
}