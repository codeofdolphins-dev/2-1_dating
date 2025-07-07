import React from 'react'

import Card from './BlogCard'

const OurBlog = () => {
    return (
        <>
            <div className='container-fluid' style={{ backgroundColor: "#343a40" }} id='blog'>
                <div className='container py-5'>
                    <div style={{marginBottom: "80px"}}>
                        <div className='text-white display-6 fw-semibold mb-3 text-center'>Latest From Our Blog</div>
                        <div className='text-center' style={{ color: "#9ca3af" }}>Tips, stories, and advice from our community</div>
                    </div>

                    <div className='mt-5'>
                        <div className='row'>
                            <Card/>
                            <Card/>
                            <Card/>
                        </div>
                    </div>

                    <div className='d-flex justify-content-center mt-5'>
                         <button type="button" className="btn btn-primary px-3 py-2 display-4 d-flex align-middle">View All Articles</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OurBlog