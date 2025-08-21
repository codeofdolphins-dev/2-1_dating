import React, { useEffect, useState } from 'react'
import GlobalPageWrapper from "../../components/GlobalPageWrapper"
import FilterBar from "../../components/FilterBar/FilterBar"

import img1 from "../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../assets/ViwCardImags/img/profileImg.webp";
import ViewPageCard from '../../components/ViewPageCard/ViewPageCard';
import httpService from '../../helper/httpService';
import { showErrorToast, showSuccessToast } from '../../components/customToast/CustomToast';

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



const LikeDislike = () => {
    const[user,setUser]=useState([])
    useEffect(() => {
        httpService("/interactions/likes", "GET")
            .then((response) => {
                console.log("Like dislike fetched:", response);
                showSuccessToast(response?.message);
                setUser(response)
            })
            .catch((err) => {
                console.error("Failed to ftched Like dislike:", err);
                showErrorToast(err?.response?.data?.message);
            });
    }, []); // dependency on card._id
    return (
        <>
            <GlobalPageWrapper>
                <FilterBar pageName={"Likes / Dislikes"} filterName2={"Filter"} />
                <div className="container-fluid">
                    <div className="row g-4 pt-4">
                        {
                            user.map((card, index) => (
                                <div className="col-12 col-sm-6 col-lg-6 col-xl-4 " key={index}>
                                    <ViewPageCard card={card} index={index} images={images} likeIcon={true}
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

export default LikeDislike