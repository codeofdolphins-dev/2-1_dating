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

import Editor from 'react-simple-wysiwyg';

const token = sessionStorage.getItem("jwtToken");

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
    const [broadcastEditorPopup, setBroadcastEditorPopup] = useState(false);
    const [broadcastText, setBroadcastText] = useState('');
    const [broadcastUser, setBroadcastUser] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [totalCount, setTotalCount] = useState(0)
    const [apiTotalPages, setApiTotalPages] = useState(0)
    const [allVideo, setAllVideo] = useState([])

    const { filterOption } = useAuth();

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


    const broadcastBtn = () => {
        if (broadcastUser.length === 0) {
            showErrorToast("Select atleast one member.")
            return;
        }

        setBroadcastEditorPopup(prev => {            
            let value = !prev;
            if (value == false) {
                setBroadcastText("");
                setBroadcastUser([]);
            };
            return value;
        });
    };

    const submitBroadcast = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        };

        httpService("/personal-messages/broadcast", "POST",
            {
                friendIds: broadcastUser,
                messageType: "text",
                content: broadcastText,
                mediaUrl: "",
                fileName: null,
                fileSize: null
            }, 
            config
        )
        .then(res => {
            console.log(res);            
        })
        .catch(err => {
            console.log(err);            
        });
    };

    return (
        <GlobalPageWrapper>
            <OverlayLoader show={loading} text="Please wait..." />
            <FilterBar
                pageName="Friends"
                filterName2="Filter"
                filter2={options}
                okButton={true}
                handleRefreshByOkButton={handleRefreshByOkButton}
                broadcastBtn={broadcastBtn}
            />

            <div className="container-fluid">

                {/* broadcast popup area */}
                {
                    broadcastEditorPopup && <div className='my-2'>
                        {/* <textarea className='w-100 no-outline' rows={3}></textarea> */}

                        <Editor className='bg-white' value={broadcastText} onChange={(e) => setBroadcastText(e.target.value)} />

                        <div className="mt-3 d-flex gap-3 align-items-center justify-content-end">
                            <button
                                onClick={broadcastBtn}
                                className='bg-secondary border-0 rounded-4 px-3 text-white'
                            >Cancel</button>
                            <button onClick={submitBroadcast} className='bg-primary border-0 rounded-4 px-5 text-white'>Send</button>
                        </div>
                    </div>
                }


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
                                    images={userData?.senderId?.profile?.photos}
                                    index={index}
                                    showFriendOptions={true}
                                    timestamp={false}
                                    refresh={refresh}
                                    setrefresh={setRefresh}
                                    userName={userData?.senderId?.username}
                                    broadcastUser={broadcastUser}
                                    setBroadcastUser={setBroadcastUser}
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
