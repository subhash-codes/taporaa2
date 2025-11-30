import React, { useState, useEffect } from 'react';

const Footer = ({ isHomePage = false }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // jb user home pe na rhe to ye button show krega
      if (!isHomePage && window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);


  return (
    <>
      <footer className="bg-gray-800 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="flex flex-col space-y-4">
              <h1 className="text-3xl font-extrabold text-white">Taporaa</h1>
              <p className="text-gray-400 max-w-sm">
                Service that comes to you! Download the App now.
              </p>
              <nav className="flex space-x-6 text-sm font-semibold">
                <a href="#home" className="hover:text-white transition-colors duration-200">Home</a>
                <a href="#services" className="hover:text-white transition-colors duration-200">Service</a>
                <a href="#about" className="hover:text-white transition-colors duration-200">About Us</a>
                <a href="#contact" className="hover:text-white transition-colors duration-200">Contact Us</a>
              </nav>
            </div>
            <div className="flex flex-col items-start lg:items-end space-y-4">
              <span className="text-white font-semibold mb-2">Get the app</span>
              <button className="bg-white text-gray-800 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.03 2.5a5.52 5.52 0 00-4.04 1.83c-.88-1.22-2.31-2.02-4.04-2.02-3.11 0-5.63 2.52-5.63 5.63 0 1.95 1 3.7 2.65 4.96L12 21.5l6.06-9.52C19.78 10.2 20.66 8.35 20.66 6.5C20.66 3.65 19.46 2.5 19.03 2.5z"/>
                </svg>
                <span>App Store</span>
              </button>
              <button className="bg-white text-gray-800 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-4h-2v4zm0-6h2V7h-2v4z"/>
                </svg>
                <span>Play Store</span>
              </button>
            </div>
          </div>
          <hr className="border-gray-700 my-8" />
          <p className="text-center text-sm text-gray-500">
            Copyright © 2024 Taporaa - All Rights Reserved.
          </p>
        </div>
      </footer>
      {showButton && (
        <a href='#home'
          
          className="fixed bottom-8 right-8 bg-gray-700 text-white p-3  h-[50px] w-[50px] rounded-full shadow-lg transition-opacity duration-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          aria-label="Go to home page"
        >
          <div className='text-2xl'>^</div>
        </a>
      )}
    </>
  );
};

export default Footer;
