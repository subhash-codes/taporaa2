import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

function AddServices({ url }) {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
    });

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!image) {
            toast.error("Please upload a service image.");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("image", image);

        const response = await axios.post(`${url}/api/services/addservice`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (response.data.success) {
            setData({ name: "", description: "" });
            setImage(false);
            toast.success(response.data.message || "Service added successfully!");
        } else {
            toast.error(response.data.message || "Failed to add service.");
        }
    };

    return (
        <div className="p-6 bg-gray-900 rounded-xl fixed w-[40vw] shadow-lg h-full">

            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                ➕ Add New Service
            </h2>

            {/* FIXED HEIGHT WRAPPER — Only content scrolls */}
            <div className="max-h-[70vh]  pr-2">

                <form className="flex flex-col gap-6 " onSubmit={onSubmitHandler}>

                    <div className="flex flex-col gap-2">
                        <p className="text-gray-700 font-medium">Service Image *</p>
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
                        <p className="text-gray-700 font-medium">Service Name *</p>
                        <input
                            name="name"
                            value={data.name}
                            onChange={onChangeHandler}
                            placeholder="Type Service Name Here"
                            required
                            className="p-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-gray-700 font-medium">Service Description *</p>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={onChangeHandler}
                            placeholder="Write a detailed description..."
                            required
                            className="p-3 border border-gray-300 rounded-md resize-none h-28"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition w-full"
                    >
                        ADD SERVICE
                    </button>
                </form>

            </div>
        </div>
    );
}

export default AddServices;
