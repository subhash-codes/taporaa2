import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

function AddGarages({ url }) {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        address: ""
    });

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error("Please upload a garage image.");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("address", data.address);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/garages/addgarage`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.data.success) {
                setData({ name: "", description: "", address: "" });
                setImage(null);
                toast.success(response.data.message || "Garage added successfully!");
            } else {
                toast.error(response.data.message || "Failed to add garage.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error while adding garage.");
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg h-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                ➕ Add New Garage
            </h2>

            <div className="max-h-[70vh] overflow-y-auto pr-2">
                <form className="flex flex-col gap-6" onSubmit={onSubmitHandler}>
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-700 font-medium">Garage Image *</p>
                        <label htmlFor="image" className="cursor-pointer">
                            <img
                                src={image ? URL.createObjectURL(image) : assets.upload_area}
                                alt="Upload"
                                className="w-24 h-24 object-cover border border-gray-300 rounded-md"
                            />
                        </label>
                        <input
                            type="file"
                            id="image"
                            hidden
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-gray-700 font-medium">Garage Name *</p>
                        <input
                            name="name"
                            value={data.name}
                            onChange={onChangeHandler}
                            placeholder="Type Garage Name Here"
                            required
                            className="p-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-gray-700 font-medium">Garage Description *</p>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={onChangeHandler}
                            placeholder="Write a detailed description..."
                            required
                            className="p-3 border border-gray-300 rounded-md resize-none h-28"
                        ></textarea>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-gray-700 font-medium">Garage Address *</p>
                        <input
                            name="address"
                            value={data.address}
                            onChange={onChangeHandler}
                            placeholder="Enter full garage address"
                            required
                            className="p-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition w-full"
                    >
                        ADD GARAGE
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddGarages;
