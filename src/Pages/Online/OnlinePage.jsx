import React, { useState } from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import FilterBar from '../../components/FilterBar/FilterBar'
import ViewPageCard from '../../components/ViewPageCard/ViewPageCard';

import img1 from "../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../assets/ViwCardImags/img/profileImg.webp";
import SpeedDateCheckBoxPopup from '../../components/SpeedDateCheckBoxPopup/SpeedDateCheckBoxPopup';

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
    "Couples",
    "Female",
    "Male",
    "Business",
    "Transgender",
    "Looking for me / us",
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

const SpeedDateCheckBoxPopupOptions = {
    heading: "FEATURES",
    options: [
        "Birthday",
        "Speed Date",
        "Videos",
        "Profile Picture"
    ]
}

const OnlinePage = () => {
    const [showSpeeddateCheckBox, setShowSpeeddateCheckBox] = useState(false);

    const handleFeaturePopup = () =>{
        setShowSpeeddateCheckBox(true)
    }
    return (
        <>
            <GlobalPageWrapper />
            <FilterBar filter2={filter} handleSpedDatePopup={true} handleFeaturePopup={handleFeaturePopup} showLocationForm={true} filterName2={"Filter"} showTab={false} pageName={"Online Now"} distanceSlider={false} bottomForm={false} width={"280px"} />

            <div className="container-fluid client-page-background">
                <div className="row g-4 pt-4">
                    {
                        cards.map((card, index) => (
                            <div className="col-12 col-sm-6 col-lg-6 col-xl-4 " key={index}>
                                <ViewPageCard index={index} images={images} />
                            </div>
                        ))
                    }
                </div>
                <SpeedDateCheckBoxPopup show={showSpeeddateCheckBox} handleClose={() => setShowSpeeddateCheckBox(false)} SpeedDateCheckBoxPopupOptions={SpeedDateCheckBoxPopupOptions} />
            </div>
        </>
    )
}

export default OnlinePage