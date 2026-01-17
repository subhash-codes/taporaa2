// admin/src/Pages/ServiceManagement/ServiceManagement.jsx

import React from 'react';
import AddServices from '../Add/AddServices';
import ListServices from '../List/ListServices';

function ServiceManagement({ url }) {
    return (
       <div className=' h-[80vh] flex justify-between gap-4'>
        <div className="w-1/2 ">
          <AddServices url={url} />
        </div>
        <div className="w-1/2">
          <ListServices url={url} />
        </div>
       </div>
    );
}

export default ServiceManagement;
