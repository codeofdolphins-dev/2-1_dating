import React, { useState } from 'react'
import PageWrapper from '../../components/PageWrapper'
import { useNavigate } from 'react-router-dom'
import ProfileTab from "./components/ProfileTab/ProfileTab"
import EditTab from "./components/EditTab/EditTab"
import VideosTab from "./components/VideosTab/VideosTab"
import AlbumTab from "./components/AlbumTab/AlbumTab"
import PicturesTab from "./components/PicturesTab/PicturesTab"


const AddVideo = () => {

  const navigate = useNavigate();

  const miniTab = [
    { title: "Profile" },
    { title: "Edit" },
    { title: "Pictures" },
    { title: "Videos" },
    { title: "Album" }
  ];

  const [activeTab, setActiveTab] = useState("Profile");

  const renderContent = () => {
    switch (activeTab) {
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
        <div className="container-fluid pt-5 p-5 d-flex flex-column align-items-start justify-content-start gap-2" style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
          <div className="d-flex justify-content-start align-items-center gap-3">
            <i
              className="bi bi-chevron-left fs-4 back-icon"
              onClick={() => navigate("/videos")}
            ></i>
          </div>

          <div className="miniNav d-flex justify-content-start align-items-center mt-2">
            {
              miniTab.map((tab, i) => (
                <p
                  key={i}
                  onClick={() => setActiveTab(tab.title)}
                  className={`px-4 mb-1 ${activeTab === tab.title ? "active-tab" : "text-white" }`}
                  style={{
                    borderBottom:
                      activeTab === tab.title ? "2px solid #096BFF" : "2px solid transparent",
                    color: activeTab === tab.title ? "#096BFF" : "white",
                    cursor: "pointer",
                  }}
                >
                  {tab.title}
                </p>
              ))
            }
          </div>

          <div className="mt-3 w-100">{renderContent()}</div>

        </div>
      </PageWrapper>
    </>
  )
}

export default AddVideo