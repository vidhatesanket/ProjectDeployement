// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ServiceTable() {
//   const [slist, setslist] = useState([]);
//   const [acceptedServices, setAcceptedServices] = useState([]); // Store accepted service IDs
//   const serviceProviderData = JSON.parse(
//     localStorage.getItem("serviceProvider")
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
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
//   }, [serviceProviderData.skills]); 



// const navigate = useNavigate();
// const acceptService = async () => {
// const userIDs = slist.map((ob) => ob.userID); // Get all userIDs from the fetched data
//     try {
//       await axios.post(
//         "http://localhost:5020/api/BookingList/serviceProvider/bookingList",
//         { userIDs, serviceProviderData }
//       );
//       // Handle success, maybe show a confirmation message
//       setAcceptedServices(userIDs); // Mark all userIDs as accepted
//     } catch (err) {
//       console.log("Error accepting service:", err);
//     }
//   };
//   const isAccepted = (userID) => {
//     console.log("user id", userID);
//     return acceptedServices.includes(userID);
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
//         <div className="container">
//           <div className="navbar-header">
//             <button
//               type="button"
//               className="navbar-toggle collapsed"
//               data-toggle="collapse"
//               data-target="#bs-example-navbar-collapse-1"
//             >
//               <span className="sr-only">Toggle navigation</span>
//               <span className="icon-bar"></span>
//               <span className="icon-bar"></span>
//               <span className="icon-bar"></span>
//             </button>
//             <a className="navbar-brand page-scroll" href="#page-top">
//               👤{serviceProviderData.username}
//             </a>
//           </div>
//           <div
//             className="collapse navbar-collapse"
//             id="bs-example-navbar-collapse-1"
//           >
//             <ul className="nav navbar-nav navbar-right">
//               <li>
//                 <a
//                   href="viewStatus"
//                   onClick={viewStatus}
//                   className="page-scroll"
//                 >
//                   View Status
//                 </a>
//               </li>
//               <li>
//                 <a href="/" onClick={handleLogout}>
//                   LogOut
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//       <br />
//       <br />
//       <br />
//       <br />

//       <center>
//         <h3 className="text-center">
//           List of users who are looking for : {serviceProviderData.skills}
//         </h3>
//       </center>
//       <br />
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
//               <td>{ob.date.split(" ")[0]}</td>
//               <td>
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={acceptService}
//                   disabled={isAccepted(ob.userID)} 
//                 >
//                   {isAccepted(ob.userID) ? "Accepted" : "Accept"}
//                 </button>
//                 &nbsp;&nbsp;&nbsp;
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ServiceTable() {
//   const [slist, setslist] = useState([]);
//   const [selectedServices, setSelectedServices] = useState([]); // Store selected service IDs
//   const serviceProviderData = JSON.parse(
//     localStorage.getItem("serviceProvider")
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
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
//   }, [serviceProviderData.skills]); 

//   const navigate = useNavigate();

//   const handleCheckboxChange = (event, userID) => {
//     if (event.target.checked) {
//       setSelectedServices(prevState => [...prevState, userID]);
//     } else {
//       setSelectedServices(prevState => prevState.filter(id => id !== userID));
//     }
//   };

//   const handleConfirm = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5020/api/BookingList/serviceProvider/bookingList",
//         { userIDs: selectedServices, serviceProviderData }
//       );
//       // Handle success, maybe show a confirmation message
//       console.log("Services accepted:", selectedServices);
//       setSelectedServices([]); // Clear selected services after confirmation
//     } catch (err) {
//       console.log("Error accepting services:", err);
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
//         <div className="container">
//           <div className="navbar-header">
//             <button
//               type="button"
//               className="navbar-toggle collapsed"
//               data-toggle="collapse"
//               data-target="#bs-example-navbar-collapse-1"
//             >
//               <span className="sr-only">Toggle navigation</span>
//               <span className="icon-bar"></span>
//               <span className="icon-bar"></span>
//               <span className="icon-bar"></span>
//             </button>
//             <a className="navbar-brand page-scroll" href="#page-top">
//               👤{serviceProviderData.username}
//             </a>
//           </div>
//           <div
//             className="collapse navbar-collapse"
//             id="bs-example-navbar-collapse-1"
//           >
//             <ul className="nav navbar-nav navbar-right">
//               <li>
//                 <a
//                   href="viewStatus"
//                   onClick={viewStatus}
//                   className="page-scroll"
//                 >
//                   View Status
//                 </a>
//               </li>
//               <li>
//                 <a href="/" onClick={handleLogout}>
//                   LogOut
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//       <br />
//       <br />
//       <br />
//       <br />

//       <center>
//         <h3 className="text-center">
//           List of users who are looking for: {serviceProviderData.skills}
//         </h3>
//       </center>
//       <br />
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
//             <th>Select</th>
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
//               <td>{ob.date.split(" ")[0]}</td>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={selectedServices.includes(ob.userID)}
//                   onChange={(e) => handleCheckboxChange(e, ob.userID)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="text-center">
//         <button
//           type="button"
//           className="btn btn-primary"
//           onClick={handleConfirm}
//           disabled={selectedServices.length === 0}
//         >
//           Confirm
//         </button>
//       </div>
//     </div>
//   );
// }




import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ServiceTable() {
  const [slist, setslist] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]); // Store selected service IDs
  const [confirmationMessage, setConfirmationMessage] = useState(""); // State to hold confirmation message
  const [confirm,setConfirm]=useState(false);
  const serviceProviderData = JSON.parse(
    localStorage.getItem("serviceProvider")
  );

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

  console.log("User Requirement===> ",slist);
  const navigate = useNavigate();

  const handleCheckboxChange = (event, requirementID) => {
    if (event.target.checked) {
      setSelectedServices(prevState => [...prevState, requirementID]);
    } else {
      setSelectedServices(prevState => prevState.filter(id => id !== requirementID));
    }
  };

  const handleConfirm = async () => {
    try {
     const response= await axios.post(
        "http://localhost:5020/api/BookingList/serviceProvider/bookingList",
        { userIDs: selectedServices, serviceProviderData }
      );
      // Set confirmation message
      // setConfirmationMessage("Services submitted successfully!");
      setConfirmationMessage(response.data);
      setConfirm(true)
      // Clear selected services after confirmation
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
                  onChange={(e) => handleCheckboxChange(e, ob.requirementID)}
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



