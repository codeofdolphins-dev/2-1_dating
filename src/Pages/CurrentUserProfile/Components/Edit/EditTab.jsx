import React, { useState } from 'react'

import maleIcon from "../../../../assets/icons/male.png";
import femaleIcon from "../../../../assets/icons/female.png";
import coupleIcon from "../../../../assets/icons/couple.png";
import transgenderIcon from "../../../../assets/icons/transgender.png";

import style from "./style.module.css";
import EditProfilePageInputPopup from '../../../../components/EditProfilePageInputPopup/EditProfilePageInputPopup';

const EditTab = () => {

    const [interestOptions, setInterestOptions] = useState([
        { id: 1, title: "Couples Only", value: false },
        { id: 2, title: "Threesome", value: false },
        { id: 3, title: "Full Swap", value: false },
        { id: 4, title: "Gays", value: false },
        { id: 5, title: "Lesbian", value: false },
        { id: 6, title: "Exhibitionist", value: false },
        { id: 7, title: "Transgender", value: false },
        { id: 8, title: "BDSM", value: false },
        { id: 9, title: "Voyeur", value: false },
        { id: 10, title: "Gang bang", value: false },
        { id: 11, title: "Wife swap", value: false },
        { id: 12, title: "Hot wifing", value: false },
        { id: 13, title: "Bi Couple", value: false },
        { id: 14, title: "BBC", value: false },
        { id: 15, title: "Bare fun", value: false },
        { id: 16, title: "Body Tattoo", value: false },
        { id: 17, title: "BBW Hot Wives", value: false },
        { id: 18, title: "Flashing", value: false },
        { id: 19, title: "Nudism", value: false },
        { id: 20, title: "Public Sex", value: false },
        { id: 21, title: "Group Sex", value: false },
        { id: 22, title: "Interracial", value: false },
        { id: 23, title: "Beach Sex", value: false },
        { id: 24, title: "Anal Sex", value: false },
        { id: 25, title: "cougars and vixens", value: false },
        { id: 26, title: "Erotic Massage", value: false },
        { id: 27, title: "Tantra", value: false },
        { id: 28, title: "Masturbation", value: false },
        { id: 29, title: "Dildo & Toys", value: false },
        { id: 30, title: "Girl on Girl", value: false },
        { id: 31, title: "Soft Swap", value: false },
        { id: 32, title: "Full Swap", value: false }
    ]);
    const [f_name, setF_name] = useState("Aswini");
    const [m_name, setM_name] = useState("Amit Arora");
    const [circumcised, setCircumcised] = useState("");

    const [profileType, setProfileType] = useState([
        { id: 1, icon: coupleIcon, title: "Couple", value: false },
        { id: 2, icon: femaleIcon, title: "Female", value: false },
        { id: 3, icon: maleIcon, title: "Male", value: false },
        { id: 4, icon: transgenderIcon, title: "Transgender", value: false }
    ]);

    const [female, setFemale] = useState({
        f_dob: "",
        f_bodyHair: "",
        f_height: "",
        f_weight: "",
        f_bodyType: "",
        f_ethnicBackground: "",
        f_smoking: "",
        f_piercings: "",
        f_tattoos: "",
        f_languages: "",
        f_looks: "",
        f_intelligence: "",
        f_sexuality: "",
        f_relationship: "",
        experience: {
            curious: false,
            newbie: false,
            intermediate: false,
            advanced: false
        }
    });
    const [male, setMale] = useState({
        m_dob: "",
        m_bodyHair: "",
        m_height: "",
        m_weight: "",
        m_bodyType: "",
        m_ethnicBackground: "",
        m_smoking: "",
        m_piercings: "",
        m_tattoos: "",
        m_languages: "",
        m_looks: "",
        m_intelligence: "",
        m_sexuality: "",
        m_relationship: "",
        experience: {
            curious: false,
            newbie: false,
            intermediate: false,
            advanced: false
        }
    });
    const female_input = [
        { title: "Date of birth*", type: "date", id: "f_dob" },
        { title: "Body Hair", id: "f_bodyHair" },
        { title: "Height", id: "f_height" },
        { title: "Weight", id: "f_weight" },
        { title: "Body Type", id: "f_bodyType" },
        { title: "Ethnic background", id: "f_ethnicBackground" },
        { title: "Smoking", id: "f_smoking" },
        { title: "Piercings", id: "f_piercings" },
        { title: "Tattoos", id: "f_tattoos" },
        { title: "Languages Spoken", id: "f_languages" },
        { title: "Looks are important?", id: "f_looks" },
        { title: "Intelligence is important?", id: "f_intelligence" },
        { title: "Sexuality", id: "f_sexuality" },
        { title: "Relationship Orientation", id: "f_relationship" },
    ];
    const male_input = [
        { title: "Date of birth*", type: "date", id: "m_dob" },
        { title: "Body Hair", id: "m_bodyHair" },
        { title: "Height", id: "m_height" },
        { title: "Weight", id: "m_weight" },
        { title: "Body Type", id: "m_bodyType" },
        { title: "Ethnic background", id: "m_ethnicBackground" },
        { title: "Smoking", id: "m_smoking" },
        { title: "Piercings", id: "m_piercings" },
        { title: "Tattoos", id: "m_tattoos" },
        { title: "Languages Spoken", id: "m_languages" },
        { title: "Looks are important?", id: "m_looks" },
        { title: "Intelligence is important?", id: "m_intelligence" },
        { title: "Sexuality", id: "m_sexuality" },
        { title: "Relationship Orientation", id: "m_relationship" },
    ];

    // **********************handlers*************************

    const handleFemaleInputData = (e) => {
        const { name, value } = e.target;
        setFemale((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleMaleInputData = (e) => {
        const { name, value } = e.target;
        setMale((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const profileHandler = (id) => {
        setProfileType((prev) => (
            prev.map(field => (
                field.id === id ? { ...field, value: !field.value } : { ...field, value: false }
            ))
        ));
    };
    const handelInterest = (id) => {
        setInterestOptions((prev) => (
            prev.map(field => (
                field.id === id ? { ...field, value: !field.value } : field
            ))
        ));
    };



    return (
        <>
            <div className="d-flex flex-column gap-3">

                {/* row 1 */}
                <div className="row align-items-center">
                    {/* Left Side */}
                    <div className="col-lg-7 col-md-6">
                        <h3 style={{ fontSize: "18px" }}>CPLSUEPAUL</h3>
                        <p className="mb-0" style={{ fontSize: "14px" }}> You are a... <span className='text-danger'>*</span> </p>
                    </div>

                    {/* Right Side */}
                    <div className="col-lg-5 col-md-6 d-flex flex-column align-items-end gap-3">
                        {/* Icons */}
                        <div className="d-flex gap-1 flex-wrap">
                            {profileType.map((item) => (
                                <div
                                    key={item.id}
                                    className="d-flex flex-column justify-content-center align-items-center py-2 px-3 rounded-3"
                                    style={{
                                        maxWidth: "120px",
                                        border: item.value ? "2px solid #fff" : "2px solid #343A40"
                                    }}
                                    onClick={() => profileHandler(item.id)}
                                >
                                    <img src={item.icon} alt={item.title} width="50" />
                                    <p className="mb-0" style={{ fontSize: "10px" }}>{item.title}</p>
                                </div>
                            ))}
                        </div>

                        {/* Buttons */}
                        {/* <div
                            className="d-flex justify-content-between align-items-center rounded-3 gap-3` flex-wrap"
                            style={{
                                border: "2px solid #343A40",
                                width: "fit-content"
                            }}
                        >
                            {buttons1.map((label) => (
                                <button
                                    key={label}
                                    onClick={() => setSelected1(label)}
                                    className={`border-0 py-2 px-4 rounded-3 ${selected1 === label ? 'custom-button' : 'text-white'}`}
                                    style={{
                                        fontSize: '14px',
                                        backgroundColor: selected1 === label ? '' : 'transparent',
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                        </div> */}
                    </div>
                </div>

                {/* row 2 */}
                <div className="">
                    <p className="mb-0" style={{ fontSize: "14px" }}> What are you looking for on SDC? <span className='text-danger'>*</span> </p>
                    <div className="d-flex flex-wrap gap-2 rounded-3 p-2" style={{ border: "2px solid #343A40" }}>
                        {interestOptions.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handelInterest(item.id)}
                                className={`border-0 py-2 px-4 rounded-3 ${item.value ? 'custom-button' : 'text-white'}`}
                                style={{
                                    fontSize: '14px',
                                    backgroundColor: item.value ? '' : 'transparent',
                                }}
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* row 3 */}
                <div className="py-3 px-4 rounded-4" style={{ backgroundColor: "var(--color-border)", fontSize: "14px" }}>
                    <p>all desi couples join the group "usa-desi-couples" </p>
                    <p>well educated couple from nc , looking to meet decent, respectful couple friends</p>
                    <p>Desi married couples ....</p>
                </div>

                {/* row 4 */}
                <div className="pb-5" style={{ borderBottom: "2px solid #343A40" }}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className={`mx-4 d-flex flex-column gap-4 text-secondary ${style.parent}`}>

                                <div className="d-flex justify-content-between align-items-center mb-1" style={{ borderBottom: "2px solid red" }}>
                                    <input
                                        type="text"
                                        className="form-control border-0 rounded-0 text-danger px-0" id='f_name'
                                        name='f_name'
                                        value={f_name}
                                        onChange={(e) => setF_name(e.target.value)}
                                        style={{
                                            fontSize: "20px",
                                            backgroundColor: "transparent"
                                        }}
                                    />

                                    <label htmlFor='f_name' className="form-label mb-0 text-danger fw-bold"><i className="bi bi-pencil-fill text-danger" style={{ cursor: "pointer" }}></i></label>
                                </div>

                                {female_input.map((field, i) => (
                                    <div key={i} style={{ borderBottom: "2px solid #343A40" }}>
                                        {/* Label */}
                                        <label className="form-label mb-0" htmlFor={field.id}
                                            style={{ fontSize: "14px", color: "#B0C3CC" }}> {field.title} </label>

                                        {/* Input */}
                                        <div className="d-flex">
                                            <input
                                                type={field.type ? field.type : "text"}
                                                className="form-control rounded-0 p-0 pb-2 border-0"
                                                id={field.id}
                                                name={field.id}
                                                value={female[field.id]}
                                                onChange={(e) => handleFemaleInputData(e)}
                                                style={{
                                                    fontSize: "16px",
                                                    color: "#B0C3CC",
                                                    backgroundColor: "transparent"
                                                }}
                                            />
                                            {
                                                i === 0 ? "" : <i className="bi bi-chevron-down" style={{ cursor: "pointer" }}></i>
                                            }
                                        </div>
                                    </div>
                                ))}

                                <div className="">
                                    <h3 className='text-danger' style={{ fontSize: "20px" }}>Experience Level</h3>
                                    <div className="row px-2 mt-3">
                                        <div className="col-lg-6">
                                            <div className={`d-flex flex-column gap-3 ${style.parent}`}>
                                                <div className="d-flex gap-2 justify-content-start align-items-center">
                                                    <input
                                                        className="form-check-input m-0"
                                                        type="checkbox"
                                                        id="f_curious"
                                                        name='f_curious'
                                                        checked={female.experience.curious}
                                                        onChange={(e) => setFemale(
                                                            (prev) => ({
                                                                ...prev,
                                                                experience: {
                                                                    ...prev.experience,
                                                                    curious: e.target.checked
                                                                }
                                                            })
                                                        )}
                                                    />
                                                    <label className="form-check-label" htmlFor="f_curious" style={{ fontSize: "14px" }}>Curious</label>
                                                </div>
                                                <div className="d-flex gap-2 justify-content-start align-items-center">
                                                    <input
                                                        className="form-check-input m-0"
                                                        type="checkbox"
                                                        id="f_intermediate"
                                                        name='f_intermediate'
                                                        checked={female.experience.intermediate}
                                                        onChange={(e) => setFemale(
                                                            (prev) => ({
                                                                ...prev,
                                                                experience: {
                                                                    ...prev.experience,
                                                                    intermediate: e.target.checked
                                                                }
                                                            })
                                                        )}
                                                    />
                                                    <label className="form-check-label" htmlFor="f_intermediate" style={{ fontSize: "14px" }}>Intermediate</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mt-3 mt-lg-0">
                                            <div className={`d-flex flex-column gap-3 ${style.parent}`}>
                                                <div className="d-flex gap-2 justify-content-start align-items-center">
                                                    <input
                                                        className="form-check-input m-0"
                                                        type="checkbox"
                                                        id="f_newbie"
                                                        name='f_newbie'
                                                        checked={female.experience.newbie}
                                                        onChange={(e) => setFemale(
                                                            (prev) => ({
                                                                ...prev,
                                                                experience: {
                                                                    ...prev.experience,
                                                                    newbie: e.target.checked
                                                                }
                                                            })
                                                        )}
                                                    />
                                                    <label className="form-check-label" htmlFor="f_newbie" style={{ fontSize: "14px" }}>Newbie</label>
                                                </div>
                                                <div className="d-flex gap-2 justify-content-start align-items-center">
                                                    <input
                                                        className="form-check-input m-0"
                                                        type="checkbox"
                                                        id="f_advanced"
                                                        name='f_advanced'
                                                        checked={female.experience.advanced}
                                                        onChange={(e) => setFemale(
                                                            (prev) => ({
                                                                ...prev,
                                                                experience: {
                                                                    ...prev.experience,
                                                                    advanced: e.target.checked
                                                                }
                                                            })
                                                        )}
                                                    />
                                                    <label className="form-check-label" htmlFor="f_advanced" style={{ fontSize: "14px" }}>Advanced</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-6 mt-5 mt-lg-0">

                            <div className={`mx-4 d-flex flex-column gap-4 text-secondary ${style.parent}`}>

                                <div className="d-flex justify-content-between align-items-center mb-1" style={{ borderBottom: "2px solid #096BFF" }}>
                                    <input
                                        type="text"
                                        className="form-control border-0 rounded-0 px-0" id='m_name'
                                        name='m_name'
                                        value={m_name}
                                        onChange={(e) => setM_name(e.target.value)}
                                        style={{
                                            fontSize: "20px",
                                            backgroundColor: "transparent",
                                            color: "#096BFF"
                                        }}
                                    />

                                    <label htmlFor='m_name' className="form-label mb-0 text-danger fw-bold"><i className="bi bi-pencil-fill" style={{ cursor: "pointer", color: "#096BFF" }}></i></label>
                                </div>

                                {male_input.map((field, i) => (
                                    <div key={i} style={{ borderBottom: "2px solid #343A40" }}>
                                        {/* Label */}
                                        <label className="form-label mb-0" htmlFor={field.id}
                                            style={{ fontSize: "14px", color: "#B0C3CC" }}> {field.title} </label>

                                        {/* Input */}
                                        <div className="d-flex">
                                            <input
                                                type={field.type ? field.type : "text"}
                                                className="form-control rounded-0 p-0 pb-2 border-0"
                                                id={field.id}
                                                name={field.id}
                                                value={male[field.id]}
                                                onChange={(e) => handleMaleInputData(e)}
                                                style={{
                                                    fontSize: "16px",
                                                    color: "#B0C3CC",
                                                    backgroundColor: "transparent"
                                                }}
                                            />
                                            {
                                                i === 0 ? "" : <i className="bi bi-chevron-down" style={{ cursor: "pointer" }}></i>
                                            }
                                        </div>

                                        {/* <EditProfilePageInputPopup/> */}
                                    </div>
                                ))}

                                <div className="">
                                    <h3 style={{ fontSize: "20px", color: "#096BFF" }}>Experience Level</h3>
                                    <div className="row px-2 mt-3">
                                        <div className="col-lg-6">
                                            <div className={`d-flex flex-column gap-3 ${style.parent}`}>
                                                <div className="d-flex gap-2 justify-content-start align-items-center">
                                                    <input
                                                        className="form-check-input m-0"
                                                        type="checkbox"
                                                        id="m_curious"
                                                        name='m_curious'
                                                        checked={male.experience.curious}
                                                        onChange={(e) => setMale(
                                                            (prev) => ({
                                                                ...prev,
                                                                experience: {
                                                                    ...prev.experience,
                                                                    curious: e.target.checked
                                                                }
                                                            })
                                                        )}
                                                    />
                                                    <label className="form-check-label" htmlFor="m_curious" style={{ fontSize: "14px" }}>Curious</label>
                                                </div>
                                                <div className="d-flex gap-2 justify-content-start align-items-center">
                                                    <input
                                                        className="form-check-input m-0"
                                                        type="checkbox"
                                                        id="m_intermediate"
                                                        name='m_intermediate'
                                                        checked={male.experience.intermediate}
                                                        onChange={(e) => setMale(
                                                            (prev) => ({
                                                                ...prev,
                                                                experience: {
                                                                    ...prev.experience,
                                                                    intermediate: e.target.checked
                                                                }
                                                            })
                                                        )}
                                                    />
                                                    <label className="form-check-label" htmlFor="m_intermediate" style={{ fontSize: "14px" }}>Intermediate</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mt-3 mt-lg-0">
                                            <div className={`d-flex flex-column gap-3 ${style.parent}`}>
                                                <div className="d-flex gap-2 justify-content-start align-items-center">
                                                    <input
                                                        className="form-check-input m-0"
                                                        type="checkbox"
                                                        id="m_newbie"
                                                        name='m_newbie'
                                                        checked={male.experience.newbie}
                                                        onChange={(e) => setMale(
                                                            (prev) => ({
                                                                ...prev,
                                                                experience: {
                                                                    ...prev.experience,
                                                                    newbie: e.target.checked
                                                                }
                                                            })
                                                        )}
                                                    />
                                                    <label className="form-check-label" htmlFor="m_newbie" style={{ fontSize: "14px" }}>Newbie</label>
                                                </div>
                                                <div className="d-flex gap-2 justify-content-start align-items-center">
                                                    <input
                                                        className="form-check-input m-0"
                                                        type="checkbox"
                                                        id="m_advanced"
                                                        name='m_advanced'
                                                        checked={male.experience.advanced}
                                                        onChange={(e) => setMale(
                                                            (prev) => ({
                                                                ...prev,
                                                                experience: {
                                                                    ...prev.experience,
                                                                    advanced: e.target.checked
                                                                }
                                                            })
                                                        )}
                                                    />
                                                    <label className="form-check-label" htmlFor="m_advanced" style={{ fontSize: "14px" }}>Advanced</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* row 5 */}
                <div className="d-flex justify-content-between align-items-center flex-wrap mx-4 gap-4">
                    <button className='custom-button py-1 px-5 rounded-4 border-0'>Save</button>
                    <div className={`w-lg-50 ${style.parent}`} style={{ borderBottom: "2px solid #343A40" }}>
                        {/* Label */}
                        <label className="form-label mb-0" htmlFor='circumcised'
                            style={{ fontSize: "14px", color: "#B0C3CC" }}> Circumcised </label>

                        {/* Input */}
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control rounded-0 p-0 pb-2 border-0"
                                id='circumcised'
                                name='circumcised'
                                value={circumcised}
                                onChange={(e) => setCircumcised(e.target.value)}
                                style={{
                                    fontSize: "16px",
                                    color: "#B0C3CC",
                                    backgroundColor: "transparent",
                                    // maxWidth: "410px"
                                    width: "100%"
                                }}
                            />
                            <i className="bi bi-chevron-down" style={{ cursor: "pointer" }}></i>
                        </div>
                    </div>
                </div>
               <EditProfilePageInputPopup/>
               <EditProfilePageInputPopup/>
               <EditProfilePageInputPopup/>
            </div>
        </>
    )
}

export default EditTab