import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookedServices = () => {
  const [bookedServices, setBookedServices] = useState([]);
  const [selectedServiceProvider, setSelectedServiceProvider] = useState(null);
  const userData = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookedServices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5020/api/BookingList/user/bookingList?userID=${userData.userID}`
        );
        setBookedServices(response.data);
      } catch (error) {
        console.error("Error fetching booked services:", error);
      }
    };

    if (userData.userID) {
      fetchBookedServices();
    }
  }, [userData.userID]);

  const handleLogout = () => {
    // Handle logout logic here, such as clearing local storage and redirecting to the login page
    localStorage.removeItem("user");
    // Redirect to login page
    window.location.href = "/login"; // Update the URL to match your login page route
  };

  const handleServiceForm = () => {
    sessionStorage.clear();
    navigate("/serviceform");
  };
  const handleSelectServiceProvider = (serviceProvider) => {
    setSelectedServiceProvider(serviceProvider);
  };

  useEffect(() => {
    const bookServiceProvider = async () => {
      try {
        if (selectedServiceProvider) {
          await axios.post(
            "http://localhost:5020/api/BookingList/user/bookServiceProvider",
            {
              UserID: userData.userID,
              ServiceProviderUsername: selectedServiceProvider.username,
              IsSelected: true,
            }
          );
        }
      } catch (error) {
        console.error("Error booking service provider:", error);
      }
    };

    bookServiceProvider();
  }, [selectedServiceProvider, userData.userID]);

  const handleGiveFeedback = (serviceProviderUsername) => {
    // Navigate to the GiveFeedback component with serviceProviderUsername as props
    console.log("service provider username ==> ", serviceProviderUsername);
    navigate("/give-feedback", { state: { serviceProviderUsername } });
  };

  return (
    <center className="login-center">
      <h1>Skill🔗Link</h1>
      <div className="container">
        <h3>Suggested Service Providers</h3>
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
                  <a href="/" onClick={handleLogout}>
                    LogOut
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">NameFirst</th>
              <th scope="col">NameLast</th>
              <th scope="col">PhoneNumber</th>
              <th scope="col">Skills</th>
              <th scope="col">Wages</th>
              <th scope="col">Average Ratings</th>
              <th scope="col">Select</th>
              <th scope="col">Give Feedback</th>
            </tr>
          </thead>
          <tbody>
            {bookedServices.map((service) => (
              <tr key={service.userID}>
                <td>{service.nameFirst}</td>
                <td>{service.nameLast}</td>
                <td>{service.phoneNumber}</td>
                <td>{service.skills}</td>
                <td>{service.wages}</td>
                <td>{service.rating.toFixed(1)}</td>
                <td>
                  <button
                    className={`btn ${
                      selectedServiceProvider === service
                        ? "btn-primary"
                        : "btn-secondary"
                    }`}
                    onClick={() => handleSelectServiceProvider(service)}
                    disabled={
                      selectedServiceProvider !== null &&
                      selectedServiceProvider !== service
                    }
                  >
                    {selectedServiceProvider === service
                      ? "Selected"
                      : "Select"}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleGiveFeedback(service.username)}>
                    Open form
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </center>
  );
};

export default BookedServices;
