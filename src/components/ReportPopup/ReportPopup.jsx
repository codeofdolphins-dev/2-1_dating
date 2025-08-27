import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import httpService from '../../helper/httpService';
import { showErrorToast, showSuccessToast } from '../customToast/CustomToast';

const ReportPopup = ({ show, handleClose, room_id }) => {

    const [reportType, setReportType] = useState("");
    const [reportDesc, setReportDesc] = useState("");
    const [error, setError] = useState(false);

    const reportTypeList = ["inappropriate_content", "spam", "harassment", "hate_speech", "fake_profile", "underage", "other"];

    const reportHandler = () => {
        httpService(`/chatrooms/${room_id}/report`, "post", { reportType, description: reportDesc }, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`,
                'content-type': "application/json"
            }
        })
            .then(res => {
                console.log(res);

                showSuccessToast(res.message);

                setReportDesc("");
                setReportType("");
            })
            .catch(err => {
                showErrorToast(err.response.data.error[0].message);
                console.error(err);                
                
                setReportDesc("");
                setReportType("");
            })

        handleClose();
    }

    useEffect(() => {
        
        const descLength = reportDesc.trim().length;
        
        // if(reportDesc !== "" && descLength < 10) {
        //     setError(true);
        //     return;
        // }else{
        //     setError(false);
        //     return;
        // }

    }, [reportDesc])

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                centered
                backdrop="static"
                className=""
                contentClassName="border-0"
                style={{ zIndex: 5000 }}
            >
                <Modal.Body
                    className=" rounded-3 w-100 text-white"
                    style={{
                        backgroundColor: "var(--color-border)"
                    }}
                >
                    {/* Close Button */}
                    <div className="custom-close-btn" onClick={handleClose}>
                        &times;
                    </div>

                    <div className="d-flex flex-column gap-4">
                        <div className=''>
                            <p className='mb-1'>Select Report type:</p>
                            <select
                                class="form-select text-white"
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                                style={{
                                    backgroundColor: "var(--color-border)",
                                    fontSize: "14px",
                                }}
                            >
                                <option style={{ color: "grey" }}>Select report type</option>
                                {
                                    reportTypeList.map((item, i) => (
                                        <option key={i} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="">
                            <p className='mb-1'>Description:</p>
                            <textarea
                                rows={3}
                                className='rounded-2 text-white py-1 px-2'
                                style={{
                                    width: "100%",
                                    fontSize: "14px",
                                    backgroundColor: "var(--color-border)"

                                }}
                                value={reportDesc}
                                onChange={(e) => setReportDesc(e.target.value)}
                            />
                        {
                            error && <p className='text-danger mb-0' style={{ fontSize: "13px" }}>Description must be at least 10 characters long***</p>
                        }
                        </div>
                        <button type='submit' className='custom-button py-2 rounded-2 border-0'
                            disabled={error}
                            style={{ opacity: error ? 0.5 : 1 }}
                            onClick={error ? undefined : reportHandler}
                        >Submit</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ReportPopup