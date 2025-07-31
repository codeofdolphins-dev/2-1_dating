import React from 'react'
import Button from 'react-bootstrap/Button';
import videocardImg from "../../../../assets/cardImgs/Images/Img.png";

const VideosTab = () => {
  return (
    <>
      <div className="">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div className="">
            <Button variant="primary" className='px-4' style={{ borderRadius: "0", fontSize: "14px" }}>Approve</Button>
            <Button variant="secondary" className='px-4' style={{ borderRadius: "0", fontSize: "14px" }}>Pending</Button>
          </div>
          <Button variant="primary" className='px-4' style={{ borderRadius: "20px", fontSize: "14px" }}>Add Video</Button>
        </div>

        <div
          className="mt-3 position-relative"
          style={{
            width: "210px",
            height: "180px",
          }}
        >
          <img
            src={videocardImg}
            alt=""
            className="d-block w-100 h-100"
            style={{
              borderRadius: "10%",
              objectFit: "cover",
            }}
          />
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ zIndex: 2, cursor: "pointer" }}
            onClick={() => onClick()}
          >
            <div
              className="rounded-circle d-flex justify-content-center align-items-center"
              style={{
                width: 35,
                height: 35,
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <span
                className="text-white fs-5"
                style={{ marginBottom: "3px" }}
              >
                &#9658;
              </span>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default VideosTab