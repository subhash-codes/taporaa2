// src/Context/ServiceContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ServiceContext = createContext(null);

const ServiceContextProvider = ({ children }) => {
  const [services_list, setServicesList] = useState([]);
  const url = "http://localhost:4000";

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${url}/api/services/listservice`);
      if (response.data.success) {
        setServicesList(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <ServiceContext.Provider value={{ services_list, fetchServices, url }}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceContextProvider;
