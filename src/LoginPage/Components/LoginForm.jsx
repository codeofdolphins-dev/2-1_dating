import React from 'react';
import "../LoginCss/login.css"
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate()

    const handleJoin = ()=>{
        navigate("/subscription")
    }
    return (
        <div className="bg-dark d-flex justify-content-center align-items-center text-white px-3" style={{ height: '90vh' }}>
  <div
    className="text-white rounded-4 p-4 w-100"
    style={{ maxWidth: '500px', backgroundColor: '#343a40' }}
  >
    <h4 className="text-center fw-bold mb-4">Member Login</h4>

    {/* Username */}
    <div className="mb-3">
      <input
        type="text"
        className="form-control bg-dark text-white border-secondary py-2 w-75 mx-auto custom-placeholder"
        placeholder="User Name"
      />
    </div>

    {/* Password */}
    <div className="mb-3 position-relative w-75 mx-auto">
      <input
        type="password"
        className="form-control bg-dark text-white border-secondary py-2 pe-5 custom-placeholder"
        placeholder="Password"
      />
      <i
        className="bi bi-eye position-absolute top-50 translate-middle-y"
        style={{
          right: '15px',
          cursor: 'pointer',
          color: '#9ca3af',
        }}
      ></i>
    </div>

    {/* Password Info */}
    <p className="fw-semibold text-center mb-1" style={{ fontSize: '1.05rem' }}>
      Password is case sensitive.
    </p>
    <p className="text-white text-center mb-3" style={{ fontSize: '0.9rem' }}>
      In case of error, type lowercase only.
    </p>

    {/* CAPTCHA */}
    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
      <img
        src="https://dummyimage.com/60x30/aaa/000.png&text=21"
        alt="captcha1"
        height="30"
      />
      <span className="text-white fs-5 fw-bold">-</span>
      <img
        src="https://dummyimage.com/30x30/aaa/000.png&text=3"
        alt="captcha2"
        height="30"
      />
      <span className="text-white fs-5 fw-bold">=</span>
      <input
        type="text"
        className="form-control bg-dark text-white border-secondary"
        style={{ width: '60px' }}
      />
    </div>

    {/* Forgot Password */}
    <div className="text-center mb-3">
      <a href="#" className="text-white small text-decoration-underline">Forgot Password</a>
    </div>

    {/* Login Button */}
    <div className="mb-3 d-flex justify-content-center">
      <button className="btn btn-primary w-75">Login</button>
    </div>

    {/* Bottom Text */}
    <div className="d-flex justify-content-between align-items-center w-75 mx-auto">
      <span className="text-white small">Not a member?</span>
      <button className="btn btn-outline-light btn-sm rounded-pill px-3" onClick={handleJoin}>
        Join now free
      </button>
    </div>
  </div>
</div>

    );
};

export default LoginForm;
