import React from 'react'
import CertificationpageCard from '../../components/CertificationpageCard/CertificationpageCard'
import img1 from "../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../assets/ViwCardImags/img/profileImg.webp";
import img5 from "../../assets/ViwCardImags/img/couple5.webp";
import img6 from "../../assets/ViwCardImags/img/couple6.jpeg";
import img7 from "../../assets/ViwCardImags/img/couple7.webp";
import GlobalPageWrapper from '../../components/GlobalPageWrapper';
import FilterBar from '../../components/FilterBar/FilterBar';

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

const CertificationPage = () => {
    return (
        <GlobalPageWrapper>
            <FilterBar pageName={"Certification"} filterName2={"Filter"} />
            <div className='client-page-background'>
                <div className="container-fluid">
                    <div className="row g-4 pt-4">
                        {
                            cards.map((card, index) => (
                                <div className="col-12 col-sm-6 col-lg-6 col-xl-4 " key={index}>
                                    <CertificationpageCard images={images} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </GlobalPageWrapper>
    )
}

export default CertificationPage