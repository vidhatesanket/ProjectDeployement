import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Image from "../assets/image2.png";
import "./LoginForm.css";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    NameFirst: "",
    NameLast: "",
    Username: "",
    Password: "",
    PhoneNumber: "",
    Address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5020/api/User/registration",
        formData
      );
      if (response.status === 200) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert("Failed to register user. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="Skill🔗Link" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-center">
            <h2>Register to Skill🔗Link</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="First Name"
                name="NameFirst"
                value={formData.NameFirst}
                onChange={handleChange} required
              />
              <input
                type="text"
                placeholder="Last Name"
                name="NameLast"
                value={formData.NameLast}
                onChange={handleChange} required
              />
              <input
                type="text"
                placeholder="Username"
                name="Username"
                value={formData.Username}
                onChange={handleChange} required
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange} required
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <input
                type="text"
                placeholder="Phone Number"
                name="PhoneNumber"
                maxLength={10}
                value={formData.PhoneNumber}
                onChange={handleChange} required
              />
              <input
                type="text"
                placeholder="Address"
                name="Address"
                value={formData.Address}
                onChange={handleChange} required
              />
              <div className="login-center-buttons">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;


