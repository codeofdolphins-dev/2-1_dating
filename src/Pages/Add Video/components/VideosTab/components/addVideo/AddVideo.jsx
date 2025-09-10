import React, { useRef, useState } from "react";
import axios from "axios";
import { showSuccessToast } from "../../../../../../components/customToast/CustomToast";
import { ToastContainer } from "react-bootstrap";

const AddVideo = ({ onClose }) => {
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // ✅ track upload %
  const inputRef = useRef(null);

  const allowedExtensions = [".3gp", ".avi", ".wmv", ".mpeg", ".mov", ".mp4"];
  const maxSize = 250 * 1024 * 1024; // 250 MB

  const validateFile = (selectedFile) => {
    setError("");
    if (!selectedFile) return false;

    const ext = selectedFile.name
      .slice(selectedFile.name.lastIndexOf("."))
      .toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      setError("Invalid format. Allowed: 3gp, avi, wmv, mpeg, mov, mp4.");
      return false;
    }

    if (selectedFile.size > maxSize) {
      setError("File size must be less than 250 MB.");
      return false;
    }

    return true;
  };

  const handleFiles = (selectedFile) => {
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // ✅ preview video
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFiles(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSend = async () => {
    if (!file) {
      setError("Please select a video file before sending.");
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;
      const token = user?.data?.token;

      const formData = new FormData();
      formData.append("file", file); // ✅ backend should expect `file`
      formData.append("folder", "posts");
      formData.append("optimize", true);
      formData.append("createThumbnail", true);

      const res = await axios.post(`${baseURL}/media/upload/single`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent); // ✅ update progress %
        },
      });

      if (res.data.success) {
        showSuccessToast(res.data.message);
        console.log("Uploaded video response:", res.data);
        setFile(null);
        setPreview(null);
        onClose();
      } else {
        setError("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Video upload error:", err);
      setError("Upload failed. Please check console.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <>
      <div className="text-white">
        <p className="mb-0">
          Helpdesk will make the final decision on whether your videos will be
          approved and posted. Videos with children, animals, weapons, URLs, or
          drug paraphernalia will not be posted. Politically or religiously
          offensive videos or videos with contact details, external links or
          referrals to other social networks will not be published either.
          Please make sure that all videos are yours. You can change your videos
          whenever you want. The maximum size per video is 250 MB and we support
          the formats 3gp, avi, wmv, mpeg, mov and mp4.
        </p>

        <button
          className="custom-button border-0 rounded-5 my-4 px-3 py-1"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Send"}
        </button>

        {/* ✅ Progress Bar */}
        {loading && (
          <div style={{ marginTop: "10px", width: "100%" }}>
            <div
              style={{
                height: "10px",
                background: "#333",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "#4caf50",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
            <p style={{ marginTop: "5px", color: "#ccc" }}>{progress}%</p>
          </div>
        )}

        <div
          onClick={() => inputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            border: "2px dashed #aaa",
            borderRadius: "5px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            background: "#1e1e1e",
            color: "#ccc",
          }}
        >
          {file ? (
            <p>{file.name}</p>
          ) : (
            <p>Click or Drop Video File here (max 250MB)</p>
          )}
        </div>

        <input
          type="file"
          accept={allowedExtensions.join(",")}
          style={{ display: "none" }}
          ref={inputRef}
          onChange={(e) => handleFiles(e.target.files[0])}
        />

        {/* ✅ Preview Video */}
        {preview && (
          <div style={{ marginTop: "15px" }}>
            <video
              src={preview}
              controls
              width="100%"
              style={{ maxHeight: "300px", borderRadius: "8px" }}
            />
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <ToastContainer />
    </>
  );
};

export default AddVideo;
