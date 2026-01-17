import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ url, setToken }) => {
  const [data, setData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${url}/api/user/login`, data);
      
      if (response.data.success) {
        // 1. Save JWT to storage
        localStorage.setItem("token", response.data.token);
        
        // 2. Update global state in App.js
        setToken(response.data.token);
        
        toast.success("Login Successful! Welcome Admin.");
        
        // 3. Redirect to dashboard
        navigate("/dashboard");
      } else {
        toast.error(response.data.message || "Invalid Credentials");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server connection failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#093570]">
      {/* Subtle overlay to add depth */}
      <div className="absolute inset-0 bg-black opacity-10 pointer-events-none"></div>
      
      <form 
        onSubmit={handleLogin} 
        className="relative z-10 bg-gray-900 bg-opacity-40 p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md backdrop-blur-sm"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1 uppercase tracking-wide font-semibold">
                Username
            </label>
            <input 
              name="username"
              type="text" 
              placeholder="Enter username"
              required
              value={data.username}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 outline-none transition-all placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1 uppercase tracking-wide font-semibold">
                Password
            </label>
            <input 
              name="password"
              type="password" 
              placeholder="Enter password"
              required
              value={data.password}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 outline-none transition-all placeholder-gray-500"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-blue-900 transition-all shadow-lg mt-4 flex justify-center items-center
              ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500 active:scale-95'}`}
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </div>
        
        <p className="text-center text-gray-400 text-xs mt-6">
            Secure Admin Access Only
        </p>
      </form>
    </div>
  );
};

export default Login;