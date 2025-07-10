import React from 'react'
import AboutImg from "../HomePictures/couple.webp"
import "../HomeCss/home.css"

export const About = () => {
  return (
    <>
    {/* background color changed from style={{backgroundColor: "#343a40"}} to secondary-background-color*/}
    <div className='container-fluid secondary-background-color'  id='about'>
    <div className='container py-5'>
        <div className='text-white display-6 fw-semibold mb-3 text-center'>About 2+1</div>
        <div className='text-center' style={{color: "#9ca3af"}}>Discover a world of exciting possibilities and connections</div>

        <div className='container pt-5 mb-2' style={{marginTop:"20px"}}>
      <div className='row align-items-center g-5'>
        <div className='col-lg-6'>
          <img 
            src={AboutImg} 
            alt="About us" 
            className='img-fluid '
            style={{  width: '100%', objectFit: 'cover' }}
          />
        </div>
        
        <div className='col-lg-6'>
          <div className='ps-lg-4'>
            <p className='text-white h5 fw-semibold mb-3'>OUR STORY</p>
            <p className='h-4' style={{color: "#9ca3af"}}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, debitis similique consectetur tenetur officia laboriosam asperiores sapiente? Fugit distinctio architecto dolores tenetur dolor suscipit cupiditate est fugiat quasi autem unde aspernatur vitae tempore culpa dicta debitis quae ducimus numquam beatae earum, voluptatum sapiente.
            </p>

            <p className='h-4' style={{color: "#9ca3af"}}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, debitis similique consectetur tenetur officia laboriosam asperiores sapiente? Fugit distinctio architecto dolores tenetur dolor suscipit cupiditate est fugiat quasi autem unde aspernatur vitae tempore culpa dicta debitis quae ducimus numquam beatae earum, voluptatum sapiente.
            </p>

            {/* button color changed from style={{backgroundColor: "#2563eb"}} to primary-button*/}
            <button className='btn h5 mt-3 px-4 py-2  primary-button' >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </>
  )
}
