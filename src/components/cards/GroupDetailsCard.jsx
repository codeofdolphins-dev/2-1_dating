import React, { useEffect, useState } from 'react'
import httpService from '../../helper/httpService'

const GroupDetailsCard = ({ data,joinButton=true }) => {
    const [groupData, setGroupData] = useState()
    useEffect(() => {
        httpService(`/groups/${data?.relatedEntityId}`, "GET")
            .then((res) => {
                console.log("ddddd", res)
                setGroupData(res?.data?.group)
            })
            .catch((err) => {
                console.log("ddddd", err)
            })
    }, [])
    return (
        <>
            <div className="h-100">
                <div
                    className="text-white rounded-3 p-4 d-flex flex-column justify-content-between h-100"
                    style={{
                        backgroundColor: "var(--color-border)",
                        border: "2px solid #ffffff",
                    }}
                >
                    <div className="d-flex justify-content-between">
                        <div className="mb-4">
                            <h6 className="mb-2 text-white">Location Based</h6>
                            <p className="mb-1 fw-light">{groupData?.location}</p>
                            <p className="mb-1 fw-light">Admin: {groupData?.admins[0]?.username}</p>
                        </div>

                        <div>
                            {
                                joinButton && <button className="btn btn-primary rounded-pill w-100 py-2 px-4">
                                    Apply to Join
                                </button>
                            }

                            <p>Members: {groupData?.memberCount}</p>
                        </div>
                    </div>

                    <p className="small text-white mb-3" style={{ lineHeight: "1.4" }}>
                        {groupData?.description}
                        {/* <a href="#" className="text-info">more</a> */}
                    </p>
                </div>
            </div>

        </>
    )
}

export default GroupDetailsCard