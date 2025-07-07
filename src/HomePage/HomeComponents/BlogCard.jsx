import React from 'react'
import cardImg from "../HomePictures/card-img.jpg"

const BlogCard = () => {
    return (
        <>
            <div className='col-lg-4 col-sm-6 col-12 mb-3'>
                <div className="card border-0 bg-transparent">
                    <img
                        className="card-img-top "
                        src={cardImg}
                        alt="Card content"

                    />
                    <div className="card-body px-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
                        <h5 className="card-title text-white">Card title</h5>
                        <p className="card-text text-white-50">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" style={{textDecoration: "none"}}>Read More</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard