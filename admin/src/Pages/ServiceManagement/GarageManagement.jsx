import AddGarages from '../Add/AddGarages';
import ListGarages from '../List/ListGarages';

function GarageManagement({ url }) {
    return (
         <div className=' h-[80vh] flex justify-between gap-4'>
        <div className="w-1/2 ">
            <AddGarages url={url} />
        </div>
        <div className="w-1/2">
            <ListGarages url={url} />
        </div>
       </div>
    );
}

export default GarageManagement;
