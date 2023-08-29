import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchApplications } from '../../Services/FirebaseService.js';
import ApplicationCard from '../ApplicationCard';

const ApplicationManager = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications().then(apps => {
      setApplications(apps);
    });
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-gray-300">Application Manager</h1>
          <Link
            to="/"
            className="px-4 py-2 text-sm font-medium rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Back
          </Link>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {applications.map(application => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationManager;
