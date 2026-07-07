import React from 'react'
import Header from '../../components/layouts/Header'
import HeroSection from '../../components/layouts/HeroSection'

function Home() {
  return (
    <>
        <Header isLoggedIn={false} />
        <HeroSection/>
    </>
  )
}

export default Home
