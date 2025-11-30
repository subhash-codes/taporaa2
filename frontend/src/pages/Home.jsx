import React from "react";
import car from "../assets/c1.png"; // Example import, replace with actual image path
import axios from "axios";
import { useState, useEffect } from "react";

const Home = ({ url }) => {


  const [selectedService, setSelectedService] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [garages, setGarages] = useState([]);
  const [list, setList] = useState([]);

  console.log("LIST", list);




  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/servicetypes/listServiceType`);
      console.log("RAW API RESPONSE:", response.data);
      if (response.data.success) {
        console.log("API RESPONSE:", response.data);
        setList(response.data.data || response.data);
      }
      // else toast.error("Error fetching serviceType list.");
    } catch (error) {
      console.error(error);
      // toast.error("Server error while fetching garages.");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  const handleGPS = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);

        setLocation("Current Location"); // or call reverse-geocode backend API
      },
      (err) => {
        alert("Location permission denied");
      }
    );
  };

  const checkAvailability = async () => {
    try {
      const body = {
        latitude,
        longitude,
        address: location,
        serviceTypeId: selectedService
      };

      const response = await axios.post(
        "http://localhost:8080/api/garages/search",
        body
      );

      setGarages(response.data); // Update UI
    } catch (error) {
      console.error(error);
    }
  };




  return (
    // The main container is set to the dark blue background seen in the screenshot.
    // It's set to full viewport height (h-screen) for the hero section effect.
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: "#093570" }}>

      {/* ========================================
        1. Navigation Bar (Header) 
        ========================================
      */}
      <header className="flex justify-between items-center py-4 px-8 md:px-16 lg:px-24 text-white">
        {/* Logo/Site Name */}
        {/* <div className="text-xl font-bold">
          AutoCare Mobile
        </div> */}



        {/* Language Selector */}
        <div className="flex items-center space-x-1 border border-white px-2 py-1 rounded text-sm cursor-pointer">
          <span>EN</span>
          <span>▼</span> {/* Simple down arrow */}
        </div>
      </header>

      {/* A line to separate header from content, often used in professional designs */}
      <hr className="opacity-10 mx-8 md:mx-16 lg:mx-24" />

      {/* ========================================
        2. Hero Section (Content and Image) 
        ========================================
      */}

      <div className="flex justify-center">
        <div className="w-[70%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-68px)]">
            {/* LEFT: Text Content and Form */}
            <div className="flex flex-col justify-center py-10 md:py-0 text-white pr-4">
              {/* Main Headline */}
              <h1 className="text-2xl md:text-5xl lg:text-4xl font-extrabold leading-tight mb-4">
                <span className="text-white">Professional Auto Services</span> <br></br>
                <span className="text-yellow-400 block md:inline"> At Your Doorstep</span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl mb-10 font-light max-w-lg">
                No more waiting in garages. Book expert automotive services that come to you. Fair pricing, professional mechanics, convenient scheduling.
              </p>

              {/* Booking Form Card (Styled to match the dark look) */}
              <div className="w-full max-w-sm bg-gray-900 bg-opacity-30 p-6 rounded-lg shadow-2xl">
                <h3 className="text-lg font-semibold mb-4">Book Service Now</h3>

                {/* Location Input */}
                <div className="mb-4">
                  <label htmlFor="location" className="block text-sm font-medium mb-1">Your Location</label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    placeholder="Enter your address"
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 rounded bg-gray-700 bg-opacity-50 border border-gray-600 focus:ring-yellow-400 focus:border-yellow-400 outline-none placeholder-gray-400"
                  />
                  <button onClick={handleGPS}>Use GPS</button>
                </div>

                {/* Service Type Dropdown (A simple select for demonstration) */}
                <div className="mb-6">
                  <label htmlFor="service-type" className="block text-sm font-medium mb-1">Service Type</label>
                  <select
                    id="service-type"
                    className="w-full p-3 rounded bg-gray-700 bg-opacity-50 border border-gray-600 focus:ring-yellow-400 focus:border-yellow-400 outline-none appearance-none "
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="">Select a service</option>
                    {list.map(s => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* Check Availability Button */}
                <button className="w-full bg-blue-500 text-white px-4 py-3 rounded font-semibold shadow-lg hover:bg-blue-600 duration-200">
                  Check Availability
                </button>
              </div>
            </div>

            {/* RIGHT: Hero Image */}
            <div className="hidden md:flex items-center justify-center py-10 md:py-0 pl-4">
              <div className="relative w-full max-w-md h-96 bg-white rounded-lg overflow-hidden shadow-2xl">
                {/* Placeholder Image: Replace src with your actual image path */}
                <img
                  src={car} // Placeholder path
                  alt="Professional mechanic working near a window"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Small floating button (e.g., chat/help button) seen in the bottom right corner */}
      <button className="fixed bottom-4 right-4 w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 duration-200">
        D
      </button>

    </div>
  );
};

export default Home;