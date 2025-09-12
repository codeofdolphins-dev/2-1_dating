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
import PaginationWithSelector from '../../components/Pagination/PaginationWithSelector';

const images = [img1, img2, img3, img4];
const filter = [
    "Couples", "Female", "Male", "Business", "Transgender",
    "Looking for me / us"
];

const NewmembersPage = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalCount, setTotalCount] = useState(0)
    const [apiTotalPages, setApiTotalPages] = useState(0)

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
                    checkbox={false}
                    okButton={true}
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

                <PaginationWithSelector
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}

                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    
                    totalCount={totalCount}
                    apiTotalPages={apiTotalPages}
                />

                <ToastContainer />
            </GlobalPageWrapper>
        </div>
    );
};

export default NewmembersPage;
