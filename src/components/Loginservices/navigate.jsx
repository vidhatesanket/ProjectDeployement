import React from "react";
import { useNavigate } from "react-router-dom";

export const Navigate = (props) => { 
    const userData = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    
    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    };
    const  handleServiceForm= () => {
        sessionStorage.clear();
        navigate("/serviceform");
    };

    return (
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
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="ServiceForm" className="page-scroll" onClick={handleServiceForm}>
                                Get Service
                            </a>
                        </li>
                        <li>
                            <a href="bookedservices" className="page-scroll">
                                Booked Services
                            </a>
                        </li>
                        <li>
                            <a href="" onClick={handleLogout}>
                                LogOut
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
