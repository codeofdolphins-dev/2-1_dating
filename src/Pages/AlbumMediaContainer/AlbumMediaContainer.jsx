import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const AlbumMediaContainer = ({ media = [], onDelete }) => {
  if (!media || media.length === 0) {
    return <p className="text-white">No media available.</p>;
  }
 
  console.log("pppp",media)
  return (
    <div className="d-flex gap-3 flex-wrap">
      {media.map((item) => (
        <div
          key={item._id || item.src}
          className="position-relative rounded-3 overflow-hidden bg-dark"
          style={{ width: "180px", height: "180px" }}
        >
          {/* Media Preview */}
          {item?.mediaId?.type?.startsWith("video") || item.type === "video" ? (
            <video
              src={item?.mediaId?.url || item.src}
              controls
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <img
              src={item?.mediaId?.url || item.src}
              alt="media"
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
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
              onClick={() => onDelete(item?.mediaId?._id)}
              title="Delete media"
            ></i>
          )}
        </div>
      ))}
    </div>
  );
};

export default AlbumMediaContainer;
