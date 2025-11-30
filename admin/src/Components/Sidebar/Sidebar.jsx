// src/components/Sidebar/Sidebar.jsx (Corrected for Dark Theme)

import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {

  const getIconStyle = (isActive) => {

    return {
      filter: 'brightness(0) invert(1)', // Forces icon to be white
    };
  };

  const getNavLinkClass = (isActive) => {
    return `flex items-center space-x-3 p-3 rounded-md transition-colors duration-150 
      ${isActive
        ? 'bg-blue-600 text-white font-semibold' // Active: Solid Blue background
        : 'hover:bg-gray-700 text-white' // Inactive: Darker gray hover, white text
      }`
  }

  return (

    <div className="w-48 min-h-screen bg-gray-900 border-r-2 fixed border-gray-700 p-4 pt-8">

      <div className="mb-8 flex flex-col items-center">
        <img className='h-8 mb-2' src={assets.logo} alt="Taporaa Logo" style={{ filter: 'brightness(0) invert(1)' }} />

      </div>

      <div className="flex flex-col space-y-2">

        {/* === Link Templates (using the refactored class helper) === */}
        {/* 1. Service Management */}
        <NavLink to='/dashboard' className={({ isActive }) => getNavLinkClass(isActive)}>
          {({ isActive }) => (
            <>
              <img className="w-5 h-5" src={assets.add_icon} alt="Add"
                style={getIconStyle(isActive)} />
              <p className="text-sm">Dashboard</p>
            </>
          )}
        </NavLink>

        {/* 1. Service Management */}
        <NavLink to='/services' className={({ isActive }) => getNavLinkClass(isActive)}>
          {({ isActive }) => (
            <>
              <img className="w-5 h-5" src={assets.add_icon} alt="Add"
                style={getIconStyle(isActive)} />
              <p className="text-sm">Service Management</p>
            </>
          )}
        </NavLink>

        {/* 2. Garage Management */}
        <NavLink to='/garages' className={({ isActive }) => getNavLinkClass(isActive)}>
          {({ isActive }) => (
            <>
              <img className="w-5 h-5" src={assets.order_icon} alt="List"
                style={getIconStyle(isActive)} />
              <p className="text-sm">Garage Locations</p>
            </>
          )}
        </NavLink>

        {/* 3. Orders */}
        <NavLink to='/orders' className={({ isActive }) => getNavLinkClass(isActive)}>
          {({ isActive }) => (
            <>
              <img className="w-5 h-5" src={assets.order_icon} alt="Orders"
                style={getIconStyle(isActive)}
              />
              <p className="text-sm">Customer Orders</p>
            </>
          )}
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;