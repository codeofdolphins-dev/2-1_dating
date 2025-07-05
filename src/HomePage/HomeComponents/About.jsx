import React from 'react'
import AboutImg from "../HomePictures/couple.webp"

export const About = () => {
  return (
    <>
    <div className='container-fluid' style={{backgroundColor: "#343a40"}}>
    <div className='container py-5'>
        <div className='text-white display-5 fw-semibold mb-4 text-center'>About 2+1</div>
        <div className='text-center' style={{color: "#9ca3af"}}>Discover a world of exciting possibilities and connections</div>

        <div className='container py-5 my-4'>
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
            <button className='btn btn-primary h5 mt-3 px-4 py-2'>
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
