// admin/src/App.jsx (Corrected Layout)

import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import AddServices from './Pages/Add/AddServices'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ServiceManagement from './Pages/ServiceManagement/ServiceManagement'

const App = () => {
    const url = "http://localhost:4000"
    return (
        <div className='min-h-screen bg-gray-100'> 
            <ToastContainer />
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>
            <div className='flex gap-2'> 
                <Sidebar />
                <div className='flex-1  p-15'>
                    <Routes>
                        <Route path='/services' element={<ServiceManagement url={url} />} ></Route>
                        <Route path='/dashboard' element={<div>Dashboard</div>} ></Route>
                        <Route path='/garages' element={<div>Garages</div>} ></Route>
                        <Route path='/orders' element={<div>Orders</div>} ></Route>
                    </Routes>
                </div>
            </div>
        </div>
    )
}
export default App