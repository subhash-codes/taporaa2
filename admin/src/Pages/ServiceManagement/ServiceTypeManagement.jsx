import AddServiceType from '../Add/AddServiceType';
import ListServiceType from '../List/ListServiceType';

function ServiceTypeManagement({ url }) {
    return (
        <div className=' h-[80vh] flex justify-between gap-4'>
            <div className="w-1/2 ">
                <AddServiceType url={url} />
            </div>
            <div className="w-1/2">
                <ListServiceType url={url} />
            </div>
        </div>
    );
}

export default ServiceTypeManagement;
