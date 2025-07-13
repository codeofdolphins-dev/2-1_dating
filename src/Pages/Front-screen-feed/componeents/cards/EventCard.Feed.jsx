import React from "react";
import middleIcon from "./Images/middle-logo.png";

import profileImg from "./Images/feed-profile-img.png";

const EventCard = () => {
  return (
    <>
      <div className="container py-4">
        <div className="row justify-content-center gx-4 gy-3 align-items-stretch">
          <div className="col-lg-11">
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="text-white">
                  CPLSUEPAUL has joined Georgia For Chocolate 🍫
                </h6>
              </div>
              <div>
                <h6 className="text-danger">Dec 12, 2024 | 24 Members</h6>
              </div>
            </div>
          </div>
          {/* Card Section */}
          <div className="row main">
            <div className="col-lg-6">
              {/* Left card */}
              <div
                style={{ backgroundColor: "#343a40" }}
                className="rounded-2 p-3 text-white"
              >
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex gap-3">
                    <img
                      src={profileImg}
                      alt="Event"
                      className="rounded-2"
                      style={{
                        width: "50%",
                        height: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <h5 className="mb-1">Erotic Parties & Clubs</h5>
                      <p className="mb-0 small text-secondary">
                        94555, CA, USA
                      </p>
                    </div>
                  </div>
                </div>

                <p className="small">
                  <div className="d-flex justify-content-between align-bottom">
                    <div>
                      <p className="mb-0 mt-1 fw-semibold">CPLSUEPAUL</p>
                      <p className="mb-1 small text-warning">
                        Aug 19, 2022 | 8021 Members
                      </p>
                    </div>
                    <div className="d-flex align-bottom">
                      <div className="text-end small text-secondary">
                        Dec 12, 2024 | 24 Members
                      </div>
                    </div>
                  </div>
                  Club Elation is the newest and most progressive club for 21
                  years of age and over which is designed around the desires of
                  its members. Your host and hostess Eric and Cynthia have over
                  40 years in the ENM Lifestyle. We are dedicated to ...{" "}
                  <a href="#">More</a>
                </p>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="d-flex align-items-center justify-content-center gap-2 w-100">
                    <button
                      className="btn btn-secondary rounded-pill px-5 py-2 w-100"
                      disabled
                    >
                      Pending
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* icon */}
            <img
              src={middleIcon}
              alt="Center Icon"
              className="actionIcon"
              style={{ maxHeight: "50px", objectFit: "contain" }}
            />
            {/* 2nd card */}
            <div
              className="col-lg-6 text-white p-3 rounded d-flex flex-column justify-content-center"
              style={{ backgroundColor: "#343a40" }}
            >
              <div className="d-flex flex-column align-items-center gap-5 my-5">
                <button
                  type="button"
                  className="btn btn-primary rounded-pill "
                  style={{ padding: "5px 120px" }}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="btn btn-danger rounded-pill "
                  style={{ padding: "5px 120px" }}
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
