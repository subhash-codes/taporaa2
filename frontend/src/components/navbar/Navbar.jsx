import React, { useState } from 'react'
import logo from '../../assets/logo.png'   
import {Menu} from 'lucide-react';
import {X} from 'lucide-react';
const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between md:justify-around fixed top-0 left-0 w-full z-50 items-center">
      <div className="text-xl font-bold">
        <img src={logo} alt="Taporaa" className="h-10 w-auto" />  
      </div>
      <div className=" hidden md:flex gap-6 uppercase">
        {/* Desktop Menu Overlay */}
        <a href="#home" className="cursor-pointer">Home</a>
        <a href="#services" className="cursor-pointer">Services</a>
        <a href="#about" className="cursor-pointer">About</a>
        <a href="#testinomial" className="cursor-pointer">Testinomial</a>
        <a href="#contact" className="cursor-pointer">Contact Us</a>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed top-0 right-0 h-screen w-64 bg-gray-800 shadow-2xl p-8 transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
        md:hidden
      `}>
        <div className="flex flex-col gap-8 uppercase mt-10">
          <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#services" onClick={() => setIsOpen(false)}>Services</a>
          <a href="#about" onClick={() => setIsOpen(false)}>About</a>
          <a href="#testinomial" onClick={() => setIsOpen(false)}>Testinomial</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>Contact Us</a>
          <a href="#bookService" className="bg-white text-black px-4 py-2 rounded-md text-center">BOOK NOW</a>
        </div>
      </div>
      <div className="md:block hidden">
      <a href="#bookService" className="bg-white text-black px-4 py-2 rounded-md cursor-pointer duration-200 transform hover:scale-105 focus:outline-none">BOOK NOW</a>
      </div>
      {/* Toggle Icon */}
      <div className="md:hidden z-50 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </div>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  )
}

export default Navbar
