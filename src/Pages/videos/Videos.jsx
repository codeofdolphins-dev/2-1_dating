import React, { useState } from 'react';
import "./videos.css";
import PageWrapper from '../../components/PageWrapper';
import FilterBar from '../../components/FilterBar/FilterBar';
import VideoCard from '../../components/Video Card/VideoCard';
import VideoModal from '../../components/Video Modal/VideoModal';
import { useNavigate } from 'react-router-dom';

// const map = [
//   "Latest",
//   "Couples",
//   "Female",
//   "Male",
//   "Transgender",
//   "Looking for me/us",
// ];


const Videos = () => {

  const navigate = useNavigate()

  const navigationToAnotherPage = () => { 
    navigate("/add-video");
   }

  const [show, setShow] = useState(false);

  const handleOpenModal = () => setShow(true);
  const handleModalClose = () => setShow(false);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <PageWrapper >
        <div className="container-fluid pt-0 pb-5 d-flex flex-column align-items-start justify-content-start gap-2" style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
          <FilterBar pageName={"Videos"} navigationPageName1={"Add Videos"}  filterName2={"Filter"} navigationToAnotherPage={navigationToAnotherPage} />
          <div className='client-page-background'>
            <div className="container-fluid">
              <div className="row g-4 pt-4">
                {
                  arr.map((card, index) => (
                    <div className="col-12 col-sm-6 col-lg-6 col-xl-4 card-container p-0 m-0" key={index}>
                      <VideoCard onClick={ handleOpenModal } />
                    </div>
                  ))
                }
                <VideoModal 
                  show={show} 
                  handleClose={handleModalClose} 
                />

              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}

export default Videos