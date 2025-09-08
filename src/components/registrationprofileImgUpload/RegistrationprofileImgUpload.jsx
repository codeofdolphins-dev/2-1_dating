import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import httpService from "../../helper/httpService";

const RegistrationprofileImgUpload = ({ onFileSelect, defaultImage }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(defaultImage || null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 🔹 Show local preview instantly
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    // 🔹 Start uploading
    setUploading(true);

    try {
      const imageForm = new FormData();
      imageForm.append("profilePhotos", file);
      imageForm.append("folder", "profiles");
      imageForm.append("optimize", true);
      imageForm.append("createThumbnail", true);

      const uploadRes = await httpService("/media/upload/single", "POST", imageForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedUrl = uploadRes?.data?.files?.thumbnail?.url;

      if (uploadedUrl) {
        setPreview(uploadedUrl); // Replace local preview with API URL
        onFileSelect(uploadedUrl); // ✅ Send uploaded link to parent
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <label
      htmlFor="photo-upload"
      className="d-flex flex-column align-items-center justify-content-center text-white rounded-3 position-relative overflow-hidden"
      style={{
        width: "110px",
        height: "110px",
        cursor: "pointer",
        backgroundColor: "var(--color-background)",
        border: "2px solid var(--color-primary-green)",
      }}
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <>
          <FaCamera size={32} className="mb-2 text-secondary" />
          <span className="small">{uploading ? "Uploading..." : "Add Photos"}</span>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        id="photo-upload"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </label>
  );
};

export default RegistrationprofileImgUpload;
