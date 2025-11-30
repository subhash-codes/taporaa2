// admin/src/Pages/List/ListServices.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ListServices({ url }) {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/services/listservice`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Error fetching service list.");
            }
        } catch (error) {
            console.error("Fetch List Error:", error);
            toast.error("Could not connect to server to fetch services.");
        }
    };

    // Placeholder function for removal
    const removeService = async (serviceId) => {
        // Implementation will go here later, using your removeService endpoint
        console.log(`Attempting to remove service with ID: ${serviceId}`);
        // After successful deletion, call fetchList();
    };


    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='p-8 flex-1 max-w-full'>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">📋 Service List</h2>
            <div className="grid grid-cols-1 gap-4 overflow-x-auto">
                <div className='grid grid-cols-5 py-2 px-4 bg-gray-100 font-semibold text-gray-600 rounded-t-lg border-b'>
                    <p>Image</p>
                    <p>Name</p>
                    <p className='col-span-2'>Description</p>
                    <p>Action</p>
                </div>
                {list.map((item, index) => (
                    <div key={index} className='grid grid-cols-5 py-4 px-4 items-center border-b hover:bg-gray-50'>
                        {/* Placeholder for image: You need to set up static serving on your backend */}
                        {/* NOTE: If you haven't configured the Express static path for 'uploads', this won't show! */}
                        <img 
                            src={`${url}/images/${item.image}`} 
                            alt={item.name} 
                            className='w-12 h-12 object-cover rounded-md'
                        />
                        <p className='font-medium text-gray-800'>{item.name}</p>
                        <p className='text-sm text-gray-600 col-span-2 line-clamp-2'>{item.description}</p>
                        <p 
                            onClick={() => removeService(item._id)} 
                            className='text-red-600 cursor-pointer font-medium hover:text-red-800'
                        >
                            X
                        </p>
                    </div>
                ))}
            </div>
            {list.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No services found. Please add a new service.</p>
            )}
        </div>
    );
}

export default ListServices;