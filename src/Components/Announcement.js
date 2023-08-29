import React from 'react';

const Announcement = ({ title, content, date }) => (
  <div className="bg-white p-6 shadow-lg rounded-lg mb-4 border border-gray-300">
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-500 text-sm mb-2">{date.toDate().toLocaleString()}</p>
    <p className="text-gray-700 leading-relaxed">{content}</p>
  </div>
);

export default Announcement;
