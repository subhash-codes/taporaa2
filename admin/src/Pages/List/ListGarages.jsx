import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SquarePen } from "lucide-react";

function ListGarages({ url }) {
    const [list, setList] = useState([]);
    const [editingGarage, setEditingGarage] = useState(null);
    const [editData, setEditData] = useState({
        name: "",
        description: "",
        address: "",
        image: null
    });

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/garages/listgarage`);
            if (response.data.success) setList(response.data.data);
            else toast.error("Error fetching garage list.");
        } catch (error) {
            console.error(error);
            toast.error("Server error while fetching garages.");
        }
    };

    const removeGarage = async (garageId) => {
        try {
            const response = await axios.post(`${url}/api/garages/removegarage/${garageId}`);
            if (response.data.success) {
                toast.success("Garage removed");
                fetchList();
            } else toast.error("Could not remove garage");
        } catch (error) {
            console.error(error);
            toast.error("Server error while removing garage");
        }
    };

    const handleEditClick = (garage) => {
        setEditingGarage(garage);
        setEditData({
            name: garage.name,
            description: garage.description,
            address: garage.address,
            image: null
        });
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("id", editingGarage._id);
        formData.append("name", editData.name);
        formData.append("description", editData.description);
        formData.append("address", editData.address);
        if (editData.image) formData.append("image", editData.image);

        try {
            const response = await axios.post(
                `${url}/api/garages/updategarage`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            if (response.data.success) {
                toast.success("Garage updated successfully");
                setEditingGarage(null);
                fetchList();
            } else toast.error("Update failed");
        } catch (error) {
            console.error(error);
            toast.error("Server error while updating garage");
        }
    };

    useEffect(() => { fetchList(); }, []);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md h-full">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">📋 Garage List</h2>

            <div className="grid grid-cols-1 gap-4 overflow-x-auto">
                <div className='grid gap-2 grid-cols-8 py-2 px-4 bg-gray-100 font-semibold text-gray-600 rounded-t-lg border-b'>
                    <p>Image</p>
                    <p>Name</p>
                    <p className='col-span-2'>Description</p>
                    <p className='ml-2'>Address</p>
                    <p className='ml-7'>Edit</p>
                    <p className='ml-7'>Delete</p>
                </div>

                {list.map((item, index) => (
                    <div key={index} className='grid grid-cols-8 py-4 px-4 items-center border-b hover:bg-gray-50'>
                        <img
                            src={`${url}/images/${item.image}`}
                            alt={item.name}
                            className='w-12 h-12 object-cover rounded-md'
                        />
                        <p className='font-medium text-gray-800'>{item.name}</p>
                        <p className='text-sm text-gray-600 col-span-2 line-clamp-2'>{item.description}</p>
                        <p className='text-sm text-gray-600 ml-4'>{item.address}</p>

                        <button
                            onClick={() => handleEditClick(item)}
                            className='text-green-600 font-medium hover:text-green-800 cursor-pointer ml-8'
                        >
                            <SquarePen />
                        </button>

                        <p
                            onClick={() => removeGarage(item._id)}
                            className='text-red-600 cursor-pointer font-medium hover:text-red-800 ml-12'
                        >
                            X
                        </p>
                    </div>
                ))}
            </div>

            {list.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No garages found. Please add a new garage.</p>
            )}

            {/* EDIT MODAL */}
            {editingGarage && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Edit Garage</h2>

                        <label className="block mb-2">Name:</label>
                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="w-full p-2 border rounded mb-3"
                        />

                        <label className="block mb-2">Description:</label>
                        <textarea
                            value={editData.description}
                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                            className="w-full p-2 border rounded mb-3"
                        />

                        <label className="block mb-2">Address:</label>
                        <input
                            type="text"
                            value={editData.address}
                            onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                            className="w-full p-2 border rounded mb-3"
                        />

                        <label className="block mb-2">Image (Optional):</label>
                        <input
                            type="file"
                            onChange={(e) => setEditData({ ...editData, image: e.target.files[0] })}
                            className="mb-3"
                        />

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setEditingGarage(null)}
                                className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListGarages;
