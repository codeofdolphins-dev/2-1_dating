import React, { useRef, useState } from 'react'

const AddVideo = ({ onClose }) => {

    const [error, setError] = useState("");
    const [file, setFile] = useState(null);
    const inputRef = useRef(null);

    const allowedExtensions = [".3gp", ".avi", ".wmv", ".mpeg", ".mov", ".mp4"];
    const maxSize = 250 * 1024 * 1024; // 250 MB

    const validateFile = (selectedFile) => {
        setError("");
        if (!selectedFile) return false;

        const ext = selectedFile.name.slice(selectedFile.name.lastIndexOf(".")).toLowerCase();
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

    const handleSend = () => {
        onClose();

        if (file) console.log(file);        
    }

    return (
        <>
            <div className="text-white">
                <p className='mb-0'>Helpdesk will make the final decision on whether your videos will be approved and posted. Videos with children, animals, weapons, URLs, or drug paraphernalia will not be posted. Politically or religiously offensive videos or videos with contact details, external links or referrals to other social networks will not be published either. Please make sure that all videos are yours. You can change your videos whenever you want. The maximum size per video is 250 MB and we support the formats 3gp, avi, wmv, mpeg, mov and mp4.</p>
                <button 
                    className='custom-button border-0 rounded-5 my-4 px-3 py-1'
                    onClick={ handleSend }
                >
                    Send
                </button>
                <div>
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

                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
            </div>
        </>
    )
}

export default AddVideo