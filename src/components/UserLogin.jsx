import React, { useState } from "react";
import axios from "axios";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Username: "",
    Password: ""
  });
  const userData = JSON.parse(localStorage.getItem("user"));
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleLoginSuccess = (user) => {
    // Store user information in local storage
    localStorage.setItem("user", JSON.stringify(user));
    // Redirect to the desired page
    navigate("/servicelist");
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { Username, Password } = formData;
      const response = await axios.post(
        "http://localhost:5020/api/User/login",
        `Username=${Username}&Password=${Password}`
      );
      if (response.status === 200) {
        const { message, user } = response.data; 
        console.log(response.data);
        setMessage(message);
        setUser(user); 
        handleLoginSuccess(user);
      } else {
        setMessage("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Welcome to Skill🔗Link</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                name="Username"
                value={formData.Username}
                onChange={handleChange}
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>
              <div className="login-center-options">
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;

