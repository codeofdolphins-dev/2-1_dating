import React from 'react'
import "../BusinessProfileCss/BusinessProfile.css"

const BusinessProfileForm = () => {
    const options = [
        "Promote events / parties",
        "Build an audience / community",
        "Promote your club",
        "Promote your BNB / Hotel / Resort",
        "Sell a product / service",
        "Interest in paid advertising",
    ];
    return (
        <>

            <div className="container my-5 text-white" >
                <h3 className="mb-4 fw-bold">REQUEST YOUR 2+1 BUSINESS PROFILE!</h3>
                <p>Please provide us with some details below to help us determine if you qualify for a 2+1 business profile.</p>
                <p className="text-danger">Fields with * are mandatory.</p>

                {/* 1st Form  */}
                <form action="" className='mt-5'>
                    <div className='row'>
                        <div className='col-lg-4 col-sm-6 mb-3'>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="form-control custom-input-dark"
                            />
                        </div>

                        <div className='col-lg-4 col-sm-6 mb-3'>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="form-control custom-input-dark"
                            />
                        </div>

                        <div className='col-lg-4 col-sm-6 mb-3'>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="form-control custom-input-dark"
                            />
                        </div>

                        <div className='col-lg-4 col-sm-6 mb-3'>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="form-control custom-input-dark"
                            />
                        </div>

                        <div className='col-lg-4 col-sm-6 mb-3'>
                            <input
                                type="text"
                                placeholder="Company Name"
                                className="form-control custom-input-dark"
                            />
                        </div>

                        <div className='col-lg-4 col-sm-6 mb-3'>
                            <input
                                type="text"
                                placeholder="Web URL"
                                className="form-control custom-input-dark"
                            />
                        </div>

                    </div>
                </form>

                <h4 className="mt-5 fw-semibold">Where are you located? *</h4>
                {/* 2nd form */}
                <form action="" className='mt-4'>
                    <div className="row">
                        <div className="col-lg-4 col-sm-6 mb-3">
                            <select className="form-select custom-input-dark" defaultValue="">
                                <option value="" disabled>Select Country</option>
                                <option value="india">India</option>
                                <option value="usa">USA</option>
                                <option value="uk">UK</option>
                                {/* Add more countries here */}
                            </select>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <select className="form-select custom-input-dark" defaultValue="">
                                <option value="" disabled>Select State</option>
                                <option value="maharashtra">Maharashtra</option>
                                <option value="california">California</option>
                                <option value="london">London</option>
                                {/* Add more states here */}
                            </select>
                        </div>
                    </div>

                </form>

                <div className="form-group text-white d-flex flex-column flex-md-row align-items-start gap-5 mt-3">
                    <label className="fw-semibold me-3">
                        Are you already a member of 2+1?
                    </label>

                    <div className="d-flex align-items-center gap-3">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input custom-radio"
                                type="radio"
                                name="membership"
                                id="no"
                                value="no"
                            />
                            <label className="form-check-label" htmlFor="no">No</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input custom-radio"
                                type="radio"
                                name="membership"
                                id="yes"
                                value="yes"
                            />
                            <label className="form-check-label" htmlFor="yes">Yes</label>
                        </div>
                    </div>
                </div>

                <div className="form-group text-white mt-5">
                    <label className="fw-semibold mb-4">
                        What would you like to achieve? (Check all that apply)*
                    </label>
                    <div className="row">
                        {options.map((option, index) => (
                            <div className="col-md-3 mb-2 mt-1" key={index}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input custom-checkbox"
                                        type="checkbox"
                                        id={`option${index}`}
                                    />
                                    <label className="form-check-label" htmlFor={`option${index}`}>
                                        {option}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group text-white mt-4">
                    <label className="fw-semibold mb-2">
                        How did you find out about 2+1?*
                    </label>
                    <div className='row mt-2'>
                        <div className='col-lg-3'>
                            <select className="form-select custom-input-dark" required>
                                <option value="">A friend</option>
                                <option value="social">Social Media</option>
                                <option value="ad">Online Advertisement</option>
                                <option value="event">An Event</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mb-3 text-white mt-4">
                    <label htmlFor="howFound" className="form-label pb-2">
                        Tell us more about how you found us!
                    </label>
                    <div className="row">
                        <div className="col-lg-12">
                            <textarea
                                id="howFound"
                                name="howFound"
                                rows="4"
                                className="form-control custom-textarea-dark"
                                placeholder="Type here..."
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="mb-3 text-white ">
                    <label htmlFor="howFound" className="form-label pb-2">
                        Tell us more about how you found us!
                    </label>
                    <div className="row">
                        <div className="col-lg-12">
                            <textarea
                                id="howFound"
                                name="howFound"
                                rows="4"
                                className="form-control custom-textarea-dark"
                                placeholder="Type here..."
                            ></textarea>
                        </div>
                    </div>
                </div>

                <button className="btn custom-submit-btn mt-2">
                    Request your 2+1 business profile!
                </button>

            </div>

        </>
    )
}

export default BusinessProfileForm