
import React from 'react';

const Section = ({ title, description, titleColor = "text-white", hrColor = "border-red-500" }) => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="text-center">
        <h2 className={`text-4xl sm:text-5xl font-extrabold ${titleColor}`}>
          {title}
        </h2>
        <div className="flex justify-center mt-4">
          <hr className={`w-24 border-t-2 ${hrColor}`} />
        </div>
        {description && (
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Section;
