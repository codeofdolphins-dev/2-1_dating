import React from 'react'

import Card from './BlogCard'

const OurBlog = () => {
    return (
        <>
            <div className='container-fluid' style={{ backgroundColor: "#343a40" }}>
                <div className='container py-5'>
                    <div>
                        <div className='text-white display-5 fw-semibold mb-4 text-center'>Latest From Our Blog</div>
                        <div className='text-center' style={{ color: "#9ca3af" }}>Tips, stories, and advice from our community</div>
                    </div>

                    <div className='mt-5'>
                        <div className='row'>
                            <Card/>
                            <Card/>
                            <Card/>
                        </div>
                    </div>

                    {/* <div className=''>
                         <button type="button" class="btn btn-primary px-5 py-2 display-4 d-flex align-middle">Primary</button>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default OurBlog