import React, { useState } from 'react'

import maleIcon from "../../../../assets/icons/male.png";
import femaleIcon from "../../../../assets/icons/female.png";
import coupleIcon from "../../../../assets/icons/couple.png";
import transgenderIcon from "../../../../assets/icons/transgender.png";

const EditTab = () => {

    const icons = [
        { icon: coupleIcon, text: "Couple" },
        { icon: femaleIcon, text: "Female" },
        { icon: maleIcon, text: "Male" },
        { icon: transgenderIcon, text: "Transgender" }
    ];

    const [selected1, setSelected1] = useState('Girl on Girl');
    const buttons1 = ['Girl on Girl', 'Soft Swap', 'Full Swap'];

    const allInterests = ["Couples Only", "Threesome", "Full Swap", "Gays", "Lesbian", "Exhibitionist", "Transgender", "BDSM", "Voyeur", "Gang bang", "Wife swap", "Hot wifing", "Bi Couple", "BBC", "Bare fun", "Body Tattoo", "BBW Hot Wives", "Flashing", "Nudism", "Public Sex", "Group Sex", "Interracial", "Beach  Sex", "Anal Sex", "cougars and vixens", "Erotic Massage", "Tantra", "Masturbation", "Dildo & Toys"];

    const [interests, setInterests] = useState([]);

    const handelInterest = (label) => {

        if (interests.includes(label)) {
            setInterests(prev => prev.filter((item) => item != label))
        } else {
            setInterests(prev => [...prev, label]);
        }
    }



    return (
        <>
            <div className="d-flex flex-column gap-3">

                {/* row 1 */}
                <div className="row align-items-center">
                    {/* Left Side */}
                    <div className="col-lg-7">
                        <h3 style={{ fontSize: "18px" }}>CPLSUEPAUL</h3>
                        <p className="mb-0" style={{ fontSize: "14px" }}>
                            What are you looking for on 2+1?*
                        </p>
                    </div>

                    {/* Right Side */}
                    <div className="col-lg-5 d-flex flex-column align-items-end gap-3">
                        {/* Icons */}
                        <div className="d-flex gap-2 flex-wrap">
                            {icons.map((item, i) => (
                                <div
                                    key={i}
                                    className="d-flex flex-column justify-content-center align-items-center py-2 px-3 rounded-3"
                                    style={{
                                        maxWidth: "120px",
                                        border: "2px solid #343A40"
                                    }}
                                >
                                    <img src={item.icon} alt={item.text} width="50" />
                                    <p className="mb-0" style={{ fontSize: "10px" }}>{item.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div
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
                        </div>
                    </div>
                </div>


                {/* row 2 */}
                <div className="d-flex flex-wrap gap-2 rounded-3 p-2" style={{ border: "2px solid #343A40" }}>
                    {allInterests.map((label) => (
                        <button
                            key={label}
                            onClick={() => handelInterest(label)}
                            className={`border-0 py-2 px-4 rounded-3 ${interests.includes(label) ? 'custom-button' : 'text-white'}`}
                            style={{
                                fontSize: '14px',
                                backgroundColor: interests.includes(label) ? '' : 'transparent',
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* row 3 */}
                <div className="py-3 px-4 rounded-4" style={{ backgroundColor: "var(--color-border)", fontSize: "14px" }}>
                    <p>all desi couples join the group "usa-desi-couples" </p>
                    <p>well educated couple from nc , looking to meet decent, respectful couple friends</p>
                    <p>Desi married couples ....</p>
                </div>
            </div>
        </>
    )
}

export default EditTab