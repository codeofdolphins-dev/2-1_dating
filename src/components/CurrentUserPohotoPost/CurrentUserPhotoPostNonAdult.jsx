import React, { useEffect, useRef, useState } from "react";
import httpService from "../../helper/httpService";
import { showSuccessToast } from "../customToast/CustomToast";
import { ToastContainer } from "react-toastify";
import ProfileImageFullPopup from "../ProfileImageFullPopup/ProfileImageFullPopup";
import axios from "axios";

const CurrentUserPhotoPostNonAdult = () => {
  const [uploadedPosts, setUploadedPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({}); // ✅ Track progress by file
  const [showGallery, setShowGallery] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const inputRef = useRef();
  const [toggle, setToggle] = useState(false);

  const user = localStorage.getItem("user");
  const jsonUser = JSON.parse(user);

  // ✅ Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await httpService(
          `/media-library/${jsonUser?.data?.user?._id}?source=post`,
          "GET",
          {},
          { params: { adultContent: "non-adult",type:"image" } }
        );

        if (res?.success && Array.isArray(res?.data?.media)) {
          setUploadedPosts(res.data.media);
        } else {
          setUploadedPosts([]);
        }
      } catch (err) {
        console.error("Failed to fetch posts", err);
        setUploadedPosts([]);
      }
    };

    fetchPosts();
  }, [toggle]);

  // ✅ File select
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setNewPosts((prev) => [...(prev || []), ...files]);
    }
  };

  const removeNewPost = (index) => {
    setNewPosts((prev) => prev.filter((_, i) => i !== index));
  };

  const removeUploadedPost = async (key) => {
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;

      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;
      const token = user?.data?.token;

      const res = await axios.delete(`${baseURL}/media/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { key },
      });

      if (res?.data?.success) {
        showSuccessToast(res?.data?.message);
        setToggle((prev) => !prev);
      } else {
        console.error("Delete failed", res?.data);
      }
    } catch (err) {
      console.error("Failed to delete image", err);
    }
  };

  // ✅ Upload with progress
  const submitHandler = async () => {
    if (newPosts?.length > 0) {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;
      const token = user?.data?.token;

      for (let i = 0; i < newPosts.length; i++) {
        const file = newPosts[i];
        const form = new FormData();
        form.append("file", file);
        form.append("folder", "posts");
        form.append("isAdultContent", false);
        form.append("optimize", true);

        try {
          const uploadRes = await axios.post(
            `${baseURL}/media/upload/single`,
            form,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
              onUploadProgress: (progressEvent) => {
                const percent = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress((prev) => ({
                  ...prev,
                  [file.name]: percent,
                }));
              },
            }
          );

          if (uploadRes?.data?.success) {
            showSuccessToast(uploadRes?.data?.message || "Uploaded successfully!");
            setUploadedPosts((prev) => [
              ...(prev || []),
              ...(Array.isArray(uploadRes?.data?.data)
                ? uploadRes.data.data
                : []),
            ]);
          }
        } catch (err) {
          console.error("Upload failed", err);
        }
      }

      setNewPosts([]);
      setUploadProgress({});
      setToggle((prev) => !prev);
    }
  };

  return (
    <>
      <div className="card bg-dark text-white p-3 rounded-3 mt-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0 fw-bold text-uppercase">Pictures</h6>
          <button
            className="btn btn-primary btn-sm rounded-3"
            onClick={() => inputRef.current.click()}
          >
            Add Pictures
          </button>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            multiple
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        {/* Sub-header */}
        <div className="mb-3">
          <p className="text-info fw-bold mb-1">NON-ADULT</p>
          <small className="text-white">
            Nude or suggestive pictures that will appear exclusively on our 2+1 website due to app store rules prohibiting adult photos.
          </small>
        </div>

        {/* Uploaded Posts */}
        {uploadedPosts.length > 0 && (
          <div className="d-flex flex-wrap gap-3">
            {uploadedPosts.map((post, idx) => (
              <div
                key={idx}
                className=" p-2 rounded-3"
                style={{ width: "220px",backgroundColor:"var(--color-background)" }}
              >
                {post.url.endsWith(".mp4") ? (
                  <video
                    src={post.url}
                    controls
                    className="w-100 rounded-3"
                    style={{ height: "160px", objectFit: "cover" }}
                  />
                ) : (
                  <img
                    src={post.url}
                    alt={`post-${idx}`}
                    className="w-100 rounded-3"
                    style={{ height: "160px", objectFit: "cover" }}
                  />
                )}
                <div className="d-flex justify-content-between mt-2">
                  <span
                    className="text-danger small"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeUploadedPost(post.key)}
                  >
                    Delete
                  </span>
                  <span
                    className="text-primary small"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedMedia(post.url);
                      setShowGallery(true);
                    }}
                  >
                    Full View
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Preview before upload with loader */}
        {newPosts.length > 0 && (
          <div className="mt-4">
            <h6 className="fw-bold">Preview New Posts</h6>
            <div className="d-flex flex-wrap gap-3">
              {newPosts.map((file, idx) => (
                <div
                  key={idx}
                  className="bg-secondary p-2 rounded-3"
                  style={{ width: "220px" }}
                >
                  {file.type.startsWith("video") ? (
                    <video
                      src={URL.createObjectURL(file)}
                      controls
                      className="w-100 rounded-3"
                      style={{ height: "160px", objectFit: "cover" }}
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${idx}`}
                      className="w-100 rounded-3"
                      style={{ height: "160px", objectFit: "cover" }}
                    />
                  )}

                  {/* ✅ Progress Bar */}
                  {uploadProgress[file.name] ? (
                    <div className="progress mt-2" style={{ height: "6px" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${uploadProgress[file.name]}%` }}
                      >
                        {uploadProgress[file.name]}%
                      </div>
                    </div>
                  ) : (
                    <button
                      className="btn btn-sm btn-danger w-100 mt-2"
                      onClick={() => removeNewPost(idx)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button className="btn btn-success mt-3" onClick={submitHandler}>
              Upload Posts
            </button>
          </div>
        )}
      </div>

      <ProfileImageFullPopup
        show={showGallery}
        handleClose={() => setShowGallery(false)}
        image={selectedMedia}
      />
      <ToastContainer />
    </>
  );
};

export default CurrentUserPhotoPostNonAdult;
