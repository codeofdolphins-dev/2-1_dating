import React from 'react'
import middleIcon from "../../assets/cardImgs/Images/middle-logo.png"

const CardContainer = ({children}) => {
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex justify-content-between p-3">
                        <div>
                            <h6 className="text-white">
                                CPLSUEPAUL has joined Georgia For Chocolate 🍫
                            </h6>
                        </div>
                        <div>
                            <h6 style={{ color: "var(--color-primary-green)" }}>Dec 12, 2024 | 24 Members</h6>
                        </div>
                    </div>
                </div>
                <div className="main">
                    {/* icon */}
                    <img
                        src={middleIcon}
                        alt="Center Icon"
                        className="actionIcon"
                        style={{ maxHeight: "50px", objectFit: "contain" }}
                    />
                    {/* Card Content */}
                    {children}
                </div>
            </div>
        </>
    )
}

export default CardContainer