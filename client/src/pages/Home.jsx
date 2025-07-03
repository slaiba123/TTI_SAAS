import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import IntroSection from '../components/Intro_section'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Header/>
      <Steps/>
      <IntroSection/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default Home