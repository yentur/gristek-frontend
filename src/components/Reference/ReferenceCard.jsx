import React from 'react';

const ReferenceCard = ({
  customerName,
  feedback,
  avatar,
  position,
  company,
}) => (
  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 border border-gray-200">
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-shrink-0">
          <img
            className="w-14 h-14 rounded-full border-2 border-gray-300"
            src={avatar}
            alt={customerName}
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {customerName}
          </h3>
          <p className="text-sm text-gray-500">
            {position}<span className="font-medium text-gray-700"> | {company}</span>
          </p>
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed flex-grow">{feedback}</p>
    </div>
  </div>
);

export default ReferenceCard;