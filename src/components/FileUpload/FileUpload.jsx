import { useState } from "react";
import { Form, Image } from "react-bootstrap";
import { FiUpload } from "react-icons/fi";

function FileUpload({SetFile}) {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      SetFile(file)
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    setPreview(null);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-semibold mb-2 text-light">
        Group Image
      </Form.Label>

      <div className="position-relative">
        {/* Upload Container */}
        <label
          htmlFor="groupImage"
          className="d-flex justify-content-center align-items-center text-center p-4 position-relative"
          style={{
            width: "100%",
            minHeight: "100px",
            border: "2px dashed #FF6600",
            borderRadius: "12px",
            backgroundColor: "#fff",
            cursor: "pointer",
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}
        >
          {/* If no preview, show upload content */}
          {!preview ? (
            <div>
              <FiUpload size={30} color="#FF6600" className="mb-2" />
              <div className="fw-semibold" style={{ color: "#FF6600" }}>
                Upload
              </div>
              <div className="fw-semibold text-dark">Additional file</div>
              <small className="text-muted">
                File size of your documents should not exceed 10MB
              </small>
            </div>
          ) : (
            // Show uploaded image inside the same box
            <>
              <Image
                src={preview}
                alt="Uploaded Preview"
                fluid
                style={{
                  width: "100%",
                  height: "50%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              {/* Small remove button on top-right corner */}
              <button
                type="button"
                onClick={handleRemove}
                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                style={{
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  lineHeight: "14px",
                }}
              >
                ×
              </button>
            </>
          )}
        </label>

        {/* Hidden File Input */}
        <Form.Control
          id="groupImage"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="d-none"
        />
      </div>
    </Form.Group>
  );
}

export default FileUpload;
