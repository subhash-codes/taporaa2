// admin/src/App.jsx (Corrected Layout)

import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ServiceManagement from './Pages/ServiceManagement/ServiceManagement'
import GarageManagement from './Pages/ServiceManagement/GarageManagement'
import ServiceTypeManagement from './Pages/ServiceManagement/ServiceTypeManagement'
import AddServices from './Pages/Add/AddServices';
const App = () => {
    const url = "http://localhost:4000"
    return (
        <div className='min-h-screen bg-gray-100 overflow-x-hidden overflow-y-hidden'> 
            <ToastContainer />
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>
            <div className='flex gap-2'> 
                <Sidebar />
                <div className='flex-1  p-15'>
                    <Routes>
                        {/* <Route path='/services' element={<ServiceManagement url={url} />} ></Route> */}
                        <Route path='/dashboard' element={<div>Dashboard</div>} ></Route>
                        <Route path='/garages' element={<GarageManagement url={url}/>} ></Route>
                        <Route path='/orders' element={<ServiceTypeManagement url={url}/>} ></Route>
                        <Route path='/services' element={<AddServices url={url}/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}
export default App