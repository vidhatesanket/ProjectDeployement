import React, { useState,useEffect } from "react";
import { Navigate } from "./navigate";
import JsonData from "./Data.json"
// import BasicExample from "./cards";
import { Service } from "./cards";
import ServiceForm from "./ServiceForm";
// import JsonData from "../data/data.json";
export const ServiceList = (props) => {
    //  const [name1,setname]=useState();
    var name =sessionStorage["username"];
    var namefirst=sessionStorage["namefirst"];
   
      const [servicePage, setservicePageData] = useState({});
      useEffect(() => {
        setservicePageData(JsonData);
      }, []);
      
  return (<>
   <Navigate></Navigate>
   <Service data={servicePage.ServiceList}></Service>
   {/* <ServiceForm></ServiceForm> */}
   </>
  );
};