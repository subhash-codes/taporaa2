import React, { useState, useEffect } from 'react';
import { ChevronUp } from "lucide-react";
import { Apple } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import logo from '../../assets/logo.png'

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
      <footer className="bg-gray-800 text-gray-300 py-12 pt-6 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="flex flex-col space-y-4">
              <h1 className="text-2xl  font-extrabold text-white"><img src={logo} alt="Taporaa" className="h-10 w-auto" /> </h1>
              <p className="text-gray-400 max-w-sm">
                Service that comes to you! Download the App now.
              </p>
              <nav className="lg:ml-0 ml-10 flex space-x-6 text-sm font-semibold">
                <a href="#home" className="hover:text-white transition-colors duration-200">Home</a>
                <a href="#services" className="hover:text-white transition-colors duration-200">Service</a>
                <a href="#about" className="hover:text-white transition-colors duration-200">About Us</a>
                <a href="#contact" className="hover:text-white transition-colors duration-200">Contact Us</a>
              </nav>
            </div>
            <div className=" ml-6 space-y-4">
              <div className='flex flex-col justify-center  gap-2'>
              <span className="text-white text-center font-semibold mb-2">Get the app</span>
              <div className=' flex gap-4 lg:flex-col'>
              <button className="bg-white text-gray-800 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2">
                <Apple />
                <span>App Store</span>
              </button>
              <button className="bg-white text-gray-800 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2">
                <ShoppingCart />
                <span>Play Store</span>
              </button>
              </div>
            </div>
            </div>
          </div>
          <hr className="border-gray-700 my-8" />
          <p className="text-center text-sm text-gray-500">
            Copyright © 2024 Taporaa - All Rights Reserved.
          </p>
        </div>
      </footer>
      {showButton && (
      <div className='fixed bottom-8 right-8 bg-blue-500 rounded-full  shadow-lg hover:bg-blue-600 transition-colors duration-200 text-white p-3 h-[50px] w-[50px] flex items-center justify-center cursor-pointer '>
        <a href='#home'

          className=" transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          aria-label="Go to home page"
        >

          
            <ChevronUp className='border-none'/>
          

        </a>
        </div>
      )}
    </>
  );
};

export default Footer;
