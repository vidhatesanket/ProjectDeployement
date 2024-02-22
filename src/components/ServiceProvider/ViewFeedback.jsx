// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ViewFeedback = ({ serviceProviderUsername }) => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const serviceProviderData = JSON.parse(localStorage.getItem("serviceProvider"));
//   useEffect(() => {
//     const fetchFeedbacks = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5020/api/ServiceProvider/getFeedback?serviceproviderusername=${serviceProviderData.username}`);
//         setFeedbacks(response.data);
//       } catch (error) {
//         console.error("Error fetching feedback:", error);
//       }
//     };
//     fetchFeedbacks();
//   }, [serviceProviderData.username]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   };
//   const cardColors = ["#FFD700", "#FF6347", "#20B2AA", "#9370DB", "#00FFFF"];

//   // Function to determine whether text should be light or dark based on background color
//   const getTextColor = (backgroundColor) => {
//     const brightness = (backgroundColor.r * 299 + backgroundColor.g * 587 + backgroundColor.b * 114) / 1000;
//     return brightness > 125 ? "#000000" : "#ffffff"; // Use black text for light backgrounds and white text for dark backgrounds
//   };
//   return (
//     <div className="container mt-4">
//         <nav id="menu" className="navbar navbar-default navbar-fixed-top">
//             <div className="container">
//                 <div className="navbar-header">
//                     <button
//                         type="button"
//                         className="navbar-toggle collapsed"
//                         data-toggle="collapse"
//                         data-target="#bs-example-navbar-collapse-1"
//                     >
//                         <span className="sr-only">Toggle navigation</span>
//                         <span className="icon-bar"></span>
//                         <span className="icon-bar"></span>
//                         <span className="icon-bar"></span>
//                     </button>
//                     <a className="navbar-brand page-scroll" href="#page-top">
//                         👤{serviceProviderData.username}
//                     </a>
//                 </div>
//                 <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
//                     <ul className="nav navbar-nav navbar-right">        
//                         <li>
//                             <a href="/" onClick={handleLogout}>
//                                 LogOut
//                             </a>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//       <br/><br/><br/><br/>
//       <div className="container mt-4">
//       <h1 className="text-center mb-4">Feedbacks for {serviceProviderData.username}</h1>
//       <div className="container mt-4">
//       <h1 className="text-center mb-4">Feedbacks for {serviceProviderData.username}</h1>
//       <div className="row">
//         {feedbacks.map((feedback, index) => {
//           const backgroundColor = cardColors[index % cardColors.length];
//           const textColor = getTextColor(backgroundColor);

//           return (
//             <div key={feedback.id} className="col-md-6">
//               <div className="card mb-3 rounded" style={{ backgroundColor, boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" }}>
//                 <div className="card-body">
//                   <h5 className="card-title" style={{ color: textColor }}>Username: {feedback.username}</h5>
//                   <p className="card-text" style={{ color: textColor }}>Message: {feedback.feedbackMessage}</p>
//                   <p className="card-text" style={{ color: textColor }}>Rating: {feedback.rating}</p>
//                 </div>
//                 <div className="card-footer bg-light">
//                   <small className="text-muted">Submitted on {new Date().toLocaleDateString()}</small>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ViewFeedback;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ViewFeedback = ({ serviceProviderUsername }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const serviceProviderData = JSON.parse(localStorage.getItem("serviceProvider"));
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost:5020/api/ServiceProvider/getFeedback?serviceproviderusername=${serviceProviderData.username}`);
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedbacks();
  }, [serviceProviderData.username]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const cardColors = ["#FFD700", "#FF6347", "#20B2AA", "#9370DB", "#00FFFF"];

  // Function to determine whether text should be light or dark based on background color
  const getTextColor = (backgroundColor) => {
    const brightness = (backgroundColor.r * 299 + backgroundColor.g * 587 + backgroundColor.b * 114) / 1000;
    return brightness > 125 ? "#000000" : "#ffffff"; // Use black text for light backgrounds and white text for dark backgrounds
  };

  
  const viewStatus = () => {
    navigate("/viewStatus");
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
                href="viewStatus"
                onClick={viewStatus}
                className="page-scroll"
              >
                View Status
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
      <div className="container mt-4">
        <h1 className="text-center mb-4">Your Feedbacks</h1>
        <div className="row">
          {feedbacks.map((feedback, index) => {
            const backgroundColor = cardColors[index % cardColors.length];
            const textColor = getTextColor(backgroundColor);

            return (
              <div key={feedback.id} className="col-md-6">
                <div className="card mb-3 rounded"  style={{ backgroundColor, boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",borderRadius: "15px" }}>
                  <div className="card-body" style={{textAlign:"center"}}>
                    <h5 className="card-title" style={{ color: textColor }}>Username: {feedback.username}</h5>
                    <p className="card-text" style={{ color: textColor }}>Message: {feedback.feedbackMessage}</p>
                    <p className="card-text" style={{ color: textColor }}>Rating: {feedback.rating}</p>
                    <small className="text-muted" style={{ color: textColor }}>Submitted on {new Date().toLocaleDateString()}</small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;
