import React, { useState } from 'react';
import PageWrapper from '../../components/PageWrapper';
import trashIcon from "../../assets/icons/trash.png";

const ProfileLocation = () => {

    const [primaryLocation, setPrimaryLocation] = useState("");
    const [secondaryLocation, setSecondaryLocation] = useState("");
    const [distanceUnit, setDistanceUnit] = useState({
        mi: false,
        kms: false
    });

    const removeSecondaryLocationHandler = () => {
        setSecondaryLocation("");
    }

    return (
        <>
            <PageWrapper >
                <div className="container-fluid mt-5 pt-5 px-3 d-flex flex-column align-items-start justify-content-start gap-2 text-white">
                    <div className="w-100 d-flex flex-column gap-3" style={{ color: "#B0C3CC" }}>

                        <div>
                            <h3 className='text-white' style={{ fontSize: "20px" }}>Location</h3>
                        </div>

                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-4">
                            <div className='' style={{ borderBottom: "2px solid #343A40", width: "274px" }}>
                                {/* Label */}
                                <label className="form-label mb-0" htmlFor=""
                                    style={{ fontSize: "13px", color: "#B0C3CC" }}>Your current location is</label>

                                {/* Input */}
                                <div className="d-flex mt-2">
                                    <input
                                        type="text"
                                        className="form-control rounded-0 p-0 pb-2 border-0"
                                        style={{
                                            fontSize: "17px",
                                            color: "#B0C3CC",
                                            backgroundColor: "transparent"
                                        }}
                                        value={primaryLocation}
                                        onChange={(e) => setPrimaryLocation(e.target.value)}
                                    />
                                    <i className="bi bi-search" style={{ cursor: "pointer" }}></i>
                                </div>
                            </div>
                            <div className='' style={{ borderBottom: "2px solid #343A40", width: "274px" }}>
                                {/* Label */}
                                <label className="form-label mb-0" htmlFor=""
                                    style={{ fontSize: "13px", color: "#B0C3CC" }}>Your second location is</label>

                                {/* Input */}
                                <div className="d-flex align-items-center mt-2">
                                    <img src={trashIcon} alt="delete" width={"13px"} height={"13px"} onClick={removeSecondaryLocationHandler} style={{ cursor: "pointer" }} />
                                    <input
                                        type="text"
                                        className="form-control rounded-0 border-0"
                                        style={{
                                            fontSize: "17px",
                                            color: "#B0C3CC",
                                            backgroundColor: "transparent"
                                        }}
                                        value={secondaryLocation}
                                        onChange={(e) => setSecondaryLocation(e.target.value)}
                                    />
                                    <i className="bi bi-search" style={{ cursor: "pointer" }}></i>
                                </div>
                            </div>
                            <div className=''>
                                <button className='py-1 px-4 rounded-5' style={{ backgroundColor: "transparent", border: "1px solid #6C757D", color: "#6C757D", width: "172px" }}>Swap Location</button>
                            </div>
                        </div>

                        <div className="">
                            <p className='text-white' style={{ fontSize: "14px" }}>Show distance in</p>
                            <div className="d-flex gap-5">
                                <div className="custome-form-check">
                                    <input
                                        className="form-check-input mt-0"
                                        type="checkbox"
                                        id="picture"
                                        name='picture'
                                        style={{ backgroundColor: "transparent" }}
                                        checked={distanceUnit.mi}
                                        onChange={(e) => setDistanceUnit(() => ({
                                            mi: e.target.checked,
                                            kms: false
                                        }))}
                                    />
                                    <label className="form-check-label" htmlFor="picture">Mi</label>
                                </div>
                                <div className="custome-form-check">
                                    <input
                                        className="form-check-input mt-0"
                                        type="checkbox"
                                        id="picture"
                                        name='picture'
                                        style={{ backgroundColor: "transparent" }}
                                        checked={distanceUnit.kms}
                                        onChange={(e) => setDistanceUnit(() => ({
                                            mi: false,
                                            kms: e.target.checked,
                                        }))}
                                    />
                                    <label className="form-check-label" htmlFor="picture">KMS</label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </PageWrapper>
        </>
    )
}

export default ProfileLocation