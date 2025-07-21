import React from 'react'

const ActivityCard = ({eventIcon,eventName}) => {
    return (
        <>
            <div className="col-lg-12 h-100">
                <div
                    className="text-white rounded-3 p-4 h-100 d-flex flex-column justify-content-center align-items-center text-center card"
                >
                    <div className="mb-2">
                        <i className={eventIcon} style={{ fontSize: '2.5rem' }}></i>
                    </div>
                    <h6 className="mb-0" style={{ color: "b0c3cc" }}>{eventName}</h6>
                </div>
            </div>
        </>
    )
}

export default ActivityCard