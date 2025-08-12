import React from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import FilterBar from '../../components/FilterBar/FilterBar'
import { useNavigate } from 'react-router-dom'

import img1 from "../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../assets/ViwCardImags/img/profileImg.webp";
import ViewPageCard from '../../components/ViewPageCard/ViewPageCard';

const cards = [
  { username: "Card One" },
  { username: "Card Two" },
  { username: "Card Three" },
  { username: "Card Four" },
  { username: "Card Five" },
  { username: "Card Six" },
  { username: "Card Seven" },
  // ...
];

const images = [img1, img2, img3, img4];

const FeaturedMembers = () => {
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate("/add-me")
  }
  return (
    <>
      <div style={{backgroundColor:"var(--color-background)"}}>
      <GlobalPageWrapper />
      <FilterBar pageName={"Featured Members"} navigationPageName2={"+Add Me"} navigationToAnotherPage2={handleNavigation} />

      <div className="container-fluid">
        <div className="row g-4 pt-4">
          {
            cards.map((card, index) => (
              <div className="col-12 col-sm-6 col-lg-6 col-xl-4 " key={index}>
                <ViewPageCard card={card} index={index} images={images} timestamp={false}
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
    </>
  )
}

export default FeaturedMembers