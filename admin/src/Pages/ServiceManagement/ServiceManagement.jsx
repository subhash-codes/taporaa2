// admin/src/Pages/ServiceManagement/ServiceManagement.jsx (ADJUSTED for better flow)

import React from 'react';
import AddServices from '../Add/AddServices';
import ListServices from '../List/ListServices';

function ServiceManagement({ url }) {
    return (
 
        <div className='flex flex-col xl:flex-row gap-8 px-8 py-4 items-start w-full'>

            <div className='flex-shrink-0 w-full xl:w-1/3'>
                <AddServices url={url} />
            </div>

            <div className='flex-1 w-full xl:w-2/3'>
                <ListServices url={url} />
            </div>
        </div>
    );
}

export default ServiceManagement;