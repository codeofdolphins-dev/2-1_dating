import React, { useState, useEffect } from 'react';
import "../LoginCss/login.css"
import { useNavigate } from 'react-router-dom';
// import UseAlert from '../';
import { ToastContainer, toast } from 'react-toastify';
import UseAlert from '../../alert/UseAlert';
import axios from 'axios';

const LoginForm = () => {
  // Combined form state
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    showPassword: false,
    userAnswer: '',
    rememberMe: false
  });

  //remeember me function
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  console.log(formData.rememberMe)

  // const [errors, setErrors] = useState({});
  const [mathPuzzle, setMathPuzzle] = useState({ question: '', answer: 0 });
  const [captchaError, setCaptchaError] = useState('');
  const navigate = useNavigate();
  // const { showAlert } = UseAlert();

  // Generate a new math puzzle
  const generateMathPuzzle = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let num1, num2, answer;

    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 10) + 5;
        num2 = Math.floor(Math.random() * 5) + 1;
        answer = num1 - num2;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 5) + 1;
        num2 = Math.floor(Math.random() * 5) + 1;
        answer = num1 * num2;
        break;
      default:
        num1 = 1;
        num2 = 1;
        answer = 2;
    }

    setMathPuzzle({
      question: `${num1} ${operation} ${num2}`,
      answer: answer
    });
    setFormData(prev => ({ ...prev, userAnswer: '' }));
    setCaptchaError('');
  };

  useEffect(() => {
    generateMathPuzzle();
  }, []);

  const handleJoin = () => {
    navigate("/registration");
  };

  const handleShowPassword = () => {
    setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }));
  };

  // Handle all form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const apiUrl = import.meta.env.VITE_BASE_URL;
  // const { username, password } = formData
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.password) {
      toast.error('Username & Password Both are required', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    } else {
      // API CALL WILL BE HERE
      if (parseInt(formData.userAnswer) === mathPuzzle.answer) {
        try {
          const { status, data } = await axios.post(`${apiUrl}/auth/login`, {
            email: "bishal@gmail.com",
            password: "password123",
          });

          if (status === 200) {
            toast.success('Login Success!', {
              position: "top-right",
              autoClose: 3000,
              theme: "colored",
            });
            console.log("Userdata", data);
          }
        } catch (error) {
          toast.error('Login failed!', {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
          console.error("Login Error:", error);
        }
      }

    }

    // Validate the math puzzle answer
    if (parseInt(formData.userAnswer) !== mathPuzzle.answer) {
      setCaptchaError('Incorrect answer. Please try again.');
      generateMathPuzzle();
      toast.error('Wrong math puzzle answer!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    // If all validations pass
    setCaptchaError('');
    // toast.success('Math puzzle solved!', {
    //   position: "top-right",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   theme: "colored",
    // });

    // Here you would typically handle the actual login logic
    // showAlert({
    //   title: 'Success!',
    //   text: 'You have successfully solved the puzzle',
    //   icon: 'success',
    //   confirmButtonText: 'OK',
    // });
  };



  return (
    <div className="d-flex justify-content-center align-items-center text-white px-3" style={{ height: '90vh', backgroundColor: "var( --color-background)" }}>
      <ToastContainer />
      <div
        className="text-white rounded-4 p-4 w-100"
        style={{ maxWidth: '500px', backgroundColor: 'var(--color-border)' }}
      >
        <h4 className="text-center fw-bold mb-4 h3">Member Login</h4>

        {/* Username */}
        <div className="mb-3">
          <input
            type="text"
            name="username"
            className="form-control bg-dark text-white border-secondary py-3 w-75 mx-auto custom-placeholder bg-transparent"
            placeholder="User Name"
            style={{ border: " 2px solid #6c757d" }}
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        {/* Password */}
        <div className="mb-3 position-relative w-75 mx-auto">
          <input
            type={formData.showPassword ? "text" : "password"}
            name="password"
            className="form-control bg-dark text-white border-secondary py-3 pe-5 custom-placeholder bg-transparent"
            placeholder="Password"
            value={formData.password}
            style={{ border: " 2px solid #6c757d" }}
            onChange={handleInputChange}
          />
          {formData.showPassword ? (
            <i
              className="bi bi-eye position-absolute top-50 translate-middle-y"
              onClick={handleShowPassword}
              style={{
                right: '15px',
                cursor: 'pointer',
                color: '#9ca3af',
              }}
            ></i>
          ) : (
            <i
              className="bi bi-eye-slash position-absolute top-50 translate-middle-y"
              onClick={handleShowPassword}
              style={{
                right: '15px',
                cursor: 'pointer',
                color: '#9ca3af',
              }}
            ></i>
          )}
        </div>

        {/* Password Info */}
        <p className="fw-semibold text-center mb-1" style={{ fontSize: '1.2rem' }}>
          Password is case sensitive.
        </p>
        <p className="text-white text-center mb-3" style={{ fontSize: '1rem' }}>
          In case of error, type lowercase only.
        </p>

        {/* Math Puzzle */}
        <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
          <div className="bg-dark text-white p-2 rounded bg-transparent" style={{ minWidth: '80px', textAlign: 'center', border: " 2px solid #6c757d" }}>
            {mathPuzzle.question}
          </div>
          <span className="text-white fs-5 fw-bold">=</span>
          <input
            type="text"
            name="userAnswer"
            className="form-control bg-dark text-white border-secondary bg-transparent"
            style={{ width: '60px', border: " 2px solid #6c757d" }}
            value={formData.userAnswer}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>
        {captchaError && <p className="text-danger text-center small mb-2">{captchaError}</p>}

        {/* Forgot Password */}
        <div className="text-center mb-3">
          <a href="#" className="text-white small text-decoration-underline">Forgot Password</a>
        </div>

        {/* Login Button */}
        <div className="mb-3 d-flex justify-content-center">
          <button className="btn w-75 btn-lg" style={{ backgroundColor: "var(--color-primary-green)" }} onClick={handleSubmit}>Login</button>
        </div>

        {/* Remember Me checkbox */}
        <div className="container " style={{ padding: "0 55px" }}>
          <div className="mb-3 form-check d-flex justify-content-left gap-2 ">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label className="form-check-label text-white" htmlFor="rememberMe">Remember me</label>
          </div>
        </div>


        {/* Bottom Text */}
        <div className="d-flex justify-content-between align-items-center w-75 mx-auto">
          <span className="text-white small fw-semibold">Not a member?</span>
          <button className="btn btn-outline-light btn-sm rounded-pill px-3" onClick={handleJoin}>
            Join now free
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;