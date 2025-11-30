// admin/src/Pages/ServiceManagement/ServiceManagement.jsx

import React from 'react';
import AddServices from '../Add/AddServices';
import ListServices from '../List/ListServices';

function ServiceManagement({ url }) {
    return (
        <div className="flex flex-col xl:flex-row gap-8  p-6 mx-30">

            {/* LEFT SECTION — Add Service */}
            <div className="">
                <div className="bg-white w-2xl  shadow-md rounded-xl p-4">
                    <AddServices url={url} />
                </div>
            </div>

            {/* RIGHT SECTION — List Services */}
            <div className=" ">
                <div className="bg-white  w-xl shadow-md rounded-xl p-4 min-h-[300px]">
                    <ListServices url={url} />
                </div>
            </div>

        </div>
    );
}

export default ServiceManagement;
