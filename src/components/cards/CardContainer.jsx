import React from 'react'
import middleIcon from "../../assets/cardImgs/Images/middle-logo.png"

const CardContainer = ({children,headerText,dateText,middleIcon}) => {
    return (
        <>
            <div className="row" >
                <div className="col-lg-12" >
                    <div className="d-flex justify-content-between pt-4 pb-2 mt-3 ml-0">
                        <div>
                            <h6 className="text-white">
                                {headerText}
                            </h6>
                        </div>
                        <div>
                            <h6 style={{ color: "var(--color-primary-green)" }}>{dateText}</h6>
                        </div>
                    </div>
                </div>
                <div className="main">
                    {/* icon */}
                    {
                        middleIcon && <img
                        src={middleIcon}
                        alt="Center Icon"
                        className="actionIcon"
                        style={{ maxHeight: "50px", objectFit: "contain" }}
                    />
                    }
                    
                    {/* Card Content */}
                    {children}
                </div>
            </div>
        </>
    )
}

export default CardContainer