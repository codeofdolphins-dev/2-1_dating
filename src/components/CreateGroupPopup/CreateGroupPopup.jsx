import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import "./CreateGroupPopup.css"
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../customToast/CustomToast";

const CreateGroupPopup = ({ show, handleClose }) => {

  const apiUrl = import.meta.env.VITE_BASE_URL;

  const [formData, setFormData] = useState({
    group: "",
    description: "",
    where: "",
    groupType: "",
    groupFor: "",
    category: "",
  });

  const category = ["social", "dating", "events", "business", "lifestyle", "hobbies", "other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, groupType: e.target.value });
  };

  const handleGroupForChange = (e) => {
    setFormData({ ...formData, groupFor: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.group.toLowerCase(),
      description: formData.description.toLowerCase(),
      location: formData.where.toLowerCase(),
      groupType: formData.groupType.toLowerCase(),
      targetAudience: formData.groupFor.toLowerCase(),
      category: formData.category.toLowerCase(),
      tags: [],
      rules: "",
      settings: {
        allowMemberInvites: true,
        allowMemberPosts: true,
        allowMemberEvents: false,
        maxMembers: 1000,
        minAge: 21,
        maxAge: null
      }
    }

    const token = sessionStorage.getItem("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios.post(`${apiUrl}/groups`, payload, config)
      .then((res) => {
        if (!res.success) throw new Error("Group creation failed!!!");
        console.log(res);        
        showSuccessToast(res.message);
      })
      .catch(err => {
        console.error(err.message);
        showErrorToast(err.message.message);
      });

    // submit logic here
    handleClose();
    setFormData({
      group: "",
      description: "",
      where: "",
      groupType: "",
      groupFor: "",
      category: "",
    })
  };

  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose} centered className="mt-3">
        <Modal.Header className="client-page-background text-white position-relative">
          <Modal.Title>Request your own group:</Modal.Title>
          <button
            type="button"
            className="btn-close btn-close-white position-absolute "
            style={{ right: '1rem', top: '1rem' }}
            onClick={handleClose}
            aria-label="Close"
          ></button>
        </Modal.Header>

        <Modal.Body className="client-page-background text-white">
          <Form onSubmit={handleSubmit}>
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

            {/* select category */}
            <Form.Label htmlFor="category">Category</Form.Label>
            <Form.Select aria-label="Default select example" id="category"
              className="rouded-pill px-3 mb-3"
              style={{ outline: "none", borderRadius: "20px" }}
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                category: e.target.value
              }))}
              value={formData.category}
            >
              <option>Select Category</option>
              {category.map((item, i) => (
                <option value={item} key={i}>{item}</option>
              ))
              }
            </Form.Select>

            <Form.Group className="mb-3">
              <Form.Label>Group type</Form.Label>
              <div className="d-flex flex-column gap-1">
                <Form.Check
                  type="radio"
                  label="Open Group (join without approval)"
                  name="groupType"
                  value="open"
                  id="open"
                  onChange={handleRadioChange}
                />
                <Form.Check
                  type="radio"
                  label="Closed Group (join by approval)"
                  name="groupType"
                  value="closed"
                  id="close"
                  onChange={handleRadioChange}
                />
                <Form.Check
                  type="radio"
                  label="Private Group (join by invitation)"
                  name="groupType"
                  value="private"
                  id="private"
                  onChange={handleRadioChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Group for</Form.Label>
              <div className="d-flex flex-wrap gap-3">
                {["Couples", "Females", "Males", "Transgender", "Business"].map((option) => (
                  <Form.Check
                    key={option}
                    type="radio"
                    name="groupFor"
                    label={option}
                    value={option}
                    id={option.toLowerCase()}
                    onChange={handleGroupForChange}
                  />
                ))}
              </div>
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Send
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateGroupPopup;
