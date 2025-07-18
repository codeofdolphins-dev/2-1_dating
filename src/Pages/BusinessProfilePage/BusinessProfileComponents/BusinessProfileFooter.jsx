import React from 'react'

const BusinessProfileFooter = () => {
    return (
        <>
            <footer className=" text-light pt-5 pb-3" style={{ backgroundColor: "#030722" }}>
                <div className="container">
                    <div className="row text-start gy-4 justify-content-between">
                        {/* Brand Info */}
                        <div className="col-md-3">
                            <h6 className="fw-bold">2+1</h6>
                            <p className=" small" style={{ color: "#9ca3af" }}>
                                The premier lifestyle community for <br /> open-minded individuals and <br />couples since 2008.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="col-md-2">
                            <h6 className="fw-bold mb-3">Quick Links</h6>
                            <ul className="list-unstyled   small">
                                <li className='pb-2'><a href="#" className="  text-decoration-none" style={{ color: "#9ca3af" }}>Home</a></li>
                                <li className='pb-2'><a href="#" className="  text-decoration-none" style={{ color: "#9ca3af" }}>About Us</a></li>
                                <li className='pb-2'><a href="#" className="  text-decoration-none" style={{ color: "#9ca3af" }}>Blog</a></li>
                                <li className='pb-2'><a href="#" className="  text-decoration-none" style={{ color: "#9ca3af" }}>Success Stories</a></li>
                                <li className='pb-2'><a href="#" className="  text-decoration-none" style={{ color: "#9ca3af" }}>Contact</a></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className="col-md-2">
                            <h6 className="fw-bold mb-3">Legal</h6>
                            <ul className="list-unstyled   small">
                                <li className='pb-2'><a href="#" className="  text-decoration-none" style={{ color: "#9ca3af" }}>Terms of Service</a></li>
                                <li className='pb-2'><a href="#" className="  text-decoration-none" style={{ color: "#9ca3af" }}>Privacy Policy</a></li>
                                <li className='pb-2'><a href="#" className="  text-decoration-none" style={{ color: "#9ca3af" }}>Cookie Policy</a></li>
                                <li className='pb-2'><a href="#" className="  text-decoration-none" style={{ color: "#9ca3af" }}>Community Guidelines</a></li>
                            </ul>
                        </div>

                        {/* Social + Newsletter */}
                        <div className="col-md-4">
                            <h6 className="fw-bold mb-3">Connect With Us</h6>
                            <div className="mb-3">
                                <a
                                    href="#"
                                    className="me-3 d-inline-flex align-items-center justify-content-center rounded-circle"
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        backgroundColor: "var(--color-success-green)",
                                    }}
                                    aria-label="Facebook"
                                >
                                    <i className="bi bi-facebook text-black"></i>
                                </a>


                                <a href="#" className="me-3 d-inline-flex align-items-center justify-content-center rounded-circle "
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        backgroundColor: "var(--color-success-green)",
                                    }}>
                                    <i className="bi bi-instagram text-black"></i>
                                </a>

                                <a href="#" className="me-3 d-inline-flex align-items-center justify-content-center rounded-circle "
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        backgroundColor: "var(--color-success-green)",
                                    }}>
                                    <i className="bi bi-youtube text-black"></i>
                                </a>

                                <a href="#" className="me-3 d-inline-flex align-items-center justify-content-center rounded-circle "
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        backgroundColor: "var(--color-success-green)",
                                    }}>
                                    <i className="bi bi-twitter text-black"></i>
                                </a>
                            </div>
                            <h6 className="" style={{ color: "#9ca3af" }}>Subscibe to our newsletter</h6>
                            <form className="d-flex w-lg-75">
                                <input
                                    type="email"
                                    className="form-control text-white me-2 custom-placeholder"
                                    placeholder="Your email"
                                    style={{
                                        backgroundColor: "#050A30",
                                        border: "1px solid #4b5563",
                                        color: "#ffffff",
                                    }}
                                />
                                <button type="submit" className="btn btn-primary px-3 primary-button"><i className="bi bi-arrow-right"></i></button>
                            </form>
                        </div>
                    </div>

                    <hr className="border-secondary my-4" />

                    <div className="text-center   small" style={{ color: "#9ca3af" }}>
                        © 2023 2+1. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    )
}

export default BusinessProfileFooter