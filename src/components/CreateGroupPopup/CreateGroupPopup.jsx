import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import "./CreateGroupPopup.css"

const CreateGroupPopup = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    group: "",
    description: "",
    where: "",
    groupType: "",
    groupFor: "",
  });

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
    console.log(formData);
    // submit logic here
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered >
      <Modal.Header closeButton className="client-page-background text-white">
        <Modal.Title>Request your own group:</Modal.Title>
      </Modal.Header>
      <Modal.Body className="client-page-background text-white">
        <Form onSubmit={handleSubmit}>
            <Form.Label>Group</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control
             className="rounded-pill"
              type="text"
              name="group"
              value={formData.group}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Label>Description</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              className="rounded-pill"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Label>Where</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              className="rounded-pill"
              name="where"
              value={formData.where}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Group type</Form.Label>
            <div className="d-flex flex-column gap-1">
              <Form.Check
                type="radio"
                label="Open Group (join without approval)"
                name="groupType"
                value="open"
                onChange={handleRadioChange}
              />
              <Form.Check
                type="radio"
                label="Closed Group (join by approval)"
                name="groupType"
                value="closed"
                onChange={handleRadioChange}
              />
              <Form.Check
                type="radio"
                label="Private Group (join by invitation)"
                name="groupType"
                value="private"
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
  );
};

export default CreateGroupPopup;
