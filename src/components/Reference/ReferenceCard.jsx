import React from "react";

const ReferenceCard = ({ name, avatar, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <div className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition duration-300 border border-gray-300">
      <div className="p-4 flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="w-16 h-16 rounded-full border-2 border-gray-300"
            src={avatar}
            alt={name}
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        </div>
      </div>
    </div>
  </a>
);

export default ReferenceCard;
