import React from 'react'
import couple from "../../../../assets/icons/couple.png";
import female from "../../../../assets/icons/female.png";
import male from "../../../../assets/icons/male.png";
import style from "../style.module.css";

const SaturdayTab = () => {
  return (
    <>
      <div className="row">
        <h5 className='my-2'>OPEN from <span className='text-danger'>3:00 PM until 2:00 AM</span></h5>

        <div className="col-lg-6 mb-4">
          <div className="">
            <h4 className='text-decoration-underline my-2'>Price</h4>
            <div className="d-flex justify-content-start align-items-center flex-wrap gap-3">

              <div className={`d-flex justify-content-center align-items-center flex-column rounded-3 py-3 px-4 ${style.price}`}>
                <img src={couple} alt="couple" width={"50px"} />
                <p className='mb-0'>Yes</p>
              </div>

              <div className={`d-flex justify-content-center align-items-center flex-column rounded-3 py-3 px-4 ${style.price}`}>
                <img src={female} alt="female" width={"50px"} />
                <p className='mb-0'>Yes</p>
              </div>

              <div className={`d-flex justify-content-center align-items-center flex-column rounded-3 py-3 px-4 ${style.price}`}>
                <img src={male} alt="male" width={"50px"} />
                <p className='mb-0'>No</p>
              </div>

            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="d-flex flex-column justify-content-center align-items-start gap-3">
            <h4 className='text-decoration-underline'>Extra Info</h4>
            <p className='mb-0'>Our website has all info</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SaturdayTab