import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import Login from './Components/Loginpage/Login'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute' // Import your guard

import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GarageManagement from './Pages/ServiceManagement/GarageManagement'
import ServiceTypeManagement from './Pages/ServiceManagement/ServiceTypeManagement'
import AddServices from './Pages/Add/AddServices';
import ServiceManagement from './Pages/ServiceManagement/ServiceManagement'

const App = () => {
    const url = "http://localhost:4000";
    
    // 1. Initialize Token State from localStorage
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    // 2. Logout function to pass to Navbar
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
    };

    return (
        <div className='min-h-screen bg-gray-100'>
            <ToastContainer />
            <Routes>
                {/* PUBLIC ROUTE: Login Page - Pass setToken to update state on login */}
                <Route path='/' element={<Login url={url} setToken={setToken} />} />

                {/* PROTECTED ROUTES: Only accessible if token is present */}
                <Route 
                    path='/*' 
                    element={
                        <ProtectedRoute>
                            <div className="fixed top-0 left-0 w-full z-50">
                                {/* Pass logout function to Navbar */}
                                <Navbar logout={logout} />
                            </div>
                            <div className='flex pt-[70px]'> 
                                <Sidebar />
                                <div className='flex-1 p-8'>
                                    <Routes>
                                        {/* Default redirect for protected area */}
                                        <Route path='/' element={<Navigate to="/dashboard" />} />
                                        <Route path='/dashboard' element={<div>Dashboard Content</div>} />
                                        <Route path='/garages' element={<GarageManagement url={url}/>} />
                                        {/* <Route path='/orders' element={<ServiceTypeManagement url={url}/>} />
                                        <Route path='/services' element={<AddServices url={url}/>}/> */}
                                        <Route path='/orders' element={<ServiceTypeManagement url={url}/>} />
                                        <Route path='/services' element={<ServiceManagement url={url}/>}/>
                                    </Routes>
                                </div>
                            </div>
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </div>
    )
}

export default App