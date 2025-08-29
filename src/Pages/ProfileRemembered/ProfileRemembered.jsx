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
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refresh, setrefresh] = useState(false)

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

            const totalCount = response?.data?.meta?.pagination?.total || null;
            const apiTotalPages =
                response?.data?.meta?.pagination?.pageCount || null;

            setCards(members);

            if (totalCount !== null) {
                setTotalPages(Math.ceil(totalCount / limit));
            } else if (apiTotalPages !== null) {
                setTotalPages(apiTotalPages);
            } else {
                setTotalPages(1);
            }
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
                            cards.map((card, index) => (
                                <div className="col-12 col-sm-6 col-lg-6 col-xl-4 " key={index}>
                                    <ViewPageCard card={card} index={index} images={images} showFriendOptions={false} timestamp={false} deleteOption={true} handleeDeleteFunction={handleeDeleteFunction} showRemembered={false}/>
                                </div>
                            ))
                        }
                    </div>
                </div>


                {/* Items per page selector */}
                <div className="d-flex justify-content-start align-items-center gap-2 my-3">
                    <label className="text-white mb-0">Items per page:</label>
                    <select
                        className="form-select form-select-sm w-auto"
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        {[3, 6, 9].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Capsule-style Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />

            </GlobalPageWrapper>
        </>
    )
}

export default ProfileRemembered;