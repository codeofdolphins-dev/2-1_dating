import React, { useEffect, useState } from "react";
import logo from "../HomePictures/logo.png"; // adjust path
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../HomeCss/home.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const [isSticky, setIsSticky] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;

            if (scrollTop > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Array of navigation items
    const navLinks = [
        { id: 1, text: 'Home', href: '#home', isActive: true },
        { id: 2, text: 'About', href: '#about' },
        { id: 3, text: 'Blog', href: '#blog' },
        { id: 4, text: 'Features', href: '#features' },
        { id: 5, text: 'Stories', href: '#stories' },
        { id: 6, text: 'Contact', href: '#contact' }
    ];

    const joinButton = () =>{
        navigate("/subscription")
    }

    return (
        <div className={isSticky ? "navbar-wrapper-height" : ""}>
            <nav
                className={`navbar navbar-expand-lg navbar-dark px-4 navbar-animated ${
                    isSticky ? "navbar-sticky" : "navbar-default"
                }`}
            >
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center brand-animated" href="#">
                        <img
                            src={logo}
                            alt="Logo"
                            width="50"
                            height="50"
                            className={`d-inline-block align-top me-2 logo-animated ${
                                isSticky ? "logo-sticky" : ""
                            }`}
                        />
                        <span className={`fw-bold brand-text ${isSticky ? "brand-sticky" : ""}`}>
                            2+1 DATING
                        </span>
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div
                        className="collapse navbar-collapse justify-content-between z-3"
                        id="navbarContent"
                    >
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
                            {navLinks.map((link, index) => (
                                <li 
                                    key={link.id} 
                                    className="nav-item nav-item-animated"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <a
                                        className={`nav-link nav-link-animated ${link.isActive ? 'active' : ''}`}
                                        href={link.href}
                                    >
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="d-flex gap-3 buttons-animated">
                            <button className="btn bg-white text-dark btn-animated">Login</button>
                            <button className="btn btn-primary btn-animated" onClick={joinButton}>Join Now</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;