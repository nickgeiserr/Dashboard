import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../BackButton';

function Dues() {
  const [duesActive, setDuesActive] = useState(true);

  const handleToggleDues = () => {
    setDuesActive(!duesActive);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Your ACYU Dues</h2>
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-700">Dues Status:</p>
          <div className={`px-3 py-1 rounded-full ${duesActive ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {duesActive ? 'Active' : 'Inactive'}
          </div>
        </div>
        <button
          className={`mt-4 w-full py-3 rounded-md font-semibold text-white ${
            duesActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } transition-colors`}
          onClick={handleToggleDues}
        >
          {duesActive ? 'Cancel Dues' : 'Start Dues'}
        </button>
        <BackButton />
      </div>
    </div>
  );
}

export default Dues;
