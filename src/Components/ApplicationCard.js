import React, { useEffect, useState } from 'react';
import { fetchUserDocument } from '../Services/FirebaseService.js';
import { acceptApplication } from '../Services/ApplicationService.js';

const ApplicationCard = ({ application }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserDocument(application.userId).then(userData => {
      if (userData) {
        setUserData(userData);
      }
    });
  }, [application.userId]);

  const accept = () => {
    acceptApplication(application.userId);
  };

  const renderAddress = () => {
    if (userData) {
      const { address, city, state } = userData;
      return `${address}, ${city}, ${state}`;
    }
    return 'Address not available';
  };

  return (
    <div className="bg-black shadow-lg rounded-lg p-6 mb-6 transition hover:shadow-2xl transform hover:scale-105">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-1">
          {userData ? `${userData.fullName}'s Application` : 'User Data Loading...'}
        </h3>
        <p className="text-white">Address: {renderAddress()}</p>
      </div>
      <p className="white mb-4">{application.benefit}</p>
      <p className="white mb-4">{application.vision}</p>
      <div className="flex justify-end space-x-4">
        <button onClick={accept} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition">
          Accept
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition">
          Deny
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
