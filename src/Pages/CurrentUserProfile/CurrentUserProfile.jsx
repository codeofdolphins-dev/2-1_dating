import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProfileTab from './Components/Profile/ProfileTab';
import AlbumTab from './Components/Album/AlbumTab';
import EditTab from './Components/Edit/EditTab';
import PicturesTab from './Components/Pictures/PicturesTab';
import VideosTab from './Components/Videos/VideosTab';
import PageWrapper from '../../components/PageWrapper';


const CurrentUserProfile = () => {

    const miniTabUpper = [
        { title: "Profile" },
        { title: "Edit" },
        { title: "Pictures" },
        { title: "Videos" },
        { title: "Album" }
    ];    
    const [activeTabUpper, setActiveTabUpper] = useState("Profile");
    const renderUpperContent = () => {
        switch (activeTabUpper) {
            case "Profile":
                return <ProfileTab />;
            case "Edit":
                return <EditTab />;
            case "Pictures":
                return <PicturesTab />;
            case "Videos":
                return <VideosTab />;
            case "Album":
                return <AlbumTab />;
            default:
                return null;
        }
    };

    return (
        <>
            <PageWrapper >
                <div className="container-fluid pt-5 py-5 px-3 d-flex flex-column align-items-start justify-content-start gap-2 text-white" style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>

                    {/* upper mini tab  */}
                    <div className="miniNav d-flex justify-content-start align-items-center mt-2">
                        {
                            miniTabUpper.map((tab, i) => (
                                <p
                                    key={i}
                                    onClick={() => setActiveTabUpper(tab.title)}
                                    className={`px-4 mb-1 ${activeTabUpper === tab.title ? "active-tab" : "text-white"}`}
                                    style={{
                                        borderBottom:
                                            activeTabUpper === tab.title ? "2px solid #096BFF" : "2px solid transparent",
                                        color: activeTabUpper === tab.title ? "#096BFF" : "white",
                                        cursor: "pointer",
                                    }}
                                >
                                    {tab.title}
                                </p>
                            ))
                        }
                    </div>
                    <div className="mt-3 w-100">{renderUpperContent()}</div>                    

                </div>
            </PageWrapper>
        </>
    )
}

export default CurrentUserProfile