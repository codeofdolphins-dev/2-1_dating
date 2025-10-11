// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import "./CreateGroupPopup.css";
// import axios from "axios";
// import { ToastContainer } from "react-toastify";
// import { showErrorToast, showSuccessToast } from "../customToast/CustomToast";

// const CreateGroupPopup = ({ show, handleClose, refreshGroups,setPageLoader,pageLoader }) => {
//   const apiUrl = import.meta.env.VITE_BASE_URL;

//   const [formData, setFormData] = useState({
//     group: "",
//     description: "",
//     where: "",
//     groupType: "",
//     groupFor: "",
//     category: "",
//   });

//   const category = [
//     "social",
//     "dating",
//     "events",
//     "business",
//     "lifestyle",
//     "hobbies",
//     "other",
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleRadioChange = (e) => {
//     setFormData({ ...formData, groupType: e.target.value });
//   };

//   const handleGroupForChange = (e) => {
//     setFormData({ ...formData, groupFor: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const payload = {
//       name: formData.group,
//       description: formData.description,
//       location: formData.where,
//       groupType: formData.groupType,
//       targetAudience: formData.groupFor,
//       category: formData.category,
//       tags: [],
//       rules: "",
//       settings: {
//         allowMemberInvites: true,
//         allowMemberPosts: true,
//         allowMemberEvents: false,
//         maxMembers: 1000,
//         minAge: 21,
//         maxAge: null,
//       },
//     };

//     const token = sessionStorage.getItem("jwtToken");
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     };

//     axios
//       .post(`${apiUrl}/groups`, payload, config)
//       .then((res) => {
//         if (!res.data?.success) throw new Error("Group creation failed!");
//         showSuccessToast(res?.data?.message || "Group created successfully!");
//         refreshGroups(); // ✅ trigger reload in parent
//         handleClose();
//       })
//       .catch((err) => {
//         console.error(err);
//         showErrorToast(err?.response?.data?.error[0].message || "Failed to create group");
//       })
//       .finally(() => {
//         setFormData({
//           group: "",
//           description: "",
//           where: "",
//           groupType: "",
//           groupFor: "",
//           category: "",
//         });
//         setPageLoader(!pageLoader)
//       });
//   };

//   return (
//     <>
//       <Modal show={show} onHide={handleClose} centered className="mt-3">
//         <Modal.Header className="client-page-background text-white position-relative">
//           <Modal.Title>Request your own group:</Modal.Title>
//           <button
//             type="button"
//             className="btn-close btn-close-white position-absolute "
//             style={{ right: "1rem", top: "1rem" }}
//             onClick={handleClose}
//             aria-label="Close"
//           ></button>
//         </Modal.Header>

//         <Modal.Body className="client-page-background text-white">
//           <Form onSubmit={handleSubmit}>
//             {/* Group */}
//             <Form.Label htmlFor="grp">Group</Form.Label>
//             <Form.Group className="mb-3">
//               <Form.Control
//                 className="rounded-pill px-3"
//                 type="text"
//                 name="group"
//                 id="grp"
//                 value={formData.group}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             {/* Description */}
//             <Form.Label htmlFor="desc">Description</Form.Label>
//             <Form.Group className="mb-3">
//               <Form.Control
//                 type="text"
//                 className="rounded-pill px-3"
//                 name="description"
//                 id="desc"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             {/* Where */}
//             <Form.Label htmlFor="where">Where</Form.Label>
//             <Form.Group className="mb-3">
//               <Form.Control
//                 type="text"
//                 className="rounded-pill px-3"
//                 name="where"
//                 id="where"
//                 value={formData.where}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             {/* Category */}
//             <Form.Label htmlFor="category">Category</Form.Label>
//             <Form.Select
//               id="category"
//               className="rouded-pill px-3 mb-3"
//               style={{ outline: "none", borderRadius: "20px" }}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   category: e.target.value,
//                 }))
//               }
//               value={formData.category}
//             >
//               <option value="">Select Category</option>
//               {category.map((item, i) => (
//                 <option value={item} key={i}>
//                   {item}
//                 </option>
//               ))}
//             </Form.Select>

//             {/* Group type */}
//             <Form.Group className="mb-3">
//               <Form.Label>Group type</Form.Label>
//               <div className="d-flex flex-column gap-1">
//                 {["open", "closed", "private"].map((type) => (
//                   <Form.Check
//                     key={type}
//                     type="radio"
//                     label={`${type.charAt(0).toUpperCase() + type.slice(1)} Group`}
//                     name="groupType"
//                     value={type}
//                     checked={formData.groupType === type}
//                     onChange={handleRadioChange}
//                   />
//                 ))}
//               </div>
//             </Form.Group>

//             {/* Group For */}
//             <Form.Group className="mb-3">
//               <Form.Label>Group for</Form.Label>
//               <div className="d-flex flex-wrap gap-3">
//                 {["couples", "females", "males", "transgender", "business"].map(
//                   (option) => (
//                     <Form.Check
//                       key={option}
//                       type="radio"
//                       name="groupFor"
//                       label={option}
//                       value={option}
//                       checked={formData.groupFor === option}
//                       onChange={handleGroupForChange}
//                     />
//                   )
//                 )}
//               </div>
//             </Form.Group>

//             <div className="text-center">
//               <Button variant="primary" type="submit">
//                 Send
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       <ToastContainer />
//     </>
//   );
// };

// export default CreateGroupPopup;


import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../customToast/CustomToast";
import FileUpload from "../FileUpload/FileUpload";
import "./CreateGroupPopup.css";

const CreateGroupPopup = ({ show, handleClose, refreshGroups }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = sessionStorage.getItem("jwtToken");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [pageLoader, setPageLoader] = useState(false);

  const [formData, setFormData] = useState({
    group: "",
    description: "",
    where: "",
    groupType: "",
    groupFor: "",
    category: "",
  });

  const categories = [
    "social",
    "dating",
    "events",
    "business",
    "lifestyle",
    "hobbies",
    "other",
  ];

  // 🔹 Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle group type radio
  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, groupType: e.target.value }));
  };

  // 🔹 Handle group audience radio
  const handleGroupForChange = (e) => {
    setFormData((prev) => ({ ...prev, groupFor: e.target.value }));
  };

  // 🔹 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      showErrorToast("Authorization token missing!");
      return;
    }

    try {
      setPageLoader(true);
      let uploadedImageUrl = null;

      // ✅ Upload image if selected
      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("folder", "events");
        uploadData.append("optimize", true);

        const uploadResponse = await axios.post(
          `${baseURL}/media/upload/single`,
          uploadData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (uploadResponse?.data?.success) {
          uploadedImageUrl =
            uploadResponse?.data?.data?.files?.thumbnail?.url || null;
          console.log("✅ Image uploaded:", uploadedImageUrl);
        }
      }

      // ✅ Prepare group data
      const payload = new FormData();
      payload.append("name", formData.group);
      payload.append("description", formData.description);
      payload.append("location", formData.where);
      payload.append("groupType", formData.groupType);
      payload.append("targetAudience", formData.groupFor);
      payload.append("category", formData.category);
      payload.append(
        "settings",
        JSON.stringify({
          allowMemberInvites: true,
          allowMemberPosts: true,
          allowMemberEvents: false,
          maxMembers: 1000,
          minAge: 21,
          maxAge: null,
        })
      );

      if (uploadedImageUrl) {
        payload.append("groupImage", uploadedImageUrl);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      // ✅ API call: create group
      const response = await axios.post(`${baseURL}/groups`, payload, config);

      if (response.data?.success) {
        showSuccessToast(response.data.message || "Group created successfully!");
        refreshGroups();
        handleClose();
      } else {
        throw new Error("Group creation failed!");
      }
    } catch (error) {
      console.error("❌ Group creation error:", error);
      showErrorToast(
        error?.response?.data?.error?.[0]?.message ||
          "Failed to create group, please try again."
      );
    } finally {
      // ✅ Reset form
      setFormData({
        group: "",
        description: "",
        where: "",
        groupType: "",
        groupFor: "",
        category: "",
      });
      setFile(null);
      setPreview(null);
      setPageLoader(false);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="mt-3"
        style={{ zIndex: "5555" }}
      >
        <Modal.Header className="client-page-background text-white position-relative">
          <Modal.Title>Request your own group</Modal.Title>
          <button
            type="button"
            className="btn-close btn-close-white position-absolute"
            style={{ right: "1rem", top: "1rem" }}
            onClick={handleClose}
            aria-label="Close"
          ></button>
        </Modal.Header>

        <Modal.Body className="client-page-background text-white">
          <Form onSubmit={handleSubmit}>
            {/* Group & Category */}
            <div className="row">
              <div className="col-lg-6">
                <Form.Label htmlFor="grp">Group</Form.Label>
                <Form.Group className="mb-3">
                  <Form.Control
                    className="rounded-pill px-3"
                    type="text"
                    name="group"
                    id="grp"
                    value={formData.group}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>

              <div className="col-lg-6">
                <Form.Label htmlFor="category">Category</Form.Label>
                <Form.Select
                  id="category"
                  className="rounded-pill px-3 mb-3"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Category</option>
                  {categories.map((item, i) => (
                    <option value={item} key={i}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>

            {/* Description */}
            <Form.Label htmlFor="desc">Description</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                className="rounded-pill px-3"
                name="description"
                id="desc"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Location */}
            <Form.Label htmlFor="where">Where</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                className="rounded-pill px-3"
                name="where"
                id="where"
                value={formData.where}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Group Type */}
            <Form.Group className="mb-3">
              <Form.Label>Group Type</Form.Label>
              <div className="d-flex gap-3 flex-wrap">
                {["open", "closed", "private"].map((type) => (
                  <Form.Check
                    key={type}
                    type="radio"
                    label={`${type.charAt(0).toUpperCase() + type.slice(1)} Group`}
                    name="groupType"
                    value={type}
                    checked={formData.groupType === type}
                    onChange={handleRadioChange}
                  />
                ))}
              </div>
            </Form.Group>

            {/* Group For */}
            <Form.Group className="mb-3">
              <Form.Label>Group For</Form.Label>
              <div className="d-flex gap-2 flex-wrap">
                {["couples", "females", "males", "transgender", "business"].map(
                  (option) => (
                    <Form.Check
                      key={option}
                      type="radio"
                      name="groupFor"
                      label={option}
                      value={option}
                      checked={formData.groupFor === option}
                      onChange={handleGroupForChange}
                    />
                  )
                )}
              </div>
            </Form.Group>

            {/* File Upload */}
            <FileUpload SetFile={setFile} preview={preview} setPreview={setPreview} />

            {/* Submit */}
            <div className="text-center mt-4">
              <Button variant="primary" type="submit" disabled={pageLoader}>
                {pageLoader ? "Sending..." : "Send"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default CreateGroupPopup;

