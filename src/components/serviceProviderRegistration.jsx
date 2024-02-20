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
      setMessage("An error occurred. Please try again later."); // Set a generic error message
      alert("Service Provider with same username is already existing");
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
                pattern="[A-Za-z]+"
                title="Please enter only characters"
                required
              />
              <input
                type="text"
                placeholder="Namelast"
                name="NameLast"
                value={formData.NameLast}
                onChange={handleChange}
                pattern="[A-Za-z]+"
                title="Please enter only characters"
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
                  placeholder="Password (8-15 characters, 1 uppercase, 1 digit, 1 special character)"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$"
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
              <input
                type="text"
                placeholder="Phonenumber"
                name="PhoneNumber"
                maxlength="10"
                value={formData.PhoneNumber}
                pattern="[6-9]{1}[0-9]{9}"
                onChange={handleChange}
                required
              />
              {/* <input
                type="text"
                placeholder="Skills"
                name="Skills"
                value={formData.Skills}
                onChange={handleChange}
                required
              /> */}
              <select
                className="form-control"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                defaultValue=""
                required
              >
                <option value="" disabled>Select a service</option>
                <option value="Plumber">Plumber</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Painter">Painter</option>
                <option value="Pest Controller">Pest Controller</option>
                <option value="Gardener">Gardener</option>
                <option value="Electrician">Electrician</option>
                <option value="Cleaner">Cleaner</option>

            
              </select>

              <input
                type="text"
                placeholder="Charges"
                name="Wages"
                value={formData.Wages}
                onChange={handleChange}
                pattern="^[1-9][0-9]*$"
                required
              />
              <input
                type="text"
                placeholder="Address"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                pattern="[A-Za-z]+"
                title="Please enter only characters"
                required
              />

              <div className="login-center-options"></div>
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

export default ServiceRegistration;
