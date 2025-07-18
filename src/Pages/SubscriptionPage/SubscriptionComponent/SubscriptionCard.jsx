import React from 'react'

const SubscriptionCard = ({ title, duration, total, perMonth, isPopular }) => {
    return (
        <div className="text-white rounded-3 p-4 position-relative h-100 shadow-sm " style={{backgroundColor: "var(--color-border)", border: "1px solid #374151" }}>
            {isPopular && (
                <span className="small fw-medium  position-absolute top-0 end-0 px-3 py-1" style={{borderRadius:"0 7px 0 0",backgroundColor:"var(--color-success-green)",color:"#000000"}}>POPULAR</span>
            )}

            <h6 className="fw-medium h4 pb-3 pt-2">{title}</h6>
            <p className="text-uppercase fw-medium small mb-0" style={{color :"#9ca3af"}}>Billed in one charge as</p>
            <p className="fw-bold text-white mb-4">${total}</p>
            <p className="text-uppercase fw-semibold fs-5 mb-4" style={{color:"var(--color-success-green)"}}>
                ${perMonth} <span  style={{color :"#9ca3af"}}>per month</span>
            </p>
            <button className="btn btn-primary w-100 text-uppercase" style={{backgroundColor:"var(--color-primary-green)",color:"#000000"}}>Select Plan</button>
        </div>
    )
}

export default SubscriptionCard