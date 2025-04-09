import React from 'react'
import { Header } from '../components/home/Header'
import { Footer } from '../components/home/Footer'
import { Hero } from '../components/home/Hero'
import { HowItWorks } from '../components/home/HowItWorks'
import { Pricing } from '../components/home/Pricings'
import { Testimonials } from '../components/home/Testimonals'
import { Features } from '../components/home/Features'
import { CallToAction } from '../components/home/CallToAction'

const HomePage = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <Features/>
      <HowItWorks/>
      <Pricing/>
      <Testimonials/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default HomePage
