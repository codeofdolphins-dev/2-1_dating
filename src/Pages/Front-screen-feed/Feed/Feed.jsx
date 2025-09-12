import React, { useState } from 'react'
import "./feedStyle.css"
import PageWrapper from '../../../components/PageWrapper'
import FilterBar from '../../../components/FilterBar/FilterBar'

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
    // useEffect(() => {
    //     const fetchProfile = ( page=1, limit=20, type="friend_request", priority="high", unreadOnly=false ) => {
    //         const token = sessionStorage.getItem("jwtToken");
    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             },
    //             params: { page, limit, type, priority, unreadOnly }
    //         };

    //         axios.get(`${apiUrl}/feed`, config)
    //         .then((res) => {
    //             if(!res.success) throw new Error("Feed data retrive failed!!!");
    //             setFeed(res.data);
    //         })
    //         .catch(err => console.error(err))
    //     };
    //     fetchProfile();
    // }, []);

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