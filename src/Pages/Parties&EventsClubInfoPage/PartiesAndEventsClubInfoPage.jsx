import React from 'react'
import GlobalPageWrapper from "../../components/GlobalPageWrapper"

import image from "../../assets/cardImgs/Images/Img.png"
import chatIcon from "../../assets/icons/rocketchat.png"
import calendericon from "../../assets/icons/calenderIcon.png"
import partyIcon from "../../assets/icons/party.png"
import { BsGeoAlt } from "react-icons/bs"
import { FaUserLock, FaShareAlt, FaRegCheckCircle, FaRegClock } from "react-icons/fa"
import { FiUserPlus } from "react-icons/fi"

const PartiesAndEventsClubInfoPage = () => {
  return (
    <div className='mt-5' style={{ backgroundColor: "var(--color-border)" }}>
      <GlobalPageWrapper>
        <div className="row container-fluid pt-2">

          {/* Left Section */}
          <div className="col-lg-3">
            <div className='d-flex gap-3'>
              <h5 className="fw-bold text-uppercase lh-sm text-white">
                BTHEHOUSE
              </h5>
              <div className=''><img src={partyIcon} alt="" srcset="" /></div>
              <div><i class="bi bi-three-dots-vertical text-white"></i></div>
            </div>

            <div className='d-flex gap-2'>
              <div><i class="bi bi-geo-alt-fill text-white"></i></div>
              <div><p className='text-white'>94555, CA 94555, USA | 8412 mi</p></div>
            </div>
            
            <div className="text-white rounded-4 p-3 shadow-sm">
              <div className="rounded-4 overflow-hidden mb-3">
                <img
                  src={image}
                  alt="Event Cover"
                  className="img-fluid w-100 object-fit-cover rounded-4"
                  style={{ height: '400px' }}
                />
              </div>

              <div className='d-flex justify-content-between'>
                <div>
                  <div className="text-danger fw-semibold small mb-1">Private Party</div>
                </div>
                <div>
                  <div className="text-light small d-flex align-items-center gap-1 mb-2">
                    <BsGeoAlt />
                    Altedo, ITA | 4256 mi
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between mt-1 px-1 text-white">
                <div>
                  <div className="fw-semibold small">Start Date</div>
                  <div className="small text-secondary">Mar 14, 2025</div>
                </div>
                <div className="text-end">
                  <div className="fw-semibold small">End Date</div>
                  <div className="small text-secondary">Mar 15, 2025</div>
                </div>
              </div>

              <div className="d-flex justify-content-between mt-3 gap-4 border-top pt-3">
                <div className="text-center small text-secondary">
                  <FaUserLock className="fs-5 mb-1 text-light" /><br />Private Guest List
                </div>
                <div className="text-center small text-secondary">
                  <FiUserPlus className="fs-5 mb-1 text-light" /><br />Invite myself
                </div>
                <div className="text-center small text-secondary">
                  <FaShareAlt className="fs-5 mb-1 text-light" /><br />Share
                </div>
                <div className="text-center small text-secondary">
                  <FaRegCheckCircle className="fs-5 mb-1 text-light" /><br />Validations
                </div>
                <div className="text-center small text-secondary">
                  <FaRegClock className="fs-5 mb-1 text-light" /><br />Remember
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className='col-lg-9'>
            <div>
              <div className='w-100 px-4 py-3 rounded-2' style={{ backgroundColor: "var(--color-primary-green)" }}>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <div>Information</div>
                  </div>
                  <div>
                    <div>Organizer: <span style={{ color: "var(--color-background)" }}>SPLENDIDPARTYS</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                <div className="d-flex align-items-center gap-5">
                  <div>
                    <div className="text-light small">Welcoming</div>
                    <div className="d-flex gap-1">
                      <img src="/assets/icons/male.png" alt="male" height={20} />
                      <img src="/assets/icons/female.png" alt="female" height={20} />
                      <img src="/assets/icons/male.png" alt="male" height={20} />
                    </div>
                  </div>
                  <div>
                    <div className="text-light small">Guest List</div>
                    <span className="text-warning fw-semibold">Approval Only</span>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <BsGeoAlt className="text-light" />
                    <span className="text-light small">Altedo, ITA | 4256 mi</span>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn border-1 border-danger text-danger btn-sm px-3 rounded-pill d-flex align-items-center gap-2"
                    style={{ transition: 'none' }}
                  >
                    <img src={calendericon} alt="calendar" height="16" />
                    <span>Add to calendar</span>
                  </button>

                  <button
                    className="border-1 border-primary bg-transparent text-primary btn-sm px-3 rounded-pill d-flex align-items-center gap-2"
                    style={{ transition: 'none' }}
                  >
                    <img src={chatIcon} alt="chat" height="16" />
                    <span>Contact</span>
                  </button>
                </div>
              </div>

              <div className="text-light mt-3 rounded-4 shadow-sm position-relative">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-semibold m-0">Description</h6>
                  <button className="btn px-4 py-1 rounded-pill text-white bg-primary btn-sm d-flex align-items-center gap-1">
                    Translate
                  </button>
                </div>

                <h6 className="fw-semibold text-white">Brown Couple for fun</h6>
                <p className="small text-white">
                  We like to experience more fun with other couples and very select single females. We tried this fun and liked it so much
                  that we decided to explore more. We like to add variety and spice to our routine...
                </p>

                <p className="text-light fw-semibold fs-6">WE ARE NOT INTO ONE NIGHTERS</p>
                <p className="small text-white">
                  Looking for couples or very select single females to add some spice to our routine. Just write us, and we’ll go from there...
                </p>

                <p className="text-white">
                  PLEASE NO ONE NIGHTERS - We are not a couple who’s going to wham-bam after meeting for ten minutes...
                </p>

                <p className="small text-white">
                  He likes to watch and join in. She likes to watch and join in. She likes to have girl on girl fun and Loves it.
                </p>

                <p className="small text-white">
                  To: Any other institutions using this or any site or its associated sites for projects – You do not have...
                </p>
              </div>
            </div>
          </div>
        </div>
      </GlobalPageWrapper>
    </div>
  )
}

export default PartiesAndEventsClubInfoPage
