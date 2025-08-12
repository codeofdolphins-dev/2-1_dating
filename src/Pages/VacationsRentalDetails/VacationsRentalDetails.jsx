import React, { useState } from 'react'
import PageWrapper from '../../components/PageWrapper'
import dummyImage from "../../assets/ViwCardImags/img/profileImg.png";
import messengerIcon from "../../assets/icons/messenger.png";
import cameraIcon from "../../assets/icons/camera.png";
import folderIcon from "../../assets/icons/folder.png";
import groupIcon from "../../assets/icons/group.png";
import inviteIcon from "../../assets/icons/invite.png";
import noteIcon from "../../assets/icons/note.png";
import penIcon from "../../assets/icons/pen.png";
import shareIcon from "../../assets/icons/share.png";
import bellIcon from "../../assets/icons/bell.png";
import videoIcon from "../../assets/icons/video.png";


import style from "./VacationsRentalDetails.module.css";
import Groups from './components/GroupsCard/Groups.card';
import PartiesAndeventCard from '../../components/profilePageBottomCards/parties&eventCard/PartiesAndeventCard';
import PartyReview from './components/Review/PartyReview';
import BusinessReview from './components/Review/BusinessReview';
import FollowersCard from './components/FollowersCard/Followers.card';
import { useNavigate } from 'react-router-dom';



const VacationsRentalDetails = () => {

    const navigate = useNavigate();

    return (
        <>
            <div style={{ backgroundColor: "var(--color-background)" }}>
                <PageWrapper >
                    <div className="container-fluid py-5 d-flex flex-column align-items-start justify-content-center gap-2 text-white mt-3" >

                        {/* navigation */}
                        <div className="d-flex justify-content-start align-items-center gap-3">
                            <i
                                className="bi bi-chevron-left fs-5 back-icon"
                                onClick={() => navigate("/feed")}
                            ></i>
                            {/* <h4 className='text-white mb-0'></h4> */}
                        </div>

                        {/* row 1 */}
                        <div className="component w-100">
                            {/* sub row 1-1 */}
                            <div className="parent w-100 mt-2 mb-4">
                                <div className="row w-100">
                                    {/* left */}
                                    <div className="col-lg-4 mb-2">
                                        <div className="d-flex flex-column gap-2">
                                            <div className="d-flex align-items-center gap-4">
                                                <p className='text-white mb-0 fs-6'>BTHEHOUSE</p>
                                                <i className="bi bi-three-dots-vertical text-white"></i>
                                            </div>
                                            <div className="d-flex align-items-center gap-1">
                                                <i className="bi bi-geo-alt-fill text-white"></i>
                                                <p className='text-white mb-0' style={{ fontSize: "14px" }}>94555, CA 94555, USA | 8412 mi</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* right */}
                                    <div className="col-lg-8 align-self-end">
                                        <div className="d-flex justify-content-between align-items-center gap-2 ps-2">
                                            <div className="" style={{ fontSize: "20px" }}>
                                                <p className='mb-0'> Home / Apartment </p>
                                            </div>
                                            <div className="">
                                                <button className='custom-button border-0 rounded-5 py-1 px-3'>Translate</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* sub row 1-2 */}
                            <div className="parent w-100">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="">
                                            {/* image */}
                                            <div className="">
                                                <img src={dummyImage} alt="" className="w-100" />
                                            </div>
                                            {/* all icons */}
                                            <div className="d-flex justify-content-start align-items-center gap-3 my-3 flex-wrap">
                                                <div className={style.icon}>
                                                    <img src={messengerIcon} alt="" width={"27px"} />
                                                    <p>Messenger</p>
                                                </div>
                                                <div className={style.icon}>
                                                    <img src={cameraIcon} alt="" width={"27px"} />
                                                    <p>Adult</p>
                                                </div>
                                                <div className={style.icon}>
                                                    <img src={cameraIcon} alt="" width={"27px"} />
                                                    <p>Non-Adult</p>
                                                </div>
                                                <div className={style.icon}>
                                                    <img src={videoIcon} alt="" width={"27px"} />
                                                    <p>Videos</p>
                                                </div>
                                                <div className={style.icon}>
                                                    <img src={folderIcon} alt="" width={"27px"} />
                                                    <p>Album</p>
                                                </div>
                                                <div className={style.icon}>
                                                    <img src={groupIcon} alt="" width={"27px"} />
                                                    <p>Follow</p>
                                                </div>
                                                <div className={style.icon}>
                                                    <img src={penIcon} alt="" width={"27px"} />
                                                    <p>Write review</p>
                                                </div>
                                                <div className={style.icon}>
                                                    <img src={shareIcon} alt="" width={"27px"} />
                                                    <p>Share</p>
                                                </div>
                                                <div className={style.icon}>
                                                    <img src={inviteIcon} alt="" width={"27px"} />
                                                    <p>Invite</p>
                                                </div>
                                                <div className={style.icon}>
                                                    <img src={bellIcon} alt="" width={"27px"} />
                                                    <p>Remember</p>
                                                </div>
                                                <div className={style.icon}>
                                                    <img src={noteIcon} alt="" width={"27px"} />
                                                    <p>Notes</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className={`d-flex flex-column justify-content-center align-items-start ${style.info}`}>
                                            <p className='mb-5'>We have been going parties here for over 23 years. The House is open most every Saturday night from 1pm – 2am in the summer 7pm – 2am in the winter. Please plan to be at THE HOUSE by 10:30 pm. We will lock the door at 10:30 pm. So if you cant make it by then please do not make your reservation that week. No one will be let in after that. Our parties are for couples and single females only. Single men by themselves are not allowed on Saturday parties. Only Friday parties.. We are a on-premise party in Raleigh, North Carolina. Absolutely NO pressure, no one is required to do anything that they do not wish to do. Great for new couples, soft swingers and experienced alike. No membership fees or dues. We are a reservation request only club and not open to the general public, anyone that wishes to come to a party must sign an agreement form in order to be admitted to our party.</p>
                                            <p>We have been going parties here for over 23 years. The House is open most every Saturday night from 1pm – 2am in the summer 7pm – 2am in the winter. Please plan to be at THE HOUSE by 10:30 pm. We will lock the door at 10:30 pm. So if you cant make it by then please do not make your reservation that week. No one will be let in after that. Our parties are for couples and single females only. Single men by themselves are not allowed on Saturday parties. Only Friday parties.. We are a on-premise party in Raleigh, North Carolina. Absolutely NO pressure, no one is required to do anything that they do not wish to do. Great for new couples, soft swingers and experienced alike. No membership fees or dues. We are a reservation request only club and not open to the general public, anyone that wishes to come to a party must sign an agreement form in order to be admitted to our party.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* row 2 */}
                        <div className="component w-100 d-flex flex-column gap-4">

                            {/* heading */}
                            <div className="mt-3">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h5 className={`${style.heading}`}>Details</h5>
                                    </div>
                                </div>
                            </div>

                            {/* sub-row 1 */}
                            <div className="parent w-100">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <h6 className={`${style.subHeader}`}>Language</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            <p className={`${style.options}`}>English</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <h6 className={`${style.subHeader}`}>Generic</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            <p className={`${style.options}`}>Location Size 3000 square feet</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <h6 className={`${style.subHeader}`}>Food & Drink</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            <p className={`${style.options}`}>Food Available</p>
                                            <p className={`${style.options}`}>BYOB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* sub-row 2 */}
                            <div className="parent w-100">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h6 className={`${style.subHeader}`}>Facilities</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            <p className={`${style.options}`}>Dance Floor</p>
                                            <p className={`${style.options}`}>Play at Location</p>
                                            <p className={`${style.options}`}>Outside Area</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* sub-row 3 */}
                            <div className="parent w-100">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h6 className={`${style.subHeader}`}>Erotism</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            <p className={`${style.options}`}>Glory Hole</p>
                                            <p className={`${style.options}`}>Fetish Room/Area</p>
                                            <p className={`${style.options}`}>Private Rooms</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* sub-row 4 */}
                            <div className="parent w-100">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <h6 className={`${style.subHeader}`}>Wellness</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            <p className={`${style.options}`}>Jacuzzi</p>
                                            <p className={`${style.options}`}>Swimming Pool</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* row 3 */}
                        <div className="component w-100 d-flex flex-column gap-4">
                            {/* heading */}
                            <div className="mt-3">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h5 className={`${style.heading}`}>Groups</h5>
                                    </div>
                                </div>
                            </div>

                            {/* sub-row */}
                            <div className="parent px-2">
                                <div className="row overflow-auto" style={{ height: "500px" }}>
                                    {[1, 2, 3, 4, 5, 6, 7].map((item, i) => (
                                        <div className="col-lg-4 col-md-6 mb-2 px-1" key={i}>
                                            <Groups {...item} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* row 4 */}
                        <div className="component w-100 d-flex flex-column gap-4 mt-3">
                            {/* heading */}
                            <div className="mt-3">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h5 className={`${style.heading}`}>Events</h5>
                                    </div>
                                </div>
                            </div>

                            {/* sub-row */}
                            <div className="parent px-2">
                                <div className="row overflow-auto" style={{ height: "500px" }}>
                                    {[1, 2, 3, 4, 5, 6, 7].map((item, i) => (
                                        <div className="col-lg-4 col-md-6 mb-2 px-1" key={i}>
                                            <PartiesAndeventCard
                                                title='----'
                                                address='----'
                                                createdBy='----'
                                                date='----'
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                        {/* row 5 */}
                        <div className="component w-100 d-flex flex-column gap-4 mt-3">
                            {/* heading */}
                            <div className="mt-3">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className={`${style.heading}`}>REVIEWS (24)</h5>
                                            <button type='button' className='rounded-5 py-2 px-4 custom-button border-0'>Show All</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* sub-row */}
                            <div className="parent px-2">
                                {[1, 2, 3, 4, 5, 6, 7].map((item, i) => (
                                    <div className="row" key={i}>
                                        <div className="col-lg-12 mb-2 px-1">
                                            <PartyReview review={item} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* row 6 */}
                        <div className="component w-100 d-flex flex-column gap-4 mt-3">
                            {/* heading */}
                            <div className="mt-3">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className={`${style.heading}`}>BUSINESS REVIEWS (17)</h5>
                                            <button type='button' className='rounded-5 px-4 py-2 custom-button border-0'>Show All</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* sub-row */}
                            <div className="parent px-2">
                                {[1, 2, 3, 4, 5, 6, 7].map((item, i) => (
                                    <div className="row" key={i}>
                                        <div className="col-lg-12 mb-2 px-1">
                                            <BusinessReview review={item} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* row 7 */}
                        <div className="component w-100 d-flex flex-column gap-4 mt-3">
                            {/* heading */}
                            <div className="mt-3">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className={`${style.heading}`}>Followers (27)</h5>
                                            <button type='button' className='rounded-5 px-4 py-2 custom-button border-0'>Show All</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* sub-row */}
                            <div className="parent px-2" >
                                <div className="row overflow-auto" style={{ height: "500px" }}>
                                    {[1, 2, 3, 4, 5, 6, 7].map((item, i) => (
                                        <div className="col-xl-4 col-md-6 mb-2 px-1" key={i}>
                                            <FollowersCard />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </PageWrapper>
            </div>
        </>
    )
}

export default VacationsRentalDetails;