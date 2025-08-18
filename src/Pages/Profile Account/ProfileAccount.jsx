import React, { useState } from 'react';
import PageWrapper from '../../components/PageWrapper';
import "./profileAccount.css"
const ProfileAccount = () => {


    const inputs = [
        { title: "Email", type: "email", id: "email" },
        { title: "Password", type: "password", id: "pass1" },
        { title: "Confirm Password", type: "password", id: "pass2" }
    ]

    const [details, setDetails] = useState({
        email: "",
        pass1: "",
        pass2: "",
        lang: ""
    })

    const inputHandler = (e) => {

        const { name, value } = e.target;

        setDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const submitHandler = () => {
        console.log(details);
    }

    return (
        <>
            <PageWrapper >
                <div className="container-fluid mt-5 pt-5 px-3 d-flex flex-column align-items-start justify-content-start gap-2 text-white">
                    <div className="w-100 d-flex flex-column justify-content-center gap-5">

                        {/* row 1 */}
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="">
                                    <h3>Account</h3>
                                </div>
                            </div>
                            <div className="col-lg-5" style={{ fontSize: "14px", margin: "auto" }}>
                                <div className="d-flex gap-3 justify-content-end align-items-center">
                                    <button className='custom-button py-1 px-5 rounded-5 border-0'>Subscription</button>
                                    <button className='py-1 px-4 rounded-5' style={{ backgroundColor: "transparent", border: "1px solid #EC5252", color: "#EC5252" }}>Change profile name</button>
                                </div>
                            </div>
                        </div>

                        {/* row 2 */}
                        <div className="row">
                            {inputs.map((field, i) => (
                                <div className='col-lg-4 ' key={i} style={{}}>
                                    {/* Label */}
                                    <label className="form-label mb-0" htmlFor={field.id}
                                        style={{ fontSize: "14px", color: "#B0C3CC" }}> {field.title} </label>

                                    {/* Input */}
                                    <div className="d-flex mt-2">
                                        <input
                                            type={field.type ? field.type : "text"}
                                            className="form-control rounded-0 p-0 pb-2 border-top-0 border-start-0 border-end-0"
                                            id={field.id}
                                            name={field.id}
                                            style={{
                                                fontSize: "16px",
                                                color: "#B0C3CC",
                                                backgroundColor: "transparent",
                                                borderBottom: "2px solid #343A40"
                                            }}
                                            value={details.id}
                                            onChange={inputHandler}
                                        />
                                        {/* {
                                            i === 0 ? "" : <i className="bi bi-chevron-down" style={{ cursor: "pointer" }}></i>
                                        } */}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* row 3 */}
                        <div className="row">
                            <div className='col-lg-4' style={{ borderBottom: "2px solid #343A40" }}>
                                {/* Label */}
                                <label className="form-label mb-0" htmlFor="lang"
                                    style={{ fontSize: "14px", color: "#B0C3CC" }}> Select site language </label>

                                {/* Input */}
                                <div className="d-flex mt-2">
                                    <input
                                        type="text"
                                        className="form-control rounded-0 p-0 pb-2 border-0"
                                        id='lang'
                                        name='lang'
                                        style={{
                                            fontSize: "16px",
                                            color: "#B0C3CC",
                                            backgroundColor: "transparent"
                                        }}
                                        value={details.lang}
                                        onChange={inputHandler}
                                    />
                                    <i className="bi bi-chevron-down" style={{ cursor: "pointer" }}></i>
                                </div>
                            </div>
                            <div className='col-lg-4' style={{ margin: "auto 20px" }}>
                                <div className="d-flex justify-content-start align-items-center">
                                    <button onClick={submitHandler} className='custom-button py-1 px-5 rounded-5 border-0'>Submit</button>
                                </div>
                            </div>
                        </div>

                        {/* row 4 */}
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div className="d-flex flex-column">
                                <p className='mb-0' style={{ fontSize: "16px" }}>Joined</p>
                                <p className='mb-0 fw-light' style={{ fontSize: "14px", opacity: "0.5" }}>Oct 07, 2022</p>
                            </div>
                            <div className="d-flex flex-column">
                                <p className='mb-0' style={{ fontSize: "16px" }}>Last renewal</p>
                                <p className='mb-0 fw-light' style={{ fontSize: "14px", opacity: "0.5" }}>Nov 13, 2024</p>
                            </div>
                            <div className="d-flex flex-column">
                                <p className='mb-0' style={{ fontSize: "16px" }}>Membership</p>
                                <p className='mb-0 fw-light' style={{ fontSize: "14px", opacity: "0.5" }}>Lifetime Membership</p>
                            </div>
                            <div className="d-flex flex-column">
                                <p className='mb-0' style={{ fontSize: "16px" }}>Expire / Renew date</p>
                                <p className='mb-0 fw-light' style={{ fontSize: "14px", opacity: "0.5" }}>Never</p>
                            </div>
                            <div className="d-flex flex-column">
                                <p className='mb-0' style={{ fontSize: "16px" }}>Days until expiration/renew</p>
                                <p className='mb-0 fw-light' style={{ fontSize: "14px", opacity: "0.5" }}>9875 Days</p>
                            </div>
                        </div>

                        <button className='py-1 px-4 rounded-5' style={{ backgroundColor: "transparent", border: "1px solid #EC5252", color: "#EC5252", width: "172px" }}>Delete Account</button>

                    </div>
                </div>
            </PageWrapper>
        </>
    )
}

export default ProfileAccount