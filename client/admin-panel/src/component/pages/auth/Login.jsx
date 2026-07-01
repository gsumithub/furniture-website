import React from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

export default function Login() {
  let navigate = useNavigate()
  
  let login = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      const apiBaseUrl = import.meta.env.VITE_APIBASEURL || "http://localhost:7000/admin-api/"
      const res = await axios.post(`${apiBaseUrl}login`, { email, password })

      if (res.data._status) {
        localStorage.setItem("adminToken", res.data.token)
        navigate('/dashboard')
      } else {
        alert(res.data._message || "Invalid credentials")
      }
    } catch (err) {
      alert("Error connecting to login server")
    }
  }
  return (
    <div>
      <div className="min-h-screen flex  items-center justify-center bg-gray-100 p-6">
        <div >
            <div className='flex items-center justify-center gap-3 mb-6'>
              <img 
                src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"  
                alt="Minista Logo" 
                className="h-10 object-contain"
              />
              <span className="text-xl font-bold font-serif tracking-wider text-gray-800 border-l border-gray-300 pl-3">
                ADMIN PANEL
              </span>
            </div>
            
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign in to your account</h2>

              <form onSubmit={login} className="space-y-5" >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </form>

              
            </div>
        </div>
        
      </div>
    </div>
  )
}
