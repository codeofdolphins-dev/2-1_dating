import React, { useEffect, useState } from 'react'
import FrontScreenLeftSidebar from '../../../components/FrontScreenLeftBar/FrontScreenLeftSidebar'
import FrontScreenTopBar from '../../../components/FrontScreenTopBar/FrontScreenTopBar'
import "./feedStyle.css"
import GeneralFilter from '../componeents/GeneralFilter'
import FeedScreen from '../componeents/FeedScreen.Feed'
import NotificationScreen from '../componeents/NotificationScreen.Feed'
// import PageWrapper from '../../../components/PageWrapper'
import CheckboxDropdown from '../../../components/dropdown/CheckboxDropdown'
import PageWrapper from '../../../components/PageWrapper'
import FilterBar from '../../../components/FilterBar/FilterBar'
import axios from 'axios'

const GeneralFilteroptions = [
    "Viewed me",
    "Groups / Blogs",
    "Speed Date",
    "Travel Plans",
    "Parties & Events"
];

const FriendFilterOptions = [
    "Likes given",
    "Joined group",
    "Photos & Videos",
    "Validations",
    "Speed Date",
    "Travel Plans",
    "Parties & Events",
    "Member Services",
    "New Friends / Followers"
];


const Feed = () => {
    const apiUrl = import.meta.env.VITE_BASE_URL;

    const [activeTab, setActiveTab] = useState("feed");
    const [showGeneralFilter, setShowGeneralFilter] = useState(false);
    const [ShowFriendsFilter, setShowFriendsFilter] = useState(false);
    const [feed, setFeed] = useState([]);

    const handleGeneralFilter = () => {
        setShowGeneralFilter(!showGeneralFilter)
        if (ShowFriendsFilter)
            setShowFriendsFilter(!ShowFriendsFilter)
        console.log(showGeneralFilter)
    }

    const handleFriendFilter = () => {
        setShowFriendsFilter(!ShowFriendsFilter)
        if (showGeneralFilter)
            setShowGeneralFilter(!showGeneralFilter)
        console.log(showGeneralFilter)
    }

    // const [user,SetUser] = useState({name:"Bishal"})

    // console.log(activeTab)

    // const handleAccept = () =>{
    //     console.log("all ok")
    // }

    const [selected, setSelected] = useState(["Viewed me"]);

    const handleToggle = (label) => {
        setSelected((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };

    // fetch feed data
    useEffect(() => {
        const fetchProfile = ( page=1, limit=20, type="friend_request", priority="high", unreadOnly=false ) => {
            const token = sessionStorage.getItem("jwtToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                params: { page, limit, type, priority, unreadOnly }
            };

            axios.get(`${apiUrl}/feed`, config)
            .then((res) => {
                if(!res.success) throw new Error("Feed data retrive failed!!!");
                setFeed(res.data);
            })
            .catch(err => console.error(err))
        };
        fetchProfile();
    }, []);

    return (
        <>
            {/* <FrontScreenTopBar /> */}
            <PageWrapper>
                <div className="container-fluid py-3" style={{ backgroundColor: "var(--color-background)" }}>
                    <FilterBar filter1={GeneralFilteroptions} filter2={FriendFilterOptions} filterName1={"General Filter"} filterName2={"Friend Filter"} showTab={true} pageName={"Feed"} />
                </div>
            </PageWrapper>
        </>
    )
}

export default Feed