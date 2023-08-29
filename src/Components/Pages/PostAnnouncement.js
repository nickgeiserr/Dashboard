import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateAnnouncementPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-indigo-600">Create Announcement</h2>
          <Link
            to="/"
            className="px-2 py-1 text-sm font-medium rounded-md bg-gray-300 hover:bg-gray-400 transition"
          >
            Back
          </Link>
        </div>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded mb-2 focus:outline-none focus:border-indigo-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded h-24 mb-4 focus:outline-none focus:border-indigo-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors focus:outline-none"
          /* Handle creation here */
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateAnnouncementPage;
