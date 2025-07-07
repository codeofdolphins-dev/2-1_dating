import React from 'react'
import locationPic from "../HomePictures/location.png"
import callPic from "../HomePictures/telephone.png"
import emailPic from "../HomePictures/email.png"

const ContactUs = () => {
    return (
        <>
            <div className='container-fluid' style={{ backgroundColor: "#2c3034" }} id='contact'>
                <div className='container pt-5 pb-5'>
                    <div>
                        <div className='text-white display-6 fw-semibold mb-3 text-center'>Contact Us</div>
                        <div className='text-center' style={{ color: "#9ca3af" }}>Have questions? We're here to help</div>
                    </div>
                </div>

                <div className="container pb-5">
                    <div className="row  text-white  p-4 g-5">
                        {/* Form Section */}
                        <div className="col-lg-6">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label" style={{color: "#d1d5db"}}>Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control text-white"
                                        style={{
                                            backgroundColor: "#343a40",
                                            border: "1px solid #4b5563",
                                        }}
                                    />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label" style={{color: "#d1d5db"}}>Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name='email'
                                        className="form-control text-white"
                                        style={{
                                            backgroundColor: "#343a40",
                                            border: "1px solid #4b5563",
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="subject" className="form-label" style={{color: "#d1d5db"}}>Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className="form-control text-white"
                                        style={{
                                            backgroundColor: "#343a40",
                                            border: "1px solid #4b5563",
                                        }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="form-label" style={{color: "#d1d5db"}}>Message</label>
                                    <textarea
                                        id="message"
                                        rows="7"
                                        className="form-control text-white"
                                        style={{
                                            backgroundColor: "#343a40",
                                            border: "1px solid #4b5563",
                                        }}
                                    ></textarea>

                                </div>
                                <button type="submit" className="btn btn-primary w-100">Send Message</button>
                            </form>
                        </div>

                        {/* Contact Info Section */}
                        <div className="col-lg-6 rounded-3 p-4" style={{ backgroundColor: "#343a40" }}>
                            <h5 className="fw-bold mb-4 h5">Contact Information</h5>

                            <div className="mb-4">
                                <div className="d-flex align-align-items-center gap-3">
                                    <div>
                                        <img src={locationPic} height={20} alt="Location Icon" />
                                    </div>
                                    <div>
                                        <div className="fw-semibold h5 text-white mb-1">Address</div>
                                        <div style={{ color: "#9ca3af" }}>
                                            123 Lifestyle Avenue, Suite 456<br />
                                            Miami, FL 33101
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="mb-4">
                                <div className="d-flex align-align-items-center gap-3">
                                    <div>
                                        <img src={callPic} height={20} alt="Location Icon" />
                                    </div>
                                    <div>
                                        <div className="fw-semibold h5 text-white mb-1">Phone</div>
                                        <div style={{ color: "#9ca3af" }}>
                                            +1 (800) 123-4567<br />Mon–Fri, 9am–6pm EST
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="d-flex align-align-items-center gap-3">
                                    <div>
                                        <img src={emailPic} height={20} alt="Location Icon" />
                                    </div>
                                    <div>
                                        <div className="fw-semibold h5 text-white mb-1">Email</div>
                                        <div style={{ color: "#9ca3af" }}>
                                            support@2plus1.com<br />help@2plus1.com
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs