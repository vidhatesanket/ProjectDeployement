import React, { useEffect, useState } from "react";
import Image from "../assets/image3.jpg";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

import "./LoginForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ServiceRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    NameFirst: "",
    NameLast: "",
    Username: "",
    Password: "",
    PhoneNumber: "",
    Skills: "",
    Wages: "",
    Address: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post(
          "http://localhost:5020/api/ServiceProvider/registration",
          formData
        )
        .then((response) => {
          const result = response.data;
          //   const status = response.status
          console.log(response.data);
          //   const { userId, userName, emailId, password, role } = result
          //   console.log(userId)

          if (response.status === 200) {
            // toast.warning("success")
            alert("success");
            navigate("/serviceprovider");
          } else {
            alert("Wrong Credential");
            // toast.warning("wrong")
            navigate("/ServiceProviderregister");
          }
        });

      // setMessage(response.data); // Set the message received from the server
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again later."); // Set a generic error message
    }
  };
  return (
    <div className="login-main">
      <div className="login-left">
        <div>
          <h2>Earn More with</h2>
          <br />
          <h2> Skill🔗Link</h2>
          <br></br>
          <img src={Image} alt="" />
        </div>
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <p>Please enter your details</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Namefirst"
                name="NameFirst"
                value={formData.NameFirst}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Namelast"
                name="NameLast"
                value={formData.NameLast}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Username"
                name="Username"
                value={formData.Username}
                onChange={handleChange}
                required
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  required
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
              {/* <div className="form-group">
                <label htmlFor="pname">PhoneNumber</label>
                <input
                  type="number"
                  className="form-control"
                  id="pname"
                  name="wages"
                  value={formData.wages}
                  maxLength={10}
                  onChange={handleChange}
                  required
                />
              </div> */}
              <input type="text" placeholder="Phonenumber" name="PhoneNumber" maxlength="10"  value={formData.PhoneNumber} onChange={handleChange} required/>
              <input
                type="text"
                placeholder="Skills"
                name="Skills"
                value={formData.Skills}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Wages"
                name="Wages"
                value={formData.Wages}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Address"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                required
              />

              <div className="login-center-options"></div>
              <div className="login-center-buttons">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>
          =
        </div>
      </div>
    </div>
  );
};

export default ServiceRegistration;
