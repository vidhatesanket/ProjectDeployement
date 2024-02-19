
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
import ServiceLogin from './components/serviceProviderLogin';
const App = () => {


  const AuthorizedService=()=>{
    const status=sessionStorage["status"]
    return status==="success" ? <ServiceList/> : <Login/>
  }

  const Authorizedrequest=()=>{
    const status=sessionStorage["status"]
    return status==="success" ? <ServiceList/> :<Login/>
  }

  return (
    <div>
   
      <BrowserRouter>
    <Routes>
    <Route path="/" element={<LandingPage></LandingPage>}/>
      <Route path="login" element={<Login></Login>}/> 
      <Route path="register" element={<Registration></Registration>}/>
      {/* <Route path="login" element={<ServiceLogin></ServiceLogin>}></Route> */}
      <Route path="/servicelist" element={<ServiceList></ServiceList>}/>
      <Route path="/servicerequest" element={<Authorizedrequest/>}/>
      <Route path="/serviceform" element={<ServiceForm></ServiceForm>}/>
      <Route path="/serviceprovider" element={<ServiceLogin></ServiceLogin>}/>
      <Route path="/ServiceProviderregister" element={<ServiceRegistration></ServiceRegistration>}/>
      <Route path="/data"   element={<ServiceTable/>}/>
      <Route path="/bookedservices"   element={<BookedServices/>}/>
      <Route path="/viewStatus"   element={<ViewStatus/>}/>
      <Route path="/give-feedback" element={<GiveFeedback />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
