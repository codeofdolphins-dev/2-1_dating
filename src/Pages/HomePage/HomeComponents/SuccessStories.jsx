import React from 'react'

import SuccssStoryCard from './SuccssStoryCard'

const SuccessStories = () => {
    return (
        <>
            <div className='container-fluid primary-background-color'  id='stories'>
                <div className='container py-5'>
                    <div style={{marginBottom: "80px"}}>
                        <div className='text-white display-6 fw-semibold mb-3 text-center'>Success Stories</div>
                        <div className='text-center' style={{ color: "#9ca3af" }}>Hear from our members about their experience</div>
                    </div>

                    <div className='mt-5'>
                        <div className="row g-4 ">
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <SuccssStoryCard />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <SuccssStoryCard />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <SuccssStoryCard />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SuccessStories