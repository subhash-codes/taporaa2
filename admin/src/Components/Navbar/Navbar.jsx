// src/components/Navbar/Navbar.jsx

import React from 'react';

// Note: Ensure 'assets' is imported and working correctly
import { assets } from '../../assets/assets';

const Navbar = () => {
    return (

        <nav className="bg-gray-900 text-white p-4 flex justify-around fixed top-0 left-0 w-full z-50 items-center h-17" mx-4>
            <div className="flex items-center ">
                <img className='h-13 cursor-pointer' src={assets.logo} alt="Admin Logo"
                /></div>

            <div className="flex-1 text-center">
                <h4 className="text-lg font-semibold  tracking-wider">ADMIN PANEL</h4>
            </div>
            <div className="flex items-center w-40 justify-end">
                <img className='w-12 h-12 rounded-full cursor-pointer object-cover border border-gray-300' src={assets.profile_image} alt="Admin Profile" />
            </div>

        </nav>
    );
};

export default Navbar;