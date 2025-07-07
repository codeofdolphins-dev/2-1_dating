import React from 'react'
import logo from "../Images/logo.png"
import { useNavigate } from 'react-router-dom'

const LogInNav = () => {
    const navigate = useNavigate()

    const handleHomeNav = ()=>{
        navigate("/")
    }

    const handleJoin = () =>{
        navigate("/subscription")
    }
    return (
        <header className="bg-dark py-3 px-4 ">
            <div className="d-flex justify-content-between align-items-center container custom-placeholder">
                {/* Logo */}
                <div onClick={handleHomeNav} style={{cursor: "pointer"}}>
                    <img src={logo} alt="2+1 Dating Logo" style={{ height: '60px' }} />
                </div>

                {/* Right section */}
                <div className="d-flex align-items-center gap-3">
                    <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={handleJoin}>
                        Join free now
                    </button>
                    <div>
                        <i className="bi bi-search h4 text-white"></i>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default LogInNav