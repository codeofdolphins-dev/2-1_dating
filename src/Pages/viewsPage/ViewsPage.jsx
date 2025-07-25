import React, { useState } from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import ViewPageCard from '../../components/ViewPageCard/ViewPageCard';
import FilterBar from '../../components/FilterBar/FilterBar';
// import ViewPageMessangerPopup from '../../components/viewPageMessangerPopup/viewPageMessangerPopup';

import img1 from "../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../assets/ViwCardImags/img/profileImg.webp";


const map = [
    "Viewed me",
    "Viewed each other",
    "Who I viewed",
    "Remembered",
    "Latest",
    "Distance",
    "All",
    "Couples & Females",
    "Couples",
    "Female",
    "Male",
    "Transgender",
    "Business",
    "Ethnicity"
];

const filter = [
    "Likes given",
    "Joined group",
    "Photos & Videos",
    "Validations",
    "Speed Date",
    "Travel Plans",
    "Parties & Events",
    "Member Services",
    "New Friends / Followers"
];

const cards = [
  { title: "Card One" },
  { title: "Card Two" },
  { title: "Card Three" },
  { title: "Card Four" },
  { title: "Card Five" },
  { title: "Card Six" },
  { title: "Card Seven" },
  // ...
];

const images = [img1, img2, img3, img4];
const ViewsPage = () => {
    const [popupOpenId, setPopupOpenId] = useState(null);
    const [activeTab, setActiveTab] = useState("feed");
    const [showGeneralFilter, setShowGeneralFilter] = useState(false)
    const [ShowFriendsFilter, setShowFriendsFilter] = useState(false)

    const handleGeneralFilter = () => {
        setShowGeneralFilter(!showGeneralFilter)
        if (ShowFriendsFilter)
            setShowFriendsFilter(!ShowFriendsFilter)
        console.log(showGeneralFilter)
    }

    const handleFriendFilter = () => {
        setShowFriendsFilter(!ShowFriendsFilter)
        if (showGeneralFilter)
            setShowGeneralFilter(!showGeneralFilter)
        console.log(showGeneralFilter)
    }

    // const [user,SetUser] = useState({name:"Bishal"})

    // console.log(activeTab)

    // const handleAccept = () =>{
    //     console.log("all ok")
    // }

    const [selected, setSelected] = useState(["Viewed me"]);

    const handleToggle = (label) => {
        setSelected((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };


    return (
        <>
            <GlobalPageWrapper>
                <div className='client-page-background'>
                    <FilterBar filter1={map} filter2={filter} filterName1={"Map"} filterName2={"Filter"} showTab={false} pageName={"Viewed Me"} distanceSlider={false} bottomForm={true} width={"280px"}/>

                    <div className="container-fluid">
                        <div className="row g-4 pt-4">
                            {
                                cards.map((card, index) => (
                                    <div className="col-12 col-sm-6 col-lg-6 col-xl-4 " key={index}>
                                        <ViewPageCard index={index} images={images} timestamp={true}
                                            {...{
                                                card,
                                  
                                            }}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </GlobalPageWrapper>
        </>
    )
}

export default ViewsPage