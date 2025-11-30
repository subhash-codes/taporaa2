import React from 'react'
import logo from '../../assets/logo.png'   
const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-around fixed top-0 left-0 w-full z-50 items-center">
      <div className="text-xl font-bold">
        <img src={logo} alt="Taporaa" className="h-10 w-auto" />  
      </div>
      <div className="flex gap-6 uppercase">
        <a href="#home" className="cursor-pointer">Home</a>
        <a href="#services" className="cursor-pointer">Services</a>
        <a href="#about" className="cursor-pointer">About</a>
        <a href="#testinomial" className="cursor-pointer">Testinomial</a>
        <a href="#contact" className="cursor-pointer">Contact Us</a>
      </div>
      <a href="#bookService" className="bg-white text-black px-4 py-2 rounded-md cursor-pointer duration-200 transform hover:scale-105 focus:outline-none">BOOK NOW</a>
    </nav>
  )
}

export default Navbar
