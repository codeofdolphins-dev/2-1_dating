import React from 'react'
import Navbar from './HomeComponents/Navbar'
import HeroSection from './HomeComponents/HeroSection'
import StatsCounter from './HomeComponents/StatsCounter'
import { About } from './HomeComponents/About'
import WhyChooseUs from './HomeComponents/WhyChooseUs'
import OurBlog from './HomeComponents/OurBlog'
import SuccessStories from './HomeComponents/SuccessStories'
import JoinOurComunity from './HomeComponents/JoinOurComunity'
import ContactUs from './HomeComponents/ContactUs'
import Footer from './HomeComponents/Footer'

export const Home = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <StatsCounter/>
    <About/>
    <WhyChooseUs/>
    <OurBlog/>
    <SuccessStories/>
    <JoinOurComunity/>
    <ContactUs/>
    <Footer/>
    </>
  )
}
