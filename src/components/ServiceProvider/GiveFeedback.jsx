import React, { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GiveFeedback = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState(""); // State to store message from backend
  const location = useLocation();
  const serviceProviderUsername = location.state.serviceProviderUsername;
  const userData = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5020/api/User/giveFeedback", {
        ServiceProviderUsername: serviceProviderUsername,
        FeedbackMessage: feedback,
        Rating: rating
      });
      // Set message received from backend to state
      setMessage(response.data.message);
      // Optionally, you can reset the form here
      setFeedback("");
      setRating(0);
    } catch (error) {
      console.error("Error giving feedback:", error);
      setMessage("Failed to submit feedback. Please try again."); // Set error message
    }
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
};
  return (
    <center className="login-center">
      <h1>Skill🔗Link</h1>
      <div className="container">
        <h3>Give Feedback</h3>
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand page-scroll" href="#page-top">
                👤{userData.username}
              </a>
            </div>
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="serviceform" className="page-scroll">
                    Service Form
                  </a>
                </li>
                <li>
                  <a href="bookedservices" className="page-scroll">
                    Booked Services
                  </a>
                </li>
                <li>
                  <a href="/" onClick={handleLogout}>
                    LogOut
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      {message && <p>{message}</p>} {/* Display message from backend */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="serviceProviderUsername">Service Provider Username</label>
          <input
            type="text"
            className="form-control"
            id="serviceProviderUsername"
            value={serviceProviderUsername}
            readOnly // Make the input field read-only
          />
        </div>
        <div className="form-group">
          <label htmlFor="feedback">Feedback</label>
          <textarea
            className="form-control"
            id="feedback"
            rows="5"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Rating</label>
          <div className="d-flex align-items-center">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <label key={ratingValue} className="mr-2">
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => handleStarClick(ratingValue)}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    className="star"
                    color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                    size={30}
                    style={{ cursor: "pointer" }}
                  />
                </label>
              );
            })}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Feedback
        </button>
      </form>
    </div>
    </center>
  );
};

export default GiveFeedback;
