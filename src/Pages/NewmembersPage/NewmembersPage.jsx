import React, { useState, useEffect } from 'react';
import GlobalPageWrapper from '../../components/GlobalPageWrapper';
import FilterBar from '../../components/FilterBar/FilterBar';
import ViewPageCard from '../../components/ViewPageCard/ViewPageCard';
import Pagination from '../../components/Pagination/Pagination';
import axios from 'axios';

// Images
import img1 from "../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../assets/ViwCardImags/img/profileImg.webp";

// Toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showErrorToast } from '../../components/customToast/CustomToast';
import OverlayLoader from '../../helper/OverlayLoader';

const images = [img1, img2, img3, img4];
const filter = [
    "Likes given", "Joined group", "Photos & Videos", "Validations", "Speed Date",
    "Travel Plans", "Parties & Events", "Member Services", "New Friends / Followers"
];

const NewmembersPage = () => {
    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const apiUrl = import.meta.env.VITE_BASE_URL;

    const fetchMembers = async (page, limit) => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('jwtToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: { page, limit }
            };

            const response = await axios.get(`${apiUrl}/users`, config);
            const members = response?.data?.data || [];

            const totalCount = response?.data?.meta?.pagination?.total || null;
            const apiTotalPages = response?.data?.meta?.pagination?.pageCount || null;

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
    }, [currentPage, itemsPerPage]);

    return (
        <div style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
            <GlobalPageWrapper>
                <OverlayLoader show={loading} text="Please wait..." />
                <FilterBar
                    pageName="New Members"
                    filter2={filter}
                    filterName2="Filter"
                    showTab={false}
                    distanceSlider={false}
                    bottomForm={false}
                    width="280px"
                />

                <div className="container-fluid">
                    <div className="row g-4 pt-4">
                        {cards.length > 0 ? (
                            cards.map((card, index) => (
                                <div className="col-12 col-sm-6 col-lg-6 col-xl-4" key={card._id || index}>
                                    <ViewPageCard
                                        index={index}
                                        images={images}
                                        timestamp={false}
                                        card={card}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-white">No members found.</p>
                        )}
                    </div>
                </div>

                {/* Items per page selector */}
                <div className="d-flex justify-content-left align-items-center gap-2 my-3">
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
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>

                {/* Capsule-style Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />

                {/* Toast Container */}
                <ToastContainer />
            </GlobalPageWrapper>
        </div>
    );
};

export default NewmembersPage;
