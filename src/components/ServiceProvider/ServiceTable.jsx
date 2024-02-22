import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function ServiceTable() {
  const [slist, setslist] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedUserID, setSelectedUserID] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const serviceProviderData = JSON.parse(localStorage.getItem("serviceProvider"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5020/api/ServiceProvider/userrequirements?skills=" +
          serviceProviderData.skills
        );
        setslist([...result.data]);
      } catch (err) {
        console.log("error occurred", err);
      }
    };

    fetchData();
  }, [serviceProviderData.skills]);

  const navigate = useNavigate();

  const handleCheckboxChange = (event, ob) => {
    if (event.target.checked) {
      setSelectedServices(prevState => [...prevState, ob.requirementID]);
      setSelectedUserID(prevState => [...prevState, ob.userID]);
    } else {
      setSelectedServices(prevState => prevState.filter(id => id !== ob.requirementID));
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5020/api/BookingList/serviceProvider/bookingList",
        { requirementIDs: selectedServices, userIDs: selectedUserID, serviceProviderData }
      );
      setConfirmationMessage(response.data);
      setConfirm(true);
      setSelectedServices([]);
    } catch (err) {
      console.log("Error accepting services:", err);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const viewStatus = () => {
    navigate("/viewStatus");
  };

  const viewFeedback = () => {
    navigate("/viewFeedback");
  };

  const ServiceProviderupdate = () => {
    navigate("/ServiceProviderupdate");
  };

  

  return (
    <div>
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
              👤{serviceProviderData.username}
            </a>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a
                  href="ServiceProviderupdate"
                  onClick={ServiceProviderupdate}
                  className="page-scroll"
                >
                  Update Profile
                </a>
              </li>
              <li>
                <a
                  href="viewStatus"
                  onClick={viewStatus}
                  className="page-scroll"
                >
                  View Status
                </a>
              </li>
              <li>
                <a
                  href="viewFeedback"
                  onClick={viewFeedback}
                  className="page-scroll"
                >
                  View Feedback
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
      <br />
      <br />
      <br />
      <br />

      {!confirm&&(<center>
        <h3 className="text-center">
          List of users who are looking for: {serviceProviderData.skills}
        </h3>
      </center>)}
      <br />
      
      {!confirm&&(  <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">First name</th>
            <th scope="col">Last name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Skills</th>
            <th scope="col">Wages</th>
            <th scope="col">Address</th>
            <th scope="col">Date</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {slist.map((ob) => (
            <tr key={ob.userID}>
              <td>{ob.nameFirst}</td>
              <td>{ob.nameLast}</td>
              <td>{ob.phoneNumber}</td>
              <td>{ob.skills}</td>
              <td>{ob.wages}</td>
              <td>{ob.address}</td>
              <td>{ob.date.split(" ")[0]}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedServices.includes(ob.requirementID)}
                  onChange={(e) => handleCheckboxChange(e, ob)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>)}
     {!confirm&&( <div className="text-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleConfirm}
          disabled={selectedServices.length === 0}
        >
          Confirm
        </button>
      </div>)}
      {confirmationMessage && (
        <div className="text-center mt-3">
          <h4>{confirmationMessage}</h4>
        </div>
      )}
    </div>
  );
}
