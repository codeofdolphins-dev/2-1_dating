import React, { useEffect, useRef, useState } from "react";
import fullScreen from "../../../../assets/icons/fullScreen.png";
import trash from "../../../../assets/icons/trash.png";
import ProfileImageFullPopup from "../../../../components/ProfileImageFullPopup/ProfileImageFullPopup";
import httpService from "../../../../helper/httpService.js";
import { showSuccessToast } from "../../../../components/customToast/CustomToast";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import CurrentUserPohotoPostAdult from "../../../../components/CurrentUserPohotoPost/CurrentUserPohotoPostAdult.jsx";
import CurrentUserPhotoPostNonAdult from "../../../../components/CurrentUserPohotoPost/CurrentUserPhotoPostNonAdult.jsx";

const PicturesTab = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef();
  const [toggle, setToggle] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({}); // ✅ progress tracker

  const user = localStorage.getItem("user");
  const jsonUser = JSON.parse(user);

  // ✅ Fetch uploaded images
  useEffect(() => {
    const fetchUploadedImages = async () => {
      try {
        const res = await httpService(
          `/media-library/${jsonUser?.data?.user?._id}?source=profile`,
          "GET"
        );

        if (res?.success && Array.isArray(res?.data?.media)) {
          setUploadedImages(res.data.media);
        } else {
          setUploadedImages([]);
        }
      } catch (err) {
        console.error("Failed to fetch uploaded images", err);
        setUploadedImages([]);
      }
    };

    fetchUploadedImages();
  }, [toggle]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newFiles = files.slice(
        0,
        10 - ((uploadedImages?.length || 0) + (newImages?.length || 0))
      );
      setNewImages((prev) => [...(prev || []), ...newFiles]);
    }
  };

  const removeNewImage = (index) => {
    setNewImages((prev) =>
      Array.isArray(prev) ? prev.filter((_, i) => i !== index) : []
    );
  };

  const removeUploadedImage = async (key) => {
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
        setUploadedImages((prev) => prev.filter((img) => img.key !== key));
        showSuccessToast(res?.data?.message);
        setToggle((prev) => !prev);
      }
    } catch (err) {
      console.error("Failed to delete image", err);
    }
  };

  // ✅ Upload with progress
  const submitHandler = async () => {
    if (newImages?.length > 0) {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;
      const token = user?.data?.token;

      for (let i = 0; i < newImages.length; i++) {
        const file = newImages[i];
        const formData = new FormData();
        formData.append("profilePhoto", file);
        formData.append("folder", "profile");
        formData.append("optimize", true);

        try {
          const uploadRes = await axios.post(
            `${baseURL}/media/upload/profile-photo`,
            formData,
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
            const newUploaded = Array.isArray(uploadRes?.data?.data)
              ? uploadRes.data.data
              : [];
            setUploadedImages((prev) => [...(prev || []), ...newUploaded]);
          }
        } catch (err) {
          console.error("Upload failed", err);
        }
      }

      setNewImages([]);
      setUploadProgress({});
      setToggle((prev) => !prev);
    }
  };

  return (
    <>
      <div className="d-flex flex-column gap-4 align-items-center">
        <ProfileImageFullPopup
          show={showGallery}
          handleClose={() => setShowGallery(false)}
          image={selectedImage}
        />

        {/* ✅ Uploaded Images */}
        <h1>Uploaded Profile Images</h1>
        {Array.isArray(uploadedImages) && uploadedImages.length > 0 && (
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {uploadedImages.map((img, idx) => (
              <div
                key={`uploaded-${idx}`}
                className="d-flex flex-column align-items-center"
              >
                <img
                  src={img.url}
                  alt={`uploaded-${idx}`}
                  style={{
                    height: "200px",
                    width: "350px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />

                <div className="d-flex gap-5 mt-2">
                  {/* Delete */}
                  <div
                    className="d-flex gap-lg-2"
                    onClick={() => removeUploadedImage(img.key)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={trash} alt="trash" width="25px" height="25px" />
                    <p className="mb-0 text-decoration-underline text-danger">
                      Delete
                    </p>
                  </div>

                  {/* Full View */}
                  <div
                    className="d-flex gap-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedImage(img.url);
                      setShowGallery(true);
                    }}
                  >
                    <img src={fullScreen} alt="full view" width="25px" height="25px" />
                    <p
                      className="mb-0 text-decoration-underline"
                      style={{ color: "#096BFF" }}
                    >
                      Full View
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ New Images (Preview before upload) */}
        <h1>Upload Profile Image</h1>
        {Array.isArray(newImages) && newImages.length > 0 && (
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {newImages.map((img, idx) => (
              <div
                key={`new-${idx}`}
                className="d-flex flex-column align-items-center"
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${idx}`}
                  accept="image/*"   
                  style={{
                    height: "316px",
                    width: "389px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />

                {/* ✅ Upload Progress */}
                {uploadProgress[img.name] ? (
                  <div className="mt-2 w-100 text-center">
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                        role="progressbar"
                        style={{ width: `${uploadProgress[img.name]}%` }}
                        aria-valuenow={uploadProgress[img.name]}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                    <p className="small mb-0">{uploadProgress[img.name]}%</p>
                  </div>
                ) : null}

                <div className="d-flex gap-5 mt-2">
                  {/* Delete */}
                  <div
                    className="d-flex gap-lg-2"
                    onClick={() => removeNewImage(idx)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={trash} alt="trash" width="25px" height="25px" />
                    <p className="mb-0 text-decoration-underline text-danger">
                      Delete
                    </p>
                  </div>

                  {/* Full View */}
                  <div
                    className="d-flex gap-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedImage(URL.createObjectURL(img));
                      setShowGallery(true);
                    }}
                  >
                    <img src={fullScreen} alt="full view" width="25px" height="25px" />
                    <p
                      className="mb-0 text-decoration-underline"
                      style={{ color: "#096BFF" }}
                    >
                      Full View
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Submit only if new images selected */}
        {Array.isArray(newImages) && newImages.length > 0 && (
          <div>
            <button
              className="custom-button py-1 px-4 rounded-4 border-0"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        )}

        {/* ✅ Add Picture button (max 10) */}
        {(uploadedImages?.length || 0) + (newImages?.length || 0) < 10 && (
          <div>
            <button
              className="custom-button py-1 px-4 rounded-4 border-0"
              onClick={() => inputRef.current.click()}
            >
              Add Picture
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
        )}

        <p className="mb-0 text-center" style={{ fontSize: "14px" }}>
          Your primary picture has to be a vanilla (non-adult) picture. Due to Google &
          Apple policy we do not allow adult pictures as primary profile pictures.
        </p>
      </div>

      <CurrentUserPohotoPostAdult />
      <br />
      <CurrentUserPhotoPostNonAdult />
      <ToastContainer />
    </>
  );
};

export default PicturesTab;
