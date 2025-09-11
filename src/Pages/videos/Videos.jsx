import React, { useEffect, useState } from 'react';
import "./videos.css";
import PageWrapper from '../../components/PageWrapper';
import FilterBar from '../../components/FilterBar/FilterBar';
import VideoCard from '../../components/Video Card/VideoCard';
import VideoModal from '../../components/Video Modal/VideoModal';
import { useNavigate } from 'react-router-dom';
import httpService from '../../helper/httpService';
import OverlayLoader from '../../helper/OverlayLoader';

const Videos = () => {
  const navigate = useNavigate();

  const navigationToAnotherPage = () => {
    navigate("/current-user-profile");
  };

  const [show, setShow] = useState(false);
  const [videos, setVideos] = useState([]);
  const [load, setload] = useState(false)

  const videoApiCall = async () => {
    setload(true)
    try {
      const res = await httpService(
        "/media-library/global/videos?adultContent=all&contentRating=all&visibility=all"
      );
      setVideos(res?.data?.videos || []);
    } catch (err) {
      console.log(err);
    }
    setload(false)
  };

  useEffect(() => {

    videoApiCall();

  }, []);

  const handleOpenModal = () => setShow(true);

  const handleModalClose = async () => {
    setShow(false);
    await videoApiCall(); // ✅ refresh list when modal closes
  };

  return (
    <>
      <PageWrapper>
        <OverlayLoader show={load} />
        <div
          className="container-fluid pt-0 pb-5 d-flex flex-column align-items-start justify-content-start gap-2"
          style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}
        >
          <FilterBar
            pageName={"Videos"}
            navigationPageName1={"Add Videos"}
            filterName2={"Filter"}
            navigationToAnotherPage={navigationToAnotherPage}
            checkbox={false}
            okButton={true}
          />

          <div className="client-page-background">
            <div className="container-fluid">
              <div className="row g-4 pt-4">
                {videos.map((card, index) => (
                  <div
                    className="col-12 col-sm-6 col-lg-6 col-xl-4 card-container p-0 m-0"
                    key={index}
                  >
                    <VideoCard onClick={handleOpenModal} card={card} />
                  </div>
                ))}

                <VideoModal show={show} handleClose={handleModalClose} />
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Videos;
