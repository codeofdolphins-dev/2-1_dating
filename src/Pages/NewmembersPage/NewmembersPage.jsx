import React from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import FilterBar from '../../components/FilterBar/FilterBar'
import ViewPageCard from '../../components/ViewPageCard/ViewPageCard';

import img1 from "../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../assets/ViwCardImags/img/profileImg.webp";

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

const images = [img1, img2, img3, img4];

const NewmembersPage = () => {
    return (
        <>
        <div style={{backgroundColor:"var(--color-background)"}}>
            <GlobalPageWrapper>
                <FilterBar pageName={"New Members"} filter1={map} filter2={filter} filterName1={"Map"} filterName2={"Filter"} showTab={false} distanceSlider={false} bottomForm={false} width={"280px"} />

                <div className="container-fluid">
                    <div className="row g-4 pt-4">
                        {
                            cards.map((card, index) => (
                                <div className="col-12 col-sm-6 col-lg-6 col-xl-4 " key={index}>
                                    <ViewPageCard index={index} images={images} timestamp={false}
                                        {...{
                                            card,

                                        }}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </GlobalPageWrapper>
        </div>
        </>
    )
}

export default NewmembersPage