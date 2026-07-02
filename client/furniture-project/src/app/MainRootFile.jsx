"use client"
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './redox/store'
import { Toaster } from 'react-hot-toast'

export default function MainRootFile({children}) {
  return (
    <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </Provider>
  )
}
