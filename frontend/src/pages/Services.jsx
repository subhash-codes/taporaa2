import React, { useContext } from "react";
import Section from "../components/sections/Section";
import {ServiceContext} from "../components/Context/ServiceContext";

const Services = () => {
  const { services_list, url } = useContext(ServiceContext);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <Section
        title="Services We Offer"
        description="We provide top-notch services with a commitment to quality and customer satisfaction."
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services_list.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden group"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Title & Description */}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {item.name}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
