import React, { useEffect, useState } from 'react'

import FilterBar from "../../components/FilterBar/FilterBar"
import GlobalPageWrapper from '../../components/GlobalPageWrapper'

import img1 from "../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../assets/ViwCardImags/img/profileImg.webp";
import ViewPageCard from '../../components/ViewPageCard/ViewPageCard';
import axios from 'axios';
import { showErrorToast, showSuccessToast } from '../../components/customToast/CustomToast';
import httpService from '../../helper/httpService';
import Pagination from '../../components/Pagination/Pagination';
import PaginationWithSelector from '../../components/Pagination/PaginationWithSelector';

const cards = [
    { username: "Card One" },
    { username: "Card Two" },
    { username: "Card Three" },
    { username: "Card Four" },
    { username: "Card Five" },
    { username: "Card Six" },
    { username: "Card Seven" }
];

const images = [img1, img2, img3, img4];


const ProfileRemembered = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setrefresh] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalCount, setTotalCount] = useState(0)
    const [apiTotalPages, setApiTotalPages] = useState(0)

    const apiUrl = import.meta.env.VITE_BASE_URL;

    const fetchMembers = async (page, limit) => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem("jwtToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                params: { page, limit },
            };

            const response = await axios.get(`${apiUrl}/remember-me/sent`, config);
            const members = response?.data?.data || [];
            console.log("onlnile response", response?.data?.data)

            setTotalCount(response?.data?.meta?.pagination?.total || null);
            setApiTotalPages(response?.data?.meta?.pagination?.pageCount || null);

            setCards(members);
        } catch (error) {
            console.error("Failed to fetch members:", error);
            showErrorToast(`Please login again. ${error?.response?.data?.message || "An error occurred."}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers(currentPage, itemsPerPage);
    }, [currentPage, itemsPerPage, refresh]);


    // handle remove remember me 
    const handleeDeleteFunction = async (card) => {
        console.log("all ok", card)
        try {
            const response = await httpService(`/remember-me/${card._id}`, "DELETE")
            if (response) {
                console.log(response)
                showSuccessToast(response?.message);
                setrefresh(!refresh)
            }
        } catch (err) {
            console.log(err)
            showErrorToast(err?.response?.data?.message);
            setrefresh(!refresh)
        }
    }


    return (
        <>
            <GlobalPageWrapper>
                <FilterBar clas pageName={"Remembered"} />

                <div className="container-fluid">
                    <div className="row g-4 pt-4">
                        {
                            cards?.length === 0 ? <div className='text-white'>No Users Found </div> : cards.map((card, index) => (
                                <div className="col-12 col-sm-6 col-lg-6 col-xl-4 " key={index}>
                                    <ViewPageCard card={card} index={index} images={images} showFriendOptions={false} timestamp={false} deleteOption={true} handleeDeleteFunction={handleeDeleteFunction} showRemembered={false}/>
                                </div>
                            ))
                        }
                    </div>
                </div>

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

export default ProfileRemembered;