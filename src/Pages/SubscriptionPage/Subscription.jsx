import React from 'react'
import Navbar from '../HomePage/HomeComponents/Navbar'
import SubscriptionCard from '../SubscriptionPage/SubscriptionComponent/SubscriptionCard'

const Subscription = () => {
    const check = <i class="bi bi-check-lg me-3 h5"></i>;
const cross = <i className="bi bi-x text-white me-2 h5"></i>;
    return (
        <>
            <div className='container-fluid' style={{ backgroundColor: "#1a1e21" }} >
                <Navbar />
                <div className='container  pb-5' style={{paddingTop: "150px"}}>
                    <div className='mb-4'>
                        <div className='text-white display-6 fw-semibold mb-3 text-center'>2+1 Premium Membership</div>
                        <div className='text-center' style={{ color: "#9ca3af" }}>Unlock all features and connect with like-minded individulas</div>
                    </div>

                    {/* Four card subscription */}
                    <div className="container py-5">
                        <div className="row g-4 justify-content-center">
                            <div className="col-lg-3 col-sm-6 col-lg-3">
                                <SubscriptionCard title="1 Month (30 DAYS)"
                                    duration="30"
                                    total="29.00"
                                    perMonth="29.00" />
                            </div>

                            <div className="col-lg-3 col-sm-6 col-lg-3">
                                <SubscriptionCard title="3 Months (90 DAYS)"
                                    duration="90"
                                    total="57.00"
                                    perMonth="19.00" />
                            </div>

                            <div className="col-lg-3 col-sm-6 col-lg-3">
                                <SubscriptionCard title="6 Months (180 DAYS)"
                                    duration="180"
                                    total="84.00"
                                    perMonth="14.00"
                                    isPopular={true} />
                            </div>

                            <div className="col-lg-3 col-sm-6 col-lg-3">
                                <SubscriptionCard title="12 Months (365 DAYS)"
                                    duration="365"
                                    total="138.00"
                                    perMonth="11.50" />
                            </div>
                        </div>
                    </div>

                    {/* Conatiner */}
                    <div className="container py-4">
                        <div
                            className="bg-dark text-white rounded-3 p-4"
                            style={{ backgroundColor: '#2c3034', fontSize: '0.9rem' }}
                        >
                            <p className="fw-semibold text-uppercase  mb-4" style={{ fontSize: '0.85rem', color: "#d1d5db" }} >
                                Account is automatically renewed unless you disable recurring billing on the account page before the renewal date.
                            </p>

                            <p className=" mb-3" style={{ color: "#9ca3af" }}>
                                Your digital content has been made available to you with your explicit prior consent, and you have confirmed that you therefore waive your right of withdrawal.
                            </p>

                            <p className="mb-3" style={{ color: "#9ca3af" }}>
                                The membership renewal fees will be based on the rates available at the time of renewal. If you renew, the new term will begin on the same day of renewal. 2+1 is not responsible for renewal charges if members fail to disable recurring billing. All sales are final, and no refunds will be issued.
                            </p>

                            <p className="mb-3" style={{ color: "#9ca3af" }}>
                                To update your credit card details, please use this page to process your next payment. Charges will appear on your credit card statement as 2+1 Media Inc.
                            </p>

                            <p className="mb-0" style={{ color: "#9ca3af" }}>
                                For any payment-related inquiries, please contact Member Support.
                            </p>
                        </div>
                    </div>

                    {/* Advantages */}
                    <div className="container py-5 ">
                        <div className="row text-white">
                            {/* Premium Advantages */}
                            <div className="col-lg-8 mb-4">
                                <h5 className="fw-bold h4 text-capitalize mb-4">YOUR PREMIUM ADVANTAGES</h5>

                                <div className="row">
                                    {/* Connections */}
                                    <div className="col-md-6 mb-4">
                                        <h5 className="text-uppercase fw-semibold h6 pb-1 text-white ">Connections</h5>
                                        <p className="mb-2" style={{ color: "#9ca3af" }}>{check}Unlimited messaging</p>
                                        <p className="mb-2" style={{ color: "#9ca3af" }}>{check}Member verification</p>
                                        <p className="mb-2" style={{ color: "#9ca3af" }}>{check}Send friend requests</p>
                                        <p className="mb-2" style={{ color: "#9ca3af" }}>{check}Broadcast to connections</p>
                                    </div>

                                    {/* Media */}
                                    <div className="col-md-6 mb-4">
                                        <h6 className="text-uppercase fw-semibold text-white h6 pb-1">Media</h6>
                                        <p className="mb-2" style={{ color: "#9ca3af" }}>{check}View full profiles</p>
                                        <p className="mb-2" style={{ color: "#9ca3af" }}>{check}Live video streaming</p>
                                        <p className="mb-2" style={{ color: "#9ca3af" }}>{check}Unlimited media uploads</p>
                                        <p className="mb-2" style={{ color: "#9ca3af" }}>{check}Private media sharing</p>
                                    </div>

                                    {/* Events */}
                                    <div className="col-md-6 mb-4">
                                        <h6 className="text-uppercase fw-semibold text-white h6 pb-1">Events</h6>
                                        <p className="mb-2" style={{ color: "#9ca3af" }}>{check}Create private events</p>
                                        <p className="mb-2" style={{ color: "#9ca3af" }}>{check}Manage guest lists</p>
                                        <p className="mb-2" style={{ color: "#9ca3af" }}>{check}Partner venue discounts</p>
                                        <p className="mb-2" style={{ color: "#9ca3af" }}>{check}VIP event access</p>
                                    </div>

                                    {/* Community */}
                                    <div className="col-md-6 mb-4">
                                        <h6 className="text-uppercase fw-semibold text-white h6 pb-1">Community</h6>
                                        <p className="mb-2" style={{ color: "#9ca3af" }}>{check}Group creation</p>
                                        <p className="mb-2" style={{ color: "#9ca3af" }}>{check}Forum participation</p>
                                        <p className="mb-2" style={{ color: "#9ca3af" }}>{check}Member services</p>
                                        <p className="mb-2" style={{ color: "#9ca3af" }}>{check}Featured profile placement</p>
                                    </div>
                                </div>
                            </div>

                            {/* Trial Member Features */}
                            <div className="col-lg-4">
                                <h5 className="fw-bold mb-3 text-uppercase mb-4">trial member features</h5>
                                <div className=" rounded-3 p-4" style={{backgroundColor: "#343a40"}}>
                                    <p className="mb-2" style={{color :"#9ca3af"}}>{cross}Limited to 10 messages per day</p>
                                    <p className="mb-2" style={{color :"#9ca3af"}}>{cross}Can only receive friend requests</p>
                                    <p className="mb-2" style={{color :"#9ca3af"}}>{cross}View limited profile information</p>
                                    <p className="mb-2" style={{color :"#9ca3af"}}>{cross}No access to private media</p>
                                    <p className="mb-2" style={{color :"#9ca3af"}}>{cross}Cannot create events or groups</p>
                                    <p className="mb-2" style={{color :"#9ca3af"}}>{cross}Read-only forum access</p>
                                    <p className="mb-0" style={{color :"#9ca3af"}}>{cross}No VIP event access</p>
                                </div>

                                <p className="mt-3 small" style={{ color: "#9ca3af" }}>
                                    * Some features may be restricted based on other members’ privacy settings<br />
                                    ** Partner venues may offer additional benefits to premium members
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Subscription