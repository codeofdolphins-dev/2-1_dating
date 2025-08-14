import React from 'react'
import PageWrapper from '../../components/PageWrapper'

const ProfileAccount = () => {
    return (
        <>
            <PageWrapper >
                <div className="container-fluid mt-5 pt-5 px-3 d-flex flex-column align-items-start justify-content-start gap-2 text-white">

                    <div className="w-100">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="">
                                    <h3>Account</h3>
                                </div>
                            </div>
                            <div className="col-lg-4" style={{ fontSize: "14px" }}>
                                <div className="d-flex gap-3 justify-content-center align-items-center">
                                    <button className='custom-button py-2 px-4 rounded-4 border-0'>Subscription</button>
                                    <button className=''>Change profile name</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </PageWrapper>
        </>
    )
}

export default ProfileAccount