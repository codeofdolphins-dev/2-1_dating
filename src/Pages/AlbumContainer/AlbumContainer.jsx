import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import httpService from "../../helper/httpService";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import NewAlbumModalPopup from "../../components/NewAlbumModalPopup/NewAlbumModalPopup";
import { showErrorToast, showSuccessToast } from "../../components/customToast/CustomToast";
import AlbumMediaContainer from "../AlbumMediaContainer/AlbumMediaContainer";
import { useAuth } from "../../context/AuthContextAPI";
import OverlayLoader from "../../helper/OverlayLoader"

import ReportMessagePopup from "../../components/ReportMessagePopup/ReportMessagePopup";
import ReportPopup from "../../components/ReportPopup/ReportPopup";
import WarningPopup from "../../components/WarningPopup/WarningPopup";

const AlbumContainer = ({ albumId, setAlbumInfoShowToggler }) => {
    const [albumData, setAlbumData] = useState();
    const [loading, setLoading] = useState(true);
    const [showUploader, setShowUploader] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [deleting, setDeleting] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [allMedia, setAllMedia] = useState([])
    const [toggle, setToggle] = useState(false)
    const [uploading, setUploading] = useState(false);
    const [showWarning, SetShowwarning] = useState(false)
    // const [reportMessagePopupShow, setReportMessagePopupShow] = useState(false);

    const handleClose = () => {
        SetShowwarning(false)
    }




    const { globalToggle, setGlobalToggle } = useAuth()


    useEffect(() => {
        if (!albumId) return;

        setLoading(true);
        httpService(`/albums/${albumId}`, "GET")
            .then((res) => {
                setAlbumData(res?.data?.album);
            })
            .catch((err) => {
                console.error("Fetch album error:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [albumId, showEditModal]);

    // 🔹 Handle file select
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles((prev) => [...prev, ...files]);
    };

    // 🔹 Handle file drop
    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setSelectedFiles((prev) => [...prev, ...files]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // 🔹 Upload function
    const formData = new FormData();
    selectedFiles.forEach((file) => {
        formData.append("media", file);
    });

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;
        try {
            setUploading(true); // start loader
            const res = await httpService(
                `/albums/${albumId}/upload`,
                "POST",
                { files: selectedFiles[0] }, // ✅ send raw formData
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            setAlbumData((prev) => ({
                ...prev,
                media: [...(prev.media || []), ...(res?.data?.media || [])],
            }));

            setShowUploader(false);
            setSelectedFiles([]);
            showSuccessToast(res?.message);
            setToggle(!toggle);
        } catch (err) {
            console.error("Upload failed:", err);
            showErrorToast(err?.data?.message);
            setToggle(!toggle);
        } finally {
            setUploading(false); // stop loader
        }
    };


    



    // 🔹 Delete media
    const handleDeleteMedia = async (mediaId) => {
        if (!window.confirm("Are you sure you want to delete this media?")) return;
        SetShowwarning(true)
        console.log("mediaId", mediaId, albumId)
        try {
            setDeleting(true);
            if (!showWarning) {
                await httpService(`/albums/${albumId}/media/${mediaId}`, "DELETE");
            }
        } catch (err) {
            console.error("Delete Media Error:", err);
        } finally {
            setDeleting(false);
        }
    };

    useEffect(() => {
        httpService(`/albums/${albumId}`, "GET")
            .then((res) => {
                setAllMedia(res?.data?.album?.mediaItems)
            })
            .catch((err) => {
                console.log("tyuio", err)
            })
    }, [toggle, albumId, deleting])

    if (loading) {
        return (
            <div className="p-3 text-white rounded-3 text-center">
                <OverlayLoader show={loading} />
            </div>
        );
    }

    if (!albumData) {
        return (
            <div className="p-3 text-white rounded-3 bg-danger">
                <p>Failed to load album.</p>
            </div>
        );
    }

    return (
        <div className="p-3 text-white rounded-3">
            {/* Header */}

            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                    <MdOutlineKeyboardArrowLeft
                        className="h4 mb-0"
                        role="button"
                        onClick={() => { setAlbumInfoShowToggler(false), setGlobalToggle(!globalToggle) }}
                    />
                    <h6 className="mb-0 text-truncate d-flex align-items-center">
                        {albumData?.name}
                        {albumData.isPrivate ? (
                            <i className="bi bi-lock-fill text-danger ms-1"></i>
                        ) : (
                            <i className="bi bi-unlock text-success ms-1"></i>
                        )}
                    </h6>
                </div>



                <div className="d-flex gap-2">
                    <Button
                        size="sm"
                        variant="primary"
                        onClick={() => setShowEditModal(true)}
                        className="rounded-pill px-3 py-2"
                    >
                        Edit
                    </Button>

                    <Button
                        size="sm"
                        variant="primary"
                        onClick={() => setShowUploader(!showUploader)}
                        className="rounded-pill px-3 py-2"
                    >
                        {showUploader ? "Close" : "Add"}
                    </Button>
                </div>

            </div>

            {/* Uploader UI */}
            {showUploader && (
                <div className="mb-3">
                    <div
                        className="d-flex justify-content-center align-items-center mb-3 rounded"
                        style={{
                            height: "120px",
                            border: "2px dashed #aaa",
                            backgroundColor: "#1e1e1e",
                            cursor: "pointer",
                        }}
                        onClick={() => document.getElementById("fileInput").click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <div className="text-center">
                            <i className="bi bi-upload fs-3 text-secondary"></i>
                            <p className="mb-0 text-secondary">
                                Drop files here or click/tap to upload
                            </p>
                        </div>
                    </div>

                    <input
                        type="file"
                        id="fileInput"
                        multiple
                        accept="image/*,video/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />

                    {/* Preview selected files */}
                    <div className="d-flex flex-wrap gap-2">
                        {selectedFiles.map((file, idx) => (
                            <div
                                key={idx}
                                className="position-relative rounded overflow-hidden"
                                style={{ width: "120px", height: "120px" }}
                            >
                                {/* Delete Button */}
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="position-absolute top-0 end-0 m-1 p-1 rounded-circle"
                                    style={{ zIndex: 2 }}
                                    onClick={() => {
                                        setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
                                    }}
                                >
                                    <i className="bi bi-x"></i>
                                </Button>

                                {file.type.startsWith("video") ? (
                                    <video
                                        src={URL.createObjectURL(file)}
                                        controls
                                        className="w-100 h-100"
                                        style={{ objectFit: "cover" }}
                                    />
                                ) : (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="preview"
                                        className="w-100 h-100"
                                        style={{ objectFit: "cover" }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>


                    {selectedFiles.length > 0 && (
                        <div className="mt-3">
                            <Button variant="success" size="sm" onClick={handleUpload}>
                                Upload {selectedFiles.length} file(s)
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {selectedFiles.length > 0 && (
                <div className="mt-3">
                    {uploading ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Uploading...
                        </>
                    ) : (
                        <>Upload {selectedFiles.length} file(s)</>
                    )}
                </div>
            )}


            {/* Media Grid */}
            <AlbumMediaContainer media={allMedia} onDelete={handleDeleteMedia} />

            {/* Edit Album Modal */}
            <NewAlbumModalPopup
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                edit={true}
                albumId={albumId}
            />
            {/* <WarningPopup
                text={"Are you sure you want to delete this media?"}
                warningShowPopup={showWarning}
                setWarningShowPopup={setShowWarning}
                onConfirm={confirmDeleteMedia}
            /> */}
        </div>
    );
};

export default AlbumContainer;
