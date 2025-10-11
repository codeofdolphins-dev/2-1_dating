import React, { useEffect, useState } from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import FilterBar from '../../components/FilterBar/FilterBar'
import HotDatePageCard from '../../components/HotDatePageCard/HotDatePageCard';

const map = [
  "Latest",
  "Couples",
  "Female",
  "Male",
  "Transgender",
  "Looking for me/us",
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

import img1 from "../../assets/ViwCardImags/img/couple.avif";
// import img2 from "../../assets/ViwCardImags/img/coupleImg.jpeg";
// import img3 from "../../assets/ViwCardImags/img/profileImg.png";
// import img4 from "../../assets/ViwCardImags/img/profileImg.webp";
import img5 from "../../assets/ViwCardImags/img/couple5.webp";
import img6 from "../../assets/ViwCardImags/img/couple6.jpeg";
import img7 from "../../assets/ViwCardImags/img/couple7.webp";
import SpeedDatePopup from '../../components/SpeedDatePopUp/SpeedDatePopUp';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min';
import TravelDatePopup from '../../components/TravelDatePopup/TravelDatePopup';
import SpeedDateCheckBoxPopup from '../../components/SpeedDateCheckBoxPopup/SpeedDateCheckBoxPopup';
import { useNavigate } from 'react-router-dom';
import PaginationWithSelector from '../../components/Pagination/PaginationWithSelector';
import httpService from '../../helper/httpService';

const images = [img5, img6, img7, img1];
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

const speedDateModalData = {
  modaltitle: "Speed Date",
  placeType: "Private Place",
  date: "Mar 22, 2025",
  dateWith: "Prson1",
  where: "Cary, North Carolina 8963 mi",
  description: "We are visiting NC for work every month. So all 🔥 couples and single ladies to the front!",
  subDescription: "Looking for women who love other women 😏 is a plus.",
};

const travelDateModalData = {
  modaltitle: "Travel Plans",
  dateRange: "Mar 22, 2025 – Mar 22, 2025",
  location: "Cary, North Carolina, US",
  distance: "668 – km/miles",
  description:
    "Single ladies & sensual couples to the front! We travel here for work often! So finding regulars for a fun encounter every month would be fun! Need to catch an early morning flight so let's meet early to get some fun in 😏. In Cary & Clayton area!",
};

const SpeedDateCheckBoxPopupOptions = {
  heading: "SPEED DATE TYPE",
  options: [
    "Private Place",
    "Public Place",
    "Virtual Date"
  ]
}

const HotDatePage = () => {
  const [showTraveldate, setShowTraveldateShow] = useState(false);
  const [showSpeeddate, setShowSpeddateShow] = useState(false);
  const [showSpeeddateCheckBox, setShowSpeeddateCheckBox] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalCount, setTotalCount] = useState(0)
  const [apiTotalPages, setApiTotalPages] = useState(0)

  const[dateInfo,setDateInfo]=useState([])

  const navigate = useNavigate()

  const handleSpedDateTypePopup = () => {
    setShowSpeeddateCheckBox(true)
    console.log(showSpeeddate)
  }

  const handleSpedDatePopup = () => {
    setShowSpeddateShow(true)
    console.log(showSpeeddate)
  }

  const handleTravelDatePopup = () => {
    setShowTraveldateShow(true)
    console.log(showSpeeddate)
  }

  const navigationpage = () => {
    navigate("/create-speeddate")
  }

  useEffect(() => {
    httpService("/speed-dates", "GET")
      .then((res) => {
        console.log("group data", res?.data?.creator?.profile?.photos[0])
        setDateInfo(res?.data)
      })
      .catch((err) => {
        console.log("group data", err)
      })
  }, [])
  return (
    <>
      <GlobalPageWrapper >
        <FilterBar filter1={map} navigationPageName2={"+ Speed Date"} navigationToAnotherPage2={navigationpage} filter2={filter} filterName1={"Filter"} showTab={false} pageName={"Hot Date"} distanceSlider={true} bottomForm={false} width={"330px"} showDatePicker={true} showLocationForm={true} filterTypeName={"Speed Date Type"} handleSpedDatePopup={handleSpedDateTypePopup} checkbox={false} />

        <div className='client-page-background'>
          <div className="container-fluid">
            <div className="row g-4 pt-4">
              {
                dateInfo.map((card, index) => (
                  <div className="col-12 col-sm-6 col-lg-6 col-xl-4 " key={index}>
                    <HotDatePageCard index={index} images={card?.creator?.profile?.photos} handleSpedDatePopup={handleSpedDatePopup} handleTravelDatePopup={handleTravelDatePopup}
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


        <SpeedDatePopup show={showSpeeddate} handleClose={() => setShowSpeddateShow(false)} speedDateModalData={speedDateModalData} />
        <TravelDatePopup show={showTraveldate} handleClose={() => setShowTraveldateShow(false)} travelDateModalData={travelDateModalData} />
        <SpeedDateCheckBoxPopup show={showSpeeddateCheckBox} handleClose={() => setShowSpeeddateCheckBox(false)} SpeedDateCheckBoxPopupOptions={SpeedDateCheckBoxPopupOptions} />

        <PaginationWithSelector
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}

          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}

          totalCount={totalCount}
          apiTotalPages={apiTotalPages}
        />

      </GlobalPageWrapper>
    </>
  )
}

export default HotDatePage