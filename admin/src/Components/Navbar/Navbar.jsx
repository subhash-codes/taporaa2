import { assets } from '../../assets/assets';

const Navbar = ({ logout }) => {
    return (

        <nav className="bg-gray-900 text-white p-4 flex justify-around fixed top-0 left-0 w-full z-50 items-center h-17" mx-4>
            <div className="flex items-center ">
                <img className='h-13 cursor-pointer' src={assets.logo} alt="Admin Logo"
                /></div>

            <div className="flex-1 text-center">
                <h4 className="text-lg font-semibold  tracking-wider">ADMIN PANEL</h4>
            </div>
            <div className="flex items-center w-40 justify-end">
                <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold transition-all active:scale-95 shadow-lg border border-red-500"
                >
                    LOGOUT
                </button>
            </div>

        </nav>
    );
};

export default Navbar;