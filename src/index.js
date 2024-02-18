import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Contact } from './components/contact';
// import UserLogin from './components/Login';
// import App5 from './Login page/App5';
import Login from './components/UserLogin';
import Registration from './components/userRegistration';
import ServiceLogin from './components/serviceProviderLogin';
import { ServiceList } from './components/Loginservices/ServiceList';
import JsonData from "./data/data.json";
ReactDOM.render(
  <React.StrictMode>
<App></App>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
