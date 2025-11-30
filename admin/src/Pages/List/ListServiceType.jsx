
import { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

function ListServiceType({ url }) {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/servicetypes/listServiceType`);
            if (response.data.success) setList(response.data.data);
            else toast.error("Error fetching serviceType list.");
        } catch (error) {
            console.error(error);
            toast.error("Server error while fetching garages.");
        }
    };

    const removeServiceType = async (serviceTypeId) => {
        try {
            const response = await axios.post(`${url}/api/servicetypes/removeServiceType/${serviceTypeId}`);
            if (response.data.success) {
                toast.success("ServiceType removed");
                fetchList();
            } else toast.error("Could not remove ServiceType");
        } catch (error) {
            console.error(error);
            toast.error("Server error while removing ServiceType");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='p-8 flex-1 w-lg'>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">📋 Service-Type List</h2>
            <div className="grid grid-cols-1 gap-4 overflow-x-auto">
                <div className='grid grid-cols-2 py-2 px-4 bg-gray-100 font-semibold text-gray-600 rounded-t-lg border-b'>

                    <p>Name</p>
                    <p>Delete</p>
                </div>

                {list.map((item, index) => (
                    <div key={index} className='grid grid-cols-2 py-4 px-4 items-center border-b hover:bg-gray-50'>
                        <p className='font-medium text-gray-800'>{item.name}</p>
                        <p
                            onClick={() => removeServiceType(item._id)}
                            className='text-red-600 cursor-pointer font-medium hover:text-red-800'
                        >
                            X
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListServiceType