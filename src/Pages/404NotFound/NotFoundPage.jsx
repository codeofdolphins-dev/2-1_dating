import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import "./NotFound.css";

const NotFoundPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100 text-white" style={{backgroundColor:"var(--color-background)"}}>
      {/* 404 Content */}
      <div
        className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center"
      >
        <h1 className="display-1 fw-bold">404</h1>
        <h2 className="fw-semibold mb-3">Page Not Found</h2>
        <p className="mb-4">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <div>
          <Link to="/">
            <Button size="lg" className="me-3 border-0" style={{backgroundColor:"var(--color-primary-green)",color:"#000000"}}>
              Go Home
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline-light" size="lg">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer Stats */}
      
    </div>
  );
};

export default NotFoundPage;
