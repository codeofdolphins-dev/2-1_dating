import React, { useEffect, useState } from 'react';

import FilterBar from "../../components/FilterBar/FilterBar";
import GlobalPageWrapper from '../../components/GlobalPageWrapper';

import ViewPageCard from '../../components/ViewPageCard/ViewPageCard';
import httpService from '../../helper/httpService';
import { showErrorToast, showSuccessToast } from '../../components/customToast/CustomToast';
import { useAuth } from '../../context/AuthContextAPI';
import Pagination from '../../components/Pagination/Pagination';
import OverlayLoader from '../../helper/OverlayLoader';
import ScondPagination from '../../components/Pagination/ItemsPerPageSelector';
import ItemsPerPageSelector from '../../components/Pagination/ItemsPerPageSelector';
import PaginationWithSelector from '../../components/Pagination/PaginationWithSelector';

const options = [
    "accepted",
    "pending",
    "declined",
    "Latest",
    "Distance",
    "All",
    "Couples & females",
    "Couples",
    "Females",
    "Males",
    "Transgender"
];

const ProfileFriendsPage = () => {
    const [user, setUser] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [totalCount, setTotalCount] = useState(0)
    const [apiTotalPages, setApiTotalPages] = useState(0)

    const { filterOption } = useAuth();
    console.log("Current filter:", filterOption);

    const handleRefreshByOkButton = () => {
        setRefresh((prev) => !prev);
    };

    useEffect(() => {
        setLoading(true);

        const params = {
            page: currentPage,
            limit: itemsPerPage,
        };

        if (filterOption && filterOption !== "All") {
            params.status = filterOption;
        }

        httpService("/friend-requests", "GET", {}, { params })
            .then((response) => {
                console.log("Friend requests fetched:", response?.data);

                showSuccessToast(response?.message);

                // Some APIs return {data: {data: [], meta: {}}}, others {data: [], meta: {}}
                const usersArray =
                    response?.data?.data || response?.data || [];

                setUser(usersArray);


                setTotalCount(response?.meta?.pagination?.total || null);
                setApiTotalPages(response?.data?.meta?.pagination?.totalPages || null);
        
                setLoading(false)
            })
            .catch((err) => {
                console.error("Failed to fetch friend requests:", err);
                showErrorToast(err?.response?.data?.message || "Something went wrong");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [refresh, filterOption, currentPage, itemsPerPage]);

    return (
        <GlobalPageWrapper>
            <OverlayLoader show={loading} text="Please wait..." />
            <FilterBar
                clas
                pageName="Friends"
                filterName2="Filter"
                filter2={options}
                okButton={true}
                handleRefreshByOkButton={handleRefreshByOkButton}
            />

            <div className="container-fluid">
                <div className="row g-4 pt-4">
                    {loading ? (
                        <h4 className="text-white">Loading...</h4>
                    ) : user.length > 0 ? (
                        user.map((userData, index) => (
                            <div
                                className="col-12 col-sm-6 col-lg-6 col-xl-4"
                                key={index}
                            >
                                <ViewPageCard
                                    card={userData}
                                    index={index}
                                    showFriendOptions={true}
                                    timestamp={false}
                                    refresh={refresh}
                                    setrefresh={setRefresh}
                                />
                            </div>
                        ))
                    ) : (
                        <h1>No Friend Requests</h1>
                    )}

                    <PaginationWithSelector
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}

                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}

                        totalCount={totalCount}
                        apiTotalPages={apiTotalPages}
                    />
                </div>
            </div>
        </GlobalPageWrapper>
    );
};

export default ProfileFriendsPage;
