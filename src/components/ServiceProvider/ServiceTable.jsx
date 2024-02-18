// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// export default function ServiceTable() {
//   const [slist, setslist] = useState([]);
//   const serviceProviderData = JSON.parse(
//     localStorage.getItem("serviceProvider")
//   );
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log("service provider====>", serviceProviderData);
//         const result = await axios.get(
//           "http://localhost:5020/api/ServiceProvider/userrequirements?skills=" +
//             serviceProviderData.skills
//         );
//         setslist([...result.data]);
//       } catch (err) {
//         console.log("error occurred", err);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures the effect runs only once on mount

//   console.log("slist====>", slist);
//   const userIDs = slist.map((item) => item.userID);
//   console.log("userIDs====>", userIDs);
//   console.log("serviceProviderdata////", serviceProviderData);
//   const navigate = useNavigate();
//   const acceptService = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5020/api/BookingList/serviceProvider/bookingList",
//         { userIDs, serviceProviderData }
//       );
//       // Handle success, maybe show a confirmation message
//     } catch (err) {
//       console.log("Error accepting service:", err);
//     }
//   };
//   const handleLogout = () => {
//     sessionStorage.clear();
//     navigate("/");
//   };
//   const viewStatus = () => {
//     navigate("/viewStatus");
//   };
//   return (
//     <div>
//       <nav id="menu" className="navbar navbar-default navbar-fixed-top">
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
//                             <a href="viewStatus" onClick={viewStatus} className="page-scroll">
//                                 View Status
//                             </a>
//                         </li>
//                         <li>
//                             <a href="/" onClick={handleLogout}>
//                                 LogOut
//                             </a>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//       <br/><br/><br/><br/><br/><br/>
      
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th scope="col">First name</th>
//             <th scope="col">Last name</th>
//             <th scope="col">Phone Number</th>
//             <th scope="col">Skills</th>
//             <th scope="col">Wages</th>
//             <th scope="col">Address</th>
//             <th scope="col">Date</th>
//             <th>action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {slist.map((ob) => (
//             <tr key={ob.userID}>
//               <td>{ob.nameFirst}</td>
//               <td>{ob.nameLast}</td>
//               <td>{ob.phoneNumber}</td>
//               <td>{ob.skills}</td>
//               <td>{ob.wages}</td>
//               <td>{ob.address}</td>
//               <td>{ob.date}</td>
//               <td>
//             <button type="button" className="btn btn-primary" onClick={acceptService}>accept</button>
//                 &nbsp;&nbsp;&nbsp;
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ServiceTable() {
  const [slist, setslist] = useState([]);
  const [acceptedServices, setAcceptedServices] = useState([]); // Store accepted service IDs
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
  }, [serviceProviderData.skills]); // Trigger effect when service provider data changes

  const navigate = useNavigate();

  const acceptService = async () => {
    const userIDs = slist.map((ob) => ob.userID); // Get all userIDs from the fetched data
    try {
      await axios.post(
        "http://localhost:5020/api/BookingList/serviceProvider/bookingList",
        { userIDs, serviceProviderData }
      );
      // Handle success, maybe show a confirmation message
      setAcceptedServices(userIDs); // Mark all userIDs as accepted
    } catch (err) {
      console.log("Error accepting service:", err);
    }
  };

  const isAccepted = (userID) => {
    return acceptedServices.includes(userID);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
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
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="viewStatus" onClick={viewStatus} className="page-scroll">
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
      <br/><br/><br/><br/><br/><br/>
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">First name</th>
            <th scope="col">Last name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Skills</th>
            <th scope="col">Wages</th>
            <th scope="col">Address</th>
            <th scope="col">Date</th>
            <th>action</th>
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
              <td>{ob.date}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={acceptService}
                  disabled={isAccepted(ob.userID)} // Disable button if service is already accepted
                >
                  {isAccepted(ob.userID) ? "Accepted" : "Accept"}
                </button>
                &nbsp;&nbsp;&nbsp;
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
