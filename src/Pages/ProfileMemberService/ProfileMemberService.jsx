import React from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import FilterBar from '../../components/FilterBar/FilterBar'

import img1 from "../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../assets/ViwCardImags/img/profileImg.webp";
import ViewPageCard from '../../components/ViewPageCard/ViewPageCard';
import MemberServiceCard from '../../components/MemberServiceCard/MemberServiceCard';

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

const ProfileMemberService = () => {
    return (
        <>
            <GlobalPageWrapper>
                <FilterBar pageName={"Member Services"} filterName1={"+ Member Services"} filterName2={"Filter"} />

                <div className="container-fluid">
                    <div className="row g-4 pt-4">
                        {
                            cards.length === 0 ? <div className='text-white'>No Users Found </div> :
                                cards.map((card, index) => (
                                    <div className="col-12 col-sm-6 col-lg-6 col-xl-4 " key={index}>
                                        <MemberServiceCard index={index} images={images} timestamp={true}
                                            card={card} rawTimestamp={card?.timestamp}
                                        />
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </GlobalPageWrapper>
        </>
    )
}

export default ProfileMemberService