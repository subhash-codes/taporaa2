import React, { useState, useEffect } from "react";
// Added X icon for the close button
import { MapPin, Phone, Clock, Star, Search, Locate, X } from "lucide-react";

// --- Placeholder UI Components & Hooks for a Single-File Environment ---

/**
 * Custom hook to display temporary messages, replacing external toast libraries.
 */
const useToast = () => {
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState('success');

  const toast = {
    success: (msg) => {
      setMessage(msg);
      setVariant('success');
      setTimeout(() => setMessage(null), 3000);
    },
    error: (msg) => {
      setMessage(msg);
      setVariant('error');
      setTimeout(() => setMessage(null), 3000);
    },
  };
  
  const toastElement = message ? (
    <div className={`fixed bottom-6 right-6 p-4 rounded-xl shadow-2xl text-white z-50 transition-opacity duration-300 transform translate-y-0 ${
      variant === 'error' ? 'bg-red-600' : 'bg-green-600'
    }`}>
      {message}
    </div>
  ) : null;

  return { toast, toastElement };
};

/**
 * Placeholder for Button component using Tailwind CSS.
 */
const Button = ({ children, onClick, className = "", variant = "primary", disabled = false, ...props }) => {
  let baseClasses = "px-4 py-3 rounded-xl font-semibold transition duration-200 shadow-md flex items-center justify-center text-center text-sm sm:text-base";
  let variantClasses = "";

  switch (variant) {
    case "outline":
      variantClasses = "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300";
      break;
    case "secondary":
      variantClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300";
      break;
    default: // primary
      if (className.includes("bg-green")) {
        variantClasses = "bg-green-600 text-white hover:bg-green-700";
      } else if (className.includes("bg-blue")) {
        variantClasses = "bg-blue-600 text-white hover:bg-blue-700";
      } else {
        variantClasses = "bg-blue-600 text-white hover:bg-blue-700";
      }
      break;
  }
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button 
      onClick={!disabled ? onClick : null} 
      className={`${baseClasses} ${variantClasses} ${className} ${disabledClasses} focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-blue-300`} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Placeholder for Card component using Tailwind CSS.
 */
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

/**
 * Placeholder for CardContent.
 */
const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 sm:p-6 ${className}`}>
    {children}
  </div>
);

/**
 * Placeholder for Badge component using Tailwind CSS.
 */
const Badge = ({ children, className = "", variant = "default" }) => {
  let variantClasses = "";
  switch (variant) {
    case "outline":
      variantClasses = "border border-blue-200 text-blue-700 bg-white shadow-sm";
      break;
    case "secondary":
      variantClasses = "bg-blue-50 text-blue-600 font-bold tracking-wider";
      break;
    default:
      variantClasses = "bg-gray-200 text-gray-800";
  }
  
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};


const initialGarages = [
  {
    id: 1,
    name: "QuickFix Auto Service",
    address: "123 Main Street, Downtown",
    phone: "+1 (555) 123-4567",
    rating: 4.8,
    reviewCount: 127,
    distance: "0.8 miles",
    workingHours: "Mon-Fri: 8:00 AM - 6:00 PM",
    services: ["Oil Change", "Tire Repair", "Diagnostics", "Brake Service"],
    specialties: ["European Cars", "Hybrid Vehicles"],
    image: "https://images.unsplash.com/photo-1675034743126-0f250a5fee51?crop=entropy&cs=srgb&fm=jpg&q=85&w=600&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Elite Automotive Care",
    address: "456 Oak Avenue, Midtown",
    phone: "+1 (555) 987-6543",
    rating: 4.9,
    reviewCount: 203,
    distance: "1.2 miles",
    workingHours: "Mon-Sat: 7:30 AM - 7:00 PM",
    services: ["Full Service", "Engine Repair", "Transmission", "AC Service"],
    specialties: ["Luxury Cars", "Performance Tuning"],
    image: "https://images.unsplash.com/photo-1505545121909-2d48e22dede6?crop=entropy&cs=srgb&fm=jpg&q=85&w=600&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Local Tire & Brake Center",
    address: "789 Pine Road, Suburbia",
    phone: "+1 (555) 333-2211",
    rating: 4.5,
    reviewCount: 95,
    distance: "2.1 miles",
    workingHours: "Mon-Sat: 9:00 AM - 5:00 PM",
    services: ["Tire Change", "Alignment", "Brake Repair", "Suspension"],
    specialties: ["Trucks", "Heavy Duty"],
    image: "https://images.unsplash.com/photo-1590740624003-883907c08794?crop=entropy&cs=srgb&fm=jpg&q=85&w=600&h=400&fit=crop"
  }
];

const FindGarages = () => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLocation, setSearchLocation] = useState("Downtown");
  // NEW STATE: Tracks if a search has been initiated (to show/hide the results area)
  const [hasSearched, setHasSearched] = useState(false); 
  const { toast, toastElement } = useToast();

  // Initial load: Simulate an initial search if you want results to appear on page load
  useEffect(() => {
    // Uncomment the next two lines if you want initial results when the app starts
    // setGarages(initialGarages);
    // setHasSearched(true);
  }, []);

  /**
   * Performs the location search based on the current value in the input field.
   */
  const searchGarages = () => {
    // If the search location is the simulated GPS text, treat it as a success and show all results.
    if (!searchLocation) {
      toast.error("Please enter a location or use the GPS button.");
      return;
    }
    
    setLoading(true);
    // Set hasSearched to true every time a search is performed
    setHasSearched(true); 
    
    // Simulate API call delay and result filtering
    setTimeout(() => {
      let filteredGarages;

      if (searchLocation.includes("Current GPS Location")) {
        // If GPS was used (simulated), show all results to represent local garages
        filteredGarages = initialGarages;
        toast.success("Displaying results based on your current location.");
      } else {
        // Standard text search filter
        filteredGarages = initialGarages.filter(g => 
          g.address.toLowerCase().includes(searchLocation.toLowerCase()) || 
          g.name.toLowerCase().includes(searchLocation.toLowerCase())
        );

        if (filteredGarages.length > 0) {
          toast.success(`Found ${filteredGarages.length} garages near "${searchLocation}"`);
        } else {
          toast.error(`No garages found near "${searchLocation}". Try "Downtown" or "Midtown".`);
        }
      }
      
      setGarages(filteredGarages);
      setLoading(false);
    }, 800);
  };
  
  /**
   * Handles requesting GPS location from the browser and populating the search field.
   */
  const handleGpsSearch = () => {
    setLoading(true);
    setSearchLocation(""); // Clear location input while fetching
    setHasSearched(true); // Ensure results area will display after GPS fetch attempt

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log(`GPS Coordinates: Lat=${latitude}, Lon=${longitude}`);
                
                const displayLocation = "Current GPS Location (Simulated)"; 
                setSearchLocation(displayLocation); // Update the input box
                toast.success(`Location identified. Searching for nearby services.`);

                setTimeout(() => {
                    searchGarages(); 
                }, 100); 
            },
            (error) => {
                setLoading(false);
                setSearchLocation("Downtown"); // Revert to default or empty on failure
                setHasSearched(false); // Hide the area on error
                if (error.code === error.PERMISSION_DENIED) {
                    toast.error("Location permission denied. Please enable GPS access or enter your location manually.");
                } else {
                    toast.error("Could not retrieve location. Check your GPS settings.");
                }
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    } else {
        setLoading(false);
        setHasSearched(false);
        toast.error("Geolocation is not supported by your browser.");
    }
  };

  /**
   * Removes a single garage card from the displayed results list.
   */
  const removeGarage = (id, name) => {
    setGarages(prev => prev.filter(g => g.id !== id));
    toast.success(`Removed "${name}" from results.`);
  };

  /**
   * Clears all displayed garage results and hides the results area.
   * This is the function called by the "Close Results" button.
   */
  const clearGarages = () => {
    setGarages([]);
    // IMPORTANT: Set hasSearched to false to hide the entire results block (title + content)
    setHasSearched(false); 
    toast.success("Search results cleared.");
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 transition-colors ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="font-sans">
      {/* Toast message display */}
      {toastElement}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
            Find Nearby Auto Garages
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Discover trusted automotive service providers in your area
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-10 shadow-2xl">
          <CardContent className="flex flex-col md:flex-row gap-4 items-center">
            
            {/* Input + GPS Button Wrapper */}
            <div className="flex-1 flex gap-2 w-full"> 
                <div className="relative flex-1"> {/* Input field wrapper */}
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Enter city, zip code, or address..."
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') searchGarages();
                        }}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition duration-150 text-gray-800"
                        disabled={loading}
                    />
                </div>
                
                {/* Dedicated GPS Button */}
                <Button 
                    onClick={handleGpsSearch}
                    disabled={loading}
                    variant="secondary"
                    className="p-3 w-12 h-12 flex-shrink-0 !shadow-lg text-blue-600 bg-blue-100 hover:bg-blue-200"
                    title="Use Current Location (GPS)"
                >
                    <Locate className={loading ? "animate-pulse" : ""} />
                </Button>
            </div>
            
            {/* Main Search Button */}
            <Button 
              onClick={searchGarages}
              disabled={loading || !searchLocation}
              className="w-full md:w-auto min-w-[120px]"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Searching...
                </span>
              ) : "Search"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Area (Conditional on hasSearched) */}
        {hasSearched && (
            <>
                {/* Title and Close Button Section */}
                <div className="pb-8 relative"> 
                    <div className="flex justify-between items-center mb-6 border-b-2 border-blue-500 pb-2">
                        <h2 className="text-2xl font-bold text-white">
                            {garages.length} {garages.length === 1 ? 'Garage' : 'Garages'} Found
                        </h2>

                        {/* Global Close Button (Always shown if hasSearched is true, allowing user to dismiss the whole section) */}
                        <button
                            onClick={clearGarages}
                            className="p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition duration-150 flex items-center"
                            title="Clear all search results"
                        >
                            <X className="h-5 w-5 mr-1" />
                            <span className="hidden sm:inline text-sm font-medium cursor-pointer">Close Results</span>
                        </button>
                    </div>
                </div>

                {/* Content Section (Conditional based on results/loading) */}
                {garages.length === 0 && !loading ? (
                   <div className="text-center py-20 bg-white rounded-xl shadow-md">
                     <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                     <p className="text-xl text-gray-500">No results found. Please try a different location or keyword.</p>
                   </div>
                ) : (
                  <div className="grid gap-8">
                    {garages.map((garage) => (
                      <Card key={garage.id} className="shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-0.5 relative">
                        
                        {/* Individual Dismiss Button */}
                        <button
                            onClick={() => removeGarage(garage.id, garage.name)}
                            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition duration-150 z-10"
                            title="Dismiss garage from list"
                        >
                            {/* <X className="h-5 w-5" /> */}
                        </button>

                        <div className="lg:flex">
                          
                          {/* Image Section */}
                          <div className="lg:w-1/3 flex-shrink-0">
                            <img
                              src={garage.image}
                              alt={garage.name}
                              onError={(e) => { 
                                  e.target.onerror = null; 
                                  e.target.src = `https://placehold.co/600x400/1D4ED8/FFFFFF?text=Auto+Garage`;
                              }}
                              className="w-full h-64 lg:h-full object-cover rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl"
                            />
                          </div>
                          
                          {/* Content Section */}
                          <CardContent className="lg:w-2/3 flex flex-col justify-between">
                            <div>
                              {/* Title and Rating */}
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 border-b pb-3">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">{garage.name}</h3>
                                <Badge variant="secondary" className="px-4 py-2 text-sm">
                                    {garage.distance}
                                </Badge>
                              </div>

                              {/* Rating Details */}
                              <div className="flex items-center mb-4">
                                {renderStars(garage.rating)}
                                <span className="ml-2 text-lg font-bold text-gray-800">{garage.rating}</span>
                                <span className="ml-2 text-sm text-gray-500">({garage.reviewCount} reviews)</span>
                              </div>

                              {/* Contact Info */}
                              <div className="space-y-3 mb-6">
                                <div className="flex items-center text-gray-700 text-sm sm:text-base">
                                    <MapPin className="h-4 w-4 mr-3 text-blue-500 flex-shrink-0" />
                                    <span className="break-words">{garage.address}</span>
                                </div>
                                <div className="flex items-center text-gray-700 text-sm sm:text-base">
                                    <Phone className="h-4 w-4 mr-3 text-blue-500 flex-shrink-0" />
                                    <span>{garage.phone}</span>
                                </div>
                                <div className="flex items-center text-gray-700 text-sm sm:text-base">
                                    <Clock className="h-4 w-4 mr-3 text-blue-500 flex-shrink-0" />
                                    <span className="font-medium">{garage.workingHours}</span>
                                </div>
                              </div>

                              {/* Services */}
                              <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Services:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {garage.services.map((service, index) => (
                                    <Badge key={index} variant="outline" className="text-xs sm:text-sm">{service}</Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                              <Button className="flex-1 text-sm">Call Now</Button>
                              <Button variant="outline" className="flex-1 text-sm">View Details</Button>
                              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-sm">Book Service</Button>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
            </>
        )}
      </div>
    </div>
  );
};

export default FindGarages;


