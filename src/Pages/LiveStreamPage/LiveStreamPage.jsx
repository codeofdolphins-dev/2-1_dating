import React from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import FilterBar from '../../components/FilterBar/FilterBar'
import LiveStreamCard from '../../components/LiveStreamCard/LiveStreamCard'
import { useNavigate } from 'react-router-dom';
const cards = [
    { title: "Card One" },
    { title: "Card Two" },
    { title: "Card Three" },
    { title: "Card Four" },
    { title: "Card Five" },
    { title: "Card Six" },
    { title: "Card Seven" },
    // ...
];

const LiveStreamPage = () => {
    const filterName1 = "Stream"
    const pageName = "Live Stream"

    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate("/livestream")
    }
    return (
        <>
            <div style={{ backgroundColor: "var(--color-background)" }}>
                <GlobalPageWrapper />
                <FilterBar navigationToAnotherPage={handleNavigate} navigationPageName1={"Steam"} pageName={pageName} />
                <div className="container-fluid client-page-background">
                    <div className="row g-2 pt-2">
                        {
                            cards.map((card, index) => (
                                <div className="col-12 col-sm-6 col-lg-6 col-xl-4 " key={index}>
                                    <LiveStreamCard />
                                </div>
                            ))
                        }
                    </div>
                </div>
                
                {/* <LiveStreamCard />
                <LiveStreamCard />
                <LiveStreamCard />
                <LiveStreamCard />
                <LiveStreamCard /> */}
            </div>
        </>
    )
}

export default LiveStreamPage