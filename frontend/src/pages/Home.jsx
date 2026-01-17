import car from "../assets/c1.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { MapPinPlus } from "lucide-react";


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

    <div className="relative w-full md:h-screen overflow-hidden bg-[#093570]">

      {/* -------------HERO SECTION---------------- */}
      <div className="flex justify-center md:mt-20 mt-20">
        <div className=" w-[90%] md:w-[70%] ">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* LEFT: Text Content and Form */}
            <div className="flex flex-col justify-center text-white pr-4 p-4">
              {/* Main Headline */}
              <h1 className="text-2xl md:text-5xl lg:text-4xl font-extrabold leading-tight mb-4">
                <span className="text-white ">Professional Auto Services</span> <br></br>
                <span className="text-yellow-400 block md:inline"> At Your Doorstep</span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl mb-10 font-light max-w-lg">
                No more waiting in garages. Book expert automotive services that come to you. Fair pricing, professional mechanics, convenient scheduling.
              </p>

              {/* Booking Form Card (Styled to match the dark look) */}
              <div className="w-full max-w-sm bg-gray-900 bg-opacity-40 p-6 rounded-lg shadow-2xl backdrop-blur-sm border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-white">Book Service Now</h3>

                {/* Location Input */}
                <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium mb-1 text-white">
                  Your Location
                </label>
                <div className="relative flex items-center bg-gray-700 rounded pr-2">

                  <input
                    id="location"
                    type="text"
                    value={location}
                    placeholder="Enter your address"
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 rounded pr-12 bg-opacity-50 border border-none  outline-none placeholder-gray-400 "
                  />
                  <button onClick={handleGPS} className="cursor-pointer"><MapPinPlus /></button>
                </div>
                </div>


                {/* Service Type Dropdown */}
                <div className="mb-6">
                  <label htmlFor="service-type" className="block text-sm font-medium mb-1 text-white">Service Type</label>
                  <div className="relative">
                  <select
                    id="service-type"
                    className="w-full p-3 rounded bg-gray-700 bg-opacity-50 border border-gray-600 text-white outline-none appearance-none "
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="" className="bg-gray-800 text-white">Select a service</option>
                    {list.map(s => (
                      <option key={s._id} value={s._id} className="bg-gray-800 text-white">{s.name}</option>
                    ))}
                  </select>
                </div>
                </div>

                {/* Check Availability Button */}
                <button className="w-full bg-blue-500 text-white px-4 py-3 rounded font-semibold shadow-lg hover:bg-blue-600 duration-200">
                  Check Availability
                </button>
              </div>
            </div>

            {/* RIGHT: Hero Image */}
            <div className="hidden md:flex items-center justify-center py-10 md:py-0  h-full">
              <div className="relative w-full  h-full  bg-white rounded-lg overflow-hidden shadow-2xl">
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


    </div>
  );
};

export default Home;