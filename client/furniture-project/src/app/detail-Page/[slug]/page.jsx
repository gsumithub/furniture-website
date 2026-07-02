"use client"
import React, { useEffect, useState } from 'react'
import axios from '@/utils/axiosInstance'
import { RiStarSFill } from 'react-icons/ri'
import { FaRegHeart } from 'react-icons/fa'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params?.slug
  const router = useRouter()
  const API = process.env.NEXT_PUBLIC_APIBASEURL

  const [product, setProduct] = useState(null)
  const [path, setPath] = useState('')
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!slug) return
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`home/product-details/${slug}`)
        if (res.data._status && res.data.data) {
          setProduct(res.data.data)
          setPath(res.data.path || '')
        }
      } catch (err) {
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [slug])

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Please login first')
        router.push('/login-register')
        return
      }
      await axios.post('cart/add', { productId: product._id, quantity: qty })
      setAdded(true)
      toast.success('Added to Cart!')
      window.dispatchEvent(new Event('cartUpdated'))
      setTimeout(() => setAdded(false), 2000)
    } catch (err) {
      toast.error('Error adding to cart. Please log in first.')
    }
  }

  const addToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        router.push('/login-register')
        return;
      }
      await axios.post("wishlist/add", { productId: product._id });
      toast.success("Added to wishlist");
    } catch (err) {
      toast.error("Error adding to wishlist");
    }
  };

  if (loading) {
    return (
      <div className='min-h-[400px] flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-12 h-12 border-4 border-[#C09578] border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-500'>Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='min-h-[400px] flex items-center justify-center text-center px-5'>
        <div>
          <h2 className='text-2xl font-bold font-serif mb-3'>Product Not Found</h2>
          <p className='text-gray-500 mb-5'>This product doesn&apos;t exist or has been removed.</p>
          <Link href='/' className='px-6 py-2 bg-[#C09578] text-white rounded hover:bg-black'>
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const discount = product.actualPrice && product.price
    ? Math.round(((product.actualPrice - product.price) / product.actualPrice) * 100)
    : 0

  return (
    <div className='border-y-2 border-[#ebebeb]'>
      <div className='max-w-[1320px] mx-auto py-10'>

        {/* Breadcrumb */}
        <p className='text-sm text-gray-500 mb-8 px-3'>
          <Link href='/' className='hover:text-[#C09578]'>Home</Link>
          {' '}/{' '}
          {product.parentCategory?.name && (
            <><span className='hover:text-[#C09578] cursor-pointer'>{product.parentCategory.name}</span>{' '}/{' '}</>
          )}
          <span className='text-[#C09578]'>{product.name}</span>
        </p>

        <div className='grid md:grid-cols-2 gap-10 px-3 mb-10'>
          {/* Image */}
          <div className='flex justify-center'>
            <img
              src={product.image && product.image.startsWith('http') ? product.image : `${path}${product.image}`}
              alt={product.name}
              className='max-h-[450px] object-contain w-full'
            />
          </div>

          {/* Details */}
          <div>
            <h1 className='font-semibold font-serif text-2xl mb-2'>{product.name}</h1>

            {/* Rating stars */}
            <div className='flex items-center gap-1 text-[#C09578] mb-4'>
              {[1,2,3,4,5].map(i => <RiStarSFill key={i} />)}
            </div>

            {/* Price */}
            <div className='flex items-center gap-3 mb-5 py-4 border-t border-b border-[#ebebeb]'>
              {product.actualPrice && (
                <span className='line-through text-[#A4A4A4] text-lg'>₹{product.actualPrice?.toLocaleString()}</span>
              )}
              <span className='font-bold text-[22px] text-[#C09578]'>₹{product.price?.toLocaleString()}</span>
              {discount > 0 && (
                <span className='bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-semibold'>{discount}% OFF</span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className='text-sm text-[#5A5A5A] pb-5 mb-5 border-b border-[#ebebeb] leading-relaxed'>
                {product.description}
              </p>
            )}

            {/* Qty + Add to cart */}
            <div className='flex items-center gap-4 mb-6'>
              <div className='flex items-center border border-gray-300'>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className='px-3 py-2 hover:bg-gray-100 text-lg font-bold'>−</button>
                <span className='px-4 py-2 border-x border-gray-300'>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className='px-3 py-2 hover:bg-gray-100 text-lg font-bold'>+</button>
              </div>
              <button
                onClick={addToCart}
                className={`flex-1 py-2 px-6 font-semibold text-white rounded duration-200 ${added ? 'bg-green-600' : 'bg-[#C09578] hover:bg-black'}`}
              >
                {added ? '✓ Added to Cart!' : 'Add To Cart'}
              </button>
              <button 
                onClick={addToWishlist}
                className='p-2 border border-gray-300 hover:border-[#C09578] hover:text-[#C09578] rounded cursor-pointer'
              >
                <FaRegHeart size={18} />
              </button>
            </div>

            {/* Specs */}
            <ul className='text-sm space-y-2 text-[#5A5A5A]'>
              {product.parentCategory?.name && (
                <li><span className='font-semibold text-black'>Category:</span> {product.parentCategory.name}</li>
              )}
              {product.subCategory?.name && (
                <li><span className='font-semibold text-black'>Sub Category:</span> {product.subCategory.name}</li>
              )}
              {product.color?.length > 0 && (
                <li>
                  <span className='font-semibold text-black'>Color:</span>{' '}
                  {product.color.map(c => c.name || c).join(', ')}
                </li>
              )}
              {product.material?.length > 0 && (
                <li>
                  <span className='font-semibold text-black'>Material:</span>{' '}
                  {product.material.map(m => m.name || m).join(', ')}
                </li>
              )}
              {product.stock !== undefined && (
                <li>
                  <span className='font-semibold text-black'>Stock:</span>{' '}
                  <span className={product.stock > 0 ? 'text-green-600' : 'text-red-500'}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Description tab */}
        {product.description && (
          <div className='px-3'>
            <h3 className='font-bold text-2xl text-[#C09578] pb-5 border-b-2 border-[#ebebeb]'>Description</h3>
            <p className='text-[#5A5A5A] py-5 leading-relaxed'>{product.description}</p>
          </div>
        )}

      </div>
    </div>
  )
}
