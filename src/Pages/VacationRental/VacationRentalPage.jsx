import React from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import FilterBar from '../../components/FilterBar/FilterBar'
import LiveStreamCard from '../../components/LiveStreamCard/LiveStreamCard'
import VacationRentalCard from '../../components/VacationRentalCard/VacationRentalCard'

import img1 from "../../assets/ViwCardImags/img/couple5.webp"
import img2 from "../../assets/ViwCardImags/img/couple6.jpeg"
import img3 from "../../assets/ViwCardImags/img/couple7.webp"
import img4 from "../../assets/ViwCardImags/img/couple.png"

const img = [img1,img2,img3,img4]

const VacationRentalPage = () => {
  return (
    <>
    <GlobalPageWrapper>
        <FilterBar pageName={"Add Vacations Rental"} filterName2={"Filter"}/>
        <VacationRentalCard images={img}/>
    </GlobalPageWrapper>
    </>
  )
}

export default VacationRentalPage