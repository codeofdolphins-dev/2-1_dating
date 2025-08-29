import React, { useEffect, useState } from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import ViewPageCard from '../../components/ViewPageCard/ViewPageCard';
import FilterBar from '../../components/FilterBar/FilterBar';
// import ViewPageMessangerPopup from '../../components/viewPageMessangerPopup/viewPageMessangerPopup';

import img1 from "../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../assets/ViwCardImags/img/profileImg.webp";
import Pagination from '../../components/Pagination/Pagination';
import { showErrorToast } from '../../components/customToast/CustomToast';
import axios from 'axios';
import OverlayLoader from '../../helper/OverlayLoader';
import ItemsPerPageSelector from '../../components/Pagination/ItemsPerPageSelector';


// const map = [
//     "Viewed me",
//     "Viewed each other",
//     "Who I viewed",
//     "Remembered",
//     "Latest",
//     "Distance",
//     "All",
//     "Couples & Females",
//     "Couples",
//     "Female",
//     "Male",
//     "Transgender",
//     "Business",
//     "Ethnicity"
// ];

const filter = [
    "Viewed Me",
    "Viewed Each Other",
    "Who I viewed",
    "Remembered",
    "Latest",
    "Distance",
    "All",
    "Couples & Females",
    "Couples",
    "Female",
    "Male",
    "Transgender",
    "Business",
];

// const cards = [
//     { username: "Card One" },
//     { username: "Card Two" },
//     { username: "Card Three" },
//     { username: "Card Four" },
//     { username: "Card Five" },
//     { username: "Card Six" },
//     { username: "Card Seven" },
//     // ...
// ];

const images = [img1, img2, img3, img4];
const ViewsPage = () => {
    // const [popupOpenId, setPopupOpenId] = useState(null);
    // const [activeTab, setActiveTab] = useState("feed");
    // const [showGeneralFilter, setShowGeneralFilter] = useState(false)
    // const [ShowFriendsFilter, setShowFriendsFilter] = useState(false)

    // const handleGeneralFilter = () => {
    //     setShowGeneralFilter(!showGeneralFilter)
    //     if (ShowFriendsFilter)
    //         setShowFriendsFilter(!ShowFriendsFilter)
    //     console.log(showGeneralFilter)
    // }

    // const handleFriendFilter = () => {
    //     setShowFriendsFilter(!ShowFriendsFilter)
    //     if (showGeneralFilter)
    //         setShowGeneralFilter(!showGeneralFilter)
    //     console.log(showGeneralFilter)
    // }

    // const [user,SetUser] = useState({name:"Bishal"})

    // console.log(activeTab)

    // const handleAccept = () =>{
    //     console.log("all ok")
    // }

    // const [selected, setSelected] = useState(["Viewed me"]);

    // const handleToggle = (label) => {
    //     setSelected((prev) =>
    //         prev.includes(label)
    //             ? prev.filter((item) => item !== label)
    //             : [...prev, label]
    //     );
    // };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [cards, setCards] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [tomiStampTime, setTimeStampTime] = useState("")
    const [loading, setLoading] = useState(true);

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

            const apiUrl = import.meta.env.VITE_BASE_URL;
            const response = await axios.get(`${apiUrl}/users/profile-views`, config);
            const members = response?.data?.data || [];
            console.log("viewd_response", response)


            const rawTimestamp = response?.data?.timestamp;
            console.log("Timestamp raw value:", response?.data?.timestamp);
            console.log("Type of timestamp:", typeof response?.data?.timestamp);
            setTimeStampTime(rawTimestamp)




            console.log(tomiStampTime)
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
    }, [currentPage, itemsPerPage]);


    return (
        <>
            <GlobalPageWrapper>
                <OverlayLoader show={loading} text="Please wait..." />

                <div className='client-page-background'>
                    <FilterBar filter2={filter} filterName2={"Filter"} showTab={false} pageName={"Viewed Me"} distanceSlider={false} bottomForm={true} width={"280px"} okButton={true} />

                    <div className="container-fluid">
                        <div className="row g-4 pt-4">
                            {
                                cards.length === 0 ? <div className='text-white'>No Users Found </div> :
                                    cards.map((card, index) => (
                                        <div className="col-12 col-sm-6 col-lg-6 col-xl-4 " key={index}>
                                            <ViewPageCard index={index} images={images} timestamp={true}
                                                card={card?.viewerId} rawTimestamp={card?.timestamp}
                                            />
                                        </div>
                                    ))
                            }
                        </div>
                    </div>

                    {/* Items per page selector */}
                    
                    <ItemsPerPageSelector
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />

                    {/* Capsule-style Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </GlobalPageWrapper>
        </>
    )
}

export default ViewsPage