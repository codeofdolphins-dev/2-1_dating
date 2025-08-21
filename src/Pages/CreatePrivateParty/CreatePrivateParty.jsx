import React, { useEffect, useState } from 'react';
import PageWrapper from '../../components/PageWrapper';
import { useNavigate } from 'react-router-dom';
import calender from "../../assets/calender.png";

import maleIcon from "../../assets/icons/male.png";
import femaleIcon from "../../assets/icons/female.png";
import coupleIcon from "../../assets/icons/couple.png";
import transgenderIcon from "../../assets/icons/transgender.png";


const CreatePrivateParty = () => {

    const navigate = useNavigate();

    const [startTime, setStartTime] = useState({
        h: "",
        m: "",
    });
    const [endTime, setEndTime] = useState({
        h: "",
        m: "",
    });
    const [openFor, setOpenFor] = useState([
        { id: 1, icon: coupleIcon, title: "Couple", value: false },
        { id: 2, icon: femaleIcon, title: "Female", value: false },
        { id: 3, icon: maleIcon, title: "Male", value: false },
        { id: 4, icon: transgenderIcon, title: "Transgender", value: false }
    ]);
    const [ages, setAges] = useState({
        female: { start: "", end: "" },
        male: { start: "", end: "" },
        trans: { start: "", end: "" },
    });
    const [country, setCountry] = useState("");
    const [event, setEvent] = useState("");
    const [details_char_len, setDetails_char_len] = useState(1000);
    const [details, setDetails] = useState("");
    const [incognito, setIncognito] = useState(false);
    const [promote, setPromote] = useState(false);
    const [inviteFriend, setInviteFriend] = useState(false);
    const [showList, setShowList] = useState(false)


    // ######################## methods #############################
    const openForHandler = (id) => {
        setOpenFor((prev) => (
            prev.map(field => (
                field.id === id ? { ...field, value: !field.value } : field
            ))
        ));
    };

    const handleDetailInput = (e) => {
        if (details_char_len === 0)
            return
        else
            setDetails(e.target.value);
    }

    useEffect(() => {

        let lenth = details.trim().length;

        setDetails_char_len(1000 - lenth);

    }, [details])


    return (
        <>
            <PageWrapper >
                <div className="container-fluid py-5 px-3 d-flex flex-column align-items-start justify-content-center gap-4 text-white" style={{ backgroundColor: "var(--color-background)" }}>

                    {/* nav */}
                    <nav className="nav text-white">
                        <div className="d-flex justify-content-start align-items-center gap-3">
                            <i
                                className="bi bi-chevron-left fs-5 text-white back-icon"
                                onClick={() => navigate("/events")}
                            ></i>
                            <h4 className='text-white mb-0'>Private Party</h4>
                        </div>
                    </nav>

                    {/* row 1 */}
                    <section className=''>
                        <p className='text-white mb-0 label-text' style={{ fontSize: "14px" }}>Post a private, non commercial party using the form below. Once complete, click the OK button and your party will be reviewed and then approved by member PARTY.</p>
                        <p className='text-white mb-0 label-text fs-6' style={{ fontSize: "14px" }}>Your private party will appear on your profile and in the main party calendar, visible to all members.</p>
                        <p className='text-white mb-0 label-text fs-6' style={{ fontSize: "14px" }}>Please contact member PARTY for questions.</p>
                    </section>

                    {/* row 2 */}
                    <section className=''>
                        <p className='text-white mb-0 label-text fs-5 mt-4'>When<span className='text-danger'>*</span></p>
                        <img src={calender} alt="" width={"550px"} />
                    </section>

                    {/* row 3 time section */}
                    <section className="row w-100">
                        <div className="col-lg-4">
                            <div className="">
                                <p className='mb-1'>Start Time<span className='text-danger'>*</span></p>
                                <div className="d-flex gap-3">
                                    <select
                                        className="form-select border-0 rounded-5 py-2 px-3 text-white"
                                        style={{ backgroundColor: "var(--color-border)", width: "120px" }}
                                        value={startTime.h}
                                        onChange={(e) => setStartTime(prev => ({
                                            ...prev,
                                            h: e.target.value
                                        }))}
                                    >
                                        <option style={{ color: "grey" }}>Hours</option>
                                        {
                                            Array.from({ length: 24 }, (_, i) => {
                                                const value = i.toString().padStart(2, '0');
                                                return <option key={value} value={value}>{value}</option>;
                                            })
                                        }

                                    </select>
                                    <select
                                        class="form-select border-0 rounded-5 py-2 px-3 text-white"
                                        style={{ backgroundColor: "var(--color-border)", width: "120px" }}
                                        value={startTime.m}
                                        onChange={(e) => setStartTime(prev => ({
                                            ...prev,
                                            m: e.target.value
                                        }))}
                                    >
                                        <option style={{ color: "grey" }}>Minutes</option>
                                        <option value="00">00</option>
                                        <option value="15">15</option>
                                        <option value="30">30</option>
                                        <option value="45">45</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mt-md-4 mt-lg-0">
                            <div className="">
                                <p className='mb-1'>End Time<span className='text-danger'>*</span></p>
                                <div className="d-flex gap-3">
                                    <select
                                        class="form-select border-0 rounded-5 py-2 px-3 text-white"
                                        style={{ backgroundColor: "var(--color-border)", width: "120px" }}
                                        value={endTime.h}
                                        onChange={(e) => setEndTime(prev => ({
                                            ...prev,
                                            h: e.target.value
                                        }))}
                                    >
                                        <option style={{ color: "grey" }}>Hours</option>
                                        {
                                            Array.from({ length: 24 }, (_, i) => {
                                                const value = i.toString().padStart(2, '0');
                                                return <option key={value} value={value}>{value}</option>;
                                            })
                                        }
                                    </select>
                                    <select
                                        class="form-select border-0 rounded-5 py-2 px-3 text-white"
                                        style={{ backgroundColor: "var(--color-border)", width: "120px" }}
                                        value={endTime.m}
                                        onChange={(e) => setEndTime(prev => ({
                                            ...prev,
                                            m: e.target.value
                                        }))}
                                    >
                                        <option selected style={{ color: "grey" }}>Minutes</option>
                                        <option value="00">00</option>
                                        <option value="15">15</option>
                                        <option value="30">30</option>
                                        <option value="45">45</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* row 4 open to section */}
                    <section>
                        <div className="">
                            <p>Open to<span className='text-danger'>*</span></p>
                            <div className="d-flex gap-2 flex-wrap">
                                {openFor.map((item) => (
                                    <div
                                        key={item.id}
                                        className="d-flex flex-column justify-content-center align-items-center py-2 px-3 rounded-3"
                                        style={{
                                            maxWidth: "120px",
                                            border: item.value ? "2px solid #fff" : "2px solid #343A40",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => openForHandler(item.id)}
                                    >
                                        <img src={item.icon} alt={item.title} width="50" />
                                        <p className="mb-0" style={{ fontSize: "10px" }}>{item.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* row 5 age section */}
                    <section className='w-100'>
                        <div className="row">

                            {/* female */}
                            {
                                (openFor[0].value || openFor[1].value) &&

                                <div className="col-md-4">
                                    <p className='mb-1'>Females Age</p>
                                    <div className="d-flex gap-3">
                                        <select
                                            class="form-select border-0 rounded-5 py-2 px-3 text-white"
                                            style={{ backgroundColor: "var(--color-border)", width: "120px" }}
                                            value={ages.female.start}
                                            onChange={(e) => setAges(prev => ({
                                                ...prev,
                                                female: {
                                                    ...prev.female,
                                                    start: e.target.value
                                                }
                                            }))}
                                        >
                                            <option selected style={{ color: "grey" }}>From</option>
                                            {
                                                Array.from({ length: 71 }, (_, i) => {
                                                    const value = (i + 20).toString().padStart(2, '0');
                                                    return <option key={value} value={value}>{value}</option>;
                                                })
                                            }
                                        </select>
                                        <select
                                            class="form-select border-0 rounded-5 py-2 px-3 text-white"
                                            style={{ backgroundColor: "var(--color-border)", width: "120px" }}
                                            value={ages.female.start}
                                            onChange={(e) => setAges(prev => ({
                                                ...prev,
                                                female: {
                                                    ...prev.female,
                                                    end: e.target.value
                                                }
                                            }))}
                                        >
                                            <option selected style={{ color: "grey" }}>Until</option>
                                            {
                                                Array.from({ length: 71 }, (_, i) => {
                                                    const value = (i + 20).toString().padStart(2, '0');
                                                    return <option key={value} value={value}>{value}</option>;
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            }

                            {/* male */}
                            {
                                (openFor[0].value || openFor[2].value) &&
                                <div className="col-md-4 mt-md-0 mt-4">
                                    <p className='mb-1'>Males Age</p>
                                    <div className="d-flex gap-3">
                                        <select
                                            class="form-select border-0 rounded-5 py-2 px-3 text-white"
                                            style={{ backgroundColor: "var(--color-border)", width: "120px" }}
                                            value={ages.male.start}
                                            onChange={(e) => setAges(prev => ({
                                                ...prev,
                                                male: {
                                                    ...prev.male,
                                                    start: e.target.value
                                                }
                                            }))}
                                        >
                                            <option selected style={{ color: "grey" }}>From</option>
                                            {
                                                Array.from({ length: 71 }, (_, i) => {
                                                    const value = (i + 20).toString().padStart(2, '0');
                                                    return <option key={value} value={value}>{value}</option>;
                                                })
                                            }
                                        </select>
                                        <select
                                            class="form-select border-0 rounded-5 py-2 px-3 text-white"
                                            style={{ backgroundColor: "var(--color-border)", width: "120px" }}
                                            value={ages.male.start}
                                            onChange={(e) => setAges(prev => ({
                                                ...prev,
                                                male: {
                                                    ...prev.male,
                                                    end: e.target.value
                                                }
                                            }))}
                                        >
                                            <option selected style={{ color: "grey" }}>Until</option>
                                            {
                                                Array.from({ length: 71 }, (_, i) => {
                                                    const value = (i + 20).toString().padStart(2, '0');
                                                    return <option key={value} value={value}>{value}</option>;
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            }

                            {/* transgender */}
                            {
                                openFor[3].value &&
                                <div className="col-md-4 mt-md-0 mt-4">
                                    <p className='mb-1'>Transgender age</p>
                                    <div className="d-flex gap-3">
                                        <select
                                            class="form-select border-0 rounded-5 py-2 px-3 text-white"
                                            style={{ backgroundColor: "var(--color-border)", width: "120px" }}
                                            value={ages.trans.start}
                                            onChange={(e) => setAges(prev => ({
                                                ...prev,
                                                trans: {
                                                    ...prev.trans,
                                                    start: e.target.value
                                                }
                                            }))}
                                        >
                                            <option selected style={{ color: "grey" }}>From</option>
                                            {
                                                Array.from({ length: 71 }, (_, i) => {
                                                    const value = (i + 20).toString().padStart(2, '0');
                                                    return <option key={value} value={value}>{value}</option>;
                                                })
                                            }
                                        </select>
                                        <select
                                            class="form-select border-0 rounded-5 py-2 px-3 text-white"
                                            style={{ backgroundColor: "var(--color-border)", width: "120px" }}
                                            value={ages.trans.start}
                                            onChange={(e) => setAges(prev => ({
                                                ...prev,
                                                trans: {
                                                    ...prev.trans,
                                                    end: e.target.value
                                                }
                                            }))}
                                        >
                                            <option selected style={{ color: "grey" }}>Until</option>
                                            {
                                                Array.from({ length: 71 }, (_, i) => {
                                                    const value = (i + 20).toString().padStart(2, '0');
                                                    return <option key={value} value={value}>{value}</option>;
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            }
                        </div>
                    </section>

                    {/* row 6 country section */}
                    <section>
                        <div className="d-flex flex-column gap-2">
                            <label htmlFor="country">Where:<span className='text-danger'>*</span></label>
                            <input
                                type="text"
                                id='country'
                                className='border-0 rounded-5 py-2 px-3 text-white'
                                placeholder='Search by country'
                                style={{ backgroundColor: "var(--color-border)", width: "709px", fontSize: "14px" }}
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                    </section>

                    {/* row 7 event section */}
                    <section>
                        <div className="d-flex flex-column gap-2">
                            <label htmlFor="event">Event Name:<span className='text-danger'>*</span></label>
                            <input
                                type="text"
                                id='event'
                                className='border-0 rounded-5 py-2 px-3 text-white'
                                placeholder='Search by country'
                                style={{ backgroundColor: "var(--color-border)", width: "709px", fontSize: "14px" }}
                                value={event}
                                onChange={(e) => setEvent(e.target.value)}
                            />
                        </div>
                    </section>

                    {/* row 8 details section */}
                    <section>
                        <div className="d-flex flex-column gap-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <label htmlFor="details">Details:<span className='text-danger'>*</span></label>
                                <p className='mb-0' style={{ fontSize: "12px" }}>{details_char_len} characters left</p>
                            </div>
                            <textarea
                                id="details"
                                className='border-0 rounded-3 py-2 px-3 text-white'
                                placeholder='Description'
                                rows={"5"}
                                style={{ backgroundColor: "var(--color-border)", width: "709px", fontSize: "14px" }}
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                            />
                        </div>
                    </section>

                    {/* row 9 incognito party section */}
                    <section className='mt-3'>
                        <p className='mb-1'>Incognito Party<span className='text-danger'>*</span></p>
                        <div className="d-flex gap-5">
                            <div className='d-flex gap-2'>
                                <input 
                                    type="checkbox" 
                                    id="incognito_y"
                                    className="form-check-input customCheckBox"
                                    checked={incognito}
                                    onChange={() => setIncognito(true)}
                                />
                                <label className="form-check-label" htmlFor="incognito_y">Yes</label>
                            </div>
                            <div className='d-flex gap-2'>
                                <input
                                    type="checkbox"
                                    id="incognito_n"
                                    className="form-check-input customCheckBox"
                                    checked={!incognito}
                                    onChange={() => setIncognito(false)}
                                />
                                <label className="form-check-label" htmlFor="incognito_n">No</label>
                            </div>
                        </div>
                    </section>

                    {/* row 10 Promote section */}
                    <section className='mt-3'>
                        <p className='mb-1'>Promote my private party to members in the area<span className='text-danger'>*</span></p>
                        <div className="d-flex gap-5">
                            <div className='d-flex gap-2'>
                                <input 
                                    type="checkbox" 
                                    id="promote_y"
                                    className="form-check-input customCheckBox"
                                    checked={promote}
                                    onChange={() => setPromote(true)}
                                />
                                <label className="form-check-label" htmlFor="promote_y">Yes</label>
                            </div>
                            <div className='d-flex gap-2'>
                                <input
                                    type="checkbox"
                                    id="promote_n"
                                    className="form-check-input customCheckBox"
                                    checked={!promote}
                                    onChange={() => setPromote(false)}
                                />
                                <label className="form-check-label" htmlFor="promote_n">No</label>
                            </div>
                        </div>
                    </section>

                    {/* row 11 Invite friends section */}
                    <section className='mt-3'>
                        <p className='mb-1'>Invite my friends to this party<span className='text-danger'>*</span></p>
                        <div className="d-flex gap-5">
                            <div className='d-flex gap-2'>
                                <input 
                                    type="checkbox" 
                                    id="invite_y"
                                    className="form-check-input customCheckBox"
                                    checked={inviteFriend}
                                    onChange={() => setInviteFriend(true)}
                                />
                                <label className="form-check-label" htmlFor="invite_y">Yes</label>
                            </div>
                            <div className='d-flex gap-2'>
                                <input
                                    type="checkbox"
                                    id="invite_n"
                                    className="form-check-input customCheckBox"
                                    checked={!inviteFriend}
                                    onChange={() => setInviteFriend(false)}
                                />
                                <label className="form-check-label" htmlFor="invite_n">No</label>
                            </div>
                        </div>
                    </section>

                    {/* row 12 Show Guestlist section */}
                    <section className='mt-3'>
                        <p className='mb-1'>Show Guestlist to ALL 2+1 members<span className='text-danger'>*</span></p>
                        <div className="d-flex gap-5">
                            <div className='d-flex gap-2'>
                                <input 
                                    type="checkbox" 
                                    id="showList_y"
                                    className="form-check-input customCheckBox"
                                    checked={showList}
                                    onChange={() => setShowList(true)}
                                />
                                <label className="form-check-label" htmlFor="showList_y">Yes</label>
                            </div>
                            <div className='d-flex gap-2'>
                                <input
                                    type="checkbox"
                                    id="showList_n"
                                    className="form-check-input customCheckBox"
                                    checked={!showList}
                                    onChange={() => setShowList(false)}
                                />
                                <label className="form-check-label" htmlFor="showList_n">No</label>
                            </div>
                        </div>
                    </section>

                    {/* submit button */}
                    <section className='mt-3'>
                        <p className='mb-4' style={{ fontSize: "14px" }}>2+1 has final approval on which parties get posted. Once your party is approved it will be automatically added to our private party list, and you will receive a notification. It can take 24 hours before approval is completed.</p>
                        <button type="submit" className='custom-button rounded-5 py-1 border-0' style={{ width: "160px" }}>Post</button>
                    </section>

                </div>
            </PageWrapper>
        </>
    )
}

export default CreatePrivateParty