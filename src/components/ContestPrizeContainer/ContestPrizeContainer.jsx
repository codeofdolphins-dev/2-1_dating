import React from 'react';
// import './Contest.css';

import banner from "../../assets/priceImg/dirty-poierty-banner.png"
import iconicBox from "../../assets/priceImg/iconic-box.png"

import "./contestPriceCss.css"

const ContestPrizeContainer = () => {
  return (
    <div className="text-white py-5 container">
      {[1, 2].map((_, index) => (
        <div className="container mb-5" key={index}>
          {/* Contest Banner */}
          <div className="text-center mb-3">
            <img
              src={banner} // Replace with your image path
              alt="Dirty Poetry Banner"
              className="img-fluid"
              
            />
          </div>

          {/* Prize Details */}
          <div className="text-center mb-4">
            <h4>Win $500 Cash</h4>
            <p className='fw-light'>24 & M+ Writers Spring Celebration</p>
          </div>

          <hr />

          {/* Box Description */}
          <div className="text-center px-md-5 px-3 my-3 mb-4">
            <h4>The Most Iconic Box</h4>
            <p className='mt-4'>
              A very special selection of 12 of our favorites and our most iconic items.Inside The Most Iconic Box you will find every pleasure instrument needed for a night overflowing with seduction and bliss.The perfect recipe for acquainting yourself with the world of eroticism, for going to new levels with your partner or for enjoying all on your own.The accessories that you deserve at an irresistible price.Value $205-195€(box value when buying products separately: $290-300€)
            </p>
          </div>
         
          {/* Iconic Box Grid */}
          <div className="position-relative text-center">
            <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
              <img src={iconicBox} alt="" className="iconic-img " />
            </div>
             <hr />
            {/* Center Circle Overlay */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContestPrizeContainer;
