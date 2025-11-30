import React, { useState, useEffect } from 'react';

// --- Icon Stubs (Replaced Lucide Imports) ---
// Using simple inline SVGs to match the original style
const Icon = ({ children, className = "h-5 w-5" }) => (
  <div className={`inline-flex items-center justify-center ${className}`}>{children}</div>
);

const User = (props) => <Icon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></Icon>;
const Car = (props) => <Icon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-car"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.6-.4-1-1-1h-1V9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v3H6c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg></Icon>;
const Calendar = (props) => <Icon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg></Icon>;
const FileText = (props) => <Icon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><line x1="16" x2="8" y1="15" y2="15"/><line x1="16" x2="8" y1="11" y2="11"/></svg></Icon>;
const CheckCircle = (props) => <Icon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M9 11l3 3L22 4"/></svg></Icon>;
// Remaining icons are not directly used in the final render, but defined for completeness: Clock, MapPin, Phone

// --- Shadcn/UI Component Replacements ---

const Button = ({ children, onClick, disabled, variant = "default", className = "w-24" }) => {
  const baseStyle = "px-4 py-2 font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md";
  let variantStyle = "";

  if (variant === "default") {
    variantStyle = "bg-blue-600 text-white hover:bg-blue-700";
  } else if (variant === "outline") {
    variantStyle = "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyle} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-2xl overflow-hidden ${className}`}>
    {children}
  </div>
);
const CardHeader = ({ children }) => <div className="p-6 border-b border-gray-100">{children}</div>;
const CardContent = ({ children, className = "" }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = "" }) => (
  <h2 className={`text-xl font-bold text-gray-900 ${className}`}>{children}</h2>
);

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
    {children}
  </label>
);

const Input = (props) => (
  <input
    {...props}
    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
  />
);

// Simplified Select Component
const Select = ({ value, onValueChange, children }) => {
  const SelectTrigger = ({ placeholder }) => (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer transition duration-150"
    >
      <option value="" disabled hidden>{placeholder}</option>
      {children}
    </select>
  );
  return { SelectTrigger };
};

const SelectContent = ({ children }) => {
  // SelectContent is handled internally by the native <select> element using its options.
  // We return the options directly.
  return children;
};

const SelectItem = ({ value, children }) => (
  <option key={value} value={value}>{children}</option>
);

// --- Local Message/Toast Handling Replacement ---
const LocalToast = ({ message, type, setMessage }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000); // Hide after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [message, setMessage]);

    if (!message) return null;

    const baseStyle = "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white font-medium";
    const typeStyle = type === 'error'
        ? 'bg-red-500'
        : 'bg-green-500';

    return (
        <div className={`${baseStyle} ${typeStyle}`}>
            {message}
        </div>
    );
};

// --- Main Application Component ---
const BookService = () => {
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('success');

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
  };

  const [bookingData, setBookingData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    
    // Vehicle Information
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleMileage: "",
    
    // Service Information
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    garage: "",
    
    // Issue Details
    issueDescription: "",
    urgency: "",
    
    // Location
    location: ""
  });

  const serviceTypes = [
    "Oil Change & Maintenance",
    "Tire Services",
    "Engine Diagnostics",
    "General Car Repair",
    "Brake Service",
    "Battery Replacement",
    "AC Service",
    "Transmission Service",
    "Other"
  ];

  const timeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
    "4:00 PM", "5:00 PM", "6:00 PM"
  ];

  const urgencyLevels = [
    { value: "low", label: "Low - Can wait a few days" },
    { value: "medium", label: "Medium - Within this week" },
    { value: "high", label: "High - As soon as possible" },
    { value: "emergency", label: "Emergency - Immediate attention" }
  ];

  const sampleGarages = [
    "QuickFix Auto Service - Downtown",
    "Elite Automotive Care - Midtown",
    "Budget Auto Solutions - Northside",
    "Professional Auto Works - Southside"
  ];

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        if (!bookingData.firstName || !bookingData.lastName || !bookingData.phone) {
          showMessage("Please fill in all required personal information fields (*).", "error");
          return false;
        }
        break;
      case 2:
        if (!bookingData.vehicleMake || !bookingData.vehicleModel || !bookingData.vehicleYear) {
          showMessage("Please fill in all required vehicle information fields (*).", "error");
          return false;
        }
        break;
      case 3:
        if (!bookingData.serviceType || !bookingData.preferredDate || !bookingData.preferredTime || !bookingData.garage) {
          showMessage("Please fill in all required service information fields (*).", "error");
          return false;
        }
        break;
      case 4:
        if (!bookingData.issueDescription || !bookingData.urgency) {
          showMessage("Please provide an issue description and select an urgency level (*).", "error");
          return false;
        }
        break;
      default:
        return true;
    }
    setMessage(null); // Clear message on successful validation
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0); // Scroll to top on step change
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0); // Scroll to top on step change
  };

  const submitBooking = async () => {
    if (!validateStep(4)) return;

    // --- START: Simulated API call (Frontend Only) ---
    try {
      // Log data instead of sending to backend
      console.log("Simulating Booking Submission. Data:", bookingData);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showMessage("Booking submitted successfully! We'll contact you soon.", "success");
      setStep(5); // Success step
    } catch (error) {
      showMessage("Failed to submit booking. Please try again.", "error");
      console.error("Booking simulation error:", error);
    }
    // --- END: Simulated API call ---
  };

  const renderStep = () => {
    const { SelectTrigger } = Select({
      value: bookingData.serviceType,
      onValueChange: (value) => handleInputChange("serviceType", value),
      children: (
        <SelectContent>
          {serviceTypes.map((service) => (
            <SelectItem key={service} value={service}>
              {service}
            </SelectItem>
          ))}
        </SelectContent>
      )
    });

    const GarageSelect = Select({
      value: bookingData.garage,
      onValueChange: (value) => handleInputChange("garage", value),
      children: (
        <SelectContent>
          {sampleGarages.map((garage) => (
            <SelectItem key={garage} value={garage}>
              {garage}
            </SelectItem>
          ))}
        </SelectContent>
      )
    });

    const TimeSelect = Select({
      value: bookingData.preferredTime,
      onValueChange: (value) => handleInputChange("preferredTime", value),
      children: (
        <SelectContent>
          {timeSlots.map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      )
    });

    const UrgencySelect = Select({
      value: bookingData.urgency,
      onValueChange: (value) => handleInputChange("urgency", value),
      children: (
        <SelectContent>
          {urgencyLevels.map((level) => (
            <SelectItem key={level.value} value={level.value}>
              {level.label}
            </SelectItem>
          ))}
        </SelectContent>
      )
    });
    
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={bookingData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={bookingData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 1234567890"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location (City/Zip Code)</Label>
                <Input
                  id="location"
                  value={bookingData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Enter your city or zip code"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="mr-2 h-5 w-5" />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="vehicleMake">Make *</Label>
                  <Input
                    id="vehicleMake"
                    value={bookingData.vehicleMake}
                    onChange={(e) => handleInputChange("vehicleMake", e.target.value)}
                    placeholder="e.g., Toyota"
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleModel">Model *</Label>
                  <Input
                    id="vehicleModel"
                    value={bookingData.vehicleModel}
                    onChange={(e) => handleInputChange("vehicleModel", e.target.value)}
                    placeholder="e.g., Camry"
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleYear">Year *</Label>
                  <Input
                    id="vehicleYear"
                    type="number"
                    value={bookingData.vehicleYear}
                    onChange={(e) => handleInputChange("vehicleYear", e.target.value)}
                    placeholder="e.g., 2020"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="vehicleMileage">Current Mileage (Miles)</Label>
                <Input
                  id="vehicleMileage"
                  type="number"
                  value={bookingData.vehicleMileage}
                  onChange={(e) => handleInputChange("vehicleMileage", e.target.value)}
                  placeholder="e.g., 45000"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Service & Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="serviceType">Service Type *</Label>
                <SelectTrigger placeholder="Select service type" />
              </div>

              <div>
                <Label htmlFor="garage">Preferred Garage *</Label>
                <GarageSelect.SelectTrigger placeholder="Select garage" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferredDate">Preferred Date *</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={bookingData.preferredDate}
                    onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="preferredTime">Preferred Time *</Label>
                  <TimeSelect.SelectTrigger placeholder="Select time" />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Issue Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="urgency">Urgency Level *</Label>
                <UrgencySelect.SelectTrigger placeholder="Select urgency level" />
              </div>

              <div>
                <Label htmlFor="issueDescription">Issue Description *</Label>
                <Textarea
                  id="issueDescription"
                  value={bookingData.issueDescription}
                  onChange={(e) => handleInputChange("issueDescription", e.target.value)}
                  placeholder="Please describe the issue with your vehicle in detail. Include any symptoms, sounds, or problems you've noticed."
                  rows={5}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                <h4 className="font-semibold text-blue-800 mb-2">Booking Summary</h4>
                <div className="space-y-1 text-sm text-blue-700">
                  <p><strong>Service:</strong> {bookingData.serviceType || 'Not selected'}</p>
                  <p><strong>Vehicle:</strong> {bookingData.vehicleYear} {bookingData.vehicleMake} {bookingData.vehicleModel}</p>
                  <p><strong>Date & Time:</strong> {bookingData.preferredDate} at {bookingData.preferredTime}</p>
                  <p><strong>Garage:</strong> {bookingData.garage || 'Not selected'}</p>
                  <p><strong>Urgency:</strong> {urgencyLevels.find(l => l.value === bookingData.urgency)?.label || 'Not selected'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card className="text-center py-8">
            <CardContent>
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4"/>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Booking Confirmed!</h2>
              <p className="text-lg text-gray-600 mb-8">
                Your service request has been submitted successfully. The garage will contact you shortly to finalize your appointment details.
              </p>
              <div className="bg-gray-100 p-6 rounded-xl mb-8 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">Booking Details</h4>
                <div className="text-base text-gray-700 space-y-2 text-left w-64 mx-auto">
                  <p><strong>Reference:</strong> #BK{Date.now().toString().slice(-6)}</p>
                  <p><strong>Service:</strong> {bookingData.serviceType}</p>
                  <p><strong>Date:</strong> {bookingData.preferredDate}</p>
                  <p><strong>Time:</strong> {bookingData.preferredTime}</p>
                  <p><strong>Garage:</strong> {bookingData.garage}</p>
                </div>
              </div>
              <Button onClick={() => setStep(1)} className="w-full md:w-64" variant="default">
                Make Another Booking
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className=" font-sans">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-2">Schedule Your Auto Service</h1>
          <p className="text-xl text-gray-600">
            A simple, four-step process to get your vehicle booked for service.
          </p>
        </div>

        {/* Progress Indicator */}
        {step < 5 && (
          <div className="mb-10">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300
                      ${step >= stepNumber 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-600 border-2 border-gray-300'
                      }
                    `}>
                      {stepNumber}
                    </div>
                    <span className={`mt-2 text-sm font-medium hidden sm:block ${step >= stepNumber ? 'text-blue-700' : 'text-gray-500'}`}>
                      {
                        stepNumber === 1 ? "Personal Info" :
                        stepNumber === 2 ? "Vehicle Details" :
                        stepNumber === 3 ? "Service Time" :
                        "Issue Details"
                      }
                    </span>
                  </div>
                  {stepNumber < 4 && (
                    <div className={`
                      flex-auto h-1 mx-2 transition-colors duration-300
                      ${step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'}
                    `} />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <div className="text-md font-semibold text-gray-700 p-2 px-4 bg-white rounded-full shadow-inner border border-gray-100">
                Step {step} of 4
              </div>
            </div>
          </div>
        )}

        {/* Local Toast/Message Component */}
        <LocalToast message={message} type={messageType} setMessage={setMessage} />

        {/* Step Content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        {step < 5 && (
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              className="w-28 md:w-32"
            >
              Back
            </Button>
            
            {step < 4 ? (
              <Button onClick={nextStep} className="w-28 md:w-32">
                Next
              </Button>
            ) : (
              <Button onClick={submitBooking} className="w-36 md:w-48 bg-green-600 hover:bg-green-700">
                Confirm & Submit
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookService;
