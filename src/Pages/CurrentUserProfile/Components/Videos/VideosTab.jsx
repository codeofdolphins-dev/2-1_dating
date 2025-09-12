import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddVideo from "../../../Add Video/components/VideosTab/components/addVideo/AddVideo";
import httpService from "../../../../helper/httpService"; // ✅ your API helper
import axios from "axios";
import { showSuccessToast } from "../../../../components/customToast/CustomToast";
import { data } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import OverlayLoader from "../../../../helper/OverlayLoader";
import Pagination from "../../../../components/Pagination/Pagination";
import ItemsPerPageSelector from "../../../../components/Pagination/ItemsPerPageSelector";

const VideosTab = () => {
  const [addVideo, setAddVideo] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); // ✅ Track clicked video
  const [toggle, setToggle] = useState(false)
  const [isAproved, setIsApproved] = useState(false)
  const [isLoading, setIsloading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(0);

  const userStr = localStorage.getItem("user");
  const jsonUser = userStr ? JSON.parse(userStr) : null;
  const userId = jsonUser?.data?.user?._id;

  // Fetch videos
  const fetchVideos = async (page, limit) => {
    setIsloading(true);
    try {
      const res = await httpService(`/media-library/${userId}?type=video`, "GET", {
        params: { page, limit },
      });

      const totalCount = res?.data?.pagination?.total || null;
      const apiTotalPages = res?.data?.pagination?.pageCount || null;

      if (totalCount !== null) {
        setTotalPages(Math.ceil(totalCount / limit));
      } else if (apiTotalPages !== null) {
        setTotalPages(apiTotalPages);
      } else {
        setTotalPages(1);
      }

      if (res?.success && Array.isArray(res?.data?.media)) {
        setUploadedVideos(res.data.media);
      } else {
        setUploadedVideos([]);
      }
    } catch (err) {
      console.error("Failed to fetch videos:", err);
      setUploadedVideos([]);
    } finally {
      setIsloading(false);
    }
  };

  // ✅ Only one useEffect for pagination + filters
  useEffect(() => {
    fetchVideos(currentPage, itemsPerPage);
  }, [toggle, isAproved, currentPage, itemsPerPage]);

  const handleClose = (refresh = false) => {
    setAddVideo(false);
    if (refresh) fetchVideos(currentPage, itemsPerPage); // keep current page & limit
  };

  // ✅ Delete Video
  // ✅ Delete Video
  const handleDelete = async (videoId) => {
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;

      // Get token from localStorage
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;
      const token = user?.data?.token;

      const res = await axios.delete(`${baseURL}/media/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { key: videoId, hard: true }, // ✅ DELETE request body must be under `data`
      });

      console.log(res)
      if (res?.data?.success) {
        showSuccessToast(res?.data?.message)
        setToggle(!toggle)
      }

    } catch (err) {
      console.log(err)
    }
  };


  useEffect(() => {
    fetchVideos(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return (
    <>
      <ToastContainer />
      <OverlayLoader show={isLoading} />
      <div className="">
        {/* ✅ Top Buttons */}
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div>
            <Button
              variant="primary"
              className="px-4"
              onClick={() => setIsApproved(true)}
              style={{ borderRadius: "0", fontSize: "14px" }}
            >
              Approve
            </Button>
            <Button
              variant="secondary"
              className="px-4"
              onClick={() => setIsApproved(false)}
              style={{ borderRadius: "0", fontSize: "14px" }}
            >
              Pending
            </Button>
          </div>
          <Button
            variant="primary"
            className="px-4"
            style={{ borderRadius: "20px", fontSize: "14px" }}
            onClick={() => setAddVideo(true)}
          >
            Add Video
          </Button>
        </div>

        {/* ✅ Uploaded Videos Section */}
        <div className="mt-3 d-flex flex-wrap gap-4">
          {uploadedVideos.length > 0 ? (
            uploadedVideos.map((video, idx) =>
              video?.type === "video" && (
                <>
                  <div
                    key={idx}
                    className="position-relative"
                    style={{
                      width: "390px", // bigger width
                      height: "200px", // bigger height
                      cursor: "pointer",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    {/* ✅ Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent opening modal
                        handleDelete(video.key);
                      }}
                      className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                      style={{ zIndex: 3 }}
                    >
                      ✕
                    </button>

                    {/* ✅ Video Thumbnail */}
                    <div onClick={() => setSelectedVideo(video)}>
                      <video
                        src={video.url}
                        className="d-block w-100 h-100"
                        style={{
                          borderRadius: "12px",
                          objectFit: "cover",
                        }}
                        muted
                      />

                      {/* ✅ Play Button Overlay */}
                      <div
                        className="position-absolute top-50 start-50 translate-middle"
                        style={{ zIndex: 2 }}
                      >
                        <div
                          className="rounded-circle d-flex justify-content-center align-items-center"
                          style={{
                            width: 60,
                            height: 60,
                            background: "rgba(0,0,0,0.4)",
                            border: "1px solid rgba(255,255,255,0.6)",
                          }}
                        >
                          <span
                            className="text-white fs-4"
                            style={{ marginBottom: "3px" }}
                          >
                            ▶
                          </span>
                        </div>
                      </div>

                      {/* ✅ View Count Badge */}
                      <div
                        className="position-absolute bottom-0 end-0 m-2 px-2 py-1"
                        style={{
                          background: "rgba(0, 0, 0, 0.6)",
                          borderRadius: "8px",
                          color: "white",
                          fontSize: "14px",
                          zIndex: 2,
                        }}
                      >
                        👁 {video?.sourceData?.viewCount || 0}
                      </div>
                    </div>
                  </div>

                </>
              )
            )
          ) : (
            <p className="text-white mt-3">No videos uploaded yet.</p>
          )}
        </div>


      </div>

      {/* ✅ Video Popup Modal */}
      <Modal
        show={!!selectedVideo}
        onHide={() => setSelectedVideo(null)}
        size="lg"
        centered
      >
        <Modal.Body className="p-0 bg-black">
          {selectedVideo && (
            <video
              src={selectedVideo.url}
              controls
              autoPlay
              className="w-100"
              style={{ borderRadius: "8px" }}
            />
          )}
        </Modal.Body>
      </Modal>


      {/* Items per page selector */}

      <ItemsPerPageSelector
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Capsule-style Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* ✅ Add Video Modal */}
      {addVideo && <AddVideo onClose={() => handleClose(true)} />}
    </>
  );
};

export default VideosTab;
