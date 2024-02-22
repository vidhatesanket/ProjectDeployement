
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import * as serviceWorker from './serviceWorker';
import { Contact } from './components/contact';
// import UserLogin from './components/Login';
// import App5 from './Login page/App5';
import Login from './components/UserLogin';
import Registration from './components/userRegistration';
// import ServiceLogin from './components/serviceProviderLogin';
import { ServiceList } from './components/Loginservices/ServiceList';
import JsonData from "./data/data.json";
import LandingPage from "./components/Landingpage";
import ServiceRegistration from './components/serviceProviderRegistration';
import ServiceForm from './components/Loginservices/ServiceForm';
import ServiceTable from './components/ServiceProvider/ServiceTable';
import BookedServices from './components/ServiceProvider/BookedServices';
import ViewStatus from './components/ServiceProvider/ViewStatus';
import GiveFeedback from './components/ServiceProvider/GiveFeedback';
import UpdateProfileSP from './components/ServiceProvider/UpdateProfileSP';
import UpdateProfile from './components/Loginservices/UpdateProfile';
import ForgotPassword from './components/Loginservices/forgotPassword';
import ForgotPasswordSP from './components/ServiceProvider/forgotPasswordSP';



import ServiceLogin from './components/serviceProviderLogin';
import ViewFeedback from './components/ServiceProvider/ViewFeedback';
const App = () => {


  const AuthorizedService=()=>{
    const status=sessionStorage["status"]
    return status==="success" ? <ServiceList/> : <Login/>
  }

  const Authorizedrequest=()=>{
    const status=sessionStorage["status"]
    return status==="success" ? <ServiceList/> :<Login/>
  }
  const AuthorizedupdateProfile=()=>{
    const status=sessionStorage["success"]
    return status==="success"?<UpdateProfile/>:<Login/>
  }
  const AuthorizedServiceList=()=>{
    const status=sessionStorage["success"]
    return status==="success"?<ServiceList/>:<Login/>
  }
   const AuthorizedServiceForm=()=>{
    const status=sessionStorage["success"]
    return status==="success"?<ServiceForm/>:<Login/>
  }
  const AuthorizedServicetable=()=>{
    const status=sessionStorage["successsp"]
    return status==="successsp"?<ServiceTable/>:<ServiceLogin/>
  }
  const AuthorizedBookedServices=()=>{
    const status=sessionStorage["success"]
    return status==="success"?<BookedServices/>:<Login/>
  }

  const AuthorizedupdateProfileSp=()=>{
    const status=sessionStorage["successsp"]
    return status==="successsp"?<UpdateProfileSP/>:<ServiceLogin/>
  }
  const AuthorizedViewStatus=()=>{
    const status=sessionStorage["successsp"]
    return status==="successsp"?<ViewStatus/>:<ServiceLogin/>
  }
  const AuthorizedViewFeedBack=()=>{
    const status=sessionStorage["successsp"]
    return status==="successsp"?<ViewFeedback/>:<ServiceLogin/>
  }
  const AuthorizedGiveFeedBAck=()=>{
    const status=sessionStorage["success"]
    return status==="success"?<GiveFeedback/>:<Login/>
  }
  return (
    <div>
   
      <BrowserRouter>
    <Routes>
    <Route path="/" element={<LandingPage></LandingPage>}/>
      <Route path="login" element={<Login></Login>}/> 
      <Route path="register" element={<Registration></Registration>}/>
      {/* <Route path="login" element={<ServiceLogin></ServiceLogin>}></Route> */}
      <Route path="/servicelist" element={<AuthorizedServiceList></AuthorizedServiceList>}/>
      <Route path="/servicerequest" element={<Authorizedrequest/>}/>
      <Route path="/serviceform" element={<AuthorizedServiceForm></AuthorizedServiceForm>}/>
      <Route path="/serviceprovider" element={<ServiceLogin></ServiceLogin>}/>
      <Route path="/ServiceProviderregister" element={<ServiceRegistration></ServiceRegistration>}/>
      <Route path="/data"   element={<AuthorizedServicetable/>}/>
      <Route path="/bookedservices"   element={<AuthorizedBookedServices/>}/>
      <Route path="/viewStatus"   element={<AuthorizedViewStatus/>}/>
      <Route path="/viewFeedback"   element={<AuthorizedViewFeedBack/>}/>
      <Route path="/give-feedback" element={<AuthorizedGiveFeedBAck />} />
      <Route path="/forgot" element={<ForgotPassword/>}/>
      <Route path="/forgotsp" element={<ForgotPasswordSP/>}/>

      <Route path="/Userupdate" element={<AuthorizedupdateProfile/>}/>
      <Route path="/ServiceProviderupdate" element={<AuthorizedupdateProfileSp/>}/>
    
    </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
