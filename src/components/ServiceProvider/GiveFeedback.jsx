import React, { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const GiveFeedback = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState(""); // State to store message from backend
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false); // Track whether feedback has been submitted
  const location = useLocation();
  const serviceProviderUsername = location.state.serviceProviderUsername;
  const userData = JSON.parse(localStorage.getItem("user"));

  console.log(userData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5020/api/User/giveFeedback",
        {
          Username:userData.username,
          ServiceProviderUsername: serviceProviderUsername,
          FeedbackMessage: feedback,
          Rating: rating,
        }
      );
      // Set message received from backend to state
      setMessage(response.data.message);
      // Optionally, you can reset the form here
      setFeedback("");
      setRating(0);
      // Mark feedback as submitted
      setHasSubmittedFeedback(true);
    } catch (error) {
      console.error("Error giving feedback:", error);
      setMessage("Failed to submit feedback. Please try again."); // Set error message
    }
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  return (
    <center className="login-center">
      <h1>Skill🔗Link</h1>
      <div className="container">
        <h3>Give Feedback</h3>
        {message && <p>{message}</p>} {/* Display message from backend */}
        {!hasSubmittedFeedback && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="serviceProviderUsername">
                Service Provider Username
              </label>
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
                        required
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
        )}
      </div>
    </center>
  );
};

export default GiveFeedback;
