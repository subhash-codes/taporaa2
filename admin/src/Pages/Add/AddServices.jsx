// admin/src/Pages/Add/AddServices.jsx

import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

function AddServices({ url }) {
    
    // State to hold the image file (for file upload)
    const [image, setImage] = useState(false);
    
    // State to hold service data
    const [data, setData] = useState({
        name: "",
        description: "",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        // Ensure an image is selected
        if (!image) {
            toast.error("Please upload a service image.");
            return;
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('image', image);
        
        // Note: The API endpoint is `/api/services/addservice` based on your code
        const response = await axios.post(`${url}/api/services/addservice`, formData, {
             // Necessary for sending file data
             headers: {
                 'Content-Type': 'multipart/form-data' 
             }
        }); 

        if (response.data.success) {
            setData({
                name: "",
                description: "",
            });
            setImage(false);
            toast.success(response.data.message || "Service added successfully!");
        } else {
            toast.error(response.data.message || "Failed to add service.");
        }
    }

    // --- Component JSX (Rendering logic MUST be here) ---
    return (
        <div className='p-8 flex-1 max-w-4xl mx-auto '>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">➕ Add New Service</h2>
            
            <form className='flex flex-col gap-6 p-8 bg-white rounded-xl shadow-lg' onSubmit={onSubmitHandler}>
                
                {/* Image Upload Area */}
                <div className="flex flex-col gap-2">
                    <p className='text-gray-700 font-medium'>Service Image *</p>
                    <label htmlFor="image" className="cursor-pointer">
                        {/* Display the selected image preview or the upload area icon */}
                        <img 
                            src={image ? URL.createObjectURL(image) : assets.upload_area} 
                            alt="Upload Area" 
                            className="w-40 h-40 object-cover border-2 border-gray-300 rounded-lg transition-shadow hover:shadow-md"
                        
                        />
                    </label>
                    <input 
                        onChange={(e) => { setImage(e.target.files[0]) }} 
                        type="file" 
                        id='image' 
                        hidden 
                        required 
                        accept="image/*"
                    />
                </div>

                {/* Service Name Input */}
                <div className="flex flex-col gap-2">
                    <p className='text-gray-700 font-medium'>Service Name *</p>
                    <input 
                        onChange={onChangeHandler} 
                        value={data.name} 
                        type="text" 
                        name='name' 
                        placeholder='Type Service Name Here' 
                        required
                        className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Service Description Textarea */}
                <div className="flex flex-col gap-2">
                    <p className='text-gray-700 font-medium'>Service Description *</p>
                    <textarea 
                        onChange={onChangeHandler} 
                        value={data.description} 
                        name="description" 
                      
                        placeholder='Write a detailed description of the service...' 
                        required
                        className="p-3 border border-gray-300 rounded-md resize-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
                
                {/* Submit Button */}
                <button 
                    type='submit' 
                    className='mt-4 bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 shadow-lg w-full md:w-1/3 cursor-pointer'
                >
                    ADD SERVICE
                </button>
            </form>
        </div>
    );
}

export default AddServices;