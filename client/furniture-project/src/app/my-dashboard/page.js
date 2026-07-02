'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Testimonial from '../component/common/Testimonial';
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { logOut } from '../redox/loginSlice';
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedTitle, setSelectedTitle] = useState("Mr.");

    let [userData, setUserData] = useState(null)

    let token = useSelector((state) => state.authStore.token)
    let apiBaseUrl=process.env.NEXT_PUBLIC_APIBASEURL
    let dispatch = useDispatch()

    let logOutUser = () => {    
        localStorage.removeItem("token");
        dispatch(logOut())
        window.location.href = "/";
    }

    let changePassword=(e)=>{
        e.preventDefault()
        let obj={
            oldPassword:e.target.oldPassword.value,
            newPassword:e.target.newPassword.value,
            confirmPassword:e.target.confirmPassword.value
        }

        axios.post(`${apiBaseUrl}auth/change-password`,
            obj,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }

        )
        .then(res=>res.data)
        .then((finalRes)=>{
            if(finalRes._status){
                toast.success(finalRes._message)
            }
            else{
                toast.error(finalRes._message) 
            }
        })
    }



    let getuserData=()=>{
        axios.post(`${apiBaseUrl}auth/get-data`,
            {},
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }

        )
        .then((res)=>res.data)
        .then((finalRes)=>{
            setUserData(finalRes.userData);
            console.log(finalRes);
            
        })
    }

    useEffect(()=>{
        getuserData()
    },[token])


    return (

        <>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
            <Testimonial title="My Dashboard" />

            <div className='border-b-2 border-[#ebebeb]'>
                <div className='max-w-[1320px] mx-auto py-10 px-3'>
                    <div className='grid md:grid-cols-[25%_auto] gap-6 '>
                        <div>

                            <button onClick={() => setActiveTab('dashboard')}
                                className={`text-white  py-2 px-4 rounded-[5px] font-semibold w-full mb-3 ${activeTab === 'dashboard' ? 'bg-[#c09578]' : 'bg-black'}`}>
                                My Dashboard
                            </button>

                            <button onClick={() => setActiveTab('orders')}
                                className={`text-white  py-2 px-4 rounded-[5px] font-semibold w-full mb-3 ${activeTab === 'orders' ? 'bg-[#c09578]' : 'bg-black'}`}>
                                Orders
                            </button>

                            <button onClick={() => setActiveTab('address')}
                                className={`text-white  py-2 px-4 rounded-[5px] font-semibold w-full mb-3 ${activeTab === 'address' ? 'bg-[#c09578]' : 'bg-black'}`}>
                                Address
                            </button>

                            <button onClick={() => setActiveTab('profile')}
                                className={`text-white  py-2 px-4 rounded-[5px] font-semibold w-full mb-3 ${activeTab === 'profile' ? 'bg-[#c09578]' : 'bg-black'}`}>
                                My Profile
                            </button>

                            <button onClick={() => setActiveTab('changePassword')}
                                className={`text-white  py-2 px-4 rounded-[5px] font-semibold w-full mb-3 ${activeTab === 'changePassword' ? 'bg-[#c09578]' : 'bg-black'}`}>
                                Change Password
                            </button>

                            <button
                                onClick={logOutUser}
                                className='text-white  py-2 px-4 rounded-[5px] font-semibold w-full mb-3 bg-black'>
                                Logout
                            </button>
                        </div>

                        <div>
                            {/* Dashboard Content */}
                            {activeTab === 'dashboard' && (
                                <div className=''>
                                    <h3 className='font-serif font-semibold text-xl'>My Dashboard</h3>
                                    <p className='mt-5'>From your account dashboard, you can easily check & view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
                                </div>
                            )}

                            {/* Orders Content */}
                            {activeTab === 'orders' && (
                                <div className=''>
                                    <h3 className='font-serif font-semibold text-xl mb-5'>Orders</h3>
                                    <div className='w-full overflow-x-auto rounded border border-gray-200 shadow-sm'>
                                        <table className="w-full text-center border-collapse min-w-[600px]">
                                            <thead className='bg-[#f2f2f2] border-b'>
                                                <tr className='font-serif font-semibold text-gray-700'>
                                                    <th className='p-3'>Order</th>
                                                    <th className='p-3'>Date</th>
                                                    <th className='p-3'>Status</th>
                                                    <th className='p-3'>Total</th>
                                                    <th className='p-3'>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='border-b hover:bg-gray-50 transition-colors'>
                                                    <td className='p-3 text-gray-700'>1</td>
                                                    <td className='p-3 text-gray-600'>May 10, 2018</td>
                                                    <td className='p-3'><span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded font-semibold">Completed</span></td>
                                                    <td className='p-3 text-gray-700 font-medium'>Rs. 25.00 for 1 item </td>
                                                    <td className='p-3'><Link href="/product-details/your_product_name" className="text-[#C09578] hover:underline font-semibold text-sm">view</Link></td>
                                                </tr>
                                                <tr className='border-b hover:bg-gray-50 transition-colors'>
                                                    <td className='p-3 text-gray-700'>2</td>
                                                    <td className='p-3 text-gray-600'>May 10, 2018</td>
                                                    <td className='p-3'><span className="bg-amber-100 text-amber-700 text-xs px-2.5 py-1 rounded font-semibold">Processing</span></td>
                                                    <td className='p-3 text-gray-700 font-medium'>Rs. 17.00 for 1 item </td>
                                                    <td className='p-3'><Link href="/product-details/your_product_name" className="text-[#C09578] hover:underline font-semibold text-sm">view</Link></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Address Content */}
                            {activeTab === 'address' && (
                                <div className=''>
                                    <p>The following addresses will be used on the checkout page by default.</p>

                                    <div className='grid md:grid-cols-2 gap-6 mt-5'>

                                        <div>
                                            <h4 className="font-serif font-semibold text-xl mb-5">Billing address</h4>

                                            <div className=" ">

                                                <form className="p-5 border-1 border-[#ebebeb] rounded-[5px]" >


                                                    <div className="form-group has-feedback">
                                                        <label htmlFor="name" className=' ' >Billing Name*</label>
                                                        <input type="text" className="mt-1 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />
                                                    </div>



                                                    <div className="form-group has-feedback">
                                                        <label htmlFor="name">Billing Email*</label>
                                                        <input type="email" className="mt-1 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />                                                        </div>



                                                    <div className="form-group has-feedback">
                                                        <label htmlFor="name">Billing Mobile Number*</label>
                                                        <input type="tel" className="mt-1 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />                                                        </div>



                                                    <div className="form-group has-feedback">
                                                        <label htmlFor="name">Billing Address*</label>
                                                        <input type="text" className="mt-1 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />                                                        </div>


                                                    <div className=" ">
                                                        <label htmlFor="name" className=''>Country*</label>
                                                        <br />
                                                        <select className="mt-1 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px]  ">
                                                            <option >Select Country</option>
                                                            <option > Afghanistan</option>
                                                            <option > Albania</option>
                                                            <option > Algeria</option>
                                                            <option > American Samoa</option>
                                                            <option > Andorra</option>
                                                            <option >India</option>
                                                        </select>
                                                    </div>



                                                    <div className="">
                                                        <label htmlFor="billing_state">State*</label>
                                                        <input type="text" className="mt-1 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />                                                        </div>



                                                    <div className="">
                                                        <label htmlFor="billing_city">City*</label>
                                                        <input type="text" className="mt-1 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />                                                        </div>

                                                    <br />
                                                    <div className="text-right">
                                                        <button type="submit" className="bg-[#c09578] text-white font-semibold py-2 px-5 rounded-2xl font-serif">Update</button>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-serif font-semibold text-xl mb-5">Shipping address</h4>

                                            <div className=" ">

                                                <form className="p-5 border-1 border-[#ebebeb] rounded-[5px]" >


                                                    <div className="form-group has-feedback">
                                                        <label htmlFor="name" className=' ' >Shipping Name*</label>
                                                        <input type="text" className="mt-1 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />
                                                    </div>



                                                    <div className="form-group has-feedback">
                                                        <label htmlFor="name">Shipping Email*</label>
                                                        <input type="email" className="mt-1 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />                                                        </div>



                                                    <div className="form-group has-feedback">
                                                        <label htmlFor="name">Shipping Mobile Number*</label>
                                                        <input type="tel" className="mt-1 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />                                                        </div>



                                                    <div className="form-group has-feedback">
                                                        <label htmlFor="name">Shipping Address*</label>
                                                        <input type="text" className="mt-1 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />                                                        </div>


                                                    <div className=" ">
                                                        <label htmlFor="name" className=''>Country*</label>
                                                        <br />
                                                        <select className="mt-1 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px]  ">
                                                            <option >Select Country</option>
                                                            <option > Afghanistan</option>
                                                            <option > Albania</option>
                                                            <option > Algeria</option>
                                                            <option > American Samoa</option>
                                                            <option > Andorra</option>
                                                            <option >India</option>
                                                        </select>
                                                    </div>



                                                    <div className="">
                                                        <label htmlFor="billing_state">State*</label>
                                                        <input type="text" className="mt-1 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />                                                        </div>



                                                    <div className="">
                                                        <label htmlFor="billing_city">City*</label>
                                                        <input type="text" className="mt-1 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />                                                        </div>

                                                    <br />
                                                    <div className="text-right">
                                                        <button type="submit" className="bg-[#c09578] text-white font-semibold py-2 px-5 rounded-2xl font-serif">Update</button>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>




                                    </div>

                                </div>
                            )}

                            {/* Profile Content */}
                            {activeTab === 'profile' && (
                                <div className=''>
                                    <h3 className='font-serif font-semibold text-xl mb-5'>My Profile</h3>
                                    <div className="login">

                                        <form className="p-5 border-1 border-[#ebebeb] rounded-[5px]">

                                            <div className="col-xl-12">
                                                <div className="input-radio">
                                                    <span className="me-5 font-semibold">
                                                        <input
                                                            type="radio"
                                                            value="Mr."
                                                            name="gender"
                                                            defaultValue={1}
                                                            checked={userData?.gender === 1}
                                                            className='me-2'

                                                        />
                                                        Mr.
                                                    </span>

                                                    <span className="font-semibold">
                                                        <input
                                                            type="radio"
                                                            value="Mrs."
                                                            name="gender"
                                                            defaultValue={2}
                                                            checked={userData?.gender === 2}
                                                            className='me-2'
                                                        />
                                                        Mrs.
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-5">
                                                <label htmlFor="name" className=' ' >Name*</label>
                                                <input 
                                                    type="text" 
                                                    defaultValue={userData?.name}
                                                    className="mt-2 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />
                                            </div>

                                            <div className="mt-5">

                                                <label htmlFor="name">Email*</label>
                                                <input 
                                                   type="email" readOnly defaultValue={userData?.email} className="mt-2 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />

                                            </div>

                                            <div className="mt-5">

                                                <label htmlFor="name">Mobile Number*</label>
                                                <input 
                                                    type="tel" 
                                                    defaultValue={userData?.phone} 
                                                    className="mt-2 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px]" 
                                                />

                                            </div>

                                            <div className="mt-5">

                                                <label htmlFor="name">Address*</label>
                                                <input 
                                                    type="text" 
                                                    defaultValue={userData?.address} 
                                                    className="mt-2 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px]" 
                                                />

                                            </div>


                                            <div className="text-right mt-5">
                                                <button type="submit" className="bg-[#c09578] text-white font-semibold py-2 px-5 rounded-2xl font-serif">Update</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            )}

                            {/* Change Password Content */}
                            {activeTab === 'changePassword' && (
                                <div className=''>
                                    <h3 className='font-serif font-semibold text-xl mb-5'>Change Password</h3>


                                    <form onSubmit={changePassword} className="p-5 border-1 border-[#ebebeb] rounded-[5px]">

                                        

                                        <div className="mt-5">
                                                <label htmlFor="name" className=' ' >Current Password</label>
                                                <input name='oldPassword' type="password" className="mt-2 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />
                                            </div>

                                        <div className="form-group has-feedback">
                                            <label>New Password</label>
                                            <input name='newPassword' type="password" className="mt-2 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />
                                        </div>

                                        <div className="form-group has-feedback">
                                            <label>Confirm Password</label>
                                            <input name='confirmPassword' type="password" className="mt-2 mb-3 w-full py-1 px-2 h-[40px] border border-[#ccc] rounded-[3px] " />
                                        </div>

                                        <br />
                                        
                                        <div className="text-right mt-5">
                                                <button type="submit" className="bg-[#c09578] text-white font-semibold py-2 px-5 rounded-2xl font-serif">Change Password</button>
                                            </div>

                                    </form>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>




        </>
    );
}