import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import GlobalImageCarouselPopup from "../../components/globalImageCarouselPopup/GlobalImageCarouselPopup";

const AlbumMediaContainer = ({ media = [], onDelete }) => {
  const [show, setShow] = useState(false);
  const [mediaData, setMediaData] = useState(null);

 

  if (!media || media.length === 0) {
    return <p className="text-white">No media available.</p>;
  }

  return (
    <div className="d-flex gap-3 flex-wrap">
      {media.map((item) => (
        <div
          key={item._id || item?.mediaId?._id || item.src}
          className="position-relative rounded-3 overflow-hidden bg-dark"
          style={{ width: "180px", height: "180px" }}
        >
          {/* Media Preview */}
          {item?.mediaId?.type?.startsWith("video") || item.type === "video" ? (
            <div
              key={item._id || item?.mediaId?._id || item.src}
              className="position-relative rounded-3 overflow-hidden bg-dark"
              style={{ width: "180px", height: "180px" }}
            >
              {/* Video Thumbnail */}
              <video
                src={item?.mediaId?.url || item.src}
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
                onClick={() => {
                  setShow(true);
                  setMediaData(item?.mediaId || item);
                }}
              />

              {/* Play Icon Overlay */}
              <i
                className="bi bi-play-circle-fill position-absolute top-50 start-50 translate-middle text-white"
                style={{
                  fontSize: "3rem",
                  opacity: 0.8,
                  pointerEvents: "none", // let clicks pass through to video
                }}
              ></i>

              {/* Pending Label */}
              {item.status === "pending" && (
                <span className="position-absolute top-0 start-0 bg-dark text-warning px-2 py-1 small">
                  Pending Approval
                </span>
              )}

              {/* Delete Button */}
              {onDelete && (
                <i
                  className="bi bi-trash-fill position-absolute top-0 end-0 m-2 text-white bg-dark bg-opacity-50 p-1 rounded"
                  role="button"
                  onClick={() => {onDelete(item?.mediaId?._id || item._id)}}
                  title="Delete media"
                ></i>
              )}
            </div>

          ) : (
            <img
              src={item?.mediaId?.url || item.src}
              alt="media"
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
              onClick={() => {
                setShow(true);
                setMediaData(item?.mediaId || item);
              }}
            />
          )}

          {/* Pending Label */}
          {item.status === "pending" && (
            <span className="position-absolute top-0 start-0 bg-dark text-warning px-2 py-1 small">
              Pending Approval
            </span>
          )}

          {/* Delete Button */}
          {onDelete && (
            <i
              className="bi bi-trash-fill position-absolute top-0 end-0 m-2 text-white bg-dark bg-opacity-50 p-1 rounded"
              role="button"
              onClick={() => onDelete(item?.mediaId?._id || item._id)}
              title="Delete media"
            ></i>
          )}
        </div>
      ))}

      {/* ✅ Pass both images + selected media */}
      <GlobalImageCarouselPopup
        show={show}
        handleClose={() => setShow(false)}
        images={media.map((m) => m?.mediaId || m)} // flatten media array
        currentMediaData={mediaData}
      />
    </div>
  );
};

export default AlbumMediaContainer;
