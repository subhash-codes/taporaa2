import React from 'react';
import Section from '../components/sections/Section.jsx';

const services = [
  {
    title: 'Refurbishing',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod',
    image: 'https://placehold.co/400x300/e2e8f0/000000?text=Refurbishing',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5V14h2v3.5h-2zm1-8.5c-2.76 0-5 2.24-5 5h2c0-1.66 1.34-3 3-3s3 1.34 3 3h2c0-2.76-2.24-5-5-5z"/>
      </svg>
    ),
  },
  {
    title: 'Building',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod',
    image: 'https://placehold.co/400x300/e2e8f0/000000?text=Building',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-4h-2V7h6v6h-2v4z"/>
      </svg>
    ),
  },
  {
    title: 'Construction',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod',
    image: 'https://placehold.co/400x300/e2e8f0/000000?text=Construction',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z"/>
      </svg>
    ),
  },
  {
    title: 'Steel Works',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod',
    image: 'https://placehold.co/400x300/e2e8f0/000000?text=Steel+Works',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5V14h2v3.5h-2zm1-8.5c-2.76 0-5 2.24-5 5h2c0-1.66 1.34-3 3-3s3 1.34 3 3h2c0-2.76-2.24-5-5-5z"/>
      </svg>
    ),
  },
  {
    title: 'Constructing',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod',
    image: 'https://placehold.co/400x300/e2e8f0/000000?text=Constructing',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-4h-2v4zm0-6h2V7h-2v4z"/>
      </svg>
    ),
  },
  {
    title: 'Cement',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod',
    image: 'https://placehold.co/400x300/e2e8f0/000000?text=Cement',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5V14h2v3.5h-2zm1-8.5c-2.76 0-5 2.24-5 5h2c0-1.66 1.34-3 3-3s3 1.34 3 3h2c0-2.76-2.24-5-5-5z"/>
      </svg>
    ),
  },
];

const Services = () => {
  return (
    <div className=" py-16 px-4 sm:px-6 lg:px-8 font-sans">
       <Section 
          title="Services We Offer" 
          description="We provide top-notch services with a commitment to quality and customer satisfaction."  />
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group">
            <div className="relative overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg transition-transform duration-300 transform group-hover:-translate-y-2">
                {service.icon}
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
