import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export const loginSlice = createSlice({
  name: 'auth',
  initialState:{
    token: Cookies.get('token') || null,
  },
  reducers: {
    setToken:(state, action)=>{
      state.token = action.payload
      Cookies.set('token', state.token)
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', state.token)
      }
    },
    logOut:(state)=>{
      state.token = null
      Cookies.remove('token')
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
      }
    }
  },
})

export const { setToken, logOut } = loginSlice.actions

export default loginSlice.reducer