

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

function AddServiceType({ url }) {

  const [data, setData] = useState({
    name: "",
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);

    try {
     const response = await axios.post(`${url}/api/servicetypes/addServiceType`, data);


      if (response.data.success) {
        setData({ name: "" });

        toast.success(response.data.message || "ServiceType added successfully!");
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
        ➕ Add New Service-Type
      </h2>

      <div className="max-h-[70vh] overflow-y-auto pr-2">
        <form className="flex flex-col gap-6" onSubmit={onSubmitHandler}>
          <div className="flex flex-col gap-2">
            <p className="text-gray-700 font-medium">Service Type Name *</p>
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Type Garage Name Here"
              required
              className="p-3 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition w-full"
          >
            ADD SERVICE TYPE
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddServiceType