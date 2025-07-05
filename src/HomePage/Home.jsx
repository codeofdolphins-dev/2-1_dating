import React from 'react'
import Navbar from './HomeComponents/Navbar'
import HeroSection from './HomeComponents/HeroSection'
import StatsCounter from './HomeComponents/StatsCounter'
import { About } from './HomeComponents/About'
import WhyChooseUs from './HomeComponents/WhyChooseUs'
import OurBlog from './HomeComponents/OurBlog'

export const Home = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <StatsCounter/>
    <About/>
    <WhyChooseUs/>
    <OurBlog/>
    </>
  )
}
