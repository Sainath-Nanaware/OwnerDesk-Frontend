import React, { useEffect } from 'react'
import Header from '../../components/layouts/Header'
import HeroSection from '../../components/layouts/HeroSection'
import { logOutAsyncThunk } from '../../features/auth/authSlice'

function Home() {
  useEffect(()=>{
    logOutAsyncThunk()
  })
  return (
      <>
          <Header isLoggedIn={false} />
          <HeroSection/>
      </>
  )
}

export default Home
