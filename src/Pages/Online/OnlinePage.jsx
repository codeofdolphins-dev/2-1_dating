import React from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import FilterBar from '../../components/FilterBar/FilterBar'

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

const OnlinePage = () => {
    return (
        <>
            <GlobalPageWrapper />
            <FilterBar filter1={map} filter2={filter} filterName1={"Map"} filterName2={"Filter"} showTab={false} pageName={"Online"}/>
        </>
    )
}

export default OnlinePage