import React from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import FilterBar from '../../components/FilterBar/FilterBar'
import EventCard from '../../components/EventCard/EventCard'

import img1 from "../../assets/ViwCardImags/img/couple5.webp"
import img2 from "../../assets/ViwCardImags/img/couple6.jpeg"
import img3 from "../../assets/ViwCardImags/img/couple7.webp"
import { useNavigate } from 'react-router-dom'

import male from "../../assets/ViwCardImags/img/male.png"
import female from "../../assets/ViwCardImags/img/female.png"

const cards = [
  {
    title: "RED HOT LOVERS & SECRET CANDLELIT ✨ saasdasd",
    kind: "Private Party",
    date: "Mar 14, 2025",
    host: "SPLENDIDPARTYS",
    city: "Altedo, ITA",
    distanceLeft: "4256 mi",
    distanceRight: "1587 mi",
    attendees: 120,
    genders: [male, female, male],
    image: img1, // optional image path
  },
  {
    title: "MIDNIGHT FLIRT & GLOW",
    kind: "Private Party",
    date: "Mar 18, 2025",
    host: "NIGHTVIBE CLUB",
    city: "Florence, ITA",
    distanceLeft: "3200 mi",
    distanceRight: "1482 mi",
    attendees: 96,
    genders: [male, female],
    image: img2,
  },
  {
    title: "URBAN FANTASY HANGOUT",
    kind: "Exclusive Meetup",
    date: "Apr 02, 2025",
    host: "DREAMLINE EVENTS",
    city: "Milan, ITA",
    distanceLeft: "3798 mi",
    distanceRight: "1327 mi",
    attendees: 140,
    genders: [female],
    image: img3,
  },
  {
    title: "SPRING COUPLE JAM",
    kind: "Private Party",
    date: "Mar 28, 2025",
    host: "PARTYBEATZ",
    city: "Rome, ITA",
    distanceLeft: "4012 mi",
    distanceRight: "1580 mi",
    attendees: 105,
    genders: [male, female],
    image: img1,
  },
  {
    title: "SUNSET VIBES & SINGLES",
    kind: "Singles Gathering",
    date: "Mar 21, 2025",
    host: "HEARTLINE CREW",
    city: "Venice, ITA",
    distanceLeft: "2899 mi",
    distanceRight: "1420 mi",
    attendees: 88,
    genders: [male],
    image: img2,
  },
  {
    title: "SECRET NIGHT RENDEZVOUS",
    kind: "Private Party",
    date: "Mar 30, 2025",
    host: "SPARKLIGHT",
    city: "Naples, ITA",
    distanceLeft: "3921 mi",
    distanceRight: "1450 mi",
    attendees: 115,
    genders: [male, female],
    image: img3,
  },
];


const PartiesAndEventPage = () => {
    const navigate = useNavigate()
    const handlEtakeToEventInfo = (card) => {
        navigate("/event-info", { state: card })
    }

    const handlePagenavigate = () =>{
      navigate("/create-private-party")
    }
    return (
        <>
            <GlobalPageWrapper>
                <FilterBar pageName={"Parties & Events"} navigationPageName1={"Private Party"} navigationToAnotherPage={handlePagenavigate} filterName2={"Filter"} checkbox={false} showDatePicker={true} distanceSlider={true} showLocationForm={true} age={false} friendsFilterTopSearchBar={true}/>

                <div className="container-fluid client-page-background">
                    <div className="row g-4 py-3">
                        {
                            cards.map((card, index) => (
                                <div className="col-12 col-sm-6 col-lg-6 col-xl-3 p-0 mt-3" key={index}>
                                    <div style={{ maxWidth: "400px", margin: "auto" }}>
                                        <EventCard card={card} handlEtakeToEventInfo={()=>handlEtakeToEventInfo(card)}/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </GlobalPageWrapper>
        </>
    )
}

export default PartiesAndEventPage