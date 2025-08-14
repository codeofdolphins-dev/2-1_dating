import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../RegistrationCss/registration.css"

import 'react-phone-input-2/lib/style.css';
// import PhoneInput from 'react-phone-input-2';
import CustomPhonenumberInputField from './CustomPhonenumberInputField';
import axios from 'axios';


const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    // emailOtp: '',
    password: '',
    confirmPassword: '',
    countryCode: '91',
    phoneNumber: '',
    phoneOtp: '',
    rememberMe: false,
    ageVerified: false,
    termsAgreed: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [oneTimeotpSend, setOneTimeOtpSend] = useState(false);


  const { username, email, password } = formData


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // const handleSendEmailOtp = () => {
  //   if (!formData.email) {
  //     toast.error('Please enter your email address first');
  //     return;
  //   }
  //   if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
  //     toast.error('Please enter a valid email address');
  //     return;
  //   }
  //   // API call to send email OTP would go here
  //   toast.success(`OTP sent to ${formData.email}`);
  //   setEmailOtpSent(true);
  // };

  //OTp copy function
  const handleCopy = (otp) => {
    navigator.clipboard.writeText(otp)
      .then(() => toast.success('OTP copied to clipboard!'))
      .catch(() => toast.error('Failed to copy OTP.'));
  };

  //otp send Functionality
  const handleSendPhoneOtp = () => {
    if (!formData.phoneNumber) {
      toast.error('Please enter your phone number first');
      return;
    }

    if (formData.phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    // Disable OTP button for 5 seconds
    setOtpTimer(20);
    setOneTimeOtpSend(true);
    setPhoneOtpSent(true);

    // Start countdown
    const countdown = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          setOneTimeOtpSend(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate OTP sending
    toast.success(`OTP sent to +${formData.countryCode}${formData.phoneNumber}`);

    axios.post(`${apiUrl}/otp/request`, { target: formData.email, type: "signup" })
      .then((response) => {
        const otp = response.data.data.code;
        toast(
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            position: 'relative',
            padding: '0.5rem 1rem 0.75rem 0.75rem',
            minWidth: '300px',
            maxWidth: '100%',
          }}>
            <button
              onClick={() => toast.dismiss()}
              style={{
                position: 'absolute',
                top: '6px',
                right: '8px',
                background: 'transparent',
                border: 'none',
                fontSize: '1.25rem',
                color: '#000',
                cursor: 'pointer',
                lineHeight: 1
              }}
              aria-label="Close"
            >
              &times;
            </button>
            <div style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>
              <strong>Your OTP:</strong> <span style={{ color: '#6c757d' }}>{otp}</span>
            </div>
            <button
              onClick={() => handleCopy(otp)}
              style={{
                padding: '5px 12px',
                fontSize: '0.875rem',
                background: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Copy OTP
            </button>
          </div>,
          {
            position: "top-right",
            autoClose: false,
            theme: "colored",
          }
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to request OTP", {
          position: "top-right",
          theme: "colored",
        });
      });
  };



  //Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = 'Username is required';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';

    // if (emailOtpSent && !formData.emailOtp) newErrors.emailOtp = 'Email OTP is required';

    const password = formData.password;

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password = 'Password must include uppercase letter, number, and special character';
    }


    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (!formData.countryCode) newErrors.countryCode = 'Country code is required';

    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    else if (formData.phoneNumber.length < 10) newErrors.phoneNumber = 'Phone number must be 10 digits';

    if (phoneOtpSent && !formData.phoneOtp) newErrors.phoneOtp = 'Phone OTP is required';

    if (!formData.ageVerified) newErrors.ageVerified = 'You must be at least 18 years old';
    if (!formData.termsAgreed) newErrors.termsAgreed = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //form submit functionality
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      toast.error('Please fix the errors in the form');
      return;
    }

    // OTP validation (moved here)
    axios.post(`${apiUrl}/otp/verify`, { target: formData.email, type: "signup", code: formData.phoneOtp })
      .then((response) => {
        console.log(response.data.message)
        if (response.data.success) {
          // If valid and OTP matched
          axios.post(`${apiUrl}/auth/signup`, { username, email, password })
            .then((response) => {
              const token = response?.data?.data?.token;
              sessionStorage.setItem('jwtToken', token);
              toast.success('Account created successfully!');

              // Redirect to next step
              setTimeout(() => navigate('/feed'), 2000);
            })
            .catch((error) => {
              console.log(error);
              toast.error(error?.response?.data?.message);
            });
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, `${error?.response?.data?.error?.reason}`);
      });
  };


  return (
    <div className="container py-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-12">
          <div className="card " style={{ backgroundColor: 'var(--color-border)' }}>
            <div className="card-body p-md-5 row justify-content-center">
              <h2 className="text-center mb-4 text-white h2">Create Member Account</h2>

              <form onSubmit={handleSubmit} className='col-lg-11 ' >
                {/* Username */}
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control ${errors.username ? 'is-invalid' : ''} py-3 bg-transparent custom-placeholder`}
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="User Name"
                    style={{ border: " 2px solid #6c757d", color: "#FFFF" }}
                  />
                  {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </div>

                {/* Email with OTP */}
                <div className="mb-3">
                  <div className="row g-2">
                    {/* Email + OTP Button */}
                    <div className="col-lg-12">
                      <div className="input-group">
                        <input
                          type="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''} py-3 bg-transparent custom-placeholder`}
                          id="email"
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          style={{ border: " 2px solid #6c757d", color: "#FFFF" }}
                        />
                        {/* <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={handleSendEmailOtp}
                          disabled={emailOtpSent}
                          style={{ border: " 2px solid #6c757d", }}
                        >
                          {emailOtpSent ? 'OTP Sent' : 'Send OTP'}
                        </button> */}
                      </div>
                      {errors.email && (
                        <div className="invalid-feedback d-block">{errors.email}</div>
                      )}
                    </div>

                    {/* Email OTP */}
                    {/* <div className="col-lg-3">
                      <input
                        type="text"
                        className={`form-control py-3 bg-transparent custom-placeholder`}
                        id="emailOtp"
                        name="emailOtp"
                        placeholder="OTP"
                        value={formData.emailOtp}
                        onChange={handleChange}
                        maxLength="6"
                        style={{ border: " 2px solid #6c757d", color: "#FFFF" }}
                      />
                      {errors.emailOtp && (
                        <div className="invalid-feedback d-block">{errors.emailOtp}</div>
                      )}
                    </div> */}
                  </div>
                </div>


                {/* Email OTP */}


                {/* Password */}
                {/* Password Input Field with Eye Icon */}
                <div className="position-relative mb-0 first-password">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control py-3 bg-transparent pe-5 custom-placeholder ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}

                    style={{
                      border: "2px solid #6c757d",
                      color: "#fff",
                      paddingRight: "3rem",
                      boxSizing: "border-box"
                    }}
                  />

                  {/* Eye toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "0.75rem",
                      transform: "translateY(-50%)",
                      border: "none",
                      background: "transparent",
                      padding: "0",
                      color: "#6c757d",
                      fontSize: "1.25rem",
                      cursor: "pointer",
                      lineHeight: 1
                    }}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>

                {/* Error message with reserved space to avoid shifting */}
                <div style={{ minHeight: "0.8rem", marginTop: "0.25rem" }}>
                  {errors.password && (
                    <div className="invalid-feedback d-block mb-3">
                      {errors.password}
                    </div>
                  )}
                </div>



                {/* Confirm Password */}
                {/* Password input with eye icon */}
                <div className=" position-relative password">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-control py-3 bg-transparent custom-placeholder`}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={{
                      border: "2px solid #6c757d",
                      color: "#fff",
                      paddingRight: "3rem",
                      boxSizing: "border-box"
                    }}
                  />

                  {/* Eye toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "0.75rem",
                      transform: "translateY(-50%)",
                      border: "none",
                      background: "transparent",
                      padding: "0",
                      color: "#6c757d",
                      fontSize: "1.25rem",
                      cursor: "pointer",
                      lineHeight: 1
                    }}
                  >
                    <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>

                {/* Error message placed separately to avoid shifting the eye icon */}
                {/* Always reserve space below input to prevent shifting */}
                <div style={{ minHeight: "0.8rem", marginTop: "0.25rem" }}>
                  {errors.confirmPassword ? (
                    <div className="invalid-feedback d-block mb-3">
                      {errors.confirmPassword}
                    </div>
                  ) : null}
                </div>





                {/* Phone Number with OTP */}
                {/* Phone Number with OTP */}
                <div className="mb-4">
                  {/* 📞 Phone Input */}
                  {/* <div className="row g-3 align-items-center mb-3">
                    <div className="col-md-12">
                      <PhoneInput
                        country={'in'}
                        value={formData.phoneNumber}
                        onChange={(value, country) => {
                          setFormData({
                            ...formData,
                            phoneNumber: value,
                            countryCode: country.dialCode,
                          });
                        }}
                        enableSearch
                        inputClass="bg-transparent text-white"
                        buttonClass="bg-transparent"
                        dropdownClass="text-white"
                        inputStyle={{
                          width: '100%',
                          paddingLeft: '65px', // leave space for flag
                          paddingTop: '28px',
                          paddingBottom: '28px',
                          border: '2px solid #6c757d',
                          borderRadius: '0.375rem',
                          backgroundColor: 'transparent',
                          color: '#fff',
                          fontSize: "1rem",
                          
                        }}
                        containerStyle={{
                          width: '100%',
                        }}
                      />
                      {errors.phoneNumber && (
                        <div className="invalid-feedback d-block">{errors.phoneNumber}</div>
                      )}
                    </div>

                  </div> */}
                  <CustomPhonenumberInputField formData={formData} setFormData={setFormData} errors={errors} />

                  {/* 📨 Send OTP + OTP Input */}
                  <div className="row g-3 align-items-center">
                    {/* Send OTP Button */}
                    <div className="col-md-8">
                      <button
                        type="button"
                        className="btn w-100 py-3"
                        onClick={handleSendPhoneOtp}
                        disabled={oneTimeotpSend}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#6c757d";
                          e.target.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#6c757d";
                        }}
                        style={{
                          border: "2px solid #6c757d",
                          color: "#6c757d",
                          backgroundColor: "transparent",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {otpTimer > 0 ? `Resend in ${otpTimer}s` : phoneOtpSent ? 'OTP Sent' : 'Send OTP'}
                      </button>

                    </div>

                    {/* OTP Input */}
                    <div className="col-md-4">
                      <input
                        type="text"
                        className={`form-control ${errors.phoneOtp ? 'is-invalid' : ''} py-3 bg-transparent custom-placeholder`}
                        id="phoneOtp"
                        name="phoneOtp"
                        placeholder="OTP"
                        value={formData.phoneOtp}
                        onChange={handleChange}
                        maxLength="6"
                        style={{ border: "2px solid #6c757d", color: "#FFFF" }}
                      />
                      {errors.phoneOtp && (
                        <div className="invalid-feedback d-block">{errors.phoneOtp}</div>
                      )}
                    </div>
                  </div>
                </div>




                {/* Remember Me */}
                {/* <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label className="form-check-label text-white" htmlFor="rememberMe">Remember me</label>
                </div> */}

                <hr style={{ color: "#ffff", }} />

                {/* Age Verification */}
                <div className="mb-3 form-check mt-3">
                  <input
                    type="checkbox"
                    className={`form-check-input ${errors.ageVerified ? 'is-invalid' : ''}`}
                    id="ageVerified"
                    name="ageVerified"
                    checked={formData.ageVerified}
                    onChange={handleChange}
                  />
                  <label className="form-check-label text-white" htmlFor="ageVerified">
                    You must be at least <span className='text-danger fw-semibold'>18 years old</span> to use this service.
                  </label>
                  {errors.ageVerified && <div className="invalid-feedback">{errors.ageVerified}</div>}
                </div>

                {/* Terms Agreement */}
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className={`form-check-input ${errors.termsAgreed ? 'is-invalid' : ''}`}
                    id="termsAgreed"
                    name="termsAgreed"
                    checked={formData.termsAgreed}
                    onChange={handleChange}
                  />
                  <label className="form-check-label text-white" htmlFor="termsAgreed">
                    I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
                  </label>
                  {errors.termsAgreed && <div className="invalid-feedback">{errors.termsAgreed}</div>}
                </div>

                {/* Submit Button */}
                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-lg" style={{ background: "var(--color-primary-green)" }}>
                    Create an account
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center text-white">
                  <p>Already have an account? <a href="/login">Login</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;