// admin/src/Pages/ServiceManagement/ServiceManagement.jsx

import React from 'react';
import AddServiceType from '../Add/AddServiceType';
import ListServiceType from '../List/ListServiceType';

function GarageManagement({ url }) {
    return (
        <div className="flex flex-col xl:flex-row gap-8  p-6 mx-30">

            {/* LEFT SECTION — Add Service */}
            <div className="">
                <div className="bg-white w-xl  shadow-md rounded-xl p-4">
                    <AddServiceType url={url} />
                </div>
            </div>

            {/* RIGHT SECTION — List Services */}
            <div className=" mx-10">
                <div className="bg-white border shadow-md rounded-xl p-4 min-h-[300px]">
                    <ListServiceType url={url} />
                </div>
            </div>

        </div>
    );
}

export default GarageManagement;
