// components/VideoPlayerPopup.jsx
import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import httpService from "../../helper/httpService";

const LiveStreamingCardVideoPopup = ({ show, handleClose, videoSrc, card, allVideo }) => {
  const videoRef = useRef(null);
  const hasViewed = useRef(false);

  console.log("all video",allVideo)

  const handleVideoPlay = async () => {
    if (!hasViewed.current && card?._id) {
      try {
        const res = await httpService(`/media-library/view/${card._id}`, "POST");
        console.log("viewResponse", res);
        hasViewed.current = true;
      } catch (err) {
        console.error("View update error:", err);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static">
      <div className="d-flex flex-column bg-dark text-white rounded" style={{ position: "relative" }}>
        {/* ✅ Header */}
        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
          <h6 className="m-0 text-uppercase">{card?.title || "Video"}</h6>
          <div
            className="fs-4"
            style={{ cursor: "pointer" }}
            onClick={handleClose}
          >
            &times;
          </div>
        </div>

        {/* ✅ Body with main video + sidebar */}
        <div className="d-flex" style={{ height: "555px" }}>
          {/* Main Video */}
          <div className="flex-grow-1 bg-black d-flex align-items-center justify-content-center">
            <video
              ref={videoRef}
              controls
              autoPlay
              onPlay={handleVideoPlay}
              style={{ width: "100%", height: "100%", borderRadius: "0.5rem" }}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Sidebar Thumbnails */}
          <div
            className="d-flex flex-column p-2 gap-2"
            style={{
              width: "130px",
              overflowY: "auto",
              backgroundColor: "#1a1a1a",
            }}
          >
            {allVideo?.map((v, idx) => (
              <div
                key={idx}
                className="position-relative"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <img src={v?.thumbnailUrl} alt="" srcset="" />
                <video
                  src={v.url}
                  muted
                  className="w-100"
                  style={{ height: "80px", objectFit: "cover" }}
                />
                {/* Play Icon Overlay */}
                <div
                  className="position-absolute top-50 start-50 translate-middle"
                  style={{ zIndex: 2 }}
                >
                  <div
                    className="rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: 30,
                      height: 30,
                      background: "rgba(0,0,0,0.5)",
                      border: "1px solid rgba(255,255,255,0.6)",
                    }}
                  >
                    <span
                      className="text-white fs-6"
                      style={{ marginBottom: "2px" }}
                    >
                      ▶
                    </span>
                  </div>
                </div>

                {/* View Count */}
                <div
                  className="position-absolute bottom-0 end-0 px-2 py-1"
                  style={{
                    background: "rgba(0,0,0,0.6)",
                    borderTopLeftRadius: "6px",
                    color: "white",
                    fontSize: "12px",
                  }}
                >
                  {v?.sourceData?.viewCount || 0} views
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LiveStreamingCardVideoPopup;
