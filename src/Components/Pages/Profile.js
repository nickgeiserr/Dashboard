import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserDocument } from '../../Services/FirebaseService.js';
import BackButton from '../BackButton';

const ProfilePage = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [showAcyuId, setShowAcyuId] = useState(false);

  useEffect(() => {
    fetchUserDocument(userId).then(data => {
      setUserData(data);
    });
  }, [userId]);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-semibold mb-2">Welcome, {userData.fullName}!</h2>
          <p className="text-gray-500 text-sm">Your Profile Details</p>
        </div>
        <div className="space-y-4">
          <div className="text-gray-600">
            <p className="font-medium">Full Name:</p>
            <p className="text-black">{userData.fullName}</p>
          </div>
          <div className="text-gray-600">
            <p className="font-medium">Address:</p>
            <p className="text-black">{userData.address}</p>
          </div>
          <div className="text-gray-600">
            <p className="font-medium">Keys:</p>
            <p className="text-black">{userData.keys.join(', ')}</p>
          </div>
          <div className="text-gray-600">
            <p className="font-medium">Current Chapter:</p>
            <p className="text-black">{userData.currentChapter}</p>
          </div>
          <div className="text-gray-600">
            <p className="font-medium">Created At:</p>
            <p className="text-black">
              {userData.createdAt.toDate().toLocaleString()}
            </p>
          </div>
          <div className="text-gray-600">
            <button
              onClick={() => setShowAcyuId(!showAcyuId)}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              {showAcyuId ? 'Hide' : 'Show'} ACYU ID
            </button>
            {showAcyuId && (
              <div className="mt-2">
                <p className="text-red-500 text-sm font-medium mb-2">
                  WARNING: This is confidential. People can impersonate you with this ID.
                </p>
                <p className="text-gray-600">
                  <strong>ACYU ID:</strong> {userData.acyuId}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 text-center">
            <BackButton />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
