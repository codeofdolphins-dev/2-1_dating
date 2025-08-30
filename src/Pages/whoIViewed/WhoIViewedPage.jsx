import React, { useEffect, useState } from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import FrontScreenTopBar from '../../components/FrontScreenTopBar/FrontScreenTopBar'
import FilterBar from '../../components/FilterBar/FilterBar'


import img1 from "../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../assets/ViwCardImags/img/profileImg.webp";
import ViewPageCard from '../../components/ViewPageCard/ViewPageCard';
import httpService from '../../helper/httpService';
import OverlayLoader from '../../helper/OverlayLoader';
import { showErrorToast, showSuccessToast } from '../../components/customToast/CustomToast';
import { ToastContainer } from 'react-toastify';

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


const WhoIViewedPage = () => {
    const [user, setUser] = useState([])
    const[loading,setLoading]=useState(true)
    useEffect(() => {
        httpService(`/users/my-profile-views`, "GET")
            .then((res) => {
                console.log(res)
                setUser(res?.data)
                showSuccessToast(res?.message)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                showErrorToast(err?.message)
                setLoading(false)
            })
    }, [])
    return (
        <>
            <GlobalPageWrapper>
                <FilterBar pageName={"Who I viewed"} filterName2={"filter"} />
                <ToastContainer/>
                 <OverlayLoader show={loading} text="Please wait..." />
                <div className="container-fluid">
                    <div className="row g-4 pt-4">
                        {
                            user.map((card, index) => (
                                <div className="col-12 col-sm-6 col-lg-6 col-xl-4 " key={index}>
                                    <ViewPageCard card={card} index={index} images={images} showFriendOptions={false} rawTimestamp={1723974645000}
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

export default WhoIViewedPage