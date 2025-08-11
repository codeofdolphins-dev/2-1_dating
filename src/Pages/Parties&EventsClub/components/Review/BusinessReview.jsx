import React from 'react'

import starIcon from "../../../../assets/ViwCardImags/img/star.png";
import dummyProfileImage from "../../../../assets/ViwCardImags/img/couple6.jpeg";


const BusinessReview = ({ review }) => {
    return (
        <>
            <div className="row">
                <div className="col-lg-1 mb-4 ps-lg-0 ps-md-3">
                    <div className="d-flex justify-content-lg-end justify-content-start">
                        <img
                            src={dummyProfileImage}
                            alt="profile"
                            width="49"
                            height="49"
                            className="rounded-circle"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>


                <div className="col-lg-11 mb-4 ">
                    <div className="">
                        <h3 style={{ fontSize: "16px" }}> {review?.title || "JUSTONCE"} <span style={{ fontSize: "10px", color: "#B0C3CC" }}>{review.date || "Friday, October 4, 2024"}</span> </h3>

                        <div className="d-flex justify-content-start align-items-center g-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <img src={starIcon} alt="star" key={i} />
                            ))}
                        </div>

                        <p style={{ fontSize: "14px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid labore voluptatum architecto reprehenderit quasi ullam aspernatur quaerat! Rerum iusto, voluptate ab omnis culpa praesentium ad, a itaque quisquam laboriosam consequatur.</p>
                    </div>
                </div>


            </div>
        </>
    )
}

export default BusinessReview