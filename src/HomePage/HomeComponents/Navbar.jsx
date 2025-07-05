import React, { useEffect, useState } from "react";
import logo from "../HomePictures/logo.png"; // adjust path
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../HomeCss/home.css";

function Navbar() {
    const [isSticky, setIsSticky] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;

            if (scrollTop > 50) {
                setIsSticky(true);
                setHasScrolled(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Array of navigation items
    const navLinks = [
        { id: 1, text: 'Home', href: '#', isActive: true },
        { id: 2, text: 'About', href: '#' },
        { id: 3, text: 'Blog', href: '#' },
        { id: 4, text: 'Features', href: '#' },
        { id: 5, text: 'Stories', href: '#' },
        { id: 6, text: 'Contact', href: '#' }
    ];

    return (

        <div className={isSticky ? "navbar-wrapper-height" : ""}>
            <nav
                className={`navbar navbar-expand-lg navbar-dark bg-dark px-4 ${isSticky ? "fixed-top sticky-animated" : "fixed non-sticky-animated"
                    } ${hasScrolled ? "animated-navbar" : "non-sticky-animated"}`}
            >
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img
                            src={logo}
                            alt="Logo"
                            width="50"
                            height="50"
                            className="d-inline-block align-top me-2"
                        />
                        <span className="fw-bold">2+1 DATING</span>
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
                            {navLinks.map((link) => (
                                <li key={link.id} className="nav-item">
                                    <a
                                        className={`nav-link ${link.isActive ? 'active' : ''}`}
                                        href={link.href}
                                    >
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="d-flex gap-3">
                            <button className="btn bg-white text-dark">Login</button>
                            <button className="btn btn-primary">Join Now</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
