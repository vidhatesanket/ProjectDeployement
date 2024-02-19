import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewStatus = () => {
  const [bookedServices, setBookedServices] = useState([]);
  const serviceProviderData = JSON.parse(localStorage.getItem("serviceProvider"));

  useEffect(() => {
    const fetchBookedServices = async () => {
      try {
        console.log("service provider user name: ",serviceProviderData.username);
        const response = await axios.get(`http://localhost:5020/api/ServiceProvider/getStatus?serviceproviderusername=${serviceProviderData.username}`);
        setBookedServices(response.data);
      } catch (error) {
        console.error("Error fetching booked services:", error);
      }
    };

    if (serviceProviderData.username){
      fetchBookedServices();
    }
  }, [serviceProviderData.username]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
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
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">        
                        <li>
                            <a href="/" onClick={handleLogout}>
                                LogOut
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
      <br/><br/><br/><br/>
      </div>
      <h3 className="text-center">Your appointments</h3><br/>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Address</th>
            <th scope="col">Wages</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {bookedServices.map((service) => (
            <tr key={service.userID}>
              <td>{service.nameFirst}</td>
              <td>{service.nameLast}</td>
              <td>{service.phoneNumber}</td>
              <td>{service.address}</td>
              <td>{service.wages}</td>
              <td>{service.date.split(" ")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStatus;
